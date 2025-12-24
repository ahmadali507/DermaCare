# Supabase Project Structure - DermaCare App

Professional Supabase setup for the holistic skin-health application.

## 📁 Directory Structure

```
supabase/
├── functions/           # Edge Functions (Serverless functions)
├── migrations/          # Database migrations
│   └── 20250124000001_initial_schema.sql
├── scripts/            # Utility scripts
│   ├── generate-types.sh
│   └── generate-types.bat
└── supabase.ts         # Supabase client configuration
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js
```

### 2. Environment Variables

Create a `.env.local` file in your project root:

```env
# For Next.js/Web
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# For React Native/Expo
EXPO_PUBLIC_SUPABASE_URL=your-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Migration

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Navigate to **SQL Editor**
3. Copy the contents of `migrations/20250124000001_initial_schema.sql`
4. Paste and run the migration

### 4. Usage in Your App

```typescript
import { supabase } from './supabase/supabase';

// Example: Fetch user profile
const { data: profile, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single();

// Example: Create skin assessment
const { data, error } = await supabase
  .from('skin_assessments')
  .insert({
    user_id: userId,
    step_1_data: { skin_type: 'combination', concerns: ['acne', 'dryness'] },
    // ... other step data
  });
```

## 📊 Database Schema

### Tables

- **profiles** - User metadata and preferences
- **skin_assessments** - 6-step assessment form data (JSONB)
- **curated_plans** - Pre-made tracks (Jawline, Double Chin, De-bloat)
- **daily_routines** - AI-generated personalized plans
- **progress_logs** - Daily task completion and wellness tracking

### Views

- **user_progress_summary_7days** - Dashboard analytics (completion rates, mood, skin feeling)
- **active_routines_with_assessment** - Active routines with assessment details

### Security

- Row Level Security (RLS) enabled on all tables
- Users can only access their own data
- Curated plans are read-only for authenticated users

## 🔧 Generating TypeScript Types

### Option 1: Using Supabase CLI (Recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Generate types (Windows)
cd supabase/scripts
generate-types.bat

# Generate types (Mac/Linux)
cd supabase/scripts
./generate-types.sh
```

### Option 2: Manual (Already Provided)

The `supabase-types.ts` file at the root contains pre-generated types. Update it manually when schema changes.

## 📦 Edge Functions (Coming Soon)

Edge functions will be placed in `supabase/functions/`:

```
supabase/functions/
├── generate-routine/        # AI routine generation
├── analyze-assessment/      # Assessment analysis
└── send-reminder/          # Daily reminders
```

## 🔐 Row Level Security Policies

All tables have RLS enabled:

- ✅ Users can only read/write their own data
- ✅ Profiles linked to `auth.users`
- ✅ Curated plans are publicly readable (authenticated users)
- ✅ All operations scoped by `user_id`

## 📝 Migration Naming Convention

```
YYYYMMDDHHMMSS_description.sql
```

Example: `20250124000001_initial_schema.sql`

## 🧪 Testing

```typescript
import { supabase, isAuthenticated } from './supabase/supabase';

// Check authentication
const authenticated = await isAuthenticated();

// Get current user
const currentUser = await getCurrentUser();
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Edge Functions](https://supabase.com/docs/guides/functions)

## 🛠️ Local Development (Optional)

Install Supabase CLI for local development:

```bash
# Start local Supabase
supabase start

# Stop local Supabase
supabase stop

# Reset database
supabase db reset
```

## 📞 Support

For issues or questions, refer to the [Supabase Community](https://github.com/supabase/supabase/discussions).
