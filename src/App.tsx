import { AnnouncementBar } from './components/AnnouncementBar/AnnouncementBar'
import { Footer } from './components/Footer/Footer'
import { Nav } from './components/Nav/Nav'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { Clients } from './sections/Clients/Clients'
import { Contact } from './sections/Contact/Contact'
import { Faq } from './sections/Faq/Faq'
import { Features } from './sections/Features/Features'
import { Hero } from './sections/Hero/Hero'
import { Packages } from './sections/Packages/Packages'
import { Process } from './sections/Process/Process'
import { Work } from './sections/Work/Work'

export default function App() {
  useSmoothScroll()
  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <AnnouncementBar />
      <Nav />
      <main>
        <Hero />
        <Clients />
        <Work />
        <Features />
        <Process />
        <Packages />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
