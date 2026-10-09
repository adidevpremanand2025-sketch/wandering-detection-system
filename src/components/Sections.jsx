import { useState } from 'react'
import { Section } from './ui.jsx'
import { problem, literature, challenges, objectives, methodology, hardware, roadmap, team, teamSection, site } from '../content.js'

export function Problem() {
  return (
    <Section id="problem" heading={problem.heading}>
      <p className="lede max-w-2xl">{problem.solution}</p>
      <dl className="mt-14 grid gap-10 md:grid-cols-3">
        {problem.points.map((p) => (
          <div key={p.title} className="border-t-2 border-teal pt-4">
            <dt className="font-serif text-2xl">{p.title}</dt>
            <dd className="mt-2 text-muted">{p.body}</dd>
          </div>
        ))}
      </dl>
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
              <th scope="row" className={`py-6 pl-4 pr-6 font-serif text-xl font-medium ${r.highlight ? 'text-teal' : ''}`}>{r.name}</th>
              <td className="py-6 pr-6">{r.does}</td>
              <td className="py-6 pr-4 text-muted">{r.limit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="md:hidden">
        {literature.rows.map((r) => (
          <li key={r.name} className={`border-t border-rule py-6 ${r.highlight ? 'bg-soft px-4' : ''}`}>
            <h3 className={`font-serif text-2xl font-medium ${r.highlight ? 'text-teal' : ''}`}>{r.name}</h3>
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
      <figure className="mt-16 bg-soft px-6 py-10 md:px-12 md:py-14">
        <figcaption className="text-base font-semibold text-teal">{challenges.gapLabel}</figcaption>
        <blockquote className="mt-4 max-w-3xl font-serif text-3xl leading-snug md:text-[2.75rem] md:leading-[1.2]">
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
            <span className="font-serif text-2xl text-teal" aria-hidden="true">{i + 1}</span>
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
            <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-teal" aria-hidden="true" />
            <p className="text-sm font-semibold text-teal">Step {i + 1}</p>
            <p className="mt-1 font-serif text-2xl leading-snug">{s}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

function ImageSlot({ src, alt }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-soft">
      {!failed && <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />}
      {failed && (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--color-teal)" strokeWidth="1.5" aria-hidden="true">
            <rect x="8" y="8" width="24" height="24" />
            <path d="M14 8V3M20 8V3M26 8V3M14 37v-5M20 37v-5M26 37v-5M8 14H3M8 20H3M8 26H3M37 14h-5M37 20h-5M37 26h-5" />
          </svg>
          <span className="text-sm text-muted">Photo goes here<br /><code className="text-xs">public{src}</code></span>
        </div>
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
              <ImageSlot src={h.image} alt={`${h.name}, ${h.kind}`} />
              <figcaption className="mt-4">
                <p className="font-serif text-2xl font-medium">{h.name}</p>
                <p className="text-base font-semibold text-teal">{h.kind}</p>
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
              className={`absolute left-0 top-0 h-4 w-4 rounded-full border-2 ${s.status ? 'border-teal bg-teal' : 'border-rule bg-paper'}`}
            />
            <p className="text-sm font-semibold text-teal">Step {i + 1}</p>
            <h3 className="mt-1 font-serif text-2xl font-medium leading-tight">{s.title}</h3>
            {s.status && <p className="mt-2 font-semibold text-teal">{s.status}</p>}
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
            <a href="#ethics" className="mt-1 block underline underline-offset-4 hover:text-teal">Ethics and privacy</a>
          </p>
          <p className="md:col-span-4">Set in Fraunces and Nunito.</p>
        </div>
      </footer>
    </>
  )
}
