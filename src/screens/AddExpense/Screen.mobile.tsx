import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { theme } from '../../theme/theme';
import { CATEGORY_OPTIONS } from '../../mock/mockData';

export default function AddExpenseMobile() {
    const navigation = useNavigation<any>();
    const { addTransaction } = useApp();

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(CATEGORY_OPTIONS[0]);
    const [note, setNote] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSave = () => {
        if (!amount) return;

        addTransaction({
            title: note || category,
            amount: parseFloat(amount),
            date: date,
            category: category,
            type: 'expense',
            icon: 'receipt' // placeholder
        });

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Header
                title="Add Expense"
                onBack={() => navigation.goBack()}
            />

            <ScrollView contentContainerStyle={styles.content}>
                {/* Amount Input */}
                <View style={styles.amountContainer}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                        style={styles.amountInput}
                        placeholder="0.00"
                        placeholderTextColor={theme.colors.text.secondary}
                        keyboardType="numeric"
                        value={amount}
                        onChangeText={setAmount}
                        autoFocus
                    />
                </View>

                {/* Categories */}
                <Text style={styles.label}>Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                    {CATEGORY_OPTIONS.map((cat) => (
                        <Chip
                            key={cat}
                            label={cat}
                            selected={category === cat}
                            onPress={() => setCategory(cat)}
                        />
                    ))}
                </ScrollView>

                {/* Date Mock */}
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity style={styles.dateInput}>
                    <Text style={styles.dateText}>{date}</Text>
                    <Text style={styles.calendarIcon}>📅</Text>
                </TouchableOpacity>

                {/* Notes */}
                <Text style={styles.label}>Notes</Text>
                <TextInput
                    style={styles.notesInput}
                    placeholder="Add a note..."
                    placeholderTextColor={theme.colors.text.secondary}
                    multiline
                    value={note}
                    onChangeText={setNote}
                />

                <Button
                    title="Save Expense"
                    onPress={handleSave}
                    style={styles.saveButton}
                />
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
        padding: theme.spacing.lg,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xxl,
        marginTop: theme.spacing.md,
    },
    currencySymbol: {
        fontSize: 40,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginRight: 4,
    },
    amountInput: {
        fontSize: 48,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        minWidth: 100,
    },
    label: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '600',
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.sm,
        marginTop: theme.spacing.lg,
    },
    chipScroll: {
        flexDirection: 'row',
        marginBottom: theme.spacing.sm,
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.md,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
    },
    dateText: {
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text.primary,
    },
    calendarIcon: {
        fontSize: 18,
    },
    notesInput: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        height: 100,
        textAlignVertical: 'top',
        fontSize: theme.typography.sizes.md,
    },
    saveButton: {
        marginTop: theme.spacing.xxl,
    },
});
