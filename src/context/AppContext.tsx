import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, MOCK_TRANSACTIONS, MOCK_USER, MOCK_CATEGORIES } from '../mock/mockData';

interface AppContextType {
    user: typeof MOCK_USER;
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    deleteTransaction: (id: string) => void;
    balance: number;
    totalIncome: number;
    totalExpenses: number;
    categoryTotals: typeof MOCK_CATEGORIES;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

import { api } from '../services/api';
import { useAuth } from './AuthContext';

// ... (keep interface AppContextType as is or verify compat)
// Assuming MOCK_TRANSACTIONS, MOCK_USER, MOCK_CATEGORIES imports are still there but unused or used as fallback

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { isAuthenticated, user } = useAuth();

    // Initial state blank or loading preferrably, but using empty arrays for now
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [balance, setBalance] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [categoryTotals, setCategoryTotals] = useState<any[]>([]);

    const fetchData = async () => {
        try {
            const [txs, summary, cats] = await Promise.all([
                api.getTransactions(),
                api.getSummary(),
                api.getCategoryTotals()
            ]);
            setTransactions(txs);
            setBalance(summary.balance);
            setTotalIncome(summary.totalIncome);
            setTotalExpenses(summary.totalExpenses);
            setCategoryTotals(cats);
        } catch (e) {
            console.error("Failed to fetch data", e);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        } else {
            // Reset state on logout
            setTransactions([]);
            setBalance(0);
        }
    }, [isAuthenticated]);

    const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
        try {
            await api.addTransaction(transaction);
            fetchData(); // Refresh data to get updated summaries
        } catch (e) {
            console.error("Failed to add transaction", e);
        }
    };

    const deleteTransaction = async (id: string) => {
        try {
            await api.deleteTransaction(id);
            fetchData();
        } catch (e) {
            console.error("Failed to delete transaction", e);
        }
    };

    return (
        <AppContext.Provider value={{
            // @ts-ignore - mismatch between mock user and real user types for now
            user: user || MOCK_USER,
            transactions,
            addTransaction,
            deleteTransaction,
            balance,
            totalIncome,
            totalExpenses,
            categoryTotals,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
