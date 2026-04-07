import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'
import { useApp } from '../context/AppContext'

const AVATARS = ['⚡', '🔧', '🔌', '🛠️', '👷', '🏗️', '💡', '🔋', '⚙️', '🪛', '🔩', '🧰']

export function OnboardingPage() {
  const navigate = useNavigate()
  const { dispatch } = useApp()
  const [step, setStep] = useState<'name' | 'avatar'>('name')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('⚡')
  const [error, setError] = useState('')

  function handleNameSubmit() {
    const trimmed = name.trim()
    if (!trimmed || trimmed.length < 2) {
      setError('Zadaj aspoň 2 znaky')
      return
    }
    if (trimmed.length > 24) {
      setError('Meno môže mať najviac 24 znakov')
      return
    }
    setError('')
    setStep('avatar')
  }

  function handleFinish() {
    dispatch({ type: 'SET_NAME', payload: name.trim() })
    dispatch({ type: 'SET_AVATAR', payload: avatar })
    navigate('/', { replace: true })
  }

  return (
    <div className="min-h-screen bg-surface-900 flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="mb-8 flex flex-col items-center gap-3"
      >
        <div className="w-20 h-20 bg-electric-600 rounded-3xl flex items-center justify-center shadow-lg shadow-electric-900/60">
          <Zap className="w-10 h-10 text-white fill-white" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-black text-white">VoltLearn</h1>
          <p className="text-slate-400 text-sm mt-1">Ovládni elektrotechniku</p>
        </div>
      </motion.div>

      <div className="w-full max-w-sm">
        <AnimatePresence mode="wait">
          {/* Step 1: Name */}
          {step === 'name' && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-5"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">Ako sa voláš?</h2>
                <p className="text-slate-400 text-sm mt-1">Prispôsobíme ti tvoju cestu učenia</p>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                  placeholder="Zadaj svoje meno…"
                  maxLength={24}
                  autoFocus
                  className={`w-full bg-surface-800 border rounded-xl px-4 py-3 text-white placeholder-slate-500 text-base outline-none focus:ring-2 focus:ring-electric-500 transition-all ${
                    error ? 'border-red-500' : 'border-slate-700 focus:border-electric-500'
                  }`}
                />
                {error && (
                  <p className="text-red-400 text-xs pl-1">{error}</p>
                )}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleNameSubmit}
                disabled={!name.trim()}
                className="w-full py-3.5 bg-electric-600 hover:bg-electric-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-colors"
              >
                Pokračovať
              </motion.button>
            </motion.div>
          )}

          {/* Step 2: Avatar */}
          {step === 'avatar' && (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-5"
            >
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">Vyber si avatara, {name.trim()}!</h2>
                <p className="text-slate-400 text-sm mt-1">Reprezentuj sa na rebríčku</p>
              </div>

              {/* Selected avatar preview */}
              <div className="flex justify-center">
                <motion.div
                  key={avatar}
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-electric-600/20 border-2 border-electric-500 rounded-2xl flex items-center justify-center text-4xl"
                >
                  {avatar}
                </motion.div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-6 gap-2">
                {AVATARS.map((emoji) => (
                  <motion.button
                    key={emoji}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setAvatar(emoji)}
                    className={`aspect-square rounded-xl text-2xl flex items-center justify-center transition-all ${
                      avatar === emoji
                        ? 'bg-electric-600/30 border-2 border-electric-500 shadow-md shadow-electric-900/50'
                        : 'bg-surface-800 border-2 border-transparent hover:border-slate-600'
                    }`}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleFinish}
                className="w-full py-3.5 bg-volt-600 hover:bg-volt-500 text-white font-bold rounded-xl shadow-lg shadow-volt-900/40"
              >
                Začať učiť sa ⚡
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative dots */}
      <div className="flex gap-2 mt-8">
        {['name', 'avatar'].map((s) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all duration-300 ${
              step === s ? 'w-6 bg-electric-500' : 'w-2 bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
