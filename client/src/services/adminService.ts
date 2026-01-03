import apiClient from './api';
import { AdminStats, TripAnalytics, User, ApiResponse } from '@types/index';

export const adminService = {
    // Get system statistics
    getStats: async (): Promise<AdminStats> => {
        const response = await apiClient.get<ApiResponse<AdminStats>>('/admin/stats');
        return response.data.data!;
    },

    // Get all users
    getUsers: async (): Promise<User[]> => {
        const response = await apiClient.get<ApiResponse<User[]>>('/admin/users');
        return response.data.data!;
    },

    // Get trip analytics
    getTripAnalytics: async (): Promise<TripAnalytics> => {
        const response = await apiClient.get<ApiResponse<TripAnalytics>>('/admin/trips/analytics');
        return response.data.data!;
    },
};
