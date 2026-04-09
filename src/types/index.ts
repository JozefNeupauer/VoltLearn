// ─── Quiz question types ─────────────────────────────────────────────────────

export type QuizType = 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching'

export interface MultipleChoiceQuestion {
  id: string
  type: 'multiple_choice'
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface TrueFalseQuestion {
  id: string
  type: 'true_false'
  question: string
  correct: boolean
  explanation: string
}

export interface FillBlankQuestion {
  id: string
  type: 'fill_blank'
  question: string          // use ___ for blank
  answer: string            // case-insensitive match
  hint?: string
  explanation: string
}

export interface MatchingQuestion {
  id: string
  type: 'matching'
  question: string
  pairs: { left: string; right: string }[]
  explanation: string
}

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillBlankQuestion
  | MatchingQuestion

// ─── Lesson / Topic structures ────────────────────────────────────────────────

export interface KeyPoint {
  icon: string        // emoji or icon name
  text: string
}

export interface Lesson {
  id: string
  topicId: string
  order: number
  title: string
  subtitle: string
  xpReward: number
  diagramType?: string   // which diagram component to render
  explanation: string    // markdown-like rich text
  keyPoints: KeyPoint[]
  questions: Question[]
}

export interface Topic {
  id: string
  title: string
  subtitle: string
  icon: string         // emoji
  color: string        // tailwind gradient from-to
  colorLight: string   // light bg for badges
  order: number
  year: 1 | 2 | 3 | 4
  isPremium: boolean
  lessonIds: string[]
}

// ─── User / Progress ──────────────────────────────────────────────────────────

export type Plan = 'free' | 'premium' | 'pro'

export interface UserProfile {
  name: string
  joinedAt: string
  level: number
  xp: number
  xpToNextLevel: number
  streak: number
  longestStreak: number
  lastActiveDate: string   // ISO date string
  gems: number
  plan: Plan
  avatarEmoji: string
}

export interface TopicProgress {
  completedLessonIds: string[]
  started: boolean
  percentComplete: number
}

export interface AppSettings {
  darkMode: boolean
  soundEnabled: boolean
  hapticEnabled: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  xpReward: number
  condition: (state: AppState) => boolean
}

export interface UnlockedAchievement {
  id: string
  unlockedAt: string
}

// ─── Global app state ─────────────────────────────────────────────────────────

export interface AppState {
  user: UserProfile
  progress: Record<string, TopicProgress>
  settings: AppSettings
  unlockedAchievements: UnlockedAchievement[]
  /** lesson IDs the user has completed */
  completedLessons: string[]
}

// ─── Action types for reducer ─────────────────────────────────────────────────

export type AppAction =
  | { type: 'HYDRATE'; payload: AppState }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_AVATAR'; payload: string }
  | { type: 'COMPLETE_LESSON'; payload: { lessonId: string; topicId: string; xp: number; correctCount: number; totalCount: number } }
  | { type: 'ADD_XP'; payload: number }
  | { type: 'ADD_GEMS'; payload: number }
  | { type: 'UPDATE_STREAK' }
  | { type: 'UNLOCK_ACHIEVEMENT'; payload: string }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'UPGRADE_PLAN'; payload: Plan }
  | { type: 'RESET_PROGRESS' }
