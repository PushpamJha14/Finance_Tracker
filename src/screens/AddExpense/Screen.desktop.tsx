import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/Button';
import { Chip } from '../../components/Chip';
import { Input } from '../../components/Input'; // Reused
import { Card } from '../../components/Card';
import { theme } from '../../theme/theme';
import { CATEGORY_OPTIONS } from '../../mock/mockData';

export default function AddExpenseDesktop() {
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
            icon: 'receipt'
        });

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.overlay} onPress={() => navigation.goBack()} />
            <Card style={styles.modalCard}>
                <View style={styles.header}>
                    <Text style={styles.title}>Add New Expense</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formContent}>
                    {/* Left Column */}
                    <View style={styles.leftCol}>
                        <View style={styles.amountContainer}>
                            <Text style={styles.amountLabel}>Amount</Text>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.currency}>$</Text>
                                <TextInput
                                    style={styles.amountInput}
                                    placeholder="0.00"
                                    value={amount}
                                    onChangeText={setAmount}
                                    autoFocus
                                />
                            </View>
                        </View>

                        <Text style={styles.label}>Category</Text>
                        <View style={styles.chipsRow}>
                            {CATEGORY_OPTIONS.map((cat) => (
                                <Chip
                                    key={cat}
                                    label={cat}
                                    selected={category === cat}
                                    onPress={() => setCategory(cat)}
                                    style={{ marginBottom: 8 }}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Right Column */}
                    <View style={styles.rightCol}>
                        <Input
                            label="Date"
                            value={date}
                            onChangeText={setDate} // Simple text input for mock
                            placeholder="YYYY-MM-DD"
                        />
                        <Input
                            label="Notes"
                            value={note}
                            onChangeText={setNote}
                            multiline
                            numberOfLines={4}
                            placeholder="Description..."
                            style={{ height: 120 }}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <Button title="Cancel" variant="secondary" onPress={() => navigation.goBack()} style={{ marginRight: 10 }} />
                    <Button title="Save Expense" onPress={handleSave} />
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Modal overlay look
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    modalCard: {
        width: 800,
        maxHeight: '90%',
        padding: theme.spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        paddingBottom: theme.spacing.md,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
    },
    closeText: {
        fontSize: 24,
        color: theme.colors.text.secondary,
    },
    formContent: {
        flexDirection: 'row',
    },
    leftCol: {
        flex: 1,
        paddingRight: theme.spacing.xl,
        borderRightWidth: 1,
        borderRightColor: theme.colors.border,
    },
    rightCol: {
        flex: 1,
        paddingLeft: theme.spacing.xl,
    },
    amountContainer: {
        marginBottom: theme.spacing.lg,
    },
    amountLabel: {
        fontSize: theme.typography.sizes.sm,
        color: theme.colors.text.secondary,
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currency: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginRight: 8,
    },
    amountInput: {
        fontSize: 32,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        flex: 1,
    },
    label: {
        fontSize: theme.typography.sizes.sm,
        fontWeight: '500',
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.sm,
    },
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: theme.spacing.xl,
        paddingTop: theme.spacing.lg,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
});
