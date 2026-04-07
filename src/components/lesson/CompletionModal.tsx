import { useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import { useWindowSize } from '../../hooks/useWindowSize'
import { Star, Zap, ArrowRight, Home } from 'lucide-react'
import type { Lesson } from '../../types'

interface Props {
  lesson: Lesson
  xpEarned: number
  correctCount: number
  totalCount: number
  onContinue: () => void
  onRetry: () => void
}

export function CompletionModal({ lesson, xpEarned, correctCount, totalCount, onContinue, onRetry }: Props) {
  const { width, height } = useWindowSize()
  const scorePercent = Math.round((correctCount / totalCount) * 100)
  const isPerfect = correctCount === totalCount

  const grade =
    scorePercent === 100 ? { label: 'Perfektné!', color: 'text-amber-400', icon: '🏆' } :
    scorePercent >= 80  ? { label: 'Skvelá práca!', color: 'text-volt-400', icon: '⭐' } :
    scorePercent >= 60  ? { label: 'Dobrá snaha!', color: 'text-electric-400', icon: '👍' } :
                          { label: 'Cvič ďalej!', color: 'text-slate-300', icon: '💪' }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {isPerfect && (
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={false}
          gravity={0.4}
          colors={['#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ef4444']}
        />
      )}

      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className="relative w-full max-w-md bg-surface-800 rounded-t-3xl sm:rounded-3xl border border-slate-700/60 p-6 sm:p-8 space-y-6 text-center"
      >
        {/* Grade icon */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
          className="text-6xl"
        >
          {grade.icon}
        </motion.div>

        {/* Grade text */}
        <div>
          <h2 className={`text-2xl font-black ${grade.color}`}>{grade.label}</h2>
          <p className="text-slate-400 text-sm mt-1">
            {lesson.title} dokončená
          </p>
        </div>

        {/* Score & XP */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700/60">
            <p className="text-2xl font-black text-white">{scorePercent}%</p>
            <p className="text-xs text-slate-400 mt-0.5">Skóre</p>
          </div>
          <div className="bg-amber-500/10 rounded-2xl p-3 border border-amber-500/30">
            <div className="flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <p className="text-2xl font-black text-amber-400">{xpEarned}</p>
            </div>
            <p className="text-xs text-amber-500/80 mt-0.5">Získané XP</p>
          </div>
          <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700/60">
            <p className="text-2xl font-black text-volt-400">{correctCount}/{totalCount}</p>
            <p className="text-xs text-slate-400 mt-0.5">Správne</p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-2">
          {[1, 2, 3].map((star) => (
            <motion.div
              key={star}
              initial={{ scale: 0, rotate: 20 }}
              animate={{ scale: scorePercent >= star * 33 ? 1 : 0.5, rotate: 0 }}
              transition={{ delay: 0.3 + star * 0.1, type: 'spring' }}
            >
              <Star
                className={`w-8 h-8 ${
                  scorePercent >= star * 33
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-600 fill-slate-700'
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {scorePercent < 80 && (
            <button
              onClick={onRetry}
              className="flex-1 py-3 rounded-xl border-2 border-slate-600 text-slate-300 hover:bg-slate-700 font-semibold text-sm transition-colors"
            >
              Skúsiť znova
            </button>
          )}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onContinue}
            className="flex-1 py-3 bg-electric-600 hover:bg-electric-500 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-electric-900/50"
          >
            Pokračovať
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
