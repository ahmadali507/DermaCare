/**
 * 6-Digit OTP Input Component
 */

import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Animated,
} from 'react-native';
import { Colors, BorderRadius, Spacing } from '../constants/theme';

interface OTPInputProps {
    value: string;
    onChange: (otp: string) => void;
    error?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({ value, onChange, error = false }) => {
    const [otp, setOtp] = useState<string[]>(
        value.split('').concat(Array(6 - value.length).fill('')).slice(0, 6)
    );
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus();
    }, []);

    useEffect(() => {
        if (error) {
            // Shake animation on error
            Animated.sequence([
                Animated.timing(shakeAnimation, {
                    toValue: 10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: -10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: 10,
                    duration: 50,
                    useNativeDriver: true,
                }),
                Animated.timing(shakeAnimation, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [error, shakeAnimation]);

    const handleChangeText = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        onChange(newOtp.join(''));

        // Auto-focus next input
        if (text && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when complete
        if (index === 5 && text) {
            inputRefs.current[5]?.blur();
        }
    };

    const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return (
        <Animated.View
            style={[styles.container, { transform: [{ translateX: shakeAnimation }] }]}
        >
            {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextInput
                    key={index}
                    ref={(ref) => {
                        inputRefs.current[index] = ref;
                    }}
                    style={[
                        styles.input,
                        otp[index] ? styles.inputFilled : null,
                        error ? styles.inputError : null,
                    ]}
                    value={otp[index] || ''}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus={true}
                />
            ))}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.lg,
    },
    input: {
        width: 48,
        height: 48,
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: BorderRadius.sm,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '600',
        color: Colors.darkForest,
        backgroundColor: Colors.white,
    },
    inputFilled: {
        borderColor: Colors.sageGreen,
    },
    inputError: {
        borderColor: Colors.error,
    },
});
