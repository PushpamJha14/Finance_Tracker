import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { theme } from '../../theme/theme';

const slides = [
    {
        id: '1',
        title: 'Track Your Spending',
        description: 'Keep track of all your expenses in one place. Simple, fast, and secure.',
    },
    {
        id: '2',
        title: 'Visualize Your Finances',
        description: 'Easy-to-read charts and graphs to understand where your money goes.',
    },
    {
        id: '3',
        title: 'Achieve Your Goals',
        description: 'Set budgets and save for what matters most to you.',
    },
];

export default function OnboardingDesktop() {
    const navigation = useNavigation<any>();
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            navigation.replace('Login');
        }
    };

    const slide = slides[currentSlide];

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.leftColumn}>
                    <View style={styles.placeholderImage}>
                        <Text style={styles.imageText}>Illustration</Text>
                    </View>
                </View>

                <View style={styles.rightColumn}>
                    <View>
                        <Text style={styles.title}>{slide.title}</Text>
                        <Text style={styles.description}>{slide.description}</Text>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.dotsContainer}>
                            {slides.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.dot,
                                        index === currentSlide && styles.activeDot,
                                    ]}
                                />
                            ))}
                        </View>

                        <Button
                            title={currentSlide === slides.length - 1 ? "Get Started" : "Next"}
                            onPress={handleNext}
                            style={styles.button}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flexDirection: 'row',
        width: 900,
        height: 600,
        backgroundColor: theme.colors.background,
        // ...theme.shadows.medium, // removed shadow for cleaner look on desktop sometimes, or ok to keep
        borderRadius: theme.borderRadius.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    leftColumn: {
        flex: 1.2,
        backgroundColor: theme.colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.xl,
    },
    placeholderImage: {
        width: '80%',
        height: '60%',
        backgroundColor: '#E0F2FE', // Light blue placeholder
        borderRadius: theme.borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageText: {
        fontSize: theme.typography.sizes.lg,
        color: theme.colors.primaryDark,
    },
    rightColumn: {
        flex: 1,
        padding: theme.spacing.xxl,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 40, // Larger for desktop
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.lg,
    },
    description: {
        fontSize: theme.typography.sizes.lg,
        color: theme.colors.text.secondary,
        lineHeight: 28,
    },
    footer: {
        marginTop: theme.spacing.xl,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginBottom: theme.spacing.lg,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.border,
        marginHorizontal: 6,
    },
    activeDot: {
        backgroundColor: theme.colors.primary,
        width: 30,
    },
    button: {
        alignSelf: 'flex-start',
        width: 200,
    },
});
