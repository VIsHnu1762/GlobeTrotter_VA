import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance with Django session support
const apiClient: AxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Enable session cookies
    timeout: 10000,
});

// Request interceptor - Django uses session cookies, no token needed
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get CSRF token from cookie if needed
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];

        if (csrfToken && config.headers) {
            config.headers['X-CSRFToken'] = csrfToken;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Unauthorized - session expired; redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;
