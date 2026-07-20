'use client'

import Navbar from '@/components/navbar'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Gallery from '@/components/sections/gallery'
import Achievements from '@/components/sections/achievements'
import Testimonials from '@/components/sections/testimonials'
import FAQ from '@/components/sections/faq'
import Contact from '@/components/sections/contact'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Achievements />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
