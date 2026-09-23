# AI implementation guide

Use this as a short cookbook after reading `AGENTS.md`. Nearby code in the target feature remains the best example.

## Find the right layer

- Route composition/navigation: `app/`
- Domain UI, hooks, schemas, services, and types: `src/features/<feature>/`
- Reusable UI: `src/common/components/`
- Cross-feature providers/hooks: `src/providers/`, `src/hooks/`
- HTTP infrastructure: `src/services/api/`
- Tokens and responsive metrics: `src/theme/`
- Translation resources: `src/i18n/locales/`
- Storage and general helpers: `src/utils/`

Current feature roots are `auth`, `bonus`, `checklists`, `cnc`, `cnc-7075`, `coating-warehouse`, `company`, `customers`, `dashboard`, `department`, `devices`, `dewax`, `factory-map`, `floors`, `foundry`, `foundry-old`, `gas`, `insulation-wrapping`, `layout`, `molds`, `pallet`, `repair-machines`, and `tools`.

## Feature shape

Only create folders the feature needs:

```text
src/features/<feature>/
├── components/
├── constants/
├── hooks/
├── schemas/
├── services/
├── stores/
├── types/
├── utils/
└── index.ts
```

Use PascalCase for components, `useX.ts` for hooks, and semantic kebab-case domain files such as `foundry.service.ts`, `foundry.types.ts`, `foundry.schema.ts`, and `foundry.keys.ts`.

## Typed service

Choose the same exported client as neighboring services. The app exports the main `api`/`publicAxios` clients plus module clients such as `cncApi`, `foundryApi`, `moldApi`, and `toolsApi`.

```typescript
import { cleanParams, foundryApi } from '@/services/api';
import type { ListResponse } from '@/types/api';
import type { FoundryRecord, FoundrySearchParams } from '../types';

export async function getFoundryRecords(params: FoundrySearchParams) {
  const { data } = await foundryApi.get<ListResponse<FoundryRecord[]>>('/records', {
    params: cleanParams(params as Record<string, unknown>),
  });
  return data;
}
```

Always specify the response generic and return unwrapped data. Let TypeScript infer the async return type.

## Query hook

```typescript
import { useQuery } from '@tanstack/react-query';
import { getFoundryRecords } from '../services';
import type { FoundrySearchParams } from '../types';

export const foundryKeys = {
  all: ['foundry'] as const,
  list: (params: FoundrySearchParams) => [...foundryKeys.all, 'list', params] as const,
};

export function useFoundryRecords(params: FoundrySearchParams) {
  return useQuery({
    queryKey: foundryKeys.list(params),
    queryFn: () => getFoundryRecords(params),
  });
}
```

For pagination, follow an existing `useInfiniteQuery` hook and expose flattened items plus `fetchNextPage`, `hasNextPage`, `isFetchingNextPage`, refresh state, and pagination metadata.

## Component/style pattern

```tsx
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';
import { ScreenContainer, Text } from '@/common/components';

export function ExamplePanel() {
  const { t } = useTranslation();

  return (
    <ScreenContainer>
      <View style={styles.panel}>
        <Text variant="h2">{t('example.title')}</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create((theme) => ({
  panel: {
    padding: theme.metrics.spacing.p16,
    borderRadius: theme.metrics.borderRadius.md,
    backgroundColor: theme.colors.background.surface,
  },
}));
```

Use shared UI before adding primitives. Keep visible text in all four locales. Do not hardcode colors or use React Native's `StyleSheet`.

## State, auth, storage, and native APIs

- React Query: backend state and mutations
- Local React state: component-only UI state
- Zustand selectors: shared client state
- `useAuthStore`: the only auth store
- `src/utils/storage`: persistent storage helpers
- Camera/NFC/BLE: use the established providers and hooks

## Verification checklist

1. Inspect `git diff`; keep unrelated changes intact.
2. Update all locale files for visible text.
3. Run focused Jest tests for changed behavior.
4. Run `yarn validate`.
5. For shared or broad changes, run `yarn test`.
6. Report exact commands and any pre-existing failure.

Version constants are in `src/utils/app-version.ts`. Release, OTA, APK, commit, push, and deployment actions require an explicit request. For Git operations, follow `docs/AI-GIT-WORKFLOW.md`.
