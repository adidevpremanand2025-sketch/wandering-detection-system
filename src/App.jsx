import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Involve from './components/Involve.jsx'
import Numbers from './components/Numbers.jsx'
import About from './components/About.jsx'
import Architecture from './components/Architecture.jsx'
import { Problem, Literature, Challenges, Objectives, Methodology, Hardware, Roadmap, Team } from './components/Sections.jsx'

export default function App() {
  return (
    <>
      <a href="#problem" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:p-2">Skip to content</a>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Numbers />
        <Literature />
        <Challenges />
        <Objectives />
        <Architecture />
        <Methodology />
        <Hardware />
        <Roadmap />
        <Involve />
        <About />
        <Team />
      </main>
    </>
  )
}
