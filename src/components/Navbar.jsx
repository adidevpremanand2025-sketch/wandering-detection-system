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
    // the hero (#top) is observed too, so nothing reads as "active" while it is on screen
    // 'closing' is the orbit band before Get involved: nothing in the nav is "current" there either
    const els = ['top', 'closing', ...nav.flatMap((n) => n.ids)].map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === 'top' || e.target.id === 'closing' ? '' : e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Escape closes the mobile menu and hands focus back to its button.
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        document.getElementById('menu-button')?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const current = (n) => n.ids.includes(active)
  const links = nav.filter((n) => !n.cta)
  const cta = nav.find((n) => n.cta)

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper">
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2.5 whitespace-nowrap text-xl font-extrabold tracking-[-0.01em] text-ink">
          <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M6 24 C4 14 10 6 18 8" fill="none" stroke="var(--color-route)" strokeWidth="3" strokeLinecap="round" />
            <path d="M18 8 C26 10 28 18 24 22" fill="none" stroke="var(--color-stray)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="24" cy="22" r="4" fill="none" stroke="var(--color-stray)" strokeWidth="2" />
          </svg>
          {site.shortTitle}
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-1">
            {links.map((n) => (
              <li key={n.label}>
                <a
                  href={`#${n.ids[0]}`}
                  aria-current={current(n) ? 'true' : undefined}
                  className={`inline-block whitespace-nowrap px-3 py-2 text-base underline-offset-[10px] transition-colors ${
                    current(n) ? 'font-bold text-ink underline decoration-route decoration-[3px]' : 'text-muted hover:text-ink'
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
          id="menu-button"
          className="-mr-2 rounded-card border-2 border-ink px-4 py-2 text-sm font-bold text-ink lg:hidden"
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
                className={`block border-b border-rule py-3.5 text-base last:border-0 ${n.cta ? 'font-bold text-stray' : current(n) ? 'font-bold text-route' : 'text-ink'}`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      )}
      {/* how far down the page you are */}
      <motion.div aria-hidden="true" className="absolute bottom-[-1px] left-0 h-[3px] w-full origin-left bg-route" style={{ scaleX: scrollYProgress }} />
    </header>
  )
}
