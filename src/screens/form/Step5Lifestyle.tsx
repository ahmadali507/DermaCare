/**
 * Step 5: Lifestyle Factors
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ProgressBar } from '../../components/ProgressBar';
import { Slider } from '../../components/Slider';
import { useFormStore } from '../../store/useFormStore';
import { LifestyleData } from '../../types/form.types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'FormStep5'>;

const exerciseOptions = ['None', 'Light', 'Moderate', 'High'];
const routineOptions = ['Morning', 'Evening', 'Both', 'None'];

const Step5Lifestyle: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { formData, updateStep5 } = useFormStore();

    const { control, handleSubmit, setValue, watch } = useForm<LifestyleData>({
        defaultValues: formData.step5 || {
            sleepHours: 7,
            exerciseFrequency: '',
            stressLevel: 3,
            skincareRoutine: [],
            screenTime: 6,
        },
    });

    const watchSkincareRoutine = watch('skincareRoutine');

    const toggleRoutine = (option: string, current: string[]) => {
        const newRoutine = current.includes(option)
            ? current.filter((r) => r !== option)
            : [...current, option];
        setValue('skincareRoutine', newRoutine);
    };

    const onSubmit = (data: LifestyleData) => {
        updateStep5(data);
        navigation.navigate('FormStep6');
    };

    return (
        <View style={styles.container}>
            <ProgressBar currentStep={5} totalSteps={6} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.heading}>Daily Habits & Routine</Text>

                {/* Sleep Hours */}
                <Card style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="moon" size={24} color={Colors.sageGreen} />
                        <Text style={styles.label}>Sleep Hours Per Night</Text>
                    </View>
                    <Controller
                        control={control}
                        name="sleepHours"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <View style={styles.numberSelector}>
                                    {[4, 5, 6, 7, 8, 9, 10].map((hours) => (
                                        <TouchableOpacity
                                            key={hours}
                                            style={[styles.numberButton, value === hours && styles.numberButtonActive]}
                                            onPress={() => onChange(hours)}
                                        >
                                            <Text
                                                style={[styles.numberText, value === hours && styles.numberTextActive]}
                                            >
                                                {hours}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <Text style={styles.caption}>{value} hours per night</Text>
                            </View>
                        )}
                    />
                </Card>

                {/* Exercise */}
                <Card style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="barbell" size={24} color={Colors.sageGreen} />
                        <Text style={styles.label}>Exercise Frequency</Text>
                    </View>
                    <Controller
                        control={control}
                        name="exerciseFrequency"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.pillContainer}>
                                {exerciseOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[styles.pill, value === option && styles.pillActive]}
                                        onPress={() => onChange(option)}
                                    >
                                        <Text style={[styles.pillText, value === option && styles.pillTextActive]}>
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    />
                </Card>

                {/* Stress Level */}
                <Card style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="brain" size={24} color={Colors.sageGreen} />
                        <Text style={styles.label}>Stress Level</Text>
                    </View>
                    <Controller
                        control={control}
                        name="stressLevel"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <View style={styles.stressSelector}>
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <TouchableOpacity
                                            key={level}
                                            style={[styles.stressButton, value === level && styles.stressButtonActive]}
                                            onPress={() => onChange(level)}
                                        >
                                            <Text style={styles.stressEmoji}>
                                                {level === 1 && '😌'}
                                                {level === 2 && '🙂'}
                                                {level === 3 && '😐'}
                                                {level === 4 && '😰'}
                                                {level === 5 && '😫'}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <Slider
                                    value={value}
                                    onValueChange={onChange}
                                    minimumValue={1}
                                    maximumValue={5}
                                    step={1}
                                    style={styles.slider}
                                />
                                <Text style={styles.caption}>
                                    {value === 1 && 'Very Low'}
                                    {value === 2 && 'Low'}
                                    {value === 3 && 'Moderate'}
                                    {value === 4 && 'High'}
                                    {value === 5 && 'Very High'}
                                </Text>
                            </View>
                        )}
                    />
                </Card>

                {/* Skincare Routine */}
                <Card style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="water" size={24} color={Colors.sageGreen} />
                        <Text style={styles.label}>Current Skincare Routine</Text>
                    </View>
                    <Controller
                        control={control}
                        name="skincareRoutine"
                        render={({ field: { value } }) => (
                            <View style={styles.pillContainer}>
                                {routineOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[styles.pill, value.includes(option) && styles.pillActive]}
                                        onPress={() => toggleRoutine(option, value)}
                                    >
                                        <Text
                                            style={[styles.pillText, value.includes(option) && styles.pillTextActive]}
                                        >
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    />
                </Card>

                {/* Screen Time */}
                <Card style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="desktop" size={24} color={Colors.sageGreen} />
                        <Text style={styles.label}>Daily Screen Time</Text>
                    </View>
                    <Controller
                        control={control}
                        name="screenTime"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <Slider
                                    value={value}
                                    onValueChange={onChange}
                                    minimumValue={0}
                                    maximumValue={12}
                                    step={1}
                                    leftLabel="Low (0h)"
                                    rightLabel="High (12h+)"
                                />
                                <Text style={styles.caption}>{value}+ hours per day</Text>
                            </View>
                        )}
                    />
                </Card>

                <View style={styles.buttonRow}>
                    <Button
                        title="Back"
                        variant="outline"
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    />
                    <Button
                        title="Continue"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.continueButton}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.cream,
    },
    scrollContent: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.xxl,
    },
    heading: {
        ...Typography.h2,
        marginBottom: Spacing.xl,
    },
    card: {
        marginBottom: Spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacing.md,
        gap: Spacing.sm,
    },
    label: {
        ...Typography.h3,
        fontSize: 16,
    },
    caption: {
        ...Typography.caption,
        textAlign: 'center',
        marginTop: Spacing.sm,
        color: Colors.mutedSage,
    },
    numberSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    numberButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    numberButtonActive: {
        borderColor: Colors.sageGreen,
        backgroundColor: Colors.sageGreen,
    },
    numberText: {
        ...Typography.body,
        fontWeight: '600',
    },
    numberTextActive: {
        color: Colors.white,
    },
    pillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    pill: {
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.full,
        borderWidth: 1,
        borderColor: Colors.border,
        backgroundColor: Colors.white,
    },
    pillActive: {
        borderColor: Colors.sageGreen,
        backgroundColor: Colors.sageGreen,
    },
    pillText: {
        ...Typography.body,
        color: Colors.darkForest,
    },
    pillTextActive: {
        color: Colors.white,
    },
    stressSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.sm,
    },
    stressButton: {
        alignItems: 'center',
        padding: Spacing.xs,
        borderRadius: BorderRadius.sm,
    },
    stressButtonActive: {
        backgroundColor: `${Colors.sageGreen}20`,
    },
    stressEmoji: {
        fontSize: 32,
    },
    slider: {
        marginTop: Spacing.sm,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginTop: Spacing.xl,
    },
    backButton: {
        flex: 1,
    },
    continueButton: {
        flex: 2,
    },
});

export default Step5Lifestyle;
