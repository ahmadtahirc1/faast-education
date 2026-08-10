'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle, Award, MapPin, GraduationCap, ArrowUpRight } from 'lucide-react'
import { defaultTransition, fadeUp, staggerDelay, viewportOnce } from '@/lib/motion'
import { RevealHeading } from '@/components/reveal-heading'

type AboutContent = {
  founderImage?: string
}

export default function About() {
  const [content, setContent] = useState<AboutContent>({})
  const [founderImageFailed, setFounderImageFailed] = useState(false)

  useEffect(() => {
    fetch('/api/site-content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => undefined)
  }, [])

  const founderImage = !founderImageFailed ? content.founderImage : undefined

  const features = [
    'Highly qualified and experienced subject specialists',
    'Small batch sizes for personalized attention',
    'Regular tests, mock exams & weekly performance reports',
    'Dedicated doubt-clearing sessions after every class',
    'Monthly recognition and rewards for top performers',
    'Affordable fee structure with easy installment plans',
    'Flexible morning & evening batches to suit all students',
    'Proven track record with consistent top board results',
  ]

  return (
    <section id="about" className="bg-background py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={defaultTransition}
          className="mb-16"
        >
          <span className="text-eyebrow font-bold uppercase text-accent-ink">About Us</span>
          <RevealHeading text="About FAAST Academy" as="h2" className="text-h1 mt-2 text-primary" />
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: story + feature checklist */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <h3 className="text-h2 font-bold text-primary">&ldquo;Each one Teach one&rdquo;</h3>
            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              FAAST Education is a premier educational institution based in Faisalabad, dedicated to providing advanced coaching and entry test preparation for students at all levels. From Matric and Intermediate evening coaching to specialized preparation for MDCAT, NUST NET, NUMS, LUMS, FUNG and NTS — we cover it all.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-foreground/70">
              Located at 13-C Ali Tower, Jaranwala Road, Faisalabad, our team of dedicated subject specialists is committed to your success.
            </p>

            <div className="mt-10 grid border-t-2 border-primary/15 sm:grid-cols-2">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 border-b-2 border-primary/15 py-4 pr-4 [&:nth-child(odd)]:sm:pr-8 [&:nth-child(even)]:sm:pl-8"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  transition={{ ...defaultTransition, delay: staggerDelay(i) }}
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-ink" />
                  <span className="text-sm font-medium text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: founder / mission / location fact-strip */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-4">
              {founderImage ? (
                <Image
                  src={founderImage}
                  alt="Sir Rizwan Razi"
                  width={96}
                  height={96}
                  className="h-24 w-24 flex-shrink-0 object-cover"
                  onError={() => setFounderImageFailed(true)}
                />
              ) : (
                <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center bg-muted">
                  <GraduationCap className="h-9 w-9 text-muted-foreground" />
                </div>
              )}
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-ink">Founder &amp; Vision</p>
                <h4 className="text-xl font-bold text-primary">Sir Rizwan Razi</h4>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-foreground/70">
              A celebrated mathematician, renowned maths teacher, and source of motivation for students across Pakistan. His dedication to change lives through education, innovation, and disciplined learning continues to inspire the FAAST family.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70">
              His message to every FAASTian is simple: <span className="font-semibold text-primary">&ldquo;Win is his identification.&rdquo;</span> We learn, teach, rise, and grow with that spirit.
            </p>

            {/* Mission */}
            <div className="mt-8 bg-primary p-6 text-primary-foreground">
              <div className="flex items-start gap-3">
                <Award className="h-7 w-7 flex-shrink-0 text-accent" />
                <div>
                  <h4 className="mb-1 font-bold">Our Mission</h4>
                  <p className="text-sm leading-relaxed text-primary-foreground/80">
                    To empower every student with the knowledge, skills, and confidence to achieve their academic goals — from board exams to the most prestigious university admissions in Pakistan.
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <a
              href="https://maps.google.com/?q=13-C+Ali+Tower+Jaranwala+Road+Faisalabad"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 flex items-center justify-between gap-3 border-b-2 border-primary/15 py-4 transition-colors hover:border-accent-ink"
            >
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 text-accent-ink" />
                <div>
                  <p className="text-sm font-semibold text-primary">Find Us</p>
                  <p className="text-xs text-foreground/70">13-C Ali Tower, Jaranwala Road, Near RCG Plaza, Faisalabad</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-primary/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-ink" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
