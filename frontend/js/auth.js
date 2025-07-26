// Authentication utility functions
function getToken() {
    return localStorage.getItem('token');
}

function getRefreshToken() {
    return localStorage.getItem('refresh');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function setRefreshToken(refreshToken) {
    localStorage.setItem('refresh', refreshToken);
}

function clearTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
}

async function refreshToken() {
    const refresh = getRefreshToken();
    if (!refresh) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await fetch('/api/auth/token/refresh/', {
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
        setToken(data.access);
        return data.access;
    } catch (error) {
        console.error('Token refresh error:', error);
        clearTokens();
        throw error;
    }
}

async function makeAuthenticatedRequest(url, options = {}) {
    let token = getToken();
    
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