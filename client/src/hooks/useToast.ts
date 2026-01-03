import { useState } from 'react';

interface ToastOptions {
    duration?: number;
    type?: 'success' | 'error' | 'info';
}

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

export const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, options: ToastOptions = {}) => {
        const { duration = 3000, type = 'info' } = options;
        const id = Date.now().toString();

        const toast: Toast = { id, message, type };
        setToasts((prev) => [...prev, toast]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    };

    const success = (message: string) => showToast(message, { type: 'success' });
    const error = (message: string) => showToast(message, { type: 'error' });
    const info = (message: string) => showToast(message, { type: 'info' });

    return {
        toasts,
        showToast,
        success,
        error,
        info,
    };
};
