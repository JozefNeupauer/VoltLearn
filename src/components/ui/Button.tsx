import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { motion } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'outline' | 'premium'
type Size = 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  iconRight?: React.ReactNode
}

const variants: Record<Variant, string> = {
  primary:  'bg-electric-600 hover:bg-electric-500 text-white shadow-lg shadow-electric-900/50 border border-electric-500',
  secondary:'bg-surface-800 hover:bg-surface-700 text-slate-100 border border-slate-700 dark:border-slate-600',
  success:  'bg-volt-600 hover:bg-volt-500 text-white shadow-lg shadow-volt-900/50 border border-volt-500',
  danger:   'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/50 border border-red-500',
  ghost:    'text-slate-300 hover:bg-slate-700/50 hover:text-white border border-transparent',
  outline:  'border-2 border-electric-500 text-electric-400 hover:bg-electric-500/10',
  premium:  'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-amber-900/50 border border-amber-400',
}

const sizes: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2',
  xl: 'px-8 py-4 text-lg rounded-2xl gap-3 font-semibold',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      icon,
      iconRight,
      className = '',
      children,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: isDisabled ? 1 : 0.96 }}
        whileHover={{ scale: isDisabled ? 1 : 1.02 }}
        transition={{ duration: 0.1 }}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center font-medium transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-electric-400 focus:ring-offset-2 focus:ring-offset-surface-900',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          fullWidth ? 'w-full' : '',
          className,
        ].join(' ')}
        {...(rest as any)}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
          </svg>
        ) : icon}
        {children}
        {iconRight}
      </motion.button>
    )
  },
)

Button.displayName = 'Button'
