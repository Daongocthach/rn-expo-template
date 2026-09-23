# Setup Guide

## Prerequisites

- Node.js 18+
- Yarn 1.x
- Expo CLI through the repository's Yarn scripts
- iOS Simulator or Android Emulator for native testing

## Install

```bash
yarn install
cp .env.example .env
yarn start
```

## Environment Variables

Environment keys are documented in `.env.example` and mapped by `src/config/env.ts`. They include the main API plus module-specific URLs for dewax, CNC, dimension, gas, molds, insulation wrapping, bonus, pallets, foundry, tools, control plans, and version metadata.

## Update Flow

When releasing a new app version:

1. Update the approved values in `src/utils/app-version.ts` and native build numbers as required.
2. Run `yarn sync:version`.
3. Verify `package.json`, `app.config.ts`, and `src/utils/app-version.ts` are synchronized.

## Common Scripts

```bash
yarn start
yarn ios
yarn android
yarn type-check
yarn lint
yarn lint:fix
yarn format
yarn format:check
yarn validate
yarn test
yarn test:coverage
yarn i18n:check
yarn i18n:unused
yarn check-env
yarn sync:version
```

Native builds require the configured camera, NFC, BLE, update, and local config plugins. Use the repository scripts and release process; do not assume Expo Go or an unconfigured EAS workflow supports these modules.
