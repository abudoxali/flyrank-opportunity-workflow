# FE-03 — AI-assisted workflow drill

**Status: Two code-variant GitHub branches have been published, and CI typechecking, component tests, and production builds passed for both. These variants were staged for comparison; independent fresh AI sessions, actual keyboard testing, and human review timings remain unverified. Not submitted to FlyRank.**

## Feature

A small settings form with display name, email, notification preference, inline validation, and a local save confirmation.

## Round one — vague prompt

> Make me a settings form.

Published vague-round variant: https://github.com/abudoxali/flyrank-opportunity-workflow/tree/fe03-vague-2026/frontend-ai-engineering . It is a staged comparison target, not independently generated in a fresh AI session.

## Round two — precise prompt

> In `src/components/SettingsForm.tsx`, create a controlled React + TypeScript settings form with display name (minimum two characters), RFC-style practical email validation, and an opt-in checkbox. Never use `any`. Use semantic `label`/`htmlFor`, `aria-invalid`, and `aria-describedby` for errors. Persist only valid data to `localStorage` and show a polite `role=status` confirmation. The form must be keyboard-operable and provide inline errors. Verify by running TypeScript, tests, and a production build, and report commands/results. Do not modify unrelated routes.

Published precise-round variant: https://github.com/abudoxali/flyrank-opportunity-workflow/tree/fe03-structured-2026/frontend-ai-engineering .

## Evidence checklist

- [x] Create a literal vague-prompt implementation on GitHub branch `fe03-vague-2026` (fresh-context independence not evidenced).
- [x] Create a structured implementation from the same base commit on GitHub branch `fe03-structured-2026` (fresh-context independence not evidenced).
- [x] Confirm automated GitHub Actions checks: installation, TypeScript, component tests, production build succeeded on both branches; full human browser review remains outstanding.
- [x] Complete source-level comparison (362 words) of correctness, accessibility, edge cases, and expected review effort; timing was not measured.
- [x] The 362-word analysis below describes the staged vague variant's false-positive Save action; it is an actual code defect but is **not** represented as an independently observed AI mistake.
- [x] The linked `CLAUDE.md` already contains rules for form semantics, keyboard a11y, and running test/typecheck/build, but the rules are not proof of a genuine second AI round.

## Code-level comparison (source review, 362 words)

This exercise compared two settings-form implementations built from the same local Git baseline. The purpose was to see what a vague feature request leaves undefined versus a specification with field semantics, data constraints and verification requirements. Both versions are inspectable in the linked GitHub branches, especially `frontend-ai-engineering/src/components/SettingsForm.tsx`. These are genuine different code variants, but their generation was not conducted in two isolated external AI sessions, and automated CI passed for both branches, but manual browser review remains outstanding.

**Correctness.** The first version displays two inputs and a Save button. Clicking Save always triggers a browser alert, even when both fields are blank. Nothing is stored. This is a concrete mistake: the interface claims the operation succeeded without implementing persistence or validation. The structured version requires a display name with at least two non-whitespace characters and an email matching a practical address pattern. Invalid entries produce inline field messages, and only a valid submission writes a JSON settings object into browser-local storage. The saved confirmation appears only after that write.

**Accessibility.** The first version relies on placeholder text instead of explicit labels. Placeholders disappear as users type and do not form a reliable programmatic name for all assistive technologies. It exposes neither field-level error relationships nor status announcements. The second version gives each input an associated label and marks invalid fields through `aria-invalid`. Its errors connect to the correct inputs with `aria-describedby`. A polite live status communicates the save result. Both use native controls, but the second contains more complete semantic and feedback behavior.

**Edge cases and effort.** The structured version handles whitespace-only names, invalid email addresses and the absence of the optional notification preference through explicit state. It also clears stale validation feedback after edits. Those behaviors must still be tested in a real browser. The first version has less source code and fewer conditions, but would require substantially more specification and rework before it could pass the intended acceptance criteria. No human review minutes or execution durations were instrumented, so a numerical speed comparison would be invented.

**Rules learned.** Requests for forms should name expected fields, constraints, persistence boundaries and the success condition. Accessibility should specify labels, error associations and keyboard support instead of assuming that native inputs alone are sufficient. Finally, an AI-produced success message is not evidence of an implemented operation: require tests, inspection and real browser verification before declaring completion.

Do not invent execution durations or pretend a staged comparison is an independently executed experiment.

## Published verification

- Vague CI: https://github.com/abudoxali/flyrank-opportunity-workflow/actions/runs/41341482433 — **success**.
- Structured CI: https://github.com/abudoxali/flyrank-opportunity-workflow/actions/runs/41341490422 — **success**.
- These CI runs do not test the settings-form acceptance criteria directly. The vague round deliberately fails validation, persistence, and label requirements even though it builds successfully.
