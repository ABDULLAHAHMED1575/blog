import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL ||
                (import.meta.env.DEV ? '' : 'https://blog-81ec.onrender.com');

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;