import { TRAIL_INSET } from './ui.jsx'
import MapVignette from './MapVignette.jsx'

/**
 * Interlude: one sentence, given a whole pause between dense sections.
 *
 *   tone    'plain' | 'soft'   page background, or the tinted band
 *   id      optional; the Trail uses it to place its one detour beside this pause
 *   visual  optional element shown beside the sentence on wide screens, below it on narrow ones
 *
 * Keep it to one true sentence (reuse a line already on the page). No entrance animation:
 * the space around it is the emphasis.
 */
export default function Interlude({ tone = 'plain', id, visual, vignette, children }) {
  return (
    <section id={id} className={`relative border-t border-rule ${tone === 'soft' ? 'bg-soft' : ''}`}>
      {/* on narrow screens (no trail) the one stray is a magenta stretch of the left rule */}
      {id === 'stray' && <span aria-hidden="true" className="absolute inset-y-[22%] left-3 z-20 w-[3px] bg-stray lg:hidden" />}
      <div
        className={`relative mx-auto grid min-h-[34svh] max-w-6xl items-center gap-10 px-5 py-14 md:min-h-[42svh] md:px-8 ${TRAIL_INSET} ${
          visual ? 'lg:grid-cols-2' : ''
        }`}
      >
        {vignette && <MapVignette kind={vignette} className="right-8 top-1/2 -translate-y-1/2" />}
        <p className={`max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.022em] text-balance text-ink md:text-5xl ${vignette ? 'xl:max-w-[40rem]' : ''}`}>
          {children}
        </p>
        {visual}
      </div>
    </section>
  )
}
