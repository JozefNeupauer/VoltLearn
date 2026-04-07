import type { Achievement, AppState } from '../types'

export const achievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'Prvé kroky',
    description: 'Dokonči svoju prvú lekciu',
    icon: '🎯',
    xpReward: 50,
    condition: (s) => s.completedLessons.length >= 1,
  },
  {
    id: 'streak-3',
    title: '3-dňová séria',
    description: 'Uč sa 3 dni za sebou',
    icon: '🔥',
    xpReward: 75,
    condition: (s) => s.user.streak >= 3,
  },
  {
    id: 'streak-7',
    title: 'Týždenný bojovník',
    description: 'Uč sa 7 dní za sebou',
    icon: '⚡',
    xpReward: 150,
    condition: (s) => s.user.streak >= 7,
  },
  {
    id: 'streak-30',
    title: 'Nezastaviteľný',
    description: '30-dňová séria — si na vrchole!',
    icon: '🌟',
    xpReward: 500,
    condition: (s) => s.user.streak >= 30,
  },
  {
    id: 'topic-basics',
    title: 'Základy zvládnuté',
    description: 'Dokonči všetky lekcie zo Základov elektiny',
    icon: '⚛️',
    xpReward: 100,
    condition: (s) => {
      const p = s.progress['electricity-basics']
      return p ? p.percentComplete >= 100 : false
    },
  },
  {
    id: 'topic-ohms',
    title: 'Ohmov vedec',
    description: 'Dokonči všetky lekcie z Ohmovho zákona',
    icon: '📐',
    xpReward: 100,
    condition: (s) => {
      const p = s.progress['ohms-law']
      return p ? p.percentComplete >= 100 : false
    },
  },
  {
    id: 'level-5',
    title: 'Nastupujúci elektrikár',
    description: 'Dosiahni úroveň 5',
    icon: '🏅',
    xpReward: 100,
    condition: (s) => s.user.level >= 5,
  },
  {
    id: 'level-10',
    title: 'Certifikovaný profesionál',
    description: 'Dosiahni úroveň 10',
    icon: '🏆',
    xpReward: 250,
    condition: (s) => s.user.level >= 10,
  },
  {
    id: 'perfect-quiz',
    title: 'Perfektné skóre',
    description: 'Odpovedz správne na všetky otázky v jednej lekcii',
    icon: '💯',
    xpReward: 75,
    condition: (s) => s.completedLessons.length > 0, // simplified
  },
  {
    id: 'xp-500',
    title: 'Silový nárast',
    description: 'Získaj celkovo 500 XP',
    icon: '💥',
    xpReward: 50,
    condition: (s) => s.user.xp >= 500,
  },
  {
    id: 'xp-2000',
    title: 'Študent vysokého napätia',
    description: 'Získaj celkovo 2000 XP',
    icon: '⚡',
    xpReward: 200,
    condition: (s) => s.user.xp >= 2000,
  },
  {
    id: 'all-free',
    title: 'Šampión bezplatného obsahu',
    description: 'Dokonči všetky bezplatné lekcie',
    icon: '🎓',
    xpReward: 200,
    condition: (s) => {
      const basics = s.progress['electricity-basics']
      const ohms = s.progress['ohms-law']
      return (
        (basics?.percentComplete ?? 0) >= 100 &&
        (ohms?.percentComplete ?? 0) >= 100
      )
    },
  },
]

export const getAchievementById = (id: string) =>
  achievements.find((a) => a.id === id)

/** Check which new achievements the user has just unlocked */
export const checkNewAchievements = (
  state: AppState,
  alreadyUnlocked: string[],
): Achievement[] =>
  achievements.filter(
    (a) => !alreadyUnlocked.includes(a.id) && a.condition(state),
  )
