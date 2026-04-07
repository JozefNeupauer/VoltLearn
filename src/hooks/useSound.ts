import { useCallback, useRef } from 'react'

type SoundType = 'correct' | 'incorrect' | 'complete' | 'click' | 'xp'

/**
 * Generates simple synthetic sounds using the Web Audio API.
 * No external audio files required.
 */
export const useSound = (enabled: boolean) => {
  const ctx = useRef<AudioContext | null>(null)

  const getCtx = (): AudioContext => {
    if (!ctx.current) {
      ctx.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
    return ctx.current
  }

  const playCorrect = useCallback(() => {
    if (!enabled) return
    try {
      const ac = getCtx()
      const osc = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain)
      gain.connect(ac.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(523, ac.currentTime)        // C5
      osc.frequency.setValueAtTime(659, ac.currentTime + 0.1)  // E5
      osc.frequency.setValueAtTime(784, ac.currentTime + 0.2)  // G5
      gain.gain.setValueAtTime(0.3, ac.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.6)
      osc.start(ac.currentTime)
      osc.stop(ac.currentTime + 0.6)
    } catch { /* ignore */ }
  }, [enabled])

  const playIncorrect = useCallback(() => {
    if (!enabled) return
    try {
      const ac = getCtx()
      const osc = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain)
      gain.connect(ac.destination)
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(200, ac.currentTime)
      osc.frequency.setValueAtTime(150, ac.currentTime + 0.1)
      gain.gain.setValueAtTime(0.2, ac.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.4)
      osc.start(ac.currentTime)
      osc.stop(ac.currentTime + 0.4)
    } catch { /* ignore */ }
  }, [enabled])

  const playComplete = useCallback(() => {
    if (!enabled) return
    try {
      const ac = getCtx()
      const notes = [523, 659, 784, 1047] // C E G C — rising fanfare
      notes.forEach((freq, i) => {
        const osc = ac.createOscillator()
        const gain = ac.createGain()
        osc.connect(gain)
        gain.connect(ac.destination)
        osc.type = 'sine'
        osc.frequency.value = freq
        const t = ac.currentTime + i * 0.12
        gain.gain.setValueAtTime(0.3, t)
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4)
        osc.start(t)
        osc.stop(t + 0.4)
      })
    } catch { /* ignore */ }
  }, [enabled])

  const playClick = useCallback(() => {
    if (!enabled) return
    try {
      const ac = getCtx()
      const buf = ac.createBuffer(1, ac.sampleRate * 0.05, ac.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length)
      const source = ac.createBufferSource()
      const gain = ac.createGain()
      source.buffer = buf
      source.connect(gain)
      gain.connect(ac.destination)
      gain.gain.value = 0.08
      source.start()
    } catch { /* ignore */ }
  }, [enabled])

  const playXP = useCallback(() => {
    if (!enabled) return
    try {
      const ac = getCtx()
      const osc = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain)
      gain.connect(ac.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, ac.currentTime)
      osc.frequency.exponentialRampToValueAtTime(1760, ac.currentTime + 0.15)
      gain.gain.setValueAtTime(0.2, ac.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3)
      osc.start(ac.currentTime)
      osc.stop(ac.currentTime + 0.3)
    } catch { /* ignore */ }
  }, [enabled])

  const play = useCallback(
    (type: SoundType) => {
      switch (type) {
        case 'correct':   return playCorrect()
        case 'incorrect': return playIncorrect()
        case 'complete':  return playComplete()
        case 'click':     return playClick()
        case 'xp':        return playXP()
      }
    },
    [playCorrect, playIncorrect, playComplete, playClick, playXP],
  )

  return { play }
}
