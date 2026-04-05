import React from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { theme } from '../theme/theme';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    onPress?: () => void;
    variant?: 'elevated' | 'outlined' | 'flat';
    noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    style,
    onPress,
    variant = 'elevated',
    noPadding = false,
}) => {
    const getVariantStyle = () => {
        switch (variant) {
            case 'elevated':
                return styles.elevated;
            case 'outlined':
                return styles.outlined;
            case 'flat':
                return styles.flat;
            default:
                return styles.elevated;
        }
    };

    const Container = onPress ? Pressable : View;

    return (
        <Container
            onPress={onPress}
            style={[
                styles.container,
                getVariantStyle(),
                noPadding ? { padding: 0 } : { padding: theme.spacing.md },
                style,
            ]}
        >
            {children}
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.borderRadius.lg,
        backgroundColor: theme.colors.background,
    },
    elevated: {
        ...theme.shadows.soft,
    },
    outlined: {
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    flat: {
        backgroundColor: theme.colors.surface,
    },
});
