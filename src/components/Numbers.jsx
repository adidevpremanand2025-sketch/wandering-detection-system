import { Section } from './ui.jsx'
import { numbers } from '../content.js'

function SourceLink({ source, url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block py-2 text-muted underline underline-offset-4 hover:text-route">
      {source}
    </a>
  )
}

// Ten people, six filled: the "six in 10" figure from the lead stat, drawn to scale.
// Filled means "strayed", so these are the one place magenta marks people. Static on purpose:
// six solid, four outline, with no fade that could be misread as a fraction.
function SixInTen() {
  return (
    <svg viewBox="0 0 320 44" className="mb-6 h-auto w-full max-w-md" role="img" aria-label="6 out of 10 people filled in">
      {Array.from({ length: 10 }, (_, i) => {
        const filled = i < 6
        return (
          <g key={i} transform={`translate(${i * 32} 0)`}>
            <circle cx="12" cy="7" r="6" fill={filled ? 'var(--color-stray)' : 'none'} stroke="var(--color-ink)" strokeWidth="1.75" />
            <path d="M3 43 V25 a9 9 0 0 1 18 0 V43 Z" fill={filled ? 'var(--color-stray)' : 'none'} stroke="var(--color-ink)" strokeWidth="1.75" />
          </g>
        )
      })}
    </svg>
  )
}

export default function Numbers() {
  const { lead, stats } = numbers
  // one link per distinct source, not one under every sentence
  const sources = [...new Map(stats.concat(lead).map((s) => [s.url, s])).values()]
  return (
    <Section id="numbers" heading={numbers.heading} tone="soft">
      <figure className="max-w-4xl">
        {/* the one figure the whole page turns on, at the size it deserves; the sentence below carries it for screen readers */}
        {/* set in the sign face: Atkinson's slashed zero would read as a "no" symbol at this size */}
        <p
          aria-hidden="true"
          className="text-[clamp(5.5rem,17vw,12rem)] leading-[0.85] tracking-[-0.04em] text-stray"
          style={{ fontFamily: 'var(--font-sign)', fontWeight: 800 }}
        >
          6 in 10
        </p>
        <div className="mt-6"><SixInTen /></div>
        <p className="text-3xl font-bold leading-tight tracking-[-0.015em] md:text-4xl md:leading-[1.12]">{lead.text}</p>
      </figure>
      <dl className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {stats.map((st) => (
          <div key={st.figure} className="border-t-2 border-ink pt-4">
            <dt className="text-4xl font-extrabold tracking-[-0.02em] md:text-5xl">{st.figure}</dt>
            <dd className="mt-3 max-w-md">{st.text}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-10 text-base text-muted">
        Sources:{' '}
        {sources.map((s, i) => (
          <span key={s.url}>
            {i > 0 && ', '}
            <SourceLink source={s.source.replace(/^Source: /, '')} url={s.url} />
          </span>
        ))}
        . The Alzheimer&rsquo;s Association figures are US guidance and may differ elsewhere.
      </p>
    </Section>
  )
}
