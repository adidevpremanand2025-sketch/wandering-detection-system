import { Section } from './ui.jsx'
import { problem, story, literature, challenges, hardware, roadmap, team, teamSection, site } from '../content.js'

export function Problem() {
  return (
    <Section id="problem" heading={problem.heading} vignette="home">
      {/* the emergency line lives in the hero and the footer; it is not repeated here */}
      <p className="lede max-w-2xl">{problem.solution}</p>
      {/* the three reasons, as one plain sentence each instead of a three-column row */}
      <ul className="mt-10 max-w-2xl space-y-3 text-xl">
        {problem.points.map((p) => (
          <li key={p.title}>
            <strong className="font-bold text-ink">{p.title}.</strong> {p.body}
          </li>
        ))}
      </ul>
    </Section>
  )
}

/** A large pull quote with a short attribution under it. No box: it sits on the paper. */
function PullQuote({ label, children }) {
  return (
    <figure className="mt-16 max-w-3xl border-l-4 border-route pl-6 md:pl-8">
      {/* the label leads the quote, at reading size, instead of trailing it as a small caption */}
      <figcaption className="mb-3 text-lg font-bold text-route">{label}</figcaption>
      <blockquote className="text-3xl font-extrabold leading-[1.12] tracking-[-0.018em] md:text-4xl">{children}</blockquote>
    </figure>
  )
}

export function Story() {
  return (
    <Section id="story" heading={story.heading} emphasis vignette="bench">
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
    <Section id="literature" heading={literature.heading} vignette="fence">
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
      {/* what the table adds up to (this used to be its own section) */}
      <PullQuote label={challenges.gapLabel}>{challenges.gap}</PullQuote>
    </Section>
  )
}

// Three planned parts, set as plain rows. A photo appears only if one is added to public/images and
// referenced from content.js; until then there is no placeholder art pretending to be one.
function Chip({ name, role, main = false }) {
  return (
    <div className={`rounded-card border-2 px-4 py-3 text-center ${main ? 'border-route bg-route-soft' : 'border-ink bg-paper'}`}>
      <p className="text-xl font-extrabold text-ink">{name}</p>
      <p className="sign text-base text-muted">{role}</p>
    </div>
  )
}

function Link({ vertical = false }) {
  // a plain line with an arrowhead each end: readings go to the ESP32
  return vertical ? (
    <svg aria-hidden="true" width="20" height="36" viewBox="0 0 20 36" className="mx-auto text-ink">
      <path d="M10 4 V32 M5 27 L10 33 L15 27 M5 9 L10 3 L15 9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" width="44" height="20" viewBox="0 0 44 20" className="text-ink">
      <path d="M4 10 H40 M9 5 L3 10 L9 15 M35 5 L41 10 L35 15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// How the three planned parts connect: the two sensors feed the ESP32. Drawn from the plan in
// content.js (ESP32 + accelerometer + GPS), not from a built board.
function HardwareDiagram() {
  const [esp, mpu, gps] = hardware.items
  return (
    <figure className="mb-14 max-w-4xl">
      <div className="rounded-card-lg border-2 border-dashed border-route p-4 md:p-6">
        <div className="grid items-center justify-items-stretch gap-1 md:grid-cols-[1fr_auto_1.15fr_auto_1fr] md:gap-3">
          <Chip name={mpu.name} role="feels movement" />
          <div className="flex justify-center"><span className="md:hidden"><Link vertical /></span><span className="hidden md:block"><Link /></span></div>
          <Chip name={esp.name} role="reads both, sends on" main />
          <div className="flex justify-center"><span className="md:hidden"><Link vertical /></span><span className="hidden md:block"><Link /></span></div>
          <Chip name={gps.name} role="knows where" />
        </div>
      </div>
      <figcaption className="mt-3 text-base text-muted">
        The plan: all three sit together in one small worn device. The two sensors feed the ESP32, which passes the readings on to our software.
      </figcaption>
    </figure>
  )
}

export function Hardware() {
  return (
    <Section id="hardware" heading={hardware.heading} vignette="chips">
      <HardwareDiagram />
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
    <Section id="roadmap" heading={roadmap.heading} vignette="hill">
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
    <Section id="team" heading={teamSection.heading} vignette="grove">
      <ul className="max-w-3xl xl:max-w-[40rem]">
        {team.map((t) => (
          <li key={t.reg} className="flex flex-col justify-between gap-1 border-t border-rule py-5 sm:flex-row sm:items-baseline">
            <div>
              <p className="text-3xl font-bold tracking-[-0.01em]">{t.name}</p>
              {/* shown only when the team adds a real role line in content.js */}
              {t.role && <p className="mt-1 text-lg text-muted">{t.role}</p>}
            </div>
            <p className="sign tabular-nums text-muted">{t.reg}</p>
          </li>
        ))}
      </ul>
      {/* likewise: a named faculty guide and a repo link appear only once content.js has them */}
      {(teamSection.guide || teamSection.repo) && (
        <p className="mt-8 max-w-2xl text-lg">
          {teamSection.guide && <>Guided by <span className="font-bold text-ink">{teamSection.guide}</span>. </>}
          {teamSection.repo && (
            <a href={teamSection.repo} className="font-bold underline underline-offset-4 hover:text-route" target="_blank" rel="noopener noreferrer">
              Code and notes on GitHub
            </a>
          )}
        </p>
      )}
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
        <div className="md:col-span-4">
          <p>A student project. Not a medical device.</p>
          <p className="mt-2 border-l-4 border-stray pl-3 font-bold text-ink">{problem.urgent}</p>
        </div>
      </div>
    </footer>
  )
}
