import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb } from 'lucide-react'
import type { FillBlankQuestion } from '../../types'

interface Props {
  question: FillBlankQuestion
  onAnswer: (isCorrect: boolean) => void
  disabled?: boolean
}

export function FillInBlank({ question, onAnswer, disabled = false }: Props) {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isCorrect =
    submitted &&
    value.trim().toLowerCase() === question.answer.toLowerCase()

  // Render the question with the blank highlighted
  const parts = question.question.split('___')

  const handleSubmit = () => {
    if (!value.trim() || submitted || disabled) return
    setSubmitted(true)
    onAnswer(value.trim().toLowerCase() === question.answer.toLowerCase())
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="space-y-4">
      {/* Question with inline blank */}
      <div className="text-lg font-semibold text-slate-100 leading-relaxed flex flex-wrap items-center gap-1">
        {parts.map((part, i) => (
          <span key={i} className="inline-flex items-center gap-1">
            <span>{part}</span>
            {i < parts.length - 1 && (
              <span
                className={`inline-block min-w-[80px] text-center border-b-2 px-2 font-bold ${
                  !submitted
                    ? 'border-electric-400 text-electric-300'
                    : isCorrect
                    ? 'border-volt-400 text-volt-300'
                    : 'border-red-400 text-red-300'
                }`}
              >
                {submitted ? (
                  isCorrect ? value : (
                    <>
                      <span className="line-through opacity-50">{value}</span>
                      {' '}
                      <span className="text-volt-400">{question.answer}</span>
                    </>
                  )
                ) : value || <span className="opacity-0">____</span>}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Input field */}
      {!submitted && (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          disabled={disabled}
          placeholder="Napíš svoju odpoveď…"
          autoComplete="off"
          spellCheck={false}
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border-2 border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-electric-500 transition-colors text-sm"
        />
      )}

      {/* Hint */}
      {question.hint && !submitted && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          {showHint ? 'Skryť nápovedu' : 'Zobraziť nápovedu'}
        </button>
      )}
      {showHint && question.hint && !submitted && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2"
        >
          💡 {question.hint}
        </motion.div>
      )}

      {/* Submit */}
      {!submitted && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={!value.trim()}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
            value.trim()
              ? 'bg-electric-600 hover:bg-electric-500 text-white shadow-lg shadow-electric-900/50'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          Skontrolovať odpoveď
        </motion.button>
      )}

      {/* Result indicator when submitted */}
      {submitted && (
        <div className={`rounded-xl px-4 py-3 text-sm font-medium ${
          isCorrect
            ? 'bg-volt-500/15 border border-volt-500/30 text-volt-300'
            : 'bg-red-500/15 border border-red-500/30 text-red-300'
        }`}>
          {isCorrect ? '✅ Správne!' : `❌ Správna odpoveď je: "${question.answer}"`}
        </div>
      )}
    </div>
  )
}
