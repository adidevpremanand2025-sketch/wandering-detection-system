import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Grandpa from './Grandpa.jsx'

/**
 * Orbit: the hero's centrepiece. A large cartoon grandpa on a lime disc, with the small things of a
 * quiet daily routine circling him in 3D: reading glasses, a warm mug, a family photo, a book, a
 * stopwatch, and a friendly pink brain.
 *
 * The depth is faked with perspective: each item moves on a tilted ellipse, gets larger and brighter
 * as it passes in front, smaller and dimmer behind, and slowly turns on its own axis. Items in the
 * back sit under grandpa; items in the front sit over him.
 *
 * Decorative, so aria-hidden, but the motion has a pause control (WCAG 2.2.2). With reduced motion
 * it holds one still pose.
 */
const LINE = '#163300'
const LIME = 'var(--color-lime)'
const SOFT = '#E2F6D5'
const WHITE = '#FFFFFF'
const SW = 4

const svgProps = { viewBox: '0 0 100 100', className: 'h-full w-full', strokeLinejoin: 'round', strokeLinecap: 'round' }

function Glasses() {
  return (
    <svg {...svgProps}>
      <ellipse cx="50" cy="86" rx="34" ry="5" fill={SOFT} />
      <path d="M8 40 Q14 28 28 34" fill="none" stroke={LINE} strokeWidth={SW} />
      <path d="M92 40 Q86 28 72 34" fill="none" stroke={LINE} strokeWidth={SW} />
      <circle cx="29" cy="58" r="19" fill={SOFT} stroke={LINE} strokeWidth={SW} />
      <circle cx="71" cy="58" r="19" fill={SOFT} stroke={LINE} strokeWidth={SW} />
      <path d="M47 54 Q50 49 53 54" fill="none" stroke={LINE} strokeWidth={SW} />
      <path d="M19 52 Q22 47 28 46" fill="none" stroke={WHITE} strokeWidth="3" />
      <path d="M61 52 Q64 47 70 46" fill="none" stroke={WHITE} strokeWidth="3" />
    </svg>
  )
}

function Mug() {
  return (
    <svg {...svgProps}>
      <path d="M38 8 Q34 14 38 20 M54 6 Q50 14 54 22" fill="none" stroke={LINE} strokeWidth="3.5" />
      <ellipse cx="46" cy="90" rx="34" ry="5.5" fill={SOFT} stroke={LINE} strokeWidth="3" />
      <path d="M68 40 H76 A11 11 0 0 1 76 66 H68" fill="none" stroke={LINE} strokeWidth={SW} />
      <path d="M18 30 H70 V68 Q70 86 52 86 H36 Q18 86 18 68 Z" fill={LIME} stroke={LINE} strokeWidth={SW} />
      <ellipse cx="44" cy="30" rx="26" ry="6" fill="var(--color-trust)" stroke={LINE} strokeWidth={SW} />
      <path d="M44 70 C28 60 30 46 38 46 C42 46 44 49 44 51 C44 49 46 46 50 46 C58 46 60 60 44 70 Z" fill={WHITE} stroke={LINE} strokeWidth="3" />
    </svg>
  )
}

function Photo() {
  return (
    <svg {...svgProps}>
      <g transform="rotate(-9 50 50)">
        <rect x="14" y="8" width="72" height="84" rx="6" fill={WHITE} stroke={LINE} strokeWidth={SW} />
        <rect x="21" y="15" width="58" height="52" rx="3" fill={SOFT} stroke={LINE} strokeWidth="3" />
        {/* grandpa and a grandchild */}
        <circle cx="40" cy="38" r="9" fill="#F7CFA4" stroke={LINE} strokeWidth="2.5" />
        <path d="M24 67 C24 54 32 50 40 50 C48 50 56 54 56 67 Z" fill="#054D28" stroke={LINE} strokeWidth="2.5" />
        <circle cx="62" cy="43" r="7" fill="#FBD9B8" stroke={LINE} strokeWidth="2.5" />
        <path d="M50 67 C50 58 56 55 62 55 C68 55 74 58 74 67 Z" fill={LIME} stroke={LINE} strokeWidth="2.5" />
        <path d="M50 84 C40 78 42 71 46 71 C48 71 50 73 50 74 C50 73 52 71 54 71 C58 71 60 78 50 84 Z" fill={WHITE} stroke={LINE} strokeWidth="2.5" />
      </g>
    </svg>
  )
}

function Book() {
  return (
    <svg {...svgProps}>
      <path d="M6 24 Q28 16 50 28 V84 Q28 72 6 80 Z" fill={LIME} stroke={LINE} strokeWidth={SW} />
      <path d="M94 24 Q72 16 50 28 V84 Q72 72 94 80 Z" fill={WHITE} stroke={LINE} strokeWidth={SW} />
      <path d="M16 38 Q28 34 40 40 M16 50 Q28 46 40 52 M16 62 Q28 58 40 64" fill="none" stroke={LINE} strokeWidth="3.5" />
      <path d="M60 40 Q72 34 84 38 M60 52 Q72 46 84 50 M60 64 Q72 58 84 62" fill="none" stroke={LINE} strokeWidth="3.5" />
      <path d="M74 20 V44 L79 39 L84 44 V22 Z" fill={LIME} stroke={LINE} strokeWidth="3" />
    </svg>
  )
}

function Stopwatch() {
  return (
    <svg {...svgProps}>
      <rect x="42" y="4" width="16" height="9" rx="3" fill={LIME} stroke={LINE} strokeWidth="3.5" />
      <path d="M50 13 V20" stroke={LINE} strokeWidth={SW} />
      <path d="M78 24 L84 18" stroke={LINE} strokeWidth="5" />
      <circle cx="50" cy="58" r="36" fill={WHITE} stroke={LINE} strokeWidth={SW} />
      <circle cx="50" cy="58" r="28" fill={SOFT} stroke={LINE} strokeWidth="2.5" />
      <path d="M50 34 V38 M50 78 V82 M26 58 H30 M70 58 H74" stroke={LINE} strokeWidth="3.5" />
      <path d="M50 58 V42 M50 58 L62 66" fill="none" stroke={LINE} strokeWidth="4.5" />
      <circle cx="50" cy="58" r="3.5" fill={LIME} stroke={LINE} strokeWidth="2.5" />
    </svg>
  )
}

function Brain() {
  const OUT = '#5B2E3A'
  return (
    <svg {...svgProps}>
      <path
        d="M16 72 C5 68 5 50 18 47 C14 32 30 24 41 33 C46 18 68 18 71 33 C86 28 97 42 89 54 C99 62 93 77 79 77 C70 86 52 86 46 79 C36 86 22 84 16 72 Z"
        fill="#F9A8BC" stroke={OUT} strokeWidth={SW}
      />
      <path d="M41 33 C38 41 45 45 40 52 M71 33 C69 41 62 44 66 52 M30 58 C34 54 38 55 40 52 M80 60 C76 56 70 56 66 52" fill="none" stroke={OUT} strokeWidth="3" opacity="0.75" />
      <path d="M56 24 C58 32 54 38 56 46" fill="none" stroke={OUT} strokeWidth="3" opacity="0.75" />
      <ellipse cx="32" cy="66" rx="5.5" ry="3.6" fill="#F2788F" opacity="0.7" />
      <ellipse cx="78" cy="66" rx="5.5" ry="3.6" fill="#F2788F" opacity="0.7" />
      <circle cx="41" cy="59" r="3.2" fill="#3A1D26" />
      <circle cx="69" cy="59" r="3.2" fill="#3A1D26" />
      <path d="M49 65 Q55 73 61 65 Z" fill="#3A1D26" stroke="#3A1D26" strokeWidth="2.5" />
    </svg>
  )
}

const ITEMS = [
  { id: 'glasses', Art: Glasses, size: 128 },
  { id: 'photo', Art: Photo, size: 126 },
  { id: 'stopwatch', Art: Stopwatch, size: 120 },
  { id: 'mug', Art: Mug, size: 118 },
  { id: 'brain', Art: Brain, size: 124 },
  { id: 'book', Art: Book, size: 122 },
]
const SECONDS_PER_TURN = 30

export default function Orbit() {
  const reduce = useReducedMotion()
  const stage = useRef(null)
  const refs = useRef([])
  const elapsed = useRef(0)
  const [paused, setPaused] = useState(false)

  // Place every item for a given elapsed time.
  const place = (t) => {
    const el = stage.current
    if (!el) return
    const w = el.clientWidth
    const h = el.clientHeight
    const rx = w * 0.42
    const ry = h * 0.15
    const cx = w / 2
    const cy = h * 0.5
    const fit = w < 520 ? 0.62 : 1
    ITEMS.forEach((it, i) => {
      const node = refs.current[i]
      if (!node) return
      const th = (t / SECONDS_PER_TURN) * Math.PI * 2 + (i * Math.PI * 2) / ITEMS.length
      const depth = (Math.sin(th) + 1) / 2 // 0 at the back, 1 at the front
      const s = (0.7 + 0.42 * depth) * fit
      const x = cx + rx * Math.cos(th) - it.size / 2
      const y = cy + ry * Math.sin(th) - it.size / 2 - h * 0.04
      const turn = 34 * Math.cos(th * 2 + i)
      node.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s}) perspective(700px) rotateY(${turn}deg)`
      node.style.zIndex = depth > 0.5 ? 30 : 5
      node.style.opacity = String(0.74 + 0.26 * depth)
    })
  }

  useEffect(() => {
    const el = stage.current
    if (!el) return undefined
    if (reduce || paused) {
      place(elapsed.current || 4)
      const ro = new ResizeObserver(() => place(elapsed.current || 4))
      ro.observe(el)
      return () => ro.disconnect()
    }
    let raf
    let last = performance.now()
    const tick = (now) => {
      elapsed.current += (now - last) / 1000
      last = now
      place(elapsed.current)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, paused])

  return (
    <div className="relative mx-auto mt-2 w-full max-w-5xl px-5 md:px-8">
      <div ref={stage} className="relative h-[400px] w-full md:h-[580px]" style={{ perspective: 1000 }}>
        {/* grandpa, big (his picture already has the lime disc) */}
        <Grandpa
          className="absolute left-1/2 top-[50%] z-10 aspect-square w-[250px] -translate-x-1/2 -translate-y-1/2 md:w-[420px]"
          title="A cartoon grandfather with white tufts of hair, round green glasses and a big smile, waving"
        />
        {/* the things that circle him */}
        {ITEMS.map((it, i) => (
          <div
            key={it.id}
            ref={(n) => { refs.current[i] = n }}
            aria-hidden="true"
            className="absolute left-0 top-0 will-change-transform"
            style={{ width: it.size, height: it.size }}
          >
            <it.Art />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? 'Play the animation' : 'Pause the animation'}
          className="absolute right-0 top-0 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-ink bg-paper text-ink hover:bg-soft"
        >
          {paused || reduce ? (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1 L12 7 L3 13 Z" fill="currentColor" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" /></svg>
          )}
        </button>
      </div>
    </div>
  )
}
