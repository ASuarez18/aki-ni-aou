# Aki ni Aou · 秋に会おう

An autumn reimagining of Natsu ni Aou, built with **Next.js App Router, React, TypeScript, Tailwind CSS v4, and Lucide**. Uses the actual Next.js build, not a compatibility runtime.

## Run

Requires Node.js 22.13+.

```sh
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` creates a static export in `out/`, deployable to any static host. With this static-export configuration, serve `out/` rather than using `next start`.

## MVC structure

- `models/reunion.ts`: original milestones, days-together and timezone-aware calendar countdown rules.
- `models/session.ts`: original-answer verification and session validation.
- `controllers/useSessionController.ts`: login, route gating, session expiry, logout.
- `views/LoginView.tsx`: dedicated profile + secret-question login screen.
- `controllers/useReunionController.ts`: timer lifecycle, reunion edits, browser persistence.
- `views/ReunionView.tsx`: presentation and form bindings.
- `views/components/Reveal.tsx`: reusable IntersectionObserver scroll reveal.
- `app/`: thin Next.js route entries, metadata, layout, brand styles.

Views consume controller state; controllers use models. Next.js routes compose the views. This adapts MVC to React without mixing date logic into UI components.

## Original concepts retained

Sa-chan / Ku-chan selection, bear and sakura tree, reunion countdown, time perspectives, first-met / first-step / official milestones. Adds Vancouver and Izumo clocks. All substantive sections reveal as they enter the viewport. JavaScript is required for the restored login flow and live counters; reduced-motion settings disable reveal motion.

## Configuration and privacy

The default reunion is **November 2, 2026, 12:00 JST**, explicitly labeled tentative, not a confirmed arrival. Set the actual time with the settings button, or change `DEFAULT_REUNION` in the model. Date edits and profiles stay in localStorage on the current device; they do not synchronize. Original milestone display dates are preserved, fixing the original one-day offset in calculations.

The original secret-question flow is restored at `/`: select Sa-chan or Ku-chan, answer the original question, then enter `/home/`. An existing valid session returns to the dashboard; logout clears it, and a direct `/home/` visit without a session returns to login. Sessions expire after 30 days and synchronize logout between tabs. The original answer is preserved as a SHA-256 digest in `models/secret.ts`; no plaintext answer or source `.env` is shipped. Existing `aki-profile` preferences from v1 do not count as a logged-in session.

This preserves the original **client-side personal gate**, not server authentication. A technical visitor can bypass client-side guards; hashing the answer does not make bundled content private. The hosted Site remains owner-private. Independently hosting sensitive data requires server-side sessions and authorization.

The dashboard now includes a dedicated days-together counter from February 25, 2026, calendar months/weeks/days/hours/minutes/seconds, all five total-time perspectives including live seconds, and clocks showing seconds. Counts use elapsed calendar days (the start date is day zero).

Tailwind is compiled with `@tailwindcss/postcss`; JSX uses utilities and reusable components use Tailwind `@apply`. The locally served `public/paper-grain.svg` provides a tiled paper texture with subtle fibers. Falling autumn leaves and scroll reveals respect reduced-motion preferences.

## Verify

```sh
npm test
npm run typecheck
npm run build
```

## Visual identity

Ivory #FAF6EE, ink #42352D, rust #A65133, gold #B79651, sage #727D62. System serif and sans-serif fonts avoid external font dependencies. Responsive layouts support narrow screens. Native accessible date dialog, keyboard focus, semantic navigation, and motion preferences are included.

Hero asset: `public/autumn-bear.png`, created using the built-in image-generation tool from the supplied original bear/tree logo. Prompt: preserve the sleeping brown bear and curved cherry tree branch; reinterpret as an autumn Japanese storybook watercolor with russet, ochre and gold cherry leaves, a few symbolic sakura blossoms, warm ivory paper, fine ink linework, no text or circular border.
