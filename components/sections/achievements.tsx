'use client'

import { motion } from 'framer-motion'
import { Award, Users, BookOpen, ClipboardCheck, ArrowUpRight } from 'lucide-react'
import { defaultTransition, fadeUp, staggerDelay, viewportOnce } from '@/lib/motion'
import { RevealHeading } from '@/components/reveal-heading'
import { IndexNumeral } from '@/components/index-numeral'

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
    <section id="achievements" className="bg-background py-24 sm:py-32">
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
            <span className="text-eyebrow font-bold uppercase text-accent-ink">Why Choose Us</span>
            <RevealHeading
              text="Why students choose us"
              as="h2"
              className="text-h1 mt-2 text-primary"
            />
          </div>
          <p className="max-w-sm text-foreground/70 md:text-right">
            Faisalabad&apos;s coaching institute for academic excellence and entry test preparation.
          </p>
        </motion.div>

        <div className="grid border-t-2 border-primary/15 md:grid-cols-4 md:border-t-0">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                className="border-b-2 border-primary/15 py-8 pr-6 md:border-b-0 md:border-l-2 md:py-0 md:pl-8 md:pr-6 first:md:border-l-0 first:md:pl-0"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ ...defaultTransition, delay: staggerDelay(index) }}
              >
                <IndexNumeral index={index} />
                <Icon className="mt-4 h-7 w-7 text-accent-ink" />
                <h3 className="mt-4 text-lg font-bold text-primary">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{value.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
          className="mt-16"
        >
          <a
            href="https://www.facebook.com/p/FAAST-Education-100064106918760/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-accent-ink hover:decoration-accent-ink"
          >
            Visit Our Facebook Page
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
