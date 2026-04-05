export interface Transaction {
    id: string;
    title: string;
    amount: number;
    date: string;
    category: string;
    type: 'income' | 'expense';
    icon?: string;
}

export interface CategoryTotal {
    id: string;
    name: string;
    amount: number;
    color: string;
    percentage?: number;
}

export const MOCK_USER = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
};

export const MOCK_TRANSACTIONS: Transaction[] = [
    { id: '1', title: 'Grocery Shopping', amount: 120.50, date: '2026-01-18', category: 'Food & Dining', type: 'expense', icon: 'cart' },
    { id: '2', title: 'Uber Ride', amount: 24.00, date: '2026-01-17', category: 'Transportation', type: 'expense', icon: 'car' },
    { id: '3', title: 'Freelance Project', amount: 1500.00, date: '2026-01-15', category: 'Income', type: 'income', icon: 'cash' },
    { id: '4', title: 'Netflix Subscription', amount: 15.99, date: '2026-01-14', category: 'Entertainment', type: 'expense', icon: 'movie' },
    { id: '5', title: 'Coffee', amount: 5.50, date: '2026-01-18', category: 'Food & Dining', type: 'expense', icon: 'coffee' },
    { id: '6', title: 'Salary', amount: 3500.00, date: '2026-01-01', category: 'Income', type: 'income', icon: 'cash' },
    { id: '7', title: 'Gym Membership', amount: 45.00, date: '2026-01-05', category: 'Health', type: 'expense', icon: 'dumbbell' },
];

export const MOCK_CATEGORIES: CategoryTotal[] = [
    { id: '1', name: 'Food & Dining', amount: 450.25, color: '#22D3EE' },
    { id: '2', name: 'Shopping', amount: 320.00, color: '#818CF8' },
    { id: '3', name: 'Transportation', amount: 180.50, color: '#F472B6' },
    { id: '4', name: 'Entertainment', amount: 95.00, color: '#34D399' },
    { id: '5', name: 'Bills', amount: 550.00, color: '#F59E0B' },
];

export const MOCK_CHART_DATA = {
    monthlyIncome: [2800, 3100, 2900, 3500, 3200, 3500],
    monthlyExpenses: [1800, 2100, 1950, 2200, 2050, 2260],
    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
};

export const CATEGORY_OPTIONS = [
    'Food & Dining',
    'Shopping',
    'Transportation',
    'Bills',
    'Education',
    'Entertainment',
    'Health',
    'Other',
];
