import Button from './Button.jsx'
import Contours from './Contours.jsx'
import WalkDemo from './WalkDemo.jsx'
import { site, team, walk, problem } from '../content.js'

/**
 * Hero: the walk itself. Headline and actions on the left; on the right, the map of one walk,
 * which plays once on load and shows the moment a stray is noticed. Contour lines are the paper.
 */
export default function Hero() {
  const list = team.map((t) => t.name)
  const names = list.length > 1 ? `${list.slice(0, -1).join(', ')} and ${list[list.length - 1]}` : list[0]

  return (
    <section id="top" className="relative overflow-hidden">
      {/* contours stay behind the map, never behind the headline or body text */}
      <div className="absolute inset-y-0 right-0 hidden w-[62%] lg:block"><Contours /></div>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-12 md:px-8 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-24">
        <div className="lg:col-span-5 lg:pt-6">
          <h1 className="text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.5rem]">
            {site.heroLine}
          </h1>
          <p className="mt-7 max-w-md text-xl">{site.tagline}</p>
          <p className="mt-4 max-w-md text-xl font-bold text-route">{site.quiet}</p>
          {/* the one safety-critical action, where a worried reader's eyes land first */}
          <p className="mt-6 max-w-md border-l-4 border-stray py-1 pl-4 font-bold text-ink">{problem.urgent}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Button href="#involve" size="lg">Get involved</Button>
            <a href="#architecture" className="inline-block py-3 font-bold underline decoration-2 underline-offset-[6px] hover:text-route">
              How it works
            </a>
          </div>
          <p className="mt-12 max-w-md text-base text-muted">
            {site.title}. Built by <span className="font-bold text-ink">{names}</span>, three students at {site.college}, because families need it.
          </p>
        </div>

        <div id="walk" className="lg:col-span-7">
          <h2 className="sr-only">{walk.heading}</h2>
          <WalkDemo />
        </div>
      </div>
    </section>
  )
}
