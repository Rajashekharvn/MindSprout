import axios from 'axios';

// Use Environment Variable for API URL via Next.js Public Env
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://mindsprout-backend.onrender.com/api/auth';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    // Check if we are in the browser before accessing localStorage
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;
