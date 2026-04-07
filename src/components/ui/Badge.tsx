import { type HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'premium' | 'xp' | 'streak'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: 'sm' | 'md' | 'lg'
  icon?: string
}

const variants: Record<BadgeVariant, string> = {
  default:  'bg-slate-700/80 text-slate-300 border border-slate-600/50',
  success:  'bg-volt-500/20 text-volt-400 border border-volt-500/30',
  warning:  'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  danger:   'bg-red-500/20 text-red-400 border border-red-500/30',
  info:     'bg-electric-500/20 text-electric-400 border border-electric-500/30',
  premium:  'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/40',
  xp:       'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  streak:   'bg-orange-500/20 text-orange-400 border border-orange-500/30',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-1 text-xs gap-1.5',
  lg: 'px-3 py-1.5 text-sm gap-1.5',
}

export function Badge({
  variant = 'default',
  size = 'md',
  icon,
  className = '',
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {icon && <span>{icon}</span>}
      {children}
    </span>
  )
}

/** Animated XP gain badge that pops */
export function XPBadge({ amount }: { amount: number }) {
  return (
    <Badge variant="xp" size="md" icon="⚡">
      +{amount} XP
    </Badge>
  )
}

/** Gem/coin display */
export function GemBadge({ count }: { count: number }) {
  return (
    <Badge variant="warning" size="md" icon="💎">
      {count}
    </Badge>
  )
}

/** Streak badge */
export function StreakBadge({ count }: { count: number }) {
  return (
    <Badge variant="streak" size="md" icon="🔥">
      {count}
    </Badge>
  )
}
