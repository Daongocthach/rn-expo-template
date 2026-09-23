import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getItem, STORAGE_KEYS } from '@/utils/storage';
import en from './locales/en.json';
import vi from './locales/vi.json';
import zhCN from './locales/zh-CN.json';
import zhTW from './locales/zh-TW.json';

const SUPPORTED_LANGUAGES = ['en', 'vi', 'zh-CN', 'zh-TW'] as const;

type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function isSupportedLanguage(language: string): language is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(language as SupportedLanguage);
}

function resolveInitialLanguage(): SupportedLanguage {
  const savedLang = getItem<string>(STORAGE_KEYS.preferences.language);

  if (savedLang.success && savedLang.data && isSupportedLanguage(savedLang.data)) {
    return savedLang.data;
  }

  const deviceLocale = getLocales()[0];
  const languageTag = deviceLocale?.languageTag;
  const languageCode = deviceLocale?.languageCode;

  if (languageTag === 'zh-CN' || languageTag === 'zh-TW') {
    return languageTag;
  }

  if (languageCode === 'vi') {
    return 'vi';
  }

  if (languageCode === 'zh') {
    return 'zh-CN';
  }

  return 'en';
}

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
    };
  }
}

const initialLang = resolveInitialLanguage();

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    en: { translation: en },
    vi: { translation: vi },
    'zh-CN': { translation: zhCN },
    'zh-TW': { translation: zhTW },
  },
  lng: initialLang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
