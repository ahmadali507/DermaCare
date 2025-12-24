@echo off
REM ============================================================================
REM Generate TypeScript types from Supabase schema (Windows)
REM ============================================================================
REM Prerequisites:
REM 1. Supabase CLI installed: npm install -g supabase
REM 2. Project linked: supabase link --project-ref YOUR_PROJECT_REF
REM ============================================================================

echo Generating TypeScript types from Supabase schema...

supabase gen types typescript --linked > ..\supabase-types.ts

if %ERRORLEVEL% EQU 0 (
    echo ✅ Types generated successfully at supabase-types.ts
) else (
    echo ❌ Failed to generate types. Make sure you're linked to a Supabase project.
    echo Run: supabase link --project-ref YOUR_PROJECT_REF
    exit /b 1
)
