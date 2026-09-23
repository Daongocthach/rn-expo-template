import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import type { TFunction } from 'i18next';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { appAlert } from '@/providers/app-alert';
import { ApiError } from '@/services/api';
import { mmkvPersister } from './mmkvPersister';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const { t } = useTranslation();

  const handleError = useCallback(
    (error: Error) => {
      const errorMessage = formatErrorMessage(error, t);
      appAlert.alert(t('errors.title'), errorMessage);
    },
    [t]
  );

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 60 * 24,
            retry: (failureCount, error: unknown) => {
              if (
                error instanceof ApiError &&
                error.status &&
                error.status >= 400 &&
                error.status < 500
              ) {
                return false;
              }
              return failureCount < 2;
            },
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: (failureCount, error: unknown) => {
              if (
                error instanceof ApiError &&
                error.status &&
                error.status >= 400 &&
                error.status < 500
              ) {
                return false;
              }
              return failureCount < 1;
            },
          },
        },
        queryCache: new QueryCache({
          onError: handleError,
        }),
        mutationCache: new MutationCache({
          onError: handleError,
        }),
      }),
    [handleError]
  );

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: mmkvPersister }}>
      {children}
    </PersistQueryClientProvider>
  );
}

function formatErrorMessage(error: Error, t: TFunction) {
  if (error instanceof ApiError && error.code !== undefined && error.code !== null) {
    return `${error.message || t('errors.generic')}\n${t('errors.codeLabel')}: ${error.code}`;
  }

  return error.message || t('errors.generic');
}
