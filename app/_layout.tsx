import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast, { BaseToast, type ToastConfig } from 'react-native-toast-message';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import InterBold from '../assets/fonts/Inter-Bold.ttf';
import InterMedium from '../assets/fonts/Inter-Medium.ttf';
import InterRegular from '../assets/fonts/Inter-Regular.ttf';
import InterSemiBold from '../assets/fonts/Inter-SemiBold.ttf';
import { AppDrawer, AppHeader, AppSwipeBack } from '@/common/components';
import { ErrorBoundary } from '@/common/components/ErrorBoundary';
import { useProtectedRoute } from '@/hooks';
import { AppAlertProvider, AppBottomSheetProvider, QueryProvider } from '@/providers';
import { useAuthStore } from '@/providers/auth/authStore';
import { getCurrentMode } from '@/theme/themeManager';

SplashScreen.preventAutoHideAsync();

function useAuthInit() {
  const initialize = useAuthStore((s) => s.initialize);
  const cleanup = useAuthStore((s) => s.cleanup);

  useEffect(() => {
    initialize();
    return () => cleanup();
  }, [initialize, cleanup]);
}

function RootNavigator() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="language-config" />
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
    </Stack>
  );
}

function AppContent() {
  const isLoading = useAuthStore((s) => s.isLoading);
  const { theme } = useUnistyles();
  const toastConfig = useMemo<ToastConfig>(
    () => ({
      warning: (props) => (
        <BaseToast
          {...props}
          style={[
            styles.warningToast,
            {
              borderLeftColor: theme.colors.state.warning,
              backgroundColor: theme.colors.background.surface,
            },
          ]}
          contentContainerStyle={styles.warningToastContent}
          text1Style={[
            styles.warningToastTitle,
            {
              color: theme.colors.text.primary,
            },
          ]}
          text2Style={[
            styles.warningToastMessage,
            {
              color: theme.colors.text.secondary,
            },
          ]}
          text1NumberOfLines={1}
          text2NumberOfLines={2}
        />
      ),
    }),
    [theme]
  );

  useAuthInit();
  useProtectedRoute();

  const currentMode = getCurrentMode();
  const systemBarStyle = currentMode === 'dark' ? 'light' : 'dark';

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.appContainer}>
      <SystemBars style={systemBarStyle} />
      <AppHeader />
      <RootNavigator />
      <AppDrawer />
      <AppSwipeBack />
      <Toast config={toastConfig} />
    </View>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': InterRegular,
    'Inter-Medium': InterMedium,
    'Inter-SemiBold': InterSemiBold,
    'Inter-Bold': InterBold,
  });

  const isLoading = useAuthStore((s) => s.isLoading);

  useEffect(() => {
    if (!(fontsLoaded || fontError) || isLoading) {
      return;
    }

    void SplashScreen.hideAsync();
  }, [fontsLoaded, fontError, isLoading]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <ErrorBoundary>
        <KeyboardProvider>
          <QueryProvider>
            <AppAlertProvider>
              <AppBottomSheetProvider>
                <AppContent />
              </AppBottomSheetProvider>
            </AppAlertProvider>
          </QueryProvider>
        </KeyboardProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create((theme) => ({
  rootView: {
    flex: 1,
    backgroundColor: theme.colors.background.app,
  },
  appContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.app,
  },
  warningToast: {
    borderLeftWidth: 6,
    borderRadius: theme.metrics.borderRadius.md,
    minHeight: theme.metrics.spacingV.p72,
  },
  warningToastContent: {
    paddingHorizontal: theme.metrics.spacing.p16,
  },
  warningToastTitle: {
    fontSize: theme.fonts.size.md,
    fontFamily: theme.fonts.semiBold,
  },
  warningToastMessage: {
    fontSize: theme.fonts.size.sm,
    fontFamily: theme.fonts.regular,
  },
}));
