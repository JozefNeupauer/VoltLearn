/**
 * Ohm's Law Triangle Diagram
 * Shows V = I × R relationship with the classic triangle method
 */
export function OhmsLawDiagram() {
  return (
    <svg viewBox="0 0 320 220" className="w-full max-w-xs mx-auto" aria-label="Ohm's Law Triangle">
      <defs>
        <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="topGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Triangle outline */}
      <polygon points="160,20 20,200 300,200" fill="url(#triGrad)" stroke="#3b82f6" strokeWidth="2" />

      {/* Dividing line */}
      <line x1="90" y1="110" x2="230" y2="110" stroke="#60a5fa" strokeWidth="2" strokeDasharray="6,3" />

      {/* V - top section */}
      <polygon points="160,20 90,110 230,110" fill="url(#topGrad)" stroke="none" opacity="0.8" />
      <text x="160" y="78" textAnchor="middle" fill="white" fontSize="32" fontWeight="800" fontFamily="Inter, sans-serif">V</text>
      <text x="160" y="100" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="Inter, sans-serif">Voltage (Volts)</text>

      {/* I - bottom left */}
      <text x="90" y="165" textAnchor="middle" fill="white" fontSize="28" fontWeight="800" fontFamily="Inter, sans-serif">I</text>
      <text x="90" y="185" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Inter, sans-serif">Current (A)</text>

      {/* R - bottom right */}
      <text x="230" y="165" textAnchor="middle" fill="white" fontSize="28" fontWeight="800" fontFamily="Inter, sans-serif">R</text>
      <text x="230" y="185" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="Inter, sans-serif">Resistance (Ω)</text>

      {/* Formula hints */}
      <text x="160" y="210" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter, sans-serif">Cover the unknown ↑</text>
    </svg>
  )
}

/**
 * Basic Series Circuit diagram
 */
export function SeriesCircuitDiagram() {
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-sm mx-auto" aria-label="Series Circuit">
      {/* Wire lines */}
      <line x1="40" y1="100" x2="80" y2="100" stroke="#60a5fa" strokeWidth="2.5" />
      <line x1="140" y1="100" x2="180" y2="100" stroke="#60a5fa" strokeWidth="2.5" />
      <line x1="240" y1="100" x2="280" y2="100" stroke="#60a5fa" strokeWidth="2.5" />
      {/* top wire */}
      <line x1="40" y1="100" x2="40" y2="40" stroke="#60a5fa" strokeWidth="2.5" />
      <line x1="40" y1="40" x2="280" y2="40" stroke="#60a5fa" strokeWidth="2.5" />
      <line x1="280" y1="40" x2="280" y2="100" stroke="#60a5fa" strokeWidth="2.5" />
      {/* Arrow showing current */}
      <polygon points="160,35 155,28 165,28" fill="#22c55e" />
      <text x="160" y="26" textAnchor="middle" fill="#4ade80" fontSize="9" fontFamily="Inter">I →</text>

      {/* Battery (left) 40–80 */}
      <rect x="40" y="84" width="4" height="32" rx="1" fill="#fbbf24" />
      <rect x="50" y="90" width="4" height="20" rx="1" fill="#fbbf24" />
      <rect x="60" y="84" width="4" height="32" rx="1" fill="#fbbf24" />
      <rect x="70" y="90" width="4" height="20" rx="1" fill="#fbbf24" />
      <text x="80" y="82" fill="#fbbf24" fontSize="10" fontFamily="Inter">9V</text>

      {/* Resistor 1 */}
      <rect x="140" y="88" width="40" height="24" rx="4" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="160" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Inter">R₁</text>
      <text x="160" y="128" textAnchor="middle" fill="#93c5fd" fontSize="9" fontFamily="Inter">10Ω</text>

      {/* Resistor 2 */}
      <rect x="240" y="88" width="40" height="24" rx="4" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="260" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Inter">R₂</text>
      <text x="260" y="128" textAnchor="middle" fill="#93c5fd" fontSize="9" fontFamily="Inter">20Ω</text>

      {/* Label */}
      <text x="160" y="175" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter">
        Series Circuit: R_total = R₁ + R₂ = <tspan fill="#60a5fa">30Ω</tspan>
      </text>
    </svg>
  )
}

/**
 * Parallel Circuit diagram
 */
export function ParallelCircuitDiagram() {
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-sm mx-auto" aria-label="Parallel Circuit">
      {/* Main horizontal wires */}
      <line x1="20" y1="50" x2="300" y2="50" stroke="#60a5fa" strokeWidth="2.5" />
      <line x1="20" y1="150" x2="300" y2="150" stroke="#60a5fa" strokeWidth="2.5" />

      {/* Battery */}
      <line x1="20" y1="50" x2="20" y2="87" stroke="#60a5fa" strokeWidth="2.5" />
      <line x1="20" y1="113" x2="20" y2="150" stroke="#60a5fa" strokeWidth="2.5" />
      <rect x="13" y="87" width="7" height="26" rx="1" fill="#fbbf24" />
      <rect x="20" y="90" width="3" height="20" rx="1" fill="#fbbf24" />
      <text x="32" y="106" fill="#fbbf24" fontSize="10" fontFamily="Inter">12V</text>

      {/* Branch 1 */}
      <line x1="100" y1="50" x2="100" y2="80" stroke="#60a5fa" strokeWidth="2" />
      <rect x="82" y="80" width="36" height="40" rx="4" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="100" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Inter">R₁</text>
      <line x1="100" y1="120" x2="100" y2="150" stroke="#60a5fa" strokeWidth="2" />
      <text x="100" y="170" textAnchor="middle" fill="#93c5fd" fontSize="9" fontFamily="Inter">6Ω</text>

      {/* Branch 2 */}
      <line x1="190" y1="50" x2="190" y2="80" stroke="#60a5fa" strokeWidth="2" />
      <rect x="172" y="80" width="36" height="40" rx="4" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" />
      <text x="190" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Inter">R₂</text>
      <line x1="190" y1="120" x2="190" y2="150" stroke="#60a5fa" strokeWidth="2" />
      <text x="190" y="170" textAnchor="middle" fill="#86efac" fontSize="9" fontFamily="Inter">12Ω</text>

      {/* Branch 3 (light bulb) */}
      <line x1="280" y1="50" x2="280" y2="80" stroke="#60a5fa" strokeWidth="2" />
      <circle cx="280" cy="100" r="18" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />
      <text x="280" y="105" textAnchor="middle" fill="#fbbf24" fontSize="14" fontFamily="Inter">💡</text>
      <line x1="280" y1="118" x2="280" y2="150" stroke="#60a5fa" strokeWidth="2" />

      {/* Label */}
      <text x="160" y="192" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="Inter">
        Parallel: Same voltage (12V) across all branches
      </text>
    </svg>
  )
}

/**
 * Atom diagram showing electron flow
 */
export function AtomDiagram() {
  return (
    <svg viewBox="0 0 280 220" className="w-full max-w-xs mx-auto" aria-label="Atom Diagram">
      <defs>
        <radialGradient id="nucleusGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </radialGradient>
        <radialGradient id="electronGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
      </defs>

      {/* Nucleus */}
      <circle cx="140" cy="110" r="22" fill="url(#nucleusGrad)" />
      <text x="140" y="107" textAnchor="middle" fill="white" fontSize="9" fontFamily="Inter" fontWeight="bold">p+ n</text>
      <text x="140" y="120" textAnchor="middle" fill="#fca5a5" fontSize="8" fontFamily="Inter">Nucleus</text>

      {/* Orbit 1 */}
      <ellipse cx="140" cy="110" rx="55" ry="22" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,3" opacity="0.6" />
      <circle cx="195" cy="110" r="7" fill="url(#electronGrad)" />
      <text x="195" y="114" textAnchor="middle" fill="white" fontSize="8" fontFamily="Inter" fontWeight="bold">e-</text>

      {/* Orbit 2 */}
      <ellipse cx="140" cy="110" rx="88" ry="38" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,3" opacity="0.5" transform="rotate(45 140 110)" />
      <circle cx="178" cy="66" r="7" fill="url(#electronGrad)" />
      <text x="178" y="70" textAnchor="middle" fill="white" fontSize="8" fontFamily="Inter" fontWeight="bold">e-</text>

      {/* Orbit 3 — outermost "free" electron */}
      <ellipse cx="140" cy="110" rx="110" ry="45" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7" transform="rotate(-20 140 110)" />
      <circle cx="70" cy="80" r="9" fill="#16a34a" stroke="#4ade80" strokeWidth="1.5" />
      <text x="70" y="84" textAnchor="middle" fill="white" fontSize="8" fontFamily="Inter" fontWeight="bold">e-</text>
      <text x="50" y="70" fill="#4ade80" fontSize="8" fontFamily="Inter">Free!</text>

      {/* Arrow showing electron flow */}
      <path d="M 30,150 Q 80,170 130,160" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)" />
      <defs>
        <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 Z" fill="#22c55e" />
        </marker>
      </defs>
      <text x="80" y="185" textAnchor="middle" fill="#4ade80" fontSize="10" fontFamily="Inter">← Electron flow = Current</text>
    </svg>
  )
}

/**
 * DC Motor simplified cross-section
 */
export function DCMotorDiagram() {
  return (
    <svg viewBox="0 0 280 220" className="w-full max-w-xs mx-auto" aria-label="DC Motor">
      {/* Stator (outer ring) */}
      <circle cx="140" cy="110" r="90" fill="none" stroke="#334155" strokeWidth="16" />
      <circle cx="140" cy="110" r="90" fill="none" stroke="#1e40af" strokeWidth="2" />

      {/* North pole */}
      <path d="M 60,50 A 90,90 0 0,1 220,50" fill="#b91c1c" opacity="0.7" />
      <text x="140" y="30" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold" fontFamily="Inter">N</text>

      {/* South pole */}
      <path d="M 60,170 A 90,90 0 0,0 220,170" fill="#166534" opacity="0.7" />
      <text x="140" y="200" textAnchor="middle" fill="#86efac" fontSize="12" fontWeight="bold" fontFamily="Inter">S</text>

      {/* Rotor (armature) */}
      <circle cx="140" cy="110" r="50" fill="#1e293b" stroke="#475569" strokeWidth="2" />

      {/* Rotor windings */}
      <rect x="115" y="85" width="50" height="50" rx="4" fill="none" stroke="#3b82f6" strokeWidth="2" transform="rotate(20 140 110)" />
      <rect x="115" y="85" width="50" height="50" rx="4" fill="none" stroke="#22c55e" strokeWidth="2" transform="rotate(70 140 110)" />

      {/* Shaft */}
      <circle cx="140" cy="110" r="8" fill="#64748b" />
      <circle cx="140" cy="110" r="4" fill="#cbd5e1" />

      {/* Commutator */}
      <rect x="130" y="60" width="20" height="10" rx="2" fill="#d97706" stroke="#fbbf24" strokeWidth="1" />
      <text x="175" y="68" fill="#fbbf24" fontSize="9" fontFamily="Inter">Comm.</text>

      {/* Brushes */}
      <rect x="116" y="56" width="12" height="18" rx="2" fill="#374151" stroke="#6b7280" strokeWidth="1" />
      <rect x="152" y="56" width="12" height="18" rx="2" fill="#374151" stroke="#6b7280" strokeWidth="1" />

      {/* Rotation arrow */}
      <path d="M 100,65 A 45,45 0 0,1 180,65" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)" />
      <defs>
        <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 Z" fill="#f59e0b" />
        </marker>
      </defs>
      <text x="140" y="118" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="Inter">Rotation</text>
    </svg>
  )
}

/**
 * Wire color code diagram (EU standard)
 */
export function WireColorDiagram() {
  const wires = [
    { color: '#92400e', label: 'Brown (L1 — Live)', y: 30 },
    { color: '#1f2937', label: 'Black (L2 — Live)', y: 65 },
    { color: '#6b7280', label: 'Grey (L3 — Live)',  y: 100 },
    { color: '#1d4ed8', label: 'Blue (Neutral)',     y: 135 },
    { color: '#16a34a', label: 'Green/Yellow (Earth)', y: 170, stripe: true },
  ]

  return (
    <svg viewBox="0 0 260 210" className="w-full max-w-xs mx-auto" aria-label="Wire Color Codes">
      <text x="130" y="16" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="Inter" fontWeight="bold">
        EU / IEC Standard Wire Colors
      </text>
      {wires.map(({ color, label, y, stripe }) => (
        <g key={y}>
          {/* Wire cross-section */}
          <circle cx="28" cy={y} r="10" fill={color} />
          {stripe && (
            <>
              <line x1="18" y1={y - 5} x2="38" y2={y + 5} stroke="#fbbf24" strokeWidth="3" />
              <line x1="18" y1={y + 5} x2="38" y2={y - 5} stroke="#fbbf24" strokeWidth="3" />
            </>
          )}
          {/* Wire line */}
          <line x1="38" y1={y} x2="60" y2={y} stroke={color} strokeWidth="6" strokeLinecap="round" />
          {/* Label */}
          <text x="68" y={y + 4} fill="#e2e8f0" fontSize="12" fontFamily="Inter">{label}</text>
        </g>
      ))}
    </svg>
  )
}

/**
 * Safety PPE illustration
 */
export function SafetyDiagram() {
  return (
    <svg viewBox="0 0 280 200" className="w-full max-w-xs mx-auto" aria-label="Electrical Safety PPE">
      {/* Hard hat */}
      <path d="M 100,30 Q 140,10 180,30 L 185,55 Q 140,45 95,55 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
      <text x="140" y="50" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold" fontFamily="Inter">HARD HAT</text>

      {/* Face shield outline */}
      <rect x="105" y="55" width="70" height="50" rx="5" fill="#1e3a8a" opacity="0.7" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="140" y="85" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="Inter">Face Shield</text>

      {/* Body / Hi-vis vest */}
      <path d="M 95,105 L 185,105 L 195,160 L 85,160 Z" fill="#92400e" opacity="0.7" stroke="#d97706" strokeWidth="1" />
      {/* Hi-vis stripes */}
      <line x1="88" y1="130" x2="192" y2="130" stroke="#fbbf24" strokeWidth="5" />
      <line x1="88" y1="145" x2="192" y2="145" stroke="#fbbf24" strokeWidth="5" />
      <text x="140" y="120" textAnchor="middle" fill="white" fontSize="8" fontFamily="Inter">ARC RATED</text>

      {/* Left glove */}
      <path d="M 70,110 Q 55,120 58,140 Q 62,155 75,155 L 88,148 L 88,110 Z" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="63" y="175" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="Inter">LV Gloves</text>

      {/* Right glove */}
      <path d="M 210,110 Q 225,120 222,140 Q 218,155 205,155 L 192,148 L 192,110 Z" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="217" y="175" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="Inter">1000V rated</text>

      {/* Safety boots */}
      <rect x="100" y="160" width="32" height="28" rx="3" fill="#374151" stroke="#6b7280" strokeWidth="1" />
      <rect x="148" y="160" width="32" height="28" rx="3" fill="#374151" stroke="#6b7280" strokeWidth="1" />
      <text x="140" y="200" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Inter">Safety Boots</text>

      {/* Warning label */}
      <rect x="5" y="5" width="65" height="20" rx="3" fill="#dc2626" opacity="0.8" />
      <text x="38" y="18" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Inter">⚠️ LIVE WORK</text>
    </svg>
  )
}

/**
 * Multimeter diagram
 */
export function MultimeterDiagram() {
  return (
    <svg viewBox="0 0 220 280" className="w-full max-w-[180px] mx-auto" aria-label="Multimeter">
      {/* Meter body */}
      <rect x="30" y="20" width="160" height="240" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="2" />

      {/* Display */}
      <rect x="45" y="35" width="130" height="60" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1" />
      <text x="110" y="72" textAnchor="middle" fill="#4ade80" fontSize="24" fontWeight="bold" fontFamily="monospace">23.4</text>
      <text x="155" y="80" textAnchor="middle" fill="#22c55e" fontSize="11" fontFamily="monospace">V</text>

      {/* Rotary selector */}
      <circle cx="110" cy="155" r="35" fill="#0f172a" stroke="#475569" strokeWidth="2" />
      {/* Selector positions */}
      {['V~', 'V—', 'A', 'Ω', '⟳'].map((label, i) => {
        const angle = (i * 72 - 90) * (Math.PI / 180)
        const x = 110 + 24 * Math.cos(angle)
        const y = 155 + 24 * Math.sin(angle)
        return (
          <text key={label} x={x} y={y + 3} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="Inter">{label}</text>
        )
      })}
      {/* Pointer */}
      <line x1="110" y1="155" x2="110" y2="128" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" transform="rotate(-20 110 155)" />
      <circle cx="110" cy="155" r="6" fill="#3b82f6" />

      {/* Input terminals */}
      <circle cx="80" cy="225" r="10" fill="#374151" stroke="#6b7280" strokeWidth="1.5" />
      <text x="80" y="229" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="monospace">COM</text>
      <circle cx="110" cy="225" r="10" fill="#1e40af" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="110" y="229" textAnchor="middle" fill="#93c5fd" fontSize="9" fontFamily="monospace">V/Ω</text>
      <circle cx="140" cy="225" r="10" fill="#991b1b" stroke="#ef4444" strokeWidth="1.5" />
      <text x="140" y="229" textAnchor="middle" fill="#fca5a5" fontSize="9" fontFamily="monospace">A</text>

      {/* Probe leads */}
      <line x1="80" y1="235" x2="60" y2="270" stroke="#1f2937" strokeWidth="3" />
      <circle cx="60" cy="270" r="3" fill="white" />
      <line x1="110" y1="235" x2="130" y2="270" stroke="#b91c1c" strokeWidth="3" />
      <circle cx="130" cy="270" r="3" fill="#ef4444" />
    </svg>
  )
}

/**
 * Dispatcher — returns the right diagram for a given diagramType string
 */
export function DiagramByType({ type }: { type?: string }) {
  switch (type) {
    case 'atom':          return <AtomDiagram />
    case 'circuit':
    case 'series-parallel':
    case 'voltage':
    case 'resistor':      return <SeriesCircuitDiagram />
    case 'ohms-triangle':
    case 'power-triangle': return <OhmsLawDiagram />
    case 'dc-motor':
    case 'motor-control': return <DCMotorDiagram />
    case 'wire-colors':   return <WireColorDiagram />
    case 'safety':        return <SafetyDiagram />
    case 'multimeter':    return <MultimeterDiagram />
    default:
      return (
        <div className="w-full h-28 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center">
          <span className="text-slate-500 text-sm">Diagram loading…</span>
        </div>
      )
  }
}
