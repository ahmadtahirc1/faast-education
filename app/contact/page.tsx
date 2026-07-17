'use client'

import Navbar from '@/components/navbar'
import Contact from '@/components/sections/contact'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <Contact />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
