import apiClient from './api';
import { Expense, CreateExpenseData, BudgetSummary, ApiResponse } from '@types/index';

export const expenseService = {
    // Get expenses for a trip
    getExpensesByTrip: async (tripId: string): Promise<Expense[]> => {
        const response = await apiClient.get<ApiResponse<Expense[]>>(`/expenses/trip/${tripId}`);
        return response.data.data!;
    },

    // Get budget summary
    getBudgetSummary: async (tripId: string): Promise<BudgetSummary> => {
        const response = await apiClient.get<ApiResponse<BudgetSummary>>(
            `/expenses/trip/${tripId}/summary`
        );
        return response.data.data!;
    },

    // Create expense
    createExpense: async (data: CreateExpenseData): Promise<Expense> => {
        const response = await apiClient.post<ApiResponse<Expense>>('/expenses', data);
        return response.data.data!;
    },

    // Update expense
    updateExpense: async (id: string, data: Partial<CreateExpenseData>): Promise<Expense> => {
        const response = await apiClient.put<ApiResponse<Expense>>(`/expenses/${id}`, data);
        return response.data.data!;
    },

    // Delete expense
    deleteExpense: async (id: string): Promise<void> => {
        await apiClient.delete(`/expenses/${id}`);
    },
};
