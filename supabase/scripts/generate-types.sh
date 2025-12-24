#!/bin/bash

# ============================================================================
# Generate TypeScript types from Supabase schema
# ============================================================================
# Prerequisites:
# 1. Supabase CLI installed: npm install -g supabase
# 2. Project linked: supabase link --project-ref YOUR_PROJECT_REF
# ============================================================================

echo "Generating TypeScript types from Supabase schema..."

# Generate types from remote database
supabase gen types typescript --linked > ../supabase-types.ts

if [ $? -eq 0 ]; then
    echo "✅ Types generated successfully at supabase-types.ts"
else
    echo "❌ Failed to generate types. Make sure you're linked to a Supabase project."
    echo "Run: supabase link --project-ref YOUR_PROJECT_REF"
    exit 1
fi
