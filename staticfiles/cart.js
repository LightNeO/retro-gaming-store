const cartTable = document.getElementById('cart-table').getElementsByTagName('tbody')[0];
const cartTotal = document.getElementById('cart-total');
const cartEmpty = document.getElementById('cart-empty');

function getToken() {
    return localStorage.getItem('access');
}

function fetchCart() {
                    fetch('/api/cart/', {
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(res => res.json())
    .then(data => {
        const items = Array.isArray(data) ? data : (data.results || []);
        renderCart(items);
    });
}

function renderCart(items) {
    cartTable.innerHTML = '';
    let total = 0;
    if (!items.length) {
        cartEmpty.style.display = '';
        cartTable.parentElement.style.display = 'none';
        cartTotal.textContent = '0.00';
        return;
    }
    cartEmpty.style.display = 'none';
    cartTable.parentElement.style.display = '';
    items.forEach(item => {
        const row = document.createElement('tr');
        row.setAttribute('data-qa', 'cart-row');
        row.innerHTML = `
            <td>${item.product.name}</td>
            <td>$${item.product.price}</td>
            <td><input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="form-control form-control-sm cart-qty" data-qa="cart-qty"></td>
            <td data-qa="cart-item-total">$${(item.product.price * item.quantity).toFixed(2)}</td>
            <td><button class="btn btn-sm btn-danger cart-remove" data-id="${item.id}" data-qa="cart-remove">&times;</button></td>
        `;
        cartTable.appendChild(row);
    });
    cartTotal.textContent = total.toFixed(2);
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
    fetch(`/api/cart/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify({ quantity })
    }).then(() => fetchCart());
}

function removeCartItem(id) {
    fetch(`/api/cart/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + getToken() }
    }).then(() => fetchCart());
}

// Buggy: remove item but do not update cart display
function removeCartItemNoUpdate(id) {
    fetch(`/api/cart/${id}/`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + getToken() }
    }); // No fetchCart() call!
}

document.addEventListener('DOMContentLoaded', fetchCart); 