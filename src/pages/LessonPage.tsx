import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useSound } from '../hooks/useSound'
import { getLessonById } from '../data/lessons'
import { ExplanationPanel } from '../components/lesson/ExplanationPanel'
import { QuizCard } from '../components/quiz/QuizCard'
import { CompletionModal } from '../components/lesson/CompletionModal'

type Phase = 'explanation' | 'quiz' | 'completed'

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const navigate = useNavigate()
  const { state, completeLesson, spendHeart, checkAchievements } = useApp()
  const { play } = useSound(state.settings.soundEnabled)

  const lesson = getLessonById(lessonId ?? '')
  const [phase, setPhase] = useState<Phase>('explanation')
  const [currentQ, setCurrentQ] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [xpEarned, setXpEarned] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showExitConfirm, setShowExitConfirm] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  if (!lesson) {
    return (
      <div className="min-h-screen bg-surface-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-400">Lekcia nenájdená</p>
          <button onClick={() => navigate('/')} className="mt-4 text-electric-400 underline">Domov</button>
        </div>
      </div>
    )
  }

  const l = lesson  // narrowed ref (lesson is defined beyond early return above)
  const questions = l.questions
  const hearts = state.user.hearts
  const progressPct = ((currentQ) / questions.length) * 100

  function handleStartQuiz() {
    setPhase('quiz')
    setCurrentQ(0)
    setCorrectCount(0)
    window.scrollTo(0, 0)
  }

  function handleCorrect() {
    play('correct')
    setIsCorrect(true)
    setCorrectCount((c) => c + 1)
    setShowFeedback(true)
  }

  function handleIncorrect() {
    play('incorrect')
    setIsCorrect(false)
    setShowFeedback(true)
    spendHeart()
  }

  function handleNext() {
    setShowFeedback(false)
    setIsCorrect(null)
    const nextIndex = currentQ + 1
    if (nextIndex >= questions.length) {
      const total = questions.length
      const finalCorrect = isCorrect ? correctCount + 1 : correctCount
      const earned = Math.round(l.xpReward * (finalCorrect / total))
      setXpEarned(earned)
      completeLesson(l.id, l.topicId, earned, finalCorrect, total)
      checkAchievements()
      play('complete')
      setPhase('completed')
    } else {
      setCurrentQ(nextIndex)
    }
    window.scrollTo(0, 0)
  }

  function handleContinue() { navigate(`/topic/${l.topicId}`) }

  function handleRetry() {
    setPhase('quiz')
    setCurrentQ(0)
    setCorrectCount(0)
    setXpEarned(0)
    setShowFeedback(false)
    setIsCorrect(null)
    window.scrollTo(0, 0)
  }

  function handleBack() {
    if (phase === 'explanation') navigate(-1)
    else setShowExitConfirm(true)
  }

  return (
    <div className="min-h-screen bg-surface-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-surface-900/95 backdrop-blur-md border-b border-slate-800/60 px-4 py-3 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {phase === 'quiz' ? (
          <div className="flex-1 mx-4 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-electric-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        ) : (
          <span className="text-sm font-semibold text-slate-300 truncate flex-1 mx-3 text-center">
            {l.title}
          </span>
        )}

        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Heart key={i} className={`w-4 h-4 ${i < hearts ? 'text-red-500 fill-red-500' : 'text-slate-700'}`} />
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4 pb-8">
        <AnimatePresence mode="wait">
          {phase === 'explanation' && (
            <motion.div
              key="explanation"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <ExplanationPanel lesson={lesson} onStartQuiz={handleStartQuiz} />
            </motion.div>
          )}

          {phase === 'quiz' && (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
            >
              <QuizCard
                question={questions[currentQ]}
                questionNumber={currentQ + 1}
                totalQuestions={questions.length}
                onCorrect={handleCorrect}
                onIncorrect={handleIncorrect}
                onNext={handleNext}
                showFeedback={showFeedback}
                isCorrect={isCorrect}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Completion modal */}
      <AnimatePresence>
        {phase === 'completed' && (
          <CompletionModal
            lesson={lesson}
            xpEarned={xpEarned}
            correctCount={correctCount}
            totalCount={questions.length}
            onContinue={handleContinue}
            onRetry={handleRetry}
          />
        )}
      </AnimatePresence>

      {/* Exit confirm */}
      <AnimatePresence>
        {showExitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowExitConfirm(false)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-surface-800 rounded-2xl border border-slate-700/60 p-6 max-w-sm w-full space-y-4 text-center"
            >
              <div className="text-3xl">⚠️</div>
              <h3 className="text-lg font-bold text-white">Opustiť lekciu?</h3>
              <p className="text-slate-400 text-sm">Tvoj pokrok v kvíze bude stratený.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 font-semibold text-sm"
                >
                  Zostať
                </button>
                <button
                  onClick={() => navigate(`/topic/${l.topicId}`)}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm"
                >
                  Opustiť
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
