export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            curated_plans: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    plan_name: string
                    plan_slug: string
                    description: string | null
                    category: 'facial_structure' | 'skin_health' | 'wellness' | 'anti_aging' | null
                    duration_days: number
                    difficulty_level: 'beginner' | 'intermediate' | 'advanced' | null
                    target_areas: string[] | null
                    daily_actions: Json
                    expected_outcomes: string[] | null
                    tips_and_tricks: Json | null
                    thumbnail_url: string | null
                    video_url: string | null
                    resource_links: Json | null
                    is_active: boolean
                    is_premium: boolean
                    popularity_score: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    plan_name: string
                    plan_slug: string
                    description?: string | null
                    category?: 'facial_structure' | 'skin_health' | 'wellness' | 'anti_aging' | null
                    duration_days: number
                    difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | null
                    target_areas?: string[] | null
                    daily_actions: Json
                    expected_outcomes?: string[] | null
                    tips_and_tricks?: Json | null
                    thumbnail_url?: string | null
                    video_url?: string | null
                    resource_links?: Json | null
                    is_active?: boolean
                    is_premium?: boolean
                    popularity_score?: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    plan_name?: string
                    plan_slug?: string
                    description?: string | null
                    category?: 'facial_structure' | 'skin_health' | 'wellness' | 'anti_aging' | null
                    duration_days?: number
                    difficulty_level?: 'beginner' | 'intermediate' | 'advanced' | null
                    target_areas?: string[] | null
                    daily_actions?: Json
                    expected_outcomes?: string[] | null
                    tips_and_tricks?: Json | null
                    thumbnail_url?: string | null
                    video_url?: string | null
                    resource_links?: Json | null
                    is_active?: boolean
                    is_premium?: boolean
                    popularity_score?: number
                }
                Relationships: []
            }
            daily_routines: {
                Row: {
                    id: string
                    user_id: string
                    skin_assessment_id: string
                    curated_plan_id: string | null
                    created_at: string
                    updated_at: string
                    routine_name: string
                    start_date: string
                    end_date: string
                    is_active: boolean
                    plan_structure: Json
                    custom_notes: string | null
                    modifications: Json | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    skin_assessment_id: string
                    curated_plan_id?: string | null
                    created_at?: string
                    updated_at?: string
                    routine_name: string
                    start_date: string
                    end_date: string
                    is_active?: boolean
                    plan_structure: Json
                    custom_notes?: string | null
                    modifications?: Json | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    skin_assessment_id?: string
                    curated_plan_id?: string | null
                    created_at?: string
                    updated_at?: string
                    routine_name?: string
                    start_date?: string
                    end_date?: string
                    is_active?: boolean
                    plan_structure?: Json
                    custom_notes?: string | null
                    modifications?: Json | null
                }
                Relationships: [
                    {
                        foreignKeyName: "daily_routines_curated_plan_id_fkey"
                        columns: ["curated_plan_id"]
                        referencedRelation: "curated_plans"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "daily_routines_skin_assessment_id_fkey"
                        columns: ["skin_assessment_id"]
                        referencedRelation: "skin_assessments"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "daily_routines_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            profiles: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    full_name: string | null
                    email: string | null
                    avatar_url: string | null
                    date_of_birth: string | null
                    gender: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
                    preferences: Json
                    onboarding_completed: boolean
                    subscription_tier: 'free' | 'premium' | 'pro'
                    timezone: string
                }
                Insert: {
                    id: string
                    created_at?: string
                    updated_at?: string
                    full_name?: string | null
                    email?: string | null
                    avatar_url?: string | null
                    date_of_birth?: string | null
                    gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
                    preferences?: Json
                    onboarding_completed?: boolean
                    subscription_tier?: 'free' | 'premium' | 'pro'
                    timezone?: string
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    full_name?: string | null
                    email?: string | null
                    avatar_url?: string | null
                    date_of_birth?: string | null
                    gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say' | null
                    preferences?: Json
                    onboarding_completed?: boolean
                    subscription_tier?: 'free' | 'premium' | 'pro'
                    timezone?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            progress_logs: {
                Row: {
                    id: string
                    user_id: string
                    daily_routine_id: string
                    log_date: string
                    created_at: string
                    updated_at: string
                    completed_actions: Json
                    completion_percentage: number | null
                    mood_rating: number | null
                    skin_feeling_rating: number | null
                    energy_level: number | null
                    skin_notes: string | null
                    photos: Json | null
                    side_effects: string | null
                    overall_notes: string | null
                    is_rest_day: boolean
                }
                Insert: {
                    id?: string
                    user_id: string
                    daily_routine_id: string
                    log_date: string
                    created_at?: string
                    updated_at?: string
                    completed_actions?: Json
                    completion_percentage?: number | null
                    mood_rating?: number | null
                    skin_feeling_rating?: number | null
                    energy_level?: number | null
                    skin_notes?: string | null
                    photos?: Json | null
                    side_effects?: string | null
                    overall_notes?: string | null
                    is_rest_day?: boolean
                }
                Update: {
                    id?: string
                    user_id?: string
                    daily_routine_id?: string
                    log_date?: string
                    created_at?: string
                    updated_at?: string
                    completed_actions?: Json
                    completion_percentage?: number | null
                    mood_rating?: number | null
                    skin_feeling_rating?: number | null
                    energy_level?: number | null
                    skin_notes?: string | null
                    photos?: Json | null
                    side_effects?: string | null
                    overall_notes?: string | null
                    is_rest_day?: boolean
                }
                Relationships: [
                    {
                        foreignKeyName: "progress_logs_daily_routine_id_fkey"
                        columns: ["daily_routine_id"]
                        referencedRelation: "daily_routines"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "progress_logs_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            skin_assessments: {
                Row: {
                    id: string
                    user_id: string
                    created_at: string
                    updated_at: string
                    assessment_name: string | null
                    is_completed: boolean
                    completed_at: string | null
                    step_1_data: Json | null
                    step_2_data: Json | null
                    step_3_data: Json | null
                    step_4_data: Json | null
                    step_5_data: Json | null
                    step_6_data: Json | null
                    assessment_summary: Json | null
                    skin_score: number | null
                    primary_concerns: string[] | null
                    recommended_focus_areas: string[] | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    created_at?: string
                    updated_at?: string
                    assessment_name?: string | null
                    is_completed?: boolean
                    completed_at?: string | null
                    step_1_data?: Json | null
                    step_2_data?: Json | null
                    step_3_data?: Json | null
                    step_4_data?: Json | null
                    step_5_data?: Json | null
                    step_6_data?: Json | null
                    assessment_summary?: Json | null
                    skin_score?: number | null
                    primary_concerns?: string[] | null
                    recommended_focus_areas?: string[] | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    created_at?: string
                    updated_at?: string
                    assessment_name?: string | null
                    is_completed?: boolean
                    completed_at?: string | null
                    step_1_data?: Json | null
                    step_2_data?: Json | null
                    step_3_data?: Json | null
                    step_4_data?: Json | null
                    step_5_data?: Json | null
                    step_6_data?: Json | null
                    assessment_summary?: Json | null
                    skin_score?: number | null
                    primary_concerns?: string[] | null
                    recommended_focus_areas?: string[] | null
                }
                Relationships: [
                    {
                        foreignKeyName: "skin_assessments_user_id_fkey"
                        columns: ["user_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
