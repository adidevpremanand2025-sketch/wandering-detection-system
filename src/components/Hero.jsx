import { motion, useReducedMotion } from 'framer-motion'
import Button from './Button.jsx'
import Orbit from './Orbit.jsx'
import { site, team } from '../content.js'

export default function Hero() {
  const reduce = useReducedMotion()
  const list = team.map((t) => t.name)
  const names = list.length > 1 ? `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}` : list[0]
  // One short entrance for the text.
  const enter = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay, ease: [0.22, 0.61, 0.36, 1] } }

  return (
    <section id="top" className="relative overflow-hidden pb-6">
      <div className="mx-auto max-w-6xl px-5 pt-14 text-center md:px-8 md:pt-20">
        <motion.p {...enter(0)} className="inline-block rounded-full bg-soft px-4 py-1.5 text-sm font-semibold">
          Wandering Detection System for Dementia / Alzheimer&rsquo;s Patients
        </motion.p>
        <motion.h1
          {...enter(0.2)}
          className="mx-auto mt-6 max-w-5xl font-serif text-4xl font-black leading-[0.95] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
        >
          {site.heroLine}
        </motion.h1>
        <motion.div {...enter(0.4)}>
          <p className="mx-auto mt-7 max-w-xl text-xl leading-relaxed">{site.tagline}</p>
          <p className="mx-auto mt-3 max-w-xl text-2xl font-bold leading-tight text-care">{site.quiet}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <Button href="#involve" size="lg">Get involved</Button>
            <a href="#architecture" className="inline-block py-3 font-semibold underline underline-offset-4 hover:text-care">How it works</a>
          </div>
        </motion.div>
      </div>

      <Orbit />

      <p className="mx-auto mt-4 max-w-6xl px-5 text-center text-muted md:px-8">
        <span className="font-bold text-ink">{names}</span>
        <span>. Three students at {site.college}, building this because families need it.</span>
      </p>
    </section>
  )
}
