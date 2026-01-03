// User & Authentication Types
export enum UserRole {
    GUEST = 'guest',
    USER = 'user',
    ADMIN = 'admin',
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    success: boolean;
    data: {
        user: User;
        token: string;
    };
    message: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
}

// Trip Types
export interface Trip {
    id: string;
    userId: string;
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    isPublic: boolean;
    shareToken?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTripData {
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    isPublic?: boolean;
}

// Stop Types
export interface Stop {
    id: string;
    tripId: string;
    city: string;
    country: string;
    orderIndex: number;
    startDate: string;
    endDate: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateStopData {
    tripId: string;
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    notes?: string;
}

// Activity Types
export interface Activity {
    id: string;
    stopId: string;
    title: string;
    description?: string;
    date: string;
    time?: string;
    duration?: number; // in minutes
    category?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateActivityData {
    stopId: string;
    title: string;
    description?: string;
    date: string;
    time?: string;
    duration?: number;
    category?: string;
    notes?: string;
}

// Expense Types
export enum ExpenseCategory {
    ACCOMMODATION = 'accommodation',
    FOOD = 'food',
    TRANSPORT = 'transport',
    ACTIVITIES = 'activities',
    SHOPPING = 'shopping',
    OTHER = 'other',
}

export interface Expense {
    id: string;
    tripId: string;
    stopId?: string;
    activityId?: string;
    title: string;
    amount: number;
    currency: string;
    category: ExpenseCategory;
    date: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateExpenseData {
    tripId: string;
    stopId?: string;
    activityId?: string;
    title: string;
    amount: number;
    currency?: string;
    category: ExpenseCategory;
    date: string;
    notes?: string;
}

export interface BudgetSummary {
    totalExpenses: number;
    currency: string;
    byCategory: Record<ExpenseCategory, number>;
    byStop?: Record<string, number>;
}

// API Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

// Admin Analytics Types
export interface AdminStats {
    totalUsers: number;
    totalTrips: number;
    totalPublicTrips: number;
    activeUsers: number;
    tripsCreatedThisMonth: number;
}

export interface TripAnalytics {
    averageStopsPerTrip: number;
    averageActivitiesPerStop: number;
    averageBudgetPerTrip: number;
    popularDestinations: Array<{
        city: string;
        country: string;
        count: number;
    }>;
    expenseCategoryDistribution: Record<ExpenseCategory, number>;
}
