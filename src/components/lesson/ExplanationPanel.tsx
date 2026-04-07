import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import type { Lesson } from '../../types'
import { DiagramByType } from '../diagrams/ElectricalDiagrams'
import { Card } from '../ui/Card'

interface Props {
  lesson: Lesson
  onStartQuiz: () => void
}

/** Simple markdown-like renderer for bold, inline code, and line breaks */
function RichText({ text }: { text: string }) {
  return (
    <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
      {text.split('\n\n').map((para, pi) => {
        if (para.startsWith('# ')) {
          return (
            <h2 key={pi} className="text-2xl font-black text-white font-mono">
              {para.slice(2)}
            </h2>
          )
        }
        if (para.startsWith('---')) {
          return <hr key={pi} className="border-slate-700" />
        }

        // Inline **bold** and `code`
        const rendered = para
          .split(/(\*\*[^*]+\*\*|`[^`]+`)/)
          .map((seg, si) => {
            if (seg.startsWith('**') && seg.endsWith('**'))
              return <strong key={si} className="text-slate-100 font-semibold">{seg.slice(2, -2)}</strong>
            if (seg.startsWith('`') && seg.endsWith('`'))
              return <code key={si} className="text-electric-300 bg-electric-900/40 rounded px-1 text-xs font-mono">{seg.slice(1, -1)}</code>
            return <span key={si}>{seg}</span>
          })

        return <p key={pi}>{rendered}</p>
      })}
    </div>
  )
}

export function ExplanationPanel({ lesson, onStartQuiz }: Props) {
  const [diagramVisible, setDiagramVisible] = useState(false)

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Lesson header */}
      <div>
        <p className="text-xs font-semibold text-electric-400 uppercase tracking-widest mb-1">
          Lekcia {lesson.order}
        </p>
        <h1 className="text-2xl font-black text-white mb-1">{lesson.title}</h1>
        <p className="text-slate-400 text-sm">{lesson.subtitle}</p>
      </div>

      {/* Explanation text */}
      <Card variant="glass" padding="md">
        <RichText text={lesson.explanation} />
      </Card>

      {/* Diagram */}
      {lesson.diagramType && (
        <div>
          <button
            onClick={() => setDiagramVisible(!diagramVisible)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-sm text-slate-300 font-medium transition-colors"
          >
            <span>📊 Zobraziť diagram</span>
            <motion.div animate={{ rotate: diagramVisible ? 90 : 0 }}>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </motion.div>
          </button>
          {diagramVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 bg-slate-800/50 border border-slate-700/60 rounded-2xl p-4 overflow-hidden"
            >
              <DiagramByType type={lesson.diagramType} />
            </motion.div>
          )}
        </div>
      )}

      {/* Key points */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Kľúčové body</h3>
        <div className="grid grid-cols-1 gap-2">
          {lesson.keyPoints.map((kp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700/40 rounded-xl"
            >
              <span className="text-xl flex-shrink-0">{kp.icon}</span>
              <span className="text-sm text-slate-200">{kp.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onStartQuiz}
        className="w-full py-4 bg-electric-600 hover:bg-electric-500 text-white font-bold rounded-2xl text-base transition-all shadow-lg shadow-electric-900/50 flex items-center justify-center gap-2 group"
      >
        Spustiť kvíz
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  )
}
