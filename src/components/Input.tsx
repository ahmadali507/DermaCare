/**
 * Reusable Input Component with floating label
 */

import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInputProps,
    StyleProp,
    ViewStyle,
} from 'react-native';
import { Colors, BorderRadius, Spacing } from '../constants/theme';

interface InputProps extends Omit<TextInputProps, 'style'> {
    label: string;
    error?: string;
    secureTextEntry?: boolean;
    showPasswordToggle?: boolean;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    secureTextEntry = false,
    showPasswordToggle = false,
    value,
    multiline = false,
    numberOfLines,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const hasValue = value && value.length > 0;
    const shouldShowLabel = isFocused || hasValue;

    const containerStyles: StyleProp<ViewStyle>[] = [styles.inputContainer];
    if (isFocused) containerStyles.push(styles.inputContainerFocused);
    if (error) containerStyles.push(styles.inputContainerError);

    return (
        <View style={styles.container}>
            <View style={containerStyles}>
                {shouldShowLabel ? <Text style={styles.label}>{label}</Text> : null}
                <TextInput
                    style={[styles.input, multiline ? styles.multilineInput : null]}
                    placeholder={shouldShowLabel ? '' : label}
                    placeholderTextColor={Colors.mutedSage}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    value={value || ''}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    textAlignVertical={multiline ? 'top' : 'center'}
                    {...props}
                />
                {showPasswordToggle && secureTextEntry ? (
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        <Text style={styles.eyeText}>{isPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.md,
    },
    inputContainer: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingTop: Spacing.sm,
        paddingBottom: Spacing.xs,
        minHeight: 56,
        justifyContent: 'center',
    },
    inputContainerFocused: {
        borderColor: Colors.sageGreen,
        borderWidth: 2,
    },
    inputContainerError: {
        borderColor: Colors.error,
    },
    label: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        color: Colors.mutedSage,
        marginBottom: 2,
    },
    input: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 22,
        color: Colors.darkForest,
        padding: 0,
    },
    multilineInput: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    eyeIcon: {
        position: 'absolute',
        right: Spacing.md,
        top: '50%',
    },
    eyeText: {
        fontSize: 20,
    },
    errorText: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
        color: Colors.error,
        marginTop: Spacing.xs,
    },
});

