# Drift Control

This file prevents thread-to-thread drift.

## Drift risks in this app

1. Replacing the existing hospitality design with generic SaaS UI.
2. Refactoring inline styles too early.
3. Changing API paths while frontend still expects the MVP contract.
4. Adding database/auth before data shape is stable.
5. Overbuilding governance instead of extending catering features.
6. Losing context when moving to new LLM threads.

## Drift check before any patch

Answer these before changing files:

1. Does this preserve the existing visual language?
2. Does this keep the current Menus / Ingredients / Costings surfaces working?
3. Does this change API routes or data shape?
4. Does this require a `REPO_STATE.json` update?
5. Is the patch small enough to inspect in one diff?
6. Can the change be validated with existing commands?

## Change classes

### Safe additive change

Examples:

1. Add a small UI panel.
2. Add an export button.
3. Add a read-only summary.
4. Add form validation.
5. Add docs/control-plane continuity files.

Default action: proceed after inspection.

### Controlled architecture change

Examples:

1. Add persistence.
2. Add a database.
3. Add auth.
4. Add router.
5. Split backend services.

Default action: write a short proposal note first.

### High-drift change

Examples:

1. Replace visual system.
2. Rename core pages.
3. Change all data models.
4. Introduce a large framework migration.

Default action: stop and ask for explicit approval.

## Continuity rule

Every build thread should finish with:

1. What changed.
2. What was validated.
3. What remains risky or unknown.
4. Exact next recommended step.
