'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { X } from 'lucide-react'
import { defaultTransition, fadeUp, scaleIn, staggerDelay, viewportOnce } from '@/lib/motion'
import { RevealHeading } from '@/components/reveal-heading'

type GalleryImage = {
  src: string
  title: string
}

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    fetch('/api/site-content')
      .then((response) => response.json())
      .then((data) => setGalleryImages(data.galleryImages ?? []))
      .catch(() => setGalleryImages([]))
  }, [])

  useEffect(() => {
    if (!selectedImage) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedImage])

  return (
    <section id="gallery" className="bg-card py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
          className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="text-eyebrow font-bold uppercase text-accent-ink">Gallery</span>
            <RevealHeading text="Campus life & events" as="h2" className="text-h1 mt-2 text-primary" />
          </div>
          <p className="max-w-sm text-foreground/70 md:text-right">
            Moments from our vibrant community of learners and achievers.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 auto-rows-[160px] sm:gap-4 sm:auto-rows-[200px] lg:grid-cols-4 lg:auto-rows-[220px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={`${image.src}-${index}`}
              className={`group relative cursor-pointer overflow-hidden bg-muted ${
                index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
              }`}
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ ...defaultTransition, delay: staggerDelay(index) }}
              onClick={() => setSelectedImage(image.src)}
            >
              <Image
                src={image.src}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 p-4">
                <div className="translate-y-2 text-xs font-bold uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {image.title}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-h-[85vh] max-w-4xl w-full aspect-[4/3]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Gallery"
                fill
                className="object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
                className="absolute top-4 right-4 bg-white text-black p-2 hover:bg-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
