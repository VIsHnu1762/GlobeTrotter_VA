import apiClient from './api';

export interface Destination {
    id: string;
    city: string;
    country: string;
    countryCode: string;
    continent: string;
    latitude: number;
    longitude: number;
    description: string;
    popularAttractions: string[];
    bestMonths: string;
    avgBudgetPerDay: number;
    timezone: string;
}

export const destinationService = {
    // Search destinations for autocomplete
    searchDestinations: async (query: string, limit: number = 10): Promise<Destination[]> => {
        const response = await apiClient.get(`/destinations/search`, {
            params: { q: query, limit }
        });
        return response.data.data;
    },

    // Get popular destinations
    getPopularDestinations: async (limit: number = 20): Promise<Destination[]> => {
        const response = await apiClient.get(`/destinations/popular`, {
            params: { limit }
        });
        return response.data.data;
    },

    // Get destinations by continent
    getByContinent: async (continent: string): Promise<Destination[]> => {
        const response = await apiClient.get(`/destinations/continent/${continent}`);
        return response.data.data;
    },

    // Get all continents
    getContinents: async (): Promise<string[]> => {
        const response = await apiClient.get('/destinations/continents');
        return response.data.data;
    },

    // Get budget-friendly destinations
    getBudgetFriendly: async (maxBudget: number, limit: number = 10): Promise<Destination[]> => {
        const response = await apiClient.get('/destinations/budget-friendly', {
            params: { maxBudget, limit }
        });
        return response.data.data;
    },

    // Get specific destination
    getDestination: async (city: string, country: string): Promise<Destination> => {
        const response = await apiClient.get(`/destinations/${city}/${country}`);
        return response.data.data;
    },
};
