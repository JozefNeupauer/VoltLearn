import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'
import type { TrueFalseQuestion } from '../../types'

interface Props {
  question: TrueFalseQuestion
  onAnswer: (isCorrect: boolean) => void
  disabled?: boolean
}

export function TrueFalse({ question, onAnswer, disabled = false }: Props) {
  const [selected, setSelected] = useState<boolean | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (val: boolean) => {
    if (submitted || disabled) return
    setSelected(val)
  }

  const handleSubmit = () => {
    if (selected === null || submitted) return
    setSubmitted(true)
    onAnswer(selected === question.correct)
  }

  const getBtnStyle = (val: boolean) => {
    if (!submitted) {
      return selected === val
        ? `border-electric-500 bg-electric-500/20 text-white scale-105`
        : `border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-700/50 cursor-pointer`
    }
    if (val === question.correct)   return 'border-volt-500 bg-volt-500/20 text-white'
    if (val === selected)           return 'border-red-500 bg-red-500/20 text-white'
    return 'border-slate-700 text-slate-400 opacity-40'
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold text-slate-100 leading-relaxed">
        {question.question}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {([true, false] as const).map((val) => (
          <motion.button
            key={String(val)}
            whileTap={{ scale: submitted ? 1 : 0.95 }}
            onClick={() => handleSelect(val)}
            className={`flex flex-col items-center gap-2 py-6 rounded-2xl border-2 transition-all duration-200 ${getBtnStyle(val)}`}
          >
            <span className="text-3xl">{val ? '✅' : '❌'}</span>
            <span className="text-sm font-bold tracking-wide uppercase">
              {val ? 'Pravda' : 'Nepravda'}
            </span>
            {submitted && val === question.correct && (
              <CheckCircle className="w-5 h-5 text-volt-400" />
            )}
            {submitted && val === selected && selected !== question.correct && (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
          </motion.button>
        ))}
      </div>

      {!submitted && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={selected === null}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
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
