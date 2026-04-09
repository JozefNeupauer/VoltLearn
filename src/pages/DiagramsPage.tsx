import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap } from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────────

type Part = {
  id: string
  label: string
  icon: string
  description: string
  formula?: string
  value?: string
}

// ─── Wire colours ───────────────────────────────────────────────────────────────

const W_OFF = '#475569'
const W_ON  = '#22c55e'

// ─── Info Panel ────────────────────────────────────────────────────────────────

function InfoPanel({ part, onClose }: { part: Part; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      className="mt-3 rounded-2xl bg-slate-800 border border-slate-700 p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl shrink-0">{part.icon}</span>
          <h3 className="font-bold text-white leading-tight">{part.label}</h3>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-slate-700 transition-colors mt-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-slate-300 text-sm mt-2 leading-relaxed">{part.description}</p>

      {part.formula && (
        <div className="mt-2.5 bg-electric-900/60 border border-electric-700/40 rounded-xl px-3 py-2">
          <p className="text-electric-300 text-xs font-mono leading-relaxed whitespace-pre-wrap">{part.formula}</p>
        </div>
      )}

      {part.value && (
        <div className="mt-2 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-amber-300 font-semibold text-sm">{part.value}</span>
        </div>
      )}
    </motion.div>
  )
}

// ─── Series Circuit ─────────────────────────────────────────────────────────────

function SeriesCircuit() {
  const [selected, setSelected] = useState<Part | null>(null)
  const [closed, setClosed] = useState(false)

  const W = closed ? W_ON : W_OFF
  const isSel = (id: string) => selected?.id === id

  function pick(part: Part) {
    setSelected(prev => (prev?.id === part.id ? null : part))
  }

  function handleSwitchClick() {
    const next = !closed
    setClosed(next)
    setSelected({
      id: 'sw',
      label: next ? 'Spínač — ZAPNUTÝ' : 'Spínač — VYPNUTÝ',
      icon: next ? '🟢' : '🔴',
      description: next
        ? 'Obvod je uzavretý — prúd môže pretekať cez všetky súčiastky. Elektrony putujú od záporného pólu batérie cez obvod na kladný.'
        : 'Obvod je otvorený — prúd nepretečie. Prerušenie obvodu kdekoľvek zastaví tok prúdu v celej sérii.',
      value: next ? 'Stav: uzavretý ✓' : 'Stav: otvorený ✗',
    })
  }

  const BATTERY: Part = {
    id: 'battery',
    label: 'Batéria — 9 V',
    icon: '🔋',
    description:
      'Elektrochemický zdroj napätia. Chemická reakcia presúva naboje od záporného pólu (−) ku kladnému (+), čím vytvára elektromotorické napätie (EMF).',
    formula: 'U = EMF − I · r\n(r = vnútorný odpor batérie)',
    value: 'U = 9 V',
  }

  const R1: Part = {
    id: 'r1',
    label: 'Rezistor R₁ = 10 Ω',
    icon: '🟦',
    description:
      'Pasívny prvok, ktorý obmedzuje tok prúdu. V sériovom zapojení preteká každým rezistorom rovnaký prúd I. Napätie sa delí úmerne hodnotám odporov.',
    formula: 'U₁ = I · R₁ = 0,3 A × 10 Ω = 3 V',
    value: 'R₁ = 10 Ω  →  U₁ = 3 V',
  }

  const R2: Part = {
    id: 'r2',
    label: 'Rezistor R₂ = 20 Ω',
    icon: '🟦',
    description:
      '2. Kirchhoffov zákon (KVL): súčet napätí v uzavretom obvode = 0. Napätie zdroja sa rovná súčtu napätí na spotrebičoch.',
    formula: 'U₂ = I · R₂ = 0,3 A × 20 Ω = 6 V\nU = U₁ + U₂  →  9 = 3 + 6 ✓',
    value: 'R₂ = 20 Ω  →  U₂ = 6 V',
  }

  return (
    <div>
      <svg viewBox="0 0 380 200" className="w-full max-w-md mx-auto select-none">
        {/* ── Wires ── */}
        {/* battery top connector */}
        <line x1="40" y1="50" x2="40" y2="82"  stroke={W} strokeWidth="2.5" strokeLinecap="round" />
        {/* battery bottom connector */}
        <line x1="40" y1="138" x2="40" y2="172" stroke={W} strokeWidth="2.5" strokeLinecap="round" />
        {/* bottom rail */}
        <line x1="40" y1="172" x2="350" y2="172" stroke={W} strokeWidth="2.5" strokeLinecap="round" />
        {/* right branch */}
        <line x1="350" y1="50" x2="350" y2="172" stroke={W} strokeWidth="2.5" strokeLinecap="round" />
        {/* top: R2 right → corner */}
        <line x1="308" y1="50" x2="350" y2="50" stroke={W} strokeWidth="2.5" strokeLinecap="round" />
        {/* top: R1 right → R2 left */}
        <line x1="238" y1="50" x2="255" y2="50" stroke={W} strokeWidth="2.5" strokeLinecap="round" />
        {/* top: switch right → R1 left */}
        <line x1="135" y1="50" x2="158" y2="50" stroke={W} strokeWidth="2.5" strokeLinecap="round" />
        {/* top: battery top → switch left */}
        <line x1="40" y1="50" x2="82" y2="50"  stroke={W} strokeWidth="2.5" strokeLinecap="round" />
        {/* switch bridge (only when closed) */}
        {closed && (
          <line x1="82" y1="50" x2="135" y2="50" stroke={W_ON} strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* current direction arrow (only when closed) */}
        {closed && (
          <>
            <polygon points="202,41 196,33 208,33" fill="#22c55e" />
            <text x="202" y="30" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="Inter, sans-serif">
              I = 0,3 A
            </text>
          </>
        )}

        {/* ── Battery ── */}
        <g onClick={() => pick(BATTERY)} style={{ cursor: 'pointer' }}>
          {/* hit area */}
          <rect x="18" y="72" width="44" height="76" rx="10" fill="transparent" />
          {/* body */}
          <rect
            x="22" y="75" width="36" height="60" rx="8"
            fill={isSel('battery') ? '#292524' : '#1c1917'}
            stroke={isSel('battery') ? '#f59e0b' : '#57534e'}
            strokeWidth={isSel('battery') ? 2.5 : 1.5}
          />
          {/* plates */}
          <line x1="28" y1="90"  x2="52" y2="90"  stroke="#fbbf24" strokeWidth="3"   strokeLinecap="round" />
          <line x1="33" y1="100" x2="47" y2="100" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="28" y1="110" x2="52" y2="110" stroke="#fbbf24" strokeWidth="3"   strokeLinecap="round" />
          <line x1="33" y1="120" x2="47" y2="120" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="40" y="133" textAnchor="middle" fill="#fbbf24" fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="bold">9V</text>
        </g>

        {/* ── Switch ── */}
        <g onClick={handleSwitchClick} style={{ cursor: 'pointer' }}>
          <rect x="72" y="33" width="73" height="34" fill="transparent" />
          <circle cx="82"  cy="50" r="4" fill={closed ? W_ON : '#475569'} />
          <circle cx="135" cy="50" r="4" fill={closed ? W_ON : '#475569'} />
          {/* lever — open: angled, closed: already drawn as bridge above */}
          {!closed && (
            <line x1="82" y1="50" x2="126" y2="34" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
          )}
          <text
            x="108" y="70"
            textAnchor="middle"
            fill={closed ? '#4ade80' : '#64748b'}
            fontSize="9"
            fontFamily="Inter, sans-serif"
          >SW</text>
        </g>

        {/* ── R1 ── */}
        <g onClick={() => pick(R1)} style={{ cursor: 'pointer' }}>
          <rect
            x="158" y="37" width="80" height="26" rx="5"
            fill={isSel('r1') ? '#1e293b' : '#0f172a'}
            stroke={isSel('r1') ? '#60a5fa' : '#334155'}
            strokeWidth={isSel('r1') ? 2.5 : 1.5}
          />
          <text x="198" y="54" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">
            R₁  10 Ω
          </text>
          {closed && (
            <text x="198" y="74" textAnchor="middle" fill="#93c5fd" fontSize="8.5" fontFamily="Inter, sans-serif">U₁ = 3 V</text>
          )}
        </g>

        {/* ── R2 ── */}
        <g onClick={() => pick(R2)} style={{ cursor: 'pointer' }}>
          <rect
            x="255" y="37" width="53" height="26" rx="5"
            fill={isSel('r2') ? '#1e293b' : '#0f172a'}
            stroke={isSel('r2') ? '#60a5fa' : '#334155'}
            strokeWidth={isSel('r2') ? 2.5 : 1.5}
          />
          <text x="281" y="54" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">
            R₂  20 Ω
          </text>
          {closed && (
            <text x="281" y="74" textAnchor="middle" fill="#93c5fd" fontSize="8.5" fontFamily="Inter, sans-serif">U₂ = 6 V</text>
          )}
        </g>

        {/* summary label */}
        <text x="195" y="188" textAnchor="middle" fill="#475569" fontSize="8.5" fontFamily="Inter, sans-serif">
          R_tot = R₁ + R₂ = 30 Ω  •  I = U ÷ R = 9 ÷ 30 = 0,3 A
        </text>
      </svg>

      <p className="text-center text-xs text-slate-500 mt-1 mb-3">
        Klikni na <span className="text-green-400 font-medium">SW</span> pre zapnutie/vypnutie • súčiastky pre detaily
      </p>

      <AnimatePresence>
        {selected && <InfoPanel part={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ─── Parallel Circuit ──────────────────────────────────────────────────────────

function ParallelCircuit() {
  const [selected, setSelected] = useState<Part | null>(null)
  const [closed, setClosed] = useState(false)

  const W = closed ? W_ON : W_OFF
  const isSel = (id: string) => selected?.id === id

  function pick(part: Part) {
    setSelected(prev => (prev?.id === part.id ? null : part))
  }

  const BATTERY: Part = {
    id: 'battery',
    label: 'Batéria — 12 V',
    icon: '🔋',
    description:
      'V paralelnom zapojení sa rovnaké napätie zdroja objaví na každej vetve bez ohľadu na jej odpor. Každý spotrebič "vidí" plné napätie.',
    formula: 'U = U₁ = U₂ = 12 V',
    value: 'U = 12 V',
  }

  const R1: Part = {
    id: 'r1',
    label: 'Vetva 1: R₁ = 6 Ω',
    icon: '🟦',
    description:
      'Prvá vetva paralelného obvodu. Napätie na R₁ = napätie zdroja. Každá vetva je elektricky nezávislá — vypnutie jednej nenaruší ostatné.',
    formula: 'I₁ = U ÷ R₁ = 12 ÷ 6 = 2 A',
    value: 'I₁ = 2 A',
  }

  const R2: Part = {
    id: 'r2',
    label: 'Vetva 2: R₂ = 12 Ω',
    icon: '🟦',
    description:
      'Druhá vetva. Princíp paralelného zapojenia sa využíva v domovej elektroinštalácii — každá zásuvka/svetlo je pripojená paralelne.',
    formula: 'I₂ = U ÷ R₂ = 12 ÷ 12 = 1 A',
    value: 'I₂ = 1 A',
  }

  const NODE: Part = {
    id: 'node',
    label: '1. Kirchhoffov zákon (KCL)',
    icon: '🔀',
    description:
      'V každom uzle (junction) platí: súčet prúdov vchádzajúcich = súčet prúdov vychádzajúcich. Prúd sa delí medzi vetvy podľa ich odporov.',
    formula: 'I_total = I₁ + I₂ = 2 + 1 = 3 A\nI_in = I_out  ✓',
    value: 'I_total = 3 A',
  }

  const R_EQ: Part = {
    id: 'req',
    label: 'Ekvivalentný odpor',
    icon: '📐',
    description:
      'Celkový odpor paralelného zapojenia je vždy MENŠÍ ako najmenší odpor vetvy. Každá ďalšia vetva znižuje celkový odpor.',
    formula: '1/R_eq = 1/R₁ + 1/R₂\n1/R_eq = 1/6 + 1/12 = 2/12 + 1/12 = 3/12\nR_eq = 4 Ω',
    value: 'R_eq = 4 Ω',
  }

  const branches = [
    { x: 135, part: R1 },
    { x: 240, part: R2 },
  ]

  return (
    <div>
      <svg viewBox="0 0 375 220" className="w-full max-w-md mx-auto select-none">
        {/* ── Rails ── */}
        <line x1="40"  y1="35"  x2="340" y2="35"  stroke={W} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40"  y1="188" x2="340" y2="188" stroke={W} strokeWidth="2.5" strokeLinecap="round" />
        {/* right closing wire */}
        <line x1="340" y1="35"  x2="340" y2="188" stroke={W} strokeWidth="2.5" strokeLinecap="round" />

        {/* ── Battery (left branch) ── */}
        <line x1="40" y1="35"  x2="40" y2="82"  stroke={W} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="134" x2="40" y2="188" stroke={W} strokeWidth="2.5" strokeLinecap="round" />
        <g onClick={() => pick(BATTERY)} style={{ cursor: 'pointer' }}>
          <rect x="18" y="72" width="44" height="72" rx="10" fill="transparent" />
          <rect
            x="22" y="75" width="36" height="56" rx="8"
            fill={isSel('battery') ? '#292524' : '#1c1917'}
            stroke={isSel('battery') ? '#f59e0b' : '#57534e'}
            strokeWidth={isSel('battery') ? 2.5 : 1.5}
          />
          <line x1="28" y1="90"  x2="52" y2="90"  stroke="#fbbf24" strokeWidth="3"   strokeLinecap="round" />
          <line x1="33" y1="100" x2="47" y2="100" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="28" y1="110" x2="52" y2="110" stroke="#fbbf24" strokeWidth="3"   strokeLinecap="round" />
          <line x1="33" y1="120" x2="47" y2="120" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="40" y="132" textAnchor="middle" fill="#fbbf24" fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="bold">12V</text>
        </g>

        {/* ── Parallel branches ── */}
        {branches.map(({ x, part }) => (
          <g key={x}>
            {/* top wire */}
            <line x1={x} y1="35"  x2={x} y2="82"  stroke={W} strokeWidth="2" strokeLinecap="round" />
            {/* bottom wire */}
            <line x1={x} y1="130" x2={x} y2="188" stroke={W} strokeWidth="2" strokeLinecap="round" />
            {/* junction dots */}
            <circle
              cx={x} cy={35}  r={closed ? 5 : 3.5}
              fill={closed ? W_ON : '#475569'}
              onClick={() => pick(NODE)}
              style={{ cursor: 'pointer' }}
            />
            <circle
              cx={x} cy={188} r={closed ? 5 : 3.5}
              fill={closed ? W_ON : '#475569'}
              onClick={() => pick(NODE)}
              style={{ cursor: 'pointer' }}
            />
            {/* component */}
            <g onClick={() => pick(part)} style={{ cursor: 'pointer' }}>
              <rect
                x={x - 32} y={82} width={64} height={48} rx="7"
                fill={isSel(part.id) ? '#1e293b' : '#0f172a'}
                stroke={isSel(part.id) ? '#60a5fa' : '#334155'}
                strokeWidth={isSel(part.id) ? 2.5 : 1.5}
              />
              <text x={x} y={110} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Inter, sans-serif">
                {part.id === 'r1' ? 'R₁' : 'R₂'}
              </text>
              <text x={x} y={122} textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="Inter, sans-serif">
                {part.id === 'r1' ? '6 Ω' : '12 Ω'}
              </text>
              {closed && (
                <text x={x} y={148} textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="Inter, sans-serif">
                  {part.id === 'r1' ? 'I₁ = 2 A' : 'I₂ = 1 A'}
                </text>
              )}
            </g>
          </g>
        ))}

        {/* voltage label on right rail */}
        {closed && (
          <text x="356" y="115" textAnchor="middle" fill="#fbbf24" fontSize="8" fontFamily="Inter, sans-serif">12V</text>
        )}

        {/* total current arrow */}
        {closed && (
          <>
            <polygon points="90,26 84,18 96,18" fill="#22c55e" />
            <text x="90" y="15" textAnchor="middle" fill="#4ade80" fontSize="8.5" fontFamily="Inter, sans-serif">3 A →</text>
          </>
        )}

        {/* R_eq tappable bottom label */}
        <g onClick={() => pick(R_EQ)} style={{ cursor: 'pointer' }}>
          <rect x="50" y="200" width="270" height="14" fill="transparent" />
          <text x="185" y="211" textAnchor="middle" fill="#475569" fontSize="8" fontFamily="Inter, sans-serif">
            R_eq = 4 Ω  •  I_total = 12 ÷ 4 = 3 A  (klikni pre vzorec)
          </text>
        </g>
      </svg>

      <div className="flex justify-center mt-1 mb-3">
        <button
          onClick={() => { setClosed(c => !c); setSelected(null) }}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
            closed
              ? 'bg-green-500/20 border-green-500/50 text-green-400'
              : 'bg-slate-700/50 border-slate-600 text-slate-400'
          }`}
        >
          {closed ? '🟢 Obvod zapnutý' : '🔴 Obvod vypnutý'} — klikni
        </button>
      </div>

      <p className="text-center text-xs text-slate-500 mb-3">
        Klikni na uzly (●) a súčiastky pre detaily
      </p>

      <AnimatePresence>
        {selected && <InfoPanel part={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ─── Star-Delta Motor Diagram ─────────────────────────────────────────────────

function StarDeltaDiagram() {
  const [mode, setMode] = useState<'star' | 'delta'>('star')
  const [selected, setSelected] = useState<Part | null>(null)

  function pick(part: Part) {
    setSelected(prev => (prev?.id === part.id ? null : part))
  }

  // Winding centre for star/delta SVG
  const cx = 160, cy = 115, r = 62

  // Three winding endpoints (120° apart), starting top
  const angles = [-90, 30, 150]
  const pts = angles.map(a => ({
    x: cx + r * Math.cos((a * Math.PI) / 180),
    y: cy + r * Math.sin((a * Math.PI) / 180),
  }))

  // Supply terminal positions above
  const terminals = [
    { x: pts[0].x,       y: 30,  label: 'L1', color: '#ef4444' },
    { x: pts[1].x + 18,  y: 30,  label: 'L2', color: '#f59e0b' },
    { x: pts[2].x - 18,  y: 30,  label: 'L3', color: '#22c55e' },
  ]

  const windingColors = ['#ef4444', '#f59e0b', '#22c55e']
  const windingLabels = ['U', 'V', 'W']

  // Centre point for star
  const starCenter = { x: cx, y: cy }

  const STAR_INFO: Part = {
    id: 'star',
    label: 'Zapojenie hviezda (Y)',
    icon: '⭐',
    description:
      'Všetky tri vinutia sú spojené jedným koncom do spoločného uzla N (nulový bod). Druhý koniec každého vinutia je pripojený na fázový vodič L1, L2, L3.',
    formula:
      'U_vinutia = U_fázy = U_siete ÷ √3\nU_vinutia = 400 V ÷ 1,732 ≈ 231 V\nI_fázy = I_vinutia',
    value: 'Nábeh: nižší záberový prúd (~1/3 výkonu)',
  }

  const DELTA_INFO: Part = {
    id: 'delta',
    label: 'Zapojenie trojuholník (Δ)',
    icon: '🔺',
    description:
      'Vinutia sú zapojené do uzavretého trojuholníka — koniec jedného vinutia je spojený so začiatkom ďalšieho. Každé vinutie dostane plné sieťové napätie.',
    formula:
      'U_vinutia = U_fázy = U_siete = 400 V\nI_fázy = I_vinutia × √3\nI_line = I_vinutia × 1,732',
    value: 'Beh: plný výkon a moment',
  }

  const SWITCH_INFO: Part = {
    id: 'switch',
    label: 'Spínanie Y → Δ',
    icon: '⏱️',
    description:
      'Štartér Y–Δ automaticky prepne motor po 5–10 sekundách (keď otáčky dosiahnu ~70–80 % menovitých). Prepnutie zabezpečujú tri stýkače: hlavný (KM), hviezda (KY) a trojuholník (KD).',
    formula:
      'Záberový prúd v Y:  I_Y ≈ I_Δ ÷ 3\nZáberový moment v Y: M_Y ≈ M_Δ ÷ 3\n→ Vhodné pre motory ≥ 4 kW',
    value: 'Čas prepnutia: 5–10 s',
  }

  const WINDING_INFO = (i: number): Part => ({
    id: `w${i}`,
    label: `Vinutie ${windingLabels[i]}`,
    icon: '🌀',
    description:
      mode === 'star'
        ? `Vinutie ${windingLabels[i]} je v hviezde — jedno napätie fázy ${terminals[i].label} (231 V). Prúd vinutia = fázový prúd.`
        : `Vinutie ${windingLabels[i]} je v trojuholníku — dostáva plné sieťové napätie 400 V (medzi dvoma fázami). Prúd vinutia = sieťový prúd ÷ √3.`,
    formula:
      mode === 'star'
        ? `U_${windingLabels[i]} = 231 V  |  I = P ÷ (3 × U_f)`
        : `U_${windingLabels[i]} = 400 V  |  I_line = I_winding × √3`,
    value: mode === 'star' ? 'U = 231 V' : 'U = 400 V',
  })

  return (
    <div>
      {/* Mode toggle */}
      <div className="flex rounded-xl bg-slate-900/60 p-1 gap-1 mb-4">
        {(['star', 'delta'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setSelected(null) }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              mode === m
                ? m === 'star' ? 'bg-amber-500/30 border border-amber-500/60 text-amber-300' : 'bg-red-500/30 border border-red-500/60 text-red-300'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {m === 'star' ? '⭐ Hviezda (Y)' : '🔺 Trojuholník (Δ)'}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 320 220" className="w-full max-w-sm mx-auto select-none">

        {/* Supply line wires */}
        {terminals.map((t, i) => (
          <line key={i} x1={t.x} y1={30} x2={pts[i].x} y2={pts[i].y}
            stroke={t.color} strokeWidth="2" strokeDasharray="4,3" opacity="0.6" />
        ))}

        {/* Supply terminals L1/L2/L3 */}
        {terminals.map((t, i) => (
          <g key={i}>
            <circle cx={t.x} cy={30} r="9" fill={t.color} opacity="0.9" />
            <text x={t.x} y={34} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">{t.label}</text>
          </g>
        ))}

        {/* Windings */}
        {pts.map((p, i) => {
          // In delta: winding goes from pts[i] to pts[(i+1)%3]
          const q = pts[(i + 1) % 3]
          const mx = (p.x + q.x) / 2
          const my = (p.y + q.y) / 2
          // In star: winding goes from pts[i] to centre
          const sx = starCenter.x, sy = starCenter.y
          const smx = (p.x + sx) / 2, smy = (p.y + sy) / 2
          const isSel = selected?.id === `w${i}`
          return (
            <g key={i} onClick={() => pick(WINDING_INFO(i))} style={{ cursor: 'pointer' }}>
              {mode === 'star' ? (
                <>
                  <line x1={p.x} y1={p.y} x2={sx} y2={sy}
                    stroke={isSel ? '#60a5fa' : windingColors[i]}
                    strokeWidth={isSel ? 3.5 : 2.5} strokeLinecap="round" />
                  {/* winding coil symbol */}
                  <circle cx={smx} cy={smy} r="7"
                    fill={isSel ? '#1e3a5f' : '#0f172a'}
                    stroke={isSel ? '#60a5fa' : windingColors[i]}
                    strokeWidth={isSel ? 2 : 1.5} />
                  <text x={smx} y={smy + 3.5} textAnchor="middle" fill={windingColors[i]}
                    fontSize="7" fontWeight="bold" fontFamily="Inter, sans-serif">
                    {windingLabels[i]}
                  </text>
                </>
              ) : (
                <>
                  <line x1={p.x} y1={p.y} x2={q.x} y2={q.y}
                    stroke={isSel ? '#60a5fa' : windingColors[i]}
                    strokeWidth={isSel ? 3.5 : 2.5} strokeLinecap="round" />
                  <circle cx={mx} cy={my} r="8"
                    fill={isSel ? '#1e3a5f' : '#0f172a'}
                    stroke={isSel ? '#60a5fa' : windingColors[i]}
                    strokeWidth={isSel ? 2 : 1.5} />
                  <text x={mx} y={my + 3.5} textAnchor="middle" fill={windingColors[i]}
                    fontSize="7" fontWeight="bold" fontFamily="Inter, sans-serif">
                    {windingLabels[i]}
                  </text>
                </>
              )}
            </g>
          )
        })}

        {/* Winding endpoint dots */}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill={windingColors[i]} />
        ))}

        {/* Star centre dot + N label */}
        {mode === 'star' && (
          <g onClick={() => pick(STAR_INFO)} style={{ cursor: 'pointer' }}>
            <circle cx={cx} cy={cy} r="9" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
            <text x={cx} y={cy + 4} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Inter, sans-serif">N</text>
          </g>
        )}

        {/* Delta corner dots */}
        {mode === 'delta' && pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5.5" fill="#334155" stroke={windingColors[i]} strokeWidth="1.5" />
        ))}

        {/* Voltage labels */}
        <text x="5" y="210" fill="#475569" fontSize="8" fontFamily="Inter, sans-serif">
          {mode === 'star' ? 'U_vinutia = 231 V  |  Spoj: Y' : 'U_vinutia = 400 V  |  Spoj: Δ'}
        </text>
      </svg>

      <p className="text-center text-xs text-slate-500 mt-1 mb-3">
        Klikni na <span className="text-amber-400 font-medium">vinutia</span> pre detaily
        {mode === 'star' && <> • <span className="text-slate-400 font-medium">N</span> pre info o hviezde</>}
      </p>

      {/* Explanation cards */}
      <div className="space-y-2 mt-2">
        {/* When to use */}
        <div
          className="rounded-xl bg-slate-800/60 border border-slate-700/50 p-3 cursor-pointer"
          onClick={() => pick(SWITCH_INFO)}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">⏱️</span>
            <span className="text-sm font-bold text-white">Kedy sa používa Y–Δ štart?</span>
            <span className="ml-auto text-xs text-slate-500">klikni pre vzorce</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Pri motoroch s <span className="text-white font-medium">väčším výkonom (≥ 4 kW)</span>, kde priamy rozjazd spôsobí
            veľký záberový prúd (5–8× menovitý). Hviezda znižuje prúd na <span className="text-amber-300 font-medium">1/3</span>, potom
            sa prepne na trojuholník pre plný výkon.
          </p>
        </div>

        {/* Comparison table */}
        <div className="rounded-xl bg-slate-800/60 border border-slate-700/50 p-3">
          <p className="text-xs font-bold text-slate-300 mb-2">📊 Porovnanie Y vs Δ</p>
          <div className="grid grid-cols-3 gap-1 text-xs">
            <div className="text-slate-500 font-medium">Vlastnosť</div>
            <div className="text-amber-400 font-bold text-center">⭐ Hviezda</div>
            <div className="text-red-400 font-bold text-center">🔺 Trojuholník</div>

            <div className="text-slate-400 py-1 border-t border-slate-700/50">Napätie na vinutí</div>
            <div className="text-white text-center py-1 border-t border-slate-700/50">231 V</div>
            <div className="text-white text-center py-1 border-t border-slate-700/50">400 V</div>

            <div className="text-slate-400 py-1 border-t border-slate-700/50">Záberový prúd</div>
            <div className="text-green-400 text-center py-1 border-t border-slate-700/50">~1/3 × I_Δ</div>
            <div className="text-red-300 text-center py-1 border-t border-slate-700/50">plný</div>

            <div className="text-slate-400 py-1 border-t border-slate-700/50">Záberový moment</div>
            <div className="text-amber-300 text-center py-1 border-t border-slate-700/50">~1/3 × M_Δ</div>
            <div className="text-red-300 text-center py-1 border-t border-slate-700/50">plný</div>

            <div className="text-slate-400 py-1 border-t border-slate-700/50">Využitie</div>
            <div className="text-green-400 text-center py-1 border-t border-slate-700/50">nábeh</div>
            <div className="text-blue-300 text-center py-1 border-t border-slate-700/50">beh</div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && <InfoPanel part={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ─── DOL Diagram ──────────────────────────────────────────────────────────────

function DOLDiagram() {
  const [running, setRunning] = useState(false)
  const [selected, setSelected] = useState<Part | null>(null)

  function pick(p: Part) { setSelected(prev => prev?.id === p.id ? null : p) }
  const W = running ? W_ON : W_OFF

  const STOP_BTN: Part = {
    id: 'stop', label: 'Tlačidlo STOP (NC)', icon: '🔴',
    description: 'Normálne-uzavretý (NC) kontakt. V pokoji prepúšťa prúd. Stlačením preruší ovládací obvod → stýkač KM sa odpadne → motor sa zastaví. Zapojuje sa do série.',
    formula: 'Typ: NC (normally closed)\nZapojenie: séria s ovládacím obvodom',
    value: 'Bezpečnostný prvok — musí byť vždy funkčný',
  }
  const START_BTN: Part = {
    id: 'start', label: 'Tlačidlo START (NO)', icon: '🟢',
    description: 'Normálne-otvorený (NO) kontakt. Stlačením uzavrie ovládací obvod → cievka KM dostane napätie → stýkač pritiahne. Po pustení tlačidla obvod drží pomocný kontakt KM (samodržanie).',
    formula: 'Typ: NO (normally open)\nSamordžanie: pomocný kontakt KM paralel. s tlačidlom START',
    value: 'Impulzné ovládanie + samodržanie',
  }
  const KM: Part = {
    id: 'km', label: 'Stýkač KM (contactor)', icon: '⚡',
    description: 'Elektromagnetický spínač s tromi silovými kontaktmi (L1→T1, L2→T2, L3→T3) a pomocnými kontaktmi. Cievka (230 V alebo 400 V) riadi pritiahnutie kontaktov. Určený na časté spínanie.',
    formula: 'P_kontakt: podľa veľkosti AC1/AC3\nCievka: 230 V AC typicky\nSpínací cyklus: až 1 500 000×',
    value: 'AC3 kategória — spínanie asynchr. motora',
  }
  const RELAY: Part = {
    id: 'relay', label: 'Tepelné relé FR', icon: '🌡️',
    description: 'Chráni motor pred preťažením. Bimetalové pásky sa ohrievajú prúdom motora — pri prekročení nastaveného prúdu (In motora) relé vypne. Nastaví sa na menovitý prúd motora.',
    formula: 'Nastavenie: In motora (z typového štítku)\nTripping class: 10A typicky\nReset: manuálny alebo automatický',
    value: 'Nastaviť na In = menovitý prúd motora',
  }
  const MOTOR: Part = {
    id: 'motor', label: 'Asynchrónny motor 3~ ', icon: '🔄',
    description: 'Trojfázový asynchrónny motor s kotvou nakrátko (squirrel cage). Pri priamom rozjazde (DOL) dostane okamžite plné sieťové napätie → záberový prúd 5–8× menovitý prúd, záberový moment 100–200 % menovitého.',
    formula: 'I_záber ≈ 5–8 × In\nM_záber ≈ 1,0–2,0 × Mn\nVhodné pre: malé motory < 4 kW (alebo sieť to unesie)',
    value: 'Priamy rozjazd — najjednoduchší spôsob',
  }

  return (
    <div>
      <svg viewBox="0 0 340 260" className="w-full max-w-sm mx-auto select-none">

        {/* ── Power circuit (left column) ── */}
        {/* L1 L2 L3 supply */}
        {[0,1,2].map(i => {
          const x = 30 + i*28
          const col = ['#ef4444','#f59e0b','#22c55e'][i]
          return (
            <g key={i}>
              <circle cx={x} cy={18} r={8} fill={col} />
              <text x={x} y={22} textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Inter">L{i+1}</text>
              <line x1={x} y1={26} x2={x} y2={50} stroke={W} strokeWidth="2" strokeLinecap="round" />
            </g>
          )
        })}

        {/* Stýkač KM — power contacts */}
        <g onClick={() => pick(KM)} style={{cursor:'pointer'}}>
          <rect x="14" y="50" width="100" height="28" rx="6"
            fill={selected?.id==='km' ? '#1e293b' : '#0f172a'}
            stroke={selected?.id==='km' ? '#60a5fa' : (running ? W_ON : '#334155')}
            strokeWidth={selected?.id==='km' ? 2.5 : 1.5} />
          <text x="64" y="59" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Inter">KM</text>
          <text x="64" y="71" textAnchor="middle" fill={running ? '#4ade80' : '#64748b'} fontSize="7.5" fontFamily="Inter">
            {running ? 'pritiahnutý' : 'odpadnutý'}
          </text>
        </g>

        {/* Wires after KM */}
        {[0,1,2].map(i => {
          const x = 30 + i*28
          return <line key={i} x1={x} y1={78} x2={x} y2={100} stroke={W} strokeWidth="2" strokeLinecap="round" />
        })}

        {/* Tepelné relé FR */}
        <g onClick={() => pick(RELAY)} style={{cursor:'pointer'}}>
          <rect x="14" y="100" width="100" height="28" rx="6"
            fill={selected?.id==='relay' ? '#1e293b' : '#0f172a'}
            stroke={selected?.id==='relay' ? '#f59e0b' : '#334155'}
            strokeWidth={selected?.id==='relay' ? 2.5 : 1.5} />
          <text x="64" y="109" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Inter">FR</text>
          <text x="64" y="121" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="Inter">tepelné relé</text>
        </g>

        {[0,1,2].map(i => {
          const x = 30 + i*28
          return <line key={i} x1={x} y1={128} x2={x} y2={152} stroke={W} strokeWidth="2" strokeLinecap="round" />
        })}

        {/* Motor */}
        <g onClick={() => pick(MOTOR)} style={{cursor:'pointer'}}>
          <circle cx="64" cy="175" r="26"
            fill={selected?.id==='motor' ? '#0c1a2e' : '#080e1a'}
            stroke={selected?.id==='motor' ? '#60a5fa' : (running ? W_ON : '#334155')}
            strokeWidth={selected?.id==='motor' ? 2.5 : 2} />
          <text x="64" y="171" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Inter">M</text>
          <text x="64" y="183" textAnchor="middle" fill="#94a3b8" fontSize="7" fontFamily="Inter">3~</text>
          {running && (
            <>
              <path d="M 64,149 A 26,26 0 0,1 88,175" fill="none" stroke="#4ade80" strokeWidth="2.5"
                strokeLinecap="round" markerEnd="url(#arrowM)" />
              <defs>
                <marker id="arrowM" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 Z" fill="#4ade80" />
                </marker>
              </defs>
            </>
          )}
        </g>

        {/* ── Control circuit (right column) ── */}
        {/* N rail */}
        <line x1="290" y1="30" x2="290" y2="230" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5" />
        <text x="290" y="22" textAnchor="middle" fill="#60a5fa" fontSize="8" fontFamily="Inter">N</text>
        {/* L rail */}
        <line x1="160" y1="30" x2="160" y2="50" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
        <text x="160" y="22" textAnchor="middle" fill="#ef4444" fontSize="8" fontFamily="Inter">L</text>

        {/* STOP button */}
        <g onClick={() => pick(STOP_BTN)} style={{cursor:'pointer'}}>
          <rect x="150" y="50" width="50" height="22" rx="5"
            fill={selected?.id==='stop' ? '#450a0a' : '#1c0a0a'}
            stroke={selected?.id==='stop' ? '#f87171' : '#7f1d1d'} strokeWidth="1.5" />
          <text x="175" y="63" textAnchor="middle" fill="#fca5a5" fontSize="8.5" fontWeight="bold" fontFamily="Inter">STOP</text>
        </g>
        <text x="205" y="63" fill="#64748b" fontSize="7" fontFamily="Inter">NC</text>
        <line x1="160" y1="72" x2="160" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="200" y1="61" x2="240" y2="61" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="240" y1="61" x2="240" y2="85" stroke="#94a3b8" strokeWidth="1.5" />

        {/* START button */}
        <g onClick={() => pick(START_BTN)} style={{cursor:'pointer'}}>
          <rect x="150" y="85" width="50" height="22" rx="5"
            fill={selected?.id==='start' ? '#052e16' : '#0a1a0e'}
            stroke={selected?.id==='start' ? '#4ade80' : '#14532d'} strokeWidth="1.5" />
          <text x="175" y="99" textAnchor="middle" fill="#86efac" fontSize="8.5" fontWeight="bold" fontFamily="Inter">START</text>
        </g>
        <text x="205" y="98" fill="#64748b" fontSize="7" fontFamily="Inter">NO</text>

        {/* Self-hold contact (parallel to START) */}
        <line x1="240" y1="85" x2="270" y2="85" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="270" y1="85" x2="270" y2="107" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />
        <rect x="255" y="107" width="30" height="14" rx="3"
          fill="#0f172a" stroke={running ? W_ON : '#334155'} strokeWidth="1" />
        <text x="270" y="118" textAnchor="middle" fill={running ? '#4ade80' : '#64748b'} fontSize="6.5" fontFamily="Inter">KM aux</text>
        <line x1="270" y1="121" x2="270" y2="140" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2" />
        <line x1="200" y1="107" x2="240" y2="107" stroke="#94a3b8" strokeWidth="1" />

        {/* KM coil */}
        <line x1="160" y1="107" x2="160" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="200" y1="107" x2="160" y2="107" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="240" y1="140" x2="160" y2="140" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="155" y="140" width="90" height="22" rx="5"
          fill={running ? '#0c1f0c' : '#0f172a'}
          stroke={running ? W_ON : '#334155'} strokeWidth="1.5" />
        <text x="200" y="152" textAnchor="middle" fill={running ? '#4ade80' : '#94a3b8'} fontSize="8.5" fontWeight="bold" fontFamily="Inter">
          KM cievka
        </text>
        <line x1="200" y1="162" x2="200" y2="175" stroke="#94a3b8" strokeWidth="1.5" />

        {/* FR NC contact in control circuit */}
        <rect x="155" y="175" width="90" height="20" rx="4"
          fill="#0f172a" stroke="#334155" strokeWidth="1" />
        <text x="200" y="188" textAnchor="middle" fill="#f59e0b" fontSize="7.5" fontFamily="Inter">FR (NC kontakt)</text>
        <line x1="200" y1="195" x2="200" y2="210" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="200" y1="210" x2="290" y2="210" stroke="#94a3b8" strokeWidth="1.5" />

        {/* Label */}
        <text x="170" y="250" textAnchor="middle" fill="#334155" fontSize="7.5" fontFamily="Inter">Silový obvod</text>
        <text x="225" y="250" textAnchor="middle" fill="#334155" fontSize="7.5" fontFamily="Inter">Ovládací obvod</text>
        <line x1="128" y1="235" x2="128" y2="255" stroke="#334155" strokeWidth="1" strokeDasharray="3,2" />
      </svg>

      <div className="flex justify-center mt-1 mb-3">
        <button
          onClick={() => { setRunning(r => !r); setSelected(null) }}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
            running
              ? 'bg-green-500/20 border-green-500/50 text-green-400'
              : 'bg-slate-700/50 border-slate-600 text-slate-400'
          }`}
        >
          {running ? '🟢 Motor BEŽÍ' : '🔴 Motor STOJÍ'} — klikni
        </button>
      </div>
      <p className="text-center text-xs text-slate-500 mb-3">Klikni na súčiastky pre detaily</p>

      <AnimatePresence>
        {selected && <InfoPanel part={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ─── Reversal Diagram ─────────────────────────────────────────────────────────

function ReversalDiagram() {
  const [dir, setDir] = useState<'off' | 'fwd' | 'rev'>('off')
  const [selected, setSelected] = useState<Part | null>(null)
  function pick(p: Part) { setSelected(prev => prev?.id === p.id ? null : p) }

  const fwdActive = dir === 'fwd'
  const revActive = dir === 'rev'

  const C = { L1: '#ef4444', L2: '#f59e0b', L3: '#22c55e', off: '#475569' }

  // Which colour reaches motor terminal U/V/W
  //   VPRED: L1→U  L2→V  L3→W   (straight)
  //   VZAD:  L3→U  L2→V  L1→W   (L1 and L3 swapped)
  const uCol = fwdActive ? C.L1 : revActive ? C.L3 : C.off
  const vCol = fwdActive ? C.L2 : revActive ? C.L2 : C.off
  const wCol = fwdActive ? C.L3 : revActive ? C.L1 : C.off

  const KM1: Part = {
    id: 'km1', label: 'Stýkač KM1 — VPRED', icon: '➡️',
    description:
      'KM1 pripája fázy priamo v poradí L1→U, L2→V, L3→W. Motor sa otáča dopredu. ' +
      'KM2 musí byť v tomto čase odpadnutý — blokuje to NC kontakt KM1 v obvode cievky KM2.',
    formula: 'Vpred: L1→U  L2→V  L3→W\nNC kontakt KM1 blokuje cievku KM2',
    value: 'Sled fáz: L1-L2-L3',
  }
  const KM2: Part = {
    id: 'km2', label: 'Stýkač KM2 — VZAD', icon: '⬅️',
    description:
      'KM2 obracia sled fáz zámenou L1 a L3: L3→U, L2→V, L1→W. ' +
      'Tým sa otočí smer rotujúceho magnetického poľa statora a motor ide opačným smerom.',
    formula: 'Vzad: L3→U  L2→V  L1→W\nNC kontakt KM2 blokuje cievku KM1',
    value: 'Sled fáz: L3-L2-L1 (obrátený)',
  }
  const BLOCK: Part = {
    id: 'block', label: 'Elektrická blokovka (interlocking)', icon: '🔒',
    description:
      'Ochrana pred súčasným zopnutím KM1 a KM2, čo by spôsobilo skrat fáz L1 a L3. ' +
      'Realizuje sa NC pomocnými kontaktmi: NC kontakt KM1 je v sérii s cievkou KM2 a naopak. ' +
      'Voliteľne sa pridáva aj mechanická blokovka (páka).',
    formula: 'KM1 (NC) → séria s cievkou KM2\nKM2 (NC) → séria s cievkou KM1',
    value: 'Nikdy oba stýkače súčasne!',
  }
  const MOTOR_R: Part = {
    id: 'motorR', label: 'Asynchrónny motor 3~', icon: '🔄',
    description:
      'Smer rotácie závisí od sledu fáz na svorkách U-V-W. ' +
      'Zámenou ľubovoľných dvoch fáz sa zmení smer otáčania magnetického poľa statora. ' +
      'Pred reverzáciou je odporúčané motor zastaviť (inak: I až 15× In a mechanický ráz).',
    formula: 'Zmena 2 fáz → opačný smer\nI_reverzácia ≈ 15 × In (priama)\nOdporúča sa: STOP → čakaj → VZAD',
    value: 'Smer = sled fáz na U-V-W',
  }

  const phaseW = (on: boolean) => on ? 3 : 1.5
  const phaseOp = (on: boolean) => on ? 1 : 0.25

  return (
    <div>
      {/* ── Phase connection table ── */}
      <div className="rounded-xl bg-slate-900/70 border border-slate-700/50 p-3 mb-4">
        <p className="text-xs text-slate-500 mb-2 text-center">Zapojenie fáz na svorky motora</p>
        <div className="grid grid-cols-4 gap-1 text-xs text-center">
          <div className="text-slate-500 font-medium py-1">Svorka</div>
          <div className="font-bold py-1" style={{color: '#ef4444'}}>U</div>
          <div className="font-bold py-1" style={{color: '#f59e0b'}}>V</div>
          <div className="font-bold py-1" style={{color: '#22c55e'}}>W</div>

          <div className="text-green-400 font-medium py-1 border-t border-slate-700/50">VPRED ➡️</div>
          <div className="py-1 border-t border-slate-700/50 font-bold" style={{color:'#ef4444'}}>L1</div>
          <div className="py-1 border-t border-slate-700/50 font-bold" style={{color:'#f59e0b'}}>L2</div>
          <div className="py-1 border-t border-slate-700/50 font-bold" style={{color:'#22c55e'}}>L3</div>

          <div className="text-amber-400 font-medium py-1 border-t border-slate-700/50">VZAD ⬅️</div>
          <div className="py-1 border-t border-slate-700/50 font-bold" style={{color:'#22c55e'}}>L3 ↕</div>
          <div className="py-1 border-t border-slate-700/50 font-bold" style={{color:'#f59e0b'}}>L2</div>
          <div className="py-1 border-t border-slate-700/50 font-bold" style={{color:'#ef4444'}}>L1 ↕</div>
        </div>
        <p className="text-xs text-slate-600 text-center mt-1.5">L1 a L3 sú vymenené → obrátený sled fáz</p>
      </div>

      {/* ── SVG schematic ── */}
      <svg viewBox="0 0 300 260" className="w-full max-w-sm mx-auto select-none">

        {/* ── Supply bar L1/L2/L3 at top ── */}
        {[
          { label:'L1', x:60,  col: C.L1 },
          { label:'L2', x:115, col: C.L2 },
          { label:'L3', x:170, col: C.L3 },
        ].map(({ label, x, col }) => (
          <g key={label}>
            <circle cx={x} cy={20} r={10} fill={col} />
            <text x={x} y={24} textAnchor="middle" fill="white" fontSize="8.5" fontWeight="bold" fontFamily="Inter">{label}</text>
            {/* down to bus node */}
            <line x1={x} y1={30} x2={x} y2={50} stroke={col} strokeWidth="2" strokeLinecap="round" />
            {/* horizontal bus */}
          </g>
        ))}
        {/* Bus rail */}
        <line x1="60" y1="50" x2="170" y2="50" stroke="#475569" strokeWidth="1.5" />

        {/* ── KM1 (left) ── */}
        {/* Feed lines from bus to KM1 */}
        {[
          { bx:60, tx:60, col: C.L1 },
          { bx:115, tx:95, col: C.L2 },
          { bx:170, tx:130, col: C.L3 },
        ].map(({ bx, tx, col }, i) => (
          <g key={`km1in-${i}`}>
            <line x1={bx} y1={50} x2={tx} y2={68}
              stroke={fwdActive ? col : C.off}
              strokeWidth={phaseW(fwdActive)} strokeLinecap="round"
              opacity={phaseOp(fwdActive)} />
          </g>
        ))}

        <g onClick={() => pick(KM1)} style={{cursor:'pointer'}}>
          <rect x="35" y="68" width="115" height="34" rx="7"
            fill={selected?.id==='km1' ? '#0f2a1a' : '#0a1a0c'}
            stroke={selected?.id==='km1' ? '#60a5fa' : fwdActive ? '#4ade80' : '#1e4028'}
            strokeWidth={fwdActive ? 2.5 : 1.5} />
          <text x="93" y="80" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Inter">KM1  ➡️ VPRED</text>
          <text x="93" y="93" textAnchor="middle"
            fill={fwdActive ? '#4ade80' : '#475569'} fontSize="8" fontFamily="Inter">
            {fwdActive ? 'pritiahnutý ✓' : 'odpadnutý'}
          </text>
        </g>

        {/* KM1 output wires → straight to motor U V W */}
        {[
          { x: 60,  uCol },
          { x: 95,  vCol: vCol },
          { x: 130, wCol: wCol },
        ].map((_,i) => {
          const x = [60, 95, 130][i]
          const col = [uCol, vCol, wCol][i]
          return (
            <line key={`km1out-${i}`} x1={x} y1={102} x2={x} y2={140}
              stroke={fwdActive ? col : C.off}
              strokeWidth={phaseW(fwdActive)} strokeLinecap="round"
              opacity={phaseOp(fwdActive)} />
          )
        })}

        {/* ── Blokovka annotation ── */}
        <g onClick={() => pick(BLOCK)} style={{cursor:'pointer'}}>
          <rect x="195" y="78" width="90" height="24" rx="6"
            fill="#1c1400" stroke="#92400e" strokeWidth="1.5" />
          <text x="240" y="88" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold" fontFamily="Inter">🔒 BLOKOVKA</text>
          <text x="240" y="98" textAnchor="middle" fill="#92400e" fontSize="7" fontFamily="Inter">KM1 blok. KM2</text>
        </g>
        {/* arrow to KM1 */}
        <line x1="195" y1="90" x2="151" y2="85" stroke="#92400e" strokeWidth="1" markerEnd="url(#arrowOrange)" />
        <defs>
          <marker id="arrowOrange" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill="#92400e" />
          </marker>
        </defs>

        {/* ── KM2 (right) ── */}
        {/* Feed lines from bus, L1 and L3 SWAPPED */}
        {[
          { bx:60,  tx:200, col: C.L1 },  // L1 goes to right output (W)
          { bx:115, tx:230, col: C.L2 },  // L2 straight (V)
          { bx:170, tx:260, col: C.L3 },  // L3 goes to left output (U)
        ].map(({ bx, tx, col }, i) => (
          <line key={`km2in-${i}`}
            x1={bx} y1={50} x2={tx} y2={145}
            stroke={revActive ? col : C.off}
            strokeWidth={phaseW(revActive)} strokeLinecap="round"
            opacity={phaseOp(revActive)}
            strokeDasharray={revActive ? '' : '4,3'} />
        ))}

        <g onClick={() => pick(KM2)} style={{cursor:'pointer'}}>
          <rect x="185" y="145" width="105" height="34" rx="7"
            fill={selected?.id==='km2' ? '#1a1000' : '#0f0a00'}
            stroke={selected?.id==='km2' ? '#60a5fa' : revActive ? '#fbbf24' : '#3d2e00'}
            strokeWidth={revActive ? 2.5 : 1.5} />
          <text x="237" y="157" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Inter">KM2  ⬅️ VZAD</text>
          <text x="237" y="170" textAnchor="middle"
            fill={revActive ? '#fbbf24' : '#475569'} fontSize="8" fontFamily="Inter">
            {revActive ? 'pritiahnutý ✓' : 'odpadnutý'}
          </text>
        </g>

        {/* KM2 output wires → swapped to motor U V W */}
        {/* L3→U(60), L2→V(95), L1→W(130): draw from km2 outputs down to motor level */}
        {[
          { kmx: 260, mx: 60, col: revActive ? C.L3 : C.off },  // L3→U
          { kmx: 230, mx: 95, col: revActive ? C.L2 : C.off },  // L2→V
          { kmx: 200, mx: 130, col: revActive ? C.L1 : C.off }, // L1→W
        ].map(({ kmx, mx, col }, i) => (
          <line key={`km2out-${i}`}
            x1={kmx} y1={179} x2={mx} y2={210}
            stroke={col}
            strokeWidth={phaseW(revActive)} strokeLinecap="round"
            opacity={phaseOp(revActive)} />
        ))}

        {/* ── Junction rail for motor inputs ── */}
        <line x1="60" y1="210" x2="130" y2="210" stroke="#334155" strokeWidth="1.5" />

        {/* Motor terminal labels U V W */}
        {[
          { x: 60,  label: 'U', col: uCol },
          { x: 95,  label: 'V', col: vCol },
          { x: 130, label: 'W', col: wCol },
        ].map(({ x, label, col }) => (
          <g key={`term-${label}`}>
            <circle cx={x} cy={210} r={7}
              fill={dir !== 'off' ? col : '#1e293b'}
              stroke={dir !== 'off' ? col : '#334155'} strokeWidth="1" />
            <text x={x} y={214} textAnchor="middle" fill="white" fontSize="7.5" fontWeight="bold" fontFamily="Inter">{label}</text>
          </g>
        ))}

        {/* ── Motor ── */}
        <g onClick={() => pick(MOTOR_R)} style={{cursor:'pointer'}}>
          <circle cx="95" cy="238" r="20"
            fill={selected?.id==='motorR' ? '#0c1a2e' : '#080e1a'}
            stroke={
              selected?.id==='motorR' ? '#60a5fa'
              : fwdActive ? '#4ade80'
              : revActive ? '#fbbf24'
              : '#334155'
            }
            strokeWidth={selected?.id==='motorR' ? 2.5 : 2} />
          <text x="95" y="234" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Inter">M</text>
          <text x="95" y="244" textAnchor="middle" fill="#94a3b8" fontSize="6.5" fontFamily="Inter">3~</text>
        </g>
        {/* motor connection wires */}
        {[60, 95, 130].map((x, i) => (
          <line key={`mwire-${i}`} x1={x} y1={217} x2={x === 95 ? 95 : (x < 95 ? 82 : 108)} y2={220}
            stroke={[uCol, vCol, wCol][i]}
            strokeWidth={phaseW(dir !== 'off')} strokeLinecap="round"
            opacity={phaseOp(dir !== 'off')} />
        ))}

        {/* rotation arrow on motor */}
        {dir !== 'off' && (
          <path
            d={fwdActive
              ? 'M82,220 A14,14 0 1,1 108,220'
              : 'M108,220 A14,14 0 1,1 82,220'}
            fill="none"
            stroke={fwdActive ? '#4ade80' : '#fbbf24'}
            strokeWidth="2.5" strokeLinecap="round"
            markerEnd={fwdActive ? 'url(#arrowFwd)' : 'url(#arrowRev)'}
          />
        )}
        <defs>
          <marker id="arrowFwd" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill="#4ade80" />
          </marker>
          <marker id="arrowRev" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill="#fbbf24" />
          </marker>
        </defs>

        {/* swap label */}
        {revActive && (
          <text x="163" y="115" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold" fontFamily="Inter">L1 ↔ L3</text>
        )}
      </svg>

      {/* Direction controls */}
      <div className="flex gap-2 justify-center mt-2 mb-3">
        {(['off','fwd','rev'] as const).map(d => (
          <button key={d}
            onClick={() => { setDir(d); setSelected(null) }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              dir === d
                ? d === 'off'  ? 'bg-slate-700 border-slate-500 text-slate-300'
                : d === 'fwd'  ? 'bg-green-500/20 border-green-500/50 text-green-400'
                               : 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                : 'bg-slate-800/50 border-slate-700 text-slate-500'
            }`}
          >
            {d === 'off' ? '⏹ STOP' : d === 'fwd' ? '➡️ VPRED' : '⬅️ VZAD'}
          </button>
        ))}
      </div>

      {/* Blokovka explanation card */}
      <div
        className="rounded-xl bg-slate-800/60 border border-amber-900/40 p-3 cursor-pointer mb-2"
        onClick={() => pick(BLOCK)}
      >
        <div className="flex items-center gap-2 mb-1">
          <span>🔒</span>
          <span className="text-sm font-bold text-amber-300">Prečo blokovka?</span>
          <span className="ml-auto text-xs text-slate-500">klikni pre detail</span>
        </div>
        <p className="text-slate-400 text-xs leading-relaxed">
          KM1 a KM2 <span className="text-white font-medium">nesmú byť zopnuté súčasne</span> — priamo by skratovalo L1 a L3.
          NC kontakt každého stýkača blokuje cievku toho druhého. Pred reverzáciou vždy <span className="text-amber-300 font-medium">STOP → čakaj → opačný smer</span>.
        </p>
      </div>

      <p className="text-center text-xs text-slate-500 mb-3">Klikni na KM1 / KM2 / motor pre detaily</p>

      <AnimatePresence>
        {selected && <InfoPanel part={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ─── VFD Block Diagram ────────────────────────────────────────────────────────

function VFDDiagram() {
  const [selected, setSelected] = useState<Part | null>(null)
  const [speed, setSpeed] = useState(50)

  function pick(p: Part) { setSelected(prev => prev?.id === p.id ? null : p) }

  const GRID: Part = {
    id:'grid', label:'Sieť 3~ 400 V / 50 Hz', icon:'🏭',
    description:'Trojfázová sieť so striedavým napätím 400 V (mevfázové) a frekvenciou 50 Hz. VFD túto sieť spracuje — najprv jednosmeruje, potom znova vytvára striedavé napätie s premenlivou frekvenciou.',
    value:'400 V AC / 50 Hz vstup',
  }
  const RECT: Part = {
    id:'rect', label:'Usmerňovač (Rectifier)', icon:'⬇️',
    description:'Diódový alebo tyristorový mostík. Premení trojfázové striedavé napätie na jednosmerné. Výsledok: jednosmerná zbernica (DC bus) s napätím cca 565 V (= 400 × √2).',
    formula:'U_DC = U_AC × √2 = 400 × 1,414 ≈ 565 V\nTyp: 6-pulzný diódový mostík',
    value:'AC 400V → DC ~565V',
  }
  const DCBUS: Part = {
    id:'dcbus', label:'DC zbernica + kondenzátory', icon:'🔋',
    description:'Kondenzátory vyhladí jednosmerné napätie a uchovávajú energiu. Pri brzdení motor vracia energiu späť do DC zbernice (rekuperácia). Napätie DC zbernice musí byť stabilné.',
    formula:'C_bus: typicky stovky μF\nU_DC ≈ 565 V\nRekuperácia → brzdný odpor alebo späť do siete',
    value:'DC zbernica ≈ 565 V',
  }
  const INV: Part = {
    id:'inv', label:'Invertor (IGBT)', icon:'🔀',
    description:'Striedač so šiestimi IGBT tranzistormi generuje trojfázové striedavé napätie s premenlivou frekvenciou a amplitúdou pomocou PWM (pulzne-šírková modulácia). Frekvencia priamo určuje otáčky motora.',
    formula:'n = (f × 60) ÷ p\nn = otáčky [ot/min]\nf = frekvencia [Hz]\np = počet párov pólov\nPr.: 30 Hz, 2 páry → 900 ot/min',
    value:`Výstup: ~${Math.round(speed*0.5)} Hz → ~${Math.round(speed*0.5*60/2)} ot/min`,
  }
  const CTRL: Part = {
    id:'ctrl', label:'Riadiaca jednotka (CPU)', icon:'🧠',
    description:'Mikroprocesor riadi celý VFD: nastavenie frekvencie, rozbehovej rampy, ochrany (prúd, napätie, teplota), komunikácia (Modbus, Profibus, Ethernet). Parametre sa nastavujú cez panel alebo PC.',
    formula:'Rampovanie: t_rozjazd nastaviteľný (1–600 s)\nRegulácia: U/f, vektoring, sensorless\nOchrany: prepätie, podpätie, skrat, preťaženie',
    value:'Riadi frekvenciu, ochrany, komunikáciu',
  }
  const MOTO: Part = {
    id:'motoV', label:'Asynchrónny motor', icon:'🔄',
    description:'VFD dovoľuje plynulú zmenu otáčok bez mechanických strát (bez prevodovky). Záberový prúd je iba 1,0–1,5× menovitý (vs 5–8× pri DOL). Umožňuje aj presné riadenie momentu.',
    formula:`f_výstup ≈ ${Math.round(speed*0.5)} Hz\nn ≈ ${Math.round(speed*0.5*60/2)} ot/min (2 pár pólov)\nI_záber ≈ 1,0–1,5 × In`,
    value:`Otáčky: ~${Math.round(speed*0.5*60/2)} ot/min`,
  }

  const blocks = [
    { part: GRID,  x:10,  y:80,  w:55, h:50, col:'#1e3a5f', bc:'#3b82f6', label:'SIEŤ\n3~ 400V' },
    { part: RECT,  x:78,  y:80,  w:55, h:50, col:'#1a1a2e', bc:'#6366f1', label:'USMER-\nŇOVAČ' },
    { part: DCBUS, x:146, y:80,  w:55, h:50, col:'#1c1400', bc:'#f59e0b', label:'DC\nZBERNICA' },
    { part: INV,   x:214, y:80,  w:55, h:50, col:'#0f1f0f', bc:'#22c55e', label:'INVER-\nTOR' },
    { part: MOTO,  x:282, y:80,  w:48, h:50, col:'#080e1a', bc:'#60a5fa', label:'MOTOR\n3~' },
  ]

  return (
    <div>
      <svg viewBox="0 0 348 220" className="w-full max-w-sm mx-auto select-none">

        {/* Connecting arrows */}
        {[78,146,214,282].map((x,i) => (
          <line key={i} x1={x-1} y1={105} x2={x+1} y2={105}
            stroke="#475569" strokeWidth="8" strokeLinecap="round" />
        ))}
        {[66,134,202,270].map((x,i) => (
          <g key={i}>
            <line x1={x} y1={105} x2={x+12} y2={105} stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points={`${x+13},101 ${x+13},109 ${x+19},105`} fill="#475569" />
          </g>
        ))}

        {/* Blocks */}
        {blocks.map(({ part, x, y, w, h, col, bc, label }) => (
          <g key={part.id} onClick={() => pick(part)} style={{cursor:'pointer'}}>
            <rect x={x} y={y} width={w} height={h} rx="6"
              fill={selected?.id === part.id ? '#1e293b' : col}
              stroke={selected?.id === part.id ? '#60a5fa' : bc}
              strokeWidth={selected?.id === part.id ? 2.5 : 1.5} />
            {label.split('\n').map((line, li) => (
              <text key={li} x={x+w/2} y={y+18+li*14} textAnchor="middle"
                fill="white" fontSize="8.5" fontWeight="bold" fontFamily="Inter">{line}</text>
            ))}
          </g>
        ))}

        {/* Control unit (CPU) below */}
        <g onClick={() => pick(CTRL)} style={{cursor:'pointer'}}>
          <rect x="78" y="148" width="192" height="28" rx="6"
            fill={selected?.id==='ctrl' ? '#1e293b' : '#1a0a2e'}
            stroke={selected?.id==='ctrl' ? '#60a5fa' : '#7c3aed'}
            strokeWidth={selected?.id==='ctrl' ? 2.5 : 1.5} />
          <text x="174" y="157" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Inter">🧠 RIADIACA JEDNOTKA (CPU)</text>
          <text x="174" y="169" textAnchor="middle" fill="#a78bfa" fontSize="7.5" fontFamily="Inter">Frekv. • Rampa • Ochrany • Komunikácia</text>
        </g>
        {/* dashed lines from CPU to blocks */}
        {[110, 174, 241].map((x,i) => (
          <line key={i} x1={x} y1={148} x2={x} y2={130} stroke="#7c3aed" strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />
        ))}

        {/* Speed / frequency label */}
        <text x="241" y="74" textAnchor="middle" fill="#4ade80" fontSize="8" fontFamily="Inter">
          {Math.round(speed*0.5)} Hz
        </text>

        {/* Frequency legend */}
        <text x="174" y="195" textAnchor="middle" fill="#475569" fontSize="7.5" fontFamily="Inter">
          f = {Math.round(speed*0.5)} Hz  •  n ≈ {Math.round(speed*0.5*60/2)} ot/min  (2 pól. páry)
        </text>
      </svg>

      {/* Speed slider */}
      <div className="mt-2 mb-3 px-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-400">Frekvencia</span>
          <span className="text-xs font-bold text-green-400">{Math.round(speed*0.5)} Hz  →  {Math.round(speed*0.5*60/2)} ot/min</span>
        </div>
        <input
          type="range" min={0} max={100} value={speed}
          onChange={e => { setSpeed(Number(e.target.value)); setSelected(null) }}
          className="w-full accent-green-500 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-600 mt-0.5">
          <span>0 Hz (stop)</span><span>25 Hz</span><span>50 Hz (max)</span>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 mb-3">Klikni na bloky pre detaily • Posúvač mení frekvenciu</p>

      <AnimatePresence>
        {selected && <InfoPanel part={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  )
}

// ─── Tab IDs ──────────────────────────────────────────────────────────────────

type BasicDiagramId = 'series' | 'parallel'
type MotorDiagramId = 'star-delta' | 'dol' | 'reversal' | 'vfd'

const BASIC_DIAGRAMS = [
  { id: 'series'   as BasicDiagramId, title: 'Sériový',   subtitle: 'Spínač • Ohmov zákon • 2. Kirchhoff (KVL)', icon: '🔗' },
  { id: 'parallel' as BasicDiagramId, title: 'Paralelný', subtitle: '1. Kirchhoffov zákon (KCL) • Vetvy',        icon: '⚡' },
]

const MOTOR_DIAGRAMS = [
  { id: 'star-delta' as MotorDiagramId, title: 'Y–Δ',     subtitle: 'Y–Δ štart • napätia • moment',             icon: '⭐' },
  { id: 'dol'        as MotorDiagramId, title: 'DOL',      subtitle: 'Priamy rozjazd • stýkač • tep. relé',      icon: '▶️' },
  { id: 'reversal'   as MotorDiagramId, title: 'Reverzácia', subtitle: 'Dvojitý stýkač • blokovka • sled fáz',  icon: '🔄' },
  { id: 'vfd'        as MotorDiagramId, title: 'VFD',      subtitle: 'Frekvenčný menič • PWM • otáčky',          icon: '🎛️' },
]

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function DiagramsPage() {
  const [active, setActive] = useState<BasicDiagramId>('series')
  const [activeMotor, setActiveMotor] = useState<MotorDiagramId>('star-delta')

  const basicMeta  = BASIC_DIAGRAMS.find(d => d.id === active)!
  const motorMeta  = MOTOR_DIAGRAMS.find(d => d.id === activeMotor)!

  return (
    <div className="space-y-6 py-4">
      <div>
        <h1 className="text-2xl font-black text-white">Elektrické schémy</h1>
        <p className="text-slate-400 text-sm mt-1">Interaktívne — klikni na súčiastky</p>
      </div>

      {/* ── Section 1: Basic circuits ── */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Základné obvody</h2>

        <div className="flex rounded-xl bg-slate-800/70 p-1 gap-1">
          {BASIC_DIAGRAMS.map(d => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                active === d.id
                  ? 'bg-electric-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {d.icon} {d.title}
            </button>
          ))}
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4">
          <p className="text-xs text-slate-500 text-center mb-4">{basicMeta.subtitle}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
            >
              {active === 'series' ? <SeriesCircuit /> : <ParallelCircuit />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Section 2: Motor wiring ── */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Zapojenie motora</h2>

        <div className="grid grid-cols-4 rounded-xl bg-slate-800/70 p-1 gap-1">
          {MOTOR_DIAGRAMS.map(d => (
            <button
              key={d.id}
              onClick={() => setActiveMotor(d.id)}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                activeMotor === d.id
                  ? 'bg-electric-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div>{d.icon}</div>
              <div>{d.title}</div>
            </button>
          ))}
        </div>

        <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4">
          <p className="text-xs text-slate-500 text-center mb-4">{motorMeta.subtitle}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMotor}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18 }}
            >
              {activeMotor === 'star-delta' ? <StarDeltaDiagram />
               : activeMotor === 'dol'      ? <DOLDiagram />
               : activeMotor === 'reversal' ? <ReversalDiagram />
               :                              <VFDDiagram />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
