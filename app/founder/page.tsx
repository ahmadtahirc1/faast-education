'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import WhatsAppButton from '@/components/whatsapp-button'

type FounderContent = {
  founderImage?: string
}

export default function FounderPage() {
  const [content, setContent] = useState<FounderContent>({})
  const [founderImageFailed, setFounderImageFailed] = useState(false)

  useEffect(() => {
    fetch('/api/site-content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => undefined)
  }, [])

  const founderImage = !founderImageFailed ? content.founderImage : undefined

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 sm:pt-[156px] pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-lg"
          >
            <div className="grid md:grid-cols-[220px_1fr] gap-8 items-center">
              <div className="flex justify-center md:justify-start">
                {founderImage ? (
                  <Image
                    src={founderImage}
                    alt="Sir Rizwan Razi"
                    width={220}
                    height={220}
                    className="rounded-full object-cover border-4 border-accent/20 shadow-md"
                    onError={() => setFounderImageFailed(true)}
                  />
                ) : (
                  <div className="w-[220px] h-[220px] rounded-full border-4 border-accent/20 shadow-md bg-muted flex items-center justify-center">
                    <GraduationCap className="w-16 h-16 text-muted-foreground" />
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-accent font-semibold mb-3">
                  Founder & Mentor
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                  Sir Rizwan Razi
                </h1>
                <p className="text-lg text-foreground/75 leading-relaxed mb-4">
                  A celebrated mathematician, a renowned mathematics teacher, and a source of inspiration for students across Pakistan. Sir Rizwan Razi has spent his life encouraging young minds to believe in discipline, innovation, and the power of education.
                </p>
                <p className="text-lg text-foreground/75 leading-relaxed mb-4">
                  Under his guidance, FAAST Education grew with a clear mission: to teach with purpose, to build confidence, and to transform students into achievers who can change the world.
                </p>
                <div className="rounded-2xl bg-primary/10 border border-primary/20 p-5">
                  <p className="text-primary font-bold text-lg mb-2">Founder's Message</p>
                  <p className="text-foreground/75 leading-relaxed">
                    "Education is not just about marks. It is about building character, developing thinking, and creating a generation that can innovate, serve, and lead. <span className="font-semibold text-primary">Win is his identification.</span> Every FAASTian carries that belief forward."
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
