# New Thread Opening Template

Use this when starting a new LLM build thread.

```text
We are continuing Smokey Men Catering app.

Before giving code, read and follow:
1. ai_boot/AI_BOOTLOADER.md
2. ai_boot/REPO_STATE.json
3. ai_boot/docs/OPERATOR_WORKFLOW.md
4. ai_boot/docs/DESIGN_GUARDRAILS.md
5. ai_boot/docs/DRIFT_CONTROL.md
6. ai_boot/docs/THREAD_HANDOVER.md

Current rule:
- Preserve the existing visual design.
- Make small additive patches only.
- Inspect before patching.
- Use bounded Python patches from repo root where possible.
- Update THREAD_HANDOVER.md and REPO_STATE.json when architecture, routes, data shape, or workflow changes.

Task for this thread:
[INSERT ONE TASK ONLY]

Do not redesign the app.
Do not introduce persistence/auth/router/framework changes unless I explicitly approve that phase.
```
