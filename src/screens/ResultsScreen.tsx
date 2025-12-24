/**
 * Results/Loading Screen
 */

import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { Button } from '../components/Button';
import { Colors, Typography, Spacing } from '../constants/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;

const ResultsScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <ActivityIndicator size="large" color={Colors.sageGreen} />
                </View>

                <Text style={styles.heading}>Analyzing Your Skin Profile...</Text>

                <Text style={styles.subheading}>
                    Our dermatological AI is creating your personalized skincare routine
                </Text>

                <View style={styles.illustration}>
                    <Text style={styles.illustrationEmoji}>🌿</Text>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>What's Next?</Text>
                    <Text style={styles.infoText}>
                        ✓ Comprehensive skin analysis{'\n'}
                        ✓ Personalized product recommendations{'\n'}
                        ✓ Custom routine schedule{'\n'}
                        ✓ Science-backed formulations
                    </Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Button
                    title="View Results"
                    onPress={() => {
                        // TODO: Navigate to actual results page
                        // For now, reset to landing
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Landing' }],
                        });
                    }}
                    style={styles.button}
                />
                <Text style={styles.footerText}>
                    Assessment completed successfully! 🎉
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cream,
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacing.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: Spacing.xl,
    },
    heading: {
        ...Typography.h2,
        textAlign: 'center',
        marginBottom: Spacing.md,
    },
    subheading: {
        ...Typography.body,
        color: Colors.mutedSage,
        textAlign: 'center',
        marginBottom: Spacing.xxl,
    },
    illustration: {
        marginVertical: Spacing.xl,
    },
    illustrationEmoji: {
        fontSize: 64,
    },
    infoBox: {
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: Spacing.lg,
        width: '100%',
        marginTop: Spacing.xl,
    },
    infoTitle: {
        ...Typography.h3,
        marginBottom: Spacing.md,
        color: Colors.sageGreen,
    },
    infoText: {
        ...Typography.body,
        lineHeight: 24,
    },
    footer: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    button: {
        marginBottom: Spacing.md,
    },
    footerText: {
        ...Typography.caption,
        textAlign: 'center',
        color: Colors.sageGreen,
    },
});

export default ResultsScreen;
