# Claude Code instructions

Read and follow `AGENTS.md` before making changes. Use `CONVENTIONS.md` for detailed code style and `docs/AI-GUIDE.md` for current examples.

Repository snapshot:

- Finepro Tools is an Expo SDK 55 / React Native 0.83.10 manufacturing-operations app.
- Routes cover dashboard/settings plus checklists, CNC, foundry, molds, devices/gauges, repair machines, factory map, warehouses and other shop-floor modules.
- Use Yarn only.
- Use Unistyles theme tokens, shared components, React Query, Zustand selectors, the feature-appropriate Axios client, and all four locales.
- Preserve unrelated work and never edit `.env`.
- Run `yarn validate` before handoff and relevant Jest tests for behavior changes.
- Do not commit, push, deploy, publish OTA updates, or build/upload a release unless explicitly requested.

The current version constants live in `src/utils/app-version.ts`; the app does not use Supabase.
