import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/theme';

interface ListRowProps {
    title: string;
    subtitle?: string;
    amount?: string;
    amountColor?: string;
    icon?: string; // Placeholder for icon name or component
    onPress?: () => void;
}

export const ListRow: React.FC<ListRowProps> = ({
    title,
    subtitle,
    amount,
    amountColor = theme.colors.text.primary,
    icon,
    onPress,
}) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={!onPress} style={styles.container}>
            <View style={styles.left}>
                <View style={styles.iconPlaceholder}>
                    {/* Icon would go here */}
                    <Text style={styles.iconText}>{title.charAt(0)}</Text>
                </View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
            </View>
            {amount && (
                <Text style={[styles.amount, { color: amountColor }]}>
                    {amount}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.surface,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    iconText: {
        fontWeight: 'bold',
        color: theme.colors.primaryDark,
    },
    title: {
        fontSize: theme.typography.sizes.md,
        fontWeight: '500',
        color: theme.colors.text.primary,
    },
    subtitle: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
    },
    amount: {
        fontSize: theme.typography.sizes.md,
        fontWeight: '600',
    },
});
