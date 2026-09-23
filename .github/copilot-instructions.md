# GitHub Copilot instructions

Use `AGENTS.md` as the authoritative repository context, `CONVENTIONS.md` for detailed style, and nearby source as the implementation pattern.

- Finepro Tools is an Expo SDK 55 / React Native 0.83.10 manufacturing app with typed Expo Router routes.
- Use Yarn only. Keep `yarn validate` passing.
- Reuse `@/common/components`; style with `react-native-unistyles` tokens.
- Translate visible strings in en, vi, zh-CN, and zh-TW.
- Use React Query for remote state and Zustand selectors for client state; auth belongs to `useAuthStore`.
- Services must use the feature-appropriate exported Axios client and typed response generics.
- Do not suggest `any`, suppression comments, hardcoded colors, `--no-verify`, or obsolete batches/alerts routes.
- Preserve unrelated work; do not edit `.env` or suggest deployment/release commands unless requested.

When asked for a commit message, output only:

```text
type(scope): short specific subject
```

Allowed types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `build`, `ci`, `revert`.
