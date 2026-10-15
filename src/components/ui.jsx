import { createContext, useContext } from 'react'
import MapVignette from './MapVignette.jsx'

/** True inside <Trail>. Stop markers only draw there, so they never float without a trail. */
export const TrailContext = createContext(false)

/**
 * Section shell: a plain heading, then the content. No numerals or labels, so each
 * section is identified by what it says. `heading` may be a string or an array of strings
 * (joined as one sentence). `tone="soft"` gives the section a tinted band; `emphasis` makes the heading larger.
 *
 * On wide screens each section is a stop on the Trail: the content sits right of the trail gutter,
 * and a small marker on the trail lines up with the heading.
 */
export function Section({ id, heading, children, className = '', tone = 'plain', emphasis = false, vignette, aside }) {
  const text = Array.isArray(heading) ? heading.join('') : heading
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className={`border-t border-rule ${tone === 'soft' ? 'bg-soft' : ''} ${className}`}
    >
      <div className={`relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24 ${TRAIL_INSET}`}>
        <StopMarker />
        {/* a small map scene in the right margin, beside the heading (extra-wide screens only) */}
        {vignette && <MapVignette kind={vignette} className="right-8 top-24" />}
        {/* or a larger interactive piece in the same margin (extra-wide screens only) */}
        {aside && <div className="absolute right-8 top-12 z-10 hidden w-[18rem] xl:block">{aside}</div>}
        <h2
          id={`${id}-h`}
          className={`h2 ${emphasis ? 'max-w-4xl md:!text-6xl' : 'max-w-3xl'} ${vignette || aside ? 'xl:max-w-[40rem]' : ''}`}
        >
          {text}
        </h2>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  )
}

/** Content inset that leaves room for the trail gutter on wide screens (the trail and its detour live in it). */
export const TRAIL_INSET = 'lg:pl-40'

/** Where the trail runs, measured from the content box's left edge (matches Trail.jsx). */
export const TRAIL_X = 40

/** A stop on the trail, aligned with the section heading. Decorative. */
export function StopMarker() {
  const onTrail = useContext(TrailContext)
  if (!onTrail) return null
  return (
    <span
      aria-hidden="true"
      className="absolute top-[7.75rem] z-20 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-route bg-paper lg:block"
      style={{ left: `calc(2rem + ${TRAIL_X}px)` }}
    />
  )
}
