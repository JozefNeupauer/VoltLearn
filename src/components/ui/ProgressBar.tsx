import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number        // 0–100
  max?: number
  label?: string
  showPercent?: boolean
  color?: 'blue' | 'green' | 'amber' | 'red' | 'purple'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

const colors = {
  blue:   'from-electric-500 to-electric-400',
  green:  'from-volt-500 to-volt-400',
  amber:  'from-amber-500 to-amber-400',
  red:    'from-red-500 to-red-400',
  purple: 'from-violet-500 to-violet-400',
}

const heights = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = false,
  color = 'blue',
  size = 'md',
  animated = true,
  className = '',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div className={className}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-slate-400 font-medium">{label}</span>}
          {showPercent && (
            <span className="text-xs text-slate-400 font-medium">{Math.round(pct)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-slate-700/60 rounded-full overflow-hidden ${heights[size]}`}>
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colors[color]}`}
          initial={animated ? { width: 0 } : false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
