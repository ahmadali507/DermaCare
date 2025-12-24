/**
 * Landing Screen - Onboarding
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { Colors, Typography, Spacing } from '../../constants/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

const LandingScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.logo}>DermaCare</Text>
                <Text style={styles.tagline}>
                    Your Personalized Path to Radiant Skin
                </Text>

                <View style={styles.features}>
                    <Text style={styles.feature}>✨ Personalized Recommendations</Text>
                    <Text style={styles.feature}>🔬 Science-Backed Formulas</Text>
                    <Text style={styles.feature}>🌿 Natural Ingredients</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Button
                    title="Begin Assessment"
                    onPress={() => navigation.navigate('Login')}
                    style={styles.button}
                />

                <View style={styles.links}>
                    <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                        <Text style={styles.link}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <Text style={styles.separator}>•</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                        <Text style={styles.link}>Terms of Service</Text>
                    </TouchableOpacity>
                    <Text style={styles.separator}>•</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
                        <Text style={styles.link}>Contact</Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Spacing.lg,
    },
    logo: {
        ...Typography.h1,
        fontSize: 48,
        color: Colors.sageGreen,
        marginBottom: Spacing.md,
        fontWeight: '700',
    },
    tagline: {
        ...Typography.h3,
        textAlign: 'center',
        color: Colors.darkForest,
        marginBottom: Spacing.xxl,
    },
    features: {
        alignItems: 'flex-start',
    },
    feature: {
        ...Typography.body,
        color: Colors.mutedSage,
        marginBottom: Spacing.sm,
    },
    footer: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    button: {
        marginBottom: Spacing.lg,
    },
    links: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        ...Typography.caption,
        color: Colors.sageGreen,
        textDecorationLine: 'underline',
    },
    separator: {
        ...Typography.caption,
        color: Colors.mutedSage,
        marginHorizontal: Spacing.sm,
    },
});

export default LandingScreen;
