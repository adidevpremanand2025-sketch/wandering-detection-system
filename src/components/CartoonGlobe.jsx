import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/**
 * CartoonGlobe: a small turning Earth for the margin beside "The numbers" (wandering is worldwide).
 * Ported from a Framer component and redrawn in the walk map's language: flat fills, ink outlines,
 * route-soft sea, park-green land, paper clouds, contour-coloured graticule. No gradients or shadows.
 *
 * Real 3D: continents are lat/lon outlines rotated on a sphere and clipped at the horizon.
 * Drag (both axes) or use the arrow keys to turn it; Space pauses (no visible button, by request). Turns only while
 * on screen, and holds still under reduced motion. Shown only at xl, like the other margin scenes.
 */

const INK = 'var(--color-ink)'
const SEA = 'var(--color-route-soft)'
const LAND = 'var(--color-route)'
const PAPER = 'var(--color-paper)'
const CONTOUR = 'var(--color-contour)'

const SIZE = 300
const C = SIZE / 2
const R = 112
const PITCH_MAX = 1.15

const continents = [
  // North America
  [[72, -165], [64, -150], [58, -136], [52, -126], [49, -123], [45, -124], [41, -124], [36, -121], [30, -114], [25, -107], [20, -98], [18, -90], [23, -83], [30, -81], [36, -75], [44, -67], [50, -61], [55, -70], [60, -78], [66, -92]],
  // South America
  [[12, -81], [9, -77], [5, -79], [-2, -80], [-10, -78], [-16, -75], [-24, -71], [-31, -71], [-39, -72], [-48, -68], [-54, -64], [-52, -58], [-45, -51], [-33, -50], [-20, -44], [-8, -36], [2, -46], [7, -58]],
  // Europe, Asia and Africa
  [[71, -12], [66, 6], [61, 20], [57, 30], [52, 40], [50, 50], [48, 60], [43, 74], [39, 86], [33, 98], [24, 104], [17, 105], [12, 112], [17, 118], [25, 123], [30, 131], [36, 140], [45, 147], [53, 150], [60, 143], [64, 124], [66, 101], [68, 78], [70, 58], [69, 40], [67, 24], [64, 14], [60, 4], [57, -4], [52, -8], [47, -5], [44, 2], [38, 10], [36, 20], [35, 29], [31, 36], [26, 34], [21, 32], [14, 36], [6, 42], [-3, 43], [-14, 39], [-22, 31], [-33, 18], [-35, 10], [-29, 2], [-15, -4], [-1, -10], [11, -15], [24, -17], [36, -10], [46, -9], [56, -16], [63, -20]],
  // Australia
  [[-10, 112], [-16, 113], [-22, 116], [-26, 123], [-31, 131], [-35, 140], [-37, 150], [-32, 153], [-24, 152], [-18, 146], [-12, 138], [-11, 128]],
  // Arabia
  [[30, 33], [28, 35], [22, 39], [16, 42], [13, 44], [13, 49], [17, 54], [22, 59], [24, 57], [26, 56], [26, 51], [29, 48], [31, 47], [33, 44], [34, 39]],
  // India and Indochina
  [[25, 67], [21, 70], [17, 73], [12, 75], [8, 77], [10, 80], [16, 81], [20, 86], [22, 89], [21, 93], [16, 95], [12, 98], [7, 100], [2, 103], [8, 105], [12, 109], [17, 107], [21, 107], [24, 104], [28, 97], [30, 88], [31, 78], [29, 70]],
  // Greenland
  [[60, -44], [65, -40], [70, -22], [77, -18], [82, -30], [83, -45], [79, -68], [76, -70], [72, -56], [66, -53], [62, -49]],
  // Great Britain and Ireland
  [[50, -6], [51, 1], [53, 2], [56, -2], [58, -3], [59, -6], [55, -8], [52, -10]],
  // Iceland
  [[63, -22], [64, -14], [66, -14], [67, -18], [66, -23], [65, -24]],
  // Japan
  [[31, 130], [34, 136], [35, 140], [39, 142], [42, 141], [45, 142], [44, 145], [41, 140], [37, 137], [35, 133]],
  // Indonesia: Sumatra, Borneo, New Guinea
  [[5, 95], [2, 99], [-3, 104], [-6, 106], [-4, 102], [0, 99]],
  [[7, 117], [4, 118], [1, 119], [-3, 116], [-4, 111], [-1, 109], [2, 110], [5, 115]],
  [[-1, 131], [-3, 136], [-6, 141], [-8, 145], [-10, 150], [-7, 147], [-4, 141], [-2, 137]],
  // Philippines
  [[18, 121], [14, 120], [10, 122], [7, 122], [6, 126], [9, 126], [13, 124], [16, 122]],
  // Madagascar
  [[-12, 49], [-16, 50], [-21, 48], [-25, 47], [-25, 44], [-21, 43], [-16, 44]],
  // New Zealand
  [[-35, 173], [-37, 176], [-41, 176], [-44, 172], [-46, 167], [-42, 171], [-39, 174]],
  // Caribbean: Cuba and Hispaniola
  [[23, -84], [22, -79], [20, -74], [18, -69], [19, -72], [20, -77], [22, -81]],
  // Antarctica, closed over the pole
  [[-60, -180], [-66, -150], [-72, -120], [-74, -80], [-72, -40], [-70, -5], [-72, 35], [-74, 75], [-71, 115], [-68, 145], [-64, 180], [-90, 180], [-90, -180]],
].map((poly) => poly.map(([lat, lon]) => ({ lat, lon })))

const cloudAnchors = [
  { lat: 20, lon: -35, size: 30 },
  { lat: 8, lon: 60, size: 24 },
  { lat: -8, lon: -120, size: 27 },
  { lat: 45, lon: 118, size: 20 },
  { lat: -28, lon: 30, size: 23 },
]

// Faint lines of latitude and longitude, sampled as points.
const graticule = [
  ...[-60, -30, 0, 30, 60].map((lat) => Array.from({ length: 73 }, (_, i) => ({ lat, lon: -180 + i * 5 }))),
  ...Array.from({ length: 12 }, (_, k) => Array.from({ length: 37 }, (_, i) => ({ lat: -90 + i * 5, lon: k * 30 }))),
]

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

function geoToVec({ lat, lon }) {
  const la = (lat * Math.PI) / 180
  const lo = (lon * Math.PI) / 180
  return { x: Math.cos(la) * Math.sin(lo), y: Math.sin(la), z: Math.cos(la) * Math.cos(lo) }
}

function rotateVec(v, yaw, pitch) {
  const cy = Math.cos(yaw)
  const sy = Math.sin(yaw)
  const x1 = v.x * cy + v.z * sy
  const z1 = -v.x * sy + v.z * cy
  const cp = Math.cos(pitch)
  const sp = Math.sin(pitch)
  return { x: x1, y: v.y * cp - z1 * sp, z: v.y * sp + z1 * cp }
}

function normalize(v) {
  const l = Math.hypot(v.x, v.y, v.z) || 1
  return { x: v.x / l, y: v.y / l, z: v.z / l }
}

// Keep only the near half of a polygon, closing it along the horizon.
function clipHemisphere(pts) {
  const out = []
  for (let i = 0; i < pts.length; i++) {
    const cur = pts[i]
    const prev = pts[(i + pts.length - 1) % pts.length]
    if ((cur.z >= 0) !== (prev.z >= 0)) {
      const t = prev.z / (prev.z - cur.z)
      out.push(normalize({ x: prev.x + (cur.x - prev.x) * t, y: prev.y + (cur.y - prev.y) * t, z: 0 }))
    }
    if (cur.z >= 0) out.push(cur)
  }
  return out
}

// A closed path with softly rounded corners, for the cartoon look.
function toPath(pts, radius) {
  if (pts.length < 3) return ''
  const p = pts.map((v) => ({ x: C + v.x * radius, y: C - v.y * radius }))
  const round = Math.max(2, radius * 0.03)
  const corner = (a, b, c) => {
    const v1x = a.x - b.x
    const v1y = a.y - b.y
    const v2x = c.x - b.x
    const v2y = c.y - b.y
    const d1 = Math.hypot(v1x, v1y) || 1
    const d2 = Math.hypot(v2x, v2y) || 1
    const r = Math.min(round, d1 * 0.4, d2 * 0.4)
    return { s: { x: b.x + (v1x / d1) * r, y: b.y + (v1y / d1) * r }, e: { x: b.x + (v2x / d2) * r, y: b.y + (v2y / d2) * r }, b }
  }
  const f = (n) => n.toFixed(1)
  const n = p.length
  const first = corner(p[n - 1], p[0], p[1])
  const cmds = [`M ${f(first.e.x)} ${f(first.e.y)}`]
  for (let i = 1; i < n; i++) {
    const k = corner(p[i - 1], p[i], p[(i + 1) % n])
    cmds.push(`L ${f(k.s.x)} ${f(k.s.y)} Q ${f(k.b.x)} ${f(k.b.y)} ${f(k.e.x)} ${f(k.e.y)}`)
  }
  cmds.push(`L ${f(first.s.x)} ${f(first.s.y)} Q ${f(p[0].x)} ${f(p[0].y)} ${f(first.e.x)} ${f(first.e.y)} Z`)
  return cmds.join(' ')
}

// An open polyline of the visible stretches of a line on the sphere.
function toLine(pts) {
  let d = ''
  let pen = false
  for (const v of pts) {
    if (v.z < 0.02) { pen = false; continue }
    d += `${pen ? 'L' : 'M'} ${(C + v.x * R).toFixed(1)} ${(C - v.y * R).toFixed(1)} `
    pen = true
  }
  return d
}

// ---- Strays: magenta arcs that travel across the globe, land, ripple and are labelled. ----

const STRAY = 'var(--color-stray)'
const HOME = 'var(--color-route)'

// Places for arcs to start and land (roughly on land, all over the world).
const places = [
  [51, 0], [13, 80], [40, -74], [-23, -46], [-33, 151], [6, 3], [35, 139], [30, 31], [19, -99],
  [55, 37], [-1, 36], [28, 77], [34, -118], [-34, -58], [1, 103], [48, 2], [41, 29], [-26, 28],
  [49, -123], [22, 114], [-12, -77], [64, -21], [25, 55], [-37, 175],
].map(([lat, lon]) => geoToVec({ lat, lon }))

const MESSAGES = ['Noticed', 'Wandering found', 'Anomalous movement', 'Off the usual route', 'Unusual pace', 'Noticed early']

const DRAW = 1.3 // seconds for the arc to reach its point
const LABEL_IN = DRAW + 0.1
const LABEL_OUT = 3.9
const RETRACT = 3.5 // the arc pulls in behind itself from here
const LIFE = 4.5
const PERIOD = 2.7 // a new stray this often

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const easeOutBack = (t) => 1 + 2.4 * (t - 1) ** 3 + 1.4 * (t - 1) ** 2
const unit = (t) => clamp(t, 0, 1)
const dot = (a, b) => clamp(a.x * b.x + a.y * b.y + a.z * b.z, -1, 1)

function slerp(a, b, s) {
  const w = Math.acos(dot(a, b))
  if (w < 1e-4) return a
  const k1 = Math.sin((1 - s) * w) / Math.sin(w)
  const k2 = Math.sin(s * w) / Math.sin(w)
  return { x: a.x * k1 + b.x * k2, y: a.y * k1 + b.y * k2, z: a.z * k1 + b.z * k2 }
}

// Choose a start and landing point both facing the reader, on the side the turn is bringing into view.
function pickPair(yaw, pitch, n) {
  const all = places.map((p, i) => ({ i, v: rotateVec(p, yaw, pitch) }))
  const seen = all.filter(({ v }) => v.z > 0.3 && v.x < 0.35)
  const pool = seen.length >= 2 ? seen : [...all].sort((p, q) => q.v.z - p.v.z).slice(0, 4)
  const a = pool[(n * 7) % pool.length]
  // prefer a hop of around 50 degrees: far enough to read, near enough to stay in view
  const gap = (o) => Math.abs(Math.acos(dot(places[a.i], places[o.i])) - 0.9)
  const rest = pool.filter((p) => p.i !== a.i).sort((p, q) => gap(p) - gap(q))
  const b = rest[n % Math.min(2, rest.length)]
  return { a: places[a.i], b: places[b.i], label: MESSAGES[n % MESSAGES.length] }
}

const project = (v, f = 1) => ({ x: C + v.x * R * f, y: C - v.y * R * f })
// A lifted point is visible if it faces us, or sticks out past the globe's rim.
const visible = (v, f) => v.z > 0 || Math.hypot(v.x, v.y) * f > 1

export default function CartoonGlobe({ className = '', speed = 0.28 }) {
  const root = useRef(null)
  const clipId = useId()
  const reduce = useReducedMotion()
  const inView = useInView(root)
  const [rot, setRot] = useState({ yaw: -0.9, pitch: -0.25, cloud: 0, t: 0 })
  const rotRef = useRef(rot)
  const [dragging, setDragging] = useState(false)
  const [paused, setPaused] = useState(false)
  const drag = useRef(null)
  const strays = useRef([])
  const nextAt = useRef(0.4)
  const count = useRef(0)
  const draggingRef = useRef(false)
  draggingRef.current = dragging

  const set = (next) => { rotRef.current = next; setRot(next) }

  // Under reduced motion: one still stray, landed and labelled.
  const still = useMemo(() => [{ ...pickPair(-0.9, -0.25, 1), born: -(LABEL_IN + 0.6) }], [])

  // The clock keeps running while dragging, so strays still land; only the turn waits for the hand.
  const running = !reduce && !paused && inView
  useEffect(() => {
    if (!running) return undefined
    let raf
    let last = 0
    const tick = (now) => {
      const dt = last ? Math.min((now - last) / 1000, 0.033) : 0
      last = now
      const r = rotRef.current
      const t = r.t + dt
      const yaw = draggingRef.current ? r.yaw : r.yaw + dt * speed
      if (t >= nextAt.current) {
        strays.current.push({ ...pickPair(yaw, r.pitch, count.current++), born: t })
        nextAt.current = t + PERIOD
      }
      strays.current = strays.current.filter((s) => t - s.born < LIFE)
      set({ ...r, yaw, cloud: r.cloud + dt * speed * 0.6, t })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [running, speed])

  const onDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, yaw: rotRef.current.yaw, pitch: rotRef.current.pitch }
    setDragging(true)
  }
  const onMove = (e) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    set({ ...rotRef.current, yaw: d.yaw + (e.clientX - d.x) * 0.012, pitch: clamp(d.pitch + (e.clientY - d.y) * 0.009, -PITCH_MAX, PITCH_MAX) })
  }
  const onUp = (e) => {
    if (drag.current?.id !== e.pointerId) return
    drag.current = null
    setDragging(false)
  }
  const onKey = (e) => {
    const step = 0.15
    const r = rotRef.current
    const moves = {
      ArrowLeft: { yaw: r.yaw - step },
      ArrowRight: { yaw: r.yaw + step },
      ArrowUp: { pitch: clamp(r.pitch - step, -PITCH_MAX, PITCH_MAX) },
      ArrowDown: { pitch: clamp(r.pitch + step, -PITCH_MAX, PITCH_MAX) },
    }
    if (moves[e.key]) { e.preventDefault(); set({ ...r, ...moves[e.key] }) }
    else if (e.key === ' ' && e.target === e.currentTarget) { e.preventDefault(); setPaused((p) => !p) }
  }

  const geo = useMemo(() => {
    const { yaw, pitch, cloud, t } = rot
    const turn = (pt) => rotateVec(geoToVec(pt), yaw, pitch)
    const land = continents.map((poly) => toPath(clipHemisphere(poly.map(turn)), R)).filter(Boolean)
    const lines = graticule.map((line) => toLine(line.map(turn))).filter(Boolean)
    const clouds = cloudAnchors
      .map((c) => {
        const v = turn({ lat: c.lat, lon: c.lon + (cloud * 180) / Math.PI })
        return v.z > 0.05 ? { x: C + v.x * R * 1.06, y: C - v.y * R * 1.06, s: c.size } : null
      })
      .filter(Boolean)

    const arcs = (reduce ? still : strays.current).map((s) => {
      const age = reduce ? -s.born : t - s.born
      const a = rotateVec(s.a, yaw, pitch)
      const b = rotateVec(s.b, yaw, pitch)
      const lift = 0.1 + Math.acos(dot(s.a, s.b)) * 0.18
      const head = easeInOut(unit(age / DRAW))
      const tail = easeInOut(unit((age - RETRACT) / (LIFE - RETRACT)))
      // the arc, sampled from tail to head, split wherever it goes behind the globe
      let d = ''
      let pen = false
      for (let i = 0; i <= 40; i++) {
        const u = tail + ((head - tail) * i) / 40
        const f = 1 + lift * Math.sin(Math.PI * u)
        const v = slerp(a, b, u)
        if (!visible(v, f)) { pen = false; continue }
        const p = project(v, f)
        d += `${pen ? 'L' : 'M'} ${p.x.toFixed(1)} ${p.y.toFixed(1)} `
        pen = true
      }
      const hv = slerp(a, b, head)
      const hf = 1 + lift * Math.sin(Math.PI * head)
      const landed = age >= DRAW
      const bp = project(b)
      const labelP = unit((age - LABEL_IN) / 0.35)
      const labelFade = 1 - unit((age - LABEL_OUT) / 0.4)
      return {
        key: s.born,
        d,
        comet: age < DRAW && visible(hv, hf) ? project(hv, hf) : null,
        start: a.z > 0 && tail === 0 ? project(a) : null,
        end: landed && b.z > 0 ? bp : null,
        pin: easeOutBack(unit((age - DRAW) / 0.35)),
        // ripples lie flat on the surface: squashed towards the rim, turned to face out from the centre
        squash: Math.max(b.z, 0.25),
        angle: (Math.atan2(-b.y, b.x) * 180) / Math.PI,
        ripples: landed && b.z > 0 ? [0, 0.4, 0.8].map((delay) => unit((age - DRAW - delay) / 1.3)).filter((p) => p > 0 && p < 1) : [],
        fade: 1 - tail,
        label: age >= LABEL_IN && b.z > 0.1 && labelFade > 0
          ? { text: s.label, x: bp.x, y: bp.y, pop: easeOutBack(labelP), alpha: Math.min(labelP * 2, 1) * labelFade }
          : null,
      }
    })
    return { land, lines, clouds, arcs }
  }, [rot, reduce, still])

  return (
    <figure className={className}>
      <div
        ref={root}
        role="img"
        aria-label="A cartoon globe, turning slowly. Magenta arcs show walks that strayed, each noticed where it lands. Drag or use the arrow keys to turn it; Space pauses."
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className={`relative touch-none select-none rounded-full ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="block h-auto w-full overflow-visible" aria-hidden="true">
          <defs>
            <clipPath id={clipId}><circle cx={C} cy={C} r={R} /></clipPath>
          </defs>
          {/* the sea */}
          <circle cx={C} cy={C} r={R} fill={SEA} />
          {/* lines of latitude and longitude, like a map's grid */}
          <g fill="none" stroke={CONTOUR} strokeWidth="1.2">
            {geo.lines.map((d, i) => <path key={i} d={d} />)}
          </g>
          {/* the land */}
          {/* the land, drawn chunky: a wide ink outline, then the green filled and swelled over it */}
          <g clipPath={`url(#${clipId})`} fill={INK} stroke={INK} strokeWidth="8" strokeLinejoin="round">
            {geo.land.map((d, i) => <path key={i} d={d} />)}
          </g>
          <g clipPath={`url(#${clipId})`} fill={LAND} stroke={LAND} strokeWidth="4.5" strokeLinejoin="round">
            {geo.land.map((d, i) => <path key={i} d={d} />)}
          </g>
          {/* puffy clouds, drifting a little faster than the turn */}
          <g fill={PAPER} stroke={INK} strokeWidth="1.8">
            {geo.clouds.map((c, i) => (
              <g key={i}>
                <circle cx={c.x - c.s * 0.3} cy={c.y + c.s * 0.1} r={c.s * 0.3} />
                <circle cx={c.x + c.s * 0.32} cy={c.y + c.s * 0.08} r={c.s * 0.28} />
                <circle cx={c.x} cy={c.y} r={c.s * 0.38} />
                <rect x={c.x - c.s * 0.52} y={c.y + c.s * 0.04} width={c.s * 1.02} height={c.s * 0.24} stroke="none" />
              </g>
            ))}
          </g>
          {/* the outline */}
          <circle cx={C} cy={C} r={R} fill="none" stroke={INK} strokeWidth="3" />

          {/* strays: the arc, where it left from, and where it was noticed */}
          {geo.arcs.map((a) => (
            <g key={a.key}>
              {a.ripples.map((p, i) => (
                <ellipse
                  key={i}
                  cx={a.end.x}
                  cy={a.end.y}
                  rx={(5 + 24 * p) * a.squash}
                  ry={5 + 24 * p}
                  transform={`rotate(${-a.angle} ${a.end.x} ${a.end.y})`}
                  fill="none"
                  stroke={STRAY}
                  strokeWidth={3 - 2 * p}
                  opacity={1 - p}
                />
              ))}
              <path d={a.d} fill="none" stroke={PAPER} strokeWidth="6" strokeLinecap="round" opacity={0.9 * a.fade} />
              <path d={a.d} fill="none" stroke={STRAY} strokeWidth="3" strokeLinecap="round" opacity={a.fade} />
              {a.start && <circle cx={a.start.x} cy={a.start.y} r="4" fill={HOME} stroke={INK} strokeWidth="1.8" />}
              {a.comet && (
                <g>
                  <circle cx={a.comet.x} cy={a.comet.y} r="7" fill={STRAY} opacity="0.25" />
                  <circle cx={a.comet.x} cy={a.comet.y} r="4" fill={STRAY} stroke={PAPER} strokeWidth="1.5" />
                </g>
              )}
              {a.end && <circle cx={a.end.x} cy={a.end.y} r={5.5 * a.pin} fill={STRAY} stroke={INK} strokeWidth="2" opacity={a.fade} />}
            </g>
          ))}
        </svg>

        {/* the labels, as real text so they stay crisp */}
        {geo.arcs.map((a) => a.label && (
          <span
            key={a.key}
            aria-hidden="true"
            className="sign pointer-events-none absolute z-10 flex items-center gap-1.5 whitespace-nowrap rounded-card bg-paper px-2.5 py-1 text-sm text-stray ring-2 ring-stray"
            style={{
              left: `${(a.label.x / SIZE) * 100}%`,
              top: `${(a.label.y / SIZE) * 100}%`,
              opacity: a.label.alpha,
              transform: `translate(-50%, calc(-100% - 14px)) scale(${a.label.pop})`,
              transformOrigin: '50% 100%',
            }}
          >
            <span className="h-2 w-2 rounded-full bg-stray" />
            {a.label.text}
          </span>
        ))}
      </div>
      <div className="-mt-2 flex justify-center">
        <figcaption className="text-base text-muted">An illustration, not live data.</figcaption>
      </div>
    </figure>
  )
}
