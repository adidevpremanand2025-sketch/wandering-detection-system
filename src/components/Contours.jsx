/**
 * Contours: faint topographic lines, the paper of a walking map. Static and decorative.
 * Fills its positioned parent; sits behind content.
 */
const LINES = [
  'M-40 120 C 120 60, 260 160, 420 110 S 720 30, 900 90 S 1180 170, 1480 100',
  'M-40 180 C 140 120, 280 220, 440 170 S 740 90, 920 150 S 1200 230, 1480 160',
  'M-40 250 C 160 190, 300 290, 460 240 S 760 160, 940 220 S 1220 300, 1480 230',
  'M-40 560 C 100 520, 220 600, 380 570 S 640 500, 820 540 S 1120 620, 1480 560',
  'M-40 630 C 120 590, 240 670, 400 640 S 660 570, 840 610 S 1140 690, 1480 630',
  'M1040 300 C 1100 250, 1220 260, 1250 320 S 1200 430, 1120 420 S 990 350, 1040 300 Z',
  'M1070 315 C 1110 285, 1190 292, 1208 330 S 1170 400, 1120 392 S 1040 345, 1070 315 Z',
  'M160 380 C 220 340, 320 350, 330 410 S 270 500, 200 480 S 110 420, 160 380 Z',
]

export default function Contours({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke="var(--color-contour)" strokeWidth="1.25">
        {LINES.map((d) => <path key={d} d={d} />)}
      </g>
    </svg>
  )
}
