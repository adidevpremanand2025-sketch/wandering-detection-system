import { useState } from 'react'
import { Section } from './ui.jsx'
import { problem, story, literature, challenges, objectives, methodology, hardware, roadmap, team, teamSection, site } from '../content.js'

export function Problem() {
  return (
    <Section id="problem" heading={problem.heading}>
      <p className="lede max-w-2xl">{problem.solution}</p>
      <p className="mt-8 max-w-2xl border-l-2 border-care pl-4 font-semibold">{problem.urgent}</p>
      <dl className="mt-14 grid gap-10 md:grid-cols-3">
        {problem.points.map((p) => (
          <div key={p.title} className="border-t-2 border-care pt-4">
            <dt className="font-serif text-2xl">{p.title}</dt>
            <dd className="mt-2 text-muted">{p.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export function Story() {
  return (
    <Section id="story" heading={story.heading} emphasis>
      <div className="grid gap-10 md:grid-cols-12">
        <p className="lede md:col-span-7">{story.lede}</p>
        <div className="space-y-5 md:col-span-5">
          {story.body.map((t) => <p key={t}>{t}</p>)}
        </div>
      </div>
      <figure className="mt-16 rounded-card-lg bg-soft px-6 py-10 md:px-12 md:py-14">
        <figcaption className="text-base font-semibold text-care">{story.quoteLabel}</figcaption>
        <blockquote className="mt-4 max-w-3xl font-serif text-3xl font-black leading-[1.05] tracking-[-0.025em] md:text-4xl">
          {story.quote}
        </blockquote>
      </figure>
    </Section>
  )
}

export function Literature() {
  const [c1, c2, c3] = literature.columns
  return (
    <Section id="literature" heading={literature.heading}>
      <table className="hidden w-full border-collapse text-left md:table">
        <caption className="sr-only">Comparison of existing wandering-detection approaches</caption>
        <thead>
          <tr className="border-b-2 border-ink text-base">
            <th scope="col" className="w-1/4 py-3 pr-6 font-semibold">{c1}</th>
            <th scope="col" className="w-[32%] py-3 pr-6 font-semibold">{c2}</th>
            <th scope="col" className="py-3 font-semibold">{c3}</th>
          </tr>
        </thead>
        <tbody>
          {literature.rows.map((r) => (
            <tr key={r.name} className={`border-b border-rule align-top ${r.highlight ? 'bg-soft' : ''}`}>
              <th scope="row" className={`py-6 pl-4 pr-6 font-serif text-xl font-medium ${r.highlight ? 'text-care' : ''}`}>{r.name}</th>
              <td className="py-6 pr-6">{r.does}</td>
              <td className="py-6 pr-4 text-muted">{r.limit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="md:hidden">
        {literature.rows.map((r) => (
          <li key={r.name} className={`border-t border-rule py-6 ${r.highlight ? 'bg-soft px-4' : ''}`}>
            <h3 className={`font-serif text-2xl font-medium ${r.highlight ? 'text-care' : ''}`}>{r.name}</h3>
            <p className="mt-3 text-sm font-semibold">{c2}</p>
            <p className="mt-1">{r.does}</p>
            <p className="mt-3 text-sm font-semibold">{c3}</p>
            <p className="mt-1 text-muted">{r.limit}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function Challenges() {
  return (
    <Section id="challenges" heading={challenges.heading}>
      <ul className="max-w-4xl">
        {challenges.items.map((c) => (
          <li key={c.n} className="grid gap-x-10 gap-y-2 border-t border-rule py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <h3 className="font-serif text-2xl font-medium">{c.title}</h3>
            <p className="text-muted">{c.body}</p>
          </li>
        ))}
      </ul>
      <figure className="mt-16 rounded-card-lg bg-soft px-6 py-10 md:px-12 md:py-14">
        <figcaption className="text-base font-semibold text-care">{challenges.gapLabel}</figcaption>
        <blockquote className="mt-4 max-w-3xl font-serif text-3xl font-black leading-[1.05] tracking-[-0.025em] md:text-4xl">
          {challenges.gap}
        </blockquote>
      </figure>
    </Section>
  )
}

export function Objectives() {
  return (
    <Section id="objectives" heading={objectives.heading}>
      <ol className="max-w-3xl">
        {objectives.items.map((o, i) => (
          <li key={o} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-t border-rule py-5">
            <span className="font-serif text-2xl text-care" aria-hidden="true">{i + 1}</span>
            <p className="text-xl leading-snug">{o}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Methodology() {
  return (
    <Section id="methodology" heading={methodology.heading}>
      <ol className="relative ml-2 max-w-2xl border-l-2 border-rule">
        {methodology.steps.map((s, i) => (
          <li key={s} className="relative pb-8 pl-8 last:pb-0">
            <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-care" aria-hidden="true" />
            <p className="text-sm font-semibold text-care">Step {i + 1}</p>
            <p className="mt-1 font-serif text-2xl leading-snug">{s}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

const T = 'var(--color-care)'
const INK = 'currentColor'

// Simple line illustrations, shown until a real photo is added to public/images.
const ART = {
  ESP32: (
    <g fill="none" stroke={INK} strokeWidth="1.5">
      <rect x="95" y="55" width="130" height="90" />
      <rect x="125" y="75" width="70" height="50" stroke={T} />
      <path d="M95 65h-14M95 80h-14M95 95h-14M95 110h-14M95 125h-14M225 65h14M225 80h14M225 95h14M225 110h14M225 125h14" />
      <path d="M95 55V43h40V55" />
      <path d="M215 55c8-10 22-10 30 0M221 48c5-6 13-6 18 0" stroke={T} />
    </g>
  ),
  'MPU-6050': (
    <g fill="none" stroke={INK} strokeWidth="1.5">
      <rect x="115" y="60" width="90" height="80" />
      <rect x="140" y="82" width="40" height="36" stroke={T} />
      <circle cx="127" cy="72" r="3" />
      <path d="M130 140v14M145 140v14M160 140v14M175 140v14M190 140v14" />
      <path d="M215 100h40m0 0-7-5m7 5-7 5M160 52V20m0 0-5 7m5-7 5 7" stroke={T} />
    </g>
  ),
  'GPS module': (
    <g fill="none" stroke={INK} strokeWidth="1.5">
      <rect x="100" y="70" width="100" height="75" />
      <rect x="125" y="85" width="50" height="45" stroke={T} />
      <path d="M200 100h30M200 115h30" />
      <path d="M150 70V45m0 0c-18-4-28-16-28-28m28 28c18-4 28-16 28-28" stroke={T} />
      <circle cx="150" cy="20" r="3" stroke={T} />
    </g>
  ),
}

function ImageSlot({ src, alt, name }) {
  const [failed, setFailed] = useState(!src)
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-soft">
      {!failed && src && <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />}
      {failed && (
        <svg viewBox="0 0 320 180" className="h-full w-full text-ink" role="img" aria-label={alt} preserveAspectRatio="xMidYMid meet">
          {ART[name]}
        </svg>
      )}
    </div>
  )
}

export function Hardware() {
  return (
    <Section id="hardware" heading={hardware.heading}>
      <ul className="grid gap-12 md:grid-cols-3 md:gap-8">
        {hardware.items.map((h) => (
          <li key={h.name}>
            <figure>
              <ImageSlot src={h.image} name={h.name} alt={`${h.name}, ${h.kind}`} />
              <figcaption className="mt-4">
                <p className="font-serif text-2xl font-medium">{h.name}</p>
                <p className="text-base font-semibold text-care">{h.kind}</p>
                <p className="mt-2 text-muted">{h.role}</p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function Roadmap() {
  return (
    <Section id="roadmap" heading={roadmap.heading}>
      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
        <span className="absolute bottom-0 left-[7px] top-0 w-0.5 bg-rule md:hidden" aria-hidden="true" />
        <span className="absolute left-0 right-0 top-[7px] hidden h-0.5 bg-rule md:block" aria-hidden="true" />
        {roadmap.steps.map((s, i) => (
          <li key={s.title} className="relative pl-9 md:pl-0 md:pt-10">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 h-4 w-4 rounded-full border-2 ${s.status ? 'border-care bg-care' : 'border-rule bg-paper'}`}
            />
            <p className="text-sm font-semibold text-care">Step {i + 1}</p>
            <h3 className="mt-1 font-serif text-2xl font-medium leading-tight">{s.title}</h3>
            {s.status && <p className="mt-2 font-semibold text-care">{s.status}</p>}
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Team() {
  return (
    <>
      <Section id="team" heading={teamSection.heading}>
        <ul className="max-w-3xl">
          {team.map((t) => (
            <li key={t.reg} className="flex flex-col justify-between gap-1 border-t border-rule py-5 sm:flex-row sm:items-baseline">
              <p className="font-serif text-3xl">{t.name}</p>
              <p className="tabular-nums text-muted">{t.reg}</p>
            </li>
          ))}
        </ul>
      </Section>
      <footer className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-2 px-5 py-10 text-base text-muted md:grid-cols-12 md:px-8">
          <p className="font-serif text-xl text-ink md:col-span-4">{site.shortTitle}</p>
          <p className="md:col-span-4">
            {site.college}, {site.year}
            <a href="#ethics" className="mt-1 block underline underline-offset-4 hover:text-care">Ethics and privacy</a>
          </p>
          <p className="md:col-span-4">Set in Inter.</p>
        </div>
      </footer>
    </>
  )
}
