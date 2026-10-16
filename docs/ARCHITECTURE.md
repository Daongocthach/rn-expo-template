# Architecture

## Overview

Finepro Tools is a production Expo/React Native app for internal manufacturing operations. Its dashboard launches modules for equipment checklists, CNC and dimensional inspection, foundry, molds, repair requests, factory maps, coating warehouse, dewax, gas, insulation wrapping, pallets, tools, and employee bonuses.

## Stack

| Layer           | Technology                                         |
| --------------- | -------------------------------------------------- |
| Framework       | Expo SDK 57, React Native 0.86.3, React 19.2       |
| Routing         | Expo Router with typed routes and protected stacks |
| Language        | TypeScript 5.9 strict                              |
| Styling         | React Native Unistyles 3                           |
| Remote state    | TanStack React Query 5                             |
| Client state    | Zustand 5 and local React state                    |
| Networking      | Axios main and module-specific clients             |
| i18n            | react-i18next: en, vi, zh-CN, zh-TW                |
| Persistence     | React Native MMKV 4                                |
| Forms           | React Hook Form + zod/v4                           |
| Native features | Vision Camera, NFC Manager, BLE PLX, Expo Updates  |
| Quality         | Jest 29, ESLint 9, Prettier 3                      |

## Application shell

`app/_layout.tsx` mounts providers in this order:

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

`AppContent` initializes auth and OTA hooks and renders the global header, protected router stack, drawer, swipe-back layer, and toast host. The root stack exposes configuration/update screens and guards the `(auth)` and `(main)` groups.

## Routes

```text
app/
├── _layout.tsx
├── api-config.tsx
├── dev-config.tsx
├── language-config.tsx
├── update-required.tsx
├── (auth)/login.tsx
└── (main)/
    ├── account.tsx
    ├── logged-in-devices.tsx
    ├── (tabs)/               # dashboard + settings
    ├── bonus/
    ├── checklists/
    ├── cnc/
    ├── devices/              # device and gauge flows
    ├── equipment-checklists/
    ├── factory-map/
    ├── foundry/
    ├── foundry-old/
    ├── molds/
    ├── repair-machines/
    ├── coating-warehouse.tsx
    ├── dewax.tsx
    ├── dimension.tsx
    ├── gas.tsx
    ├── insulation-wrapping.tsx
    ├── pallet.tsx
    └── tools.tsx
```

## Source layers

```text
src/
├── common/components/  shared UI and public barrel
├── config/             environment mapping
├── features/           domain modules
├── hooks/              cross-feature hooks
├── i18n/               initialization and four locales
├── providers/          auth/query/alert/sheet/camera/NFC/drawer/update
├── services/api/       Axios clients and helpers
├── services/updates/   OTA service
├── theme/              tokens, metrics, fonts, Unistyles config
├── types/              cross-feature types
└── utils/              storage, dates, formatting, versions, diagnostics
```

Feature modules own their components, hooks, services, schemas, types, constants, stores, and utilities. Route files should primarily compose feature APIs.

## Data flow and networking

- React Query owns server state, caching, pagination, and mutations.
- Zustand owns shared client state. Consumers subscribe with selectors.
- `useAuthStore` hydrates user/session data from MMKV and is the only auth store.
- `QueryProvider` persists eligible query data using the MMKV persister.
- Local React state handles transient view-only state.

`src/services/api/client.ts` exports an authenticated main client, a public main client, and module clients for CNC, dewax, dimension, gas, molds, insulation wrapping, bonus, pallets, tools, and foundry. Runtime URL helpers can override environment defaults.

Services choose the client used by their backend, provide typed response generics, and return unwrapped payloads. The main authenticated client refreshes expired access tokens; error interceptors normalize failures to `ApiError` and preserve request cancellation.

## UI and native integrations

- Shared components are exported by `src/common/components/index.ts`.
- Unistyles themes provide semantic colors, fonts, and responsive metrics.
- Camera and barcode operations go through the camera provider helpers.
- NFC operations go through `NfcProvider`/`useNfc`.
- BLE measurement flows use the repository's permission and device hooks.
- Native-module changes require a development/native build rather than Expo Go.

## Versioning

`src/utils/app-version.ts` defines the app, runtime, and OTA version constants. `app.config.ts` consumes them and `package.json` mirrors the release version. Use `yarn sync:version` for an approved version update.

## Adding a feature

1. Use `yarn scaffold <feature-name>` when its generated shape fits.
2. Implement the domain under `src/features/<feature-name>/`.
3. Add route composition under `app/(main)/`.
4. Add visible text to all four locale files.
5. Reuse shared UI and the correct existing API client.
6. Run focused tests and `yarn validate`.
