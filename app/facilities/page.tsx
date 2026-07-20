'use client'

import Navbar from '@/components/navbar'
import Facilities from '@/components/sections/facilities'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 sm:pt-[116px]">
        <Facilities />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
