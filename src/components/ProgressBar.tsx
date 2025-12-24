import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../constants/theme';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

const stepTitles: { [key: number]: string } = {
    1: 'Demographics & Environment',
    2: 'Nutrition & Hydration',
    3: 'Current Skin Concerns',
    4: 'Physical Structure',
    5: 'Lifestyle Factors',
    6: 'Photos',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <View style={styles.track}>
                    <View style={[styles.fill, { width: `${progress}%` }]} />
                </View>
                <Text style={styles.stepCount}>
                    {currentStep}/{totalSteps}
                </Text>
            </View>
            <Text style={styles.stepTitle}>
                Step {currentStep}: {stepTitles[currentStep]}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
        backgroundColor: Colors.cream,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    track: {
        flex: 1,
        height: 8,
        backgroundColor: Colors.border,
        borderRadius: BorderRadius.full,
        marginRight: Spacing.md,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: Colors.sageGreen,
        borderRadius: BorderRadius.full,
    },
    stepCount: {
        ...Typography.caption,
        color: Colors.mutedSage,
        fontWeight: '600',
    },
    stepTitle: {
        ...Typography.h3,
        fontSize: 14,
        color: Colors.darkForest,
    },
});
