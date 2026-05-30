import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Process from '@/components/Process'
import WhyUs from '@/components/WhyUs'
import Reviews from '@/components/Reviews'
import Team from '@/components/Team'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import MapSection from '@/components/MapSection'
import Footer from '@/components/Footer'
import ExitPopup from '@/components/ExitPopup'
import FloatingButtons from '@/components/FloatingButtons'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <WhyUs />
        <Reviews />
        <FAQ />
        <Team />
        <Contact />
        <MapSection />
      </main>
      <Footer />
      <ExitPopup />
      <FloatingButtons />
    </>
  )
}
