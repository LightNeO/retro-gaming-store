// Configuration for API base URL
// This file can be updated to point to different backends

const CONFIG = {
    // Development backend (local)
    DEV_API_URL: 'http://127.0.0.1:8000/api',
    
    // Production backend (update this with your actual Railway/Render URL)
    PROD_API_URL: 'https://web-production-c47e.up.railway.app/api', // Your Railway backend!
    
    // Auto-detect environment
    get API_BASE_URL() {
        const hostname = window.location.hostname;
        const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
        return isLocal ? this.DEV_API_URL : this.PROD_API_URL;
    }
};

// Make it globally available
window.CONFIG = CONFIG; 