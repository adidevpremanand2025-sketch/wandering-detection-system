import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Trail from './components/Trail.jsx'
import Involve from './components/Involve.jsx'
import Numbers from './components/Numbers.jsx'
import About from './components/About.jsx'
import Architecture from './components/Architecture.jsx'
import Interlude from './components/Interlude.jsx'
import RoutineOrbit from './components/RoutineOrbit.jsx'
import { Problem, Story, Literature, Challenges, Objectives, Hardware, Roadmap, Team, Footer } from './components/Sections.jsx'

export default function App() {
  return (
    <>
      <a href="#problem" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:p-2">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <Trail strayAt="stray" homeAt="involve">
          <Problem />
          <Story />
          <Numbers />
          <Literature />
          <Challenges />
          <Objectives />
          <Interlude id="stray">Everyone moves differently. Ours learns each person&rsquo;s own routine.</Interlude>
          <Architecture />
          <Hardware />
          <Roadmap />
          <Team />
          <About />
          <Interlude tone="soft" visual={<RoutineOrbit />}>So a walk never has to end in worry.</Interlude>
          <Involve />
        </Trail>
      </main>
      <Footer />
    </>
  )
}
