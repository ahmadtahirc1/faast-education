'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { defaultTransition, fadeUp, viewportOnce } from '@/lib/motion'
import { RevealHeading } from '@/components/reveal-heading'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Ahmad Raza',
      role: 'MDCAT Top Scorer',
      company: 'Now at King Edward Medical University',
      text: 'FAAST Education \'s MDCAT preparation program was exceptional. The faculty\'s dedication and daily mock tests helped me achieve my dream score. I am now studying at KEMU — something I only imagined possible because of FAAST.',
      rating: 5,
    },
    {
      name: 'Sara Tariq',
      role: 'NUST NET Qualifier',
      company: 'Now at NUST Islamabad — Mechanical Engineering',
      text: 'The NET Sessions at FAAST Education  are unlike anything else in Faisalabad. The teachers know exactly what NUST looks for. Their mock tests and IQ preparation made me confident on test day.',
      rating: 5,
    },
    {
      name: 'Hassan Ali',
      role: 'Intermediate Topper',
      company: 'Faisalabad Board — 1st Position Holder',
      text: 'The evening coaching at FAAST gave me the structured preparation I needed. Small batch sizes meant the teacher always knew how I was doing. I topped the board — and it would not have been possible without this Education .',
      rating: 5,
    },
    {
      name: 'Fatima Malik',
      role: 'NUMS Qualifier',
      company: 'Now at Army Medical College, Rawalpindi',
      text: 'The NUMS preparation at FAAST was highly focused and relevant. The faculty addressed every question pattern specific to the NUMS test. I qualified in my first attempt and secured a seat at AMC.',
      rating: 5,
    },
    {
      name: 'Bilal Hussain',
      role: 'FUNG Qualifier',
      company: 'FAST-NUCES Faisalabad — Computer Science',
      text: 'FAAST Education \'s FUNG preparation is amazing. The Math sessions are very advanced and the IQ practice sets are spot on. I got into FAST-NUCES Faisalabad campus — my first choice!',
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const active = testimonials[currentIndex]

  return (
    <section className="bg-card py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
          className="mb-16"
        >
          <span className="text-eyebrow font-bold uppercase text-accent-ink">Success Stories</span>
          <RevealHeading text="Student success stories" as="h2" className="text-h1 mt-2 text-primary" />
        </motion.div>

        <div className="relative">
          <Quote className="pointer-events-none absolute -top-6 -left-2 h-28 w-28 text-primary/5 sm:h-36 sm:w-36" />

          <div className="flex items-start gap-2 sm:gap-6">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="mt-2 flex-shrink-0 text-primary/40 transition-colors hover:text-accent-ink"
            >
              <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.5} />
            </button>

            <div className="relative min-h-[280px] flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="mb-4 flex gap-1">
                    {Array(active.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent-ink text-accent-ink" />
                      ))}
                  </div>

                  <p className="text-quote font-medium leading-snug text-primary">
                    &ldquo;{active.text}&rdquo;
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                      {active.name
                        .split(' ')
                        .map((part) => part[0])
                        .join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-primary">{active.name}</h4>
                      <p className="text-sm text-foreground/60">
                        <span className="font-semibold text-accent-ink">{active.role}</span> — {active.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="mt-2 flex-shrink-0 text-primary/40 transition-colors hover:text-accent-ink"
            >
              <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.5} />
            </button>
          </div>

          <div className="mt-10 flex gap-2 pl-10 sm:pl-16">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-0.5 transition-all ${
                  i === currentIndex ? 'w-8 bg-accent-ink' : 'w-4 bg-primary/20'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
          className="mt-16 flex flex-col gap-6 border-t-2 border-primary/15 pt-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-lg font-bold text-primary">
            Join thousands of successful students at FAAST Education, Faisalabad
          </p>
          <motion.a
            href="https://wa.me/923418576000?text=Hi%2C%20I%20want%20to%20enroll%20at%20FAAST%20Education ."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center justify-center bg-accent px-8 py-3 font-bold text-accent-foreground transition-shadow hover:shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Your Journey Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
