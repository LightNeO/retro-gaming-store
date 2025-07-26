const cartTable = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
const cartTotal = document.getElementById('cart-total');
const cartEmpty = document.getElementById('cart-empty');

// Simple token refresh function
async function refreshToken() {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/auth/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refresh })
        });

        if (!response.ok) {
            throw new Error('Token refresh failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.access);
        return data.access;
    } catch (error) {
        console.error('Token refresh error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('username');
        throw error;
    }
}

// Authenticated request function
async function makeAuthenticatedRequest(url, options = {}) {
    let token = localStorage.getItem('token');
    
    if (!token) {
        throw new Error('No token available');
    }

    // Add authorization header
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers
        });

        // If token is invalid, try to refresh
        if (response.status === 401) {
            console.log('Token expired, attempting refresh...');
            try {
                token = await refreshToken();
                headers.Authorization = `Bearer ${token}`;
                
                // Retry the request with new token
                const retryResponse = await fetch(url, {
                    ...options,
                    headers
                });
                
                if (!retryResponse.ok) {
                    throw new Error(`Request failed: ${retryResponse.status}`);
                }
                
                return retryResponse;
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // Redirect to login if refresh fails
                window.location.href = '/login/';
                throw refreshError;
            }
        }

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error('Authenticated request error:', error);
        throw error;
    }
}

function getToken() {
    return localStorage.getItem('token');
}

function fetchCart() {
    const token = getToken();
    console.log('Token from localStorage:', token ? 'Present' : 'Missing');
    console.log('Token value:', token);
    
    if (!token) {
        alert('Please log in to view your cart.');
        window.location.href = '/login/';
        return;
    }

    console.log('Fetching cart...');
    makeAuthenticatedRequest(`${CONFIG.API_BASE_URL}/cart/`)
    .then(res => res.json())
    .then(data => {
        console.log('Cart data received:', data);
        const items = Array.isArray(data) ? data : (data.results || []);
        console.log('Cart items array:', items);
        console.log('Cart items length:', items.length);
        renderCart(items);
    })
    .catch(error => {
        console.error('Error fetching cart:', error);
        cartEmpty.style.display = '';
        cartEmpty.textContent = 'Error loading cart. Please try again.';
        cartTable.parentElement.style.display = 'none';
    });
}

function renderCart(items) {
    console.log('Rendering cart with items:', items);
    cartTable.innerHTML = '';
    let total = 0;
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!items.length) {
        console.log('No items to render');
        cartEmpty.style.display = '';
        cartTable.parentElement.style.display = 'none';
        cartTotal.textContent = '0.00';
        // Disable checkout button when cart is empty
        if (checkoutBtn) {
            checkoutBtn.classList.add('disabled');
            checkoutBtn.style.pointerEvents = 'none';
            checkoutBtn.style.opacity = '0.5';
        }
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartTable.parentElement.style.display = '';
    
    // Enable checkout button when cart has items
    if (checkoutBtn) {
        checkoutBtn.classList.remove('disabled');
        checkoutBtn.style.pointerEvents = 'auto';
        checkoutBtn.style.opacity = '1';
    }
    
    items.forEach((item, index) => {
        console.log(`Processing item ${index}:`, item);
        console.log('Item product:', item.product);
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        
        const row = document.createElement('tr');
        row.setAttribute('data-qa', 'cart-row');
        row.innerHTML = `
            <td>${item.product.name}</td>
            <td>$${item.product.price}</td>
            <td><input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="form-control form-control-sm cart-qty" data-qa="cart-qty"></td>
            <td data-qa="cart-item-total">$${itemTotal.toFixed(2)}</td>
            <td><button class="btn btn-sm btn-danger cart-remove" data-id="${item.id}" data-qa="cart-remove">&times;</button></td>
        `;
        cartTable.appendChild(row);
    });
    
    cartTotal.textContent = total.toFixed(2);
    console.log('Cart rendering complete, total:', total);
    
    // Add event listeners for quantity changes and remove buttons
    document.querySelectorAll('.cart-qty').forEach(input => {
        input.addEventListener('change', function() {
            updateCartItem(this.dataset.id, this.value);
        });
    });
    
    document.querySelectorAll('.cart-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            // Buggy behavior: 20% chance to not update total after removal
            if (Math.random() < 0.2) {
                removeCartItemNoUpdate(this.dataset.id);
            } else {
                removeCartItem(this.dataset.id);
            }
        });
    });
}

function updateCartItem(id, quantity) {
    const token = getToken();
    if (!token) {
        alert('Please log in to update cart.');
        window.location.href = '/login/';
        return;
    }

    makeAuthenticatedRequest(`${CONFIG.API_BASE_URL}/cart/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to update cart item');
        }
        return fetchCart();
    })
    .catch(error => {
        console.error('Error updating cart item:', error);
        alert('Failed to update cart item. Please try again.');
    });
}

function removeCartItem(id) {
    const token = getToken();
    if (!token) {
        alert('Please log in to remove items from cart.');
        window.location.href = '/login/';
        return;
    }

    makeAuthenticatedRequest(`${CONFIG.API_BASE_URL}/cart/${id}/`, {
        method: 'DELETE'
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to remove cart item');
        }
        return fetchCart();
    })
    .catch(error => {
        console.error('Error removing cart item:', error);
        alert('Failed to remove cart item. Please try again.');
    });
}

// Buggy: remove item but do not update cart display
function removeCartItemNoUpdate(id) {
    const token = getToken();
    if (!token) {
        alert('Please log in to remove items from cart.');
        window.location.href = '/login/';
        return;
    }

    makeAuthenticatedRequest(`${CONFIG.API_BASE_URL}/cart/${id}/`, {
        method: 'DELETE'
    }); // No fetchCart() call!
}

document.addEventListener('DOMContentLoaded', fetchCart); 