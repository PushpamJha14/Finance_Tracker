import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { theme } from '../theme/theme';

interface SidebarItemProps {
    label: string;
    routeName: string;
    isActive: boolean;
    onPress: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, isActive, onPress }) => (
    <TouchableOpacity
        style={[
            styles.item,
            isActive && styles.activeItem,
        ]}
        onPress={onPress}
    >
        <Text style={[styles.itemText, isActive && styles.activeItemText]}>
            {label}
        </Text>
    </TouchableOpacity>
);

export const Sidebar: React.FC = () => {
    const navigation = useNavigation<any>();

    // Get the current route name from the navigation state
    // We look for the nested 'App' stack or just the top level state depending on structure
    const activeRouteName = useNavigationState(state => {
        if (!state) return 'Home';

        // Traverse to the deepest active route
        let route: any = state.routes[state.index];
        // If we are in the root navigator, and the active route is 'App', 
        // we might not have the nested state available immediately in route object if it's not exposed same way.
        // But traversing state.routes[state.index] usually works if state is hydrated.
        while (route.state && route.state.index !== undefined) {
            // @ts-ignore
            route = route.state.routes[route.state.index];
        }
        return route.name;
    });

    const navigateTo = (screen: string) => {
        // Since Sidebar is outside the inner stack, we must target the nested screen explicitly
        // implicitly relying on 'App' being the parent route name in Navigation.tsx
        navigation.navigate('App', { screen: screen });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>FinanceApp</Text>
            </View>

            <ScrollView style={styles.content}>
                <SidebarItem
                    label="Home"
                    routeName="Home"
                    isActive={activeRouteName === 'Home'}
                    onPress={() => navigateTo('Home')}
                />
                <SidebarItem
                    label="Expenses"
                    routeName="Expenses"
                    isActive={activeRouteName === 'Expenses'}
                    onPress={() => navigateTo('Expenses')}
                />
                <SidebarItem
                    label="Analytics"
                    routeName="Analytics"
                    isActive={activeRouteName === 'Analytics'}
                    onPress={() => navigateTo('Analytics')}
                />
                <SidebarItem
                    label="Profile"
                    routeName="Profile"
                    isActive={activeRouteName === 'Profile'}
                    onPress={() => navigateTo('Profile')}
                />
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.version}>v1.0.0</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 250,
        backgroundColor: theme.colors.surface,
        borderRightWidth: 1,
        borderRightColor: theme.colors.border,
        paddingVertical: theme.spacing.lg,
    },
    header: {
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.xxl,
    },
    logo: {
        fontSize: theme.typography.sizes.xl,
        fontWeight: 'bold',
        color: theme.colors.primaryDark,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.md,
    },
    item: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.xs,
    },
    activeItem: {
        backgroundColor: theme.colors.primary + '15',
    },
    itemText: {
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text.secondary,
        fontWeight: '500',
    },
    activeItemText: {
        color: theme.colors.primaryDark,
        fontWeight: '600',
    },
    footer: {
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.lg,
    },
    version: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.text.secondary,
    },
});
