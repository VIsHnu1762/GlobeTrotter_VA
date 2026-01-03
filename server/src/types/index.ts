// User Types
export enum UserRole {
    GUEST = 'guest',
    USER = 'user',
    ADMIN = 'admin',
}

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}

export interface UserResponse {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

// Trip Types
export interface Trip {
    id: string;
    user_id: string;
    title: string;
    description?: string;
    start_date: Date;
    end_date: Date;
    is_public: boolean;
    share_token?: string;
    created_at: Date;
    updated_at: Date;
}

// Stop Types
export interface Stop {
    id: string;
    trip_id: string;
    city: string;
    country: string;
    order_index: number;
    start_date: Date;
    end_date: Date;
    notes?: string;
    created_at: Date;
    updated_at: Date;
}

// Activity Types
export interface Activity {
    id: string;
    stop_id: string;
    title: string;
    description?: string;
    date: Date;
    time?: string;
    duration?: number;
    category?: string;
    notes?: string;
    created_at: Date;
    updated_at: Date;
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
    trip_id: string;
    stop_id?: string;
    activity_id?: string;
    title: string;
    amount: number;
    currency: string;
    category: ExpenseCategory;
    date: Date;
    notes?: string;
    created_at: Date;
    updated_at: Date;
}

// Request Types
export interface AuthRequest extends Request {
    user?: UserResponse;
}

// Response Types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}
