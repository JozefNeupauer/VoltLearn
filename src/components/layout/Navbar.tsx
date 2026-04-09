import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, User, Crown, Settings, Zap } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { ProgressBar } from '../ui/ProgressBar'

export function Navbar() {
  const { state } = useApp()
  const { user } = state
  const location = useLocation()

  const isLesson = location.pathname.startsWith('/lesson/')

  // Don't show the full nav during a lesson (minimal chrome)
  if (isLesson) return null

  return (
    <header className="sticky top-0 z-40 w-full bg-surface-900/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight">
          <span className="text-2xl">⚡</span>
          <span className="text-white">
            SOŠ<span className="text-electric-400"> Elektro</span>
          </span>
        </Link>

        {/* Stats row — XP, streak, hearts */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1 text-orange-400">
            <span className="text-base leading-none">🔥</span>
            <span className="text-sm font-bold">{user.streak}</span>
          </div>

          {/* Gems */}
          <div className="flex items-center gap-1 text-amber-400">
            <span className="text-base leading-none">💎</span>
            <span className="text-sm font-bold">{user.gems}</span>
          </div>

          {/* Level chip */}
          <div className="flex items-center gap-1.5 bg-electric-500/20 border border-electric-500/40 rounded-full px-3 py-1">
            <Zap className="w-3 h-3 text-electric-400" />
            <span className="text-xs font-bold text-electric-300">Lv.{user.level}</span>
          </div>
        </div>
      </div>

      {/* XP progress under navbar */}
      <ProgressBar
        value={user.xp}
        max={user.xpToNextLevel}
        color="blue"
        size="xs"
        animated={false}
        className="absolute bottom-0 left-0 right-0"
      />
    </header>
  )
}
