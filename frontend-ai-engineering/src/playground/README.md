# FE-05 — Interactive playground

The hand-built modal (`Dialog.tsx`), tabs (`Tabs.tsx`) and disclosure (`Disclosure.tsx`) live in this folder. The app renders them at `/playground`; `components.test.tsx` contains the keyboard test source. Do not treat generated shadcn components as hand-built implementations.

Run `npm test` and perform manual keyboard and screen-reader verification before claiming completion.

Dialog background containment uses a portal to `document.body`, while the application root is marked inert during the modal. Restore behavior and screen reader compatibility must be checked in real browsers.
