import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Zap, Flame, BookOpen, Shield, Star, Trophy, Lock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { achievements } from '../data/achievements'
import { ProgressBar } from '../components/ui/ProgressBar'

export function ProfilePage() {
  const navigate = useNavigate()
  const { state } = useApp()
  const { user, unlockedAchievements, completedLessons } = state

  const unlockedIds = new Set(unlockedAchievements.map((a) => a.id))

  const levelPercent = Math.round((user.xp / user.xpToNextLevel) * 100)

  const stats = [
    { label: 'Lekcie', value: completedLessons.length, icon: BookOpen, color: 'text-electric-400' },
    { label: 'Séria dní', value: user.streak, icon: Flame, color: 'text-amber-400' },
    { label: 'Najdlhšia séria', value: user.longestStreak, icon: Shield, color: 'text-volt-400' },
    { label: 'Drahokamy', value: user.gems, icon: Star, color: 'text-purple-400' },
  ]

  return (
    <div className="space-y-6 py-4">
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-800 border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center text-center gap-3"
      >
        {/* Avatar */}
        <div className="w-20 h-20 bg-electric-600/20 border-2 border-electric-500 rounded-2xl flex items-center justify-center text-4xl">
          {user.avatarEmoji}
        </div>

        <div>
          <h1 className="text-xl font-black text-white">{user.name}</h1>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-xs font-semibold text-electric-400 bg-electric-600/20 border border-electric-600/30 px-2 py-0.5 rounded-full">
              Úroveň {user.level}
            </span>
            {user.plan !== 'free' && (
              <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full capitalize">
                {user.plan}
              </span>
            )}
          </div>
        </div>

        {/* XP progress */}
        <div className="w-full space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>{user.xp} XP</span>
            </div>
            <span>{user.xpToNextLevel} XP na úroveň {user.level + 1}</span>
          </div>
          <ProgressBar value={user.xp} max={user.xpToNextLevel} color="blue" size="sm" animated />
        </div>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface-800 border border-slate-700/50 rounded-2xl p-4"
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <p className="text-2xl font-black text-white">{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-slate-300 text-sm font-semibold uppercase tracking-wider">Úspechy</h2>
          <span className="text-xs text-slate-500">
            {unlockedIds.size}/{achievements.length} získaných
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, i) => {
            const unlocked = unlockedIds.has(achievement.id)
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className={`rounded-2xl border p-4 relative overflow-hidden transition-all ${
                  unlocked
                    ? 'bg-surface-800 border-amber-500/40'
                    : 'bg-surface-800/50 border-slate-800/60 opacity-60'
                }`}
              >
                {!unlocked && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-3 h-3 text-slate-600" />
                  </div>
                )}

                <div className={`text-3xl mb-2 ${unlocked ? '' : 'grayscale opacity-50'}`}>
                  {achievement.icon}
                </div>
                <p className={`text-sm font-bold ${unlocked ? 'text-white' : 'text-slate-500'}`}>
                  {achievement.title}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  {achievement.description}
                </p>
                {unlocked && (
                  <div className="flex items-center gap-1 mt-2">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-amber-400 font-bold">+{achievement.xpReward} XP</span>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Upgrade CTA for free users */}
      {user.plan === 'free' && (
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/premium')}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold rounded-2xl shadow-lg shadow-amber-900/30"
        >
                    ⚡ Upgradovať na Prémium
        </motion.button>
      )}
    </div>
  )
}
