-- ============================================================================
-- DERMACARE HOLISTIC SKIN-HEALTH APPLICATION
-- Database Schema and RLS Policies Migration
-- Created: 2025-12-24
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Profiles: User metadata and preferences
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- User Information
    full_name TEXT,
    email TEXT UNIQUE,
    avatar_url TEXT,
    date_of_birth DATE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    
    -- Preferences (JSONB for flexibility)
    preferences JSONB DEFAULT jsonb_build_object(
        'notifications_enabled', true,
        'email_updates', true,
        'theme', 'light',
        'language', 'en',
        'measurement_system', 'metric'
    ),
    
    -- Metadata
    onboarding_completed BOOLEAN DEFAULT FALSE,
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'pro')),
    timezone TEXT DEFAULT 'UTC'
);

CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_subscription ON profiles(subscription_tier);

-- Skin Assessments: Store raw data from 6-step forms
CREATE TABLE IF NOT EXISTS skin_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Assessment Metadata
    assessment_name TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    
    -- 6-step form data (JSONB for flexibility)
    step_1_data JSONB, -- Skin type, concerns
    step_2_data JSONB, -- Lifestyle habits
    step_3_data JSONB, -- Current skincare routine
    step_4_data JSONB, -- Diet and hydration
    step_5_data JSONB, -- Environmental factors
    step_6_data JSONB, -- Goals and expectations
    
    -- Consolidated results
    assessment_summary JSONB,
    skin_score INTEGER CHECK (skin_score >= 0 AND skin_score <= 100),
    primary_concerns TEXT[],
    recommended_focus_areas TEXT[]
);

CREATE INDEX idx_assessments_user ON skin_assessments(user_id);
CREATE INDEX idx_assessments_created ON skin_assessments(created_at DESC);
CREATE INDEX idx_assessments_completed ON skin_assessments(user_id, is_completed);

-- Curated Plans: Pre-made static tracks
CREATE TABLE IF NOT EXISTS curated_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Plan Information
    plan_name TEXT NOT NULL UNIQUE,
    plan_slug TEXT NOT NULL UNIQUE,
    description TEXT,
    category TEXT CHECK (category IN ('facial_structure', 'skin_health', 'wellness', 'anti_aging')),
    
    -- Plan Details
    duration_days INTEGER NOT NULL,
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    target_areas TEXT[],
    
    -- Plan Content
    daily_actions JSONB NOT NULL,
    expected_outcomes TEXT[],
    tips_and_tricks JSONB,
    
    -- Media
    thumbnail_url TEXT,
    video_url TEXT,
    resource_links JSONB,
    
    -- Metadata
    is_active BOOLEAN DEFAULT TRUE,
    is_premium BOOLEAN DEFAULT FALSE,
    popularity_score INTEGER DEFAULT 0
);

CREATE INDEX idx_plans_category ON curated_plans(category);
CREATE INDEX idx_plans_active ON curated_plans(is_active);
CREATE INDEX idx_plans_slug ON curated_plans(plan_slug);

-- Daily Routines: AI-generated personalized plans
CREATE TABLE IF NOT EXISTS daily_routines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    skin_assessment_id UUID NOT NULL REFERENCES skin_assessments(id) ON DELETE CASCADE,
    curated_plan_id UUID REFERENCES curated_plans(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Routine Metadata
    routine_name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- AI-Generated Plan
    plan_structure JSONB NOT NULL,
    /* Example:
    {
        "days": [
            {
                "day_number": 1,
                "date": "2025-12-24",
                "actions": [
                    {"id": "action_1", "type": "ice_dip", "title": "Morning Ice Dip", "duration_minutes": 5},
                    {"id": "action_2", "type": "supplement", "title": "Ginger Tea", "quantity": "1 cup"}
                ]
            }
        ]
    }
    */
    
    -- Customizations
    custom_notes TEXT,
    modifications JSONB
);

CREATE INDEX idx_routines_user ON daily_routines(user_id);
CREATE INDEX idx_routines_assessment ON daily_routines(skin_assessment_id);
CREATE INDEX idx_routines_active ON daily_routines(user_id, is_active);
CREATE INDEX idx_routines_dates ON daily_routines(user_id, start_date, end_date);

-- Progress Logs: Daily task completion and status tracking
CREATE TABLE IF NOT EXISTS progress_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    daily_routine_id UUID NOT NULL REFERENCES daily_routines(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    
    -- Task Completion
    completed_actions JSONB DEFAULT '[]'::jsonb,
    completion_percentage INTEGER CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    
    -- User Status
    mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 5),
    skin_feeling_rating INTEGER CHECK (skin_feeling_rating >= 1 AND skin_feeling_rating <= 5),
    energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 5),
    
    -- Detailed Logs
    skin_notes TEXT,
    photos JSONB,
    side_effects TEXT,
    overall_notes TEXT,
    is_rest_day BOOLEAN DEFAULT FALSE,
    
    -- Unique constraint
    CONSTRAINT unique_user_routine_date UNIQUE (user_id, daily_routine_id, log_date)
);

CREATE INDEX idx_logs_user ON progress_logs(user_id);
CREATE INDEX idx_logs_routine ON progress_logs(daily_routine_id);
CREATE INDEX idx_logs_date ON progress_logs(user_id, log_date DESC);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at 
    BEFORE UPDATE ON skin_assessments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_routines_updated_at 
    BEFORE UPDATE ON daily_routines
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_logs_updated_at 
    BEFORE UPDATE ON progress_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plans_updated_at 
    BEFORE UPDATE ON curated_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skin_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE curated_plans ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Skin Assessments Policies
CREATE POLICY "Users can view own assessments" ON skin_assessments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own assessments" ON skin_assessments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own assessments" ON skin_assessments
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own assessments" ON skin_assessments
    FOR DELETE USING (auth.uid() = user_id);

-- Daily Routines Policies
CREATE POLICY "Users can view own routines" ON daily_routines
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own routines" ON daily_routines
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own routines" ON daily_routines
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own routines" ON daily_routines
    FOR DELETE USING (auth.uid() = user_id);

-- Progress Logs Policies
CREATE POLICY "Users can view own logs" ON progress_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own logs" ON progress_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own logs" ON progress_logs
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own logs" ON progress_logs
    FOR DELETE USING (auth.uid() = user_id);

-- Curated Plans Policies (Read-only for all authenticated users)
CREATE POLICY "Authenticated users can view active plans" ON curated_plans
    FOR SELECT USING (is_active = TRUE AND auth.role() = 'authenticated');

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Insert sample curated plans
INSERT INTO curated_plans (plan_name, plan_slug, description, category, duration_days, difficulty_level, target_areas, daily_actions, expected_outcomes, is_premium)
VALUES 
(
    'Jawline Sculptor',
    'jawline-sculptor',
    'A comprehensive 21-day program to enhance your jawline definition through targeted exercises, nutrition, and lifestyle changes.',
    'facial_structure',
    21,
    'intermediate',
    ARRAY['jawline', 'neck', 'facial_contour'],
    jsonb_build_object(
        'template', jsonb_build_array(
            jsonb_build_object('type', 'exercise', 'title', 'Chin Lifts', 'duration_minutes', 5),
            jsonb_build_object('type', 'ice_dip', 'title', 'Ice Water Face Dip', 'duration_minutes', 3),
            jsonb_build_object('type', 'supplement', 'title', 'Ginger Tea', 'quantity', '1 cup')
        )
    ),
    ARRAY['Enhanced jawline definition', 'Reduced double chin', 'Improved facial contour'],
    FALSE
),
(
    'Double Chin Eliminator',
    'double-chin-eliminator',
    'Target and reduce double chin appearance with specialized exercises and techniques.',
    'facial_structure',
    14,
    'beginner',
    ARRAY['chin', 'neck'],
    jsonb_build_object(
        'template', jsonb_build_array(
            jsonb_build_object('type', 'exercise', 'title', 'Neck Stretches', 'duration_minutes', 5),
            jsonb_build_object('type', 'massage', 'title', 'Lymphatic Drainage Massage', 'duration_minutes', 10)
        )
    ),
    ARRAY['Reduced double chin', 'Tighter neck skin', 'Improved posture'],
    FALSE
),
(
    'De-bloat & Glow',
    'debloat-glow',
    'A 7-day intensive program to reduce facial bloating and achieve a natural glow.',
    'wellness',
    7,
    'beginner',
    ARRAY['face', 'overall_skin'],
    jsonb_build_object(
        'template', jsonb_build_array(
            jsonb_build_object('type', 'supplement', 'title', 'Lemon Water', 'quantity', '1 glass'),
            jsonb_build_object('type', 'diet', 'title', 'Low Sodium Meal Plan'),
            jsonb_build_object('type', 'ice_dip', 'title', 'Cold Water Face Rinse', 'duration_minutes', 2)
        )
    ),
    ARRAY['Reduced facial bloating', 'Enhanced skin radiance', 'Better hydration'],
    FALSE
)
ON CONFLICT (plan_name) DO NOTHING;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
