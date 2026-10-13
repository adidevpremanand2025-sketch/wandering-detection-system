import { Section } from './ui.jsx'
import { ethics, involve } from '../content.js'

export default function About() {
  return (
    <Section id="ethics" heading={ethics.heading} vignette="gate">
      <div className="max-w-2xl space-y-6 leading-relaxed">
        <p className="lede">{ethics.summary}</p>
        {ethics.items.map((it) => (
          <p key={it.lead}>
            <strong className="font-bold">{it.lead}</strong>
            {it.email ? (
              <>
                {it.textBefore}
                <a href={`mailto:${involve.email}`} className="[overflow-wrap:anywhere] underline underline-offset-4 hover:text-route">{involve.email}</a>
                {it.textAfter}
              </>
            ) : (
              it.text
            )}
          </p>
        ))}
        <p>{ethics.outro}</p>
      </div>
    </Section>
  )
}
