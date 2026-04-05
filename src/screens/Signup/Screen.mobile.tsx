import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { theme } from '../../theme/theme';

export default function SignupMobile() {
    const navigation = useNavigation<any>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            await signup({ name, email, password });
            // Navigation handles the switch based on isAuthenticated state
        } catch (error: any) {
            alert(error.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Start your financial journey today</Text>
            </View>

            <View style={styles.form}>
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    value={name}
                    onChangeText={setName}
                />
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
                    placeholder="Create a password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Button
                    title="Sign Up"
                    onPress={handleSignup}
                    style={styles.button}
                />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.loginText}>Log In</Text>
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
        marginBottom: theme.spacing.xxl,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text.secondary,
    },
    form: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        color: theme.colors.text.secondary,
    },
    loginText: {
        color: theme.colors.primary,
        fontWeight: '600',
    },
});
