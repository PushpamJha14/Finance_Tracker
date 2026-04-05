import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { theme } from '../../theme/theme';

export default function HomeDesktop() {
    const navigation = useNavigation<any>();
    const { balance, totalIncome, totalExpenses, categoryTotals } = useApp();

    const handleAddExpense = () => {
        navigation.navigate('AddExpense');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Dashboard</Text>
                <Button
                    title="Add Expense"
                    onPress={handleAddExpense}
                    size="sm"
                    icon={<Text style={styles.btnIcon}>+</Text>}
                />
            </View>

            <ScrollView contentContainerStyle={styles.grid}>
                <View style={styles.leftColumn}>
                    {/* Main Balance Card */}
                    <Card style={styles.balanceCard}>
                        <Text style={styles.balanceLabel}>Total Balance</Text>
                        <Text style={styles.balanceAmount}>${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                        <View style={styles.balanceStats}>
                            <View style={styles.balanceStatItem}>
                                <Text style={styles.statLabelWhite}>Income</Text>
                                <Text style={styles.statValueWhite}>+${totalIncome.toLocaleString()}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.balanceStatItem}>
                                <Text style={styles.statLabelWhite}>Expenses</Text>
                                <Text style={styles.statValueWhite}>-${totalExpenses.toLocaleString()}</Text>
                            </View>
                        </View>
                    </Card>

                    {/* Recent Activity Mini-Section could go here */}
                    <View style={styles.quickStatsRow}>
                        <Card style={styles.quickStatCard}>
                            <Text style={styles.qsLabel}>This Week</Text>
                            <Text style={styles.qsValue}>-$450.00</Text>
                        </Card>
                        <Card style={styles.quickStatCard}>
                            <Text style={styles.qsLabel}>Savings Goal</Text>
                            <Text style={styles.qsValue}>85%</Text>
                        </Card>
                    </View>
                </View>

                <View style={styles.rightColumn}>
                    <Card style={styles.categoriesCard}>
                        <Text style={styles.cardTitle}>Spending by Category</Text>

                        {categoryTotals.map((category) => (
                            <View key={category.id} style={styles.categoryRow}>
                                <View style={styles.categoryInfo}>
                                    <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
                                    <Text style={styles.categoryName}>{category.name}</Text>
                                </View>

                                <View style={styles.categoryValues}>
                                    <Text style={styles.categoryAmount}>${category.amount.toLocaleString()}</Text>
                                    <View style={styles.progressBarBg}>
                                        <View
                                            style={[
                                                styles.progressBarFill,
                                                { width: '50%', backgroundColor: category.color }
                                            ]}
                                        />
                                    </View>
                                </View>
                            </View>
                        ))}
                    </Card>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
    },
    btnIcon: {
        color: 'white',
        fontWeight: 'bold',
        marginRight: 4,
        fontSize: 18,
    },
    grid: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    leftColumn: {
        flex: 2,
        marginRight: theme.spacing.xl,
    },
    rightColumn: {
        flex: 1.5,
    },
    balanceCard: {
        backgroundColor: theme.colors.primaryDark,
        padding: theme.spacing.xl,
        marginBottom: theme.spacing.lg,
    },
    balanceLabel: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: theme.typography.sizes.md,
    },
    balanceAmount: {
        color: 'white',
        fontSize: 48,
        fontWeight: 'bold',
        marginVertical: theme.spacing.sm,
    },
    balanceStats: {
        flexDirection: 'row',
        marginTop: theme.spacing.lg,
        alignItems: 'center',
    },
    balanceStatItem: {
        marginRight: theme.spacing.xl,
    },
    divider: {
        width: 1,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginRight: theme.spacing.xl,
    },
    statLabelWhite: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: theme.typography.sizes.sm,
    },
    statValueWhite: {
        color: 'white',
        fontSize: theme.typography.sizes.lg,
        fontWeight: '600',
    },
    quickStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    quickStatCard: {
        flex: 1,
        marginRight: theme.spacing.md,
        // last child margin hack not needed if precise
    },
    qsLabel: {
        color: theme.colors.text.secondary,
        fontSize: theme.typography.sizes.sm,
    },
    qsValue: {
        fontSize: theme.typography.sizes.xl,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginTop: 4,
    },
    categoriesCard: {
        height: '100%',
    },
    cardTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: 'bold',
        marginBottom: theme.spacing.lg,
    },
    categoryRow: {
        marginBottom: theme.spacing.lg,
    },
    categoryInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    categoryDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        marginRight: theme.spacing.sm,
    },
    categoryName: {
        fontSize: theme.typography.sizes.md,
        fontWeight: '500',
    },
    categoryValues: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    categoryAmount: {
        width: 80,
        fontWeight: '600',
        color: theme.colors.text.secondary,
    },
    progressBarBg: {
        flex: 1,
        height: 6,
        backgroundColor: theme.colors.surface,
        borderRadius: 3,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
});
