// Add QA/test hooks to checkout form fields and button
['name','email','phone','address','card-number','card-expiry','card-cvv'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('data-qa', id);
});
document.getElementById('checkout-form').setAttribute('data-qa', 'checkout-form');
document.querySelector('button[type="submit"]').setAttribute('data-qa', 'place-order-btn');

// Check cart on page load and redirect if empty
document.addEventListener('DOMContentLoaded', async function() {
    console.log('Checkout page loaded, checking cart...');
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found, redirecting to login');
        alert('Please log in to checkout.');
        window.location.href = '/login/';
        return;
    }

    try {
        console.log('Fetching cart from API...');
        const cartRes = await fetch('/api/cart/', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        console.log('Cart response status:', cartRes.status);
        
        if (!cartRes.ok) {
            throw new Error(`Cart API returned ${cartRes.status}`);
        }
        
        const cartData = await cartRes.json();
        console.log('Cart data received:', cartData);
        
        const cartItems = Array.isArray(cartData) ? cartData : (cartData.results || []);
        console.log('Cart items array:', cartItems);
        console.log('Cart items length:', cartItems.length);
        
        if (!cartItems.length) {
            console.log('Cart is empty, redirecting to products');
            alert('Your cart is empty. Please add items before checkout.');
            window.location.href = '/products/';
            return;
        }
        
        console.log('Cart has items, displaying summary');
        // Display cart summary
        const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const cartSummary = document.createElement('div');
        cartSummary.className = 'alert alert-info mb-3';
        cartSummary.innerHTML = `
            <strong>Cart Summary:</strong> ${cartItems.length} item(s) - Total: $${total.toFixed(2)}
        `;
        document.getElementById('checkout-form').insertBefore(cartSummary, document.getElementById('checkout-form').firstChild);
        
    } catch (error) {
        console.error('Error fetching cart:', error);
        alert('Error loading cart. Please try again.');
        window.location.href = '/cart/';
    }
});

// Buggy behavior: sometimes Place Order is disabled for 5 seconds after load
const placeOrderBtn = document.querySelector('button[type="submit"]');
if (Math.random() < 0.25) {
    placeOrderBtn.disabled = true;
    placeOrderBtn.textContent = 'Please wait...';
    setTimeout(() => {
        placeOrderBtn.disabled = false;
        placeOrderBtn.textContent = 'Place Order';
    }, 5000);
}

document.getElementById('checkout-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const cardNumber = document.getElementById('card-number').value.replace(/\s+/g, '');
    const cardExpiry = document.getElementById('card-expiry').value.trim();
    const cardCVV = document.getElementById('card-cvv').value.trim();
    const errorDiv = document.getElementById('checkout-error');
    const submitBtn = document.querySelector('button[type="submit"]');
    
    errorDiv.textContent = '';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing...';

    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
        errorDiv.textContent = 'Please log in to checkout.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Place Order';
        return;
    }

    // Simple validation for test credentials
    if (cardNumber !== '4242424242424242' || cardExpiry !== '12/34' || cardCVV !== '123') {
        errorDiv.textContent = 'Please use the test card: 4242 4242 4242 4242, Expiry: 12/34, CVV: 123';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Place Order';
        return;
    }
    
    if (!name || !email || !phone || !address) {
        errorDiv.textContent = 'Please fill in all required fields.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Place Order';
        return;
    }

    // Fetch cart items and validate
    let cartItems = [];
    let totalPrice = 0;
    try {
        const cartRes = await fetch('/api/cart/', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        
        if (!cartRes.ok) {
            throw new Error('Failed to fetch cart');
        }
        
        const cartData = await cartRes.json();
        cartItems = Array.isArray(cartData) ? cartData : (cartData.results || []);
        
        if (!cartItems.length) {
            errorDiv.textContent = 'Your cart is empty. Please add items before checkout.';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Place Order';
            return;
        }
        
        // Calculate total price
        totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        
    } catch (error) {
        console.error('Error fetching cart:', error);
        errorDiv.textContent = 'Could not fetch cart items. Please try again.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Place Order';
        return;
    }

    // Create order via API
    try {
        const orderRes = await fetch('/api/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                items: cartItems.map(item => item.id),
                total_price: totalPrice,
                status: 'pending',
                shipping_name: name,
                shipping_email: email,
                shipping_phone: phone,
                shipping_address: address,
                payment_card: cardNumber,
                payment_expiry: cardExpiry,
                payment_cvv: cardCVV
            })
        });
        
        if (orderRes.ok) {
            const orderData = await orderRes.json();
            alert(`Order placed successfully! Order #${orderData.id}`);
            window.location.href = '/profile/';
        } else {
            const data = await orderRes.json();
            errorDiv.textContent = data.error || data.detail || 'Order failed.';
        }
    } catch (error) {
        console.error('Error creating order:', error);
        errorDiv.textContent = 'Order failed. Please try again.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Place Order';
    }
}); 