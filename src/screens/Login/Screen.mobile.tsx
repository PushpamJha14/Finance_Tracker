import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { theme } from '../../theme/theme';

export default function LoginMobile() {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            await login({ email, password });
            // Navigation handles the switch based on isAuthenticated state
        } catch (error: any) {
            alert(error.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        navigation.navigate('Signup');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>FA</Text>
                </View>
                <Text style={styles.welcomeText}>Welcome Back</Text>
            </View>

            <View style={styles.form}>
                <Input
                    label="Email Address"
                    placeholder="your@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Input
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <Button
                    title="Log In"
                    onPress={handleLogin}
                    style={styles.loginButton}
                />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={handleSignup}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.lg,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: theme.spacing.xxl,
    },
    logoContainer: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.md,
    },
    logoText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
    },
    form: {
        width: '100%',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: theme.spacing.lg,
    },
    forgotPasswordText: {
        color: theme.colors.primary,
        fontWeight: '500',
    },
    loginButton: {
        marginBottom: theme.spacing.lg,
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
