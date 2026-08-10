'use client'

import { motion } from 'framer-motion'
import { defaultTransition, fadeUp, staggerDelay, viewportOnce } from '@/lib/motion'

// Splits a heading into words, each with its OWN whileInView trigger (never a
// staggerContainer parent - see lib/motion.ts for why that pattern breaks
// here). staggerDelay(i) fakes the same left-to-right cascade.
export function RevealHeading({
  text,
  as: Tag = 'h2',
  className = '',
}: {
  text: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  const words = text.split(' ')

  return (
    <Tag aria-label={text} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ ...defaultTransition, delay: staggerDelay(i, 0.05, 0.5) }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  )
}
