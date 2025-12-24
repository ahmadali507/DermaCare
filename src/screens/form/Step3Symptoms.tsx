/**
 * Step 3: Current Skin Concerns
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
import { ProgressBar } from '../../components/ProgressBar';
import { Slider } from '../../components/Slider';
import { useFormStore } from '../../store/useFormStore';
import { SymptomsData, SymptomData } from '../../types/form.types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'FormStep3'>;

const symptomsList = [
    { label: 'Acne', icon: 'sad-outline' as const },
    { label: 'Dryness', icon: 'water-outline' as const },
    { label: 'Redness', icon: 'thermometer-outline' as const },
    { label: 'Dark Spots', icon: 'moon-outline' as const },
    { label: 'Fine Lines', icon: 'analytics-outline' as const },
    { label: 'Sensitivity', icon: 'flash-outline' as const },
];

const Step3Symptoms: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { formData, updateStep3 } = useFormStore();

    const { control, handleSubmit, setValue, watch } = useForm<SymptomsData>({
        defaultValues: formData.step3 || {
            symptoms: [],
        },
    });

    const watchSymptoms = watch('symptoms');

    const toggleSymptom = (symptomName: string, currentSymptoms: SymptomData[]) => {
        const exists = currentSymptoms.find((s) => s.name === symptomName);

        if (exists) {
            setValue('symptoms', currentSymptoms.filter((s) => s.name !== symptomName));
        } else {
            setValue('symptoms', [...currentSymptoms, { name: symptomName, severity: 3 }]);
        }
    };

    const updateSeverity = (symptomName: string, severity: number) => {
        const updated = watchSymptoms.map((s) =>
            s.name === symptomName ? { ...s, severity } : s
        );
        setValue('symptoms', updated);
    };

    const handleNone = () => {
        setValue('symptoms', []);
    };

    const onSubmit = (data: SymptomsData) => {
        updateStep3(data);
        navigation.navigate('FormStep4');
    };

    return (
        <View style={styles.container}>
            <ProgressBar currentStep={3} totalSteps={6} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.heading}>Current Skin Concerns</Text>
                <Text style={styles.subheading}>Select all that apply</Text>

                <Controller
                    control={control}
                    name="symptoms"
                    render={({ field: { value } }) => (
                        <View style={styles.grid}>
                            {symptomsList.map((symptom) => {
                                const isSelected = value.find((s) => s.name === symptom.label);
                                const selectedSymptom = isSelected;

                                return (
                                    <View key={symptom.label} style={styles.column}>
                                        <TouchableOpacity
                                            style={[
                                                styles.card,
                                                isSelected && styles.cardActive,
                                            ]}
                                            onPress={() => toggleSymptom(symptom.label, value)}
                                            activeOpacity={0.8}
                                        >
                                            <View style={styles.cardHeader}>
                                                <View
                                                    style={[
                                                        styles.iconContainer,
                                                        isSelected && styles.iconContainerActive,
                                                    ]}
                                                >
                                                    <Ionicons
                                                        name={symptom.icon}
                                                        size={24}
                                                        color={isSelected ? Colors.white : Colors.sageGreen}
                                                    />
                                                </View>
                                                {isSelected && (
                                                    <View style={styles.checkmark}>
                                                        <Ionicons name="checkmark" size={12} color={Colors.white} />
                                                    </View>
                                                )}
                                            </View>
                                            <Text
                                                style={[
                                                    styles.cardTitle,
                                                    isSelected && styles.cardTitleActive,
                                                ]}
                                            >
                                                {symptom.label}
                                            </Text>

                                            {isSelected && selectedSymptom && (
                                                <View style={styles.severityContainer}>
                                                    <Text style={styles.severityLabel}>Severity: {selectedSymptom.severity}/5</Text>
                                                    <Slider
                                                        value={selectedSymptom.severity}
                                                        onValueChange={(val) => updateSeverity(symptom.label, val)}
                                                        minimumValue={1}
                                                        maximumValue={5}
                                                        step={1}
                                                        style={styles.slider}
                                                    />
                                                </View>
                                            )}
                                        </TouchableOpacity>
                                    </View>
                                );
                            })}
                        </View>
                    )}
                />

                <TouchableOpacity
                    style={[
                        styles.noneButton,
                        watchSymptoms.length === 0 && styles.noneButtonActive,
                    ]}
                    onPress={handleNone}
                >
                    <Text
                        style={[
                            styles.noneButtonText,
                            watchSymptoms.length === 0 && styles.noneButtonTextActive,
                        ]}
                    >
                        None of the above
                    </Text>
                </TouchableOpacity>

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
        marginBottom: Spacing.xs,
    },
    subheading: {
        ...Typography.body,
        color: Colors.mutedSage,
        marginBottom: Spacing.xl,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -Spacing.xs,
    },
    column: {
        width: '50%',
        padding: Spacing.xs,
        marginBottom: Spacing.sm,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
        minHeight: 120,
    },
    cardActive: {
        borderColor: Colors.sageGreen,
        backgroundColor: `${Colors.sageGreen}05`,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.md,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: `${Colors.sageGreen}10`,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainerActive: {
        backgroundColor: Colors.sageGreen,
    },
    checkmark: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: Colors.sageGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        ...Typography.h3,
        fontSize: 16,
        marginBottom: Spacing.sm,
    },
    cardTitleActive: {
        color: Colors.sageGreen,
    },
    severityContainer: {
        marginTop: Spacing.xs,
    },
    severityLabel: {
        ...Typography.caption,
        color: Colors.mutedSage,
        marginBottom: Spacing.xs,
    },
    slider: {
        height: 20,
    },
    noneButton: {
        padding: Spacing.md,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        marginTop: Spacing.md,
        backgroundColor: Colors.white,
    },
    noneButtonActive: {
        borderColor: Colors.sageGreen,
        backgroundColor: Colors.sageGreen,
    },
    noneButtonText: {
        ...Typography.body,
        color: Colors.mutedSage,
    },
    noneButtonTextActive: {
        color: Colors.white,
        fontWeight: '600',
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

export default Step3Symptoms;
