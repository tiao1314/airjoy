import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import Services from '../components/Services'
import Process from '../components/Process'
import Brands from '../components/Brands'
import FAQ from '../components/FAQ'
import Enquiry from '../components/Enquiry'
import Footer from '../components/Footer'

/**
 * The scrolling marketing site. Every section owns its own container, padding and
 * background band, so this page only fixes the order and the white ground beneath.
 */
export default function SitePage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Process />
        <Brands />
        <FAQ />
        <Enquiry />
      </main>
      <Footer />
    </div>
  )
}
