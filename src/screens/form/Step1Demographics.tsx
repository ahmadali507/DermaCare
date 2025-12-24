/**
 * Step 1: Demographics & Environment
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ProgressBar } from '../../components/ProgressBar';
import { Dropdown } from '../../components/Dropdown';
import { Slider } from '../../components/Slider';
import { useFormStore } from '../../store/useFormStore';
import { DemographicsData } from '../../types/form.types';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'FormStep1'>;

const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
const climates = ['Dry', 'Humid', 'Temperate', 'Tropical', 'Cold'];
const genders = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];

const skinTypes = [
    { label: 'Dry', icon: 'water-outline' as const },
    { label: 'Oily', icon: 'water' as const },
    { label: 'Combination', icon: 'contrast-outline' as const },
    { label: 'Normal', icon: 'happy-outline' as const },
    { label: 'Sensitive', icon: 'leaf-outline' as const },
];

const Step1Demographics: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { formData, updateStep1 } = useFormStore();

    const { control, handleSubmit, setValue, watch } = useForm<DemographicsData>({
        defaultValues: formData.step1 || {
            age: '',
            gender: '',
            skinType: '',
            climate: '',
            indoorOutdoorTime: 50,
        },
    });

    const onSubmit = (data: DemographicsData) => {
        updateStep1(data);
        navigation.navigate('FormStep2');
    };

    return (
        <View style={styles.container}>
            <ProgressBar currentStep={1} totalSteps={6} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.heading}>Tell us about yourself</Text>

                {/* Age */}
                <Controller
                    control={control}
                    name="age"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <Dropdown
                            label="Age Range"
                            options={ageRanges}
                            value={value}
                            onSelect={onChange}
                            placeholder="Select Age Range"
                        />
                    )}
                />

                {/* Gender */}
                <Text style={styles.label}>Gender Identity</Text>
                <Controller
                    control={control}
                    name="gender"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.pillContainer}>
                            {genders.map((gender) => (
                                <TouchableOpacity
                                    key={gender}
                                    style={[
                                        styles.pill,
                                        value === gender && styles.pillActive,
                                    ]}
                                    onPress={() => onChange(gender)}
                                >
                                    <Text
                                        style={[
                                            styles.pillText,
                                            value === gender && styles.pillTextActive,
                                        ]}
                                    >
                                        {gender}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                />

                {/* Skin Type */}
                <Text style={styles.label}>Skin Type</Text>
                <Controller
                    control={control}
                    name="skinType"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.skinTypeContainer}>
                            {skinTypes.map((type) => (
                                <TouchableOpacity
                                    key={type.label}
                                    style={[
                                        styles.skinTypeButton,
                                        value === type.label && styles.skinTypeButtonActive,
                                    ]}
                                    onPress={() => onChange(type.label)}
                                >
                                    <View
                                        style={[
                                            styles.iconCircle,
                                            value === type.label && styles.iconCircleActive,
                                        ]}
                                    >
                                        <Ionicons
                                            name={type.icon}
                                            size={24}
                                            color={value === type.label ? Colors.white : Colors.sageGreen}
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.skinTypeText,
                                            value === type.label && styles.skinTypeTextActive,
                                        ]}
                                    >
                                        {type.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                />

                {/* Climate */}
                <Controller
                    control={control}
                    name="climate"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                        <Dropdown
                            label="Climate"
                            options={climates}
                            value={value}
                            onSelect={onChange}
                            placeholder="Select Climate"
                        />
                    )}
                />

                {/* Indoor/Outdoor Time */}
                <Text style={styles.label}>Time Indoors vs Outdoors</Text>
                <Card style={styles.card}>
                    <Controller
                        control={control}
                        name="indoorOutdoorTime"
                        render={({ field: { onChange, value } }) => (
                            <Slider
                                value={value}
                                onValueChange={onChange}
                                minimumValue={0}
                                maximumValue={100}
                                step={10}
                                leftLabel="Mostly Indoors"
                                rightLabel="Mostly Outdoors"
                            />
                        )}
                    />
                </Card>

                <Button
                    title="Continue"
                    onPress={handleSubmit(onSubmit)}
                    style={styles.button}
                />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        By continuing, you agree to our{' '}
                        <Text
                            style={styles.link}
                            onPress={() => Linking.openURL('https://example.com/privacy')}
                        >
                            Privacy Policy
                        </Text>
                        {' & '}
                        <Text
                            style={styles.link}
                            onPress={() => Linking.openURL('https://example.com/terms')}
                        >
                            Terms of Service
                        </Text>
                    </Text>
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
        marginTop: Spacing.md,
        marginBottom: Spacing.sm,
    },
    pillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
        marginBottom: Spacing.md,
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
    skinTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: Spacing.md,
    },
    skinTypeButton: {
        alignItems: 'center',
        width: '18%',
        marginBottom: Spacing.sm,
    },
    skinTypeButtonActive: {
        // No specific container style change, mainly icon circle
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.xs,
    },
    iconCircleActive: {
        backgroundColor: Colors.sageGreen,
        borderColor: Colors.sageGreen,
    },
    skinTypeText: {
        ...Typography.caption,
        textAlign: 'center',
        fontSize: 10,
    },
    skinTypeTextActive: {
        color: Colors.sageGreen,
        fontWeight: '600',
    },
    card: {
        marginBottom: Spacing.md,
    },
    button: {
        marginTop: Spacing.xl,
    },
    footer: {
        marginTop: Spacing.xl,
        alignItems: 'center',
    },
    footerText: {
        ...Typography.caption,
        textAlign: 'center',
        color: Colors.mutedSage,
    },
    link: {
        textDecorationLine: 'underline',
        color: Colors.sageGreen,
    },
});

export default Step1Demographics;
