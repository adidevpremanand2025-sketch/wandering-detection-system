import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Grandpa from './Grandpa.jsx'

/**
 * AstralShell: a slowly turning globe of connected stars around the mascot, for the Get involved band.
 * Our own take on React Bits' "Astral Shell", redrawn in the site's cartoon map language: chunky
 * five-point stars with a sticker outline, joined by footpath lines (solid in front, dotted behind).
 * The stars are the people around someone; the lines are how they are connected.
 *
 * Two canvases sandwich Grandpa, so the back of the globe passes behind him and the front in front.
 * Drag to give it a spin. Decorative (aria-hidden), with a pause control (WCAG 2.2.2). Runs only while
 * on screen; under reduced motion it draws one still frame and shows no control.
 */

const COUNT = 46
const LINKS = 3 // each star joins its nearest few
const TILT = 0.38 // radians, so the globe leans towards the reader
const SPEED = 0.16 // radians per second

// Deterministic jitter, so the globe is the same on every load.
const rand = (i) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function buildShell() {
  const pts = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const th = golden * i + (rand(i) - 0.5) * 0.5
    pts.push({
      x: Math.cos(th) * r,
      y,
      z: Math.sin(th) * r,
      size: 0.75 + rand(i + 50) * 0.6,
      star: rand(i + 99) > 0.3, // the rest are small round dots
      phase: rand(i + 7) * Math.PI * 2,
    })
  }
  const seen = new Set()
  const edges = []
  pts.forEach((p, i) => {
    pts
      .map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2 }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, LINKS)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (!seen.has(key)) { seen.add(key); edges.push([i, j]) }
      })
  })
  return { pts, edges }
}

const SHELL = buildShell()

function starPath(ctx, x, y, r) {
  ctx.beginPath()
  for (let k = 0; k < 10; k++) {
    const a = -Math.PI / 2 + (k * Math.PI) / 5
    const rr = k % 2 === 0 ? r : r * 0.48
    ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr)
  }
  ctx.closePath()
}

export default function AstralShell({ className = '' }) {
  const reduce = useReducedMotion()
  const stage = useRef(null)
  const back = useRef(null)
  const front = useRef(null)
  const angle = useRef(0.6)
  const spin = useRef(0) // extra velocity from a drag, decays back to the slow turn
  const drag = useRef(null)
  const draw = useRef(() => {})
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = stage.current
    if (!el) return undefined
    const css = getComputedStyle(el)
    const color = (name) => css.getPropertyValue(name).trim()
    const fill = color('--color-route-soft')
    const outline = color('--color-trust')
    const line = color('--color-on-trust')
    let w = 0
    let dpr = 1

    const size = () => {
      w = el.clientWidth
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      for (const c of [back.current, front.current]) {
        c.width = w * dpr
        c.height = w * dpr
      }
    }

    draw.current = (t) => {
      const R = w * 0.44
      const c0 = w / 2
      const hole = w * 0.2 // Grandpa's radius: front marks over him are faded so his face stays clear
      const cosA = Math.cos(angle.current)
      const sinA = Math.sin(angle.current)
      const cosT = Math.cos(TILT)
      const sinT = Math.sin(TILT)
      const proj = SHELL.pts.map((p) => {
        const x1 = p.x * cosA + p.z * sinA
        const z1 = -p.x * sinA + p.z * cosA
        const y2 = p.y * cosT - z1 * sinT
        const z2 = p.y * sinT + z1 * cosT
        const persp = 1 / (1.9 - z2 * 0.45)
        const sx = c0 + x1 * R * persp * 2
        const sy = c0 + y2 * R * persp * 2
        return { sx, sy, z: z2, persp, overGrandpa: z2 > 0 && Math.hypot(sx - c0, sy - c0) < hole }
      })

      for (const [ctx, isFront] of [[back.current.getContext('2d'), false], [front.current.getContext('2d'), true]]) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, w, w)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        // footpaths between neighbours
        for (const [i, j] of SHELL.edges) {
          const a = proj[i]
          const b = proj[j]
          const z = (a.z + b.z) / 2
          if ((z > 0) !== isFront) continue
          ctx.globalAlpha = (isFront ? 0.55 : 0.22) * (a.overGrandpa || b.overGrandpa ? 0.35 : 1)
          ctx.strokeStyle = line
          ctx.lineWidth = isFront ? 2.4 : 1.6
          ctx.setLineDash(isFront ? [] : [0.1, 6])
          ctx.beginPath()
          ctx.moveTo(a.sx, a.sy)
          ctx.lineTo(b.sx, b.sy)
          ctx.stroke()
        }
        ctx.setLineDash([])

        // the stars, back to front
        const order = proj.map((p, i) => i).filter((i) => (proj[i].z > 0) === isFront).sort((a, b) => proj[a].z - proj[b].z)
        for (const i of order) {
          const p = proj[i]
          const s = SHELL.pts[i]
          const twinkle = 1 + 0.12 * Math.sin(t * 2.2 + s.phase)
          const r = (s.star ? 11 : 5) * s.size * p.persp * 1.7 * twinkle
          ctx.globalAlpha = (isFront ? 1 : 0.45) * (p.overGrandpa ? 0.35 : 1)
          ctx.fillStyle = fill
          ctx.strokeStyle = outline
          ctx.lineWidth = isFront ? 2.5 : 1.5
          if (s.star) starPath(ctx, p.sx, p.sy, r)
          else { ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2) }
          ctx.fill()
          ctx.stroke()
        }
        ctx.globalAlpha = 1
      }
    }

    size()
    draw.current(0)
    const ro = new ResizeObserver(() => { size(); draw.current(performance.now() / 1000) })
    ro.observe(el)
    if (reduce || paused) return () => ro.disconnect()

    let raf
    let last = performance.now()
    let visible = true
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting })
    io.observe(el)
    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      if (visible) {
        if (!drag.current) {
          angle.current += (SPEED + spin.current) * dt
          spin.current *= Math.pow(0.12, dt) // the flick settles back to the slow turn
        }
        draw.current(now / 1000)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect() }
  }, [reduce, paused])

  // Drag to spin, with a little flick when let go.
  const onDown = (e) => {
    if (reduce) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { x: e.clientX, t: performance.now(), v: 0 }
  }
  const onMove = (e) => {
    const d = drag.current
    if (!d) return
    const now = performance.now()
    const da = ((e.clientX - d.x) / (stage.current?.clientWidth || 360)) * Math.PI
    angle.current += da
    d.v = da / Math.max((now - d.t) / 1000, 0.016)
    d.x = e.clientX
    d.t = now
    if (paused) draw.current(now / 1000)
  }
  const onUp = () => {
    if (drag.current && !paused) spin.current = Math.max(-4, Math.min(4, drag.current.v - SPEED))
    drag.current = null
  }

  return (
    <figure className={className}>
      <div
        ref={stage}
        aria-hidden="true"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className={`relative aspect-square w-full touch-pan-y select-none ${reduce ? '' : 'cursor-grab active:cursor-grabbing'}`}
      >
        <canvas ref={back} className="absolute inset-0 h-full w-full" />
        <Grandpa className="pointer-events-none absolute left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-on-trust" />
        <canvas ref={front} className="pointer-events-none absolute inset-0 h-full w-full" />
      </div>
      {!reduce && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label="Pause animation"
          className="mx-auto mt-2 flex h-11 w-11 items-center justify-center rounded-card border-2 border-on-trust text-on-trust hover:bg-on-trust/10 focus-visible:outline-on-trust"
        >
          {paused ? (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M3 1 L12 7 L3 13 Z" fill="currentColor" /></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" /></svg>
          )}
        </button>
      )}
    </figure>
  )
}
