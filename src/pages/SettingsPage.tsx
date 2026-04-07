import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Volume2, VolumeX, AlertTriangle, Trash2, Info } from 'lucide-react'
import { useApp } from '../context/AppContext'

export function SettingsPage() {
  const { state, dispatch } = useApp()
  const { darkMode, soundEnabled } = state.settings
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  function handleReset() {
    dispatch({ type: 'RESET_PROGRESS' })
    setShowResetConfirm(false)
  }

  const ToggleRow = ({
    icon,
    label,
    sub,
    checked,
    onToggle,
  }: {
    icon: React.ReactNode
    label: string
    sub: string
    checked: boolean
    onToggle: () => void
  }) => (
    <div className="flex items-center gap-4 py-4 border-b border-slate-800/60 last:border-b-0">
      <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-slate-300">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm">{label}</p>
        <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 shrink-0 ${
          checked ? 'bg-electric-600' : 'bg-slate-700'
        }`}
        role="switch"
        aria-checked={checked}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"
          style={{ left: checked ? '1.5rem' : '0.125rem' }}
        />
      </button>
    </div>
  )

  return (
    <div className="space-y-5 py-4">
      <h1 className="text-2xl font-black text-white">Nastavenia</h1>

      {/* Preferences */}
      <div className="bg-surface-800 border border-slate-700/50 rounded-2xl px-4">
        <ToggleRow
          icon={darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          label="Tmavý režim"
          sub="Príjemné pre oči"
          checked={darkMode}
          onToggle={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
        />
        <ToggleRow
          icon={soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          label="Zvukové efekty"
          sub="Zvúky spätnej väzby v kvize"
          checked={soundEnabled}
          onToggle={() => dispatch({ type: 'TOGGLE_SOUND' })}
        />
      </div>

      {/* Account */}
      <div className="bg-surface-800 border border-slate-700/50 rounded-2xl px-4">
        <div className="flex items-center gap-4 py-4 border-b border-slate-800/60">
          <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 text-slate-300">
            <Info className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Konto</p>
            <p className="text-slate-500 text-xs mt-0.5">
              {state.user.name} · Úroveň {state.user.level} · Plán {state.user.plan.charAt(0).toUpperCase() + state.user.plan.slice(1)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 py-4">
          <div className="w-9 h-9 rounded-xl bg-red-900/30 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex-1">
            <p className="text-red-400 font-semibold text-sm">Resetovať pokrok</p>
            <p className="text-slate-500 text-xs mt-0.5">Vymaž všetky údaje o učení a začni odznova</p>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-3 py-1.5 bg-red-900/30 border border-red-700/50 text-red-400 font-bold text-xs rounded-lg hover:bg-red-900/50 transition-colors shrink-0"
          >
            Resetovať
          </button>
        </div>
      </div>

      {/* App info */}
      <div className="text-center space-y-1 pb-2">
        <p className="text-slate-600 text-xs">VoltLearn · Elektrotechnické vzdelávanie</p>
        <p className="text-slate-700 text-xs">v1.0.0 · Vytvorilé s ⚡ a React</p>
      </div>

      {/* Reset confirmation modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowResetConfirm(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative bg-surface-800 rounded-2xl border border-slate-700/60 p-6 max-w-xs w-full space-y-4 text-center"
            >
              <div className="w-14 h-14 bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Resetovať všetok pokrok?</h2>
                <p className="text-slate-400 text-sm mt-1">
                  Týmto natrvalo vymažeš svôj XP, úroveň, sériu a zízky. Táto akcia sa nedá vrátiť.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:bg-slate-700 font-semibold text-sm"
                >
                  Zrušiť
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
