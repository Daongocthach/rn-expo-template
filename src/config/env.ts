import Constants from 'expo-constants';

interface EnvConfig {
  apiBaseUrl: string;
  appEnv: 'development' | 'staging' | 'production';
  isDev: boolean;
  isProd: boolean;
}

function getEnvVar(key: string, fallback = ''): string {
  return process.env[key] ?? (Constants.expoConfig?.extra?.[key] as string | undefined) ?? fallback;
}

function getAppEnv(): EnvConfig['appEnv'] {
  const value = getEnvVar('EXPO_PUBLIC_APP_ENV', 'development');

  if (value === 'development' || value === 'staging' || value === 'production') {
    return value;
  }

  return 'development';
}

export const env: EnvConfig = {
  apiBaseUrl: getEnvVar('EXPO_PUBLIC_API_BASE_URL', 'https://api.example.com'),
  appEnv: getAppEnv(),
  get isDev() {
    return this.appEnv === 'development';
  },
  get isProd() {
    return this.appEnv === 'production';
  },
};

export function validateEnv(): string[] {
  const errors: string[] = [];

  if (!env.apiBaseUrl.trim()) {
    errors.push('Missing environment variable: EXPO_PUBLIC_API_BASE_URL');
  }

  if (!['development', 'staging', 'production'].includes(env.appEnv)) {
    errors.push('EXPO_PUBLIC_APP_ENV must be development, staging, or production');
  }

  return errors;
}
