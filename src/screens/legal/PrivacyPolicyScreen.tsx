/**
 * Privacy Policy Screen
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';

const PrivacyPolicyScreen: React.FC = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.lastUpdated}>Last updated: December 2024</Text>

            <Text style={styles.sectionHeading}>1. Data Collection</Text>
            <Text style={styles.paragraph}>
                We collect the following information to provide personalized skincare recommendations:
            </Text>
            <Text style={styles.bulletPoint}>• Demographics and environmental factors</Text>
            <Text style={styles.bulletPoint}>• Dietary habits and supplement intake</Text>
            <Text style={styles.bulletPoint}>• Skin symptoms and concerns</Text>
            <Text style={styles.bulletPoint}>• Lifestyle factors</Text>
            <Text style={styles.bulletPoint}>• Photos (optional)</Text>

            <Text style={styles.sectionHeading}>2. How We Use Your Data</Text>
            <Text style={styles.paragraph}>
                Your information is used exclusively to:
            </Text>
            <Text style={styles.bulletPoint}>• Generate personalized skincare recommendations</Text>
            <Text style={styles.bulletPoint}>• Improve our analysis algorithms</Text>
            <Text style={styles.bulletPoint}>• Provide customer support</Text>

            <Text style={styles.sectionHeading}>3. Photo Privacy</Text>
            <Text style={styles.paragraph}>
                Photos are encrypted and stored securely. They are never shared with third parties without your explicit consent and are only used for your personal skincare analysis.
            </Text>

            <Text style={styles.sectionHeading}>4. Your Rights</Text>
            <Text style={styles.paragraph}>
                You have the right to access, modify, or delete your personal data at any time. Contact us at privacy@dermacare.com for requests.
            </Text>

            <Text style={styles.sectionHeading}>5. Contact Us</Text>
            <Text style={styles.paragraph}>
                For privacy-related questions, email us at privacy@dermacare.com
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
    bulletPoint: {
        ...Typography.body,
        marginLeft: Spacing.md,
        marginBottom: Spacing.xs,
        lineHeight: 22,
    },
});

export default PrivacyPolicyScreen;
