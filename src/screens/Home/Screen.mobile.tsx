import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/Card';
import { Header } from '../../components/Header';
import { theme } from '../../theme/theme';

export default function HomeMobile() {
    const navigation = useNavigation<any>();
    const { user, balance, totalIncome, totalExpenses, categoryTotals } = useApp();

    const handleAddExpense = () => {
        navigation.navigate('AddExpense');
    };

    const renderHeaderLeft = (
        <View style={styles.headerLeft}>
            <View style={styles.appIcon}>
                <Text style={styles.appIconText}>FA</Text>
            </View>
        </View>
    );

    const renderHeaderRight = (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header
                leftElement={renderHeaderLeft}
                rightElement={renderHeaderRight}
            />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Balance Card */}
                <Card style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Current Balance</Text>
                    <Text style={styles.balanceAmount}>${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                    <Text style={styles.balanceSubtitle}>Available to spend</Text>
                </Card>

                {/* Income & Expenses Row */}
                <View style={styles.statsRow}>
                    <Card style={[styles.statCard, { marginRight: theme.spacing.sm }]}>
                        <Text style={styles.statLabel}>Total Income</Text>
                        <Text style={[styles.statAmount, { color: theme.colors.success }]}>
                            +${totalIncome.toLocaleString()}
                        </Text>
                    </Card>
                    <Card style={[styles.statCard, { marginLeft: theme.spacing.sm }]}>
                        <Text style={styles.statLabel}>Total Expenses</Text>
                        <Text style={[styles.statAmount, { color: theme.colors.error }]}>
                            -${totalExpenses.toLocaleString()}
                        </Text>
                    </Card>
                </View>

                {/* Category Breakdown */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Spending Categories</Text>
                </View>

                {categoryTotals.map((category) => (
                    <View key={category.id} style={styles.categoryRow}>
                        <View style={styles.categoryInfo}>
                            <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                            <Text style={styles.categoryName}>{category.name}</Text>
                        </View>

                        <View style={styles.categoryAmountContainer}>
                            <Text style={styles.categoryAmount}>${category.amount.toLocaleString()}</Text>
                            {/* Simple Progres Bar */}
                            <View style={styles.progressBarBg}>
                                <View
                                    style={[
                                        styles.progressBarFill,
                                        { width: '40%', backgroundColor: category.color } // Mock %
                                    ]}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* FAB */}
            <TouchableOpacity style={styles.fab} onPress={handleAddExpense}>
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: theme.spacing.md,
        paddingBottom: 100, // For FAB
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appIcon: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    appIconText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.colors.surface,
    },
    balanceCard: {
        backgroundColor: theme.colors.primaryDark,
        marginBottom: theme.spacing.md,
        alignItems: 'center',
        paddingVertical: theme.spacing.xl,
    },
    balanceLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: theme.typography.sizes.sm,
        marginBottom: theme.spacing.xs,
    },
    balanceAmount: {
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: theme.spacing.xs,
    },
    balanceSubtitle: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: theme.typography.sizes.xs,
    },
    statsRow: {
        flexDirection: 'row',
        marginBottom: theme.spacing.lg,
    },
    statCard: {
        flex: 1,
    },
    statLabel: {
        fontSize: theme.typography.sizes.xs,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.xs,
    },
    statAmount: {
        fontSize: theme.typography.sizes.md,
        fontWeight: 'bold',
    },
    sectionHeader: {
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    categoryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: theme.spacing.sm,
    },
    categoryName: {
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text.primary,
    },
    categoryAmountContainer: {
        alignItems: 'flex-end',
        width: 100,
    },
    categoryAmount: {
        fontSize: theme.typography.sizes.md,
        fontWeight: '600',
        marginBottom: 4,
    },
    progressBarBg: {
        width: '100%',
        height: 4,
        backgroundColor: theme.colors.surface,
        borderRadius: 2,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 2,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.medium,
    },
    fabIcon: {
        fontSize: 32,
        color: 'white',
        marginTop: -2,
    },
});
