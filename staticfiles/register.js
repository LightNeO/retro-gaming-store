document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('register-error');
    errorDiv.textContent = '';

                    fetch('/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(res => res.json().then(data => ({ status: res.status, data })))
    .then(({ status, data }) => {
        if (status === 201) {
            window.location.href = '/login/';
        } else {
            errorDiv.textContent = data.error || 'Registration failed.';
        }
    })
    .catch(() => {
        errorDiv.textContent = 'Registration failed. Please try again.';
    });
}); 