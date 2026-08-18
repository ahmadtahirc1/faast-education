'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { GraduationCap, Quote } from 'lucide-react'
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
      <section className="pt-28 sm:pt-[156px]">
        <div className="grid lg:grid-cols-12 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[360px] bg-muted lg:col-span-5 lg:min-h-[640px]"
          >
            {founderImage ? (
              <Image
                src={founderImage}
                alt="Sir Rizwan Razi"
                fill
                className="object-contain lg:object-cover lg:object-top"
                onError={() => setFounderImageFailed(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <GraduationCap className="h-20 w-20 text-muted-foreground" />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center px-4 py-14 sm:px-6 lg:col-span-7 lg:px-16 lg:py-24"
          >
            <span className="text-eyebrow font-bold uppercase text-accent-ink">Founder &amp; Mentor</span>
            <h1 className="text-display mt-4 font-bold text-primary">Sir Rizwan Razi</h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
              A celebrated mathematician, a renowned mathematics teacher, and a source of inspiration for students across Pakistan. Sir Rizwan Razi has spent his life encouraging young minds to believe in discipline, innovation, and the power of education.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground/75">
              Under his guidance, FAAST Education grew with a clear mission: to teach with purpose, to build confidence, and to transform students into achievers who can change the world.
            </p>

            <div className="relative mt-10 max-w-xl border-t-2 border-primary/15 pt-8">
              <Quote className="pointer-events-none absolute -top-2 left-0 h-16 w-16 text-primary/10" />
              <p className="relative text-quote font-medium leading-snug text-primary">
                &ldquo;Education is not just about marks. It is about building character, developing thinking, and creating a generation that can innovate, serve, and lead. <span className="text-accent-ink">Win is his identification.</span> Every FAASTian carries that belief forward.&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-foreground/50">
                Founder&apos;s Message
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
