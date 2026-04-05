import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { theme } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function LoginDesktop() {
    const navigation = useNavigation<any>();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            await login({ email, password });
            // Navigation handled by auth state change usually, or explicit if needed
            // But Navigation.tsx likely watches auth state if we implemented it right
            // For now, let's assume we need to trigger it or just wait for state update
            // If Navigation.tsx doesn't watch auth, we push.
            // But let's check Navigation.tsx in next step.
            // For now, stick to original flow but with API call
        } catch (e: any) {
            setError(e.message || 'Login failed');
        }
    };

    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Left Illustration Panel */}
                <View style={styles.leftPanel}>
                    <View style={styles.illustration}>
                        <Text style={styles.illustrationText}>Welcome Back!</Text>
                        <Text style={styles.illustrationSubtext}>Manage your finance with ease.</Text>
                    </View>
                </View>

                {/* Right Form Panel */}
                <View style={styles.rightPanel}>
                    <View style={styles.header}>
                        <Text style={styles.welcomeText}>Login to Account</Text>
                        <Text style={styles.subText}>Please enter your details to continue.</Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Email Address"
                            placeholder="your@email.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            containerStyle={styles.input}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            containerStyle={styles.input}
                        />

                        <View style={styles.optionsRow}>
                            <TouchableOpacity>
                                <Text style={styles.forgotPasswordText}>Recall Password?</Text>
                            </TouchableOpacity>
                        </View>

                        <Button
                            title="Log In"
                            onPress={handleLogin}
                            style={styles.loginButton}
                        />

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <TouchableOpacity onPress={handleSignup}>
                                <Text style={styles.signupText}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flexDirection: 'row',
        width: 900,
        height: 600,
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.xl,
        ...theme.shadows.medium,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    leftPanel: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.xxl,
        justifyContent: 'center',
        alignItems: 'center',
    },
    illustration: {
        alignItems: 'center',
    },
    illustrationText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: theme.spacing.md,
    },
    illustrationSubtext: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 18,
        textAlign: 'center',
    },
    rightPanel: {
        flex: 1.2,
        padding: 60,
        justifyContent: 'center',
    },
    header: {
        marginBottom: 40,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.sm,
    },
    subText: {
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text.secondary,
    },
    form: {
        width: '100%',
    },
    input: {
        marginBottom: 20,
    },
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: theme.colors.text.secondary,
    },
    loginButton: {
        marginBottom: theme.spacing.xl,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        color: theme.colors.text.secondary,
    },
    signupText: {
        color: theme.colors.primary,
        fontWeight: '600',
    },
});
