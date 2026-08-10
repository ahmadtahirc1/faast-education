'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { defaultTransition, fadeUp, staggerDelay, viewportOnce } from '@/lib/motion'
import { RevealHeading } from '@/components/reveal-heading'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Which programs does FAAST Education  offer?',
      answer:
        'FAAST Education  offers 8 comprehensive programs: Evening Coaching (Matric & Intermediate), Entry Test Preparation, NUST NET Sessions, MDCAT Preparation, NUMS Preparation, FUNG (FAST-NUCES) Preparation, NTS Preparation, and LUMS Preparation. Each program has dedicated faculty and a structured curriculum.',
    },
    {
      question: 'What are the batch timings?',
      answer:
        'We offer three batch timings to accommodate all students: Morning (8:00 AM – 12:00 PM), Afternoon (12:00 PM – 4:00 PM), and Evening (4:00 PM – 9:00 PM). Evening coaching specifically runs from 4 PM to 9 PM. Contact us to check availability in your preferred slot.',
    },
    {
      question: 'Where is FAAST Education  located?',
      answer:
        'FAAST Education  is located at 13-C Ali Tower, Jaranwala Road, Near RCG Plaza, Faisalabad, Punjab, Pakistan. You can easily find us on Google Maps by searching "FAAST Education  Faisalabad".',
    },
    {
      question: 'How do I enroll?',
      answer:
        'Enrollment is simple! You can call or WhatsApp us at 03418576000 to inquire about your program of interest and batch availability. You can also visit us directly at our campus or fill out the contact form on this website.',
    },
    {
      question: 'Do you offer MDCAT and NUMS preparation both?',
      answer:
        'Yes! We offer dedicated programs for both MDCAT (PMC-based national medical entry test) and NUMS (National University of Medical Sciences entry test for Army Medical Colleges). Both have separate curricula and mock tests tailored to each test\'s pattern.',
    },
    {
      question: 'What is the fee structure?',
      answer:
        'Our fees are affordable and competitive for Faisalabad. We also offer easy monthly installment plans. Contact us at 03418576000 for the latest fee schedule for your specific program.',
    },
    {
      question: 'Do you provide past papers and mock tests?',
      answer:
        'Absolutely! All our entry test programs include past papers from the last 10 years, weekly mock tests, and detailed performance analysis. Mock tests are conducted in the actual test format so students are fully prepared on test day.',
    },
    {
      question: 'What makes FAAST Education  different?',
      answer:
        'FAAST Education  has earned a 100% recommendation rate from 22+ verified reviews on Facebook and has over 6,000 community members. Our small batch sizes ensure every student gets personalized attention. We specialize in the most competitive entry tests in Pakistan — all under one roof in Faisalabad.',
    },
  ]

  return (
    <section id="faq" className="bg-background py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
          className="mb-16"
        >
          <span className="text-eyebrow font-bold uppercase text-accent-ink">FAQ</span>
          <RevealHeading text="Frequently asked questions" as="h2" className="text-h1 mt-2 text-primary" />
        </motion.div>

        <div className="border-t-2 border-primary/15">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ ...defaultTransition, delay: staggerDelay(index) }}
              className="border-b-2 border-primary/15 py-6"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="group flex w-full items-start justify-between gap-6 text-left"
              >
                <span className="flex gap-5 sm:gap-8">
                  <span className="pt-1 text-sm font-bold text-accent-ink">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-lg font-bold text-primary transition-colors group-hover:text-accent-ink sm:text-xl">
                    {faq.question}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1 flex-shrink-0"
                >
                  <Plus className="h-5 w-5 text-primary" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="panel"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pl-10 pr-10 pt-4 text-sm leading-relaxed text-foreground/70 sm:pl-14">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ ...defaultTransition, delay: 0.15 }}
          className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-lg font-bold text-primary">Still have questions?</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <motion.a
              href="https://wa.me/923418576000?text=Hi%2C%20I%20have%20a%20question%20about%20FAAST%20Education ."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 px-8 py-3 font-bold text-white transition-shadow hover:shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              WhatsApp Us
            </motion.a>
            <motion.a
              href="tel:+923418576000"
              className="inline-flex items-center justify-center gap-2 bg-accent px-8 py-3 font-bold text-accent-foreground transition-shadow hover:shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Call: 03418576000
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
