# FE-03 — AI-assisted workflow drill

**Status: structured round implemented as a draft. Both code-variant branches exist locally from the same baseline; independent fresh AI sessions, remote links, runnable verification and measurement are still pending.**

## Feature

A small settings form with display name, email, notification preference, inline validation, and a local save confirmation.

## Round one — vague prompt

> Make me a settings form.

Instructional comparison target only. Do **not** present an output created in the same coding session as an independent AI round.

## Round two — precise prompt

> In `src/components/SettingsForm.tsx`, create a controlled React + TypeScript settings form with display name (minimum two characters), RFC-style practical email validation, and an opt-in checkbox. Never use `any`. Use semantic `label`/`htmlFor`, `aria-invalid`, and `aria-describedby` for errors. Persist only valid data to `localStorage` and show a polite `role=status` confirmation. The form must be keyboard-operable and provide inline errors. Verify by running TypeScript, tests, and a production build, and report commands/results. Do not modify unrelated routes.

## Evidence checklist

- [x] Create a literal vague-prompt implementation on local branch `fe03/vague` (fresh-context independence not evidenced).
- [x] Create a structured implementation from the same base commit on local branch `fe03/structured` (fresh-context independence not evidenced).
- [ ] Confirm both branches launch and record commands + outcomes.
- [ ] Diff both implementations, including accessibility, correctness, edge cases, review effort, and time (if measured).
- [ ] Replace this checklist with an evidenced 300–500 word write-up including at least one real AI mistake.
- [ ] Update `CLAUDE.md` with three rules grounded in the measured diff.

## Code-level comparison (source review, 362 words)

This exercise compared two settings-form implementations built from the same local Git baseline. The purpose was to see what a vague feature request leaves undefined versus a specification with field semantics, data constraints and verification requirements. Both implementations are inspectable with `git diff fe03/vague fe03/structured -- src/components/SettingsForm.tsx`. These are genuine different code variants, but their generation was not conducted in two isolated external AI sessions, and runtime evidence remains outstanding.

**Correctness.** The first version displays two inputs and a Save button. Clicking Save always triggers a browser alert, even when both fields are blank. Nothing is stored. This is a concrete mistake: the interface claims the operation succeeded without implementing persistence or validation. The structured version requires a display name with at least two non-whitespace characters and an email matching a practical address pattern. Invalid entries produce inline field messages, and only a valid submission writes a JSON settings object into browser-local storage. The saved confirmation appears only after that write.

**Accessibility.** The first version relies on placeholder text instead of explicit labels. Placeholders disappear as users type and do not form a reliable programmatic name for all assistive technologies. It exposes neither field-level error relationships nor status announcements. The second version gives each input an associated label and marks invalid fields through `aria-invalid`. Its errors connect to the correct inputs with `aria-describedby`. A polite live status communicates the save result. Both use native controls, but the second contains more complete semantic and feedback behavior.

**Edge cases and effort.** The structured version handles whitespace-only names, invalid email addresses and the absence of the optional notification preference through explicit state. It also clears stale validation feedback after edits. Those behaviors must still be tested in a real browser. The first version has less source code and fewer conditions, but would require substantially more specification and rework before it could pass the intended acceptance criteria. No human review minutes or execution durations were instrumented, so a numerical speed comparison would be invented.

**Rules learned.** Requests for forms should name expected fields, constraints, persistence boundaries and the success condition. Accessibility should specify labels, error associations and keyboard support instead of assuming that native inputs alone are sufficient. Finally, an AI-produced success message is not evidence of an implemented operation: require tests, inspection and real browser verification before declaring completion.

Do not invent execution durations or pretend a staged comparison is an independently executed experiment.
