import { motion, AnimatePresence } from 'framer-motion'
import type { Question } from '../../types'
import { MultipleChoice } from './MultipleChoice'
import { TrueFalse } from './TrueFalse'
import { FillInBlank } from './FillInBlank'
import { CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'

interface Props {
  question: Question
  questionNumber: number
  totalQuestions: number
  onCorrect: () => void
  onIncorrect: () => void
  onNext: () => void
  showFeedback: boolean
  isCorrect: boolean | null
  disabled?: boolean
}

export function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  onCorrect,
  onIncorrect,
  onNext,
  showFeedback,
  isCorrect,
  disabled,
}: Props) {
  const handleAnswer = (correct: boolean) => {
    if (correct) onCorrect()
    else onIncorrect()
  }

  const renderQuestion = () => {
    switch (question.type) {
      case 'multiple_choice':
        return <MultipleChoice question={question} onAnswer={handleAnswer} disabled={showFeedback || disabled} />
      case 'true_false':
        return <TrueFalse question={question} onAnswer={handleAnswer} disabled={showFeedback || disabled} />
      case 'fill_blank':
        return <FillInBlank question={question} onAnswer={handleAnswer} disabled={showFeedback || disabled} />
      default:
        return <div className="text-slate-400">Question type not supported</div>
    }
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-4"
    >
      {/* Question counter */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium uppercase tracking-wider">
          Otázka {questionNumber} z {totalQuestions}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full transition-colors ${
                i < questionNumber - 1
                  ? 'bg-volt-500'
                  : i === questionNumber - 1
                  ? 'bg-electric-500'
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* The question itself */}
      {renderQuestion()}

      {/* Feedback panel */}
      <AnimatePresence>
        {showFeedback && isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl p-4 border ${
              isCorrect
                ? 'bg-volt-500/10 border-volt-500/40'
                : 'bg-red-500/10 border-red-500/40'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-volt-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 flex-1">
                <p className={`font-semibold text-sm ${isCorrect ? 'text-volt-300' : 'text-red-300'}`}>
                  {isCorrect ? 'Správne! 🎉' : 'Nie celkom správne'}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className={`mt-3 w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 ${
                isCorrect
                  ? 'bg-volt-600 hover:bg-volt-500 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              Pokračovať
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
