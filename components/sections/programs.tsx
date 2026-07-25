'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  Moon, Target, Cpu, Heart, Code, FileText, GraduationCap, Stethoscope,
  Clock, Users, BookOpen, ChevronDown, ChevronUp, Landmark, Calendar, Phone, ArrowRight
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { defaultTransition, fadeUp, staggerDelay, viewportOnce } from '@/lib/motion'
import { SectionKicker } from '@/components/section-kicker'

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
  color: string
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
    <section id="programs" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
          className="text-center mb-16"
        >
          <SectionKicker>Our Courses</SectionKicker>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Courses
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            From evening coaching to top university entry tests — FAAST Education has a course for every student.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {programs.map((program, index) => {
            const Icon = iconMap[program.icon] ?? Target
            const isExpanded = expandedId === program.id

            return (
              <motion.div
                key={program.id}
                className="bg-background rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:border-accent/40 transition-all group flex flex-col"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ ...defaultTransition, delay: staggerDelay(index) }}
                whileHover={{ y: -6 }}
              >
                <div className="relative h-44 overflow-hidden bg-muted flex-shrink-0">
                  {program.image && !failedImages.has(program.id) && (
                    <Image
                      src={program.image}
                      alt={program.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      onError={() => setFailedImages((prev) => new Set(prev).add(program.id))}
                    />
                  )}
                  {program.image && !failedImages.has(program.id) && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  )}
                  {program.badge && (
                    <span className={`absolute top-3 right-3 ${program.badgeColor ?? 'bg-primary'} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                      {program.badge}
                    </span>
                  )}
                </div>

                <div className="relative -mt-8 z-10 ml-5">
                  <div className="w-14 h-14 rounded-full bg-background shadow-md border border-border flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <div className="p-5 pt-3 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-primary mb-1 leading-tight">{program.name}</h3>
                  <p className="text-xs text-accent-ink font-semibold mb-2">{program.tagline}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed mb-3 flex-1">
                    {program.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="flex items-center gap-1 text-xs bg-muted rounded-full px-2 py-1 text-foreground/60">
                      <Clock className="w-3 h-3" /> {program.duration}
                    </span>
                    <span className="flex items-center gap-1 text-xs bg-muted rounded-full px-2 py-1 text-foreground/60">
                      <Users className="w-3 h-3" /> {program.level}
                    </span>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : program.id)}
                    className="flex items-center justify-between w-full text-sm font-semibold text-primary hover:text-accent transition-colors mb-2"
                  >
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" /> Course Details
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.ul
                        key="details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-1 mb-3 overflow-hidden"
                      >
                        {program.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                            {detail}
                          </li>
                        ))}
                        {program.university && (
                          <li className="flex items-center gap-1.5 text-xs text-primary font-semibold mt-2 pt-2 border-t border-border">
                            <Landmark className="w-3.5 h-3.5 flex-shrink-0" /> {program.university}
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
                        className="mb-3 space-y-2 border-t border-border pt-3 overflow-hidden"
                      >
                        <div className="text-xs font-bold text-primary uppercase tracking-wide">Batches Offered</div>
                        {program.subCourses.map((sub, i) => (
                          <div key={i} className="bg-muted rounded-lg p-2.5">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-xs font-bold text-primary">{sub.name}</span>
                              <span className="text-[10px] text-foreground/60 flex-shrink-0">{sub.duration}</span>
                            </div>
                            <p className="text-[11px] text-foreground/70 mt-1 leading-relaxed">{sub.description}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <a
                    href={`/programs/${program.id}`}
                    className="group/link flex items-center justify-center gap-1.5 w-full border border-primary text-primary font-semibold py-2 rounded-lg hover:bg-primary/5 transition-colors text-sm text-center mb-2"
                  >
                    View Full Details <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </a>

                  <motion.a
                    href={`https://wa.me/923418576000?text=${encodeURIComponent(`Hi, I am interested in ${program.name} at FAAST Education . Please share details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-accent text-accent-foreground font-bold py-2.5 rounded-lg hover:shadow-lg transition-shadow text-sm text-center block"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enroll Now
                  </motion.a>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="mt-12 bg-brand-navy rounded-2xl p-8 text-brand-navy-foreground text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
        >
          <h3 className="flex items-center justify-center gap-2 text-2xl font-bold mb-2">
            <Calendar className="w-6 h-6" /> Flexible Batch Timings
          </h3>
          <p className="text-brand-navy-foreground/80 mb-6 max-w-xl mx-auto">
            Morning and Evening batches available for all courses. New batches starting every month.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { time: 'Morning', hours: '8:00 AM – 12:00 PM' },
              { time: 'Afternoon', hours: '12:00 PM – 4:00 PM' },
              { time: 'Evening', hours: '4:00 PM – 9:00 PM' },
            ].map((slot) => (
              <div key={slot.time} className="bg-brand-navy-foreground/10 rounded-xl px-6 py-3">
                <div className="font-bold text-accent">{slot.time}</div>
                <div className="text-brand-navy-foreground/80">{slot.hours}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-center justify-center gap-1.5 text-brand-navy-foreground/70 text-sm">
            <Phone className="w-4 h-4" /> Call us at <a href="tel:+923418576000" className="text-accent font-bold hover:underline">03418576000</a> to book your seat
          </p>
        </motion.div>
      </div>
    </section>
  )
}
