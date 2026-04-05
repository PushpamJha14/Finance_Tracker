import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { theme } from '../theme/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    style,
    textStyle,
    icon,
}) => {
    const getBackgroundColor = () => {
        if (disabled) return theme.colors.text.secondary + '50'; // 50% opacity
        switch (variant) {
            case 'primary': return theme.colors.primary;
            case 'destructive': return theme.colors.error;
            case 'secondary': return theme.colors.surface;
            case 'outline': return 'transparent';
            default: return theme.colors.primary;
        }
    };

    const getTextColor = () => {
        if (disabled) return theme.colors.text.inverse;
        switch (variant) {
            case 'primary': return theme.colors.text.inverse;
            case 'destructive': return theme.colors.text.inverse;
            case 'secondary': return theme.colors.text.primary;
            case 'outline': return theme.colors.primary;
            default: return theme.colors.text.inverse;
        }
    };

    const getBorder = () => {
        if (variant === 'outline') {
            return { borderWidth: 1, borderColor: theme.colors.primary };
        }
        return {};
    };

    const getHeight = () => {
        switch (size) {
            case 'sm': return 36;
            case 'md': return 48;
            case 'lg': return 56;
            default: return 48;
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.container,
                {
                    backgroundColor: getBackgroundColor(),
                    height: getHeight(),
                    ...getBorder(),
                },
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={getTextColor()} />
            ) : (
                <>
                    {icon && <React.Fragment>{icon}</React.Fragment>}
                    <Text
                        style={[
                            styles.text,
                            {
                                color: getTextColor(),
                                marginLeft: icon ? theme.spacing.sm : 0,
                                fontSize: size === 'sm' ? 14 : 16,
                            },
                            textStyle,
                        ]}
                    >
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: theme.borderRadius.round,
        paddingHorizontal: theme.spacing.lg,
    },
    text: {
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
