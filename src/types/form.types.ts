/**
 * TypeScript types for form data across all 6 steps
 */

export interface DemographicsData {
    age: string;
    gender: string;
    skinType: string;
    climate: string;
    indoorOutdoorTime: number;
}

export interface DietaryData {
    waterIntake: number;
    dietType: string[];
    supplements: string[];
    allergies: boolean;
    allergyDetails?: string;
    caffeine: boolean;
    alcohol: boolean;
}

export interface SymptomData {
    name: string;
    severity: number;
}

export interface SymptomsData {
    symptoms: SymptomData[];
}

export interface StructureData {
    jawlineType: string;
    chinShape: string;
    facialSymmetry: boolean;
}

export interface LifestyleData {
    sleepHours: number;
    exerciseFrequency: string;
    stressLevel: number;
    skincareRoutine: string[];
    screenTime: number;
}

export interface PhotoData {
    frontPhoto: string | null;
    leftPhoto: string | null;
    rightPhoto: string | null;
}

export interface CompleteFormData {
    step1: DemographicsData | null;
    step2: DietaryData | null;
    step3: SymptomsData | null;
    step4: StructureData | null;
    step5: LifestyleData | null;
    step6: PhotoData | null;
}

export interface FormSubmissionResponse {
    success: boolean;
    message: string;
    recommendationId?: string;
}
