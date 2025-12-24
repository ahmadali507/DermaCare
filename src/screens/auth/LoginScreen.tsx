/**
 * Login/Signup Screen with Phone Authentication
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuthStore } from '../../store/useAuthStore';
import { validatePhoneNumber } from '../../utils/validation';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const setPhoneNumber = useAuthStore((state) => state.setPhoneNumber);

    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleContinue = async () => {
        setError('');

        if (!validatePhoneNumber(phone)) {
            setError('Please enter a valid phone number');
            return;
        }

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setPhoneNumber(phone);
            setLoading(false);
            navigation.navigate('OTPVerification', { phoneNumber: phone });
        }, 1000);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.logo}>DermaCare</Text>

                {/* Tab Switcher */}
                <View style={styles.tabs}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'signin' && styles.activeTab]}
                        onPress={() => setActiveTab('signin')}
                    >
                        <Text
                            style={[styles.tabText, activeTab === 'signin' && styles.activeTabText]}
                        >
                            Sign In
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
                        onPress={() => setActiveTab('signup')}
                    >
                        <Text
                            style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}
                        >
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.heading}>
                    {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
                </Text>
                <Text style={styles.subheading}>Enter your phone number</Text>

                <View style={styles.form}>
                    <Input
                        label="Phone Number"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        error={error}
                    />

                    <Button
                        title="Continue with Phone"
                        onPress={handleContinue}
                        loading={loading}
                        style={styles.primaryButton}
                    />

                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <Button
                        title="Continue with Google"
                        onPress={() => { }}
                        variant="secondary"
                        style={styles.socialButton}
                    />

                    <Button
                        title="Continue with Apple"
                        onPress={() => { }}
                        variant="secondary"
                        style={styles.socialButton}
                    />

                    <TouchableOpacity
                        onPress={() => navigation.navigate('ResetPassword')}
                        style={styles.forgotPassword}
                    >
                        <Text style={styles.link}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        By continuing, you agree to our{' '}
                        <Text
                            style={styles.link}
                            onPress={() => navigation.navigate('Terms')}
                        >
                            Terms
                        </Text>{' '}
                        &{' '}
                        <Text
                            style={styles.link}
                            onPress={() => navigation.navigate('PrivacyPolicy')}
                        >
                            Privacy Policy
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cream,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.xxl,
    },
    logo: {
        ...Typography.h1,
        fontSize: 36,
        color: Colors.sageGreen,
        textAlign: 'center',
        marginBottom: Spacing.xl,
    },
    tabs: {
        flexDirection: 'row',
        marginBottom: Spacing.xl,
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: Spacing.sm,
        alignItems: 'center',
        borderRadius: BorderRadius.md,
    },
    activeTab: {
        backgroundColor: Colors.cream,
    },
    tabText: {
        ...Typography.body,
        color: Colors.mutedSage,
    },
    activeTabText: {
        color: Colors.sageGreen,
        fontWeight: '600',
    },
    heading: {
        ...Typography.h2,
        marginBottom: Spacing.xs,
    },
    subheading: {
        ...Typography.body,
        color: Colors.mutedSage,
        marginBottom: Spacing.lg,
    },
    form: {
        marginBottom: Spacing.xl,
    },
    primaryButton: {
        marginTop: Spacing.md,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing.lg,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.border,
    },
    dividerText: {
        ...Typography.caption,
        marginHorizontal: Spacing.md,
        color: Colors.mutedSage,
    },
    socialButton: {
        marginBottom: Spacing.sm,
    },
    forgotPassword: {
        alignSelf: 'center',
        marginTop: Spacing.md,
    },
    link: {
        ...Typography.caption,
        color: Colors.sageGreen,
        textDecorationLine: 'underline',
    },
    footer: {
        marginTop: 'auto',
        paddingBottom: Spacing.lg,
    },
    footerText: {
        ...Typography.caption,
        textAlign: 'center',
        color: Colors.mutedSage,
    },
});

export default LoginScreen;
