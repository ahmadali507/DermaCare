<p align="center">
  <img src="assets/icon.png" alt="DermaCare Logo" width="120" height="120">
</p>

<h1 align="center">🌿 DermaCare</h1>

<p align="center">
  <strong>AI-Powered Holistic Skincare Analysis</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-54.0-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo SDK">
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native">
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
</p>

---

## 📖 Overview

**DermaCare** is a modern, cross-platform mobile application that provides personalized skincare analysis and recommendations using artificial intelligence. Built with React Native and Expo, it delivers a seamless experience across iOS, Android, and Web platforms.

The app guides users through a comprehensive 6-step assessment covering demographics, dietary habits, skin concerns, facial structure, and lifestyle factors. Using this data, DermaCare generates personalized, holistic skincare routines powered by the Gemini AI API.

---

## ✨ Features

### 🔐 Authentication
- **Secure Sign-Up/Login** with email and password
- **OTP Verification** for account security
- **Password Recovery** flow
- Powered by **Supabase Auth**

### 📋 Comprehensive Skin Assessment
A beautifully designed 6-step form with:

| Step | Category | Inputs |
|------|----------|--------|
| 1 | **Demographics** | Age, Gender, Skin Type, Climate, Indoor/Outdoor Time |
| 2 | **Dietary Habits** | Water Intake, Diet Type, Supplements, Allergies |
| 3 | **Skin Concerns** | Symptoms with Severity Sliders |
| 4 | **Facial Structure** | Jawline Type, Chin Shape, Symmetry |
| 5 | **Lifestyle** | Sleep, Exercise, Stress, Skincare Routine, Screen Time |
| 6 | **Photo Upload** | Optional front/side profile photos |

### 🤖 AI-Powered Analysis
- Personalized skincare recommendations via **Supabase Edge Functions**
- Integration with **Gemini 3 Pro API**
- Natural, holistic solutions for skin concerns

### 🎨 Premium UI/UX
- **Modern Design System** with sage green theme
- Custom **SVG icons** for facial structure visualization
- Smooth animations and transitions
- Responsive layouts for all screen sizes

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo SDK 54** | Development and build tooling |
| **TypeScript** | Type-safe development |
| **React Navigation** | Navigation and routing |
| **React Hook Form** | Form state management |
| **Zustand** | Global state management |
| **react-native-svg** | Custom SVG components |

### Backend
| Technology | Purpose |
|------------|---------|
| **Supabase** | Backend-as-a-Service |
| **PostgreSQL** | Database |
| **Supabase Auth** | Authentication |
| **Edge Functions** | Serverless AI integration |
| **Gemini API** | AI-powered analysis |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmadali507/DermaCare.git
   cd dermacare-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**
   ```bash
   npx expo start --clear
   ```

5. **Run on your device**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser
   - Scan QR code with **Expo Go** app

---

## 📁 Project Structure

```
dermacare-app/
├── 📂 assets/                  # Static assets (icons, images)
├── 📂 src/
│   ├── 📂 components/          # Reusable UI components
│   │   ├── 📂 icons/           # Custom SVG icon components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Input.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Slider.tsx
│   ├── 📂 constants/           # Theme, colors, typography
│   │   └── theme.ts
│   ├── 📂 hooks/               # Custom React hooks
│   ├── 📂 navigation/          # React Navigation setup
│   │   ├── MainNavigator.tsx
│   │   └── types.ts
│   ├── 📂 screens/             # Application screens
│   │   ├── 📂 auth/            # Authentication screens
│   │   ├── 📂 form/            # Assessment form steps
│   │   └── 📂 onboarding/      # Onboarding flow
│   ├── 📂 services/            # API and external services
│   │   └── submission.service.ts
│   ├── 📂 store/               # Zustand state stores
│   │   ├── useAuthStore.ts
│   │   └── useFormStore.ts
│   ├── 📂 types/               # TypeScript type definitions
│   │   └── form.types.ts
│   └── 📂 utils/               # Utility functions
├── 📂 supabase/                # Supabase configuration
│   ├── 📂 functions/           # Edge Functions
│   │   └── analyze-skin-data/
│   ├── 📂 migrations/          # Database migrations
│   └── config.toml
├── App.tsx                     # Application entry point
├── app.json                    # Expo configuration
├── package.json
├── supabase-types.ts           # Generated database types
└── tsconfig.json
```

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Mobile App                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Screens   │  │ Components  │  │    State (Zustand)  │ │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ │
│         │                │                     │            │
│         └────────────────┼─────────────────────┘            │
│                          ▼                                  │
│              ┌─────────────────────┐                        │
│              │   Supabase Client   │                        │
│              └──────────┬──────────┘                        │
└─────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase Backend                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │    Auth     │  │  Database   │  │   Edge Functions    │ │
│  │  (Supabase) │  │ (PostgreSQL)│  │   (Gemini API)      │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Assessment** → Form data collected across 6 steps
2. **Form Submission** → Data sent to Supabase
3. **Edge Function Trigger** → Calls Gemini API for analysis
4. **AI Processing** → Generates personalized skincare routine
5. **Results Display** → User receives holistic recommendations

---

## 🎨 Design System

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| 🌿 Sage Green | `#7C9A92` | Primary brand color |
| 🌲 Dark Forest | `#2D4739` | Text, headings |
| 🍃 Muted Sage | `#A8BDB5` | Secondary text |
| 🥛 Cream | `#F8F6F3` | Background |
| ⚪ White | `#FFFFFF` | Cards, inputs |

### Typography

- **Headings**: System San Francisco (iOS) / Roboto (Android)
- **Body**: 15px regular weight
- **Caption**: 13px for secondary info

---

## 🔧 Available Scripts

```bash
# Start development server
npm start

# Start with cache clear
npx expo start --clear

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web

# Generate Supabase types
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > supabase-types.ts

# Deploy Edge Functions
npx supabase functions deploy
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style

- Use **TypeScript** for all new files
- Follow the existing component structure
- Use **Zustand** for state management
- Write descriptive commit messages

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ahmad Ali**

- GitHub: [@ahmadali507](https://github.com/ahmadali507)

---

<p align="center">
  Made with 💚 for healthier skin
</p>
