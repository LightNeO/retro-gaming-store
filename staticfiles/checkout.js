// Add QA/test hooks to checkout form fields and button
['name','email','phone','address','card-number','card-expiry','card-cvv'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('data-qa', id);
});
document.getElementById('checkout-form').setAttribute('data-qa', 'checkout-form');
document.querySelector('button[type="submit"]').setAttribute('data-qa', 'place-order-btn');

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
    errorDiv.textContent = '';

    // Simple validation for test credentials
    if (cardNumber !== '4242424242424242' || cardExpiry !== '12/34' || cardCVV !== '123') {
        errorDiv.textContent = 'Please use the test card: 4242 4242 4242 4242, Expiry: 12/34, CVV: 123';
        return;
    }
    if (!name || !email || !phone || !address) {
        errorDiv.textContent = 'Please fill in all required fields.';
        return;
    }

    // Fetch cart items
    let cartItems = [];
    try {
                        const cartRes = await fetch('/api/cart/', {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access') }
        });
        const cartData = await cartRes.json();
        cartItems = (cartData.results || cartData).map(item => item.id);
        if (!cartItems.length) {
            errorDiv.textContent = 'Your cart is empty.';
            return;
        }
    } catch {
        errorDiv.textContent = 'Could not fetch cart items.';
        return;
    }

    // Create order via API
    try {
                            const orderRes = await fetch('/api/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access')
            },
            body: JSON.stringify({
                items: cartItems,
                total_price: 0, // Backend should recalculate
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
        if (orderRes.status === 201) {
            alert('Order placed successfully!');
            window.location.href = '/';
        } else {
            const data = await orderRes.json();
            errorDiv.textContent = data.error || 'Order failed.';
        }
    } catch {
        errorDiv.textContent = 'Order failed. Please try again.';
    }
}); 