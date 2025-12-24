/**
 * Step 6: Photo Upload (Optional)
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../navigation/types';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { ProgressBar } from '../../components/ProgressBar';
import { useFormStore } from '../../store/useFormStore';
import { PhotoData } from '../../types/form.types';
import { submitFormToSupabase } from '../../services/submission.service';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

type NavigationProp = StackNavigationProp<RootStackParamList, 'FormStep6'>;

const Step6Photos: React.FC = () => {
    const navigation = useNavigation<NavigationProp>();
    const { formData, updateStep6 } = useFormStore();
    const [submitting, setSubmitting] = useState(false);

    const { control, handleSubmit, setValue, watch } = useForm<PhotoData>({
        defaultValues: formData.step6 || {
            frontPhoto: null,
            leftPhoto: null,
            rightPhoto: null,
        },
    });

    const watchPhotos = watch();

    const pickImage = async (type: 'frontPhoto' | 'leftPhoto' | 'rightPhoto') => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert('Permission Required', 'Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 0.8,
        });

        if (!result.canceled) {
            setValue(type, result.assets[0].uri);
        }
    };

    const onSkip = async () => {
        updateStep6({
            frontPhoto: null,
            leftPhoto: null,
            rightPhoto: null,
        });
        await handleSubmission({
            frontPhoto: null,
            leftPhoto: null,
            rightPhoto: null,
        });
    };

    const onSubmit = async (data: PhotoData) => {
        updateStep6(data);
        await handleSubmission(data);
    };

    const handleSubmission = async (photoData: PhotoData) => {
        setSubmitting(true);

        const completeData = {
            ...formData,
            step6: photoData,
        };

        const result = await submitFormToSupabase(completeData);

        setSubmitting(false);

        if (result.success) {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Results' }],
            });
        } else {
            Alert.alert('Submission Failed', result.message);
        }
    };

    return (
        <View style={styles.container}>
            <ProgressBar currentStep={6} totalSteps={6} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.heading}>Upload Your Photos</Text>
                <Text style={styles.subheading}>(Optional)</Text>

                <Card style={styles.infoCard}>
                    <View style={styles.infoTitleRow}>
                        <Ionicons name="camera" size={20} color={Colors.darkForest} />
                        <Text style={styles.infoText}>For best results:</Text>
                    </View>
                    <Text style={styles.infoItem}>• Front view, natural lighting</Text>
                    <Text style={styles.infoItem}>• No makeup or filters</Text>
                    <Text style={styles.infoItem}>• Clear, well-lit photos</Text>
                </Card>

                {/* Front Photo */}
                <Text style={styles.label}>Front View</Text>
                <Controller
                    control={control}
                    name="frontPhoto"
                    render={({ field: { value } }) => (
                        <TouchableOpacity
                            style={styles.uploadBox}
                            onPress={() => pickImage('frontPhoto')}
                        >
                            {value ? (
                                <Image source={{ uri: value }} style={styles.uploadedImage} />
                            ) : (
                                <View style={styles.uploadPlaceholder}>
                                    <Ionicons name="camera-outline" size={48} color={Colors.sageGreen} />
                                    <Text style={styles.uploadText}>Tap to upload</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                />

                {/* Left Photo */}
                <Text style={styles.label}>Left Side View</Text>
                <Controller
                    control={control}
                    name="leftPhoto"
                    render={({ field: { value } }) => (
                        <TouchableOpacity
                            style={styles.uploadBox}
                            onPress={() => pickImage('leftPhoto')}
                        >
                            {value ? (
                                <Image source={{ uri: value }} style={styles.uploadedImage} />
                            ) : (
                                <View style={styles.uploadPlaceholder}>
                                    <Ionicons name="camera-outline" size={48} color={Colors.sageGreen} />
                                    <Text style={styles.uploadText}>Tap to upload</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                />

                {/* Right Photo */}
                <Text style={styles.label}>Right Side View</Text>
                <Controller
                    control={control}
                    name="rightPhoto"
                    render={({ field: { value } }) => (
                        <TouchableOpacity
                            style={styles.uploadBox}
                            onPress={() => pickImage('rightPhoto')}
                        >
                            {value ? (
                                <Image source={{ uri: value }} style={styles.uploadedImage} />
                            ) : (
                                <View style={styles.uploadPlaceholder}>
                                    <Ionicons name="camera-outline" size={48} color={Colors.sageGreen} />
                                    <Text style={styles.uploadText}>Tap to upload</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    )}
                />

                <Card style={styles.privacyCard}>
                    <View style={styles.privacyRow}>
                        <Ionicons name="lock-closed" size={16} color={Colors.mutedSage} />
                        <Text style={styles.privacyText}>
                            Your photos are securely encrypted and will only be used for your personalized skincare analysis. They will never be shared without your explicit consent.
                        </Text>
                    </View>
                </Card>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Skip"
                        onPress={onSkip}
                        variant="secondary"
                        loading={submitting}
                        style={styles.skipButton}
                    />
                    <Button
                        title="Submit Assessment"
                        onPress={handleSubmit(onSubmit)}
                        loading={submitting}
                        style={styles.submitButton}
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
        marginBottom: Spacing.lg,
    },
    infoCard: {
        marginBottom: Spacing.lg,
        backgroundColor: `${Colors.sageGreen}10`,
    },
    infoTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    infoText: {
        ...Typography.body,
        fontWeight: '600',
    },
    infoItem: {
        ...Typography.caption,
        color: Colors.mutedSage,
        marginLeft: Spacing.xl,
    },
    label: {
        ...Typography.h3,
        fontSize: 16,
        marginBottom: Spacing.sm,
        marginTop: Spacing.md,
    },
    uploadBox: {
        width: '100%',
        height: 200,
        borderRadius: BorderRadius.md,
        borderWidth: 2,
        borderColor: Colors.sageGreen,
        borderStyle: 'dashed',
        overflow: 'hidden',
        backgroundColor: Colors.white,
    },
    uploadPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadText: {
        ...Typography.body,
        color: Colors.sageGreen,
        marginTop: Spacing.sm,
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    privacyCard: {
        marginTop: Spacing.lg,
        backgroundColor: `${Colors.sageGreen}10`,
    },
    privacyRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    privacyText: {
        ...Typography.caption,
        color: Colors.mutedSage,
        lineHeight: 18,
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginTop: Spacing.xl,
    },
    skipButton: {
        flex: 1,
    },
    submitButton: {
        flex: 1,
    },
});

export default Step6Photos;
