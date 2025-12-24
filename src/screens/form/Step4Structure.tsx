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
import { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ProgressBar } from '../../components/ProgressBar';
import { useFormStore } from '../../store/useFormStore';
import { StructureData } from '../../types/form.types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import {
    JawlineDefined,
    JawlineModerate,
    JawlineSoft,
    ChinProminent,
    ChinBalanced,
    ChinRecessed,
} from '../../components/icons/FacialIcons';

type NavigationProp = StackNavigationProp<RootStackParamList, 'FormStep4'>;

const jawlineTypes = [
    { label: 'Defined', description: 'Sharp, angular', Icon: JawlineDefined },
    { label: 'Moderate', description: 'Balanced', Icon: JawlineModerate },
    { label: 'Soft', description: 'Rounded', Icon: JawlineSoft },
];

const chinShapes = [
    { label: 'Prominent', description: 'Projecting', Icon: ChinProminent },
    { label: 'Balanced', description: 'Proportional', Icon: ChinBalanced },
    { label: 'Recessed', description: 'Set back', Icon: ChinRecessed },
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
                <Text style={styles.sublabel}>Select the profile that best matches yours.</Text>
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
                                    <View style={styles.iconContainer}>
                                        <type.Icon
                                            size={80}
                                            color={value === type.label ? Colors.sageGreen : Colors.mutedSage}
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

                                    <View style={[styles.radio, value === type.label && styles.radioActive]}>
                                        {value === type.label && <View style={styles.radioDot} />}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                />

                <Text style={styles.label}>Chin Shape</Text>
                <Text style={styles.sublabel}>Identify your chin profile.</Text>
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
                                    <View style={styles.iconContainer}>
                                        <shape.Icon
                                            size={80}
                                            color={value === shape.label ? Colors.sageGreen : Colors.mutedSage}
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
                        <View style={styles.toggleTextContainer}>
                            <Text style={styles.toggleTitle}>Facial Symmetry</Text>
                            <Text style={styles.toggleSubtitle}>Is the facial structure generally symmetrical?</Text>
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
                        variant="primary"
                        onPress={() => navigation


                            .goBack()}
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
        fontSize: 18,
        marginBottom: Spacing.xs,
        marginTop: Spacing.lg,
    },
    sublabel: {
        ...Typography.body,
        color: Colors.mutedSage,
        marginBottom: Spacing.md,
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
        justifyContent: 'space-between',
        minHeight: 160,
    },
    selectionCardActive: {
        borderColor: Colors.sageGreen,
        backgroundColor: `${Colors.sageGreen}05`,
    },
    iconContainer: {
        marginBottom: Spacing.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectionTitle: {
        ...Typography.body,
        fontWeight: '600',
        marginBottom: Spacing.md,
        fontSize: 14,
        textAlign: 'center',
    },
    selectionTitleActive: {
        color: Colors.sageGreen,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioActive: {
        borderColor: Colors.sageGreen,
    },
    radioDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.sageGreen,
    },
    symmetryCard: {
        marginTop: Spacing.xl,
        paddingVertical: Spacing.lg,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toggleTextContainer: {
        flex: 1,
        paddingRight: Spacing.md,
    },
    toggleTitle: {
        ...Typography.h3,
        fontSize: 16,
        marginBottom: Spacing.xs,
    },
    toggleSubtitle: {
        ...Typography.caption,
        color: Colors.mutedSage,
        lineHeight: 18,
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
