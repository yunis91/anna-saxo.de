'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, type Icon } from '@phosphor-icons/react'

import { SITE } from '@/lib/site'

interface CtaButtonProps {
  label?: string
  href?: string
  variant?: 'primary' | 'outline'
  full?: boolean
  onClick?: () => void
  ButtonIcon?: Icon
}

/** Pill call-to-action. Primary = black, outline = hairline. Bento style. */
export function CtaButton({
  label = SITE.cta.label,
  href = SITE.cta.href,
  variant = 'primary',
  full = false,
  onClick,
  ButtonIcon = ArrowUpRight,
}: CtaButtonProps) {
  const reduce = useReducedMotion()

  return (
    <motion.a
      href={href}
      onClick={onClick}
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-outline'} ${full ? 'w-full' : ''}`}
    >
      {label}
      <ButtonIcon size={17} weight="bold" aria-hidden />
    </motion.a>
  )
}
