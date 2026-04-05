import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/Card';
import { theme } from '../../theme/theme';
import { MOCK_CHART_DATA } from '../../mock/mockData';

export default function AnalyticsDesktop() {
    const { categoryTotals } = useApp();

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Analytics</Text>

            <View style={styles.chartsRow}>
                {/* Donut Chart Mock */}
                <Card style={[styles.chartCard, { flex: 1, marginRight: theme.spacing.lg }]}>
                    <Text style={styles.cardTitle}>Spending Categories</Text>
                    <View style={styles.donutLayout}>
                        <View style={styles.donutContainer}>
                            <View style={styles.donutMockCircle}>
                                <Text style={styles.totalText}>$725</Text>
                                <Text style={styles.totalSubText}>Total</Text>
                            </View>
                        </View>

                        <View style={styles.legendContainer}>
                            {categoryTotals.map(cat => (
                                <View key={cat.id} style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: cat.color }]} />
                                    <Text style={styles.legendText}>{cat.name}</Text>
                                    <Text style={styles.legendAmount}>${cat.amount}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </Card>

                {/* Bar Chart Mock */}
                <Card style={[styles.chartCard, { flex: 1.5 }]}>
                    <Text style={styles.cardTitle}>Income vs Expenses</Text>
                    <View style={styles.barChartContainer}>
                        {MOCK_CHART_DATA.labels.map((label, index) => {
                            const income = MOCK_CHART_DATA.monthlyIncome[index];
                            const expense = MOCK_CHART_DATA.monthlyExpenses[index];
                            const max = 4000;

                            return (
                                <View key={label} style={styles.barGroup}>
                                    <View style={[styles.bar, { height: (income / max) * 100, backgroundColor: theme.colors.success }]} />
                                    <View style={[styles.bar, { height: (expense / max) * 100, backgroundColor: theme.colors.error }]} />
                                    <Text style={styles.barLabel}>{label}</Text>
                                </View>
                            );
                        })}
                    </View>
                </Card>
            </View>

            {/* Insights */}
            <View style={styles.insightsSection}>
                <Card style={styles.insightCard}>
                    <Text style={styles.cardTitle}>Financial Insights</Text>
                    <View style={styles.insightRow}>
                        <Text style={styles.insightText}>• Your spending on <Text style={{ fontWeight: 'bold' }}>Food</Text> is 15% lower than last month. Great job!</Text>
                    </View>
                    <View style={styles.insightRow}>
                        <Text style={styles.insightText}>• You subscribed to <Text style={{ fontWeight: 'bold' }}>Netflix</Text>. This is a recurring expense.</Text>
                    </View>
                    <View style={styles.insightRow}>
                        <Text style={styles.insightText}>• You have saved 20% of your income this month.</Text>
                    </View>
                </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.xl,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xl,
    },
    chartsRow: {
        flexDirection: 'row',
        marginBottom: theme.spacing.lg,
        height: 350,
    },
    chartCard: {
        height: '100%',
        padding: theme.spacing.xl,
    },
    cardTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: 'bold',
        marginBottom: theme.spacing.xl,
        color: theme.colors.text.primary,
    },
    donutLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    donutContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    donutMockCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 15,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
    },
    totalSubText: {
        fontSize: 14,
        color: theme.colors.text.secondary,
    },
    legendContainer: {
        flex: 1,
        paddingLeft: theme.spacing.lg,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    legendText: {
        fontSize: 14,
        color: theme.colors.text.secondary,
        flex: 1,
    },
    legendAmount: {
        fontSize: 14,
        fontWeight: '600',
    },
    barChartContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    barGroup: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '80%',
        width: 40,
    },
    bar: {
        width: 12,
        borderRadius: 4,
        marginHorizontal: 2,
    },
    barLabel: {
        position: 'absolute',
        bottom: -25,
        fontSize: 12,
        color: theme.colors.text.secondary,
    },
    insightsSection: {
        flex: 1,
    },
    insightCard: {
        padding: theme.spacing.xl,
    },
    insightRow: {
        marginBottom: theme.spacing.md,
    },
    insightText: {
        fontSize: 16,
        color: theme.colors.text.primary,
    },
});
