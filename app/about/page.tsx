'use client'

import Navbar from '@/components/navbar'
import About from '@/components/sections/about'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 sm:pt-[116px]">
        <About />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
