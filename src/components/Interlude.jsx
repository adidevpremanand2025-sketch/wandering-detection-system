import { TRAIL_INSET } from './ui.jsx'

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
export default function Interlude({ tone = 'plain', id, visual, children }) {
  return (
    <section id={id} className={`border-t border-rule ${tone === 'soft' ? 'bg-soft' : ''}`}>
      <div
        className={`mx-auto grid min-h-[50svh] max-w-6xl items-center gap-10 px-5 py-16 md:min-h-[60svh] md:px-8 ${TRAIL_INSET} ${
          visual ? 'lg:grid-cols-2' : ''
        }`}
      >
        <p className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.022em] text-balance text-ink md:text-5xl">
          {children}
        </p>
        {visual}
      </div>
    </section>
  )
}
