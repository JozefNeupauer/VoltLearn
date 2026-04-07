import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getTopicById } from '../data/topics'
import { getLessonsByTopic } from '../data/lessons'
import { LessonCard } from '../components/lesson/LessonCard'

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const navigate = useNavigate()
  const { state, isTopicLocked, isLessonCompleted } = useApp()

  const topic = getTopicById(topicId ?? '')
  if (!topic) {
    return (
      <div className="py-16 text-center text-slate-400">
        Téma nenájdená.{' '}
        <button onClick={() => navigate('/')} className="text-electric-400 underline">
          Domóv
        </button>
      </div>
    )
  }

  const locked = isTopicLocked(topic.id)
  const lessons = getLessonsByTopic(topic.id)
  const topicProgress = state.progress[topic.id]
  const completedCount = topicProgress?.completedLessonIds.length ?? 0
  const percent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0

  return (
    <div className="space-y-6 py-2">
      {/* Back */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Späť na kurzy
      </button>

      {/* Topic header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl bg-gradient-to-br ${topic.color} p-6 text-white relative overflow-hidden`}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 text-8xl opacity-10 -mt-4 -mr-4 pointer-events-none select-none">
          {topic.icon}
        </div>

        <div className="flex items-start gap-4">
          <div className="text-4xl shrink-0">{topic.icon}</div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-black">{topic.title}</h1>
              {topic.isPremium && (
                <span className="text-xs font-bold text-amber-300 bg-amber-400/20 border border-amber-300/40 px-2 py-0.5 rounded-full">
                  PREMIUM
                </span>
              )}
            </div>
            <p className="text-white/80 text-sm mt-1">{topic.subtitle}</p>

            {!locked && (
              <div className="mt-3 space-y-1">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Postup</span>
                  <span>{completedCount}/{lessons.length} lekcií</span>
                </div>
                <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/70 rounded-full transition-all duration-700"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Locked overlay message */}
      {locked && (
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
          <Lock className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <p className="text-amber-300 font-semibold text-sm">Prémiová téma</p>
            <p className="text-amber-400/70 text-xs mt-0.5">
              Upgraduj na Prémium a odomkni všetky lekcie v tejto téme.
            </p>
          </div>
          <button
            onClick={() => navigate('/premium')}
            className="ml-auto bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs px-3 py-1.5 rounded-lg shrink-0"
          >
            Upgradať
          </button>
        </div>
      )}

      {/* Lesson list */}
      <div className="space-y-2">
        {lessons.map((lesson, index) => {
          const completed = isLessonCompleted(lesson.id)
          const isPreviousCompleted = index === 0 || isLessonCompleted(lessons[index - 1].id)
          const isAvailable = !locked && (index === 0 || isPreviousCompleted)
          const isCurrent = !locked && !completed && isPreviousCompleted

          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={completed}
              isLocked={!isAvailable}
              isCurrent={isCurrent}
              onClick={() => {
                if (isAvailable) navigate(`/lesson/${lesson.id}`)
              }}
              index={index}
            />
          )
        })}
      </div>
    </div>
  )
}
