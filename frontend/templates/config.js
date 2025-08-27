// Configuration for API base URL
// This file can be updated to point to different backends

const CONFIG = {
    // Development backend (local)
    DEV_API_URL: 'http://127.0.0.1:8000/api',

    // Production backend: use the same origin where the site is served
    // This avoids hardcoding old hosts like Railway when moving to Render
    get PROD_API_URL() {
        return `${window.location.origin}/api`;
    },

    // Auto-detect environment
    get API_BASE_URL() {
        const hostname = window.location.hostname;
        const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
        return isLocal ? this.DEV_API_URL : this.PROD_API_URL;
    }
};

// Make it globally available
window.CONFIG = CONFIG; 