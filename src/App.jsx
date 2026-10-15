import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Trail from './components/Trail.jsx'
import Involve from './components/Involve.jsx'
import Numbers from './components/Numbers.jsx'
import About from './components/About.jsx'
import Architecture from './components/Architecture.jsx'
import Interlude from './components/Interlude.jsx'
import RoutineOrbit from './components/RoutineOrbit.jsx'
import Learns from './components/Learns.jsx'
import { Problem, Story, Literature, Hardware, Roadmap, Team, Footer } from './components/Sections.jsx'

export default function App() {
  return (
    <>
      <a href="#problem" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:p-2">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <Trail strayAt="stray" homeAt="involve">
          <Problem />
          <Numbers />
          <Literature />
          <Interlude id="stray" vignette="signpost">Everyone moves differently. Ours learns each person&rsquo;s own routine.</Interlude>
          <Learns />
          <Architecture />
          <Hardware />
          <Roadmap />
          <Story />
          <Team />
          <About />
          <Interlude id="closing" tone="soft" visual={<RoutineOrbit />}>A walk that strays should be noticed early.</Interlude>
          <Involve />
        </Trail>
      </main>
      <Footer />
    </>
  )
}
