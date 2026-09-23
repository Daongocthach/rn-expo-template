import { usePathname, useRouter, useSegments, type Href } from 'expo-router';
import {
  ChevronRight,
  CircleUser,
  LogOut,
  type LucideIcon,
  Settings2,
  X,
} from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Avatar } from '../Avatar';
import { BlockingLoadingModal } from '../BlockingLoadingModal/BlockingLoadingModal';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { useLogout } from '@/features/auth/hooks';
import { appAlert } from '@/providers/app-alert';
import { useAuthStore } from '@/providers/auth/authStore';
import { useDrawerStore } from '@/providers/drawer/drawerStore';
import { hs, vs } from '@/theme/metrics';
import { APP_NAME, VERSION } from '@/utils';

export function AppDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const segments = useSegments();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { width: screenWidth } = useWindowDimensions();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isOpen = useDrawerStore((s) => s.isOpen);
  const closeDrawer = useDrawerStore((s) => s.closeDrawer);
  const openDrawer = useDrawerStore((s) => s.openDrawer);
  const user = useAuthStore((s) => s.user);
  const { logout, isLoggingOut } = useLogout();

  const drawerWidth = Math.min(screenWidth * 0.78, hs(300));

  const animValue = useSharedValue(0);

  const lastStateRef = useRef(isOpen);

  useEffect(() => {
    if (isOpen === lastStateRef.current) {
      return;
    }
    lastStateRef.current = isOpen;
    animValue.value = withTiming(isOpen ? 1 : 0, {
      duration: 250,
    });
  }, [isOpen, animValue]);

  const handleNavigate = (route: string) => {
    closeDrawer();
    setTimeout(() => {
      router.push(route as Href);
    }, 150);
  };

  const handleLogout = () => {
    appAlert.alert(t('common.confirm'), t('drawer.logoutConfirmMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.confirm'),
        style: 'destructive',
        onPress: () => void logout(closeDrawer),
      },
    ]);
  };

  const handleGestureSuccess = useCallback(
    (open: boolean) => {
      lastStateRef.current = open;
      if (open) {
        openDrawer();
      } else {
        closeDrawer();
      }
    },
    [openDrawer, closeDrawer]
  );

  const edgeSwipeGesture = useMemo(() => {
    return Gesture.Pan()
      .activeOffsetX([-10, 10])
      .onUpdate((event) => {
        const progress = Math.min(Math.max(-event.translationX / drawerWidth, 0), 1);
        animValue.value = progress;
      })
      .onEnd((event) => {
        if (event.velocityX < -500 || event.translationX < -drawerWidth * 0.3) {
          animValue.value = withTiming(1, { duration: 250 });
          runOnJS(handleGestureSuccess)(true);
        } else {
          animValue.value = withTiming(0, { duration: 200 });
          runOnJS(handleGestureSuccess)(false);
        }
      });
  }, [drawerWidth, animValue, handleGestureSuccess]);

  const panelSwipeGesture = useMemo(() => {
    return Gesture.Pan()
      .activeOffsetX([-10, 10])
      .onUpdate((event) => {
        const progress = Math.min(Math.max(1 - event.translationX / drawerWidth, 0), 1);
        animValue.value = progress;
      })
      .onEnd((event) => {
        if (event.velocityX > 500 || event.translationX > drawerWidth * 0.3) {
          animValue.value = withTiming(0, { duration: 200 });
          runOnJS(handleGestureSuccess)(false);
        } else {
          animValue.value = withTiming(1, { duration: 250 });
          runOnJS(handleGestureSuccess)(true);
        }
      });
  }, [drawerWidth, animValue, handleGestureSuccess]);

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animValue.value, [0, 1], [0, 0.45]),
      pointerEvents: animValue.value > 0 ? 'auto' : 'none',
    };
  });

  const panelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(animValue.value, [0, 1], [drawerWidth, 0]),
        },
      ],
      pointerEvents: animValue.value > 0.1 ? 'auto' : 'none',
    };
  });

  const inAuthGroup = segments[0] === '(auth)';
  const showDrawer = isAuthenticated && !inAuthGroup;

  if (!showDrawer) {
    return null;
  }

  const userName = user?.full_name || user?.username || t('common.technician');
  const userSubtitle = user?.username || 'admin';

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <BlockingLoadingModal
        visible={isLoggingOut}
        message={t('drawer.loggingOut')}
        accessibilityLabel={t('drawer.loggingOut')}
      />

      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeDrawer} />
      </Animated.View>

      {!isOpen && (
        <GestureDetector gesture={edgeSwipeGesture}>
          <Animated.View style={styles.edgeSwipeBar} />
        </GestureDetector>
      )}

      <GestureDetector gesture={panelSwipeGesture}>
        <Animated.View
          style={[
            styles.panel,
            panelStyle,
            {
              width: drawerWidth,
              paddingTop: insets.top + vs(16),
              paddingBottom: insets.bottom + vs(16),
            },
          ]}
        >
          <DrawerContent
            pathname={pathname}
            userName={userName}
            userSubtitle={userSubtitle}
            onClose={closeDrawer}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            isLoggingOut={isLoggingOut}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

interface DrawerContentProps {
  pathname: string;
  userName: string;
  userSubtitle: string;
  onClose: () => void;
  onNavigate: (route: string) => void;
  onLogout: () => void;
  isLoggingOut: boolean;
}

function DrawerContent({
  pathname,
  userName,
  userSubtitle,
  onClose,
  onNavigate,
  onLogout,
  isLoggingOut,
}: DrawerContentProps) {
  const { theme } = useUnistyles();
  const { t } = useTranslation();

  const items = useMemo(
    () =>
      [
        {
          key: 'account',
          title: t('drawer.account'),
          subtitle: t('drawer.accountSubtitle'),
          icon: CircleUser,
          route: '/(main)/account',
          isActive: pathname.includes('/account'),
        },
        {
          key: 'settings',
          title: t('drawer.settings'),
          subtitle: t('drawer.settingsSubtitle'),
          icon: Settings2,
          route: '/(main)/(tabs)/settings',
          isActive: pathname.includes('/settings'),
        },
      ].filter((item): item is DrawerMenuItemData => item !== null),
    [pathname, t]
  );

  return (
    <>
      <View style={styles.header}>
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={t('common.close')}
          style={styles.closeButton}
        >
          <Icon icon={X} variant="primary" size={20} />
        </Pressable>
      </View>

      <View style={styles.profileContainer}>
        <Avatar initials={userName.substring(0, 2).toUpperCase()} size="lg" />
        <View style={styles.profileInfo}>
          <Text variant="body" weight="semibold" numberOfLines={1}>
            {userName}
          </Text>
          <Text variant="caption" color="secondary" numberOfLines={1}>
            {userSubtitle}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.menuItems}>
        {items.map((item) => (
          <DrawerMenuItem
            key={item.key}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
            isActive={item.isActive}
            onPress={item.isActive ? undefined : () => onNavigate(item.route)}
          />
        ))}
      </View>

      <View style={styles.footer}>
        <Button
          title={t('drawer.logout')}
          variant="outline"
          loading={isLoggingOut}
          leftIcon={<LogOut size={16} color={theme.colors.state.error} />}
          onPress={onLogout}
          style={styles.logoutBtn}
          labelStyle={styles.logoutLabel}
        />
        <View style={styles.versionBlock}>
          <Text variant="caption" color="muted" style={styles.versionText}>
            {`${APP_NAME} v${VERSION}`}
          </Text>
        </View>
      </View>
    </>
  );
}

interface DrawerMenuItemData {
  key: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  route: string;
  isActive: boolean;
}

interface DrawerMenuItemProps {
  title: string;
  subtitle: string;
  icon: DrawerMenuItemData['icon'];
  isActive: boolean;
  onPress?: () => void;
}

function DrawerMenuItem({ title, subtitle, icon, isActive, onPress }: DrawerMenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ selected: isActive, disabled: !onPress }}
      style={({ pressed }) => [
        styles.menuItem,
        isActive ? styles.menuItemActive : null,
        pressed && onPress ? styles.menuItemPressed : null,
      ]}
    >
      <View style={styles.menuItemLeft}>
        <Icon icon={icon} variant={isActive ? 'accent' : 'primary'} size={22} />
      </View>
      <View style={styles.menuItemContent}>
        <Text variant="body" weight={isActive ? 'semibold' : 'regular'} numberOfLines={1}>
          {title}
        </Text>
        <Text variant="caption" color="secondary" numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <Icon icon={ChevronRight} variant={isActive ? 'accent' : 'muted'} size={18} />
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    zIndex: theme.colors.mode === 'dark' ? 99 : 50,
  },
  edgeSwipeBar: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: 'transparent',
    zIndex: theme.colors.mode === 'dark' ? 98 : 49,
  },
  panel: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.colors.background.surface,
    zIndex: theme.colors.mode === 'dark' ? 100 : 51,
    borderLeftWidth: 1,
    borderColor: theme.colors.border.subtle,
    shadowColor: '#000000',
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 24,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: theme.metrics.spacing.p16,
    marginBottom: theme.metrics.spacingV.p8,
  },
  closeButton: {
    width: theme.metrics.spacing.p36,
    height: theme.metrics.spacing.p36,
    borderRadius: theme.metrics.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.surfaceAlt,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p12,
    paddingHorizontal: theme.metrics.spacing.p20,
    marginBottom: theme.metrics.spacingV.p16,
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border.subtle,
    marginHorizontal: theme.metrics.spacing.p16,
    marginBottom: theme.metrics.spacingV.p16,
  },
  menuItems: {
    flex: 1,
    paddingHorizontal: theme.metrics.spacing.p8,
    gap: theme.metrics.spacingV.p4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.metrics.spacing.p12,
    paddingHorizontal: theme.metrics.spacing.p12,
    paddingVertical: theme.metrics.spacingV.p12,
    borderRadius: theme.metrics.borderRadius.md,
    backgroundColor: 'transparent',
  },
  menuItemActive: {
    backgroundColor: theme.colors.background.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.brand.primary,
  },
  menuItemPressed: {
    opacity: 0.85,
  },
  menuItemLeft: {
    width: theme.metrics.spacing.p28,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  menuItemContent: {
    flex: 1,
    gap: theme.metrics.spacingV.p4,
  },
  footer: {
    paddingHorizontal: theme.metrics.spacing.p20,
    gap: theme.metrics.spacingV.p12,
    alignItems: 'center',
  },
  logoutBtn: {
    width: '100%',
    borderColor: theme.colors.state.error,
  },
  logoutLabel: {
    color: theme.colors.state.error,
  },
  versionText: {
    fontSize: theme.metrics.fontSize.xxs,
  },
  versionBlock: {
    alignItems: 'center',
    gap: theme.metrics.spacingV.p4,
  },
  versionTimestamp: {
    fontSize: theme.metrics.fontSize.xxs,
    textAlign: 'center',
  },
}));
