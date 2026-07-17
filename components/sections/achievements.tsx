'use client'

import { motion } from 'framer-motion'
import { Award, ThumbsUp, Users, BookOpen } from 'lucide-react'

export default function Achievements() {
  const achievements = [
    {
      icon: ThumbsUp,
      title: '100% Recommended',
      description: 'Every single student and parent who reviewed FAAST Education  recommends it to others. A testament to our quality.',
      stats: '100%',
    },
    {
      icon: Award,
      title: 'Top Student Results',
      description: 'Our students consistently achieve top positions in board exams and score among the highest in MDCAT, NET, NUMS and other entry tests.',
      stats: 'Position Holders',
    },
    {
      icon: Users,
      title: 'Growing Community',
      description: 'Over 6,000 students, parents and alumni follow FAAST Education  on Facebook — a growing family built on trust.',
      stats: '6,020+ Members',
    },
    {
      icon: BookOpen,
      title: 'Multiple Programs',
      description: 'From Matric evening coaching to elite university entry tests like LUMS, NUST, MDCAT and more — all under one roof.',
      stats: '8+ Programs',
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
            FAAST Education   is Faisalabad&apos;s most trusted coaching institute — backed by real results and real reviews.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
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
                  className="inline-block p-4 bg-accent/20 rounded-lg mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-8 h-8 text-accent" />
                </motion.div>

                <h3 className="text-xl font-bold text-primary mb-2">{achievement.title}</h3>
                <p className="text-foreground/70 mb-4 leading-relaxed text-sm">{achievement.description}</p>

                <motion.div
                  className="text-2xl font-bold text-accent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {achievement.stats}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Real Stats Banner */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {[
            { label: 'Facebook Likes', value: '6,020+' },
            { label: 'Verified Reviews', value: '22+' },
            { label: 'Recommendation Rate', value: '100%' },
            { label: 'Programs Offered', value: '8+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-foreground/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Facebook Review Banner */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center gap-1 mb-3">
            {Array(5).fill(0).map((_, i) => (
              <span key={i} className="text-accent text-2xl">★</span>
            ))}
          </div>
          <p className="text-xl font-bold text-primary mb-2">
            &ldquo;100% of our students and parents recommend FAAST Education &rdquo;
          </p>
          <p className="text-foreground/60 text-sm mb-4">Based on 22+ verified reviews · Facebook</p>
          <a
            href="https://www.facebook.com/p/FAAST-Education -100064106918760/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            View Our Facebook Page →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
