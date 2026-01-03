import { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
        // API error response
        if (error.response?.data?.error) {
            return error.response.data.error;
        }
        if (error.response?.data?.message) {
            return error.response.data.message;
        }
        // HTTP status errors
        if (error.response?.status === 404) {
            return 'Resource not found';
        }
        if (error.response?.status === 403) {
            return 'You do not have permission to perform this action';
        }
        if (error.response?.status === 500) {
            return 'Server error. Please try again later';
        }
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'An unexpected error occurred';
};

export const handleApiError = (error: unknown): void => {
    const message = getErrorMessage(error);
    console.error('API Error:', message);
    // You can integrate with toast/notification system here
};
