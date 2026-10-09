import { Section } from './ui.jsx'
import { ethics, involve } from '../content.js'

export default function About() {
  return (
    <Section id="ethics" heading={ethics.heading}>
      <div className="max-w-2xl space-y-6 leading-relaxed">
        <p className="font-serif text-2xl leading-snug md:text-3xl">{ethics.intro}</p>
        {ethics.items.map((it) => (
          <p key={it.lead}>
            <strong className="font-semibold">{it.lead}</strong>
            {it.email ? (
              <>
                {it.textBefore}
                <a href={`mailto:${involve.email}`} className="underline underline-offset-4 hover:text-teal">{involve.email}</a>
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
