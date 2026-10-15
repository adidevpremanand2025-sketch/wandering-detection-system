/**
 * MapVignette: a small hand-drawn map scene for the empty right margin beside a section heading,
 * so the walk map's world continues down the page. Each scene is about its section.
 *
 * Same drawing language as the walk map: ink outlines, park-green trees, faint contour lines, paper
 * fills. Magenta appears only where something has strayed (footsteps leaving, a crossed geofence).
 *
 * Decorative: aria-hidden, static, and only on extra-wide screens (xl) where the margin really exists.
 * The section narrows its heading at that size so the two never touch.
 */
const INK = 'var(--color-ink)'
const ROUTE = 'var(--color-route)'
const SOFT = 'var(--color-route-soft)'
const PAPER = 'var(--color-paper)'
const STRAY = 'var(--color-stray)'
const CONTOUR = 'var(--color-contour)'
const MUTED = 'var(--color-muted)'
const SIGN = { fontFamily: 'var(--font-sign)', fontWeight: 700 }

function Contours({ d = ['M-10 30 C 40 18, 90 40, 140 26 S 200 18, 215 24', 'M-10 96 C 50 86, 100 104, 150 92 S 200 88, 215 92'] }) {
  return (
    <g fill="none" stroke={CONTOUR} strokeWidth="1.2">
      {d.map((p) => <path key={p} d={p} />)}
    </g>
  )
}

function Tree({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-1.6" y="-1" width="3.2" height="11" rx="1.2" fill={INK} />
      <circle cx="-5.5" cy="-3" r="6.5" fill={ROUTE} />
      <circle cx="5.5" cy="-3" r="6.5" fill={ROUTE} />
      <circle cx="0" cy="-9.5" r="7.5" fill={ROUTE} />
    </g>
  )
}

function House({ x, y, s = 1, open = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
      <path d="M-14 12 V-4 L0 -16 L14 -4 V12 Z" fill={PAPER} stroke={INK} strokeWidth="2.2" />
      {open ? (
        // the door stands open: a dark doorway and the door swung out
        <>
          <rect x="-4" y="1" width="8" height="11" fill={INK} />
          <path d="M4 1 L10 3 V13 L4 12 Z" fill={ROUTE} stroke={INK} strokeWidth="1.4" />
        </>
      ) : (
        <rect x="-4" y="1" width="8" height="11" rx="1.2" fill={ROUTE} />
      )}
    </g>
  )
}

// Footsteps along a list of points: small alternating ovals, turned to face the direction of travel.
function Steps({ pts, color = STRAY }) {
  return (
    <g fill={color}>
      {pts.map(([x, y], i) => {
        const [nx, ny] = pts[Math.min(i + 1, pts.length - 1)]
        const [px, py] = pts[Math.max(i - 1, 0)]
        const ang = (Math.atan2(ny - py, nx - px) * 180) / Math.PI
        // left, right, left: each print offset to its own side of the line of travel
        const side = i % 2 ? 4 : -4
        return <ellipse key={i} cx={x} cy={y} rx="3.6" ry="2" transform={`rotate(${ang} ${x} ${y}) translate(0 ${side})`} />
      })}
    </g>
  )
}

const SCENES = {
  // "It only takes a few minutes": a door left open, footsteps already heading away
  home: (
    <>
      <Contours />
      <House x={46} y={70} open />
      <Tree x={18} y={82} s={0.8} />
      <Steps pts={[[62, 80], [76, 76], [90, 70], [104, 63], [118, 55], [132, 47], [146, 40], [160, 34], [174, 29], [188, 25]]} />
    </>
  ),
  // "1.5 miles": home at the centre of a dashed ring, with a scale bar
  radius: (
    <>
      <Contours />
      <circle cx="96" cy="54" r="42" fill={SOFT} fillOpacity="0.55" stroke={ROUTE} strokeWidth="2" strokeDasharray="4 5" />
      <House x={96} y={56} s={0.9} />
      <Tree x={150} y={30} s={0.7} />
      <Tree x={44} y={88} s={0.7} />
      <g transform="translate(140 96)">
        <path d="M0 0 H50 M0 -4 V4 M50 -4 V4" stroke={INK} strokeWidth="2" fill="none" />
        <text x="25" y="-8" textAnchor="middle" fontSize="13" fill={INK} style={SIGN}>1.5 mi</text>
      </g>
    </>
  ),
  // "they speak up too late": a geofence the footsteps crossed long before the bell rings
  fence: (
    <>
      <Contours />
      <rect x="14" y="22" width="92" height="70" rx="4" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="5 5" />
      <House x={48} y={62} s={0.9} />
      <Tree x={84} y={48} s={0.7} />
      <Steps pts={[[68, 74], [82, 78], [96, 80], [110, 80], [124, 78], [138, 74], [152, 70], [166, 64]]} />
      <g transform="translate(184 52)">
        <path d="M-8 6 C-8 -4 -5 -9 0 -9 C5 -9 8 -4 8 6 L10 9 H-10 Z" fill={PAPER} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
        <circle cx="0" cy="12" r="2.4" fill={INK} />
      </g>
    </>
  ),
  // "Everyone moves differently": a signpost, one way usual, one way not
  signpost: (
    <>
      <Contours />
      <path d="M100 104 V18" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M100 26 H160 L170 34 L160 42 H100 Z" fill={ROUTE} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M100 50 H42 L32 58 L42 66 H100 Z" fill={PAPER} stroke={STRAY} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M24 104 H184" stroke={ROUTE} strokeWidth="2" />
      <Tree x={160} y={92} s={0.75} />
    </>
  ),
  // "what normal looks like through the day": a sun arcing from morning to evening
  day: (
    <>
      <path d="M10 96 H190" stroke={INK} strokeWidth="2" />
      <path d="M20 96 C 50 10, 150 10, 180 96" fill="none" stroke={MUTED} strokeWidth="1.8" strokeDasharray="2 6" strokeLinecap="round" />
      <g transform="translate(128 34)">
        <circle r="11" fill={PAPER} stroke={INK} strokeWidth="2" />
        <g stroke={INK} strokeWidth="2" strokeLinecap="round">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} d={`M${Math.cos((a * Math.PI) / 180) * 15} ${Math.sin((a * Math.PI) / 180) * 15} L${Math.cos((a * Math.PI) / 180) * 20} ${Math.sin((a * Math.PI) / 180) * 20}`} />
          ))}
        </g>
      </g>
      <Tree x={40} y={86} s={0.75} />
      <Tree x={170} y={86} s={0.6} />
    </>
  ),
  // "from a tiny sensor to a clear message": a band on the wrist sending to a phone
  signal: (
    <>
      <Contours />
      <g transform="translate(46 60)">
        <rect x="-26" y="-9" width="52" height="18" rx="9" fill={SOFT} stroke={INK} strokeWidth="2" />
        <rect x="-10" y="-13" width="20" height="26" rx="5" fill={PAPER} stroke={INK} strokeWidth="2" />
        <circle r="3" fill={ROUTE} />
      </g>
      <g fill="none" stroke={ROUTE} strokeWidth="2.2" strokeLinecap="round">
        <path d="M82 46 C 90 52, 90 66, 82 72" />
        <path d="M94 38 C 106 48, 106 70, 94 80" />
        <path d="M106 30 C 122 44, 122 74, 106 88" />
      </g>
      <g transform="translate(160 58)">
        <rect x="-15" y="-28" width="30" height="56" rx="6" fill={PAPER} stroke={INK} strokeWidth="2" />
        <rect x="-9" y="-16" width="18" height="6" rx="2" fill={STRAY} />
        <path d="M-9 -4 H9 M-9 3 H5" stroke={MUTED} strokeWidth="2" strokeLinecap="round" />
      </g>
    </>
  ),
  // "three small, ordinary parts": the boards, wired together
  chips: (
    <>
      <Contours />
      <g fill="none" stroke={ROUTE} strokeWidth="2">
        <path d="M78 54 C 60 54, 56 34, 40 34" />
        <path d="M122 60 C 140 60, 146 82, 164 82" />
      </g>
      <g transform="translate(100 56)">
        <rect x="-22" y="-16" width="44" height="32" rx="3" fill={SOFT} stroke={INK} strokeWidth="2" />
        <rect x="-10" y="-8" width="20" height="16" rx="2" fill={PAPER} stroke={INK} strokeWidth="1.6" />
        <path d="M-16 -16 V-21 M-6 -16 V-21 M6 -16 V-21 M16 -16 V-21 M-16 16 V21 M-6 16 V21 M6 16 V21 M16 16 V21" stroke={INK} strokeWidth="1.6" />
      </g>
      <rect x="20" y="24" width="24" height="20" rx="2" fill={PAPER} stroke={INK} strokeWidth="2" />
      <rect x="160" y="72" width="24" height="20" rx="2" fill={PAPER} stroke={INK} strokeWidth="2" />
    </>
  ),
  // "four steps to a working prototype": a switchback path up to a flag
  hill: (
    <>
      <path d="M0 104 C 50 40, 130 20, 200 100 Z" fill={SOFT} stroke={ROUTE} strokeWidth="2" />
      <path d="M40 98 C 70 92, 110 86, 120 74 C 100 68, 80 60, 98 50 C 112 44, 120 40, 118 30" fill="none" stroke={INK} strokeWidth="2" strokeDasharray="3 5" strokeLinecap="round" />
      <circle cx="40" cy="98" r="4" fill={INK} />
      <g transform="translate(118 30)">
        <path d="M0 0 V-22" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M0 -22 L18 -16 L0 -10 Z" fill={ROUTE} stroke={INK} strokeWidth="1.6" strokeLinejoin="round" />
      </g>
      <Tree x={170} y={84} s={0.6} />
    </>
  ),
  // "why three students started this": a bench under a lamp, in the park
  bench: (
    <>
      <Contours />
      <path d="M10 98 H190" stroke={ROUTE} strokeWidth="2" />
      <g stroke={INK} strokeWidth="2.4" strokeLinecap="round">
        <path d="M70 76 H140 M70 84 H140 M78 84 V98 M132 84 V98 M74 62 H136 M74 62 V76 M136 62 V76" fill="none" />
      </g>
      <g transform="translate(40 98)">
        <path d="M0 0 V-62" stroke={INK} strokeWidth="2.4" />
        <path d="M-9 -62 H9 L5 -72 H-5 Z" fill={PAPER} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      </g>
      <Tree x={172} y={86} s={0.8} />
    </>
  ),
  // "the people behind it": three trees, growing together
  grove: (
    <>
      <Contours />
      <path d="M10 100 C 60 92, 140 92, 190 100" stroke={ROUTE} strokeWidth="2" fill="none" />
      <Tree x={70} y={80} s={1} />
      <Tree x={102} y={72} s={1.25} />
      <Tree x={136} y={82} s={0.9} />
    </>
  ),
  // "ethics and privacy": a gate, closed and locked
  gate: (
    <>
      <Contours />
      <g stroke={INK} strokeWidth="2.2" strokeLinecap="round">
        <path d="M20 96 V54 M44 96 V54 M156 96 V54 M180 96 V54 M20 66 H44 M20 84 H44 M156 66 H180 M156 84 H180" fill="none" />
        <path d="M62 96 V48 M138 96 V48" strokeWidth="3" fill="none" />
      </g>
      <path d="M62 60 H138 M62 86 H138 M76 60 V86 M92 60 V86 M108 60 V86 M124 60 V86" stroke={ROUTE} strokeWidth="2.4" fill="none" />
      <g transform="translate(100 74)">
        <path d="M-6 -4 V-9 C-6 -14 6 -14 6 -9 V-4" fill="none" stroke={INK} strokeWidth="2.2" />
        <rect x="-9" y="-4" width="18" height="14" rx="2.5" fill={PAPER} stroke={INK} strokeWidth="2.2" />
      </g>
    </>
  ),
}

export default function MapVignette({ kind, className = '' }) {
  const scene = SCENES[kind]
  if (!scene) return null
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 110"
      className={`pointer-events-none absolute hidden h-[164px] w-[298px] overflow-visible xl:block ${className}`}
    >
      {scene}
    </svg>
  )
}
