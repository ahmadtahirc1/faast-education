'use client'

import { motion } from 'framer-motion'
import { Award, Users, BookOpen, ClipboardCheck } from 'lucide-react'

export default function Achievements() {
  const values = [
    {
      icon: Users,
      title: 'Small, Personalized Batches',
      description: 'Every student gets individual attention — our batch sizes are kept small on purpose, not as an afterthought.',
    },
    {
      icon: Award,
      title: 'Experienced, Qualified Faculty',
      description: 'Subject specialists with a track record of helping students achieve strong board and entry-test results.',
    },
    {
      icon: ClipboardCheck,
      title: 'Structured Test Preparation',
      description: 'Regular tests, mock exams, and detailed performance reports so progress is tracked, not guessed at.',
    },
    {
      icon: BookOpen,
      title: 'Multiple Courses, One Campus',
      description: 'From Matric evening coaching to MDCAT, NUST NET, NUMS, LUMS, FUNG and NTS — all under one roof.',
    },
  ]

  return (
    <section id="achievements" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Why Students Choose Us
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            FAAST Education is Faisalabad&apos;s coaching institute for academic excellence and entry test preparation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                className="bg-card rounded-xl p-8 border border-border text-center hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <motion.div
                  className="inline-block p-4 bg-accent/10 rounded-lg mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-8 h-8 text-accent" />
                </motion.div>

                <h3 className="text-xl font-bold text-primary mb-2">{value.title}</h3>
                <p className="text-foreground/70 leading-relaxed text-sm">{value.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="https://www.facebook.com/p/FAAST-Education-100064106918760/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Visit Our Facebook Page →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
