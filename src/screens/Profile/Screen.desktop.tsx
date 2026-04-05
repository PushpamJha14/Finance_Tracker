import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { theme } from '../../theme/theme';

const PROFILE_MENU = [
    { id: '1', title: 'Change Password', icon: '🔒', description: 'Update your security settings' },
    { id: '2', title: 'Privacy Policy', icon: '🛡️', description: 'Read our terms and conditions' },
    { id: '3', title: 'Help & Support', icon: '❓', description: 'Get help with your account' },
    { id: '4', title: 'About App', icon: 'ℹ️', description: 'Version 1.0.0' },
];

export default function ProfileDesktop() {
    const navigation = useNavigation<any>();
    const { user } = useApp();

    const handleLogout = () => {
        navigation.replace('Auth');
    };

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <View style={styles.header}>
                    <Image source={{ uri: user.avatar }} style={styles.avatar} />
                    <View>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                        <TouchableOpacity>
                            <Text style={styles.editLink}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <Button
                        title="Log Out"
                        variant="destructive"
                        size="sm"
                        onPress={handleLogout}
                        style={styles.logoutBtnHead}
                    />
                </View>

                <View style={styles.divider} />

                <View style={styles.menuGrid}>
                    {PROFILE_MENU.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.menuItem}>
                            <View style={styles.iconBox}>
                                <Text style={styles.icon}>{item.icon}</Text>
                            </View>
                            <View>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuDesc}>{item.description}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.xl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '100%',
        maxWidth: 800,
        padding: theme.spacing.xl,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: theme.spacing.lg,
        backgroundColor: theme.colors.surface,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
    },
    userEmail: {
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text.secondary,
        marginBottom: 4,
    },
    editLink: {
        color: theme.colors.primary,
        fontWeight: '500',
    },
    logoutBtnHead: {
        marginLeft: 'auto',
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginBottom: theme.spacing.xl,
    },
    menuGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    menuItem: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        marginBottom: theme.spacing.lg,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
        ...theme.shadows.soft,
    },
    icon: {
        fontSize: 24,
    },
    menuTitle: {
        fontSize: theme.typography.sizes.md,
        fontWeight: '600',
        color: theme.colors.text.primary,
        marginBottom: 2,
    },
    menuDesc: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
});
