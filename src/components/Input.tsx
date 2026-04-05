import React from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextInputProps } from 'react-native';
import { theme } from '../theme/theme';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    containerStyle?: ViewStyle;
    rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    containerStyle,
    rightElement,
    style,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[
                styles.inputContainer,
                error ? { borderColor: theme.colors.error } : null
            ]}>
                <TextInput
                    style={[
                        styles.input,
                        props.multiline && styles.multilineInput,
                        style
                    ]}
                    placeholderTextColor={theme.colors.text.secondary}
                    {...props}
                />
                {rightElement && (
                    <View style={styles.rightElement}>
                        {rightElement}
                    </View>
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.md,
    },
    label: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '500',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xs,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.background,
        overflow: 'hidden',
    },
    input: {
        flex: 1,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text.primary,
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    rightElement: {
        paddingRight: theme.spacing.md,
    },
    error: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.error,
        marginTop: theme.spacing.xs,
    },
});
