import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, BookOpen, Zap, Flame } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { topics as allTopics } from '../data/topics'
import { getLessonsByTopic } from '../data/lessons'

export function HomePage() {
  const navigate = useNavigate()
  const { state } = useApp()
  const { user, progress } = state

  // Find the first incomplete lesson across topics
  function getNextLesson() {
    for (const topic of allTopics) {
      const lessons = getLessonsByTopic(topic.id)
      const next = lessons.find((l) => !state.completedLessons.includes(l.id))
      if (next) return { lesson: next, topic }
    }
    return null
  }

  const nextLesson = getNextLesson()

  return (
    <div className="space-y-6 py-4">
      {/* Header greeting */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-400 text-sm">Vitaj späť,</p>
          <h1 className="text-2xl font-black text-white">{user.name} {user.avatarEmoji}</h1>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full">
          <Flame className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400 font-bold text-sm">{user.streak}-dňová séria</span>
        </div>
      </div>

      {/* Continue learning */}
      {nextLesson && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate(`/lesson/${nextLesson.lesson.id}`)}
          className="w-full bg-electric-600 hover:bg-electric-500 rounded-2xl p-4 flex items-center gap-4 shadow-lg shadow-electric-900/50 text-left"
        >
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-2xl shrink-0">
            {nextLesson.topic.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-electric-200 text-xs font-medium uppercase tracking-wide">Pokračovať v učení</p>
            <p className="text-white font-bold truncate">{nextLesson.lesson.title}</p>
            <p className="text-electric-300 text-xs mt-0.5">{nextLesson.topic.title}</p>
          </div>
          <div className="flex items-center gap-1 bg-amber-400/20 rounded-full px-2.5 py-1 shrink-0">
            <Zap className="w-3 h-3 text-amber-400" />
            <span className="text-amber-400 text-xs font-bold">+{nextLesson.lesson.xpReward}</span>
          </div>
        </motion.button>
      )}

      {/* Topics grid */}
      <div>
        <h2 className="text-slate-300 text-sm font-semibold uppercase tracking-wider mb-3">Témy kurzu</h2>
        <div className="space-y-3">
          {allTopics.map((topic, index) => {
            const topicProgress = progress[topic.id]
            const lessons = getLessonsByTopic(topic.id)
            const completedCount = topicProgress?.completedLessonIds.length ?? 0
            const percent = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  onClick={() => navigate(`/topic/${topic.id}`)}
                  className="w-full text-left rounded-2xl border p-4 flex items-center gap-4 transition-all bg-surface-800 border-slate-700/50 hover:border-electric-700/60 hover:bg-surface-700"
                >
                  {/* Icon circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br ${topic.color}`}
                  >
                    {topic.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white text-sm">{topic.title}</p>
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5 truncate">{topic.subtitle}</p>

                    {/* Progress */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-volt-500 rounded-full transition-all duration-700"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 shrink-0">
                        {completedCount}/{lessons.length}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 shrink-0 text-slate-500" />
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Celkové XP', value: user.xp.toLocaleString(), icon: '⚡', color: 'amber' },
          { label: 'Lekcie', value: state.completedLessons.length.toString(), icon: '📚', color: 'blue' },
          { label: 'Úroveň', value: user.level.toString(), icon: '🏆', color: 'purple' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-surface-800 border border-slate-700/50 rounded-2xl p-3 text-center"
          >
            <div className="text-xl mb-1">{stat.icon}</div>
            <p className="text-lg font-black text-white">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
