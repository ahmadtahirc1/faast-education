'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

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
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-foreground/70">
            Everything you need to know about FAAST Education  and our programs.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="bg-card rounded-lg border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors text-left"
              >
                <span className="font-semibold text-base text-primary pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-accent flex-shrink-0" />
                </motion.div>
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 py-4 bg-muted/50 border-t border-border"
                >
                  <p className="text-foreground/70 leading-relaxed text-sm">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-foreground/70 mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="https://wa.me/923418576000?text=Hi%2C%20I%20have%20a%20question%20about%20FAAST%20Education ."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              WhatsApp Us
            </motion.a>
            <motion.a
              href="tel:+923418576000"
              className="bg-accent text-primary px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-shadow inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Call: 03418576000
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
