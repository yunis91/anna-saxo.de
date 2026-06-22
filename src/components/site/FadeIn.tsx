'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

/**
 * Mount-time fade-up for above-the-fold elements (hero eyebrow, subtext, CTAs).
 * Never wrap the LCP element (headline / hero image) - that would gate the paint.
 * Honors reduced-motion by rendering the final state immediately.
 */
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
