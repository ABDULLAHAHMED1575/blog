import axios from 'axios';

const api = axios.create({
    baseURL: 'https://blog-81ec.onrender.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;