import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { nav, site } from '../content.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur">
      <nav aria-label="Primary" className="mx-auto max-w-6xl px-5 md:px-8 flex h-14 items-center justify-between">
        <a href="#top" className="font-serif text-xl text-ink">{site.shortTitle}</a>
        <ul className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? 'true' : undefined}
                className={`text-sm transition-colors hover:text-teal ${active === n.id ? 'text-teal' : 'text-muted'}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="-mr-2 p-2 text-sm text-ink lg:hidden"
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
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={() => setOpen(false)} className="block border-b border-rule/60 py-3 text-sm text-ink last:border-0">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {/* how far down the page you are */}
      <motion.div aria-hidden="true" className="absolute bottom-[-1px] left-0 h-0.5 w-full origin-left bg-teal" style={{ scaleX: scrollYProgress }} />
    </header>
  )
}
