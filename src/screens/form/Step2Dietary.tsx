/**
 * Step 2: Dietary Habits
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { ProgressBar } from '../../components/ProgressBar';
import { useFormStore } from '../../store/useFormStore';
import { DietaryData } from '../../types/form.types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'FormStep2'>;

const supplementsList = [
    { label: 'Vitamin C', icon: 'nutrition' as const },
    { label: 'Vitamin D', icon: 'sunny' as const },
    { label: 'Vitamin E', icon: 'leaf' as const },
    { label: 'Collagen', icon: 'body' as const },
    { label: 'Omega-3', icon: 'fish' as const },
    { label: 'Biotin', icon: 'cut' as const },
];

const dietTypes = ['Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Other'];

const Step2Dietary: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { formData, updateStep2 } = useFormStore();

    const { control, handleSubmit, setValue, watch } = useForm<DietaryData>({
        defaultValues: formData.step2 || {
            waterIntake: 8,
            dietType: [],
            supplements: [],
            allergies: false,
            allergyDetails: '',
            caffeine: false,
            alcohol: false,
        },
    });

    const watchSupplements = watch('supplements');
    const watchAllergies = watch('allergies');

    const toggleSupplement = (supplement: string, selectedSupplements: string[]) => {
        const newSupps = selectedSupplements.includes(supplement)
            ? selectedSupplements.filter((s) => s !== supplement)
            : [...selectedSupplements, supplement];
        setValue('supplements', newSupps);
    };

    const toggleDietType = (type: string, currentTypes: string[]) => {
        const newTypes = currentTypes.includes(type)
            ? currentTypes.filter((t) => t !== type)
            : [...currentTypes, type];
        setValue('dietType', newTypes);
    };

    const onSubmit = (data: DietaryData) => {
        updateStep2(data);
        navigation.navigate('FormStep3');
    };

    return (
        <View style={styles.container}>
            <ProgressBar currentStep={2} totalSteps={6} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.heading}>Your Nutrition & Hydration</Text>

                {/* Water Intake */}
                <Card style={styles.card}>
                    <Text style={styles.label}>Daily Water Intake (glasses)</Text>
                    <Controller
                        control={control}
                        name="waterIntake"
                        render={({ field: { onChange, value } }) => (
                            <View>
                                <View style={styles.glassesContainer}>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                        <TouchableOpacity
                                            key={num}
                                            onPress={() => onChange(num)}
                                            style={styles.glassIcon}
                                        >
                                            <Ionicons
                                                name={value >= num ? 'water' : 'water-outline'}
                                                size={28}
                                                color={value >= num ? Colors.sageGreen : Colors.border}
                                            />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <Text style={styles.caption}>{value} glasses per day</Text>
                            </View>
                        )}
                    />
                </Card>

                {/* Diet Type */}
                <Card style={styles.card}>
                    <Text style={styles.label}>Diet Type</Text>
                    <Controller
                        control={control}
                        name="dietType"
                        render={({ field: { value } }) => (
                            <View style={styles.pillContainer}>
                                {dietTypes.map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        style={[
                                            styles.pill,
                                            value.includes(type) && styles.pillActive,
                                        ]}
                                        onPress={() => toggleDietType(type, value)}
                                    >
                                        <Text
                                            style={[
                                                styles.pillText,
                                                value.includes(type) && styles.pillTextActive,
                                            ]}
                                        >
                                            {type}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    />
                </Card>

                {/* Supplements */}
                <Card style={styles.card}>
                    <Text style={styles.label}>Vitamin Supplements</Text>
                    <Controller
                        control={control}
                        name="supplements"
                        render={({ field: { value } }) => (
                            <View style={styles.gridContainer}>
                                {supplementsList.map((item) => (
                                    <TouchableOpacity
                                        key={item.label}
                                        style={[
                                            styles.supplementCard,
                                            value.includes(item.label) && styles.supplementCardActive,
                                        ]}
                                        onPress={() => toggleSupplement(item.label, value)}
                                    >
                                        <Ionicons
                                            name={item.icon}
                                            size={24}
                                            color={value.includes(item.label) ? Colors.sageGreen : Colors.mutedSage}
                                            style={{ marginBottom: Spacing.xs }}
                                        />
                                        <Text
                                            style={[
                                                styles.supplementText,
                                                value.includes(item.label) && styles.supplementTextActive,
                                            ]}
                                        >
                                            {item.label}
                                        </Text>
                                        {value.includes(item.label) && (
                                            <View style={styles.checkmark}>
                                                <Ionicons name="checkmark" size={12} color={Colors.white} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    />
                </Card>

                {/* Allergies */}
                <Card style={styles.card}>
                    <Controller
                        control={control}
                        name="allergies"
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.toggleRow}>
                                <View style={styles.toggleLabelContainer}>
                                    <Ionicons name="warning-outline" size={24} color={Colors.darkForest} />
                                    <Text style={styles.toggleLabel}>Do you have any allergies?</Text>
                                </View>
                                <Switch
                                    value={value}
                                    onValueChange={onChange}
                                    trackColor={{ false: Colors.border, true: Colors.sageGreen }}
                                    thumbColor={Colors.white}
                                />
                            </View>
                        )}
                    />

                    {watchAllergies && (
                        <View style={styles.allergyInput}>
                            <Controller
                                control={control}
                                name="allergyDetails"
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        label="Please list your allergies"
                                        value={value}
                                        onChangeText={onChange}
                                        placeholder="e.g. Peanuts, Shellfish, Latex"
                                    />
                                )}
                            />
                        </View>
                    )}
                </Card>

                {/* Caffeine & Alcohol */}
                <Card style={styles.card}>
                    <Text style={styles.label}>Consumption</Text>

                    <Controller
                        control={control}
                        name="caffeine"
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.toggleRow}>
                                <View style={styles.toggleLabelContainer}>
                                    <Ionicons name="cafe" size={24} color={Colors.darkForest} />
                                    <Text style={styles.toggleLabel}>Regular Caffeine</Text>
                                </View>
                                <Switch
                                    value={value}
                                    onValueChange={onChange}
                                    trackColor={{ false: Colors.border, true: Colors.sageGreen }}
                                    thumbColor={Colors.white}
                                />
                            </View>
                        )}
                    />

                    <View style={styles.divider} />

                    <Controller
                        control={control}
                        name="alcohol"
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.toggleRow}>
                                <View style={styles.toggleLabelContainer}>
                                    <Ionicons name="beer" size={24} color={Colors.darkForest} />
                                    <Text style={styles.toggleLabel}>Regular Alcohol</Text>
                                </View>
                                <Switch
                                    value={value}
                                    onValueChange={onChange}
                                    trackColor={{ false: Colors.border, true: Colors.sageGreen }}
                                    thumbColor={Colors.white}
                                />
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
    label: {
        ...Typography.h3,
        fontSize: 16,
        marginBottom: Spacing.md,
    },
    caption: {
        ...Typography.caption,
        textAlign: 'center',
        marginTop: Spacing.sm,
        color: Colors.mutedSage,
    },
    glassesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Spacing.sm,
    },
    glassIcon: {
        padding: 2,
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    supplementCard: {
        width: '31%',
        aspectRatio: 1,
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.md,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.xs,
        position: 'relative',
    },
    supplementCardActive: {
        borderColor: Colors.sageGreen,
        backgroundColor: `${Colors.sageGreen}10`,
    },
    supplementText: {
        ...Typography.caption,
        textAlign: 'center',
        fontSize: 10,
        color: Colors.mutedSage,
    },
    supplementTextActive: {
        color: Colors.sageGreen,
        fontWeight: '600',
    },
    checkmark: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: Colors.sageGreen,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
    },
    toggleLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.md,
    },
    toggleLabel: {
        ...Typography.body,
    },
    allergyInput: {
        marginTop: Spacing.md,
    },
    divider: {
        height: 1,
        backgroundColor: Colors.lightBorder,
        marginVertical: Spacing.sm,
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

export default Step2Dietary;
