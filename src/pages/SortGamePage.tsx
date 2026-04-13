import { useState } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Confetti from 'react-confetti'
import { procedures, type Procedure, type ProcedureStep } from '../data/procedures'
import { useWindowSize } from '../hooks/useWindowSize'

type Phase = 'select' | 'playing'

const difficultyLabel: Record<string, string> = {
  easy: 'Ľahké',
  medium: 'Stredné',
  hard: 'Ťažké',
}

const difficultyColor: Record<string, string> = {
  easy: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
  medium: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
  hard: 'text-red-400 bg-red-500/20 border-red-500/30',
}

function shuffleUntilDifferent(steps: ProcedureStep[]): ProcedureStep[] {
  if (steps.length <= 1) return [...steps]
  let shuffled: ProcedureStep[]
  let attempts = 0
  do {
    shuffled = [...steps]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    attempts++
  } while (shuffled.every((s, i) => s.id === steps[i].id) && attempts < 20)
  return shuffled
}

export function SortGamePage() {
  const navigate = useNavigate()
  const { width, height } = useWindowSize()

  const [phase, setPhase] = useState<Phase>('select')
  const [selected, setSelected] = useState<Procedure | null>(null)
  const [items, setItems] = useState<ProcedureStep[]>([])
  const [checked, setChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [solvedCount, setSolvedCount] = useState(0)

  function startGame(p: Procedure) {
    setSelected(p)
    setItems(shuffleUntilDifferent(p.steps))
    setChecked(false)
    setIsCorrect(false)
    setPhase('playing')
  }

  function handleCheck() {
    if (!selected) return
    const correct = items.every((item, i) => item.id === selected.steps[i].id)
    setIsCorrect(correct)
    setChecked(true)
    if (correct) setSolvedCount((c) => c + 1)
  }

  function handleRetry() {
    if (!selected) return
    setItems(shuffleUntilDifferent(selected.steps))
    setChecked(false)
    setIsCorrect(false)
  }

  function handleBackToSelect() {
    setPhase('select')
    setChecked(false)
    setIsCorrect(false)
  }

  function stepStatus(index: number): 'correct' | 'wrong' | 'neutral' {
    if (!checked || !selected) return 'neutral'
    return items[index].id === selected.steps[index].id ? 'correct' : 'wrong'
  }

  return (
    <div className="min-h-screen bg-surface-900 pb-28">
      {isCorrect && checked && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={220} />
      )}

      {/* Header */}
      <div className="sticky top-0 z-20 bg-surface-900/90 backdrop-blur px-4 py-3 flex items-center gap-3 border-b border-slate-800/60">
        <button
          onClick={phase === 'select' ? () => navigate('/') : handleBackToSelect}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-white font-bold text-base">Zoraď postup</h1>
          {solvedCount > 0 && (
            <p className="text-electric-400 text-xs">✓ Vyriešené: {solvedCount}</p>
          )}
        </div>
        {phase === 'playing' && selected && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${difficultyColor[selected.difficulty]}`}
          >
            {difficultyLabel[selected.difficulty]}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── SELECT SCREEN ─────────────────────────────────────── */}
        {phase === 'select' && (
          <motion.div
            key="select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="px-4 pt-5 space-y-3"
          >
            <p className="text-slate-400 text-sm">Vyber postup, ktorý chceš zoradiť:</p>
            {procedures.map((p, i) => (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => startGame(p)}
                className="w-full bg-surface-800 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4 text-left hover:border-electric-600/50 transition-colors"
              >
                <span className="text-3xl shrink-0">{p.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold">{p.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{p.steps.length} krokov</p>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${difficultyColor[p.difficulty]}`}
                  >
                    {difficultyLabel[p.difficulty]}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* ── PLAYING SCREEN ────────────────────────────────────── */}
        {phase === 'playing' && selected && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="px-4 pt-5"
          >
            {/* Procedure title */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">{selected.icon}</span>
              <div>
                <h2 className="text-white font-bold leading-tight">{selected.title}</h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  {checked ? 'Výsledok' : 'Potiahni kroky do správneho poradia'}
                </p>
              </div>
            </div>

            {/* Drag list */}
            <Reorder.Group
              axis="y"
              values={items}
              onReorder={checked ? () => {} : setItems}
              className="space-y-2"
            >
              {items.map((step, i) => {
                const status = stepStatus(i)
                return (
                  <Reorder.Item
                    key={step.id}
                    value={step}
                    style={{ touchAction: 'none' }}
                    className={`rounded-xl border p-3.5 flex items-center gap-3 select-none transition-colors
                      ${!checked ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}
                      ${
                        status === 'correct'
                          ? 'bg-emerald-900/30 border-emerald-500/50'
                          : status === 'wrong'
                            ? 'bg-red-900/30 border-red-500/50'
                            : 'bg-surface-800 border-slate-700/50'
                      }`}
                  >
                    {/* Step number badge */}
                    <span
                      className={`text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shrink-0
                        ${
                          status === 'correct'
                            ? 'bg-emerald-500/30 text-emerald-400'
                            : status === 'wrong'
                              ? 'bg-red-500/30 text-red-400'
                              : 'bg-slate-700 text-slate-400'
                        }`}
                    >
                      {i + 1}
                    </span>

                    <p className="text-sm text-slate-200 flex-1 leading-snug">{step.text}</p>

                    {/* Trailing indicator */}
                    {status === 'correct' && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {status === 'wrong' && (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    {status === 'neutral' && (
                      <div className="flex flex-col gap-0.5 shrink-0 opacity-30">
                        <div className="w-4 h-0.5 bg-slate-400 rounded" />
                        <div className="w-4 h-0.5 bg-slate-400 rounded" />
                        <div className="w-4 h-0.5 bg-slate-400 rounded" />
                      </div>
                    )}
                  </Reorder.Item>
                )
              })}
            </Reorder.Group>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              {!checked && (
                <button
                  onClick={handleCheck}
                  className="w-full bg-electric-600 hover:bg-electric-500 text-white font-bold py-3.5 rounded-2xl transition-colors"
                >
                  Skontrolovať poradie
                </button>
              )}

              {checked && isCorrect && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-3"
                >
                  <div className="bg-emerald-900/30 border border-emerald-500/40 rounded-2xl p-4 text-center">
                    <p className="text-3xl mb-1">🎉</p>
                    <p className="text-emerald-400 font-bold text-lg">Správne poradie!</p>
                    <p className="text-slate-400 text-sm mt-1">
                      Výborne, zvládol si postup perfektne.
                    </p>
                  </div>
                  <button
                    onClick={handleBackToSelect}
                    className="w-full bg-electric-600 hover:bg-electric-500 text-white font-bold py-3.5 rounded-2xl transition-colors"
                  >
                    Ďalší postup
                  </button>
                </motion.div>
              )}

              {checked && !isCorrect && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-3"
                >
                  <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-4 text-center">
                    <p className="text-3xl mb-1">🔄</p>
                    <p className="text-red-400 font-bold text-lg">Nie celkom správne</p>
                    <p className="text-slate-400 text-sm mt-1">
                      Červené kroky sú na nesprávnom mieste. Skús znova.
                    </p>
                  </div>
                  <button
                    onClick={handleRetry}
                    className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold py-3.5 rounded-2xl transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Skúsiť znova
                  </button>
                  <button
                    onClick={handleBackToSelect}
                    className="w-full text-slate-400 text-sm py-2"
                  >
                    Vybrať iný postup
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
