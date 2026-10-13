import { useEffect, useMemo, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Grandpa from './Grandpa.jsx'

/**
 * RoutineOrbit: the product in one loop. The small things of a daily routine circle the mascot,
 * each on its own usual orbit, in faked 3D (nearer = larger and brighter, farther = smaller and dimmer).
 * Every few seconds one of them drifts off its orbit, turns magenta and is noticed, then settles back.
 *
 * Decorative, so aria-hidden, but there is a pause control (WCAG 2.2.2) and a visible caption that says
 * what is happening. Under reduced motion it holds one still pose, with one item shown off its orbit.
 * The twinkling field and the slow ring are CSS (see index.css) and stop under reduced motion too.
 */
const LINE = 'var(--color-ink)'
const SOFT = 'var(--color-route-soft)'
const ROUTE = 'var(--color-route)'
const PAPER = 'var(--color-paper)'
const BLUSH = 'var(--color-stray-soft)'
const SW = 4

const svgProps = { viewBox: '0 0 100 100', className: 'h-full w-full', strokeLinejoin: 'round', strokeLinecap: 'round' }

function Glasses() {
  return (
    <svg {...svgProps}>
      <path d="M8 40 Q14 28 28 34 M92 40 Q86 28 72 34" fill="none" stroke={LINE} strokeWidth={SW} />
      <circle cx="29" cy="58" r="19" fill={SOFT} stroke={LINE} strokeWidth={SW} />
      <circle cx="71" cy="58" r="19" fill={SOFT} stroke={LINE} strokeWidth={SW} />
      <path d="M47 54 Q50 49 53 54" fill="none" stroke={LINE} strokeWidth={SW} />
      <path d="M19 52 Q22 47 28 46 M61 52 Q64 47 70 46" fill="none" stroke={PAPER} strokeWidth="3" />
    </svg>
  )
}

function Mug() {
  return (
    <svg {...svgProps}>
      <path d="M38 8 Q34 14 38 20 M54 6 Q50 14 54 22" fill="none" stroke={LINE} strokeWidth="3.5" />
      <path d="M68 40 H76 A11 11 0 0 1 76 66 H68" fill="none" stroke={LINE} strokeWidth={SW} />
      <path d="M18 30 H70 V68 Q70 86 52 86 H36 Q18 86 18 68 Z" fill={ROUTE} stroke={LINE} strokeWidth={SW} />
      <ellipse cx="44" cy="30" rx="26" ry="6" fill={SOFT} stroke={LINE} strokeWidth={SW} />
      <path d="M44 70 C28 60 30 46 38 46 C42 46 44 49 44 51 C44 49 46 46 50 46 C58 46 60 60 44 70 Z" fill={PAPER} stroke={LINE} strokeWidth="3" />
    </svg>
  )
}

function Photo() {
  return (
    <svg {...svgProps}>
      <g transform="rotate(-9 50 50)">
        <rect x="14" y="8" width="72" height="84" rx="6" fill={PAPER} stroke={LINE} strokeWidth={SW} />
        <rect x="21" y="15" width="58" height="52" rx="3" fill={SOFT} stroke={LINE} strokeWidth="3" />
        <circle cx="40" cy="38" r="9" fill="#F7CFA4" stroke={LINE} strokeWidth="2.5" />
        <path d="M24 67 C24 54 32 50 40 50 C48 50 56 54 56 67 Z" fill={ROUTE} stroke={LINE} strokeWidth="2.5" />
        <circle cx="62" cy="43" r="7" fill="#FBD9B8" stroke={LINE} strokeWidth="2.5" />
        <path d="M50 67 C50 58 56 55 62 55 C68 55 74 58 74 67 Z" fill={SOFT} stroke={LINE} strokeWidth="2.5" />
        <path d="M50 84 C40 78 42 71 46 71 C48 71 50 73 50 74 C50 73 52 71 54 71 C58 71 60 78 50 84 Z" fill={BLUSH} stroke={LINE} strokeWidth="2.5" />
      </g>
    </svg>
  )
}

function Book() {
  return (
    <svg {...svgProps}>
      <path d="M6 24 Q28 16 50 28 V84 Q28 72 6 80 Z" fill={ROUTE} stroke={LINE} strokeWidth={SW} />
      <path d="M94 24 Q72 16 50 28 V84 Q72 72 94 80 Z" fill={PAPER} stroke={LINE} strokeWidth={SW} />
      <path d="M16 38 Q28 34 40 40 M16 50 Q28 46 40 52 M16 62 Q28 58 40 64" fill="none" stroke={PAPER} strokeWidth="3.5" />
      <path d="M60 40 Q72 34 84 38 M60 52 Q72 46 84 50 M60 64 Q72 58 84 62" fill="none" stroke={LINE} strokeWidth="3.5" />
    </svg>
  )
}

function Stopwatch() {
  return (
    <svg {...svgProps}>
      <rect x="42" y="4" width="16" height="9" rx="3" fill={ROUTE} stroke={LINE} strokeWidth="3.5" />
      <path d="M50 13 V20 M78 24 L84 18" stroke={LINE} strokeWidth={SW} />
      <circle cx="50" cy="58" r="36" fill={PAPER} stroke={LINE} strokeWidth={SW} />
      <circle cx="50" cy="58" r="28" fill={SOFT} stroke={LINE} strokeWidth="2.5" />
      <path d="M50 34 V38 M50 78 V82 M26 58 H30 M70 58 H74" stroke={LINE} strokeWidth="3.5" />
      <path d="M50 58 V42 M50 58 L62 66" fill="none" stroke={LINE} strokeWidth="4.5" />
      <circle cx="50" cy="58" r="3.5" fill={ROUTE} stroke={LINE} strokeWidth="2.5" />
    </svg>
  )
}

function Brain() {
  // A side view, front on the left: brain stem and cerebellum behind and below, the folded cerebrum on top.
  return (
    <svg {...svgProps}>
      {/* brain stem */}
      <path d="M47 62 C47 72 49 80 52 88 L66 88 C63 80 61 72 61 62 Z" fill={BLUSH} stroke={LINE} strokeWidth={SW} />
      {/* cerebellum, with its fine ridges */}
      <path d="M62 64 C70 58 88 58 90 68 C91 78 76 82 64 76 C60 72 60 68 62 64 Z" fill={BLUSH} stroke={LINE} strokeWidth={SW} />
      <path d="M68 66 C74 64 82 64 86 67 M66 71 C73 70 82 70 88 72 M68 76 C74 76 80 75 84 76" fill="none" stroke={LINE} strokeWidth="2.5" opacity="0.65" />
      {/* the cerebrum */}
      <path
        d="M10 52 C4 38 12 22 28 19 C34 8 54 5 64 13 C78 9 94 20 91 37 C97 47 91 60 80 62 C72 68 58 66 50 62 C42 68 24 68 16 62 C13 59 11 56 10 52 Z"
        fill={BLUSH} stroke={LINE} strokeWidth={SW}
      />
      {/* the folds: central sulcus, lateral fissure, and the gyri between */}
      <g fill="none" stroke={LINE} strokeWidth="3" opacity="0.7">
        <path d="M54 12 C50 22 58 28 52 38 C48 45 54 50 52 56" />
        <path d="M14 52 C26 46 34 52 44 46 C52 42 60 48 70 44" />
        <path d="M18 34 C22 26 28 34 32 27 C36 21 40 29 44 23" />
        <path d="M58 19 C62 14 68 20 72 14 C76 11 82 16 84 21" />
        <path d="M62 31 C68 36 74 28 80 33 C84 36 86 32 88 34" />
        <path d="M66 40 C70 36 76 42 82 38" />
        <path d="M22 42 C26 37 31 43 35 38 C38 35 41 39 44 36" />
        <path d="M26 57 C30 52 34 58 40 53" />
        <path d="M58 55 C63 59 70 53 76 58" />
      </g>
    </svg>
  )
}

const ITEMS = [
  { id: 'brain', Art: Brain, size: 116 },
  { id: 'glasses', Art: Glasses, size: 112 },
  { id: 'mug', Art: Mug, size: 104 },
  { id: 'photo', Art: Photo, size: 112 },
  { id: 'stopwatch', Art: Stopwatch, size: 104 },
  { id: 'book', Art: Book, size: 112 },
]
const SECONDS_PER_TURN = 36
const CYCLE = 11 // one item strays every CYCLE seconds, in turn
const HOLD_AT = 0.4 // fraction of the cycle at which the drifter stops, off its orbit

const smooth = (a, b, v) => {
  const x = Math.min(1, Math.max(0, (v - a) / (b - a)))
  return x * x * (3 - 2 * x)
}

// 0 on its orbit, 1 while parked off it. Eases out (0.2 to 0.4), holds about 4s (0.4 to 0.75), eases back.
const stray = (t, i) => {
  const k = Math.floor(t / CYCLE) % ITEMS.length
  if (k !== i) return 0
  const u = (t % CYCLE) / CYCLE
  return smooth(0.2, HOLD_AT, u) * (1 - smooth(0.75, 0.9, u))
}

// Where item i is on its orbit (radians) at time t.
const angleAt = (t, i) => (t / SECONDS_PER_TURN) * Math.PI * 2 + (i * Math.PI * 2) / ITEMS.length

// Deterministic twinkles: fixed positions so a re-render never reshuffles them.
const SPARKS = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  size: 6 + ((i * 7) % 9),
  delay: `${((i * 13) % 50) / 10}s`,
  dur: `${3.2 + ((i * 5) % 30) / 10}s`,
  tone: i % 3 === 0 ? 'var(--color-stray)' : i % 3 === 1 ? 'var(--color-route)' : 'var(--color-contour)',
}))

export default function RoutineOrbit() {
  const reduce = useReducedMotion()
  const stage = useRef(null)
  const items = useRef([])
  const rings = useRef([])
  const label = useRef(null)
  const elapsed = useRef(0)
  const dims = useRef({ w: 0, h: 0 })
  const [paused, setPaused] = useState(false)
  const [inView, setInView] = useState(false)
  const sparks = useMemo(() => SPARKS, [])

  // CSS ambience (twinkle, ring, bob) runs only while the orbit is on screen.
  useEffect(() => {
    const el = stage.current
    if (!el) return undefined
    const io = new IntersectionObserver(([en]) => setInView(en.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Cache the stage size so the per-frame loop never reads layout.
  useEffect(() => {
    const el = stage.current
    if (!el) return undefined
    const read = () => { dims.current = { w: el.clientWidth, h: el.clientHeight } }
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const place = (t, still) => {
    const el = stage.current
    if (!el) return
    const { w, h } = dims.current.w ? dims.current : { w: el.clientWidth, h: el.clientHeight }
    const rx = w * 0.36
    const ry = h * 0.19
    const cx = w / 2
    const cy = h * 0.5
    const fit = w < 520 ? 0.66 : 1
    const reach = Math.min(w, h) * 0.24 // how far a drifter parks beyond its orbit
    let strayPos = null
    ITEMS.forEach((it, i) => {
      const node = items.current[i]
      if (!node) return
      const e = still ? (i === 2 ? 1 : 0) : stray(t, i)
      // While it drifts, the item stops circling: its angle settles on where it was when the hold began.
      const held = angleAt(Math.floor(t / CYCLE) * CYCLE + CYCLE * HOLD_AT, i)
      const live = angleAt(t, i)
      const th = live + (held - live) * e
      const depth = (Math.sin(th) + 1) / 2 // 0 at the back, 1 at the front
      const s = (0.72 + 0.4 * depth) * fit * (1 + 0.12 * e)
      // push straight out from the mascot, so it leaves the orbit instead of just widening it
      const px = rx * Math.cos(th)
      const py = ry * Math.sin(th)
      const len = Math.hypot(px, py) || 1
      const half = (it.size * s) / 2
      const xc = Math.min(Math.max(cx + px + (px / len) * reach * e, half + 8), w - half - 8)
      const yc = Math.min(Math.max(cy + py + (py / len) * reach * e - h * 0.04 * e, half + 8), h - half - 8)
      const turn = 30 * Math.cos(th * 2 + i) + 40 * e
      node.style.transform = `translate3d(${xc - it.size / 2}px, ${yc - it.size / 2}px, 0) scale(${s}) perspective(700px) rotateY(${turn}deg)`
      node.style.zIndex = e > 0.05 ? 40 : depth > 0.5 ? 30 : 5
      node.style.opacity = String(0.78 + 0.22 * depth)
      const ring = rings.current[i]
      if (ring) ring.style.opacity = String(Math.min(1, e * 1.4))
      if (e > 0.05) strayPos = { e, x: xc, y: yc, half, above: yc < cy }
    })
    // The label rides with the drifter, which is parked (not moving) while the label is at full strength.
    const lab = label.current
    if (lab) {
      if (strayPos) {
        const lx = Math.min(Math.max(strayPos.x, 100), w - 100)
        const ly = strayPos.above ? strayPos.y - strayPos.half - 10 : strayPos.y + strayPos.half + 10
        lab.style.transform = `translate3d(${lx}px, ${Math.min(Math.max(ly, 6), h - 6)}px, 0) translate(-50%, ${strayPos.above ? '-100%' : '0'})`
        lab.style.opacity = String(Math.min(1, strayPos.e * 1.6))
      } else {
        lab.style.opacity = '0'
      }
    }
  }

  useEffect(() => {
    const el = stage.current
    if (!el) return undefined
    if (reduce) {
      place(5, true)
      const ro = new ResizeObserver(() => place(5, true))
      ro.observe(el)
      return () => ro.disconnect()
    }
    if (paused) {
      place(elapsed.current, false)
      const ro = new ResizeObserver(() => place(elapsed.current, false))
      ro.observe(el)
      return () => ro.disconnect()
    }
    let raf
    let last = performance.now()
    let visible = true
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting })
    io.observe(el)
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      if (visible) {
        elapsed.current += dt
        place(elapsed.current, false)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, paused])

  return (
    <figure className={`w-full ${paused || !inView ? 'orbit-paused' : ''}`}>
      <div ref={stage} aria-hidden="true" className="relative h-[380px] w-full overflow-hidden md:h-[500px]">
        {/* the twinkling field */}
        {sparks.map((p, i) => (
          <span
            key={i}
            className="spark absolute"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: p.delay, animationDuration: p.dur, color: p.tone }}
          />
        ))}

        {/* the usual orbit, drawn faintly */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <ellipse cx="50" cy="50" rx="36" ry="19" fill="none" stroke="var(--color-route)" strokeWidth="0.35" strokeDasharray="1.2 1.6" opacity="0.55" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* the mascot, with a slow dashed ring */}
        <div className="absolute left-1/2 top-[50%] z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-[150px] w-[150px] md:h-[200px] md:w-[200px]">
            <svg className="ring-slow absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="var(--color-route)" strokeWidth="0.8" strokeDasharray="2 3.2" />
            </svg>
            <Grandpa className="bob h-full w-full rounded-full ring-4 ring-ink" />
          </div>
        </div>

        {/* the routine items */}
        {ITEMS.map((it, i) => (
          <div
            key={it.id}
            ref={(n) => { items.current[i] = n }}
            className="absolute left-0 top-0 will-change-transform"
            style={{ width: it.size, height: it.size }}
          >
            <span
              ref={(n) => { rings.current[i] = n }}
              className="absolute -inset-2 rounded-full border-[3px] border-stray opacity-0"
            />
            <it.Art />
          </div>
        ))}

        <p
          ref={label}
          className="sign absolute left-0 top-0 z-50 whitespace-nowrap rounded-card bg-paper px-3 py-1.5 text-base text-stray opacity-0 ring-2 ring-stray"
        >
          Off its usual orbit
        </p>
      </div>

      <div className="mt-4 flex items-start gap-4">
        {/* Nothing moves under reduced motion, so there is nothing to pause: no control. */}
        {!reduce && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label="Pause animation"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card border-2 border-ink text-ink hover:bg-soft"
          >
            {paused ? (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1 L12 7 L3 13 Z" fill="currentColor" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" /></svg>
            )}
          </button>
        )}
        <figcaption className="max-w-md text-base text-muted">
          An illustration. Each part of a day has its own usual orbit. When one drifts away from it, it is noticed.
        </figcaption>
      </div>
    </figure>
  )
}
