import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { theme } from '../../theme/theme';

const PROFILE_MENU = [
    { id: '1', title: 'Change Password', icon: '🔒' },
    { id: '2', title: 'Privacy Policy', icon: '🛡️' },
    { id: '3', title: 'Help & Support', icon: '❓' },
    { id: '4', title: 'About App', icon: 'ℹ️', subtitle: 'v1.0.0' },
];

export default function ProfileMobile() {
    const navigation = useNavigation<any>();
    const { user } = useApp();

    const handleLogout = () => {
        navigation.replace('Auth');
    };

    return (
        <View style={styles.container}>
            <Header title="Profile" />

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.userInfo}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                </View>

                <View style={styles.menuContainer}>
                    {PROFILE_MENU.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.menuItem}>
                            <View style={styles.menuLeft}>
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                                <View>
                                    <Text style={styles.menuTitle}>{item.title}</Text>
                                    {item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
                                </View>
                            </View>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Button
                    title="Log Out"
                    variant="destructive"
                    onPress={handleLogout}
                    style={styles.logoutButton}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: theme.spacing.lg,
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: theme.spacing.md,
        backgroundColor: theme.colors.surface,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text.secondary,
    },
    menuContainer: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.lg,
        paddingVertical: theme.spacing.xs,
        marginBottom: theme.spacing.xl,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.background,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 20,
        marginRight: theme.spacing.md,
        width: 24,
        textAlign: 'center',
    },
    menuTitle: {
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text.primary,
    },
    menuSubtitle: {
        fontSize: 12,
        color: theme.colors.text.secondary,
    },
    chevron: {
        fontSize: 20,
        color: theme.colors.text.secondary,
    },
    logoutButton: {
        marginTop: theme.spacing.md,
    },
});
