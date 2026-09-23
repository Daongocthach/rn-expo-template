import { Check, Globe } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { ListItem } from '@/common/components/ListItem';
import { Text } from '@/common/components/Text';
import { setItem, STORAGE_KEYS } from '@/utils';

const LANGUAGES = [
  { code: 'vi', labelKey: 'language.vietnamese' },
  { code: 'en', labelKey: 'language.english' },
  { code: 'zh-CN', labelKey: 'language.chinese' },
  { code: 'zh-TW', labelKey: 'language.taiwanese' },
] as const;

interface LanguageSelectSheetProps {
  onClose: () => void;
}

export function LanguageSelectSheet({ onClose }: LanguageSelectSheetProps) {
  const { t, i18n } = useTranslation();
  const { theme } = useUnistyles();

  const handleSelectLanguage = (code: string) => {
    void i18n.changeLanguage(code);
    setItem(STORAGE_KEYS.preferences.language, code);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Globe size={24} color={theme.colors.brand.primary} strokeWidth={2} absoluteStrokeWidth />
        </View>
        <View style={styles.titleTextWrap}>
          <Text variant="h3" weight="semibold">
            {t('language.selectTitle')}
          </Text>
          <Text variant="bodySmall" color="secondary" style={styles.subtitle}>
            {t('language.subtitle')}
          </Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        {LANGUAGES.map((lang, index) => {
          const isSelected = i18n.language === lang.code;
          return (
            <ListItem
              key={lang.code}
              title={t(lang.labelKey)}
              divider={index < LANGUAGES.length - 1}
              onPress={() => handleSelectLanguage(lang.code)}
              right={
                isSelected ? (
                  <Check
                    size={20}
                    color={theme.colors.brand.primary}
                    strokeWidth={2.5}
                    absoluteStrokeWidth
                  />
                ) : null
              }
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    padding: theme.metrics.spacing.p16,
    gap: theme.metrics.spacingV.p16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p12,
    marginBottom: theme.metrics.spacingV.p8,
  },
  iconContainer: {
    width: theme.metrics.spacing.p44,
    height: theme.metrics.spacing.p44,
    borderRadius: theme.metrics.borderRadius.lg,
    backgroundColor: theme.colors.background.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleTextWrap: {
    flex: 1,
    gap: theme.metrics.spacingV.p4,
  },
  subtitle: {
    lineHeight: 20,
  },
  listContainer: {
    borderRadius: theme.metrics.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: theme.colors.background.surfaceAlt,
  },
}));
