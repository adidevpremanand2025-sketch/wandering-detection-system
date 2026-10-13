# Wandering Detection: Design Language

## Visual Theme
**The neighbourhood map: a walking map, one usual route, and the moment someone strays from it.**
A student-built awareness site for families of people with dementia, and for the faculty who assess it. Everything in the subject is about routes, so the site borrows the vernacular of a walking map: cool map paper, faint contour lines, a park-green usual route, and one footpath-magenta line that appears only where someone strays or is noticed. The hero *is* the walk (the interactive WalkDemo). The rest of the page is one walk too: a trail runs down the left gutter, each section is a stop on it, it strays once (at the "Everyone moves differently" interlude), is noticed, and ends at home beside the Get involved band.
Legibility for older readers comes before style: 19px body, high contrast, a typeface built for low vision.

## Color Palette
Defined in `src/index.css` in two tiers. **Primitives** (`--palette-<hue>-<step>`) hold raw values and are never used by components. **Semantic** tokens (`--color-paper`, `--color-stray`, ...) are the only colors components use. The site always opens in **light**; dark mode re-points the same semantic tokens and is available only via `data-theme="dark"` on `<html>`.

| Token | Light | Dark | Role |
|-------|-------|------|------|
| `paper` | #F3F5F2 map paper | #0F1820 | Page |
| `soft` | #E4EBE3 | #172431 | Tinted band, hover, image slot |
| `rule` | #D3DCD2 | #2B3B4A | Hairlines, the trail ahead |
| `body` / `ink` | #1B2B3A night ink (13.2:1) | #EAF0F2 (15.6:1) | Paragraphs and headings |
| `muted` | #4F5D69 (6.2:1 paper, 5.6:1 soft) | #A9B6C1 (8.7:1) | Secondary text |
| `route` | #2F6E4E park green (5.5:1) | #7CC29B (8.6:1) | The usual route, calm states, stop markers, links on hover |
| `route-soft` | #CFE3D4 | #1D3A2B | The park inside the usual route; the "Our system" row |
| `stray` | #C2185B footpath magenta (5.4:1) | #FF7FAE (7.6:1) | **Only** where something strays or is noticed (including the "6 in 10" people who wander), the emergency line, and the one primary button per view. Never a focus ring |
| `stray-soft` | #F9E1EA | #3D1426 | The explainable-alert node |
| `on-stray` | #FFFFFF (5.9:1) | #0F1820 | Text on a stray fill |
| `contour` | #D7CDB5 | #3A3A2E | Decorative contour lines. **Never text** (1.4:1) |
| `trust` / `on-trust` | #1B2B3A / #F3F5F2 | #172431 / #EAF0F2 | The dark Get involved band |

## Typography
- **Atkinson Hyperlegible Next** (400, 700, 800), from the Braille Institute, for all reading text and headlines. Headlines are 800 with tight tracking (-0.02 to -0.03em). Body is 400 at 19px.
- **Overpass** (700, 800), from road-sign lettering, **only** for wayfinding marks: map labels ("Usual route", "Home", "Noticed early"), the walk clock, step markers, the trail's "Noticed", registration numbers. Use the `.sign` class or `fontFamily: var(--font-sign)` in SVG.

**Scale** (classical, Bringhurst), as Tailwind `--text-*` tokens:

| Step | Size | Line height | Used for |
|------|------|-------------|----------|
| sm | 15px | 1.5 | Step markers, small labels |
| base | 17px | 1.5 | Captions, sources, footer |
| lg | 19px | 1.6 | **Body** |
| xl | 21px | 1.45 | Hero tagline, objectives, emergency line |
| 2xl | 24px | 1.3 | Row titles, lede minimum |
| 3xl | 30px | 1.2 | Lede maximum, pull quotes on mobile |
| 4xl | 40px | 1.08 | Section heading minimum, interludes on mobile |
| 5xl | 54px | 1.02 | Section heading maximum, interludes |
| 6xl | 72px | 0.98 | Emphasised heading (the story section) |

`.h2` is clamp(4xl, 4vw, 5xl), weight 800. `.lede` is clamp(2xl, 2.2vw, 3xl), weight 400.

## Components
| Component | Purpose | Variants |
|-----------|---------|----------|
| Button (`Button.jsx`) | The one call-to-action, shaped like a small sign (6px corners) | variant: solid (stray) / outline; tone: default / onTrust; size: md / lg |
| Hero (`Hero.jsx`) | Headline and actions left (5 cols); the walk map right (7 cols); contour paper behind | none |
| WalkDemo (`WalkDemo.jsx`) | The walk: park-green usual route, today's line in ink that turns magenta the moment it leaves the route, the "Noticed early" ring, Home. Plays once on load; slider and Play/Pause | playing / paused / leaving / noticed / home |
| Contours (`Contours.jsx`) | Static topographic lines, the map's paper | none |
| Trail (`Trail.jsx`) | Page-long route in the left gutter (lg+), walked as you scroll; one magenta detour at `strayAt`; a house at `homeAt` | reduced motion: shown whole |
| Section (`ui.jsx`) | Heading + content, a stop marker on the trail, `TRAIL_INSET` gutter | tone: plain / soft; emphasis |
| Interlude | One sentence given a full pause; no entrance animation | tone: plain / soft; optional `id` |
| PullQuote (in `Sections.jsx`) | Large quote with a park-green left rule; no box | none |
| Navbar | Logo mark (green route, magenta stray), plain text links (active = bold ink with a green underline), outlined CTA, green scroll line | desktop / mobile menu |
| Pipeline (`Architecture.jsx`) | How it works as one always-complete top-to-bottom list: every step's plain explanation is visible (no hover or tap needed), the decision splits Yes (magenta rule, alert and explainable alert) and No. A green dot rides the connector line as you scroll, in the gutter, never on text; absent under reduced motion | step / decision / branch |
| Learns (`Learns.jsx`) | One person's usual day as a green band with today drawn against it, noticed at 2pm. Synthetic data generated by formulas in the file and labelled as illustration on screen. Text is HTML so it stays readable on a phone | none |
| Step timeline | Roadmap: the only numbered list, because it is a sequence | vertical / horizontal |
| RoutineOrbit (`RoutineOrbit.jsx`) | The showpiece: mascot centred, six routine items (side-view brain, glasses, mug, photo, book, stopwatch) circling in faked 3D; every 11s one stops circling, parks clearly outside its orbit for about 4s with a magenta ring and the label "Off its usual orbit" attached, then returns. Beside the closing interlude | playing / paused / reduced-motion still |
| Grandpa (`Grandpa.jsx`) | The mascot, the team's own illustration (`public/images/grandpa.png`, lime disc baked in). He is the walker on the map and waves from the Involve band | none |

## Layout
- `max-w-6xl` container (1152px), gutters px-5 / md:px-8, section padding py-16 / md:py-24.
- On lg+ sections inside the Trail are inset by `TRAIL_INSET` (`lg:pl-36`) so the trail and its detour fit in the gutter. The trail runs at `TRAIL_X` (40px) from the content box's left edge.
- Text is left-aligned throughout. Lines stay under ~70 characters (`max-w-2xl`/`max-w-3xl`).

## Shape and depth
Flat. 6px (`rounded-card`) for buttons and image slots, 10px (`rounded-card-lg`) for the map. Pills only for dots and the slider. No shadows, no gradients, no blur, no boxed cards: content sits on the paper, separated by hairlines and tinted bands.

## Motion
Three earned moments, plus one deliberate showpiece. The hero walk plays once on load (and on request). The trail is walked as you scroll and strays once. The showpiece is the routine orbit beside the closing line: the mascot with six routine items circling him, one drifting off its orbit every 11s and being noticed, over a faint twinkle field. No per-section fade-ups. The pipeline's draw-in and travelling packet are tied to scroll. Everything respects `prefers-reduced-motion`; the orbit has a Pause button that stops all of its motion, and runs only while on screen.

## Do's and Don'ts
### Do
- Use semantic tokens only; never `--palette-*` in components.
- Keep magenta meaning "strayed / noticed / act now". One solid magenta button per view.
- Keep body at 19px and text at AA or better. Focus rings are ink.
- Use Overpass only for wayfinding marks.
### Don't
- Use magenta as decoration, or contour as text.
- Add shadows, gradients, boxed cards, all-caps labels, or numbering on lists that are not sequences.
- Show real patient data or imply clinical validation.
- Write unbuilt capability in the present tense ("learns", "alerts"): say "designed to", "plan", or "example".
- State a fact the team has not confirmed (data storage, access, approvals). Say it is not settled yet.

## Responsive
Mobile-first. The nav collapses to a Menu button below lg; the hero stacks (headline, then the map); the trail and stop markers appear only on lg+; tables become stacked lists below md; the Involve band hides the large grandpa below lg.

## Agent Prompt Guide
- Colors from the semantic tokens in `src/index.css`; no new hex values.
- Atkinson Hyperlegible Next 800 for headings, 400 at 19px for body; Overpass for map labels only.
- Magenta (`stray`) only for strays, alerts, the emergency line and the primary action.
- Honest tone: a student prototype, not a medical device. Never overstate.
- Dark mode is reachable only by setting `data-theme="dark"` on `<html>`; there is no toggle.

## Design System Version
**v3.3.0**: the neighbourhood map, after the second critique.
- Token tiers: primitives (`--palette-*`) → semantic (`--color-*`).
- Versioning: Major = a semantic token is renamed or removed, or a component prop is removed. Minor = new token, variant or component. Patch = value tweaks.

### Changelog
#### v3.3.0
- Changed: the pipeline is a static, always-complete list (no scroll-drawn outlines, no hover-only explanations); the travelling dot moved onto the connector line.
- Added: `Learns` (synthetic "usual day" chart) in place of the Objectives list. "How it works" in the nav now targets `#learns`.
- Changed: hero reorders on phones (headline, status, emergency line, then the map, then the rest); the walk is 10s; contours sit behind the map only.
- Changed: the trail's stray is larger and the "Noticed" label bigger; below lg a plain left rule stands in, with the stray as a magenta stretch of it.
- Changed: orbit drifter stops, parks outside the orbit and carries its label; the "6 in 10" pictogram is static (six solid, four outline); hardware parts are plain rows with no placeholder art; footer text no longer runs together; interlude spacing tightened.
- Removed: the Objectives section (`objectives` is still exported from `content.js`, unused).
#### v3.2.0
- Added: `RoutineOrbit` (the orbit showpiece), `Interlude` `visual` prop, CSS ambience (`.spark`, `.ring-slow`, `.bob`) that pauses with the Pause button and when off screen.
- Changed: `WalkDemo` writes its position straight to the SVG and slider each frame (no per-frame React re-render); the pause label is a fixed "Pause animation" with a pressed state, and the control is absent under reduced motion.
- Changed: the brain icon is a side-view brain (cerebrum with folds, cerebellum, stem) instead of a smooth blob with a face.
#### v3.1.0
- Changed: copy pass from the three-reviewer critique. Hero now carries a status line ("A student prototype. Not for sale yet") and the emergency line. Unbuilt capability is written as design or plan. The ethics storage line and the volunteer call say plainly what is not settled or open yet. Example alert text now matches what the map shows ("off the usual route, and slower than usual for 2pm") and is labelled as an example everywhere, including the live status.
- Changed: statistics cut from eight to four, with each figure pulled out at display size and one source line per source (Alzheimer's Association figures labelled as US guidance). The literature table's third column is "What it cannot do", and the "Our system" row states a real limit.
- Changed: ethics and team sit before the closing ask, so the trail now ends at home beside the Get involved band; stop markers draw only inside `Trail` (`TrailContext`).
- Changed: pipeline nodes enlarged; the packet ends at the top of the last node; click keeps a node selected instead of toggling it off; "YES/NO" are "Yes/No"; focus ring is ink.
- Changed: walk map labels enlarged so they stay legible when the map scales down; the example alert detail moved to real text beneath the map. Navbar has no active item over the hero, Escape closes the mobile menu, no backdrop blur. Hero contours sit behind the map only.
- Removed: the Methodology section (it restated the pipeline; its unique steps are in the roadmap). `methodology` is still exported from `content.js`, unused.
#### v3.0.0
- Changed: palette is map paper, night ink, park green and footpath magenta (`route`, `route-soft`, `stray`, `stray-soft`, `on-stray`, `contour` added; `care`, `lime`, `on-lime` and the unused status colours removed).
- Changed: type is Atkinson Hyperlegible Next (reading and headlines) with Overpass for wayfinding marks; body is 19px on a classical scale.
- Changed: the walk demo is the hero; `Orbit` is removed. Nav "Why" covers only `#problem`.
- Added: `Trail`, `Contours`, `StopMarker`, `TRAIL_INSET`/`TRAIL_X`, `PullQuote`.
- Changed: `Button` is a 6px sign (magenta solid), not a pill; the Navbar is plain links.
- Removed: the brief Dala-style particle field, word-mask headline reveals and per-section fade-ups (never shipped in a commit).
#### v2.5.0
- Changed: the walk demo's usual route is a road (ink edge, lime surface, dashed centre line) around a green park with fluffy trees, the house as the single Home marker (with its label and a footpath) beside the road start and finish, and a "Usual route" tag, instead of a grey dashed blob.
#### v2.4.0
- Changed: `Grandpa` now uses the team's reference illustration directly (cropped to a circle, 858px, from a 427px source) instead of a hand-drawn redraw. The `wave` prop is gone: he always waves.
- Changed: the orbiter formerly drawn as a cloud is a pink brain with a face (pink is the only off-palette colour, and only for this item).
- Note: swap `public/images/grandpa.png` for a higher-resolution export of the same art when available.
#### v2.3.0
- Changed: `Grandpa` redrawn to match the team's reference (bald with white tufts, round green glasses, big smile, V-neck cardigan, waving).
- Changed: orbiters are now glasses, mug, family photo, book, stopwatch and a friendly cloud (flat, forest outline, lime/linen fills), replacing the band, pin, home and alert icons. One turn takes 30 s.
#### v2.2.0
- Added: `Orbit` hero (grandpa with the wearable band, pin, home and alert circling in 3D, with a pause button). The hero is now centred with the headline first.
- Changed: the walk demo moved out of the hero into its own section (`WalkDemo.jsx`); the nav "Why" item also covers it.
- Motion note: the orbit is decorative (aria-hidden), turns once per 26 s, and holds a still pose under reduced motion.
#### v2.1.0
- Changed: type scale is now the Wise scale (14/16/18/20/25/36/45/61/89/105px, with per-step line height and tracking) instead of the 1.2 ratio; body is 18px.
- Added: `body` token (charcoal, paragraphs); headings stay `ink`. `muted` is Wise slate #6A6C6A; `info` is Signal Blue #0B4C72.
- Added: `rounded-card` / `rounded-card-lg` radius tokens (replace arbitrary 10px / 28px).
- Added: `tokens/design-tokens.json` (W3C DTCG export of the tokens in use).
- Not adopted from the source: `wise-sans` (Inter Black substitutes), shadows, Pebble (#868685 fails AA as text), the monospace/sans-serif placeholders.
#### v2.0.0
- Changed: palette is forest ink + lime voltage (new `lime` and `on-lime` tokens; `care` is now spruce; `soft` is linen mist; `trust` is forest). Dark mode re-pointed.
- Changed: Inter only; display weight 900; the WebGL hero threads and Fraunces/Nunito are removed (flat by design).
- Changed: `Button` is a pill (lime solid, outlined secondary); Navbar is a segmented pill nav.
- Added: `Grandpa` mascot (hero walker, involve band), `.pill-range` slider, rounded 28px cards.
- Removed: `Threads` and the `ogl` dependency.
- Not mirrored in Figma yet: all of the above (the Figma file still shows the v1.2.0 teal system).
#### v1.2.0
- Added: `Section` `emphasis`; Navbar grouped into six items with a persistent CTA; audience-first hero.
#### v1.1.0
- Added: `Interlude`.
#### v1.0.0
- Initial: primitive and semantic tiers, status colors, dark mode, 1.2 type scale, `Button`.

## Figma Library
Built from the v1.2.0 code via PluginOS (file "wandering detection system"). **It no longer matches the code**: the colour variables, text styles and components still show the teal / Fraunces / Nunito system. Code is the source of truth until the Figma file is re-synced.
