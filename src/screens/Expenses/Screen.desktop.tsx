import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { Card } from '../../components/Card';
import { theme } from '../../theme/theme';

const FILTERS = ['All', 'Today', 'Week', 'Month', 'Food'];

export default function ExpensesDesktop() {
    const { transactions } = useApp();
    const [filter, setFilter] = useState('All');

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'All') return true;
        if (filter === 'Food') return t.category.includes('Food');
        return true;
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>All Expenses</Text>
                <View style={styles.headerControls}>
                    <Button title="Export CSV" variant="secondary" size="sm" onPress={() => { }} />
                </View>
            </View>

            <View style={styles.filterRow}>
                {FILTERS.map((f) => (
                    <Chip
                        key={f}
                        label={f}
                        selected={filter === f}
                        onPress={() => setFilter(f)}
                    />
                ))}
            </View>

            <Card style={styles.tableCard} noPadding>
                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <Text style={[styles.columnHeader, { flex: 2 }]}>Title</Text>
                    <Text style={[styles.columnHeader, { flex: 1 }]}>Category</Text>
                    <Text style={[styles.columnHeader, { flex: 1 }]}>Date</Text>
                    <Text style={[styles.columnHeader, { flex: 1, textAlign: 'right' }]}>Amount</Text>
                </View>

                {/* Table Rows */}
                <FlatList
                    data={filteredTransactions}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.row}>
                            <View style={[styles.cell, { flex: 2 }]}>
                                <View style={styles.iconPlaceholder}>
                                    <Text style={styles.iconText}>{item.title.charAt(0)}</Text>
                                </View>
                                <Text style={styles.cellTextPrimary}>{item.title}</Text>
                            </View>
                            <Text style={[styles.cell, { flex: 1 }]}>{item.category}</Text>
                            <Text style={[styles.cell, { flex: 1 }]}>{item.date}</Text>
                            <Text style={[styles.cell, { flex: 1, textAlign: 'right', fontWeight: '600' }]}>
                                {item.type === 'expense' ? '-' : '+'}${item.amount.toFixed(2)}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </Card>
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
        marginBottom: theme.spacing.md,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
    },
    headerControls: {
        flexDirection: 'row',
    },
    filterRow: {
        flexDirection: 'row',
        marginBottom: theme.spacing.lg,
    },
    tableCard: {
        flex: 1,
        overflow: 'hidden',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    columnHeader: {
        fontWeight: '600',
        color: theme.colors.text.secondary,
        fontSize: theme.typography.sizes.sm,
    },
    row: {
        flexDirection: 'row',
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        alignItems: 'center',
    },
    cell: {
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text.secondary,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cellTextPrimary: {
        color: theme.colors.text.primary,
        fontWeight: '500',
        marginLeft: theme.spacing.sm,
    },
    iconPlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        fontWeight: 'bold',
        color: theme.colors.primaryDark,
        fontSize: 12,
    },
});
