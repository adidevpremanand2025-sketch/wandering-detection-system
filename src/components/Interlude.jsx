import { motion, useReducedMotion } from 'framer-motion'

/**
 * Interlude: one sentence, given a whole pause between dense sections.
 *
 *   tone  'plain' | 'soft'   page background, or the soft band
 *
 * Keep it to one true sentence (reuse a line already on the page). Fades in once;
 * shows instantly under prefers-reduced-motion.
 */
export default function Interlude({ tone = 'plain', children }) {
  const reduce = useReducedMotion()
  return (
    <section className={`border-t border-rule ${tone === 'soft' ? 'bg-soft' : ''}`}>
      <div className="mx-auto flex min-h-[55svh] max-w-6xl items-center px-5 py-16 md:min-h-[70svh] md:px-8">
        <motion.p
          className="max-w-4xl font-serif text-4xl font-black leading-[1.02] tracking-[-0.03em] text-balance md:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {children}
        </motion.p>
      </div>
    </section>
  )
}
