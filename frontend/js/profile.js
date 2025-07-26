function getToken() {
    return localStorage.getItem('access');
}

function showOrderDetail(orderId) {
                    fetch(`/api/orders/${orderId}/`, {
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(res => res.json())
    .then(order => {
        let itemsHtml = '';
        (order.items || []).forEach(itemId => {
            itemsHtml += `<li>CartItem #${itemId}</li>`;
        });
        document.getElementById('order-detail-body').innerHTML = `
            <strong>Order #:</strong> ${order.id}<br>
            <strong>Date:</strong> ${new Date(order.created_at).toLocaleString()}<br>
            <strong>Status:</strong> ${order.status}<br>
            <strong>Total:</strong> $${order.total_price}<br>
            <strong>Shipping Name:</strong> ${order.shipping_name || ''}<br>
            <strong>Shipping Email:</strong> ${order.shipping_email || ''}<br>
            <strong>Shipping Phone:</strong> ${order.shipping_phone || ''}<br>
            <strong>Shipping Address:</strong> ${order.shipping_address || ''}<br>
            <strong>Items:</strong><ul>${itemsHtml}</ul>
        `;
        var modal = new bootstrap.Modal(document.getElementById('orderDetailModal'));
        modal.show();
    });
}

// Add event delegation for order detail buttons
window.showOrderDetail = showOrderDetail;

// Profile update logic with buggy behavior for QA
const profileForm = document.getElementById('profile-update-form');
if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('update-email').value;
        const password = document.getElementById('update-password').value;
        const errorDiv = document.getElementById('profile-update-error');
        errorDiv.textContent = '';
        // Buggy behavior: randomly fail
        if (Math.random() < 0.3) {
            errorDiv.textContent = 'Update failed due to a random bug (for QA testing).';
            return;
        }
        // Update email
        if (email) {
            fetch('/api/users/' + parseJwt(getToken()).user_id + '/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                },
                body: JSON.stringify({ email })
            })
            .then(res => res.json())
            .then(data => {
                if (data.email) {
                    errorDiv.textContent = 'Email updated!';
                } else {
                    errorDiv.textContent = data.error || 'Email update failed.';
                }
            });
        }
        // Update password
        if (password) {
            fetch('/api/users/' + parseJwt(getToken()).user_id + '/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                },
                body: JSON.stringify({ password })
            })
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    errorDiv.textContent = 'Password updated!';
                } else {
                    errorDiv.textContent = data.error || 'Password update failed.';
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Fetch user info
    fetch('/api/users/', {
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(res => res.json())
    .then(users => {
        // Find current user by decoding JWT or by matching with /api/profiles/
        fetch('/api/profiles/', {
            headers: { 'Authorization': 'Bearer ' + getToken() }
        })
        .then(res => res.json())
        .then(profiles => {
            const userId = parseJwt(getToken()).user_id;
            const user = users.find(u => u.id === userId);
            const profile = (profiles.results || profiles).find(p => p.user.id === userId);
            if (user) {
                document.getElementById('profile-info').innerHTML = `
                    <div class='card card-retro p-3 mb-3'>
                        <strong>Username:</strong> ${user.username}<br>
                        <strong>Email:</strong> ${user.email}<br>
                        <strong>Role:</strong> ${profile ? profile.role : 'User'}
                    </div>
                `;
            }
        });
    });

    // Fetch order history
    fetch('/api/orders/', {
        headers: { 'Authorization': 'Bearer ' + getToken() }
    })
    .then(res => res.json())
    .then(data => {
        let orders = data.results || data;
        // Buggy behavior: sometimes show empty order history even if orders exist
        if (orders.length && Math.random() < 0.2) {
            orders = [];
        }
        const tbody = document.getElementById('orders-table').getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        orders.forEach(order => {
            const row = document.createElement('tr');
            row.setAttribute('data-qa', 'order-row');
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${new Date(order.created_at).toLocaleString()}</td>
                <td>${order.status}</td>
                <td>$${order.total_price}</td>
                <td><button class="btn btn-sm btn-pixel" data-qa="order-detail-btn" onclick="showOrderDetail(${order.id})">View</button></td>
            `;
            tbody.appendChild(row);
        });
    });
    // Add hidden QA_PASS div for automation
    let qaDiv = document.getElementById('QA_PASS');
    if (!qaDiv) {
        qaDiv = document.createElement('div');
        qaDiv.id = 'QA_PASS';
        qaDiv.style.display = 'none';
        document.body.appendChild(qaDiv);
    }
});

function parseJwt(token) {
    if (!token) return {};
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
} 