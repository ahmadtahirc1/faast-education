'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

type HeroContent = {
  heroBackground?: string
  announcement?: {
    enabled: boolean
    title: string
    message: string
    image?: string
    imageAlt?: string
    ctaText?: string
    ctaUrl?: string
  }
}

export default function Hero() {
  const [content, setContent] = useState<HeroContent>({})
  const [isAnnouncementDismissed, setIsAnnouncementDismissed] = useState(false)
  const [heroImageFailed, setHeroImageFailed] = useState(false)

  useEffect(() => {
    fetch('/api/site-content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => undefined)
  }, [])

  const heroImage = !heroImageFailed ? content.heroBackground : undefined
  const announcement = content.announcement || { enabled: false, title: '', message: '' }

  const dismissAnnouncement = () => {
    setIsAnnouncementDismissed(true)
  }

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-20 bg-primary">
      {heroImage && (
        <Image
          src={heroImage as string}
          alt="FAAST Education Faisalabad"
          fill
          className="object-cover absolute inset-0"
          priority
          onError={() => setHeroImageFailed(true)}
        />
      )}
      <div className="absolute inset-0 bg-primary/65" />

      {announcement.enabled && !isAnnouncementDismissed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 py-4">
          <div className="relative w-full max-w-[min(92vw,640px)] rounded-2xl border border-white/15 bg-slate-950/90 p-4 text-white shadow-2xl backdrop-blur-md sm:p-5">
            <button
              type="button"
              onClick={dismissAnnouncement}
              aria-label="Dismiss announcement"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl text-white transition hover:bg-white/10"
            >
              ×
            </button>

            <div className="flex flex-col items-center gap-3 pr-8 text-center">
              {announcement.image && (
                <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-xl">
                  <div className="relative h-auto max-h-[55vh] w-full">
                    <Image
                      src={announcement.image}
                      alt={announcement.imageAlt || announcement.title}
                      width={1200}
                      height={1200}
                      sizes="(max-width: 640px) 100vw, 420px"
                      className="h-auto max-h-[55vh] w-full rounded-xl object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="min-w-0">
                <div className="text-sm font-bold text-accent sm:text-base">{announcement.title}</div>
                <div className="mt-1 text-sm text-white/90">{announcement.message}</div>
              </div>

              {announcement.ctaText && announcement.ctaUrl && (
                <a
                  href={announcement.ctaUrl}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-xs font-bold text-primary sm:text-sm"
                >
                  {announcement.ctaText}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 text-white/90 text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-accent">⭐</span>
            100% Recommended · 6,000+ Community Members · Faisalabad
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
            FAAST Education
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-2 font-medium italic">
            &ldquo;Each one Teach one&rdquo;
          </p>
          <p className="text-base md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Faisalabad&apos;s premier institute for Evening Coaching, MDCAT, NUST NET, NUMS, LUMS, FUNG &amp; NTS preparation.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.a
            href="https://wa.me/923418576000?text=Hi%2C%20I%20am%20interested%20in%20enrolling%20at%20FAAST%20Education.%20Please%20share%20details."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-primary px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl transition-all inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enroll via WhatsApp
          </motion.a>
          <motion.a
            href="#programs"
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Programs
          </motion.a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          className="mt-14 flex flex-wrap justify-center gap-6 md:gap-10 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {[
            { value: '6,000+', label: 'Community Members' },
            { value: '100%', label: 'Recommend Rate' },
            { value: '8+', label: 'Programs Offered' },
            { value: '22+', label: 'Verified Reviews' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
              <div className="text-xs md:text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Program Quick Links */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {['MDCAT', 'NUST NET', 'NUMS', 'LUMS', 'FUNG', 'NTS', 'Evening Coaching'].map((prog) => (
            <a
              key={prog}
              href="#programs"
              className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full px-3 py-1 transition-all"
            >
              {prog}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
