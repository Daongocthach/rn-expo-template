import { Check, Globe } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { View, ScrollView } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Card, ListItem, ScreenContainer, Text } from '@/common/components';
import { setItem, STORAGE_KEYS } from '@/utils';

const LANGUAGES = [
  { code: 'vi', labelKey: 'language.vietnamese', flag: '🇻🇳' },
  { code: 'en', labelKey: 'language.english', flag: '🇺🇸' },
  { code: 'zh-CN', labelKey: 'language.chinese', flag: '🇨🇳' },
  { code: 'zh-TW', labelKey: 'language.taiwanese', flag: '🇹🇼' },
] as const;

export default function LanguageConfigScreen() {
  const { t, i18n } = useTranslation();
  const { theme } = useUnistyles();

  const handleSelectLanguage = (code: string) => {
    void i18n.changeLanguage(code);
    setItem(STORAGE_KEYS.preferences.language, code);
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.page}>
          <Card variant="filled" style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                <Globe
                  size={24}
                  color={theme.colors.brand.primary}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
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
                    title={`${lang.flag}  ${t(lang.labelKey)}`}
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
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create((theme) => ({
  scrollContent: {
    flexGrow: 1,
  },
  page: {
    flexGrow: 1,
    gap: theme.metrics.spacingV.p20,
    paddingTop: theme.metrics.spacingV.p12,
    paddingBottom: theme.metrics.spacingV.p32,
  },
  card: {
    gap: theme.metrics.spacingV.p20,
    padding: theme.metrics.spacing.p20,
    borderRadius: theme.metrics.borderRadius.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p12,
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
