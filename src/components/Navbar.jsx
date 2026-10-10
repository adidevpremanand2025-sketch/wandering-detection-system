import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { nav, site } from '../content.js'
import Button from './Button.jsx'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()

  // Watch every section a nav item covers, so a grouped item stays lit across all of them.
  useEffect(() => {
    const els = nav.flatMap((n) => n.ids).map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const current = (n) => n.ids.includes(active)
  const links = nav.filter((n) => !n.cta)
  const cta = nav.find((n) => n.cta)

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" className="whitespace-nowrap font-serif text-xl font-black tracking-tight text-ink">{site.shortTitle}</a>
        <div className="hidden items-center gap-3 lg:flex">
          <ul className="flex items-center gap-1 rounded-full bg-soft p-1">
            {links.map((n) => (
              <li key={n.label}>
                <a
                  href={`#${n.ids[0]}`}
                  aria-current={current(n) ? 'true' : undefined}
                  className={`inline-block whitespace-nowrap rounded-full px-4 py-2 text-base font-medium transition-colors ${
                    current(n) ? 'bg-lime font-semibold text-on-lime' : 'text-ink hover:bg-paper'
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          {cta && <Button href={`#${cta.ids[0]}`} variant="outline">{cta.label}</Button>}
        </div>
        <button
          type="button"
          className="-mr-2 rounded-full border border-ink px-4 py-2 text-sm font-semibold text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>
      {open && (
        <ul id="mobile-nav" className="border-t border-rule bg-paper px-5 py-3 lg:hidden">
          {nav.map((n) => (
            <li key={n.label}>
              <a
                href={`#${n.ids[0]}`}
                onClick={() => setOpen(false)}
                aria-current={current(n) ? 'true' : undefined}
                className={`block border-b border-rule py-3.5 text-base last:border-0 ${n.cta ? 'font-bold text-care' : current(n) ? 'font-semibold text-care' : 'text-ink'}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {/* how far down the page you are */}
      <motion.div aria-hidden="true" className="absolute bottom-[-1px] left-0 h-1 w-full origin-left bg-lime" style={{ scaleX: scrollYProgress }} />
    </header>
  )
}
