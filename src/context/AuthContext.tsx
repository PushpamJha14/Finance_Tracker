import React, { createContext, useContext, useState, ReactNode } from 'react';
import { api, setAuthToken, setCurrentUserId } from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (credentials: any) => Promise<void>;
    signup: (data: any) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (credentials: any) => {
        const response = await api.login(credentials);
        const { token, user } = response;
        if (token && user) {
            setAuthToken(token);
            setCurrentUserId(user.id);
            setUser(user);
            setIsAuthenticated(true);
        }
    };

    const signup = async (data: any) => {
        const response = await api.signup(data);
        const { token, user } = response;
        if (token && user) {
            setAuthToken(token);
            setCurrentUserId(user.id);
            setUser(user);
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        setAuthToken(null);
        setCurrentUserId('1'); // Reset to default or clear
        setUser(null);
        setIsAuthenticated(false);
    };

    // Placeholder for persistent auth check (e.g., from AsyncStorage)
    const checkAuth = async () => {
        // Implement token logic here
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
