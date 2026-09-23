# React Native Expo Starter Template

Production-ready, clean, and scalable React Native starter template built with Expo SDK 55 and Expo Router.

## Tech Stack

- **Framework**: Expo SDK 55, React Native 0.83.10, React 19.2
- **Routing**: Expo Router (typed routes, protected stacks, tab navigation)
- **Styling**: `react-native-unistyles` 3.x (dynamic light/dark mode, responsive metrics)
- **Server State**: `@tanstack/react-query` 5 with MMKV persistence
- **Client State**: `zustand` 5
- **Networking**: Axios client with JWT refresh interceptors
- **Internationalization**: `react-i18next` (English, Vietnamese, Simplified Chinese, Traditional Chinese)
- **Local Storage**: `react-native-mmkv` 4
- **Forms & Validation**: `react-hook-form` + `zod`
- **Quality & Tooling**: TypeScript strict, ESLint 9, Prettier, Jest, Husky & Commitlint

## Project Structure

```text
app/
├── (auth)/
│   ├── _layout.tsx
│   └── login.tsx
├── (main)/
│   ├── _layout.tsx
│   ├── account.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx          # Home / Dashboard
│       └── settings/          # Settings & App version
├── _layout.tsx                # Root layout (Theming, Providers, Toast)
├── language-config.tsx        # In-app language switcher
└── +not-found.tsx

src/
├── common/components/         # 40+ shared reusable UI components
├── config/                    # Environment variables (env.ts)
├── features/
│   └── auth/                  # Authentication store, services, types
├── hooks/                     # Custom hooks (network, dimensions, debouncing...)
├── i18n/                      # Multi-language configuration and locales
├── providers/                 # QueryProvider, AuthStore, BottomSheetProvider, AlertProvider
├── services/api/              # Authenticated & public Axios clients
├── theme/                     # Unistyles themes (light, dark, metrics, typography)
└── utils/                     # Storage helpers, formatters, utilities
```

## Getting Started

### 1. Install dependencies
```bash
yarn install
```

### 2. Configure environment
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Run the application
```bash
yarn start
# or run on devices:
yarn android
yarn ios
```

## Available Scripts

| Script | Description |
| --- | --- |
| `yarn start` | Start the Expo development server |
| `yarn android` | Run on Android emulator or connected device |
| `yarn ios` | Run on iOS simulator or connected device |
| `yarn type-check` | Run TypeScript compiler type checking |
| `yarn lint` | Run ESLint flat config |
| `yarn format` | Format files with Prettier |
| `yarn validate` | Run type-check, lint, format check, and i18n validation |
| `yarn test` | Run Jest unit tests |
| `yarn i18n:check` | Verify key parity across all locale files |
