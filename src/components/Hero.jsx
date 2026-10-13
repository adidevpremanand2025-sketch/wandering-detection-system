import Button from './Button.jsx'
import WalkDemo from './WalkDemo.jsx'
import { site, team, walk, problem } from '../content.js'

/**
 * Hero: the walk itself. On wide screens the headline and actions sit left and the map right.
 * On a phone the order is headline, status, emergency line, then the map, then the rest, so the
 * demo is on the first screen instead of below the buttons. The map card draws its own contour lines;
 * nothing is drawn behind the text.
 */
export default function Hero() {
  const list = team.map((t) => t.name)
  const names = list.length > 1 ? `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}` : list[0]

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl gap-x-10 gap-y-8 px-5 pb-16 pt-10 md:px-8 md:pt-14 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:pb-24">
        {/* A: headline, status, emergency */}
        <div className="lg:col-span-5 lg:row-start-1 lg:pt-6">
          <h1 className="text-[2.25rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.5rem]">
            {site.heroLine}
          </h1>
          <p className="mt-5 max-w-md text-xl font-bold text-route">{site.quiet}</p>
          {/* the one safety-critical action, where a worried reader's eyes land first */}
          <p className="mt-5 max-w-md border-l-4 border-stray py-1 pl-4 font-bold text-ink">{problem.urgent}</p>
        </div>

        {/* B: the walk */}
        <div id="walk" className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <h2 className="sr-only">{walk.heading}</h2>
          <WalkDemo />
        </div>

        {/* C: what it is, and what to do */}
        <div className="lg:col-span-5 lg:row-start-2">
          <p className="max-w-md text-xl">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Button href="#involve" size="lg">Get involved</Button>
            <a href="#architecture" className="inline-block py-3 font-bold underline decoration-2 underline-offset-[6px] hover:text-route">
              How it works
            </a>
          </div>
          <p className="mt-10 max-w-md text-base text-muted">
            Built by <span className="font-bold text-ink">{names}</span>, three students at {site.college}, because families need it.
          </p>
        </div>
      </div>
    </section>
  )
}
