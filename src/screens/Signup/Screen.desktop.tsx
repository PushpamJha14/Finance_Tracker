import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { theme } from '../../theme/theme';

import { useAuth } from '../../context/AuthContext';

export default function SignupDesktop() {
    const navigation = useNavigation<any>();
    const { signup } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        try {
            await signup({ name, email, password });
            // Navigation handled by auth state
        } catch (e: any) {
            setError(e.message || 'Signup failed');
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.leftPanel}>
                    <View style={styles.illustration}>
                        <Text style={styles.illustrationText}>Join Us!</Text>
                        <Text style={styles.illustrationSubtext}>Start tracking your expenses like a pro.</Text>
                    </View>
                </View>

                <View style={styles.rightPanel}>
                    <View style={styles.header}>
                        <Text style={styles.welcomeText}>Create Account</Text>
                        <Text style={styles.subText}>Fill in your details to get started.</Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            value={name}
                            onChangeText={setName}
                            containerStyle={styles.input}
                        />
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
                            placeholder="Create a password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            containerStyle={styles.input}
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
        height: 700, // Slightly taller for signup
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
    button: {
        marginTop: 10,
        marginBottom: theme.spacing.xl,
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
