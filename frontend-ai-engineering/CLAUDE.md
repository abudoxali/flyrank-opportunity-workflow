# StudyFlow project rules

- React 18 + TypeScript strict. Never use `any` in component props.
- Forms must use controlled inputs, semantic labels, inline validation, and keyboard-operable controls.
- All UI components must meet relevant WAI-ARIA Authoring Practices; test Tab, Shift+Tab, Escape, and arrow keys for composite widgets.
- Keep custom accessibility components in `src/playground` free of UI component libraries. Do not silently replace hand-built components with generated shadcn code.
- Keep routes declared in `src/App.tsx`; add an accessible placeholder route before adding a complex feature.
- Run `npm test`, `npm run typecheck`, and `npm run build` before release; record exact results rather than claiming success without execution.
- Keep data deterministic in development; never place API keys or credentials in the repository.
- Update the existing STATUS.md, not a second status file, after an implementation run.
