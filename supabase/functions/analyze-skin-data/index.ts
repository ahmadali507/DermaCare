import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.21.0";

// ============================================================================
// TYPES
// ============================================================================

interface SkinFormData {
    step_1_data: {
        skin_type?: string;
        primary_concerns?: string[];
        skin_sensitivity?: string;
    };
    step_2_data: {
        sleep_hours?: number;
        stress_level?: string;
        exercise_frequency?: string;
        water_intake?: number;
    };
    step_3_data: {
        current_routine?: string;
        products_used?: string[];
    };
    step_4_data: {
        diet_type?: string;
        sugar_intake?: string;
        caffeine_intake?: string;
        alcohol_consumption?: string;
    };
    step_5_data: {
        sun_exposure?: string;
        pollution_level?: string;
        climate?: string;
    };
    step_6_data: {
        primary_goals?: string[];
        timeline_expectation?: string;
        commitment_level?: string;
    };
    skin_assessment_id: string;
    user_id: string;
    routine_days?: number;
}

interface DailyAction {
    id: string;
    type: string;
    title: string;
    description: string;
    duration_minutes?: number;
    quantity?: string;
    time_of_day?: string;
}

interface DayPlan {
    day_number: number;
    date: string;
    focus_area: string;
    actions: DailyAction[];
}

interface DailyProtocol {
    routine_name: string;
    total_days: number;
    overview: string;
    root_cause_analysis: {
        identified_issues: string[];
        contributing_factors: string[];
    };
    days: DayPlan[];
    general_tips: string[];
}

// ============================================================================
// SYSTEM PROMPT
// ============================================================================

const SYSTEM_PROMPT = `You are a holistic skin health advisor specializing in natural, chemical-free solutions for skin wellness. Your role is to analyze skin data and create personalized daily protocols.

## CRITICAL RULES - MUST FOLLOW:
1. ONLY recommend NATURAL, HOLISTIC solutions. 
2. ABSOLUTELY NO medications, pharmaceutical products, or chemical skincare products.
3. Focus on root causes of skin issues like bloating, dullness, inflammation, or congestion.

## ALLOWED RECOMMENDATIONS (USE ONLY THESE):
- **Ice Face Dips**: Cold water immersion for circulation and de-puffing
- **Natural Juices**: Celery juice, cucumber juice, lemon water, carrot juice, beetroot juice
- **Ginger**: Ginger tea, ginger shots, ginger-infused water
- **Vitamin C Foods**: Oranges, lemons, amla (Indian gooseberry), bell peppers, kiwi, papaya, strawberries
- **Facial Massage**: Lymphatic drainage massage, gua sha techniques, jade roller massage
- **Herbal Teas**: Green tea, chamomile, peppermint, dandelion
- **Hydration**: Water intake recommendations
- **Breathing Exercises**: For stress reduction and oxygenation
- **Sleep Hygiene**: Natural sleep improvement techniques
- **Face Yoga**: Facial exercises for muscle toning
- **Natural Masks**: Honey, turmeric, aloe vera, oatmeal (kitchen ingredients only)
- **Dietary Changes**: Reducing salt, sugar, processed foods, dairy

## FORBIDDEN (NEVER RECOMMEND):
- Prescription medications
- Over-the-counter drugs
- Chemical serums, retinoids, AHAs, BHAs
- Pharmaceutical-grade supplements
- Any branded skincare products
- Injections or invasive procedures

## RESPONSE FORMAT:
You MUST respond with a valid JSON object following this exact structure:
{
  "routine_name": "string - descriptive name for the routine",
  "total_days": number,
  "overview": "string - brief overview of the protocol",
  "root_cause_analysis": {
    "identified_issues": ["array of identified skin issues"],
    "contributing_factors": ["array of lifestyle/dietary factors causing issues"]
  },
  "days": [
    {
      "day_number": 1,
      "date": "YYYY-MM-DD",
      "focus_area": "string - main focus for this day",
      "actions": [
        {
          "id": "action_1",
          "type": "ice_dip|juice|tea|massage|exercise|diet|hydration|mask|breathing|sleep",
          "title": "string - action title",
          "description": "string - detailed instructions",
          "duration_minutes": number,
          "quantity": "string - optional amount",
          "time_of_day": "morning|afternoon|evening|night"
        }
      ]
    }
  ],
  "general_tips": ["array of overall lifestyle tips"]
}

Analyze the provided skin data thoroughly and create a comprehensive daily protocol addressing root causes naturally.`;

// ============================================================================
// EDGE FUNCTION HANDLER
// ============================================================================

Deno.serve(async (req: Request) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers":
                    "authorization, x-client-info, apikey, content-type",
            },
        });
    }

    try {
        // Validate request method
        if (req.method !== "POST") {
            return new Response(
                JSON.stringify({ error: "Method not allowed" }),
                {
                    status: 405,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Parse request body
        const formData: SkinFormData = await req.json();

        // Validate required fields
        if (!formData.skin_assessment_id || !formData.user_id) {
            return new Response(
                JSON.stringify({
                    error: "Missing required fields: skin_assessment_id and user_id",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        // Get environment variables
        const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

        if (!geminiApiKey) {
            throw new Error("GEMINI_API_KEY is not configured");
        }
        if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error("Supabase environment variables are not configured");
        }

        // Initialize clients
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const supabase = createClient(supabaseUrl, supabaseServiceKey);

        // Prepare prompt with user data
        const routineDays = formData.routine_days || 7;
        const startDate = new Date();

        const userPrompt = `
Analyze the following skin assessment data and create a ${routineDays}-day Daily Protocol starting from ${startDate.toISOString().split("T")[0]}:

## Skin Type & Concerns (Step 1):
${JSON.stringify(formData.step_1_data, null, 2)}

## Lifestyle Habits (Step 2):
${JSON.stringify(formData.step_2_data, null, 2)}

## Current Skincare Routine (Step 3):
${JSON.stringify(formData.step_3_data, null, 2)}

## Diet & Hydration (Step 4):
${JSON.stringify(formData.step_4_data, null, 2)}

## Environmental Factors (Step 5):
${JSON.stringify(formData.step_5_data, null, 2)}

## Goals & Expectations (Step 6):
${JSON.stringify(formData.step_6_data, null, 2)}

Based on this data, identify the root causes of any skin issues (especially bloating, dullness, or inflammation) and create a comprehensive natural daily protocol. Remember: ONLY natural, holistic solutions - NO medications or chemical products.
`;

        // Call Gemini API
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            generationConfig: {
                temperature: 0.7,
                topP: 0.9,
                maxOutputTokens: 8192,
                responseMimeType: "application/json",
            },
        });

        const result = await model.generateContent([
            { text: SYSTEM_PROMPT },
            { text: userPrompt },
        ]);

        const responseText = result.response.text();

        // Parse AI response
        let dailyProtocol: DailyProtocol;
        try {
            dailyProtocol = JSON.parse(responseText);
        } catch {
            console.error("Failed to parse AI response:", responseText);
            throw new Error("Failed to parse AI response as JSON");
        }

        // Calculate end date
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + (dailyProtocol.total_days || routineDays) - 1);

        // Insert into daily_routines table
        const { data: routine, error: insertError } = await supabase
            .from("daily_routines")
            .insert({
                user_id: formData.user_id,
                skin_assessment_id: formData.skin_assessment_id,
                routine_name: dailyProtocol.routine_name || "Custom Holistic Protocol",
                start_date: startDate.toISOString().split("T")[0],
                end_date: endDate.toISOString().split("T")[0],
                is_active: true,
                plan_structure: dailyProtocol,
                custom_notes: `Generated by AI on ${new Date().toISOString()}`,
            })
            .select("id")
            .single();

        if (insertError) {
            console.error("Database insert error:", insertError);
            throw new Error(`Failed to save routine: ${insertError.message}`);
        }

        // Return success response
        return new Response(
            JSON.stringify({
                success: true,
                routine_id: routine.id,
                routine_name: dailyProtocol.routine_name,
                total_days: dailyProtocol.total_days,
                overview: dailyProtocol.overview,
                root_cause_analysis: dailyProtocol.root_cause_analysis,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
    } catch (error) {
        console.error("Edge function error:", error);

        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error occurred",
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
    }
});
