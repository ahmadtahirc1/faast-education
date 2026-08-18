'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Moon, Target, Cpu, Heart, Code, FileText, GraduationCap, Stethoscope,
  Clock, Users, BookOpen, ChevronDown, ChevronUp, Landmark, Calendar, Phone, ArrowRight
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { defaultTransition, fadeUp, staggerDelay, viewportOnce } from '@/lib/motion'
import { RevealHeading } from '@/components/reveal-heading'
import { IndexNumeral } from '@/components/index-numeral'

const iconMap: Record<string, React.ElementType> = {
  Moon, Target, Cpu, Heart, Code, FileText, GraduationCap, Stethoscope,
}

type ProgramItem = {
  id: string
  name: string
  shortName: string
  icon: string
  tagline: string
  description: string
  details: string[]
  duration: string
  timing: string
  level: string
  image?: string
  badge?: string
  badgeColor?: string
  university?: string
  subCourses?: Array<{
    name: string
    duration: string
    description: string
  }>
}

export default function Programs() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [programs, setPrograms] = useState<ProgramItem[]>([])
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetch('/api/site-content')
      .then((response) => response.json())
      .then((data) => setPrograms(data.programs ?? []))
      .catch(() => setPrograms([]))
  }, [])

  return (
    <section id="programs" className="bg-card py-24 sm:py-32">
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
            <span className="text-eyebrow font-bold uppercase text-accent-ink">Our Courses</span>
            <RevealHeading text="Our courses" as="h2" className="text-h1 mt-2 text-primary" />
          </div>
          <p className="max-w-sm text-foreground/70 md:text-right">
            From evening coaching to top university entry tests — a course for every student.
          </p>
        </motion.div>

        <div className="border-t-2 border-primary/15">
          {programs.map((program, index) => {
            const Icon = iconMap[program.icon] ?? Target
            const isExpanded = expandedId === program.id
            const imageOnRight = index % 2 === 1

            return (
              <motion.div
                key={program.id}
                className="grid gap-8 border-b-2 border-primary/15 py-14 lg:grid-cols-12 lg:gap-12"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ ...defaultTransition, delay: staggerDelay(index, 0.05, 0.3) }}
              >
                {/* Image */}
                <div
                  className={`relative h-64 flex-shrink-0 overflow-hidden bg-muted lg:col-span-5 lg:h-80 ${
                    imageOnRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  {program.image && !failedImages.has(program.id) && (
                    <Image
                      src={program.image}
                      alt={program.name}
                      fill
                      className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={() => setFailedImages((prev) => new Set(prev).add(program.id))}
                    />
                  )}
                  {program.badge && (
                    <span className={`absolute top-3 right-3 ${program.badgeColor ?? 'bg-primary'} rounded-full px-2 py-1 text-xs font-bold text-white`}>
                      {program.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className={`flex flex-col lg:col-span-7 ${imageOnRight ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-start gap-4">
                    <IndexNumeral index={index} className="!text-[clamp(2rem,3vw,3rem)]" />
                    <Icon className="mt-2 h-6 w-6 flex-shrink-0 text-accent-ink" />
                  </div>

                  <h3 className="mt-2 text-h2 font-bold leading-tight text-primary">{program.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-accent-ink">{program.tagline}</p>
                  <p className="mt-3 text-foreground/70 leading-relaxed">{program.description}</p>

                  <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/60">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" /> {program.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-4 w-4" /> {program.level}
                    </span>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : program.id)}
                    className="mt-5 flex w-full items-center justify-between border-t-2 border-primary/15 py-3 text-sm font-semibold text-primary transition-colors hover:text-accent-ink"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-4 w-4" /> Course Details
                    </span>
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.ul
                        key="details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 overflow-hidden pb-4"
                      >
                        {program.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                            {detail}
                          </li>
                        ))}
                        {program.university && (
                          <li className="mt-2 flex items-center gap-1.5 border-t border-primary/10 pt-2 text-sm font-semibold text-primary">
                            <Landmark className="h-4 w-4 flex-shrink-0" /> {program.university}
                          </li>
                        )}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                  <AnimatePresence initial={false}>
                    {isExpanded && program.subCourses && program.subCourses.length > 0 && (
                      <motion.div
                        key="subcourses"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 overflow-hidden border-t border-primary/10 pt-3 pb-4"
                      >
                        <div className="text-xs font-bold uppercase tracking-wide text-primary">Batches Offered</div>
                        {program.subCourses.map((sub, i) => (
                          <div key={i} className="border-l-2 border-accent/40 pl-3">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-sm font-bold text-primary">{sub.name}</span>
                              <span className="flex-shrink-0 text-xs text-foreground/60">{sub.duration}</span>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-foreground/70">{sub.description}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={`/programs/${program.id}`}
                      className="group/link flex flex-1 items-center justify-center gap-1.5 border-2 border-primary py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary/5"
                    >
                      View Full Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                    </a>

                    <motion.a
                      href={`https://wa.me/923418576000?text=${encodeURIComponent(`Hi, I am interested in ${program.name} at FAAST Education . Please share details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-accent py-3 text-center text-sm font-bold text-accent-foreground transition-shadow hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Enroll Now
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-16 bg-brand-navy p-10 text-brand-navy-foreground sm:p-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
        >
          <h3 className="flex items-center gap-2 text-h2 font-bold">
            <Calendar className="h-7 w-7 flex-shrink-0" /> Flexible Batch Timings
          </h3>
          <p className="mt-3 max-w-xl text-brand-navy-foreground/80">
            Morning and Evening batches available for all courses. New batches starting every month.
          </p>
          <div className="mt-8 grid gap-6 border-t border-brand-navy-foreground/15 pt-8 sm:grid-cols-3">
            {[
              { time: 'Morning', hours: '8:00 AM – 12:00 PM' },
              { time: 'Afternoon', hours: '12:00 PM – 4:00 PM' },
              { time: 'Evening', hours: '4:00 PM – 9:00 PM' },
            ].map((slot) => (
              <div key={slot.time}>
                <div className="text-lg font-bold text-accent">{slot.time}</div>
                <div className="text-brand-navy-foreground/80">{slot.hours}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 flex items-center gap-1.5 text-sm text-brand-navy-foreground/70">
            <Phone className="h-4 w-4" /> Call us at <a href="tel:+923418576000" className="font-bold text-accent hover:underline">03418576000</a> to book your seat
          </p>
        </motion.div>
      </div>
    </section>
  )
}
