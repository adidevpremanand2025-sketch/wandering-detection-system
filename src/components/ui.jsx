/**
 * Section shell: a plain heading, then the content. No numerals or labels, so each
 * section is identified by what it says. `heading` may be a string or an array of strings
 * (joined as one sentence). `tone="soft"` gives the section a soft band; `emphasis` makes the heading larger.
 */
export function Section({ id, heading, children, className = '', tone = 'plain', emphasis = false }) {
  const text = Array.isArray(heading) ? heading.join('') : heading
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className={`border-t border-rule ${tone === 'soft' ? 'bg-soft' : ''} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <h2 id={`${id}-h`} className={`h2 ${emphasis ? 'max-w-4xl !text-4xl md:!text-6xl' : 'max-w-3xl'}`}>{text}</h2>
        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </section>
  )
}
