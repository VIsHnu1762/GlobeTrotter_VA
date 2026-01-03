import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@types/index';
import { authService } from '@services/authService';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (data: Partial<User>) => Promise<void>;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isUser: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored auth data on mount
        const initAuth = async () => {
            try {
                const storedUser = authService.getStoredUser();
                const token = authService.getToken();

                if (storedUser && token) {
                    // Verify token is still valid by fetching current user
                    const currentUser = await authService.getCurrentUser();
                    setUser(currentUser);
                }
            } catch (error) {
                // Token invalid or expired
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await authService.login({ email, password });
        authService.storeAuthData(response.data.token, response.data.user);
        setUser(response.data.user);
    };

    const register = async (email: string, password: string, name: string) => {
        const response = await authService.register({ email, password, name });
        authService.storeAuthData(response.data.token, response.data.user);
        setUser(response.data.user);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
    };

    const updateUser = async (data: Partial<User>) => {
        const updatedUser = await authService.updateProfile(data);
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const value: AuthContextType = {
        user,
        loading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === UserRole.ADMIN,
        isUser: user?.role === UserRole.USER,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
