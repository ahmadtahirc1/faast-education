'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle, Star, Award, BookOpen } from 'lucide-react'

export default function About() {
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

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-primary mb-6">
              &ldquo;Each one Teach one&rdquo;
            </h3>
            <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
              FAAST Education   is a premier Education  al institution based in Faisalabad, dedicated to providing advanced coaching and entry test preparation for students at all levels. From Matric and Intermediate evening coaching to specialized preparation for MDCAT, NUST NET, NUMS, LUMS, FUNG and NTS — we cover it all.
            </p>
            <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
              Located at 13-C Ali Tower, Jaranwala Road, Faisalabad, our Education  has earned a 100% recommendation rating from students and parents. With 6,000+ community members and a dedicated team of subject specialists, we are committed to your success.
            </p>

            {/* Tagline Banner */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6 flex items-center gap-3">
              <Star className="w-6 h-6 text-accent flex-shrink-0" />
              <div>
                <p className="font-bold text-primary">100% Recommended by Students & Parents</p>
                <p className="text-sm text-foreground/60">Based on 22+ verified reviews on Facebook</p>
              </div>
            </div>

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
            className="grid grid-cols-2 gap-4"
          >
            {[
              { number: '6,020+', label: 'Facebook Community', icon: '👥' },
              { number: '100%', label: 'Recommend Rate', icon: '⭐' },
              { number: '22+', label: '5-Star Reviews', icon: '🏆' },
              { number: '8+', label: 'Programs Offered', icon: '📚' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-card p-6 rounded-xl border border-border text-center hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-accent mb-1">{stat.number}</div>
                <div className="text-xs text-foreground/70">{stat.label}</div>
              </motion.div>
            ))}

            {/* Founder Card */}
            <motion.div
              className="col-span-2 bg-card rounded-xl p-6 border border-border shadow-sm"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex flex-col md:flex-row items-center gap-5">
                <Image
                  src="/rizwan razi.jpeg"
                  alt="Sir Rizwan Razi"
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-4 border-accent/20"
                />
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
              className="col-span-2 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <Award className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Our Mission</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
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
              className="col-span-2 bg-card rounded-xl p-4 border border-border hover:border-primary hover:shadow-md transition-all flex items-center gap-3"
              whileHover={{ scale: 1.01 }}
            >
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-semibold text-primary text-sm">Find Us</p>
                <p className="text-xs text-foreground/70">13-C Ali Tower, Jaranwala Road, Near RCG Plaza, Faisalabad</p>
              </div>
              <BookOpen className="w-4 h-4 text-accent ml-auto flex-shrink-0" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
