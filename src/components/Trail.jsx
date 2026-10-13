import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { TRAIL_X, TrailContext } from './ui.jsx'

/**
 * Trail: the page as one walk. A route runs down the left gutter of every section it wraps and is
 * walked (drawn in) as you scroll. Once, beside the element with id `strayAt`, it strays off its line,
 * turns magenta, is noticed, and comes back. It ends at a small house beside the element with id `homeAt`.
 *
 * Wide screens only (the gutter does not exist on smaller ones). Decorative, so aria-hidden.
 * Under reduced motion the whole route is shown at once.
 */
const X = TRAIL_X
const OUT = 88 // how far the stray swings out

export default function Trail({ strayAt, homeAt, children }) {
  const wrap = useRef(null)
  const reduce = useReducedMotion()
  const [geo, setGeo] = useState(null)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start 60%', 'end 60%'] })
  const walked = useTransform(scrollYProgress, (v) => (geo ? v * geo.h : 0))

  useLayoutEffect(() => {
    const el = wrap.current
    const measure = () => {
      const top = el.getBoundingClientRect().top
      const at = (id) => document.getElementById(id)?.getBoundingClientRect()
      const s = at(strayAt)
      const home = at(homeAt)
      const sTop = s ? s.top - top + s.height * 0.22 : 600
      const sLen = s ? s.height * 0.56 : 300
      setGeo({ h: el.offsetHeight, s: sTop, sLen, home: home ? home.top - top + 124 : el.offsetHeight - 40 })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [strayAt, homeAt])

  let before = '', stray = '', after = '', ring = null
  if (geo) {
    const { s, sLen, home } = geo
    const mid = s + sLen / 2
    before = `M${X} 0 V${s}`
    stray = `M${X} ${s} C${X} ${s + sLen * 0.3}, ${OUT} ${mid - sLen * 0.3}, ${OUT} ${mid} C${OUT} ${mid + sLen * 0.3}, ${X} ${s + sLen * 0.7}, ${X} ${s + sLen}`
    after = `M${X} ${s + sLen} V${home - 18}`
    ring = { y: mid }
  }

  return (
    <div ref={wrap} className="relative">
      <TrailContext.Provider value>{children}</TrailContext.Provider>
      {geo && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
          <div className="relative mx-auto h-full max-w-6xl px-8">
            <svg className="absolute left-8 top-0 overflow-visible" width="140" height={geo.h}>
              <defs>
                <clipPath id="trail-walked">
                  {reduce ? <rect x="-20" y="0" width="200" height={geo.h} /> : <motion.rect x="-20" y="0" width="200" height={walked} />}
                </clipPath>
              </defs>

              {/* the way ahead: faint dashes */}
              <g fill="none" stroke="var(--color-rule)" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round">
                <path d={`M${X} 0 V${geo.home - 18}`} />
              </g>

              {/* the way walked */}
              <g clipPath="url(#trail-walked)" fill="none" strokeWidth="4" strokeLinecap="round">
                <path d={before} stroke="var(--color-route)" />
                <path d={stray} stroke="var(--color-stray)" />
                <path d={after} stroke="var(--color-route)" />
                <circle cx={OUT} cy={ring.y} r="13" stroke="var(--color-stray)" strokeWidth="3" fill="var(--color-paper)" />
                <circle cx={OUT} cy={ring.y} r="4" fill="var(--color-stray)" stroke="none" />
                <text x={OUT - 22} y={ring.y + 5} textAnchor="end" className="sign" fontSize="15" fill="var(--color-stray)" stroke="var(--color-paper)" strokeWidth="5" style={{ paintOrder: 'stroke' }}>
                  Noticed
                </text>
              </g>

              {/* home */}
              <g transform={`translate(${X} ${geo.home})`}>
                <path d="M-15 12 V-4 L0 -17 L15 -4 V12 Z" fill="var(--color-paper)" stroke="var(--color-route)" strokeWidth="3" strokeLinejoin="round" />
                <rect x="-4" y="1" width="8" height="11" rx="1.5" fill="var(--color-route)" />
              </g>
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
