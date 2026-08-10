import type { Transition, Variants } from 'framer-motion'

// Rule for every animated element in this app: give it its OWN
// initial="hidden" whileInView="visible" viewport={viewportOnce} (or literal
// inline variants). Never rely on inherited variant context from a
// staggerContainer() parent - that pattern gets children stuck at `hidden`
// forever in this codebase (see staggerDelay below for the cascade-effect
// replacement). staggerContainer() is kept only for not-yet-migrated call
// sites; do not use it in new code.

export const defaultTransition: Transition = { duration: 0.6, ease: 'easeOut' }

// amount: 'some' (not a fixed fraction) - a stagger container wrapping a
// whole grid can be much taller than the viewport, so a percentage-based
// threshold like 0.25 may never be satisfiable at normal scroll positions.
export const viewportOnce = { once: true, amount: 'some' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
}

export function staggerContainer(staggerChildren = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  }
}

// Parent->child variant propagation (staggerContainer + child variants) proved
// unreliable in this app - children could get stuck at their hidden state
// indefinitely. Giving each grid item its own whileInView trigger is reliable;
// this keeps the same cascading look via a per-index delay instead.
export function staggerDelay(index: number, step = 0.06, max = 0.4) {
  return Math.min(index * step, max)
}
