import axios from 'axios';

// Use environment variable or determine based on dev/prod mode
// In development: use relative URL (Vite proxy handles it)
// In production: use relative URL (nginx proxy handles it)
const baseURL = import.meta.env.VITE_API_URL ||
                (import.meta.env.DEV ? '' : '');

const api = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;