import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { theme } from '../../theme/theme';
import { api } from '../../services/api';

export default function AnalyticsMobile() {
    const { categoryTotals } = useApp();
    const [chartData, setChartData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await api.getChartData();
                setChartData(data);
            } catch (error) {
                console.error('Failed to load chart data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header title="Analytics" />

            <ScrollView contentContainerStyle={styles.content}>
                {/* Donut Chart Mock */}
                <Card style={styles.chartCard}>
                    <Text style={styles.cardTitle}>Spending Categories (30 Days)</Text>
                    <View style={styles.donutContainer}>
                        {/* Visual Mock of valid donut chart would be complex with just Views, 
                so using a list of legend items with visual indicators instead.
                A real app would use victory-native or react-native-chart-kit */}
                        <View style={styles.donutMockCircle}>
                            <Text style={styles.totalText}>
                                ${categoryTotals.reduce((sum, cat) => sum + cat.amount, 0).toLocaleString()}
                            </Text>
                            <Text style={styles.totalSubText}>Total</Text>
                        </View>
                    </View>

                    <View style={styles.legendContainer}>
                        {categoryTotals.slice(0, 4).map(cat => (
                            <View key={cat.id} style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: cat.color }]} />
                                <Text style={styles.legendText}>{cat.name}</Text>
                                <Text style={styles.legendAmount}>${cat.amount.toLocaleString()}</Text>
                            </View>
                        ))}
                    </View>
                </Card>

                {/* Bar Chart Mock */}
                <Card style={styles.chartCard}>
                    <Text style={styles.cardTitle}>Income vs Expenses</Text>
                    <View style={styles.barChartContainer}>
                        {chartData && chartData.labels && chartData.labels.map((label: string, index: number) => {
                            const income = chartData.monthlyIncome[index] || 0;
                            const expense = chartData.monthlyExpenses[index] || 0;
                            const max = Math.max(
                                ...chartData.monthlyIncome,
                                ...chartData.monthlyExpenses,
                                100 // Prevent division by zero
                            ) * 1.2;

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

                {/* Insights */}
                <View style={styles.insightsSection}>
                    <Text style={styles.sectionTitle}>Financial Insights</Text>
                    <Card style={styles.insightCard}>
                        <Text style={styles.insightText}>• Your spending on <Text style={{ fontWeight: 'bold' }}>Food</Text> is 15% lower than last month. Great job!</Text>
                    </Card>
                    <Card style={styles.insightCard}>
                        <Text style={styles.insightText}>• You subscribed to <Text style={{ fontWeight: 'bold' }}>Netflix</Text>. This is a recurring expense.</Text>
                    </Card>
                </View>
            </ScrollView>
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
    },
    chartCard: {
        marginBottom: theme.spacing.lg,
        padding: theme.spacing.lg,
    },
    cardTitle: {
        fontSize: theme.typography.sizes.md,
        fontWeight: 'bold',
        marginBottom: theme.spacing.lg,
        color: theme.colors.text.primary,
    },
    donutContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        marginBottom: theme.spacing.lg,
    },
    donutMockCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 10,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    totalText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
    },
    totalSubText: {
        fontSize: 12,
        color: theme.colors.text.secondary,
    },
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    legendItem: {
        width: '48%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    legendText: {
        fontSize: 12,
        color: theme.colors.text.secondary,
        flex: 1,
    },
    legendAmount: {
        fontSize: 12,
        fontWeight: '600',
    },
    barChartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 150,
        paddingBottom: 20,
    },
    barGroup: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        width: 30,
    },
    bar: {
        width: 8,
        borderRadius: 4,
        marginHorizontal: 1,
    },
    barLabel: {
        position: 'absolute',
        bottom: -20,
        fontSize: 10,
        color: theme.colors.text.secondary,
    },
    insightsSection: {
        marginVertical: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.typography.sizes.lg,
        fontWeight: 'bold',
        marginBottom: theme.spacing.md,
    },
    insightCard: {
        marginBottom: theme.spacing.sm,
        backgroundColor: theme.colors.surface,
    },
    insightText: {
        lineHeight: 20,
        color: theme.colors.text.primary,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
