import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';

interface ChipProps {
    label: string;
    selected?: boolean;
    onPress?: () => void;
    style?: ViewStyle;
}

export const Chip: React.FC<ChipProps> = ({
    label,
    selected = false,
    onPress,
    style,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                selected ? styles.selectedContainer : styles.unselectedContainer,
                style,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    selected ? styles.selectedText : styles.unselectedText,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.round,
        marginRight: theme.spacing.sm,
        borderWidth: 1,
    },
    unselectedContainer: {
        backgroundColor: 'transparent',
        borderColor: theme.colors.border,
    },
    selectedContainer: {
        backgroundColor: theme.colors.primary + '20', // 20% opacity
        borderColor: theme.colors.primary,
    },
    text: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '500',
    },
    unselectedText: {
        color: theme.colors.text.secondary,
    },
    selectedText: {
        color: theme.colors.primaryDark,
    },
});
