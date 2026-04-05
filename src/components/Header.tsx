import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/theme';

interface HeaderProps {
    title?: string;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    leftElement,
    rightElement,
    onBack,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {onBack ? (
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <Text style={styles.backText}>{'<'}</Text>
                    </TouchableOpacity>
                ) : (
                    leftElement
                )}
            </View>

            <View style={styles.titleContainer}>
                {title && <Text style={styles.title}>{title}</Text>}
            </View>

            <View style={styles.rightContainer}>
                {rightElement}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.md,
        backgroundColor: theme.colors.background,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    leftContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    titleContainer: {
        flex: 2,
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: '600',
        color: theme.colors.text.primary,
    },
    backButton: {
        padding: theme.spacing.sm,
    },
    backText: {
        fontSize: 24,
        color: theme.colors.text.primary,
        lineHeight: 24,
    },
});
