# Patch Protocol

## Default rule

Small patches beat clever patches.

## Before patching

1. Inspect exact file content.
2. Identify the smallest safe insertion/replacement.
3. Avoid global search/replace unless the target is unambiguous.
4. Prefer adding over rewriting.

## Python patch pattern

```powershell
python - <<'PATCHPY'
from pathlib import Path
p = Path('frontend/src/pages/MenusPage.jsx')
text = p.read_text(encoding='utf-8')
old = """exact old block"""
new = """exact replacement block"""
if old not in text:
    raise SystemExit('Target block not found; inspect before patching')
p.write_text(text.replace(old, new, 1), encoding='utf-8')
PATCHPY
```

## After patching

```powershell
git diff --check
git diff --stat
node ai_boot/scripts/check-control-plane.mjs
```

Then run the relevant app build/test command.

## Forbidden default patch types

1. Whole-file rewrites without need.
2. Silent deletion of UI elements.
3. Route renames without frontend alignment.
4. CSS token replacement.
5. Persistence/auth/framework introduction without proposal.
