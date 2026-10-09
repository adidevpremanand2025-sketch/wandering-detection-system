import { useState } from 'react'
import { involve } from '../content.js'

function CopyEmail() {
  const [state, setState] = useState('idle')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(involve.email)
      setState('copied')
    } catch {
      setState('failed')
    }
    setTimeout(() => setState('idle'), 2500)
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="border-2 border-paper px-4 py-2 font-semibold transition-colors hover:bg-paper hover:text-teal focus-visible:outline-paper"
    >
      <span aria-live="polite">{state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed. Select the address instead.' : 'Copy email'}</span>
    </button>
  )
}

export default function Involve() {
  return (
    <section id="involve" aria-labelledby="involve-h" className="bg-teal text-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <h2 id="involve-h" className="max-w-3xl font-serif text-4xl font-medium leading-[1.1] md:text-6xl">
          {involve.headingParts.join('')}
        </h2>
        <p className="mt-6 max-w-2xl font-serif text-2xl leading-snug">{involve.lede}</p>
        <p className="mt-4 max-w-2xl">{involve.body}</p>

        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {involve.ways.map((w) => (
            <li key={w.verb} className="border-t-2 border-paper pt-4">
              <h3 className="font-serif text-2xl font-medium">{w.verb}</h3>
              <p className="mt-2">{w.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <a
            href={`mailto:${involve.email}`}
            className="inline-block bg-paper px-7 py-4 text-lg font-semibold text-teal hover:bg-soft focus-visible:outline-paper"
          >
            {involve.cta}
          </a>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a href={`mailto:${involve.email}`} className="break-all underline underline-offset-4 focus-visible:outline-paper">{involve.email}</a>
            <CopyEmail />
          </p>
          <p className="mt-1 max-w-md">{involve.note}</p>
        </div>
      </div>
    </section>
  )
}
