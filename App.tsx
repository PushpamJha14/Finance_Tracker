import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigation } from './src/navigation/Navigation';
import { AppProvider } from './src/context/AppContext';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider } from './src/context/AuthContext';

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <AppProvider>
                    <StatusBar style="auto" />
                    <Navigation />
                </AppProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
