import fs from 'node:fs';

const required = [
  'ai_boot/AI_BOOTLOADER.md',
  'ai_boot/REPO_STATE.json',
  'ai_boot/docs/OPERATOR_WORKFLOW.md',
  'ai_boot/docs/DESIGN_GUARDRAILS.md',
  'ai_boot/docs/DRIFT_CONTROL.md',
  'ai_boot/docs/THREAD_HANDOVER.md',
  'ai_boot/docs/THREAD_OPENING_TEMPLATE.md',
  'ai_boot/docs/PATCH_PROTOCOL.md',
];

let ok = true;
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`MISSING: ${file}`);
    ok = false;
  }
}

if (fs.existsSync('ai_boot/REPO_STATE.json')) {
  try {
    const state = JSON.parse(fs.readFileSync('ai_boot/REPO_STATE.json', 'utf8'));
    const mustHave = [
      ['schema', state.schema],
      ['application.name', state.application?.name],
      ['llm_build_policy.must_read_before_code', state.llm_build_policy?.must_read_before_code],
      ['design_guardrails.protected_files', state.design_guardrails?.protected_files],
      ['validation.minimum_before_commit', state.validation?.minimum_before_commit],
    ];
    for (const [label, value] of mustHave) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        console.error(`INVALID REPO_STATE: missing ${label}`);
        ok = false;
      }
    }
  } catch (err) {
    console.error(`INVALID JSON: ai_boot/REPO_STATE.json — ${err.message}`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log('CONTROL FILE CHECK PASSED');
