# FE-05 — Accessible component comparison

**Status: custom components drafted; independent browser audit and shadcn source comparison pending.**

## Hand-built implementation

| Pattern | Source | Semantics / behavior |
|---|---|---|
| Modal | `src/playground/Dialog.tsx` | `role=dialog`, `aria-modal`, label from heading, initial focus, Tab and Shift+Tab cycling, Escape close, restore focus |
| Tabs | `src/playground/Tabs.tsx` | tablist/tab/tabpanel linkage, roving tabIndex, ArrowLeft/Right, Home/End |
| Disclosure | `src/playground/Disclosure.tsx` | native button, `aria-expanded`, `aria-controls`, controlled panel, Enter and Space via native button |

## Potential gaps to verify / improve

- Custom dialog inerts its application root and portals to document.body, but still needs an independent AT audit of inert/portal interoperability from assistive technology. shadcn/Radix dialogs provide further modality/dismissal abstractions. Compare actual generated code, then revisit focus scope, stacking, and body scroll locking.
- Focus trap lists nodes on every keyboard event, but may need additional containment for programmatically moved focus, `iframe`, hidden elements, and dynamically disabled controls.
- Tabs use automatic activation for instant content. A slower, asynchronous panel would need manual activation to comply with keyboard usability guidance.
- Test with NVDA/VoiceOver and actual browsers, not only synthetic jsdom events.

## shadcn source comparison — pending evidence

The assignment requires installing shadcn/ui and *reading the generated dialog and tabs*. No claim that code was generated or installed here. Use the official documentation and actual generated files to record at least two concrete, source-backed implementation gaps with file/line evidence.

Official refs: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ , https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ , https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ , https://ui.shadcn.com/docs/installation/vite .
