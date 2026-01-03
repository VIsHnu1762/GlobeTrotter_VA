import apiClient from './api';
import { Activity, CreateActivityData, ApiResponse } from '@types/index';

export const activityService = {
    // Get activities for a stop
    getActivitiesByStop: async (stopId: string): Promise<Activity[]> => {
        const response = await apiClient.get<ApiResponse<Activity[]>>(`/activities/stop/${stopId}`);
        return response.data.data!;
    },

    // Get single activity
    getActivityById: async (id: string): Promise<Activity> => {
        const response = await apiClient.get<ApiResponse<Activity>>(`/activities/${id}`);
        return response.data.data!;
    },

    // Create activity
    createActivity: async (data: CreateActivityData): Promise<Activity> => {
        const response = await apiClient.post<ApiResponse<Activity>>('/activities', data);
        return response.data.data!;
    },

    // Update activity
    updateActivity: async (id: string, data: Partial<CreateActivityData>): Promise<Activity> => {
        const response = await apiClient.put<ApiResponse<Activity>>(`/activities/${id}`, data);
        return response.data.data!;
    },

    // Delete activity
    deleteActivity: async (id: string): Promise<void> => {
        await apiClient.delete(`/activities/${id}`);
    },
};
