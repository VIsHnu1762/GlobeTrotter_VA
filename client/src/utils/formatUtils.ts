import { ExpenseCategory } from '@types/index';

export const formatCurrency = (
    amount: number,
    currency: string = 'USD',
    locale: string = 'en-US'
): string => {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
        }).format(amount);
    } catch (error) {
        return `${currency} ${amount.toFixed(2)}`;
    }
};

export const formatNumber = (num: number, decimals: number = 0): string => {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
};

export const getCategoryColor = (category: ExpenseCategory): string => {
    const colors: Record<ExpenseCategory, string> = {
        [ExpenseCategory.ACCOMMODATION]: 'bg-blue-100 text-blue-800',
        [ExpenseCategory.FOOD]: 'bg-green-100 text-green-800',
        [ExpenseCategory.TRANSPORT]: 'bg-yellow-100 text-yellow-800',
        [ExpenseCategory.ACTIVITIES]: 'bg-purple-100 text-purple-800',
        [ExpenseCategory.SHOPPING]: 'bg-pink-100 text-pink-800',
        [ExpenseCategory.OTHER]: 'bg-gray-100 text-gray-800',
    };
    return colors[category];
};

export const getCategoryLabel = (category: ExpenseCategory): string => {
    const labels: Record<ExpenseCategory, string> = {
        [ExpenseCategory.ACCOMMODATION]: 'Accommodation',
        [ExpenseCategory.FOOD]: 'Food & Dining',
        [ExpenseCategory.TRANSPORT]: 'Transport',
        [ExpenseCategory.ACTIVITIES]: 'Activities',
        [ExpenseCategory.SHOPPING]: 'Shopping',
        [ExpenseCategory.OTHER]: 'Other',
    };
    return labels[category];
};
