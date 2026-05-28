# Operator Workflow

This file defines how we build the app with LLM assistance.

## Standard workflow

1. **Inspect**
   - Check relevant files first.
   - Do not patch from memory.
   - Confirm current imports, routes, state shape, and style patterns.

2. **Plan one small change**
   - Keep the change narrow.
   - Say which files are expected to change.
   - Avoid multi-feature patches.

3. **Patch**
   - Prefer bounded patches from repo root.
   - Use Python heredoc patches for speed and precision.
   - On Windows/PowerShell, use file-safe PowerShell commands or run Python from PowerShell.

4. **Validate**
   - Run syntax/build checks where available.
   - Check `git diff --check`.
   - Check focused diffs.
   - Run the control-plane checker.

5. **Record continuity**
   - Add a short entry to `ai_boot/docs/THREAD_HANDOVER.md`.
   - Update `ai_boot/REPO_STATE.json` when architecture, routes, data shape, runtime, or product surfaces change.

6. **Commit**
   - Commit only the intended files.
   - Do not mix feature work and governance cleanup unless explicitly approved.

## Preferred patch pattern

From repo root:

```powershell
python - <<'PATCHPY'
from pathlib import Path
p = Path('path/to/file.jsx')
text = p.read_text(encoding='utf-8')
old = "exact old text"
new = "exact new text"
if old not in text:
    raise SystemExit('Target text not found')
p.write_text(text.replace(old, new), encoding='utf-8')
PATCHPY
```

Use a unique heredoc marker when the patch itself contains the marker text.

## Minimum validation commands

```powershell
git diff --check
node ai_boot/scripts/check-control-plane.mjs
npm --prefix frontend run build
```

If the repo does not yet have a split `frontend` folder, run the equivalent build command for the actual package layout and record that in `THREAD_HANDOVER.md`.
