import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import SliderComponent from '@react-native-community/slider';
import { Colors, Typography, Spacing } from '../constants/theme';

interface SliderProps {
    value: number;
    onValueChange: (value: number) => void;
    minimumValue: number;
    maximumValue: number;
    step?: number;
    leftLabel?: string;
    rightLabel?: string;
    style?: ViewStyle;
}

export const Slider: React.FC<SliderProps> = ({
    value,
    onValueChange,
    minimumValue,
    maximumValue,
    step = 1,
    leftLabel,
    rightLabel,
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            <SliderComponent
                style={styles.slider}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                step={step}
                value={value}
                onValueChange={onValueChange}
                minimumTrackTintColor={Colors.sageGreen}
                maximumTrackTintColor={Colors.border}
                thumbTintColor={Colors.sageGreen}
            />
            {(leftLabel || rightLabel) && (
                <View style={styles.labels}>
                    <Text style={styles.label}>{leftLabel}</Text>
                    <Text style={styles.label}>{rightLabel}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    slider: {
        width: '100%',
        height: 40,
    },
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -Spacing.xs,
    },
    label: {
        ...Typography.caption,
        color: Colors.mutedSage,
    },
});
