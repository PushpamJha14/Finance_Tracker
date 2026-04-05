import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens (to be implemented)
import { Sidebar } from '../components/Sidebar';
import { TabBar } from '../components/TabBar';
import { useIsDesktop } from '../responsive/useIsDesktop';
import { theme } from '../theme/theme';

// Placeholder components until real screens are implemented
const PlaceholderScreen = ({ name }: { name: string }) => (
    <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>{name} Screen</Text>
    </View>
);
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigator
const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={require('../screens/Onboarding/Screen').default} />
            <Stack.Screen name="Login" component={require('../screens/Login/Screen').default} />
            <Stack.Screen name="Signup" component={require('../screens/Signup/Screen').default} />
        </Stack.Navigator>
    );
};

// Main App Tabs (Mobile)
const MobileAppNavigator = () => {
    return (
        <Tab.Navigator
            tabBar={props => <TabBar {...props} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={require('../screens/Home/Screen').default} />
            <Tab.Screen name="Expenses" component={require('../screens/Expenses/Screen').default} />
            <Tab.Screen name="Analytics" component={require('../screens/Analytics/Screen').default} />
            <Tab.Screen name="Profile" component={require('../screens/Profile/Screen').default} />
        </Tab.Navigator>
    );
};

// Main App Sidebar (Desktop)
const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <View style={styles.desktopContainer}>
            <Sidebar />
            <View style={styles.desktopContent}>
                {children}
            </View>
        </View>
    );
};

const DesktopAppNavigator = () => {
    return (
        <DesktopLayout>
            <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
                <Stack.Screen name="Home" component={require('../screens/Home/Screen').default} />
                <Stack.Screen name="Expenses" component={require('../screens/Expenses/Screen').default} />
                <Stack.Screen name="Analytics" component={require('../screens/Analytics/Screen').default} />
                <Stack.Screen name="Profile" component={require('../screens/Profile/Screen').default} />
            </Stack.Navigator>
        </DesktopLayout>
    );
};

// Root Navigator
import { useAuth } from '../context/AuthContext';

export const Navigation = () => {
    const { isAuthenticated } = useAuth();
    const isDesktop = useIsDesktop();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (
                    <>
                        <Stack.Screen name="App">
                            {() => isDesktop ? <DesktopAppNavigator /> : <MobileAppNavigator />}
                        </Stack.Screen>
                        <Stack.Screen name="AddExpense" component={require('../screens/AddExpense/Screen').default}
                            options={{ presentation: 'modal' }}
                        />
                    </>
                ) : (
                    <Stack.Screen name="Auth" component={AuthStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    placeholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
    },
    placeholderText: {
        fontSize: 20,
        color: theme.colors.text.primary,
    },
    desktopContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: theme.colors.background,
    },
    desktopContent: {
        flex: 1,
        backgroundColor: theme.colors.surface,
    },
});
