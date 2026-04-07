import { motion } from 'framer-motion'
import { Lock, CheckCircle, ArrowRight, Star } from 'lucide-react'
import type { Lesson } from '../../types'
import { ProgressBar } from '../ui/ProgressBar'

interface LessonCardProps {
  lesson: Lesson
  isCompleted: boolean
  isLocked: boolean
  isCurrent: boolean
  onClick: () => void
  index: number
}

export function LessonCard({
  lesson,
  isCompleted,
  isLocked,
  isCurrent,
  onClick,
  index,
}: LessonCardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      whileTap={{ scale: isLocked ? 1 : 0.97 }}
      onClick={onClick}
      disabled={isLocked}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
        isLocked
          ? 'bg-surface-850/40 border-slate-800/60 opacity-60 cursor-not-allowed'
          : isCurrent
          ? 'bg-electric-800/30 border-electric-500/60 hover:border-electric-400 cursor-pointer animate-pulse-glow'
          : isCompleted
          ? 'bg-volt-900/20 border-volt-700/40 hover:border-volt-500/60 cursor-pointer'
          : 'bg-surface-800 border-slate-700/60 hover:border-slate-500 cursor-pointer'
      }`}
    >
      {/* Status icon */}
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl ${
          isLocked
            ? 'bg-slate-800 border-2 border-slate-700'
            : isCurrent
            ? 'bg-electric-500/20 border-2 border-electric-500'
            : isCompleted
            ? 'bg-volt-500/20 border-2 border-volt-500'
            : 'bg-surface-800 border-2 border-slate-600'
        }`}
      >
        {isLocked ? (
          <Lock className="w-5 h-5 text-slate-500" />
        ) : isCompleted ? (
          <CheckCircle className="w-6 h-6 text-volt-400" />
        ) : isCurrent ? (
          <Star className="w-6 h-6 text-electric-400" />
        ) : (
          <span className="font-bold text-sm text-slate-400">{lesson.order}</span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className={`font-semibold text-sm truncate ${
            isLocked ? 'text-slate-500' : 'text-slate-100'
          }`}>
            {lesson.title}
          </h3>
          {isCurrent && !isCompleted && (
            <span className="flex-shrink-0 text-[10px] bg-electric-500/20 text-electric-400 border border-electric-500/40 rounded-full px-2 py-0.5 font-bold">
              ŠTART
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-0.5 truncate">{lesson.subtitle}</p>

        {/* XP reward */}
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs text-amber-400 font-medium">⚡ {lesson.xpReward} XP</span>
          <span className="text-xs text-slate-600">•</span>
          <span className="text-xs text-slate-500">{lesson.questions.length} otázok</span>
        </div>
      </div>

      {/* Arrow / lock */}
      {!isLocked && (
        <ArrowRight className={`w-4 h-4 flex-shrink-0 ${
          isCompleted ? 'text-volt-500' : isCurrent ? 'text-electric-400' : 'text-slate-600'
        }`} />
      )}
    </motion.button>
  )
}
