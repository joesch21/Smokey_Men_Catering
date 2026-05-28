# Proposal Template

Use this before controlled architecture changes.

## Proposal ID

`pill_factory.<short_name>.v1`

## Problem

What problem are we solving?

## Current repo reality

Files/routes/components inspected:

1. ...
2. ...
3. ...

## Proposed change

Smallest useful change:

1. ...
2. ...
3. ...

## Files expected to change

1. ...
2. ...
3. ...

## Data/API impact

- Routes changed: yes/no
- Data shape changed: yes/no
- Persistence changed: yes/no
- Frontend visual contract changed: yes/no

## Drift risk

Low / Medium / High

Why:

## Validation plan

1. `git diff --check`
2. `node ai_boot/scripts/check-control-plane.mjs`
3. app-specific build/test command

## Rollback plan

How to undo safely:
