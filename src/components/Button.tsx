/**
 * Reusable Button Component - Medical-Aesthetic Theme
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    StyleProp,
} from 'react-native';
import { Colors, BorderRadius, Spacing } from '../constants/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'text';
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    const buttonStyles: StyleProp<ViewStyle>[] = [styles.button];
    if (variant === 'primary') buttonStyles.push(styles.primaryButton);
    if (variant === 'secondary') buttonStyles.push(styles.secondaryButton);
    if (variant === 'text') buttonStyles.push(styles.textButton);
    if (disabled || loading) buttonStyles.push(styles.disabledButton);
    if (style) buttonStyles.push(style);

    const textStyles: StyleProp<TextStyle>[] = [styles.text];
    if (variant === 'primary') textStyles.push(styles.primaryText);
    if (variant === 'secondary') textStyles.push(styles.secondaryText);
    if (variant === 'text') textStyles.push(styles.textButtonText);
    if (disabled || loading) textStyles.push(styles.disabledText);
    if (textStyle) textStyles.push(textStyle);

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? Colors.white : Colors.sageGreen}
                />
            ) : (
                <Text style={textStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderRadius: BorderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    primaryButton: {
        backgroundColor: Colors.sageGreen,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: Colors.sageGreen,
    },
    textButton: {
        backgroundColor: 'transparent',
        paddingVertical: Spacing.sm,
    },
    disabledButton: {
        opacity: 0.5,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        color: Colors.darkForest,
    },
    primaryText: {
        color: Colors.white,
    },
    secondaryText: {
        color: Colors.sageGreen,
    },
    textButtonText: {
        color: Colors.sageGreen,
        textDecorationLine: 'underline',
    },
    disabledText: {
        color: Colors.mutedSage,
    },
});

