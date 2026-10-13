import { Section } from './ui.jsx'
import { problem, story, literature, challenges, hardware, roadmap, team, teamSection, site } from '../content.js'

export function Problem() {
  return (
    <Section id="problem" heading={problem.heading}>
      {/* the emergency line comes first: someone missing right now is the one true stray */}
      <p className="max-w-2xl border-l-4 border-stray py-1 pl-5 text-xl font-bold text-ink">{problem.urgent}</p>
      <p className="lede mt-10 max-w-2xl">{problem.solution}</p>
      <dl className="mt-14 grid gap-10 md:grid-cols-3">
        {problem.points.map((p) => (
          <div key={p.title} className="border-t-2 border-ink pt-4">
            <dt className="text-2xl font-bold">{p.title}</dt>
            <dd className="mt-2 text-muted">{p.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

/** A large pull quote with a short attribution under it. No box: it sits on the paper. */
function PullQuote({ label, children }) {
  return (
    <figure className="mt-16 max-w-3xl border-l-4 border-route pl-6 md:pl-8">
      <blockquote className="text-3xl font-extrabold leading-[1.12] tracking-[-0.018em] md:text-4xl">{children}</blockquote>
      <figcaption className="mt-4 text-base text-muted">{label}</figcaption>
    </figure>
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
      <PullQuote label={story.quoteLabel}>{story.quote}</PullQuote>
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
            <th scope="col" className="w-1/4 py-3 pl-4 pr-6 font-bold">{c1}</th>
            <th scope="col" className="w-[32%] py-3 pr-6 font-bold">{c2}</th>
            <th scope="col" className="py-3 font-bold">{c3}</th>
          </tr>
        </thead>
        <tbody>
          {literature.rows.map((r) => (
            <tr key={r.name} className={`border-b border-rule align-top ${r.highlight ? 'bg-route-soft' : ''}`}>
              <th scope="row" className={`py-6 pl-4 pr-6 text-xl font-bold ${r.highlight ? 'text-route' : ''}`}>{r.name}</th>
              <td className="py-6 pr-6">{r.does}</td>
              <td className={`py-6 pr-4 ${r.highlight ? '' : 'text-muted'}`}>{r.limit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="md:hidden">
        {literature.rows.map((r) => (
          <li key={r.name} className={`border-t border-rule py-6 ${r.highlight ? 'bg-route-soft px-4' : ''}`}>
            <h3 className={`text-2xl font-bold ${r.highlight ? 'text-route' : ''}`}>{r.name}</h3>
            <p className="mt-3 text-sm font-bold">{c2}</p>
            <p className="mt-1">{r.does}</p>
            <p className="mt-3 text-sm font-bold">{c3}</p>
            <p className={`mt-1 ${r.highlight ? '' : 'text-muted'}`}>{r.limit}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-2xl text-base text-muted">{literature.note}</p>
    </Section>
  )
}

export function Challenges() {
  return (
    <Section id="challenges" heading={challenges.heading}>
      <ul className="max-w-4xl">
        {challenges.items.map((c) => (
          <li key={c.n} className="grid gap-x-10 gap-y-2 border-t border-rule py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <h3 className="text-2xl font-bold">{c.title}</h3>
            <p className="text-muted">{c.body}</p>
          </li>
        ))}
      </ul>
      <PullQuote label={challenges.gapLabel}>{challenges.gap}</PullQuote>
    </Section>
  )
}

// Three planned parts, set as plain rows. A photo appears only if one is added to public/images and
// referenced from content.js; until then there is no placeholder art pretending to be one.
export function Hardware() {
  return (
    <Section id="hardware" heading={hardware.heading}>
      <ul className="grid gap-x-10 gap-y-10 md:grid-cols-3">
        {hardware.items.map((h) => (
          <li key={h.name} className="border-t-2 border-ink pt-4">
            {h.image && <img src={h.image} alt={`${h.name}, ${h.kind}`} loading="lazy" className="mb-4 aspect-[4/3] w-full rounded-card object-cover" />}
            <p className="text-2xl font-bold">{h.name}</p>
            <p className="sign mt-1 text-base text-route">{h.kind}</p>
            <p className="mt-3">{h.role}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10 max-w-2xl text-base text-muted">{hardware.note}</p>
    </Section>
  )
}
export function Roadmap() {
  return (
    <Section id="roadmap" heading={roadmap.heading}>
      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-8">
        <span className="absolute bottom-0 left-[7px] top-0 w-[3px] bg-rule md:hidden" aria-hidden="true" />
        <span className="absolute left-0 right-0 top-[7px] hidden h-[3px] bg-rule md:block" aria-hidden="true" />
        {roadmap.steps.map((s, i) => (
          <li key={s.title} className="relative pl-9 md:pl-0 md:pt-10">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 h-[17px] w-[17px] rounded-full border-[3px] ${s.status ? 'border-route bg-route' : 'border-rule bg-paper'}`}
            />
            <p className="sign text-sm text-route">Step {i + 1}</p>
            <h3 className="mt-1 text-2xl font-bold leading-tight">{s.title}</h3>
            {s.status && <p className="mt-2 font-bold text-route">{s.status}</p>}
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function Team() {
  return (
    <Section id="team" heading={teamSection.heading}>
      <ul className="max-w-3xl">
        {team.map((t) => (
          <li key={t.reg} className="flex flex-col justify-between gap-1 border-t border-rule py-5 sm:flex-row sm:items-baseline">
            <p className="text-3xl font-bold tracking-[-0.01em]">{t.name}</p>
            <p className="sign tabular-nums text-muted">{t.reg}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-2 px-5 py-10 text-base text-muted md:grid-cols-12 md:px-8">
        <p className="text-xl font-extrabold text-ink md:col-span-4">{site.shortTitle}</p>
        <div className="md:col-span-4">
          <p>{site.college}, {site.year}</p>
          <a href="#ethics" className="mt-1 inline-block py-2 underline underline-offset-4 hover:text-route">Ethics and privacy</a>
        </div>
        <p className="md:col-span-4">A student project. Not a medical device.</p>
      </div>
    </footer>
  )
}
