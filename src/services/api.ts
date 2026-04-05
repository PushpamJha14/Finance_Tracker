import { Platform } from 'react-native';

// Use localhost for iOS simulator, 10.0.2.2 for Android emulator, or actual IP for devices
const API_URL = Platform.select({
    ios: 'http://localhost:8080/api',
    android: 'http://10.0.2.2:8080/api',
    default: 'http://localhost:8080/api',
});

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
    authToken = token;
};

const getHeaders = () => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (authToken) {
        // We are using a simple implementation where backend doesn't check Bearer token strictly yet
        // but let's add it for good measure if we add Spring Security later
        // Our backend currently might check X-User-Id for data isolation mock
        // For this implementation, we will assume backend returns the user ID on login
        // and we might need to send it.
        // However, looking at backend code:
        // @RequestHeader(value = "X-User-Id", defaultValue = "1") String userId
        // We should allow setting this user ID.
    }
    return headers;
};

// Simple ID storage
let currentUserId = '1';

export const setCurrentUserId = (id: string) => {
    currentUserId = id;
};

const request = async (endpoint: string, options: RequestInit = {}) => {
    const headers = {
        ...getHeaders(),
        // Pass the user ID header as expected by the backend controllers
        'X-User-Id': currentUserId,
        ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || error.error || 'API request failed');
    }

    // Handle empty responses (like DELETE)
    const text = await response.text();
    return text ? JSON.parse(text) : {};
};

export const api = {
    // Auth
    login: (credentials: any) => request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),
    signup: (data: any) => request('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    // Transactions
    getTransactions: (type?: string) => request(`/transactions${type ? `?type=${type}` : ''}`),
    addTransaction: (data: any) => request('/transactions', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    deleteTransaction: (id: string) => request(`/transactions/${id}`, {
        method: 'DELETE',
    }),

    // Analytics
    getSummary: () => request('/analytics/summary'),
    getCategoryTotals: () => request('/analytics/categories'),
    getChartData: () => request('/analytics/chart'),

    // User
    getProfile: () => request('/user/profile'),
    updateProfile: (data: any) => request('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
};
