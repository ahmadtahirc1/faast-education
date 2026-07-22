'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BookOpen, Cpu, Presentation, Coffee, GraduationCap, Landmark, Building2 } from 'lucide-react'

const iconMap = {
  BookOpen,
  Cpu,
  Presentation,
  Coffee,
  GraduationCap,
  Landmark,
  Building2,
}

type Facility = {
  title: string
  description: string
  icon: string
  image?: string
}

export default function Facilities() {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set())

  useEffect(() => {
    fetch('/api/site-content')
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data.facilities ?? [])
      })
      .catch(() => {
        setFacilities([])
      })
  }, [])

  return (
    <section id="facilities" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            World-Class Facilities
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Experience learning in an environment designed for excellence and innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility, index) => {
            const Icon = iconMap[facility.icon as keyof typeof iconMap] ?? BookOpen
            return (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative h-56 rounded-xl overflow-hidden mb-4 bg-muted">
                  {facility.image && !failedImages.has(index) && (
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() => setFailedImages((prev) => new Set(prev).add(index))}
                    />
                  )}
                  {facility.image && !failedImages.has(index) && (
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all"></div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon
                      className={`w-12 h-12 group-hover:scale-125 transition-transform ${
                        facility.image && !failedImages.has(index)
                          ? 'text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]'
                          : 'text-primary'
                      }`}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-primary mb-2">{facility.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{facility.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
