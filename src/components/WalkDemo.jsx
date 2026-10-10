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
const PLAY_SECONDS = 16
const HOME_AT = 0.985

const STATUS = {
  usual: 'On the usual route',
  leaving: 'Leaving the usual route',
  alert: 'Noticed early. Caregiver alerted.',
  home: 'Back home',
}

// Keeps labels readable where they cross other lines.
const HALO = { stroke: 'var(--color-paper)', strokeWidth: 4, paintOrder: 'stroke', strokeLinejoin: 'round' }

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
  const playback = useRef(null)
  const [p, setP] = useState(reduce ? 1 : 0)
  const [marks, setMarks] = useState({ leave: 0.45, flag: 0.6, flagPt: { x: 500, y: 110 } })
  const [playing, setPlaying] = useState(false)

  // Measure where "leaving" and "noticed" fall along today's walk.
  useLayoutEffect(() => {
    const total = todayRef.current.getTotalLength()
    const flagLen = flagRef.current.getTotalLength()
    const pt = todayRef.current.getPointAtLength(flagLen)
    setMarks({ leave: leaveRef.current.getTotalLength() / total, flag: flagLen / total, flagPt: { x: pt.x, y: pt.y } })
  }, [])

  // Move grandpa to the current point.
  useLayoutEffect(() => {
    const path = todayRef.current
    const pt = path.getPointAtLength(path.getTotalLength() * p)
    walkerRef.current.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
  }, [p])

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
      onUpdate: setP,
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

  const phase = phaseOf(p, marks)
  const noticed = phase === 'alert' || phase === 'home'
  const { flagPt } = marks

  return (
    <figure className="w-full rounded-card-lg border border-rule bg-paper p-4 md:p-7">
      <svg
        viewBox="0 0 560 520"
        role="img"
        aria-label="Illustration of one walk. A shaded loop shows a cartoon grandfather's usual route from home. Today's walk follows it, strays, is noticed early with an example alert, and returns home."
        className="h-auto w-full overflow-visible"
      >

        {/* measuring paths, never drawn */}
        <path ref={leaveRef} d={TO_LEAVE} fill="none" stroke="none" />
        <path ref={flagRef} d={TO_FLAG} fill="none" stroke="none" />

        {/* the usual route, drawn as a road: park inside, dark edge, lime surface, dashed centre line */}
        <path d={USUAL} fill="var(--color-soft)" />
        <g aria-hidden="true">
          {/* trees and a bench inside the loop */}
          {[[190, 348], [330, 262], [322, 345], [236, 232]].map(([x, y]) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
              <rect x="-3" y="-2" width="6" height="18" rx="2" fill="var(--color-ink)" />
              {/* fluffy canopy: an ink silhouette first, then the green on top, so no inner outlines */}
              {[[-9, -4, 10], [9, -4, 10], [0, -15, 11], [0, -2, 11]].map(([cx, cy, r]) => (
                <circle key={`o${cx}${cy}`} cx={cx} cy={cy} r={r + 2} fill="var(--color-ink)" />
              ))}
              {[[-9, -4, 10], [9, -4, 10], [0, -15, 11], [0, -2, 11]].map(([cx, cy, r]) => (
                <circle key={`f${cx}${cy}`} cx={cx} cy={cy} r={r} fill="var(--color-care)" />
              ))}
              <circle cx="-5" cy="-14" r="3.2" fill="var(--color-lime)" opacity="0.85" />
              <circle cx="7" cy="-6" r="2.4" fill="var(--color-lime)" opacity="0.7" />
            </g>
          ))}
        </g>
        <path d={USUAL} fill="none" stroke="var(--color-ink)" strokeWidth="34" strokeLinejoin="round" />
        <path d={USUAL} fill="none" stroke="var(--color-lime)" strokeWidth="26" strokeLinejoin="round" />
        <path d={USUAL} fill="none" stroke="var(--color-paper)" strokeWidth="2.5" strokeDasharray="9 11" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        <path d={TODAY} fill="none" stroke="var(--color-rule)" strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
        <path
          ref={todayRef} d={TODAY} pathLength="1" fill="none" stroke="var(--color-care)" strokeWidth="5" strokeLinecap="round"
          strokeDasharray="1 1" strokeDashoffset={1 - p}
        />

        <g aria-hidden="true" transform="translate(272 292)">
          <rect x="-66" y="-17" width="132" height="34" rx="17" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2" />
          <text y="6" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--color-ink)">Usual route</text>
        </g>

        {/* home */}
        <path d="M124 408 L94 436" aria-hidden="true" fill="none" stroke="var(--color-ink)" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
        <g aria-hidden="true" transform="translate(70 462)">
          <motion.circle r="34" fill="var(--color-lime)" initial={false} animate={{ opacity: phase === 'home' ? 0.5 : 0 }} transition={{ duration: 1 }} />
          <g transform="translate(0 -3) scale(1.35)">
            <path d="M-13 12 V-4 L0 -16 L13 -4 V12 Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinejoin="round" />
            <rect x="-4" y="1" width="8" height="11" rx="1.5" fill="var(--color-lime)" stroke="var(--color-ink)" strokeWidth="2" />
          </g>
          <text y="52" textAnchor="middle" fontSize="22" fontWeight="800" fill="var(--color-ink)" {...HALO}>Home</text>
        </g>

        {/* the moment it is noticed */}
        <AnimatePresence>
          {noticed && (
            <motion.g
              key="noticed" aria-hidden="true"
              initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
            >
              <circle cx={flagPt.x} cy={flagPt.y} r="30" fill="none" stroke="var(--color-lime)" strokeWidth="5" />
              <g textAnchor="end" {...HALO}>
                <text x="470" y="26" fontSize="26" fontWeight="900" fill="var(--color-ink)">Noticed early</text>
                <text x="470" y="50" fontSize="16" fontWeight="500" fill="var(--color-muted)">Example alert: movement 3&times; slower</text>
                <text x="470" y="70" fontSize="16" fontWeight="500" fill="var(--color-muted)">than usual for 2pm</text>
              </g>
              {!reduce && (
                <motion.circle
                  cx={flagPt.x} cy={flagPt.y} r="30" fill="none" stroke="var(--color-lime)" strokeWidth="4"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  initial={{ opacity: 0.9, scale: 1 }} animate={{ opacity: 0, scale: 1.9 }} transition={{ duration: 2.2, ease: 'easeOut' }}
                />
              )}
            </motion.g>
          )}
        </AnimatePresence>

        {/* grandpa, walking his route */}
        <g ref={walkerRef} aria-hidden="true" transform="translate(130 400)">
          <image href={GRANDPA_SRC} x="-37" y="-37" width="74" height="74" />
        </g>
      </svg>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
        <Button
          variant="outline"
          className="min-w-[10.5rem]"
          onClick={playing ? stop : () => play(p)}
        >
          {playing ? 'Pause' : p >= 0.999 ? 'Replay the walk' : 'Play the walk'}
        </Button>
        <div className="flex min-w-[14rem] flex-1 items-center gap-4">
          <label className="flex flex-1 items-center">
            <span className="sr-only">Move through today&rsquo;s walk</span>
            <input
              type="range" min="0" max="1000" step="1"
              value={Math.round(p * 1000)}
              onChange={(e) => { stop(); setP(Number(e.target.value) / 1000) }}
              aria-valuetext={`${clock(p)}, ${STATUS[phase]}`}
              className="pill-range"
              style={{ '--p': `${p * 100}%` }}
            />
          </label>
          <span className="w-[4.75rem] shrink-0 text-right font-semibold tabular-nums" aria-hidden="true">{clock(p)}</span>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-2 font-semibold" aria-live="polite">
        <span
          aria-hidden="true"
          className={`h-3 w-3 rounded-full border-2 border-ink ${phase === 'alert' ? 'bg-lime' : phase === 'leaving' ? 'bg-soft' : 'bg-paper'}`}
        />
        <span>{STATUS[phase]}</span>
      </p>

      <figcaption className="mt-3 text-base text-muted">
        Drag the slider to move through the walk. This is an illustration, not real patient data.
      </figcaption>
    </figure>
  )
}
