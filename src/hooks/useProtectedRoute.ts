import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '@/providers/auth/authStore';

export function useProtectedRoute() {
  const session = useAuthStore((s) => s.session);
  const isLoading = useAuthStore((s) => s.isLoading);
  const segments = useSegments();
  const router = useRouter();
  const hasSession = Boolean(session?.access_token?.trim());

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inLanguageConfig = segments[0] === 'language-config';

    if (!hasSession && !inAuthGroup && !inLanguageConfig) {
      router.replace('/(auth)/login');
    } else if (hasSession && inAuthGroup) {
      router.replace('/(main)/(tabs)');
    }
  }, [hasSession, isLoading, segments, router]);
}
