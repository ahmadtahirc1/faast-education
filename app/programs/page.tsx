'use client'

import Navbar from '@/components/navbar'
import Programs from '@/components/sections/programs'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 sm:pt-[156px]">
        <Programs />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
