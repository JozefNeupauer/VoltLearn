import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { AppState, AppAction, Plan } from '../types'
import { saveState, loadState } from '../utils/storage'
import { createDefaultState, levelFromXP, calcTopicProgress, shouldIncrementStreak, shouldReset } from '../utils/levels'
import { topics } from '../data/topics'
import { achievements as allAchievements } from '../data/achievements'

// ─── Reducer ──────────────────────────────────────────────────────────────────

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {

    case 'HYDRATE':
      return action.payload

    case 'SET_NAME':
      return { ...state, user: { ...state.user, name: action.payload } }

    case 'SET_AVATAR':
      return { ...state, user: { ...state.user, avatarEmoji: action.payload } }

    case 'COMPLETE_LESSON': {
      const { lessonId, topicId, xp } = action.payload
      if (state.completedLessons.includes(lessonId)) return state

      const completedLessons = [...state.completedLessons, lessonId]

      // Recalculate XP & Level
      const totalXpEarned = state.user.xp + state.user.xpToNextLevel * (state.user.level - 1) + xp
      const { level, xp: newXp, xpToNextLevel } = levelFromXP(totalXpEarned)

      // Update topic progress
      const topic = topics.find((t) => t.id === topicId)
      const topicProgress = topic
        ? calcTopicProgress(completedLessons, topic.lessonIds)
        : state.progress[topicId]

      return {
        ...state,
        user: {
          ...state.user,
          level,
          xp: newXp,
          xpToNextLevel,
          gems: state.user.gems + Math.floor(xp / 10),
        },
        completedLessons,
        progress: {
          ...state.progress,
          [topicId]: topicProgress,
        },
      }
    }

    case 'ADD_XP': {
      const rawXP = (state.user.xp + state.user.xpToNextLevel * (state.user.level - 1)) + action.payload
      const { level, xp, xpToNextLevel } = levelFromXP(rawXP)
      return { ...state, user: { ...state.user, level, xp, xpToNextLevel } }
    }

    case 'ADD_GEMS':
      return { ...state, user: { ...state.user, gems: state.user.gems + action.payload } }

    case 'SPEND_HEART': {
      const hearts = Math.max(0, state.user.hearts - 1)
      return { ...state, user: { ...state.user, hearts } }
    }

    case 'RESTORE_HEARTS':
      return { ...state, user: { ...state.user, hearts: state.user.maxHearts } }

    case 'UPDATE_STREAK': {
      const today = new Date().toISOString().split('T')[0]
      const { lastActiveDate, streak, longestStreak } = state.user

      if (lastActiveDate === today) return state // already updated today

      let newStreak = streak
      if (shouldReset(lastActiveDate)) {
        newStreak = 1
      } else if (shouldIncrementStreak(lastActiveDate)) {
        newStreak = streak + 1
      } else {
        newStreak = 1 // first login
      }

      return {
        ...state,
        user: {
          ...state.user,
          streak: newStreak,
          longestStreak: Math.max(longestStreak, newStreak),
          lastActiveDate: today,
        },
      }
    }

    case 'UNLOCK_ACHIEVEMENT': {
      if (state.unlockedAchievements.some((a) => a.id === action.payload)) {
        return state
      }
      return {
        ...state,
        unlockedAchievements: [
          ...state.unlockedAchievements,
          { id: action.payload, unlockedAt: new Date().toISOString() },
        ],
      }
    }

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        settings: { ...state.settings, darkMode: !state.settings.darkMode },
      }

    case 'TOGGLE_SOUND':
      return {
        ...state,
        settings: { ...state.settings, soundEnabled: !state.settings.soundEnabled },
      }

    case 'UPGRADE_PLAN':
      return { ...state, user: { ...state.user, plan: action.payload } }

    case 'RESET_PROGRESS': {
      const fresh = createDefaultState()
      return { ...fresh, user: { ...fresh.user, name: state.user.name, avatarEmoji: state.user.avatarEmoji } }
    }

    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  completeLesson: (lessonId: string, topicId: string, xp: number, correctCount: number, totalCount: number) => void
  addXP: (amount: number) => void
  spendHeart: () => void
  restoreHearts: () => void
  updateStreak: () => void
  unlockAchievement: (id: string) => void
  upgradePlan: (plan: Plan) => void
  checkAchievements: () => void
  isLessonCompleted: (lessonId: string) => boolean
  isTopicLocked: (topicId: string) => boolean
}

const AppContext = createContext<AppContextType | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, null, () => {
    const saved = loadState()
    return saved ?? createDefaultState()
  })

  // Apply dark mode class to <html>
  useEffect(() => {
    if (state.settings.darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [state.settings.darkMode])

  // Persist to localStorage on every change
  useEffect(() => {
    saveState(state)
  }, [state])

  // Update streak on mount
  useEffect(() => {
    dispatch({ type: 'UPDATE_STREAK' })
  }, [])

  // ─── Helper functions ──────────────────────────────────────────────────────

  const completeLesson = useCallback(
    (lessonId: string, topicId: string, xp: number, correctCount: number, totalCount: number) => {
      dispatch({ type: 'COMPLETE_LESSON', payload: { lessonId, topicId, xp, correctCount, totalCount } })
      dispatch({ type: 'UPDATE_STREAK' })
    },
    [],
  )

  const addXP = useCallback((amount: number) => dispatch({ type: 'ADD_XP', payload: amount }), [])

  const spendHeart = useCallback(() => dispatch({ type: 'SPEND_HEART' }), [])

  const restoreHearts = useCallback(() => dispatch({ type: 'RESTORE_HEARTS' }), [])

  const updateStreak = useCallback(() => dispatch({ type: 'UPDATE_STREAK' }), [])

  const unlockAchievement = useCallback(
    (id: string) => dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: id }),
    [],
  )

  const upgradePlan = useCallback(
    (plan: Plan) => dispatch({ type: 'UPGRADE_PLAN', payload: plan }),
    [],
  )

  const checkAchievements = useCallback(() => {
    const alreadyUnlocked = state.unlockedAchievements.map((a) => a.id)
    allAchievements.forEach((ach) => {
      if (!alreadyUnlocked.includes(ach.id) && ach.condition(state)) {
        dispatch({ type: 'UNLOCK_ACHIEVEMENT', payload: ach.id })
        dispatch({ type: 'ADD_XP', payload: ach.xpReward })
      }
    })
  }, [state])

  const isLessonCompleted = useCallback(
    (lessonId: string) => state.completedLessons.includes(lessonId),
    [state.completedLessons],
  )

  const isTopicLocked = useCallback(
    (topicId: string) => {
      const topic = topics.find((t) => t.id === topicId)
      if (!topic) return true
      if (!topic.isPremium) return false
      return state.user.plan === 'free'
    },
    [state.user.plan],
  )

  const value: AppContextType = {
    state,
    dispatch,
    completeLesson,
    addXP,
    spendHeart,
    restoreHearts,
    updateStreak,
    unlockAchievement,
    upgradePlan,
    checkAchievements,
    isLessonCompleted,
    isTopicLocked,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
