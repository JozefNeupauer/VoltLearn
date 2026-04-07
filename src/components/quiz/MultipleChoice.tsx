import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'
import type { MultipleChoiceQuestion } from '../../types'

interface Props {
  question: MultipleChoiceQuestion
  onAnswer: (isCorrect: boolean) => void
  disabled?: boolean
}

export function MultipleChoice({ question, onAnswer, disabled = false }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (i: number) => {
    if (submitted || disabled) return
    setSelected(i)
  }

  const handleSubmit = () => {
    if (selected === null || submitted) return
    setSubmitted(true)
    onAnswer(selected === question.correctIndex)
  }

  const getOptionStyle = (i: number) => {
    if (!submitted) {
      return selected === i
        ? 'border-electric-500 bg-electric-500/20 text-white'
        : 'border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-700/50 cursor-pointer'
    }
    if (i === question.correctIndex)
      return 'border-volt-500 bg-volt-500/20 text-white'
    if (i === selected && selected !== question.correctIndex)
      return 'border-red-500 bg-red-500/20 text-white'
    return 'border-slate-700 text-slate-400 opacity-50'
  }

  return (
    <div className="space-y-3">
      <p className="text-lg font-semibold text-slate-100 leading-relaxed">
        {question.question}
      </p>

      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <motion.button
            key={i}
            whileTap={{ scale: submitted ? 1 : 0.98 }}
            onClick={() => handleSelect(i)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${getOptionStyle(i)}`}
          >
            {/* Letter indicator */}
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-700/70 flex items-center justify-center text-xs font-bold text-slate-300">
              {String.fromCharCode(65 + i)}
            </span>
            <span className="flex-1 text-sm font-medium">{opt}</span>
            {/* Result icon */}
            {submitted && i === question.correctIndex && (
              <CheckCircle className="w-5 h-5 text-volt-400 flex-shrink-0" />
            )}
            {submitted && i === selected && selected !== question.correctIndex && (
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Submit button (only before submission) */}
      {!submitted && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={selected === null}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 mt-2 ${
            selected !== null
              ? 'bg-electric-600 hover:bg-electric-500 text-white shadow-lg shadow-electric-900/50'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          Skontrolovať odpoveď
        </motion.button>
      )}
    </div>
  )
}
