import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Threads from './Threads.jsx'
import { site, team } from '../content.js'

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

function WalkDemo() {
  const reduce = useReducedMotion()
  const todayRef = useRef(null)
  const leaveRef = useRef(null)
  const flagRef = useRef(null)
  const dotRef = useRef(null)
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

  // Move the walker to the current point.
  useLayoutEffect(() => {
    const path = todayRef.current
    const pt = path.getPointAtLength(path.getTotalLength() * p)
    dotRef.current.setAttribute('cx', pt.x)
    dotRef.current.setAttribute('cy', pt.y)
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
    <figure className="w-full border border-rule bg-paper/90 p-4 md:p-6">
      <svg
        viewBox="0 0 560 520"
        role="img"
        aria-label="Illustration of one walk. A shaded loop shows the person's usual route from home. Today's walk follows it, strays, is noticed early with an example alert, and returns home."
        className="h-auto w-full overflow-visible"
      >
        {/* measuring paths, never drawn */}
        <path ref={leaveRef} d={TO_LEAVE} fill="none" stroke="none" />
        <path ref={flagRef} d={TO_FLAG} fill="none" stroke="none" />

        <path d={USUAL} fill="var(--color-soft)" stroke="var(--color-teal)" strokeOpacity="0.55" strokeWidth="1.25" strokeDasharray="3 6" />
        <path d={TODAY} fill="none" stroke="var(--color-rule)" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
        <path
          ref={todayRef} d={TODAY} pathLength="1" fill="none" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray="1 1" strokeDashoffset={1 - p}
        />

        <g aria-hidden="true" fontSize="16" fill="var(--color-muted)" {...HALO}>
          <text x="215" y="274">Usual route</text>
        </g>

        {/* home */}
        <g aria-hidden="true" transform="translate(130 400)">
          <motion.circle r="30" fill="var(--color-teal)" initial={false} animate={{ opacity: phase === 'home' ? 0.16 : 0 }} transition={{ duration: 0.6 }} />
          <path d="M-9 10 V-4 A9 9 0 0 1 9 -4 V10" fill="none" stroke="var(--color-teal)" strokeWidth="2.25" />
          <text y="46" textAnchor="middle" fontSize="24" fill="var(--color-teal)" className="font-serif" fontStyle="italic" {...HALO}>Home</text>
        </g>

        {/* the moment it is noticed */}
        <AnimatePresence>
          {noticed && (
            <motion.g
              key="noticed" aria-hidden="true"
              initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            >
              <circle cx={flagPt.x} cy={flagPt.y} r="6" fill="var(--color-teal)" />
              <circle cx={flagPt.x} cy={flagPt.y} r="13" fill="none" stroke="var(--color-teal)" strokeWidth="1.75" />
              <g textAnchor="end" {...HALO}>
                <text x="478" y="40" fontSize="26" fill="var(--color-ink)" className="font-serif" fontStyle="italic">Noticed early</text>
                <text x="478" y="66" fontSize="16" fill="var(--color-muted)">Example alert: movement 3&times; slower</text>
                <text x="478" y="86" fontSize="16" fill="var(--color-muted)">than usual for 2pm</text>
              </g>
              {!reduce && (
                <motion.circle
                  cx={flagPt.x} cy={flagPt.y} r="13" fill="none" stroke="var(--color-teal)" strokeWidth="1.75"
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                  initial={{ opacity: 0.8, scale: 1 }} animate={{ opacity: 0, scale: 3.2 }} transition={{ duration: 1.4, ease: 'easeOut' }}
                />
              )}
            </motion.g>
          )}
        </AnimatePresence>

        {/* the walker */}
        <circle ref={dotRef} r="8" fill="var(--color-paper)" stroke="var(--color-teal)" strokeWidth="3" aria-hidden="true" />
      </svg>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
        <button
          type="button"
          onClick={playing ? stop : () => play(p)}
          className="min-w-[10.5rem] border-2 border-teal px-4 py-2 font-semibold text-teal transition-colors hover:bg-teal hover:text-paper"
        >
          {playing ? 'Pause' : p >= 0.999 ? 'Replay the walk' : 'Play the walk'}
        </button>
        <div className="flex min-w-[14rem] flex-1 items-center gap-4">
        <label className="flex flex-1 items-center">
          <span className="sr-only">Move through today&rsquo;s walk</span>
          <input
            type="range" min="0" max="1000" step="1"
            value={Math.round(p * 1000)}
            onChange={(e) => { stop(); setP(Number(e.target.value) / 1000) }}
            aria-valuetext={`${clock(p)}, ${STATUS[phase]}`}
            className="h-2 w-full cursor-pointer accent-[var(--color-teal)]"
          />
        </label>
        <span className="w-[4.75rem] shrink-0 text-right tabular-nums text-muted" aria-hidden="true">{clock(p)}</span>
        </div>
      </div>

      <p className="mt-3 flex items-center gap-2 font-semibold" aria-live="polite">
        <span
          aria-hidden="true"
          className={`h-2.5 w-2.5 rounded-full ${phase === 'alert' ? 'bg-ink' : phase === 'leaving' ? 'bg-muted' : 'bg-teal'}`}
        />
        <span className={phase === 'alert' ? 'text-ink' : 'text-teal'}>{STATUS[phase]}</span>
      </p>

      <figcaption className="mt-3 text-base text-muted">
        Drag the slider to move through the walk. This is an illustration, not real patient data.
      </figcaption>
    </figure>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const list = team.map((t) => t.name)
  const names = list.length > 1 ? `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}` : list[0]
  // One short entrance for the text, timed to start alongside the walk.
  const enter = (delay) =>
    reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: [0.22, 0.61, 0.36, 1] } }

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Flowing threads, kept to the hero so the reading sections stay plain */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Threads
          color="#10B981"
          lineCount={90}
          thickness={0.6}
          softness={1.3}
          amplitude={1.7}
          distance={0.4}
          waves={1.05}
          speed={0.6}
          split={0.04}
          fray={0.5}
          angle={25}
          taper={0.85}
          brightness={1.4}
          parting={0}
          enableMouseInteraction
          fade={0}
          opacity={0.45}
        />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-6xl items-center gap-12 px-5 py-14 md:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <motion.h1 {...enter(0)} className="font-serif text-5xl font-medium leading-[1.02] tracking-[-0.015em] sm:text-6xl lg:text-7xl">
            Wandering Detection System
          </motion.h1>
          <motion.p {...enter(0.12)} className="mt-4 font-serif text-2xl italic leading-tight sm:text-3xl">
            for Dementia / Alzheimer&rsquo;s Patients
          </motion.p>
          <motion.div {...enter(0.24)}>
            <p className="mt-8 max-w-md text-xl leading-relaxed">{site.tagline}</p>
            <p className="mt-4 max-w-md font-serif text-2xl italic text-teal">{site.quiet}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#involve" className="bg-teal px-6 py-3 font-semibold text-paper transition-colors hover:bg-ink">Get involved</a>
              <a href="#architecture" className="underline underline-offset-4 hover:text-teal">How it works</a>
            </div>
            <p className="mt-10 border-t border-ink pt-4 text-muted">By {names}, {site.college}.</p>
          </motion.div>
        </div>
        <motion.div {...enter(0.1)} className="lg:col-span-7">
          <WalkDemo />
        </motion.div>
      </div>
    </section>
  )
}
