import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Button from './Button.jsx'
import { GRANDPA_SRC } from './Grandpa.jsx'

// One illustrative walk. USUAL is the learned routine. TODAY follows it, strays to the
// point where the system notices, then returns home. Not real data.
const USUAL = 'M130 400 C 60 340, 70 220, 170 180 S 360 120, 430 200 S 470 330, 380 380 S 200 450, 130 400 Z'
const TO_LEAVE = 'M130 400 C 60 340, 70 220, 170 180 S 360 120, 430 200'
const TO_FLAG = `${TO_LEAVE} C 470 230, 520 190, 500 110`
const TODAY = `${TO_FLAG} C 560 220, 520 420, 300 470 S 170 430, 130 400`

// The clock under the walk runs 1:30 to 2:30 pm, to match the example alert.
const START_MIN = 13 * 60 + 30
const SPAN_MIN = 60
const PLAY_SECONDS = 10
const HOME_AT = 0.985

const STATUS = {
  usual: 'On the usual route',
  leaving: 'Leaving the usual route',
  alert: 'Example: noticed early, caregiver alerted.',
  home: 'Back home',
}

// Keeps labels readable where they cross other lines.
const HALO = { stroke: 'var(--color-paper)', strokeWidth: 5, paintOrder: 'stroke', strokeLinejoin: 'round' }
// Map labels are set in the signage face.
const SIGN = { fontFamily: 'var(--font-sign)' }

// Faint contour lines on the map's paper.
const MAP_CONTOURS = [
  'M-20 70 C 80 40, 180 100, 300 60 S 480 20, 580 50',
  'M-20 110 C 90 80, 190 140, 310 100 S 490 60, 580 90',
  'M-20 500 C 60 470, 160 520, 260 495 S 440 450, 580 480',
  'M430 300 C 470 270, 540 285, 545 330 S 500 400, 455 385 S 400 330, 430 300 Z',
]

function clock(p) {
  const m = Math.round(START_MIN + p * SPAN_MIN)
  const h = Math.floor(m / 60)
  return `${h > 12 ? h - 12 : h}:${String(m % 60).padStart(2, '0')} pm`
}

function phaseOf(p, marks) {
  if (p >= HOME_AT) return 'home'
  if (p >= marks.flag) return 'alert'
  if (p >= marks.leave) return 'leaving'
  return 'usual'
}

export default function WalkDemo() {
  const reduce = useReducedMotion()
  const todayRef = useRef(null)
  const leaveRef = useRef(null)
  const flagRef = useRef(null)
  const walkerRef = useRef(null)
  const strayRef = useRef(null)
  const sliderRef = useRef(null)
  const clockRef = useRef(null)
  const playback = useRef(null)
  // The walk's position lives in a ref and is written straight to the SVG and the slider every frame.
  // React state holds only what changes a few times per walk: the phase, and whether it has finished.
  const pRef = useRef(reduce ? 1 : 0)
  const marksRef = useRef({ leave: 0.45, flag: 0.6 })
  const lenRef = useRef(1)
  const [marks, setMarks] = useState({ leave: 0.45, flag: 0.6, flagPt: { x: 500, y: 110 } })
  const [phase, setPhase] = useState(reduce ? 'home' : 'usual')
  const [done, setDone] = useState(Boolean(reduce))
  const [playing, setPlaying] = useState(false)

  // Put everything at position v (0 to 1): the ink line, the magenta stretch, grandpa, slider, clock, phase.
  const apply = (v) => {
    pRef.current = v
    const { leave, flag } = marksRef.current
    todayRef.current.setAttribute('stroke-dashoffset', String(1 - v))
    const stray = strayRef.current
    stray.setAttribute('opacity', v > leave ? '1' : '0')
    stray.setAttribute('stroke-dasharray', `0 ${leave} ${Math.max(0, v - leave)} 2`)
    const pt = todayRef.current.getPointAtLength(lenRef.current * v)
    walkerRef.current.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
    const next = phaseOf(v, { leave, flag })
    const slider = sliderRef.current
    slider.value = String(Math.round(v * 1000))
    slider.style.setProperty('--p', `${v * 100}%`)
    slider.setAttribute('aria-valuetext', `${clock(v)}, ${STATUS[next]}`)
    clockRef.current.textContent = clock(v)
    setPhase(next)
    setDone(v >= 0.999)
  }

  // Measure where "leaving" and "noticed" fall along today's walk, then draw the starting position.
  useLayoutEffect(() => {
    const total = todayRef.current.getTotalLength()
    const flagLen = flagRef.current.getTotalLength()
    const pt = todayRef.current.getPointAtLength(flagLen)
    lenRef.current = total
    marksRef.current = { leave: leaveRef.current.getTotalLength() / total, flag: flagLen / total }
    setMarks({ ...marksRef.current, flagPt: { x: pt.x, y: pt.y } })
    apply(pRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stop = () => {
    playback.current?.stop()
    setPlaying(false)
  }

  const play = (from) => {
    playback.current?.stop()
    const start = from >= 0.999 ? 0 : from
    setPlaying(true)
    playback.current = animate(start, 1, {
      duration: PLAY_SECONDS * (1 - start),
      ease: 'linear',
      onUpdate: apply,
      onComplete: () => setPlaying(false),
    })
  }

  // Play once on load, unless the visitor prefers reduced motion.
  useEffect(() => {
    if (reduce) return undefined
    const t = setTimeout(() => play(0), 700)
    return () => {
      clearTimeout(t)
      playback.current?.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const noticed = phase === 'alert' || phase === 'home'
  const { flagPt } = marks

  return (
    <figure className="w-full rounded-card-lg border border-rule bg-paper p-4 md:p-6">
      <svg
        viewBox="0 0 560 520"
        role="img"
        aria-label="Illustration of one walk. A shaded loop shows a cartoon grandfather's usual route from home. Today's walk follows it, strays, is noticed early with an example alert, and returns home."
        className="h-auto w-full overflow-visible"
      >
        <g aria-hidden="true" fill="none" stroke="var(--color-contour)" strokeWidth="1.25">
          {MAP_CONTOURS.map((d) => <path key={d} d={d} />)}
        </g>

        {/* measuring paths, never drawn */}
        <path ref={leaveRef} d={TO_LEAVE} fill="none" stroke="none" />
        <path ref={flagRef} d={TO_FLAG} fill="none" stroke="none" />

        {/* the usual route, drawn as a park path: green inside, a green road, a dashed centre line */}
        <path d={USUAL} fill="var(--color-route-soft)" />
        <g aria-hidden="true">
          {/* trees inside the loop */}
          {[[190, 348], [330, 262], [322, 345], [236, 232]].map(([x, y]) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
              <rect x="-2.5" y="-2" width="5" height="16" rx="2" fill="var(--color-ink)" />
              {[[-8, -4, 9], [8, -4, 9], [0, -14, 10], [0, -2, 10]].map(([cx, cy, r]) => (
                <circle key={`f${cx}${cy}`} cx={cx} cy={cy} r={r} fill="var(--color-route)" />
              ))}
            </g>
          ))}
        </g>
        <path d={USUAL} fill="none" stroke="var(--color-route)" strokeWidth="22" strokeLinejoin="round" />
        <path d={USUAL} fill="none" stroke="var(--color-paper)" strokeWidth="2.5" strokeDasharray="9 11" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        <path d={TODAY} fill="none" stroke="var(--color-muted)" strokeWidth="2.5" strokeDasharray="2 8" strokeLinecap="round" opacity="0.6" />
        {/* today, walked so far: ink while on the usual route... */}
        {/* (stroke-dashoffset and the magenta dasharray are written by apply(), never by React) */}
        <path
          ref={todayRef} d={TODAY} pathLength="1" fill="none" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round"
          strokeDasharray="1 1"
        />
        {/* ...and footpath magenta from the moment it leaves it */}
        <path
          ref={strayRef} d={TODAY} pathLength="1" fill="none" stroke="var(--color-stray)" strokeWidth="5" strokeLinecap="round"
          opacity="0"
        />

        <g aria-hidden="true" transform="translate(272 292)" style={SIGN}>
          <rect x="-82" y="-20" width="164" height="40" rx="6" fill="var(--color-paper)" stroke="var(--color-route)" strokeWidth="2.5" />
          <text y="8" textAnchor="middle" fontSize="23" fontWeight="800" fill="var(--color-route)">Usual route</text>
        </g>

        {/* home */}
        <path d="M124 408 L94 436" aria-hidden="true" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
        <g aria-hidden="true" transform="translate(70 462)">
          <motion.circle r="34" fill="var(--color-route-soft)" initial={false} animate={{ opacity: phase === 'home' ? 1 : 0 }} transition={{ duration: 1 }} />
          <g transform="translate(0 -3) scale(1.35)">
            <path d="M-13 12 V-4 L0 -16 L13 -4 V12 Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="-4" y="1" width="8" height="11" rx="1.5" fill="var(--color-route)" />
          </g>
          <text y="62" textAnchor="middle" fontSize="27" fontWeight="800" fill="var(--color-ink)" style={SIGN} {...HALO}>Home</text>
        </g>

        {/* the moment it is noticed */}
        <AnimatePresence>
          {noticed && (
            <motion.g
              key="noticed" aria-hidden="true"
              initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
            >
              <circle cx={flagPt.x} cy={flagPt.y} r="28" fill="none" stroke="var(--color-stray)" strokeWidth="4" />
              <g textAnchor="end" {...HALO}>
                <text x="468" y="30" fontSize="30" fontWeight="800" fill="var(--color-stray)" style={SIGN}>Noticed early</text>
              </g>
              {!reduce && (
                <motion.circle
                  cx={flagPt.x} cy={flagPt.y} r="28" fill="none" stroke="var(--color-stray)" strokeWidth="3"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  initial={{ opacity: 0.9, scale: 1 }} animate={{ opacity: 0, scale: 1.9 }} transition={{ duration: 2.2, ease: 'easeOut' }}
                />
              )}
            </motion.g>
          )}
        </AnimatePresence>

        {/* grandpa, walking his route */}
        <g ref={walkerRef} aria-hidden="true" transform="translate(130 400)">
          <circle r="35" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" />
          <image href={GRANDPA_SRC} x="-34" y="-34" width="68" height="68" />
        </g>
      </svg>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
        <Button
          variant="outline"
          className="min-w-[10.5rem]"
          onClick={playing ? stop : () => play(pRef.current)}
        >
          {playing ? 'Pause' : done ? 'Replay the walk' : 'Play the walk'}
        </Button>
        <div className="flex min-w-[14rem] flex-1 items-center gap-4">
          <label className="flex flex-1 items-center">
            <span className="sr-only">Move through today&rsquo;s walk</span>
            <input
              ref={sliderRef}
              type="range" min="0" max="1000" step="1"
              defaultValue={reduce ? 1000 : 0}
              onChange={(e) => { stop(); apply(Number(e.target.value) / 1000) }}
              className="pill-range"
            />
          </label>
          <span ref={clockRef} className="sign w-[4.75rem] shrink-0 text-right tabular-nums" aria-hidden="true" />
        </div>
      </div>

      <p className={`mt-4 flex items-center gap-2 font-bold ${noticed && phase !== 'home' ? 'text-stray' : ''}`} aria-live="polite">
        <span
          aria-hidden="true"
          className={`h-3 w-3 rounded-full border-2 ${phase === 'alert' ? 'border-stray bg-stray' : phase === 'leaving' ? 'border-stray bg-paper' : 'border-route bg-route'}`}
        />
        <span>{STATUS[phase]}</span>
      </p>
      {noticed && (
        <p className="mt-1 text-base text-muted">
          Example alert: &ldquo;off the usual route, and slower than usual for 2pm.&rdquo;
        </p>
      )}

      <figcaption className="mt-3 text-base text-muted">
        Drag the slider to move through the walk. This is an illustration, not real patient data.
      </figcaption>
    </figure>
  )
}
