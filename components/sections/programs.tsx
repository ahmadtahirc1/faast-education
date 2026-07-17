'use client'

import { motion } from 'framer-motion'
import {
  Moon, Target, Cpu, Heart, Code, FileText, GraduationCap, Stethoscope,
  Clock, Users, BookOpen, ChevronDown, ChevronUp
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'

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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Programs
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            From evening coaching to top university entry tests — FAAST Education has a program for every student.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {programs.map((program, index) => {
            const Icon = iconMap[program.icon] ?? Target
            const isExpanded = expandedId === program.id

            return (
              <motion.div
                key={program.id}
                className="bg-background rounded-xl overflow-hidden border border-border hover:shadow-2xl transition-all group flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                whileHover={{ y: -6 }}
              >
                <div className="relative h-36 overflow-hidden bg-muted flex-shrink-0">
                  {program.image && !failedImages.has(program.id) && (
                    <Image
                      src={program.image}
                      alt={program.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() => setFailedImages((prev) => new Set(prev).add(program.id))}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
                  {program.badge && (
                    <span className={`absolute top-3 right-3 ${program.badgeColor ?? 'bg-primary'} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                      {program.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 left-4">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-primary mb-1 leading-tight">{program.name}</h3>
                  <p className="text-xs text-accent font-semibold mb-2">{program.tagline}</p>
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
                      <BookOpen className="w-4 h-4" /> Program Details
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-1 mb-3"
                    >
                      {program.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground/70">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                          {detail}
                        </li>
                      ))}
                      {program.university && (
                        <li className="text-xs text-primary font-semibold mt-2 pt-2 border-t border-border">
                          🏫 {program.university}
                        </li>
                      )}
                    </motion.ul>
                  )}

                  <motion.a
                    href={`https://wa.me/923418576000?text=${encodeURIComponent(`Hi, I am interested in ${program.name} at FAAST Education . Please share details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-accent text-primary font-bold py-2.5 rounded-lg hover:shadow-lg transition-shadow text-sm text-center block"
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
          className="mt-12 bg-primary rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-2">📅 Flexible Batch Timings</h3>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Morning and Evening batches available for all programs. New batches starting every month.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { time: 'Morning', hours: '8:00 AM – 12:00 PM' },
              { time: 'Afternoon', hours: '12:00 PM – 4:00 PM' },
              { time: 'Evening', hours: '4:00 PM – 9:00 PM' },
            ].map((slot) => (
              <div key={slot.time} className="bg-white/10 rounded-xl px-6 py-3">
                <div className="font-bold text-accent">{slot.time}</div>
                <div className="text-white/80">{slot.hours}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-white/70 text-sm">
            📞 Call us at <a href="tel:+923418576000" className="text-accent font-bold hover:underline">03418576000</a> to book your seat
          </p>
        </motion.div>
      </div>
    </section>
  )
}
