import { format, parseISO, formatDistance, isValid } from 'date-fns';

export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        return isValid(dateObj) ? format(dateObj, formatStr) : 'Invalid date';
    } catch (error) {
        return 'Invalid date';
    }
};

export const formatDateTime = (date: string | Date): string => {
    return formatDate(date, 'MMM dd, yyyy hh:mm a');
};

export const formatRelativeTime = (date: string | Date): string => {
    try {
        const dateObj = typeof date === 'string' ? parseISO(date) : date;
        return isValid(dateObj) ? formatDistance(dateObj, new Date(), { addSuffix: true }) : 'Unknown';
    } catch (error) {
        return 'Unknown';
    }
};

export const getDaysDifference = (startDate: string | Date, endDate: string | Date): number => {
    try {
        const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
        const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
        const diffTime = Math.abs(end.getTime() - start.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch (error) {
        return 0;
    }
};
