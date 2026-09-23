import { useRouter } from 'expo-router';
import { ChevronRight, Globe, Info, LogOut, Moon } from 'lucide-react-native';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Avatar, Button, Card, ListItem, ScreenContainer, Switch, Text } from '@/common/components';
import { useLogout } from '@/features/auth/hooks';
import { appAlert, useAuthStore } from '@/providers';
import { setThemeMode } from '@/theme/themeManager';
import { VERSION } from '@/utils';

export default function SettingsScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { theme } = useUnistyles();
  const user = useAuthStore((state) => state.user);
  const { logout, isLoggingOut } = useLogout();
  const isDarkMode = theme.colors.mode === 'dark';
  const userName = user?.full_name || user?.username || t('common.technician');
  const userSubtitle = user?.username || 'user';
  const userInitials = userName.substring(0, 2).toUpperCase();

  const currentLanguageLabel = useMemo(() => {
    switch (i18n.language) {
      case 'vi':
        return t('language.vietnamese');
      case 'zh-CN':
        return t('language.chinese');
      case 'zh-TW':
        return t('language.taiwanese');
      case 'en':
      default:
        return t('language.english');
    }
  }, [i18n.language, t]);

  const handleLogout = () => {
    appAlert.alert(t('common.confirm'), t('drawer.logoutConfirmMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.confirm'),
        style: 'destructive',
        onPress: () => void logout(),
      },
    ]);
  };

  return (
    <ScreenContainer tabBarAware scrollable>
      <View style={styles.screen}>
        <Card
          variant="elevated"
          style={styles.profileCard}
          pressable
          onPress={() => router.push('/account')}
        >
          <View style={styles.profileRow}>
            <Avatar initials={userInitials} size="xl" accessibilityLabel={userName} />
            <View style={styles.profileInfo}>
              <Text variant="h2">{userName}</Text>
              <Text variant="bodySmall" color="secondary">
                {userSubtitle}
              </Text>
            </View>
          </View>
        </Card>

        <View style={styles.sectionBlock}>
          <Text variant="overline" color="secondary">
            {t('settings.sections.utilities')}
          </Text>
          <Card variant="filled" style={styles.sectionCard}>
            <ListItem
              title={t('settings.darkMode')}
              divider
              left={
                <Moon
                  size={22}
                  color={theme.colors.icon.primary}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={
                <Switch
                  value={isDarkMode}
                  onValueChange={(value) => setThemeMode(value ? 'dark' : 'light')}
                />
              }
            />
            <ListItem
              title={t('language.label')}
              subtitle={currentLanguageLabel}
              onPress={() => router.push('/language-config')}
              left={
                <Globe
                  size={22}
                  color={theme.colors.icon.primary}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={
                <ChevronRight
                  size={18}
                  color={theme.colors.icon.muted}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
            />
          </Card>
        </View>

        <View style={styles.sectionBlock}>
          <Text variant="overline" color="secondary">
            {t('settings.sections.support')}
          </Text>
          <Card variant="filled" style={styles.sectionCard}>
            <ListItem
              title={t('settings.version')}
              subtitle={t('settings.support.versionSubtitle')}
              onPress={() => router.push('/(main)/(tabs)/settings/versions' as never)}
              left={
                <Info
                  size={22}
                  color={theme.colors.icon.primary}
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              }
              right={
                <Text variant="bodySmall" color="secondary">
                  {VERSION}
                </Text>
              }
            />
          </Card>
        </View>

        <Card variant="filled" style={styles.logoutCard}>
          <ListItem
            title={t('settings.danger.logout')}
            subtitle={t('settings.danger.logoutSubtitle')}
            left={
              <LogOut
                size={22}
                color={theme.colors.state.error}
                strokeWidth={2}
                absoluteStrokeWidth
              />
            }
          />
          <Button
            title={t('settings.danger.logout')}
            variant="outline"
            loading={isLoggingOut}
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        </Card>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create((theme) => ({
  screen: {
    gap: theme.metrics.spacingV.p20,
    paddingTop: theme.metrics.spacingV.p12,
  },
  profileCard: {
    gap: theme.metrics.spacingV.p16,
    padding: theme.metrics.spacing.p20,
    borderRadius: theme.metrics.borderRadius.xl,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p12,
  },
  profileInfo: {
    flex: 1,
    gap: theme.metrics.spacingV.p4,
  },
  sectionBlock: {
    gap: theme.metrics.spacingV.p12,
  },
  sectionCard: {
    borderRadius: theme.metrics.borderRadius.xl,
    overflow: 'hidden',
  },
  logoutCard: {
    gap: theme.metrics.spacingV.p12,
    padding: theme.metrics.spacing.p16,
    borderRadius: theme.metrics.borderRadius.xl,
  },
  logoutButton: {
    marginTop: theme.metrics.spacingV.p4,
  },
}));
