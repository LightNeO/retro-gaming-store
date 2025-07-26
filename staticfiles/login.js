document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');
    errorDiv.textContent = '';

                    fetch('/api/auth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json().then(data => ({ status: res.status, data })))
    .then(({ status, data }) => {
        if (status === 200 && data.access) {
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            window.location.href = '/';
        } else {
            errorDiv.textContent = data.detail || 'Invalid credentials.';
        }
    })
    .catch(() => {
        errorDiv.textContent = 'Login failed. Please try again.';
    });
}); 