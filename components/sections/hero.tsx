'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

type HeroContent = {
  heroImages?: Array<{ id: string; src: string }>
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

const AUTOPLAY_MS = 6000

export default function Hero() {
  const [content, setContent] = useState<HeroContent>({})
  const [isAnnouncementDismissed, setIsAnnouncementDismissed] = useState(false)
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    fetch('/api/site-content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => undefined)
  }, [])

  const images = useMemo(
    () =>
      (content.heroImages ?? [])
        .map((image, index) => ({ ...image, index }))
        .filter((image) => image.src && !failedIndices.has(image.index)),
    [content.heroImages, failedIndices],
  )

  useEffect(() => {
    if (currentIndex >= images.length) setCurrentIndex(0)
  }, [images.length, currentIndex])

  useEffect(() => {
    if (images.length <= 1 || isPaused) return
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [images.length, isPaused])

  const announcement = content.announcement || { enabled: false, title: '', message: '' }

  const dismissAnnouncement = () => {
    setIsAnnouncementDismissed(true)
  }

  const activeImage = images[currentIndex]

  return (
    <section id="hero" className="relative overflow-hidden pt-28 sm:pt-[156px] bg-background">
      <div className="max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-12 lg:items-stretch">
        {/* Text column */}
        <div className="flex flex-col justify-center px-4 py-14 sm:px-6 lg:col-span-5 lg:py-24 lg:pl-8 lg:pr-10 xl:pl-12">
          <span className="text-eyebrow font-bold uppercase text-accent-ink">
            Faisalabad&apos;s Premier Coaching Institute
          </span>
          <h1 className="text-display mt-4 font-bold text-primary">
            Each one.<br /><span className="text-accent-ink">Teach one.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/70">
            Advanced coaching and university entry test preparation for students at every level, all under one roof in Faisalabad.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <motion.a
              href="https://wa.me/923418576000?text=Hi%2C%20I%20am%20interested%20in%20enrolling%20at%20FAAST%20Education.%20Please%20share%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-accent px-8 py-4 text-lg font-bold text-accent-foreground transition-shadow hover:shadow-2xl"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Apply Now
            </motion.a>
            <a
              href="/programs"
              className="group inline-flex items-center gap-1.5 text-lg font-semibold text-primary transition-colors hover:text-accent-ink"
            >
              View Courses
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Image column - bleeds to the edge */}
        <div
          className="relative w-full min-h-[320px] aspect-video bg-primary lg:col-span-7 lg:aspect-auto lg:min-h-[560px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence initial={false}>
            {activeImage ? (
              <motion.div
                key={activeImage.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage.src}
                  alt="FAAST Education Faisalabad"
                  className="absolute inset-0 h-full w-full object-contain"
                  onError={() =>
                    setFailedIndices((prev) => new Set(prev).add(activeImage.index))
                  }
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-primary text-primary-foreground">
                <div className="h-1 w-16 bg-accent" />
                <span className="text-eyebrow font-bold uppercase tracking-[0.3em]">FAAST Education</span>
              </div>
            )}
          </AnimatePresence>

          {images.length > 1 && (
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-4">
              <span className="text-sm font-bold text-white/90">
                {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
              <div className="flex gap-2">
                {images.map((image, i) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Show slide ${i + 1}`}
                    className={`h-0.5 transition-all ${
                      i === currentIndex ? 'w-8 bg-accent' : 'w-4 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {announcement.enabled && !isAnnouncementDismissed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 py-4">
          <div className="relative w-full max-w-[min(92vw,640px)] border-t-4 border-accent bg-slate-950/95 p-4 text-white shadow-2xl backdrop-blur-md sm:p-6">
            <button
              type="button"
              onClick={dismissAnnouncement}
              aria-label="Dismiss announcement"
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center border border-white/15 bg-white/5 text-2xl text-white transition hover:bg-white/10"
            >
              ×
            </button>

            <div className="flex flex-col items-center gap-3 pr-8 text-center">
              {announcement.image && (
                <div className="relative mx-auto w-full max-w-[420px] overflow-hidden">
                  <div className="relative h-auto max-h-[55vh] w-full">
                    <Image
                      src={announcement.image}
                      alt={announcement.imageAlt || announcement.title}
                      width={1200}
                      height={1200}
                      sizes="(max-width: 640px) 100vw, 420px"
                      className="h-auto max-h-[55vh] w-full object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="min-w-0">
                <div className="text-lg font-bold text-accent">{announcement.title}</div>
                <div className="mt-1 text-sm text-white/90">{announcement.message}</div>
              </div>

              {announcement.ctaText && announcement.ctaUrl && (
                <a
                  href={announcement.ctaUrl}
                  className="inline-flex items-center justify-center bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground"
                >
                  {announcement.ctaText}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
