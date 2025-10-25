import axios from 'axios';

// Use environment variable or default to production URL
// In development with Vite proxy, use relative URL
const baseURL = import.meta.env.VITE_API_URL ||
                (import.meta.env.DEV ? '' : 'https://blog-81ec.onrender.com');

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;