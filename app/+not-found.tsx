import { Link, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from '@/common/components';

export default function NotFoundScreen() {
  const { t } = useTranslation();

  return (
    <>
      <Stack.Screen options={{ title: t('notFound.title') }} />
      <View style={styles.container}>
        <Text variant="h2" style={styles.title}>
          {t('notFound.message')}
        </Text>
        <Link href="/" style={styles.link}>
          <Text variant="label" style={styles.linkText}>
            {t('notFound.goHome')}
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.metrics.spacing.p20,
    backgroundColor: theme.colors.background.app,
  },
  title: {
    color: theme.colors.text.primary,
  },
  link: {
    marginTop: theme.metrics.spacingV.p16,
    paddingVertical: theme.metrics.spacingV.p16,
  },
  linkText: {
    color: theme.colors.text.link,
  },
}));
