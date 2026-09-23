import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { logoutAndClearSession } from '@/features/auth/services/auth.service';
import { appAlert } from '@/providers';

export function useLogout() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = useCallback(
    async (onBeforeLogout?: () => void) => {
      if (isLoggingOut) {
        return;
      }

      onBeforeLogout?.();
      setIsLoggingOut(true);

      try {
        await logoutAndClearSession();
      } catch {
        appAlert.alert(t('errors.logoutFailed'), t('errors.logoutFailedMessage'));
      } finally {
        setIsLoggingOut(false);
        router.replace('/(auth)/login');
      }
    },
    [isLoggingOut, router, t]
  );

  return { logout, isLoggingOut };
}
