'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle, Award, MapPin, GraduationCap } from 'lucide-react'

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
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            About FAAST Academy
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Faisalabad&apos;s trusted name in academic coaching and university entry test preparation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-primary mb-6">
              &ldquo;Each one Teach one&rdquo;
            </h3>
            <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
              FAAST Education is a premier educational institution based in Faisalabad, dedicated to providing advanced coaching and entry test preparation for students at all levels. From Matric and Intermediate evening coaching to specialized preparation for MDCAT, NUST NET, NUMS, LUMS, FUNG and NTS — we cover it all.
            </p>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              Located at 13-C Ali Tower, Jaranwala Road, Faisalabad, our team of dedicated subject specialists is committed to your success.
            </p>

            <div className="space-y-3">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-medium text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Founder Card */}
            <motion.div
              className="bg-card rounded-xl p-6 border border-border shadow-sm"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-5">
                {founderImage ? (
                  <Image
                    src={founderImage}
                    alt="Sir Rizwan Razi"
                    width={120}
                    height={120}
                    className="rounded-full object-cover border-4 border-accent/20 flex-shrink-0"
                    onError={() => setFounderImageFailed(true)}
                  />
                ) : (
                  <div className="w-[120px] h-[120px] rounded-full border-4 border-accent/20 bg-muted flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-10 h-10 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">Founder & Vision</p>
                  <h4 className="font-bold text-xl text-primary mb-2">Sir Rizwan Razi</h4>
                  <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                    A celebrated mathematician, renowned maths teacher, and source of motivation for students across Pakistan. His dedication to change lives through education, innovation, and disciplined learning continues to inspire the FAAST family.
                  </p>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    His message to every FAASTian is simple: <span className="font-semibold text-primary">&ldquo;Win is his identification.&rdquo;</span> We learn, teach, rise, and grow with that spirit.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              className="bg-primary rounded-xl p-6 text-primary-foreground"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <Award className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Our Mission</h4>
                  <p className="text-primary-foreground/80 text-sm leading-relaxed">
                    To empower every student with the knowledge, skills, and confidence to achieve their academic goals — from board exams to the most prestigious university admissions in Pakistan.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.a
              href="https://maps.google.com/?q=13-C+Ali+Tower+Jaranwala+Road+Faisalabad"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card rounded-xl p-4 border border-border hover:border-primary hover:shadow-md transition-all flex items-center gap-3"
              whileHover={{ scale: 1.01 }}
            >
              <MapPin className="w-6 h-6 text-accent flex-shrink-0" />
              <div>
                <p className="font-semibold text-primary text-sm">Find Us</p>
                <p className="text-xs text-foreground/70">13-C Ali Tower, Jaranwala Road, Near RCG Plaza, Faisalabad</p>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
