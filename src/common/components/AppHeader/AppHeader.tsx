import { usePathname, useRouter, useSegments } from 'expo-router';
import { ChevronLeft, Languages, Menu as MenuIcon } from 'lucide-react-native';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '@/common/components/Icon';
import { Text } from '@/common/components/Text';
import { useScreenDimensions } from '@/hooks/useScreenDimensions';
import { useAuthStore } from '@/providers/auth/authStore';
import { useAppBottomSheet } from '@/providers/bottom-sheet';
import { useDrawerStore } from '@/providers/drawer/drawerStore';
import { APP_NAME } from '@/utils';
import { LanguageSelectSheet } from './LanguageSelectSheet';

export function AppHeader() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const segments = useSegments();
  const { isTablet } = useScreenDimensions();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const openDrawer = useDrawerStore((state) => state.openDrawer);
  const { openSheet, closeSheet } = useAppBottomSheet();

  const isIndexRoute = pathname === '/' || pathname === '/index';
  const inAuthGroup = segments[0] === '(auth)';

  const pageTitle = useMemo((): string => {
    if (isIndexRoute) {
      return APP_NAME;
    }
    if (pathname === '/account') {
      return t('drawer.account', { defaultValue: 'Account' });
    }
    if (pathname.includes('/settings')) {
      return t('settings.title', { defaultValue: 'Settings' });
    }
    if (pathname === '/language-config') {
      return t('language.selectTitle', { defaultValue: 'Language' });
    }

    const lastSegment = pathname.split('/').filter(Boolean).pop();
    if (lastSegment) {
      return lastSegment
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    return APP_NAME;
  }, [isIndexRoute, pathname, t]);

  const handleBackPress = () => {
    router.back();
  };

  const handleLanguagePress = () => {
    openSheet(<LanguageSelectSheet onClose={closeSheet} />, {
      enableDynamicSizing: true,
      showCloseButton: true,
    });
  };

  const showActions = isAuthenticated && !inAuthGroup;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, isTablet && styles.containerTablet]}>
        {isIndexRoute || inAuthGroup ? (
          <View style={styles.brandWrap}>
            <Text variant="h2" weight="bold" style={styles.brandNameText}>
              {APP_NAME}
            </Text>
          </View>
        ) : (
          <View style={styles.headerContentRow}>
            <Pressable
              onPress={handleBackPress}
              accessibilityRole="button"
              accessibilityLabel={t('header.back', { defaultValue: 'Back' })}
              style={styles.backButtonWrap}
            >
              <Icon icon={ChevronLeft} variant="primary" size={18} />
            </Pressable>
            <Text
              variant="h3"
              weight="semibold"
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.title}
            >
              {pageTitle}
            </Text>
          </View>
        )}

        {showActions ? (
          <View style={styles.actionsWrap}>
            <Pressable
              onPress={handleLanguagePress}
              accessibilityRole="button"
              accessibilityLabel={t('language.selectTitle', { defaultValue: 'Language' })}
              style={styles.actionCircle}
            >
              <Icon icon={Languages} variant="primary" size={20} />
            </Pressable>

            <Pressable
              onPress={openDrawer}
              accessibilityRole="button"
              accessibilityLabel={t('header.menu', { defaultValue: 'Menu' })}
              style={styles.actionCircle}
            >
              <Icon icon={MenuIcon} variant="primary" size={20} />
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.background.app,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.subtle,
    zIndex: 50,
  },
  container: {
    height: theme.metrics.spacingV.p64,
    paddingHorizontal: theme.metrics.spacing.p16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.metrics.spacing.p12,
  },
  containerTablet: {
    maxWidth: 960,
  },
  brandWrap: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p8,
    minWidth: 0,
  },
  headerContentRow: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p8,
    minWidth: 0,
  },
  title: {
    flex: 1,
    flexShrink: 1,
  },
  backButtonWrap: {
    width: theme.metrics.spacing.p40,
    height: theme.metrics.spacing.p40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border.default,
    borderRadius: theme.metrics.borderRadius.full,
    backgroundColor: theme.colors.background.surface,
  },
  brandNameText: {
    color: theme.colors.text.primary,
  },
  actionsWrap: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p8,
  },
  actionCircle: {
    width: theme.metrics.spacing.p40,
    height: theme.metrics.spacing.p40,
    borderRadius: theme.metrics.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.surface,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
  },
}));
