/**
 * Reset Password Screen
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { validatePhoneNumber, validatePassword } from '../../utils/validation';
import { Colors, Typography, Spacing } from '../../constants/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>;

const ResetPasswordScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();

    const [phone, setPhone] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const handleSendCode = () => {
        if (!validatePhoneNumber(phone)) {
            setErrors({ phone: 'Please enter a valid phone number' });
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setCodeSent(true);
            setLoading(false);
        }, 1000);
    };

    const handleResetPassword = () => {
        const newErrors: any = {};

        if (otp.length !== 6) {
            newErrors.otp = 'Please enter the 6-digit code';
        }

        const passwordValidation = validatePassword(newPassword);
        if (!passwordValidation.valid) {
            newErrors.newPassword = passwordValidation.errors.join(', ');
        }

        if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate('Login');
        }, 1500);
    };

    const passwordRequirements = validatePassword(newPassword).errors;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.heading}>Reset Password</Text>
                <Text style={styles.subheading}>
                    {codeSent
                        ? 'Enter the code and create a new password'
                        : 'Enter your phone number to receive a reset code'}
                </Text>

                {!codeSent ? (
                    <>
                        <Input
                            label="Phone Number"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            error={errors.phone}
                        />

                        <Button
                            title="Send Reset Code"
                            onPress={handleSendCode}
                            loading={loading}
                        />
                    </>
                ) : (
                    <>
                        <Input
                            label="6-Digit Code"
                            value={otp}
                            onChangeText={setOtp}
                            keyboardType="number-pad"
                            maxLength={6}
                            error={errors.otp}
                        />

                        <Input
                            label="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                            showPasswordToggle
                            error={errors.newPassword}
                        />

                        <Input
                            label="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            showPasswordToggle
                            error={errors.confirmPassword}
                        />

                        <View style={styles.requirements}>
                            <Text style={styles.requirementsTitle}>Password Requirements:</Text>
                            <Text style={[styles.requirement, newPassword.length >= 8 && styles.met]}>
                                {newPassword.length >= 8 ? '✓' : '○'} At least 8 characters
                            </Text>
                            <Text
                                style={[styles.requirement, /[A-Z]/.test(newPassword) && styles.met]}
                            >
                                {/[A-Z]/.test(newPassword) ? '✓' : '○'} One uppercase letter
                            </Text>
                            <Text
                                style={[styles.requirement, /[0-9]/.test(newPassword) && styles.met]}
                            >
                                {/[0-9]/.test(newPassword) ? '✓' : '○'} One number
                            </Text>
                        </View>

                        <Button
                            title="Reset Password"
                            onPress={handleResetPassword}
                            loading={loading}
                        />
                    </>
                )}
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
        paddingTop: Spacing.xl,
    },
    heading: {
        ...Typography.h2,
        marginBottom: Spacing.sm,
    },
    subheading: {
        ...Typography.body,
        color: Colors.mutedSage,
        marginBottom: Spacing.lg,
    },
    requirements: {
        marginBottom: Spacing.lg,
    },
    requirementsTitle: {
        ...Typography.caption,
        fontWeight: '600',
        marginBottom: Spacing.xs,
    },
    requirement: {
        ...Typography.caption,
        color: Colors.mutedSage,
        marginBottom: Spacing.xs,
    },
    met: {
        color: Colors.sageGreen,
    },
});

export default ResetPasswordScreen;
