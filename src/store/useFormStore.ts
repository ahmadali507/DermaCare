/**
 * Zustand store for managing 6-step form state with persistence
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    CompleteFormData,
    DemographicsData,
    DietaryData,
    SymptomsData,
    StructureData,
    LifestyleData,
    PhotoData,
} from '../types/form.types';

interface FormStore {
    formData: CompleteFormData;
    currentStep: number;

    // Step update functions
    updateStep1: (data: DemographicsData) => void;
    updateStep2: (data: DietaryData) => void;
    updateStep3: (data: SymptomsData) => void;
    updateStep4: (data: StructureData) => void;
    updateStep5: (data: LifestyleData) => void;
    updateStep6: (data: PhotoData) => void;

    // Navigation
    setCurrentStep: (step: number) => void;
    nextStep: () => void;
    previousStep: () => void;

    // Form management
    resetForm: () => void;
    saveToStorage: () => Promise<void>;
    loadFromStorage: () => Promise<void>;
}

const initialFormData: CompleteFormData = {
    step1: null,
    step2: null,
    step3: null,
    step4: null,
    step5: null,
    step6: null,
};

export const useFormStore = create<FormStore>((set, get) => ({
    formData: initialFormData,
    currentStep: 1,

    updateStep1: (data) => {
        set((state) => ({
            formData: { ...state.formData, step1: data },
        }));
        get().saveToStorage();
    },

    updateStep2: (data) => {
        set((state) => ({
            formData: { ...state.formData, step2: data },
        }));
        get().saveToStorage();
    },

    updateStep3: (data) => {
        set((state) => ({
            formData: { ...state.formData, step3: data },
        }));
        get().saveToStorage();
    },

    updateStep4: (data) => {
        set((state) => ({
            formData: { ...state.formData, step4: data },
        }));
        get().saveToStorage();
    },

    updateStep5: (data) => {
        set((state) => ({
            formData: { ...state.formData, step5: data },
        }));
        get().saveToStorage();
    },

    updateStep6: (data) => {
        set((state) => ({
            formData: { ...state.formData, step6: data },
        }));
        get().saveToStorage();
    },

    setCurrentStep: (step) => {
        set({ currentStep: step });
    },

    nextStep: () => {
        set((state) => ({
            currentStep: Math.min(state.currentStep + 1, 6),
        }));
    },

    previousStep: () => {
        set((state) => ({
            currentStep: Math.max(state.currentStep - 1, 1),
        }));
    },

    resetForm: () => {
        set({ formData: initialFormData, currentStep: 1 });
        AsyncStorage.removeItem('formData');
    },

    saveToStorage: async () => {
        try {
            const { formData } = get();
            await AsyncStorage.setItem('formData', JSON.stringify(formData));
        } catch (error) {
            console.error('Failed to save form data:', error);
        }
    },

    loadFromStorage: async () => {
        try {
            const stored = await AsyncStorage.getItem('formData');
            if (stored) {
                const formData = JSON.parse(stored);
                set({ formData });
            }
        } catch (error) {
            console.error('Failed to load form data:', error);
        }
    },
}));
