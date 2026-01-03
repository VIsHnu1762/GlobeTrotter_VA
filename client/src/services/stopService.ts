import apiClient from './api';
import { Stop, CreateStopData, ApiResponse } from '@types/index';

export const stopService = {
    // Get stops for a trip
    getStopsByTrip: async (tripId: string): Promise<Stop[]> => {
        const response = await apiClient.get<ApiResponse<Stop[]>>(`/stops/trip/${tripId}`);
        return response.data.data!;
    },

    // Get single stop
    getStopById: async (id: string): Promise<Stop> => {
        const response = await apiClient.get<ApiResponse<Stop>>(`/stops/${id}`);
        return response.data.data!;
    },

    // Create stop
    createStop: async (data: CreateStopData): Promise<Stop> => {
        const response = await apiClient.post<ApiResponse<Stop>>('/stops', data);
        return response.data.data!;
    },

    // Update stop
    updateStop: async (id: string, data: Partial<CreateStopData>): Promise<Stop> => {
        const response = await apiClient.put<ApiResponse<Stop>>(`/stops/${id}`, data);
        return response.data.data!;
    },

    // Delete stop
    deleteStop: async (id: string): Promise<void> => {
        await apiClient.delete(`/stops/${id}`);
    },

    // Reorder stops
    reorderStops: async (
        tripId: string,
        stopIds: string[]
    ): Promise<Stop[]> => {
        const response = await apiClient.put<ApiResponse<Stop[]>>('/stops/reorder', {
            tripId,
            stopIds,
        });
        return response.data.data!;
    },
};
