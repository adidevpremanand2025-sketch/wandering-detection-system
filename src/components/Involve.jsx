import { useState } from 'react'
import { involve } from '../content.js'
import Button from './Button.jsx'
import AstralShell from './AstralShell.jsx'
import { TRAIL_INSET } from './ui.jsx'

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
    <Button variant="outline" tone="onTrust" onClick={copy}>
      <span aria-live="polite">{state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed. Select the address instead.' : 'Copy email'}</span>
    </Button>
  )
}

/** The end of the walk: home, and the one thing we ask. */
export default function Involve() {
  return (
    <section id="involve" aria-labelledby="involve-h" className="bg-trust text-on-trust">
      <div className={`mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12 ${TRAIL_INSET}`}>
        <div className="lg:col-span-8">
          <h2 id="involve-h" className="max-w-3xl text-4xl font-extrabold leading-[1.04] tracking-[-0.024em] text-on-trust md:text-5xl">
            {involve.headingParts.join('')}
          </h2>
          <p className="mt-6 max-w-2xl text-2xl leading-snug">{involve.lede}</p>
          <p className="mt-4 max-w-2xl">{involve.body}</p>

          <ul className="mt-12 grid gap-8 md:grid-cols-3">
            {involve.ways.map((w) => (
              <li key={w.verb} className="border-t-2 border-on-trust/40 pt-4">
                <h3 className="text-2xl font-bold text-on-trust">{w.verb}</h3>
                <p className="mt-2">{w.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <Button href={`mailto:${involve.email}`} tone="onTrust" size="lg">{involve.cta}</Button>
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
              <a href={`mailto:${involve.email}`} className="inline-block [overflow-wrap:anywhere] py-2 underline underline-offset-4 focus-visible:outline-on-trust">{involve.email}</a>
              <CopyEmail />
            </p>
            <p className="mt-1 max-w-md">{involve.note}</p>
          </div>
        </div>
        <div className="hidden w-full justify-self-center lg:col-span-4 lg:block">
          <AstralShell className="mx-auto w-[22rem]" />
        </div>
      </div>
    </section>
  )
}
