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

type DiagramId = 'series' | 'parallel'

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

// ─── Diagram metadata ──────────────────────────────────────────────────────────

type DiagramMeta = { id: DiagramId; title: string; subtitle: string; icon: string }

const DIAGRAMS: DiagramMeta[] = [
  { id: 'series',   title: 'Sériový obvod',   subtitle: 'Spínač • Ohmov zákon • 2. Kirchhoff (KVL)', icon: '🔗' },
  { id: 'parallel', title: 'Paralelný obvod', subtitle: '1. Kirchhoffov zákon (KCL) • Vetvy',        icon: '⚡' },
]

// ─── Main Page ─────────────────────────────────────────────────────────────────

export function DiagramsPage() {
  const [active, setActive] = useState<DiagramId>('series')
  const meta = DIAGRAMS.find(d => d.id === active)!

  return (
    <div className="space-y-5 py-4">
      <div>
        <h1 className="text-2xl font-black text-white">Elektrické schémy</h1>
        <p className="text-slate-400 text-sm mt-1">Interaktívne — klikni na súčiastky</p>
      </div>

      {/* Tab selector */}
      <div className="flex rounded-xl bg-slate-800/70 p-1 gap-1">
        {DIAGRAMS.map(d => (
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

      {/* Diagram card */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-4">
        <p className="text-xs text-slate-500 text-center mb-4">{meta.subtitle}</p>
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
    </div>
  )
}
