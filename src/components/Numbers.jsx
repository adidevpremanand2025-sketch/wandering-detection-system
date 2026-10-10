import { motion, useReducedMotion } from 'framer-motion'
import { Section } from './ui.jsx'
import { numbers } from '../content.js'

function Source({ source, url }) {
  return (
    <p className="mt-1 text-base">
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block py-2 text-muted underline underline-offset-4 hover:text-care">
        {source}
      </a>
    </p>
  )
}

// Ten people, six filled: the "six in 10" figure from the lead stat, drawn to scale.
function SixInTen() {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 320 44" className="mb-6 h-auto w-full max-w-md" role="img" aria-label="6 out of 10 people filled in">
      {Array.from({ length: 10 }, (_, i) => {
        const filled = i < 6
        return (
          <motion.g
            key={i}
            transform={`translate(${i * 32} 0)`}
            initial={reduce ? false : { opacity: filled ? 0.25 : 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 0.6, delay: filled ? 0.3 + i * 0.2 : 0 }}
          >
            <circle cx="12" cy="7" r="6" fill={filled ? 'var(--color-lime)' : 'none'} stroke="var(--color-ink)" strokeWidth="1.75" />
            <path d="M3 43 V25 a9 9 0 0 1 18 0 V43 Z" fill={filled ? 'var(--color-lime)' : 'none'} stroke="var(--color-ink)" strokeWidth="1.75" />
          </motion.g>
        )
      })}
    </svg>
  )
}

export default function Numbers() {
  const { lead, stats } = numbers
  return (
    <Section id="numbers" heading={numbers.heading} tone="soft">
      <figure className="max-w-4xl">
        <SixInTen />
        <p className="font-serif text-3xl leading-tight md:text-4xl md:leading-[1.15]">{lead.text}</p>
        <Source source={lead.source} url={lead.url} />
      </figure>
      <ul className="mt-14 grid gap-x-12 md:grid-cols-2">
        {stats.map((st) => (
          <li key={st.text} className="border-t border-ink/20 py-6">
            <p className="font-serif text-xl leading-snug md:text-2xl">{st.text}</p>
            <Source source={st.source} url={st.url} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
