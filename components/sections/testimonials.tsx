'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Ahmad Raza',
      role: 'MDCAT Top Scorer',
      company: 'Now at King Edward Medical University',
      image: '🎓',
      text: 'FAAST Education \'s MDCAT preparation program was exceptional. The faculty\'s dedication and daily mock tests helped me achieve my dream score. I am now studying at KEMU — something I only imagined possible because of FAAST.',
      rating: 5,
    },
    {
      name: 'Sara Tariq',
      role: 'NUST NET Qualifier',
      company: 'Now at NUST Islamabad — Mechanical Engineering',
      image: '👩‍🎓',
      text: 'The NET Sessions at FAAST Education  are unlike anything else in Faisalabad. The teachers know exactly what NUST looks for. Their mock tests and IQ preparation made me confident on test day.',
      rating: 5,
    },
    {
      name: 'Hassan Ali',
      role: 'Intermediate Topper',
      company: 'Faisalabad Board — 1st Position Holder',
      image: '🏆',
      text: 'The evening coaching at FAAST gave me the structured preparation I needed. Small batch sizes meant the teacher always knew how I was doing. I topped the board — and it would not have been possible without this Education .',
      rating: 5,
    },
    {
      name: 'Fatima Malik',
      role: 'NUMS Qualifier',
      company: 'Now at Army Medical College, Rawalpindi',
      image: '👩‍⚕️',
      text: 'The NUMS preparation at FAAST was highly focused and relevant. The faculty addressed every question pattern specific to the NUMS test. I qualified in my first attempt and secured a seat at AMC.',
      rating: 5,
    },
    {
      name: 'Bilal Hussain',
      role: 'FUNG Qualifier',
      company: 'FAST-NUCES Faisalabad — Computer Science',
      image: '💻',
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

  return (
    <section className="py-20 bg-card">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Student Success Stories
          </h2>
          <p className="text-xl text-foreground/70">
            Real students. Real results. From FAAST Education , Faisalabad.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-2xl p-8 md:p-12 border border-border"
            >
              <div className="flex flex-col items-center text-center">
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array(testimonials[currentIndex].rating)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg text-foreground/80 mb-8 max-w-2xl leading-relaxed italic">
                  &ldquo;{testimonials[currentIndex].text}&rdquo;
                </p>

                {/* Author */}
                <div className="mb-2">
                  <div className="text-5xl mb-3">{testimonials[currentIndex].image}</div>
                  <h4 className="text-xl font-bold text-primary">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-accent font-semibold text-sm mt-1">
                    {testimonials[currentIndex].role}
                  </p>
                  <p className="text-foreground/50 text-sm">
                    {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 bg-accent text-primary rounded-full hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              onClick={nextTestimonial}
              className="p-3 bg-accent text-primary rounded-full hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-accent w-8' : 'bg-muted w-2'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-foreground/60 mb-4 text-sm">
            Join thousands of successful students at FAAST Education , Faisalabad
          </p>
          <motion.a
            href="https://wa.me/923418576000?text=Hi%2C%20I%20want%20to%20enroll%20at%20FAAST%20Education ."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey Today
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
