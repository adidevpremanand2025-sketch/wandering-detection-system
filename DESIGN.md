# Wandering Detection: Design Language

## Visual Theme
**loud, warm, human: a forest-and-lime poster with a grandfather at its heart.**
A student-built awareness site for families of people with dementia. Deep forest green carries the text and the dark bands; one electric lime acts as the only action color. Display type is Inter at weight 900, tightly tracked, shouted. Everything is flat: pill buttons, hairlines, soft green bands, no shadows, no gradients. The mascot is a cartoon grandfather (glasses, white hair, moustache) in place of any globe or stock imagery.
Influence: Wise's style reference (forest ink + lime voltage, pill shapes, block display type), adapted to a care context.

## Color Palette
Defined in `src/index.css` in two tiers. **Primitives** (`--palette-<hue>-<step>`, e.g. `--palette-lime-400`) hold the raw values and are never used by components. **Semantic** tokens (`--color-paper`, `--color-lime`, ...) point at primitives and are the only colors components use. The site always opens in **light**; dark mode re-points the same semantic tokens at other primitives and is available only via `data-theme="dark"` on `<html>` (it does not follow the system setting).

| Token | Light | Dark | Role |
|-------|-------|------|------|
| `paper` | #FFFFFF | #0B1A00 | Page |
| `soft` | #E2F6D5 (linen mist) | #163300 | Light green band, hover, image slot, slider track |
| `rule` | #E8EBE6 (fog) | #2A4A10 | Hairlines and card borders |
| `body` | #454745 (charcoal) | #D6DDD0 | Paragraph text (9.7:1 on paper) |
| `muted` | #6A6C6A (slate) | #A9B0A6 | Secondary text (5.3:1 on paper, 4.6:1 on soft) |
| `ink` | #163300 (forest ink) | #F1F7EC | Headings, pull quotes and outlines |
| `care` | #054D28 (spruce) | #9FE870 | Accent for text, strokes, markers, the cardigan |
| `lime` | #9FE870 | #9FE870 | **The action color**: CTA fills, active nav pill, slider thumb, headline on dark |
| `on-lime` | #163300 | #163300 | Text on a lime fill (9.5:1) in both modes |
| `trust` | #163300 | #054D28 | The dark band |
| `on-trust` | #FFFFFF | #FFFFFF | Text on the band |

Status tokens (`success`, `warning`, `danger`, `info` = Signal Blue #0B4C72, each with a `-soft` surface) exist but are unused; pair them with an icon or a word, never color alone.
**Lime is never text on a light background** (1.5:1). It is a fill, or text only on `trust` / dark mode.

## Typography
**Family:** Inter only (400, 500, 600, 700, 900), from Google Fonts. The proprietary Wise Sans is replaced by Inter Black.
**Scale (from the Wise reference), as Tailwind `--text-*` tokens with line height and tracking:**

| Step | Size | Line height | Tracking | Used for |
|------|------|-------------|----------|----------|
| sm | 14px | 1.55 | -0.005em | Small labels, nav on mobile |
| base | 16px | 1.5 | -0.006em | Captions |
| lg | 18px | 1.5 | -0.007em | **Body** |
| xl | 20px | 1.4 | -0.006em | Hero tagline |
| 2xl | 25px | 1.3 | -0.009em | Row titles, lede minimum |
| 3xl | 36px | 1.25 | -0.011em | Lede maximum, mobile pull quotes |
| 4xl | 45px | 1.1 | -0.011em | Section heading minimum, hero on mobile, pull quotes |
| 5xl | 61px | 1.1 | -0.015em | Section heading maximum, hero, interludes, involve headline |
| 6xl | 89px | 0.85 | -0.03em | Emphasised heading (the story section) |
| 7xl | 105px | 0.85 | -0.03em | Display (reserved, unused so far) |

- **Display / headings:** weight 900, tracking -0.03em, forest ink. `.h2` is clamp(4xl, 4.2vw, 5xl).
- **Ledes:** weight 500 (`.lede`). **Paragraphs:** weight 400, charcoal.
- Headings, pull quotes and `h1`-`h3` use `ink`; paragraphs use `body`. Set in the base layer so utilities such as `text-lime` still win.

## Components
| Component | Hierarchy | Purpose | Key variants |
|-----------|-----------|---------|--------------|
| Button (`Button.jsx`) | Primitive | The one call-to-action; always a pill | variant: solid (lime) / outline; tone: default / onTrust; size: md / lg |
| Grandpa (`Grandpa.jsx`) | Primitive | The mascot: the team's own reference illustration, cut out as a circle (`public/images/grandpa.png`). Already includes the lime disc, so it is placed directly, never inside another disc | none |
| Orbit (`Orbit.jsx`) | Pattern | The hero centrepiece: the mascot large, with six small routine items (reading glasses, mug, family photo, book, stopwatch, a friendly pink brain) circling him in faked 3D; has a pause control | playing / paused / reduced-motion still |
| Section (`ui.jsx`) | Component | Heading + content shell with a hairline top rule | tone: plain / soft; emphasis: off / on |
| Interlude | Component | One display sentence given a full pause | tone: plain / soft |
| Navbar | Pattern | Segmented pill nav (active = lime), outlined CTA, lime scroll-progress line | desktop / mobile menu |
| WalkDemo (`WalkDemo.jsx`) | Pattern | Grandpa walks the route; the usual route is drawn as a road (dark edge, lime surface, dashed centre line, a park with trees and a house); pill slider and Play/Pause. Lives in its own "Watch one walk" section right after the hero | playing / paused / noticed / home |
| Pill slider (`.pill-range`) | Primitive | Filled track (care) with a lime thumb | none |
| Story section | Pattern | Why the team started this: lede, paragraphs, large rounded quote band | none |
| Stat figure | Component | Sourced statistic with link; "6 in 10" lime figures | lead / grid |
| Comparison table | Pattern | Tools vs. ours | table (md+) / stacked list |
| Pipeline diagram | Pattern | How-it-works flow; the output node and travelling dot are lime | process / decision / end |
| Step timeline | Component | Methodology, roadmap | vertical / horizontal |
| Hardware card | Component | Photo or line-art in a 10px-radius slot | photo / SVG fallback |
| Involve band | Pattern | CTA on `trust`, lime headline, grandpa in a lime disc | none |

## Layout
**Grid:** single column in a `max-w-6xl` container (1152px); 12-col in the hero, involve band and footer.
**Gutters:** px-5, md:px-8. **Section padding:** py-16, md:py-24.
**Base unit:** 4px. **Breakpoints:** Tailwind defaults; the nav collapses below lg (1024).

## Shape and depth
Flat. **Pills (9999px)** for buttons, nav segments, tags and the slider. **`rounded-card` (10px)** for image slots and inputs, **`rounded-card-lg` (28px)** for large cards (the walk card, the quote bands). The Wise source also lists shadow tokens; they are deliberately not adopted. Hairlines (`rule`) and `soft` bands separate content; the dark `trust` band creates rhythm. No shadows, no gradients, no blur.

## Do's and Don'ts
### Do
- Use token colors only; components never reference `--palette-*`.
- Use lime as the single action color: one lime fill per view is usually enough.
- Keep text at AA or better (`ink`/`muted` on `paper`/`soft`, `on-lime` on `lime`, `on-trust` on `trust`).
- Keep display type at weight 900 and tight; do not soften it.
- Use `<Button>` for calls to action, `<Grandpa>` for the mascot; respect `prefers-reduced-motion`.
### Don't
- Put lime text on a light background, or two filled buttons side by side.
- Add shadows, gradients, decorative blur, or square-cornered buttons.
- Use stock illustration or a globe; the mascot is the grandfather.
- Show real patient data or imply clinical validation.

## Responsive
Mobile-first. The nav collapses to a Menu pill below lg; the hero stacks (headline, then the walk card); tables become stacked lists below md; the involve band hides the large grandpa below lg.

## Agent Prompt Guide
- Colors come from the semantic tokens in `src/index.css`; no new hex values, and components never use `--palette-*`.
- Display is Inter 900 with tight tracking; body is Inter 400 at 18px in charcoal; headings are forest ink.
- Sizes come from the Wise scale tokens (`text-sm` ... `text-7xl`); no arbitrary `text-[..]` except in SVG user units.
- Pills for actions, 28px radius for large cards, no shadows.
- One action color: lime fill with `on-lime` text. Accent text is `care`.
- The mascot is a raster picture (`public/images/grandpa.png`); orbiter icons in `Orbit.jsx` use fixed illustration colours (forest outline, lime and linen fills, pink only for the brain).
- Honest tone: a student prototype, not a medical device. Never overstate.

## Design System Version
**v2.5.0**: the usual route is drawn as a road.
- Token tiers: primitives (`--palette-*`) → semantic (`--color-*`).
- Versioning: Major = a semantic token is renamed or removed, or a component prop is removed. Minor = new token, variant or component. Patch = value tweaks.

### Changelog
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
