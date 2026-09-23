# AGENTS.md — Finepro Tools

Instructions for AI coding agents working in this repository. This file describes the current source tree; verify nearby code before copying a pattern because feature modules integrate different backend systems.

## Product and stack

Finepro Tools is an internal manufacturing-operations mobile app. The dashboard launches modules for equipment checklists, CNC and dimensional inspection, foundry, molds, repairs, factory maps, coating warehouse, dewax, gas, insulation wrapping, pallets, tools, and employee bonuses.

- Expo SDK 55, React Native 0.83.10, React 19.2
- Expo Router with typed routes and protected stacks
- TypeScript 5.9 strict; React Native Unistyles 3
- TanStack React Query 5 for remote state; Zustand 5 for client state
- Axios clients for the main API and module-specific backends
- react-i18next: en, vi, zh-CN, zh-TW
- MMKV 4; React Hook Form + zod/v4
- Vision Camera, NFC Manager, BLE PLX, Expo Image/Video, OTA updates
- Jest 29, ESLint 9, Prettier 3

Aliases: `@/*` → `src/*`; `~/*` → `app/*`.

There is no Supabase integration in the current source. Do not introduce one based on older documentation.

## Source of truth and working rules

1. Read the target feature and neighboring files before editing. Prefer the established local pattern over a generic example.
2. Preserve unrelated and in-progress changes. Never revert, overwrite, stage, or commit them unless explicitly requested.
3. Use Yarn 1 only. Do not use npm, pnpm, bun, or npx unless requested.
4. Do not edit `.env` or expose secrets. Use `.env.example` and `src/config/env.ts` for configuration.
5. Keep changes scoped; do not refactor unrelated modules.
6. Before handing off any code or documentation change, run `yarn validate`. Run relevant tests; run `yarn test` for broad/shared runtime changes.
7. Do not commit, push, deploy, publish OTA updates, or build/upload releases without an explicit request.

`CONVENTIONS.md` is the detailed style reference. If it disagrees with executable configuration or nearby source, follow the configuration/source and update stale documentation when in scope.

## Commands

```bash
yarn start              # Expo development server
yarn ios                # native iOS run on a selected device
yarn android            # native Android run on a selected device
yarn type-check         # tsc --noEmit
yarn lint               # ESLint
yarn lint:fix           # ESLint auto-fix
yarn format             # Prettier write
yarn format:check       # Prettier check
yarn i18n:check         # locale parity/validity
yarn i18n:unused        # unused translation report
yarn validate           # type-check + lint + format:check + i18n:check
yarn test               # Jest
yarn test:watch         # Jest watch mode
yarn test:coverage      # Jest with coverage
yarn scaffold <name>    # scaffold a feature
yarn doctor             # repository diagnostics
yarn check-env          # environment validation
yarn sync:version       # synchronize version constants
yarn build:apk          # local Android release APK
```

`deploy:apk` and `deploy:version` change a remote production system. Run them only when explicitly requested.

## Current architecture

### Application shell and routes

`app/_layout.tsx` composes:

```text
GestureHandlerRootView
└── ErrorBoundary
    └── KeyboardProvider
        └── QueryProvider
            └── AppAlertProvider
                └── CameraProvider
                    └── AppBottomSheetProvider
                        └── NfcProvider
                            └── AppContent
```

`AppContent` initializes auth/OTA behavior and renders `AppHeader`, the protected router stack, `AppDrawer`, swipe-back support, and toast UI.

- Public/config routes: `api-config`, `dev-config`, `language-config`, `update-required`
- Auth: `app/(auth)/login.tsx`
- Main tabs: dashboard and settings
- Feature routes under `app/(main)/`: account, logged-in devices, bonus, checklists, CNC, coating warehouse, devices/gauges, dewax, dimension, equipment checklists, factory map, foundry, legacy foundry, gas, insulation wrapping, molds, pallet, repair machines, and tools

Do not recreate the obsolete batches/alerts tab structure found in old examples.

### Source directories

```text
app/                     Expo Router routes/layouts
src/common/components/   shared UI; public exports in index.ts
src/config/              environment configuration
src/features/            domain modules
src/hooks/               cross-feature hooks
src/i18n/locales/        four locale JSON files
src/providers/           auth, query, alerts, sheets, camera, NFC, drawer, updates
src/services/api/        Axios clients, errors, multipart helpers
src/services/updates/    OTA update service
src/theme/               Unistyles config, themes, metrics, fonts
src/types/               cross-feature types
src/utils/               storage, dates, formatters, versions, diagnostics
scripts/                 validation, scaffold, version, build helpers
```

Feature roots: `auth`, `bonus`, `checklists`, `cnc`, `cnc-7075`, `coating-warehouse`, `company`, `customers`, `dashboard`, `department`, `devices`, `dewax`, `factory-map`, `floors`, `foundry`, `foundry-old`, `gas`, `insulation-wrapping`, `layout`, `molds`, `pallet`, `repair-machines`, and `tools`.

## Implementation conventions

### TypeScript and files

- No `any`. Use explicit types, generics, or `unknown` with narrowing.
- Use `import type` for type-only imports.
- Prefer interfaces for object shapes and type aliases for unions.
- Files in `src/` use named exports. Expo Router route files use default exports.
- Feature directories are lowercase/kebab-case; components are PascalCase; hooks are `useX.ts`.
- Domain files use semantic suffixes: `*.types.ts`, `*.service.ts`, `*.schema.ts`, `*.keys.ts`, `*.mapper.ts`, `*.utils.ts`, `*.constants.ts`.
- Re-export a feature's public surface from local barrels where that feature already uses barrels.
- Never add `eslint-disable`, `@ts-ignore`, `@ts-nocheck`, bare `@ts-expect-error`, or `--no-verify`.

### Components and styling

- Reuse components from `@/common/components` before creating new primitives.
- Import `StyleSheet` from `react-native-unistyles`, never React Native.
- Use `StyleSheet.create((theme) => ({}))` and semantic `theme.colors`, `theme.fonts`, and `theme.metrics` tokens.
- Do not hardcode colors. Use spacing/radius/font/icon tokens when a matching token exists.
- Avoid inline styles. For truly dynamic values, follow the nearby component pattern and keep static styling in Unistyles.
- Interactive elements need accessible labels/roles when the shared component does not provide them.

Public shared UI includes `Accordion`, `AppDrawer`, `AppHeader`, `AppImage`, `AppRefreshControl`, `AppSwipeBack`, `Avatar`, `Badge`, `BlockingLoadingModal`, `Button`, `Card`, `Checkbox`, `Chip`, `DateTimeField`, `DetailRow`, `Dialog`, `Divider`, `EmptyState`, `ErrorBoundary`, `FilterChipGroup`, `FormField`, `Icon`, `IconButton`, `Input`, `ListItem`, `Loading`, `Menu`, `PaginatedList`, `ProgressBar`, `RadioGroup`, `SafeAreaModal`, `ScanInput`, `ScreenCard`, `ScreenContainer`, `ScrollToTopButton`, `SearchBar`, `SegmentedControl`, `Select`, `Skeleton`, `Snackbar`, `Switch`, `TabView`, `Table`, `Text`, `TextArea`, `VideoPlayerModal`, and `VideoThumbnail`.

### Internationalization

- Put user-visible strings through `useTranslation()`/`t()`.
- Keep `en.json`, `vi.json`, `zh-CN.json`, and `zh-TW.json` synchronized.
- Validation schemas store translation keys, not rendered prose.
- Run `yarn i18n:check`; use `yarn i18n:unused` after removing/renaming keys.
- Logs, API paths, identifiers, and developer-only diagnostics do not need translation.

### State and data flow

- Remote/API state: React Query with stable, feature-owned query keys.
- Client/UI state: local React state or Zustand; subscribe with selectors.
- Auth: `useAuthStore` in `src/providers/auth/authStore.ts`; do not create another auth context/store.
- Persistence: helpers in `src/utils/storage`, not ad hoc storage access.
- Forms: React Hook Form + `zod/v4` + `@hookform/resolvers`.

### API services

Import from `@/services/api`. Multiple clients exist because modules use different base URLs:

- `api` / `axiosClient`: authenticated main API with runtime URL and token refresh
- `publicAxios`: unauthenticated main API
- `cncApi`, `dewaxApi`, `dimensionApi`, `gasApi`, `moldApi`, `insulationWrappingApi`, `bonusApi`, `palletApi`, `toolsApi`, `foundryApi`

Choose the client used by neighboring services in the target feature; not every backend shares auth behavior.

- Always provide the Axios response generic: `client.get<ResponseType>(...)`.
- Let service return types be inferred instead of duplicating `Promise<T>`.
- Unwrap Axios responses and return the payload expected by the hook/component.
- Use `cleanParams` for optional query parameters and `sendMultipartRequest` for the established upload flow.
- Preserve request cancellation. `ApiError` exposes normalized `message`, optional `status`, and optional `code`.

### Native capabilities

- Use camera provider helpers rather than opening Vision Camera ad hoc.
- Use `NfcProvider`/`useNfc` for NFC.
- Follow existing Bluetooth permission/device hooks for BLE measurements.
- Native dependency/config changes may require `app.config.ts`, a config plugin, and a native rebuild; Expo Go is insufficient.

## Verification, versioning, and Git

- Co-locate tests with code or use an existing feature `__tests__` directory.
- Add focused tests for parsing, transformations, state, errors, and service behavior.
- Small change: relevant tests + `yarn validate`. Shared infrastructure/routing/API/provider refactor: `yarn test` + `yarn validate`.
- Report pre-existing failures exactly; do not hide them.
- `src/utils/app-version.ts` defines version/runtime constants; `app.config.ts` consumes them and `package.json` mirrors the release version. Run `yarn sync:version` after an approved version change.
- OTA, APK, signing, and deployment actions require explicit authorization.
- When asked to commit, use `type(scope): short specific subject` with types `feat|fix|refactor|docs|test|chore|perf|build|ci|revert`. Inspect the diff and follow `docs/AI-GIT-WORKFLOW.md`.

## Relevant documentation

- `CONVENTIONS.md` — detailed conventions
- `docs/AI-GUIDE.md` — implementation cookbook
- `docs/AI-GIT-WORKFLOW.md` — Git workflow
- `docs/ARCHITECTURE.md`, `docs/COMPONENTS.md`, `docs/DESIGN.md`, `docs/SETUP.md`
- `docs/llms.txt` — compact repository context
