import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Section } from './ui.jsx'
import { architecture } from '../content.js'

/**
 * Architecture: how it works, as one always-complete top-to-bottom flow. Every step's plain
 * explanation is visible (nothing hides behind hover or tap), and the diagram has no
 * scroll-drawn outlines that can be caught half-finished.
 *
 * The one piece of motion is a dot that travels down the connector line as the page scrolls, kept in
 * the gutter so it never sits on text. It is omitted under reduced motion.
 */
const byId = Object.fromEntries(architecture.nodes.map((n) => [n.id, n]))
const MAIN = ['wearable', 'collect', 'features', 'calibration', 'baseline', 'model', 'decision'].map((id) => byId[id])

function StepText({ node }) {
  return (
    <>
      <h3 className="text-xl font-bold leading-snug text-ink">{node.title}</h3>
      {node.sub && <p className="sign mt-0.5 text-base text-muted">{node.sub}</p>}
      <p className="mt-1.5 max-w-prose">{node.tip}</p>
    </>
  )
}

function Marker({ decision = false }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -left-[12px] top-1.5 h-[21px] w-[21px] border-[3px] border-route bg-paper ${
        decision ? 'rotate-45 rounded-[3px]' : 'rounded-full'
      }`}
    />
  )
}

export default function Architecture() {
  const list = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 65%', 'end 60%'] })
  const top = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const alert = byId.alert
  const explain = byId.explain
  const keep = byId.continue

  return (
    <Section id="architecture" heading={architecture.heading}>
      <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,34rem)] lg:gap-16">
        <div>
          <div className="lg:sticky lg:top-28">
            <p className="max-w-sm text-xl font-bold leading-snug">{architecture.short}</p>
            <p className="mt-4 max-w-sm leading-relaxed text-muted">
              Sensor data flows down this list. In the design, after a calibration period the system compares every new window of
              movement against a personal baseline, and either keeps monitoring or raises an explainable alert.
            </p>
          </div>
        </div>

        <ol ref={list} className="relative ml-3 border-l-[3px] border-rule">
          {MAIN.map((n) => (
            <li key={n.id} className="relative pb-9 pl-8">
              <Marker decision={n.kind === 'decision'} />
              <StepText node={n} />
            </li>
          ))}

          {/* the decision's two ways out */}
          <li className="relative pl-8">
            <span aria-hidden="true" className="absolute -left-[9px] top-2 h-[15px] w-[15px] rounded-full bg-route" />
            <div className="grid gap-8 md:grid-cols-2">
              <div className="border-l-4 border-stray pl-4">
                <p className="sign text-lg text-stray">Yes</p>
                <div className="mt-2">
                  <StepText node={alert} />
                </div>
                <div className="mt-5 rounded-card bg-stray-soft px-4 py-3">
                  <StepText node={explain} />
                </div>
              </div>
              <div className="border-l-4 border-rule pl-4">
                <p className="sign text-lg text-muted">No</p>
                <div className="mt-2">
                  <StepText node={keep} />
                </div>
              </div>
            </div>
          </li>

          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute -left-[9px] z-10 h-[15px] w-[15px] -translate-y-1/2 rounded-full bg-route ring-4 ring-paper"
              style={{ top }}
            />
          )}
        </ol>
      </div>
    </Section>
  )
}
