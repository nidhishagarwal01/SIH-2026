---
trigger: always_on
description: Ralph Loop - Self-Correcting Continuous Verification and Regression Prevention Engine
---

# 🔁 RALPH LOOP: Self-Correcting Verification Protocol

The Ralph Loop ensures that code never regresses and that every system operates with 100% deterministic reliability.

## The Ralph Continuous Verification Cycle:
```
[Identify Issue] ──► [Implement Solution] ──► [Build & Compile] ──► [Test Suite Run] ──► [Verify Fallbacks] ──► [Deploy & Confirm]
```

## Core Directives:
1. **Automated Compile & Lint Gate**:
   - Always run `npm run build` (Vite) and Python `test_suite.py` after editing any component or API service.
   - Zero tolerance for runtime `undefined`, broken imports, missing keys, or silent JavaScript errors.

2. **Self-Healing Fallbacks**:
   - If an API or backend service is unreachable, UI components must silently fallback to deterministic physics computations without throwing unhandled exceptions.
   - If an asset image fails to load, graceful placeholder rendering must prevent broken layout shifts.

3. **Context Integrity & Memory**:
   - Preserve existing features, routes, and theme states across all edits.
   - Verify that changes in one view (e.g., 3D Studio) do not negatively impact other views (Landing Page, GIS Portal).
