import type { ExpoConfig } from '@expo/config-types';
import 'tsx/cjs';
import { APP_NAME, APP_SLUG, VERSION, RUNTIME_VERSION } from './src/utils/app-version';

function getEnvVar(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}

const config: ExpoConfig = {
  name: APP_NAME,
  slug: APP_SLUG,
  version: VERSION,
  orientation: 'portrait',
  scheme: APP_SLUG,
  userInterfaceStyle: 'automatic',
  runtimeVersion: RUNTIME_VERSION,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.rnexpotemplate.app',
    icon: {
      light: './assets/ios-icon.png',
    },
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
      CFBundleLocalizations: ['en', 'vi', 'zh-CN', 'zh-TW'],
      ITSAppUsesNonExemptEncryption: false,
    },
    buildNumber: '1',
  },
  android: {
    versionCode: 1,
    softwareKeyboardLayoutMode: 'resize',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
    package: 'com.rnexpotemplate.app',
  },
  extra: {
    router: {},
    eas: {
      projectId: '',
    },
    EXPO_PUBLIC_API_BASE_URL: getEnvVar('EXPO_PUBLIC_API_BASE_URL'),
    EXPO_PUBLIC_APP_ENV: getEnvVar('EXPO_PUBLIC_APP_ENV', 'development'),
  },
  plugins: [
    [
      'expo-localization',
      {
        supportedLocales: {
          ios: ['en', 'vi', 'zh-CN', 'zh-TW'],
          android: ['en', 'vi', 'zh-CN', 'zh-TW'],
        },
      },
    ],
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon-light.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#FFFFFF',
        dark: {
          image: './assets/splash-icon-dark.png',
          backgroundColor: '#020617',
        },
      },
    ],
    'expo-font',
    'expo-image',
    'expo-system-ui',
    [
      'expo-build-properties',
      {
        android: {
          compileSdkVersion: 36,
          targetSdkVersion: 36,
          minSdkVersion: 24,
        },
        ios: {
          deploymentTarget: '15.1',
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: false,
  },
};

export default config;
