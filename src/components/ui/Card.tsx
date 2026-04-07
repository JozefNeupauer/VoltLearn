import { forwardRef, type HTMLAttributes } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'outline' | 'electric'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  animate?: boolean
}

const variants = {
  default:  'bg-surface-800 border border-slate-700/60',
  elevated: 'bg-surface-800 border border-slate-700/60 shadow-xl shadow-black/30',
  glass:    'bg-slate-800/40 backdrop-blur-sm border border-slate-700/40',
  outline:  'bg-transparent border-2 border-slate-600',
  electric: 'bg-surface-800 border border-electric-500/40 shadow-lg shadow-electric-900/20',
}

const paddings = {
  none: '',
  sm:   'p-3',
  md:   'p-4 sm:p-5',
  lg:   'p-6 sm:p-7',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hover = false,
      animate = false,
      className = '',
      children,
      ...rest
    },
    ref,
  ) => {
    const base = `rounded-2xl ${variants[variant]} ${paddings[padding]} ${
      hover ? 'cursor-pointer transition-all duration-200 hover:border-electric-500/60 hover:shadow-electric-900/30 hover:-translate-y-0.5' : ''
    } ${className}`

    if (animate) {
      return (
        <motion.div
          ref={ref as any}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={base}
          {...(rest as any)}
        >
          {children}
        </motion.div>
      )
    }

    return (
      <div ref={ref} className={base} {...rest}>
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'
