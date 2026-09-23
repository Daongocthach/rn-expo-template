# Migration Guide

This repository is already migrated to the Finepro Tools app structure.

Use these documents instead:

- [`AGENTS.md`](../AGENTS.md)
- [`CONVENTIONS.md`](../CONVENTIONS.md)
- [`docs/ARCHITECTURE.md`](ARCHITECTURE.md)
- [`docs/SETUP.md`](SETUP.md)
- [`docs/AI-GUIDE.md`](AI-GUIDE.md)

If you are updating the app version or build number, run:

```bash
yarn sync:version --version <x.y.z> --build <n>
```

If you are migrating a new branch or package into this codebase, follow the current app conventions rather than this legacy template guide.
