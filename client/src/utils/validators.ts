export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true };
};

export const validateRequired = (value: string, fieldName: string): string | undefined => {
    if (!value || value.trim() === '') {
        return `${fieldName} is required`;
    }
    return undefined;
};

export const validateDateRange = (
    startDate: string,
    endDate: string
): { valid: boolean; message?: string } => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
        return { valid: false, message: 'Start date must be before end date' };
    }

    return { valid: true };
};

export const validateAmount = (amount: number): { valid: boolean; message?: string } => {
    if (amount <= 0) {
        return { valid: false, message: 'Amount must be greater than zero' };
    }
    if (amount > 1000000) {
        return { valid: false, message: 'Amount is too large' };
    }
    return { valid: true };
};
