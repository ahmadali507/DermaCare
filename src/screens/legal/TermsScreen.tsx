/**
 * Terms of Service Screen
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';

const TermsScreen: React.FC = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.lastUpdated}>Last updated: December 2024</Text>

            <Text style={styles.sectionHeading}>1. Acceptance of Terms</Text>
            <Text style={styles.paragraph}>
                By accessing and using DermaCare, you accept and agree to be bound by these Terms of Service.
            </Text>

            <Text style={styles.sectionHeading}>2. Medical Disclaimer</Text>
            <View style={styles.warningBox}>
                <Text style={styles.warningText}>⚠️ NOT A SUBSTITUTE FOR PROFESSIONAL MEDICAL ADVICE</Text>
            </View>
            <Text style={styles.paragraph}>
                Our recommendations are for informational purposes only and should not replace professional dermatological advice. Always consult with a qualified healthcare provider for medical concerns.
            </Text>

            <Text style={styles.sectionHeading}>3. User Responsibilities</Text>
            <Text style={styles.paragraph}>
                You agree to provide accurate information and use the app in accordance with applicable laws.
            </Text>

            <Text style={styles.sectionHeading}>4. Intellectual Property</Text>
            <Text style={styles.paragraph}>
                All content, algorithms, and recommendations are proprietary to DermaCare. Unauthorized use is prohibited.
            </Text>

            <Text style={styles.sectionHeading}>5. Limitation of Liability</Text>
            <Text style={styles.paragraph}>
                DermaCare is not liable for any adverse reactions or damages resulting from following our recommendations.
            </Text>

            <Text style={styles.sectionHeading}>6. Changes to Terms</Text>
            <Text style={styles.paragraph}>
                We reserve the right to modify these terms at any time. Continued use constitutes acceptance of modified terms.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cream,
    },
    content: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.xl,
    },
    lastUpdated: {
        ...Typography.caption,
        color: Colors.mutedSage,
        marginBottom: Spacing.lg,
    },
    sectionHeading: {
        ...Typography.h3,
        color: Colors.sageGreen,
        marginTop: Spacing.lg,
        marginBottom: Spacing.md,
    },
    paragraph: {
        ...Typography.body,
        marginBottom: Spacing.md,
        lineHeight: 22,
    },
    warningBox: {
        backgroundColor: `${Colors.terracotta}20`,
        borderLeftWidth: 4,
        borderLeftColor: Colors.terracotta,
        padding: Spacing.md,
        marginBottom: Spacing.md,
    },
    warningText: {
        ...Typography.body,
        fontWeight: '600',
        color: Colors.darkForest,
    },
});

export default TermsScreen;
