# Thread Handover

This is the running continuity log for LLM-assisted build threads.

## Phase 0 — Control Layer MVP Created

Date: 2026-05-28

Purpose:
- Add lightweight Tower-style continuity files for Smokey Men Catering app.
- Preserve current visual direction while allowing controlled additive builds.
- Give future LLM threads enough repo state to continue without drifting.

Current app shape:
- React frontend with Menus, Ingredients, and Costings pages.
- Express backend API on port 3001.
- In-memory seed data.
- Strong CSS token/design system already present.

Guardrail decision:
- This app does not need full Tower-level governance yet.
- It does need bootloader, repo state, operator workflow, drift control, design guardrails, and a repeatable validation check.

Known gap:
- Confirm `frontend/src/components/UI.jsx` exists in the actual repo because uploaded pages import shared UI primitives from it.

Next recommended phase:
- Phase 1 should inspect actual repo layout and install these files without touching app behavior.

## Phase 1 — Packages Surface and Image Sizing Docs Alignment

Date: 2026-05-28

Purpose:
- Align lightweight control docs with the current app surface after Packages and package detail work.
- Record that package hero/card image sizing was adjusted to reduce visual dominance.
- Correct app naming from the earlier placeholder typo to Smokey Men Catering.

Current app shape:
- Public Packages overview and detail pages.
- Menus, Ingredients, and Costings pages.
- React/Vite frontend with Express backend and in-memory MVP data.
- Packages remain frontend-driven from packagesData.js for now.

Validation expected:
- git diff --check once inside the actual Git repo.
- npm --prefix frontend run build.
- Manual review of package hero/detail image proportions.

Known issue:
- Current shell reported NOT INSIDE A GIT REPO from ~/pill-factory-menus, so Git validation may require moving to the actual repo root or initialising Git.

Next recommended phase:
- Confirm whether ~/pill-factory-menus should be the Git repo root.
- Then inspect whether Packages should remain frontend-only for now or whether a proposal is needed before moving package content into the backend API.

## Phase 1B — Rename App Identity and Create Git Baseline

Date: 2026-05-28

Purpose:
- Rename the application identity to Smokey Men Catering.
- Prepare the project for its first Git baseline.
- Keep the existing app structure, visual language, and control docs intact.

Current app shape:
- Public packages overview and package detail pages.
- Menus, Ingredients, and Costings pages.
- React/Vite frontend with Express backend and in-memory MVP data.

Boundary:
- Rename only.
- No architecture change.
- No persistence, auth, router, or design-system replacement.

Next recommended phase:
- Commit the clean baseline.
- Then continue with small additive package/content/UI improvements.

## Phase 2 — GitHub Baseline and Packages Sales Polish

Date: 2026-05-28

Purpose:
- Confirm the Smokey Men Catering repository has been initialised and pushed to GitHub.
- Record the packages page media/sales polish.
- Preserve the existing editorial hospitality design while reducing image dominance on the Packages page.

Completed:
- Git remote configured: https://github.com/joesch21/Smokey_Men_Catering.git
- main branch pushed and tracking origin/main.
- Latest pushed commit: 5aa2a89.
- Packages page copy changed to be more sales-led.
- Packages page image sizing reduced so package details, pricing, inclusions, and CTA carry the sale.
- Header now displays Smokey Men Catering without the duplicate Catering label.

Validation:
- npm --prefix frontend run build passed.
- frontend/dist was confirmed not staged.
- Working tree clean after push.

Next recommended phase:
- Review the live Packages page visually.
- Then make one small content or CTA improvement at a time.

## Phase 3D — Packages Overview Ambient Composition

Date: 2026-05-28

Purpose:
- Strengthen the Packages overview landing composition with a smokehouse-style hero panel, warmer ambient colour fields, stronger Weekend package anchoring, and a more coherent package image set.

Completed:
- Added ambient hero composition styling to `frontend/src/styles/packages.css`.
- Added `ps-hero-ambient` marker to the Packages overview hero.
- Updated Packages overview image references to use local package assets under `frontend/public/package-assets/`.
- Preserved package detail page layouts and backend behavior.

Validation:
- `git diff --check` passed.
- `npm --prefix frontend run build` passed.

Boundary:
- Frontend-only visual composition change.
- No backend, routing, auth, persistence, global token, or package detail layout changes.

## Phase 4A — Supplier Intelligence Page

Date: 2026-05-28

Purpose:
- Add a read-only Suppliers page for important Bundanoon village, regional wholesale, eco packaging, wine, and provenance suppliers.

Completed:
- Added `frontend/src/pages/SuppliersPage.jsx`.
- Added `frontend/src/styles/suppliers.css`.
- Added `Suppliers` to the header navigation.
- Wired `suppliers` into the existing state-based page switch in `frontend/src/App.jsx`.

Boundary:
- Frontend-only page addition.
- No backend, router, auth, persistence, or API contract change.
- Supplier content is static MVP content sourced from the Pill Factory catering plan draft.

Validation expected:
- `git diff --check`.
- `npm --prefix frontend run build`.

## Phase 4B — Pricing and Costing Alignment

Date: 2026-05-28

Purpose:
- Align public package price bands with more realistic staffed-service economics.
- Add a Costings page note clarifying that public package prices are entry bands while full-service venue work requires separate costing.

Completed:
- Raised Packages page starting prices and package tier prices in `frontend/src/data/packagesData.js`.
- Added a pricing sanity note to `frontend/src/pages/CostingsPage.jsx`.
- Preserved backend API shape and in-memory costing structure.

Boundary:
- Frontend data/content alignment only.
- No backend route changes.
- No persistence, auth, router, or costing engine refactor.

Validation expected:
- `git diff --check`.
- `python3 -m json.tool ai_boot/REPO_STATE.json`.
- `npm --prefix frontend run build`.

Next recommended phase:
- Consider a future costing model split into food, labour, transport/equipment, linen/consumables, risk buffer, target margin and recommended sell price per head.

## Phase 4C — Costing Model Naming and Formula Clarity

Date: 2026-05-28

Purpose:
- Rename generic Package A / Package B costings into venue model language.
- Explain how pricing should be calculated from food, labour, equipment, linen, risk buffer and target margin.
- Align Costings page language with the public Packages page.

Completed:
- Renamed backend costing labels to `Venue Model — Full Weekend Residential` and `Venue Model — Celebration Event`.
- Updated Costings summary card labels.
- Added a pricing formula explainer to the Costings page.
- Added a public package bands vs venue costing models table.
- Corrected public `priceFrom` consistency for Midweek Major Meal and Birthday Dinner.

Boundary:
- Naming, explanation and static pricing alignment only.
- No backend route changes.
- No persistence, router, auth, or dynamic costing engine refactor.

Validation expected:
- `git diff --check`.
- `python3 -m json.tool ai_boot/REPO_STATE.json`.
- `npm --prefix frontend run build`.
\n