import { useMutation } from '@tanstack/react-query';
import { Lock, User } from 'lucide-react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import LoginBanner from '../../assets/login-banner.png';
import { AppImage, Button, Input, ScreenContainer, Text } from '@/common/components';
import { login } from '@/features/auth/services/auth.service';
import { useAuthStore } from '@/providers/auth/authStore';
import { APP_NAME, VERSION } from '@/utils';

const loginDraftCache = {
  username: '',
  password: '',
};

export default function LoginScreen() {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
  const [username, setUsername] = useState(loginDraftCache.username);
  const [password, setPassword] = useState(loginDraftCache.password);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      loginDraftCache.username = '';
      loginDraftCache.password = '';
      hydrateAuth(result);
    },
  });

  const handleSubmit = () => {
    loginMutation.mutate({ username, password });
  };

  const handleUsernameChange = (value: string) => {
    loginDraftCache.username = value;
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    loginDraftCache.password = value;
    setPassword(value);
  };

  return (
    <ScreenContainer>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        bottomOffset={theme.metrics.spacing.p32}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.page}>
          <AppImage
            source={LoginBanner}
            style={styles.heroLogo}
            contentFit="contain"
            accessibilityLabel={APP_NAME}
          />

          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text variant="h3" weight="bold" style={styles.formTitle}>
                {t('auth.login.title', { defaultValue: 'Sign In' })}
              </Text>
              <Text variant="body" style={styles.formSubtitle}>
                {t('auth.login.subtitle', { defaultValue: 'Enter your credentials to continue' })}
              </Text>
            </View>

            <View style={styles.formContent}>
              <Input
                label={t('auth.login.usernameLabel', { defaultValue: 'Username' })}
                value={username}
                onChangeText={handleUsernameChange}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="username"
                accessibilityLabel={t('auth.login.usernameLabel', { defaultValue: 'Username' })}
                placeholder={t('auth.login.usernamePlaceholder', {
                  defaultValue: 'Enter username',
                })}
                leftIcon={
                  <User
                    size={20}
                    color={theme.colors.brand.secondaryVariant}
                    strokeWidth={2}
                    absoluteStrokeWidth
                  />
                }
              />

              <Input
                label={t('auth.login.passwordLabel', { defaultValue: 'Password' })}
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                accessibilityLabel={t('auth.login.passwordLabel', { defaultValue: 'Password' })}
                placeholder={t('auth.login.passwordPlaceholder', {
                  defaultValue: 'Enter password',
                })}
                leftIcon={
                  <Lock
                    size={20}
                    color={theme.colors.brand.secondaryVariant}
                    strokeWidth={2}
                    absoluteStrokeWidth
                  />
                }
              />

              <Button
                title={t('auth.login.submit', { defaultValue: 'Sign In' })}
                fullWidth
                loading={loginMutation.isPending}
                disabled={loginMutation.isPending}
                onPress={handleSubmit}
                style={styles.submitButton}
              />
            </View>
          </View>

          <View style={styles.footerSection}>
            <Text variant="caption" color="muted" style={styles.versionText}>
              {`${APP_NAME} v${VERSION}`}
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create((theme) => ({
  scrollContent: {
    flexGrow: 1,
  },
  page: {
    flexGrow: 1,
    paddingTop: theme.metrics.spacingV.p12,
    paddingBottom: theme.metrics.spacingV.p32,
    backgroundColor: theme.colors.background.app,
    gap: theme.metrics.spacingV.p12,
  },
  heroLogo: {
    width: '100%',
    height: 180,
  },
  formCard: {
    borderRadius: theme.metrics.borderRadius.xl,
    padding: theme.metrics.spacing.p24,
    backgroundColor: theme.colors.background.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    gap: theme.metrics.spacingV.p20,
  },
  formHeader: {
    gap: theme.metrics.spacingV.p4,
  },
  formTitle: {
    color: theme.colors.text.primary,
  },
  formSubtitle: {
    color: theme.colors.text.secondary,
  },
  formContent: {
    gap: theme.metrics.spacingV.p16,
  },
  submitButton: {
    marginTop: theme.metrics.spacingV.p8,
  },
  footerSection: {
    alignItems: 'center',
    marginTop: theme.metrics.spacingV.p12,
  },
  versionText: {
    color: theme.colors.text.muted,
  },
}));
