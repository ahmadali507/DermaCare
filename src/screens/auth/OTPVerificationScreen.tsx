/**
 * OTP Verification Screen
 */

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { OTPInput } from '../../components/OTPInput';
import { useAuthStore } from '../../store/useAuthStore';
import { validateOTP } from '../../utils/validation';
import { Colors, Typography, Spacing } from '../../constants/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'OTPVerification'>;
type RouteProp2 = RouteProp<RootStackParamList, 'OTPVerification'>;

const OTPVerificationScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProp2>();
    const login = useAuthStore((state) => state.login);

    const { phoneNumber } = route.params;
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    setCanResend(true);
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (otp.length === 6) {
            handleVerify();
        }
    }, [otp]);

    const handleVerify = async () => {
        if (!validateOTP(otp)) {
            setError(true);
            return;
        }

        setLoading(true);
        setError(false);

        // Simulate API call
        setTimeout(async () => {
            try {
                await login(phoneNumber);
                setLoading(false);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'FormStep1' }],
                });
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        }, 1500);
    };

    const handleResend = () => {
        setOtp('');
        setTimer(60);
        setCanResend(false);
        // TODO: Implement actual resend logic
    };

    const maskPhoneNumber = (phone: string) => {
        if (phone.length < 4) return phone;
        return `+1 ••• ••• ${phone.slice(-4)}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.heading}>Verify Your Phone</Text>
                <Text style={styles.subheading}>
                    Code sent to{'\n'}
                    {maskPhoneNumber(phoneNumber)}
                </Text>

                <OTPInput value={otp} onChange={setOtp} error={error} />

                {timer > 0 ? (
                    <Text style={styles.timer}>Resend code in 0:{timer.toString().padStart(2, '0')}</Text>
                ) : (
                    <TouchableOpacity onPress={handleResend} style={styles.resendButton}>
                        <Text style={styles.resendText}>
                            Didn't receive code? <Text style={styles.link}>Resend</Text>
                        </Text>
                    </TouchableOpacity>
                )}

                <Button
                    title="Verify"
                    onPress={handleVerify}
                    loading={loading}
                    disabled={otp.length < 6}
                    style={styles.button}
                />
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
        paddingTop: Spacing.xxl,
    },
    heading: {
        ...Typography.h2,
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },
    subheading: {
        ...Typography.body,
        color: Colors.mutedSage,
        textAlign: 'center',
        marginBottom: Spacing.xl,
    },
    timer: {
        ...Typography.caption,
        color: Colors.mutedSage,
        textAlign: 'center',
        marginTop: Spacing.lg,
    },
    resendButton: {
        marginTop: Spacing.lg,
    },
    resendText: {
        ...Typography.caption,
        textAlign: 'center',
        color: Colors.mutedSage,
    },
    link: {
        color: Colors.sageGreen,
        textDecorationLine: 'underline',
    },
    button: {
        marginTop: Spacing.xl,
    },
});

export default OTPVerificationScreen;
