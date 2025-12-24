/**
 * Step 4: Physical Structure (Jawline/Chin)
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
import { ProgressBar } from '../../components/ProgressBar';
import { useFormStore } from '../../store/useFormStore';
import { StructureData } from '../../types/form.types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'FormStep4'>;

const jawlineTypes = [
    { label: 'Defined', description: 'Sharp, angular', icon: 'square-outline' as const },
    { label: 'Moderate', description: 'Balanced', icon: 'scan-outline' as const },
    { label: 'Soft', description: 'Rounded', icon: 'ellipse-outline' as const },
];

const chinShapes = [
    { label: 'Prominent', description: 'Projecting', icon: 'arrow-forward-circle-outline' as const },
    { label: 'Balanced', description: 'Proportional', icon: 'checkmark-circle-outline' as const },
    { label: 'Recessed', description: 'Set back', icon: 'arrow-back-circle-outline' as const },
];

const Step4Structure: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { formData, updateStep4 } = useFormStore();

    const { control, handleSubmit } = useForm<StructureData>({
        defaultValues: formData.step4 || {
            jawlineType: '',
            chinShape: '',
            facialSymmetry: true,
        },
    });

    const onSubmit = (data: StructureData) => {
        updateStep4(data);
        navigation.navigate('FormStep5');
    };

    return (
        <View style={styles.container}>
            <ProgressBar currentStep={4} totalSteps={6} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.heading}>Facial Structure Assessment</Text>

                <Text style={styles.label}>Jawline Type</Text>
                <Controller
                    control={control}
                    name="jawlineType"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.grid}>
                            {jawlineTypes.map((type) => (
                                <TouchableOpacity
                                    key={type.label}
                                    style={[
                                        styles.selectionCard,
                                        value === type.label && styles.selectionCardActive,
                                    ]}
                                    onPress={() => onChange(type.label)}
                                >
                                    <View
                                        style={[
                                            styles.iconContainer,
                                            value === type.label && styles.iconContainerActive,
                                        ]}
                                    >
                                        <Ionicons
                                            name={type.icon}
                                            size={32}
                                            color={value === type.label ? Colors.white : Colors.sageGreen}
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.selectionTitle,
                                            value === type.label && styles.selectionTitleActive,
                                        ]}
                                    >
                                        {type.label}
                                    </Text>
                                    <Text style={styles.selectionDescription}>{type.description}</Text>

                                    <View style={[styles.radio, value === type.label && styles.radioActive]}>
                                        {value === type.label && <View style={styles.radioDot} />}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                />

                <Text style={styles.label}>Chin Shape</Text>
                <Controller
                    control={control}
                    name="chinShape"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.grid}>
                            {chinShapes.map((shape) => (
                                <TouchableOpacity
                                    key={shape.label}
                                    style={[
                                        styles.selectionCard,
                                        value === shape.label && styles.selectionCardActive,
                                    ]}
                                    onPress={() => onChange(shape.label)}
                                >
                                    <View
                                        style={[
                                            styles.iconContainer,
                                            value === shape.label && styles.iconContainerActive,
                                        ]}
                                    >
                                        <Ionicons
                                            name={shape.icon}
                                            size={32}
                                            color={value === shape.label ? Colors.white : Colors.sageGreen}
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.selectionTitle,
                                            value === shape.label && styles.selectionTitleActive,
                                        ]}
                                    >
                                        {shape.label}
                                    </Text>
                                    <Text style={styles.selectionDescription}>{shape.description}</Text>

                                    <View style={[styles.radio, value === shape.label && styles.radioActive]}>
                                        {value === shape.label && <View style={styles.radioDot} />}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                />

                <Card style={styles.symmetryCard}>
                    <View style={styles.toggleRow}>
                        <View>
                            <Text style={styles.toggleTitle}>Facial Symmetry</Text>
                            <Text style={styles.toggleSubtitle}>Do you notice facial symmetry?</Text>
                        </View>
                        <Controller
                            control={control}
                            name="facialSymmetry"
                            render={({ field: { onChange, value } }) => (
                                <View style={styles.switchContainer}>
                                    <Text style={[styles.switchLabel, !value && styles.switchLabelActive]}>No</Text>
                                    <Switch
                                        value={value}
                                        onValueChange={onChange}
                                        trackColor={{ false: Colors.border, true: Colors.sageGreen }}
                                        thumbColor={Colors.white}
                                    />
                                    <Text style={[styles.switchLabel, value && styles.switchLabelActive]}>Yes</Text>
                                </View>
                            )}
                        />
                    </View>
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
    label: {
        ...Typography.h3,
        fontSize: 16,
        marginBottom: Spacing.md,
        marginTop: Spacing.lg,
    },
    grid: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    selectionCard: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.md,
        padding: Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        paddingVertical: Spacing.lg,
    },
    selectionCardActive: {
        borderColor: Colors.sageGreen,
        backgroundColor: `${Colors.sageGreen}05`,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: `${Colors.sageGreen}10`,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.md,
    },
    iconContainerActive: {
        backgroundColor: Colors.sageGreen,
    },
    selectionTitle: {
        ...Typography.body,
        fontWeight: '600',
        marginBottom: Spacing.xs,
        fontSize: 14,
    },
    selectionTitleActive: {
        color: Colors.sageGreen,
    },
    selectionDescription: {
        ...Typography.caption,
        color: Colors.mutedSage,
        textAlign: 'center',
        fontSize: 10,
        marginBottom: Spacing.md,
    },
    radio: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioActive: {
        borderColor: Colors.sageGreen,
    },
    radioDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.sageGreen,
    },
    symmetryCard: {
        marginTop: Spacing.xl,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toggleTitle: {
        ...Typography.h3,
        fontSize: 16,
        marginBottom: Spacing.xs,
    },
    toggleSubtitle: {
        ...Typography.caption,
        color: Colors.mutedSage,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    switchLabel: {
        ...Typography.caption,
        color: Colors.mutedSage,
    },
    switchLabelActive: {
        color: Colors.sageGreen,
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

export default Step4Structure;
