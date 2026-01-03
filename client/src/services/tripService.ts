import apiClient from './api';
import { Trip, CreateTripData, ApiResponse, PaginatedResponse } from '@types/index';

export const tripService = {
    // Get all trips for current user
    getMyTrips: async (): Promise<Trip[]> => {
        const response = await apiClient.get<ApiResponse<Trip[]>>('/trips');
        return response.data.data!;
    },

    // Get public trips to explore
    getPublicTrips: async (limit?: number): Promise<Trip[]> => {
        const response = await apiClient.get<ApiResponse<Trip[]>>('/trips/public/explore', {
            params: { limit }
        });
        return response.data.data!;
    },

    // Get single trip by ID
    getTripById: async (id: string): Promise<Trip> => {
        const response = await apiClient.get<ApiResponse<Trip>>(`/trips/${id}`);
        return response.data.data!;
    },

    // Get public shared trip by token
    getSharedTrip: async (token: string): Promise<Trip> => {
        const response = await apiClient.get<ApiResponse<Trip>>(`/trips/shared/${token}`);
        return response.data.data!;
    },

    // Create new trip
    createTrip: async (data: CreateTripData): Promise<Trip> => {
        const response = await apiClient.post<ApiResponse<Trip>>('/trips', data);
        return response.data.data!;
    },

    // Update trip
    updateTrip: async (id: string, data: Partial<CreateTripData>): Promise<Trip> => {
        const response = await apiClient.put<ApiResponse<Trip>>(`/trips/${id}`, data);
        return response.data.data!;
    },

    // Delete trip
    deleteTrip: async (id: string): Promise<void> => {
        await apiClient.delete(`/trips/${id}`);
    },

    // Generate share link
    generateShareLink: async (id: string): Promise<{ shareToken: string; shareUrl: string }> => {
        const response = await apiClient.post<ApiResponse<{ shareToken: string; shareUrl: string }>>(
            `/trips/${id}/share`
        );
        return response.data.data!;
    },
};
