import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import WalkDemo from './components/WalkDemo.jsx'
import { Section } from './components/ui.jsx'
import Involve from './components/Involve.jsx'
import Numbers from './components/Numbers.jsx'
import About from './components/About.jsx'
import Architecture from './components/Architecture.jsx'
import Interlude from './components/Interlude.jsx'
import { Problem, Story, Literature, Challenges, Objectives, Methodology, Hardware, Roadmap, Team } from './components/Sections.jsx'

import { walk } from './content.js'

export default function App() {
  return (
    <>
      <a href="#problem" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:p-2">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <Section id="walk" heading={walk.heading} tone="soft">
          <div className="mx-auto max-w-3xl"><WalkDemo /></div>
        </Section>
        <Problem />
        <Story />
        <Numbers />
        <Literature />
        <Challenges />
        <Objectives />
        <Interlude tone="soft">Everyone moves differently. Ours learns each person&rsquo;s own routine.</Interlude>
        <Architecture />
        <Methodology />
        <Hardware />
        <Roadmap />
        <Interlude>So a walk never has to end in worry.</Interlude>
        <Involve />
        <About />
        <Team />
      </main>
    </>
  )
}
