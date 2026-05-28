# AI Bootloader — Smokey Men Catering

This repo uses a lightweight Tower-style control layer so LLM-assisted work stays continuous across threads without drifting away from the product already built.

## Read this first in every new thread

1. `ai_boot/AI_BOOTLOADER.md`
2. `ai_boot/REPO_STATE.json`
3. `ai_boot/docs/OPERATOR_WORKFLOW.md`
4. `ai_boot/docs/DESIGN_GUARDRAILS.md`
5. `ai_boot/docs/DRIFT_CONTROL.md`
6. `ai_boot/docs/THREAD_HANDOVER.md`

## Current app identity

The app is **Smokey Men Catering**: a seasonal catering/menu/costing dashboard.

Current product surfaces:

1. Public Packages overview and package detail pages.
2. Menus by season.
3. Ingredients by season.
4. Costings and seasonal variance.

Current architecture:

1. React/Vite frontend.
2. Express backend API.
3. In-memory seed data for MVP.
4. No auth or persistence yet unless added by a future approved phase.

## Prime directive for LLM work

Preserve the current working app and visual language. Make small additive changes. Inspect before patching. Do not redesign, restructure, or introduce major architecture unless the operator explicitly approves that phase.

## Default build loop

1. Inspect exact files.
2. State the intended small change.
3. Apply a bounded patch.
4. Validate syntax/build.
5. Update `THREAD_HANDOVER.md` and `REPO_STATE.json` if architecture, routes, data shape, workflow, or major UI surfaces changed.
6. Commit only after review.

## LLM boundaries

LLMs may propose and patch small bounded changes. LLMs must not:

1. Replace the design system without approval.
2. Move files broadly without approval.
3. Add persistence/auth/payment/deployment without a proposal note.
4. Delete working UI surfaces unless the operator asks.
5. Invent repo state when files can be inspected.
