export const STORAGE_KEYS = {
  preferences: {
    theme: 'user_theme_preference',
    themePreset: 'user_theme_preset',
    language: 'user_language',
    apiBaseUrl: 'user_api_base_url',
    onboardingCompleted: 'onboarding_completed',
  },
  auth: {
    session: 'auth_session',
    user: 'auth_user',
  },
  app: {
    lastVersion: 'app_last_version',
    launchCount: 'app_launch_count',
  },
} as const;
