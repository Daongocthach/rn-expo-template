import { Code, Layers, Palette, Sparkles } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ScrollView } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { AppRefreshControl, Badge, Card, Icon, ScreenContainer, Text } from '@/common/components';
import { useAuthStore } from '@/providers/auth/authStore';

export default function DashboardScreen() {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const user = useAuthStore((s) => s.user);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  }, []);

  const userName = user?.full_name || user?.username || 'Developer';

  return (
    <ScreenContainer tabBarAware>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<AppRefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
      >
        <View style={styles.headerSection}>
          <Badge variant="subtle" size="sm">
            <Text variant="caption" weight="medium" color="accent">
              {'Expo SDK 57 + React Native 0.86'}
            </Text>
          </Badge>
          <Text variant="h1" weight="bold">
            {`${t('home.welcome')}, ${userName}!`}
          </Text>
          <Text variant="body" color="secondary">
            {t('home.subtitle')}
          </Text>
        </View>

        <View style={styles.cardGrid}>
          <Card variant="filled" style={styles.featureCard}>
            <View style={styles.cardHeader}>
              <View
                style={[styles.iconCircle, { backgroundColor: theme.colors.background.surfaceAlt }]}
              >
                <Icon icon={Layers} variant="primary" size={24} />
              </View>
              <Badge variant="solid" size="sm">
                <Text variant="caption" weight="medium" color="onBrand">
                  {t('home.features.active')}
                </Text>
              </Badge>
            </View>
            <Text variant="h3" weight="semibold">
              {t('home.features.expoRouter')}
            </Text>
            <Text variant="bodySmall" color="secondary">
              {t('home.features.expoRouterDesc')}
            </Text>
          </Card>

          <Card variant="filled" style={styles.featureCard}>
            <View style={styles.cardHeader}>
              <View
                style={[styles.iconCircle, { backgroundColor: theme.colors.background.surfaceAlt }]}
              >
                <Icon icon={Palette} variant="primary" size={24} />
              </View>
              <Badge variant="subtle" size="sm">
                <Text variant="caption" weight="medium" color="accent">
                  {theme.colors.mode === 'dark' ? 'Dark' : 'Light'}
                </Text>
              </Badge>
            </View>
            <Text variant="h3" weight="semibold">
              {t('home.features.unistyles')}
            </Text>
            <Text variant="bodySmall" color="secondary">
              {t('home.features.unistylesDesc')}
            </Text>
          </Card>

          <Card variant="filled" style={styles.featureCard}>
            <View style={styles.cardHeader}>
              <View
                style={[styles.iconCircle, { backgroundColor: theme.colors.background.surfaceAlt }]}
              >
                <Icon icon={Code} variant="primary" size={24} />
              </View>
              <Badge variant="subtle" size="sm">
                <Text variant="caption" weight="medium" color="accent">
                  {'TanStack'}
                </Text>
              </Badge>
            </View>
            <Text variant="h3" weight="semibold">
              {t('home.features.state')}
            </Text>
            <Text variant="bodySmall" color="secondary">
              {t('home.features.stateDesc')}
            </Text>
          </Card>

          <Card variant="filled" style={styles.featureCard}>
            <View style={styles.cardHeader}>
              <View
                style={[styles.iconCircle, { backgroundColor: theme.colors.background.surfaceAlt }]}
              >
                <Icon icon={Sparkles} variant="primary" size={24} />
              </View>
              <Badge variant="subtle" size="sm">
                <Text variant="caption" weight="medium" color="accent">
                  {t('home.features.designSystem')}
                </Text>
              </Badge>
            </View>
            <Text variant="h3" weight="semibold">
              {t('home.features.ui')}
            </Text>
            <Text variant="bodySmall" color="secondary">
              {t('home.features.uiDesc')}
            </Text>
          </Card>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create((theme) => ({
  scrollContent: {
    paddingVertical: theme.metrics.spacingV.p16,
    gap: theme.metrics.spacingV.p20,
  },
  headerSection: {
    gap: theme.metrics.spacingV.p8,
    alignItems: 'flex-start',
  },
  cardGrid: {
    gap: theme.metrics.spacingV.p12,
  },
  featureCard: {
    padding: theme.metrics.spacing.p16,
    borderRadius: theme.metrics.borderRadius.lg,
    gap: theme.metrics.spacingV.p8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.metrics.spacingV.p4,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
