# Edge Functions Directory

This directory contains Supabase Edge Functions (Deno-based serverless functions).

## 📁 Planned Functions

### 1. `generate-routine/`
AI-powered routine generation based on skin assessment data.

### 2. `analyze-assessment/`
Process 6-step assessment and generate skin scores and recommendations.

### 3. `send-reminder/`
Daily reminders for routine tasks (via email/push notifications).

## 🚀 Creating Edge Functions

```bash
# Create a new function
supabase functions new function-name

# Serve locally
supabase functions serve

# Deploy
supabase functions deploy function-name
```

## 📦 Shared Dependencies

Place shared code in `_shared/` directory:

```
functions/
├── _shared/
│   ├── supabase.ts      # Shared Supabase client
│   └── utils.ts         # Common utilities
├── generate-routine/
│   └── index.ts
└── analyze-assessment/
    └── index.ts
```

## 📚 Resources

- [Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Deno Documentation](https://deno.land/manual)
