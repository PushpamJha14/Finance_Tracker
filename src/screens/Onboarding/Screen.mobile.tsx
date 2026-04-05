import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/Button';
import { theme } from '../../theme/theme';

const { width } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        title: 'Track Your Spending',
        description: 'Keep track of all your expenses in one place. Simple, fast, and secure.',
        image: 'https://via.placeholder.com/300x300/22D3EE/FFFFFF?text=Track',
    },
    {
        id: '2',
        title: 'Visualize Your Finances',
        description: 'Easy-to-read charts and graphs to understand where your money goes.',
        image: 'https://via.placeholder.com/300x300/818CF8/FFFFFF?text=Visualize',
    },
    {
        id: '3',
        title: 'Achieve Your Goals',
        description: 'Set budgets and save for what matters most to you.',
        image: 'https://via.placeholder.com/300x300/F472B6/FFFFFF?text=Achieve',
    },
];

export default function OnboardingMobile() {
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
            <View style={styles.imageContainer}>
                <View style={styles.placeholderCard}>
                    <Text style={styles.placeholderText}>Illustration</Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.description}>{slide.description}</Text>

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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    imageContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.lg,
    },
    placeholderCard: {
        width: width * 0.8,
        height: width * 0.8,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.soft,
    },
    placeholderText: {
        color: theme.colors.text.secondary,
        fontSize: theme.typography.sizes.lg,
    },
    contentContainer: {
        flex: 2,
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.lg,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
        ...theme.shadows.medium, // subtle lift
    },
    title: {
        fontSize: theme.typography.sizes.xxl,
        fontWeight: 'bold',
        color: theme.colors.text.primary,
        textAlign: 'center',
        marginBottom: theme.spacing.md,
    },
    description: {
        fontSize: theme.typography.sizes.md,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
        lineHeight: 24,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginBottom: theme.spacing.xl,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.border,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: theme.colors.primary,
        width: 24,
    },
    button: {
        width: '100%',
    },
});
