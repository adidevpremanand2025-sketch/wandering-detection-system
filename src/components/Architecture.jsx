import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { Section } from './ui.jsx'
import { architecture } from '../content.js'

const INK = 'var(--color-ink)'
const TEAL = 'var(--color-care)'
const PAPER = 'var(--color-paper)'
const SOFT = 'var(--color-soft)'
const LIME = 'var(--color-lime)'
const MUTED = 'var(--color-muted)'

// Geometry for each node in a 360-wide viewBox (stacks vertically, scales down to 320px).
const GEO = {
  wearable: { x: 20, y: 10, w: 280, h: 60 },
  collect: { x: 20, y: 98, w: 280, h: 60 },
  features: { x: 20, y: 186, w: 280, h: 60 },
  calibration: { x: 20, y: 274, w: 280, h: 60 },
  baseline: { x: 20, y: 362, w: 280, h: 60 },
  model: { x: 20, y: 450, w: 280, h: 60 },
  decision: { x: 20, y: 540, w: 280, h: 88 },
  alert: { x: 20, y: 680, w: 150, h: 80 },
  continue: { x: 190, y: 680, w: 150, h: 80 },
  explain: { x: 20, y: 788, w: 150, h: 104 },
}

// [path, arrowhead x, arrowhead y, rotation]
const LINKS = [
  ['M160 70 V98', 160, 98, 0],
  ['M160 158 V186', 160, 186, 0],
  ['M160 246 V274', 160, 274, 0],
  ['M160 334 V362', 160, 362, 0],
  ['M160 422 V450', 160, 450, 0],
  ['M160 510 V540', 160, 540, 0],
  ['M95 608 V680', 95, 680, 0],
  ['M225 608 V680', 225, 680, 0],
  ['M95 760 V788', 95, 788, 0],
  ['M340 720 H352 V128 H300', 300, 128, 90],
]

const PACKET_PATH = 'M160 40 V584 L95 608 V834'
const VB_H = 904

function Link({ d, hx, hy, rot, i }) {
  const reduce = useReducedMotion()
  const delay = 0.25 + i * 0.2
  return (
    <g>
      <motion.path
        d={d} fill="none" stroke={INK} strokeWidth="1"
        initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.65, delay }}
      />
      <motion.path
        d={`M${hx - 4} ${hy - 7} L${hx} ${hy} L${hx + 4} ${hy - 7}`} fill="none" stroke={INK} strokeWidth="1"
        transform={`rotate(${rot} ${hx} ${hy})`}
        initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.35, delay: delay + 0.5 }}
      />
    </g>
  )
}

function Node({ node, i, active, setActive }) {
  const reduce = useReducedMotion()
  const g = GEO[node.id]
  const isDecision = node.kind === 'decision'
  const isEnd = node.kind === 'end' || node.id === 'alert'
  const stroke = active ? TEAL : isEnd ? TEAL : INK
  const fill = node.id === 'explain' ? LIME : active ? SOFT : PAPER
  const delay = 0.08 + i * 0.16
  const vp = { once: true, margin: '0px 0px -10% 0px' }
  const outline = isDecision
    ? `M${g.x + g.w / 2} ${g.y} L${g.x + g.w} ${g.y + g.h / 2} L${g.x + g.w / 2} ${g.y + g.h} L${g.x} ${g.y + g.h / 2} Z`
    : null

  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${node.title}${node.sub ? ', ' + node.sub : ''}. ${node.tip}`}
      aria-pressed={active}
      className="cursor-pointer outline-none [&:focus-visible_.focus-ring]:opacity-100"
      onMouseEnter={() => setActive(node.id)}
      onMouseLeave={() => setActive(null)}
      onFocus={() => setActive(node.id)}
      onBlur={() => setActive(null)}
      onClick={() => setActive(active ? null : node.id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(active ? null : node.id) } }}
    >
      {isDecision ? (
        <>
          <motion.path d={outline} fill={fill} stroke="none" initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp} transition={{ duration: 0.5, delay }} style={{ transition: 'fill 0.2s' }} />
          <motion.path d={outline} fill="none" stroke={stroke} strokeWidth="1" initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={vp} transition={{ duration: 0.8, delay }} />
        </>
      ) : (
        <>
          <motion.rect x={g.x} y={g.y} width={g.w} height={g.h} fill={fill} initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={vp} transition={{ duration: 0.5, delay }} style={{ transition: 'fill 0.2s' }} />
          <motion.rect x={g.x} y={g.y} width={g.w} height={g.h} fill="none" stroke={stroke} strokeWidth="1" initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={vp} transition={{ duration: 0.8, delay }} />
        </>
      )}
      <rect className="focus-ring opacity-0" x={g.x - 3} y={g.y - 3} width={g.w + 6} height={g.h + 6} fill="none" stroke={TEAL} strokeWidth="2" pointerEvents="none" />
      {/* Labels are always visible; only the outlines draw in. */}
      <foreignObject x={g.x + (isDecision ? 60 : 0)} y={g.y} width={isDecision ? g.w - 120 : g.w} height={g.h}>
        <div className="flex h-full flex-col items-center justify-center px-2 text-center" style={{ pointerEvents: 'none' }}>
          <span className="font-serif text-[17px] leading-tight text-ink">{node.title}</span>
          {node.sub && <span className="mt-0.5 text-[14px] leading-snug" style={{ color: MUTED }}>{node.sub}</span>}
        </div>
      </foreignObject>
    </g>
  )
}

function Tip({ node, className = '' }) {
  return (
    <div className={`border border-rule bg-paper p-4 text-sm ${className}`} aria-live="polite">
      {node ? (
        <>
          <p className="font-serif text-lg">{node.title}</p>
          <p className="mt-1 leading-relaxed text-muted">{node.tip}</p>
        </>
      ) : (
        <p className="leading-relaxed text-muted">{architecture.hint}</p>
      )}
    </div>
  )
}

export default function Architecture() {
  const wrap = useRef(null)
  const measure = useRef(null)
  const packet = useRef(null)
  const halo = useRef(null)
  const [active, setActive] = useState(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start 65%', 'end 60%'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const p = measure.current
    if (!p || !packet.current) return
    const pt = p.getPointAtLength(p.getTotalLength() * Math.min(1, Math.max(0, v)))
    for (const el of [packet.current, halo.current]) { el.setAttribute('cx', pt.x); el.setAttribute('cy', pt.y) }
  })

  const activeNode = architecture.nodes.find((n) => n.id === active) || null

  return (
    <Section id="architecture" heading={architecture.heading}>
      <p className="-mt-4 mb-10 max-w-2xl font-serif text-2xl leading-snug lg:hidden">{architecture.short}</p>
      <div className="grid gap-10 lg:grid-cols-[1fr_440px] lg:gap-16">
        <div className="hidden lg:block">
          <div className="sticky top-28 space-y-4">
            <p className="max-w-sm font-serif text-xl leading-snug">{architecture.short}</p>
            <p className="max-w-sm leading-relaxed text-muted">
              Sensor data flows down the pipeline as the page scrolls. After a calibration period the system compares every new
              window of movement against a personal baseline, and either keeps monitoring or raises an explainable alert.
            </p>
            <Tip node={activeNode} className="max-w-sm" />
          </div>
        </div>

        <div ref={wrap} className="relative mx-auto w-full max-w-[440px]">
          <div className="sticky top-16 z-10 mb-4 lg:hidden">
            <Tip node={activeNode} />
          </div>
          <svg viewBox={`0 0 360 ${VB_H}`} className="w-full" role="group" aria-label="System architecture pipeline diagram">
            <path ref={measure} d={PACKET_PATH} fill="none" stroke="none" />
            {LINKS.map(([d, hx, hy, rot], i) => <Link key={d} d={d} hx={hx} hy={hy} rot={rot} i={i} />)}
            <text x="103" y="650" fontSize="13" letterSpacing="1.4" fill={TEAL} fontWeight="600">YES</text>
            <text x="233" y="650" fontSize="13" letterSpacing="1.4" fill={MUTED} fontWeight="600">NO</text>
            {architecture.nodes.map((n, i) => <Node key={n.id} node={n} i={i} active={active === n.id} setActive={setActive} />)}
            {!reduce && (
              <g pointerEvents="none">
                <circle ref={halo} cx="160" cy="40" r="12" fill={LIME} opacity="0.5" />
                <circle ref={packet} cx="160" cy="40" r="6" fill={LIME} stroke={INK} strokeWidth="1.5" />
              </g>
            )}
          </svg>
        </div>
      </div>
    </Section>
  )
}
