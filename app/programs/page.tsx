'use client'

import Navbar from '@/components/navbar'
import Programs from '@/components/sections/programs'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 sm:pt-[116px]">
        <Programs />
      </div>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
