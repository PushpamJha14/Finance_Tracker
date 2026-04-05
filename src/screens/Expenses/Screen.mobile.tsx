import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/Header';
import { Chip } from '../../components/Chip';
import { ListRow } from '../../components/ListRow';
import { theme } from '../../theme/theme';

const FILTERS = ['All', 'Today', 'Week', 'Month', 'Food'];

export default function ExpensesMobile() {
    const { transactions } = useApp();
    const [filter, setFilter] = useState('All');

    const filteredTransactions = transactions.filter(t => {
        if (filter === 'All') return true;
        if (filter === 'Food') return t.category.includes('Food');
        // Simplified filtering
        return true;
    });

    return (
        <View style={styles.container}>
            <Header title="Expenses" />

            <View style={styles.filterContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {FILTERS.map((f) => (
                        <Chip
                            key={f}
                            label={f}
                            selected={filter === f}
                            onPress={() => setFilter(f)}
                        />
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredTransactions}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <ListRow
                        title={item.title}
                        subtitle={item.date}
                        amount={(item.type === 'expense' ? '-' : '+') + `$${item.amount.toFixed(2)}`}
                        amountColor={item.type === 'expense' ? theme.colors.text.primary : theme.colors.success}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No transactions found</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    filterContainer: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.surface,
    },
    listContent: {
        paddingHorizontal: theme.spacing.md,
    },
    emptyState: {
        padding: theme.spacing.xl,
        alignItems: 'center',
    },
    emptyText: {
        color: theme.colors.text.secondary,
    },
});
