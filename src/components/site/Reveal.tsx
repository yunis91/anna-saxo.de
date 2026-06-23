'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

/**
 * Below-the-fold scroll reveal. Plays once when the element enters the viewport.
 * Reduced-motion renders the final state immediately (no transform, no fade).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      // `amount: 'some'` triggers as soon as any part is visible. A fixed ratio
      // (e.g. 0.25) never resolves for blocks taller than the viewport, leaving
      // them stuck at opacity:0 — that was the long-content reveal bug.
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
