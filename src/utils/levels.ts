import type { AppState, UserProfile, TopicProgress } from '../types'
import { topics } from '../data/topics'

// ─── XP & Level system ────────────────────────────────────────────────────────

/** XP required to reach given level (cumulative) */
export const xpForLevel = (level: number): number =>
  Math.floor(100 * Math.pow(1.3, level - 1))

/** Total XP threshold to START a given level */
export const cumulativeXpForLevel = (level: number): number => {
  let total = 0
  for (let i = 1; i < level; i++) {
    total += xpForLevel(i)
  }
  return total
}

/** Compute level from total XP */
export const levelFromXP = (totalXP: number): { level: number; xp: number; xpToNextLevel: number } => {
  let level = 1
  let remaining = totalXP
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level)
    level++
  }
  return { level, xp: remaining, xpToNextLevel: xpForLevel(level) }
}

/** XP percentage for current level progress */
export const xpPercent = (xp: number, xpToNextLevel: number): number =>
  Math.min(100, Math.round((xp / xpToNextLevel) * 100))

// ─── Streak utilities ─────────────────────────────────────────────────────────

const TODAY = () => new Date().toISOString().split('T')[0]

export const isStreakActive = (lastActiveDate: string): boolean => {
  const today = TODAY()
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  return lastActiveDate === today || lastActiveDate === yesterday
}

export const shouldIncrementStreak = (lastActiveDate: string): boolean => {
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  return lastActiveDate === yesterday
}

export const shouldReset = (lastActiveDate: string): boolean => {
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  return lastActiveDate < yesterday
}

// ─── Topic progress calculation ───────────────────────────────────────────────

export const calcTopicProgress = (
  completedLessons: string[],
  lessonIds: string[],
): TopicProgress => {
  const done = lessonIds.filter((id) => completedLessons.includes(id))
  return {
    completedLessonIds: done,
    started: done.length > 0,
    percentComplete: lessonIds.length === 0 ? 0 : Math.round((done.length / lessonIds.length) * 100),
  }
}

// ─── Default state factory ────────────────────────────────────────────────────

export const createDefaultState = (): AppState => {
  const initialProgress: AppState['progress'] = {}
  topics.forEach((t) => {
    initialProgress[t.id] = {
      completedLessonIds: [],
      started: false,
      percentComplete: 0,
    }
  })

  return {
    user: {
      name: '',
      joinedAt: new Date().toISOString(),
      level: 1,
      xp: 0,
      xpToNextLevel: xpForLevel(1),
      streak: 0,
      longestStreak: 0,
      lastActiveDate: '',
      gems: 0,
      hearts: 5,
      maxHearts: 5,
      plan: 'free',
      avatarEmoji: '⚡',
    },
    progress: initialProgress,
    settings: {
      darkMode: true,
      soundEnabled: true,
      hapticEnabled: false,
    },
    unlockedAchievements: [],
    completedLessons: [],
  }
}
