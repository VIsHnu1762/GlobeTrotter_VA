import apiClient from './api';
import {
    LoginCredentials,
    RegisterData,
    AuthResponse,
    User,
    ApiResponse,
} from '@types/index';

export const authService = {
    // Register new user
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    // Login user
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    // Logout
    logout: async (): Promise<void> => {
        await apiClient.post('/auth/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get current user
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get<ApiResponse<User>>('/auth/me');
        return response.data.data!;
    },

    // Update profile
    updateProfile: async (data: Partial<User>): Promise<User> => {
        const response = await apiClient.put<ApiResponse<User>>('/auth/profile', data);
        return response.data.data!;
    },

    // Check if user is authenticated
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    },

    // Get stored token
    getToken: (): string | null => {
        return localStorage.getItem('token');
    },

    // Store auth data
    storeAuthData: (token: string, user: User): void => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    // Get stored user
    getStoredUser: (): User | null => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },
};
