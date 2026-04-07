import type { AppState } from '../types'

const STORAGE_KEY = 'voltlearn_state'

export const saveState = (state: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (err) {
    console.warn('Failed to persist state:', err)
  }
}

export const loadState = (): AppState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as AppState
  } catch {
    return null
  }
}

export const clearState = (): void => {
  localStorage.removeItem(STORAGE_KEY)
}
