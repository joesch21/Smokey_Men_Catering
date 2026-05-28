# Design Guardrails

The current frontend has a strong visual identity. Preserve it.

## Existing visual system

1. Warm editorial hospitality dashboard.
2. Display font: `Playfair Display`, fallback `Georgia`, serif.
3. Body font: `DM Sans`, fallback `system-ui`, sans-serif.
4. Base background: warm off-white.
5. Card background: white.
6. Thin 0.5px borders.
7. Small radius scale from 6px to 16px.
8. Restrained shadows.
9. Seasonal accent palette:
   - Summer amber.
   - Autumn coral.
   - Winter blue.
   - Spring green.
   - Supporting teal and purple.

## Protected design-token rule

`frontend/src/index.css` or the current `src/index.css` equivalent is a protected visual contract.

Do not change tokens, fonts, global radius, border language, or background palette unless the operator asks for a design phase.

## Component rules

1. New screens should reuse existing layout rhythm:
   - max-width around 1200px
   - 2rem main padding
   - cards, tables, small labels, badges
2. Prefer existing primitives:
   - `Card`
   - `Badge`
   - `Btn`
   - `Modal`
   - `FormField`
   - `SectionLabel`
   - `MetricCard`
   - `Toast`
3. Do not introduce a new UI framework unless explicitly approved.
4. Avoid noisy gradients, heavy shadows, large icons, dark-mode redesigns, or generic SaaS styling.

## Acceptable additive UI work

1. New dashboard panels using existing tokens.
2. Better empty states.
3. Export/print surfaces.
4. Filtering/search.
5. Costing calculators.
6. Persistence status indicators.
7. Import/export of menu data.

## Requires approval first

1. Router migration.
2. Complete component-library refactor.
3. Design-system replacement.
4. Tailwind/shadcn migration.
5. Charting library introduction.
6. Auth/payment/admin roles.
