import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search } from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────────

type Sym = {
  id: string
  name: string
  iec: string
  category: string
  description: string
  usage: string
  svg: React.ReactNode
}

// ─── SVG helpers ───────────────────────────────────────────────────────────────

const S = '#e2e8f0'  // stroke colour

const sp = {
  fill: 'none' as const,
  stroke: S,
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}
const tp = { ...sp, strokeWidth: 2.5 }

function SymSvg({ children, vb = '0 0 80 50' }: { children: React.ReactNode; vb?: string }) {
  return (
    <svg viewBox={vb} className="w-full h-full" fill="none">
      {children}
    </svg>
  )
}

// ─── Categories ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: 'all',         label: 'Všetky' },
  { id: 'passive',     label: 'Pasívne' },
  { id: 'switches',    label: 'Spínače' },
  { id: 'protection',  label: 'Ochrany' },
  { id: 'machines',    label: 'Stroje' },
  { id: 'measurement', label: 'Meranie' },
]

// ─── Symbol definitions ────────────────────────────────────────────────────────

const SYMBOLS: Sym[] = [

  // ── Pasívne ──────────────────────────────────────────────────────────────────

  {
    id: 'resistor', name: 'Rezistor', iec: 'IEC 60617-4 · R', category: 'passive',
    description: 'Pasívny prvok obmedzujúci prietok elektrického prúdu. Hodnota v ohmoch (Ω). Ohm: R = U / I. IEC štandard znázorňuje rezistor obdĺžnikom (ANSI používa cik-cak).',
    usage: 'Obmedzovač prúdu, deliče napätia, pull-up/pull-down, záťaže v testovacích obvodoch, nastavenie zosilnenia v zosilňovačoch.',
    svg: (
      <SymSvg>
        <line x1="0"  y1="25" x2="18" y2="25" {...sp} />
        <rect x="18" y="13" width="44" height="24" rx="2" {...sp} />
        <line x1="62" y1="25" x2="80" y2="25" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'capacitor', name: 'Kondenzátor', iec: 'IEC 60617-4 · C', category: 'passive',
    description: 'Ukladá energiu v elektrickom poli medzi dvoma doskami oddelenými dielektrikom. Kapacita v Faradoch (F). Blokuje jednosmerný prúd, prepúšťa striedavý.',
    usage: 'Filtrácia napájania, oddeľovanie DC zložky pri AC signáloch, časovače RC, kompenzácia účinníka (PFC), potlačenie rušenia EMI.',
    svg: (
      <SymSvg vb="0 0 60 50">
        <line x1="0"  y1="25" x2="22" y2="25" {...sp} />
        <line x1="22" y1="8"  x2="22" y2="42" {...tp} />
        <line x1="30" y1="8"  x2="30" y2="42" {...tp} />
        <line x1="30" y1="25" x2="60" y2="25" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'inductor', name: 'Cievka (induktor)', iec: 'IEC 60617-4 · L', category: 'passive',
    description: 'Pasívny prvok ukladajúci energiu v magnetickom poli. Induktančnosť v Henry (H). Odporuje zmenám prúdu: U = L · dI/dt. Pri striedavom prúde: X_L = 2πfL.',
    usage: 'Tlmivky, filtrácia prúdu v menničoch, oddeľovacie RF cievky, motorové vinutia, transformátory.',
    svg: (
      <SymSvg>
        <line x1="0" y1="25" x2="12" y2="25" {...sp} />
        <path d="M12,25 a7,7 0 0,1 14,0" {...sp} />
        <path d="M26,25 a7,7 0 0,1 14,0" {...sp} />
        <path d="M40,25 a7,7 0 0,1 14,0" {...sp} />
        <path d="M54,25 a7,7 0 0,1 14,0" {...sp} />
        <line x1="68" y1="25" x2="80" y2="25" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'transformer', name: 'Transformátor', iec: 'IEC 60617-6 · TF', category: 'passive',
    description: 'Prenáša elektrickú energiu medzi galvanicky oddelenými obvodmi. Mení napätie pomerom závitov: U1/U2 = N1/N2. Pracuje len na striedavom prúde.',
    usage: 'Napájacie zdroje, galvanické oddelenie, merací transformátor (MTP/MTN), zváranie, SMPS invertory.',
    svg: (
      <SymSvg>
        <line x1="0"  y1="25" x2="10" y2="25" {...sp} />
        <path d="M10,25 a5,5 0 0,1 10,0" {...sp} />
        <path d="M20,25 a5,5 0 0,1 10,0" {...sp} />
        <path d="M30,25 a5,5 0 0,1 10,0" {...sp} />
        <line x1="40" y1="6"  x2="40" y2="44" {...{ ...sp, strokeDasharray: '3,2' }} />
        <path d="M42,25 a5,5 0 0,1 10,0" {...sp} />
        <path d="M52,25 a5,5 0 0,1 10,0" {...sp} />
        <path d="M62,25 a5,5 0 0,1 10,0" {...sp} />
        <line x1="72" y1="25" x2="80" y2="25" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'ground', name: 'Ochranné uzemnenie (PE)', iec: 'IEC 60417 · 5019', category: 'passive',
    description: 'Vodivé spojenie kovových krytov zariadenia so zemou cez ochranný vodič (PE). Farba vodiča: zeleno-žltá. Ochrana pred dotykovým napätím pri poruche izolácie.',
    usage: 'Každé zariadenie Triedy I — rozvádzače, motory, stroje, spotrebiče. Povinné v každej elektrickej inštalácii.',
    svg: (
      <SymSvg vb="0 0 60 50">
        <line x1="30" y1="0"  x2="30" y2="16" {...sp} />
        <line x1="8"  y1="16" x2="52" y2="16" {...tp} />
        <line x1="14" y1="24" x2="46" y2="24" {...tp} />
        <line x1="20" y1="32" x2="40" y2="32" {...tp} />
      </SymSvg>
    ),
  },

  {
    id: 'neutral-bar', name: 'Nulový vodič (N)', iec: 'IEC 60617 · N', category: 'passive',
    description: 'Neutrálna svorka – pracovný nulový vodič v TN systéme. Farba: modrá. Nesie pracovný prúd záťaže. Nie je uzemnenie — odlišný od PE!',
    usage: 'TN-C (PEN), TN-S, TT rozvodné systémy. Zásobuje jednofázové záťaže (230 V medzi L a N).',
    svg: (
      <SymSvg vb="0 0 60 50">
        <line x1="30" y1="0"  x2="30" y2="16" {...sp} />
        <line x1="8"  y1="16" x2="52" y2="16" {...tp} />
        <path d="M16,30 L30,16 L44,30" {...sp} />
      </SymSvg>
    ),
  },

  // ── Spínače & Kontakty ───────────────────────────────────────────────────────

  {
    id: 'no-contact', name: 'Spínací kontakt (NO)', iec: 'IEC 60617-7 · 07-15-01', category: 'switches',
    description: 'Normally Open — v pokojovom stave otvorený, prúd neprechádza. Po ovládaní (elektromagnetom, tlačidlom) sa zopne a prúd prechádza. Označenie: „/–".',
    usage: 'Kontakty stýkačov KM a relé K na spínanie obvodu, tlačidlá START, vstupy PLC.',
    svg: (
      <SymSvg>
        <line x1="0"  y1="35" x2="28" y2="35" {...sp} />
        <line x1="28" y1="35" x2="44" y2="14" {...sp} />
        <line x1="52" y1="35" x2="80" y2="35" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'nc-contact', name: 'Rozpínací kontakt (NC)', iec: 'IEC 60617-7 · 07-15-02', category: 'switches',
    description: 'Normally Closed — v pokojovom stave zatvorený, prúd prechádza. Po ovládaní sa rozopne a prúd zastaví. Označenie: „/–|".',
    usage: 'Blokovacie obvody (interlocking), tlačidlá STOP, tepelné relé v ovládacom obvode, núdzové vypnutie.',
    svg: (
      <SymSvg>
        <line x1="0"  y1="35" x2="28" y2="35" {...sp} />
        <line x1="28" y1="35" x2="44" y2="14" {...sp} />
        <line x1="36" y1="11" x2="50" y2="38" {...sp} />
        <line x1="52" y1="35" x2="80" y2="35" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'push-no', name: 'Tlačidlo (NO)', iec: 'IEC 60617-7 · 07-15-07', category: 'switches',
    description: 'Momentový spínač NO — zopie sa len po dobu stlačenia, po uvoľnení sa vráti do otvoreného stavu. Bez samodržania. Znázorňuje sa šípkou smerujúcou k ramenu.',
    usage: 'Tlačidlá START v silových rozvádzačoch, impulzné ovládanie, zvončeky, testovanie.',
    svg: (
      <SymSvg>
        <line x1="0"  y1="36" x2="26" y2="36" {...sp} />
        <line x1="26" y1="36" x2="40" y2="15" {...sp} />
        <line x1="34" y1="8"  x2="48" y2="8"  {...sp} />
        <line x1="41" y1="8"  x2="41" y2="18" {...sp} />
        <line x1="54" y1="36" x2="80" y2="36" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'push-nc', name: 'Tlačidlo (NC)', iec: 'IEC 60617-7 · 07-15-08', category: 'switches',
    description: 'Momentový spínač NC — v kľude zatvorený, pri stlačení rozopne. Po uvoľnení sa vráti do zatvoreného stavu. Rozlíšenie od NO: priečka na ramenu.',
    usage: 'Tlačidlá STOP, núdzové vypnutie E-STOP, reset porúch, bezpečnostné obvody.',
    svg: (
      <SymSvg>
        <line x1="0"  y1="36" x2="26" y2="36" {...sp} />
        <line x1="26" y1="36" x2="40" y2="15" {...sp} />
        <line x1="34" y1="8"  x2="48" y2="8"  {...sp} />
        <line x1="41" y1="8"  x2="41" y2="18" {...sp} />
        <line x1="34" y1="12" x2="48" y2="38" {...sp} />
        <line x1="54" y1="36" x2="80" y2="36" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'switch', name: 'Jednopólový vypínač', iec: 'IEC 60617-7', category: 'switches',
    description: 'Manuálny prepínač s trvalou polohou — zostáva zapnutý alebo vypnutý po uvoľnení. Prerušuje jeden pól (fázu) obvodu. Zaistený páčkou alebo kolískom.',
    usage: 'Svetelné obvody, napájanie zariadení, sériové zapínanie záťaží, izolačné spínače.',
    svg: (
      <SymSvg>
        <line x1="0"  y1="30" x2="24" y2="30" {...sp} />
        <line x1="24" y1="30" x2="52" y2="12" {...sp} />
        <line x1="56" y1="30" x2="80" y2="30" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'contactor-coil', name: 'Cievka stýkača / relé', iec: 'IEC 60617-7 · 07-09-01', category: 'switches',
    description: 'Elektromagnetická cievka stýkača alebo relé. Pri napätí na svorkách pritiahne jadro a prepne kontakty. Ovládacie napätie: 24 V DC, 230 V AC a pod.',
    usage: 'Cievky stýkačov KM1, KM2, relé K — základný prvok každého ovládacieho obvodu.',
    svg: (
      <SymSvg vb="0 0 70 50">
        <line x1="0"  y1="25" x2="12" y2="25" {...sp} />
        <rect x="12" y="12" width="46" height="26" rx="3" {...sp} />
        <line x1="58" y1="25" x2="70" y2="25" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'key-switch', name: 'Kľúčový spínač', iec: 'IEC 60617-7', category: 'switches',
    description: 'Spínač zaistený kľúčom alebo zámkom. Ovládanie len s autorizovaným kľúčom. Znázorňuje sa doplnkovou ešes čiarkou pri ramene kontaktu.',
    usage: 'Ovládacie panely strojov (bezpečnostné zakázanie), selektory režimov (Aut/Man/Test), prístup k rozvádzačom.',
    svg: (
      <SymSvg>
        <line x1="0"  y1="32" x2="26" y2="32" {...sp} />
        <line x1="26" y1="32" x2="42" y2="14" {...sp} />
        <circle cx="46" cy="10" r="5" {...sp} />
        <line x1="46" y1="5"  x2="46" y2="0"  {...sp} />
        <line x1="54" y1="32" x2="80" y2="32" {...sp} />
      </SymSvg>
    ),
  },

  // ── Ochranné prístroje ────────────────────────────────────────────────────────

  {
    id: 'fuse', name: 'Poistka tavná', iec: 'IEC 60617-4 · 04-02-01', category: 'protection',
    description: 'Jednorazová ochrana — vnútorný drôt sa pretaví pri prekročení menovitého prúdu a trvalo preruší obvod. Po vypnutí treba poistku vymeniť. Typy: válcová gG, kôstkový.',
    usage: 'Ochrana káblov a prívodu, rozvádzačová ochrana vedení, automobilová elektronika, riadenie frekvencií.',
    svg: (
      <SymSvg>
        <line x1="0"  y1="25" x2="14" y2="25" {...sp} />
        <rect x="14" y="13" width="52" height="24" rx="3" {...sp} />
        <line x1="14" y1="25" x2="66" y2="25" {...sp} />
        <line x1="66" y1="25" x2="80" y2="25" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'circuit-breaker', name: 'Istič (LS)', iec: 'IEC 60617-7 · 07-06-02', category: 'protection',
    description: 'Automatický ochranný vypínač s tepelnou (nadprúdovou) a magnetickou (skratovou) spúšťou. Resetovateľný — nevyžaduje výmenu. Vypínacie charakteristiky: B, C, D.',
    usage: 'Ochrana obvodov v bytových, priemyselných a komerčných rozvádzačoch. Štandardná náhrada tavných poistiek.',
    svg: (
      <SymSvg>
        <line x1="0"  y1="35" x2="20" y2="35" {...sp} />
        <line x1="20" y1="35" x2="36" y2="14" {...sp} />
        <path d="M36,14 Q44,3 52,14" {...sp} />
        <line x1="52" y1="14" x2="52" y2="35" {...sp} />
        <line x1="52" y1="35" x2="80" y2="35" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'rcd', name: 'Prúdový chránič (RCD/FI)', iec: 'IEC 60617-7', category: 'protection',
    description: 'Residual Current Device — porovnáva súčet prúdov prechádzajúcich L a N. Pri úniku prúdu ≥ 30 mA okamžite odpojí obvod a chráni ľudský život. Typy: AC, A, B.',
    usage: 'Kúpeľne, vonkajšie zásuvky, kuchyne, staveniská — všade kde existuje zvýšené nebezpečenstvo úrazu prúdom.',
    svg: (
      <SymSvg vb="0 0 80 55">
        <line x1="0"  y1="38" x2="18" y2="38" {...sp} />
        <line x1="18" y1="38" x2="32" y2="18" {...sp} />
        <line x1="50" y1="38" x2="80" y2="38" {...sp} />
        <rect x="14" y="10" width="52" height="36" rx="5" {...{ ...sp, strokeDasharray: '3,2' }} />
        <text x="40" y="36" textAnchor="middle" fill={S} fontSize="10" fontFamily="Inter" fontWeight="bold">ΔI</text>
      </SymSvg>
    ),
  },

  {
    id: 'thermal-relay', name: 'Tepelné relé', iec: 'IEC 60617-7 · 07-06-03', category: 'protection',
    description: 'Ochrana motora pred dlhodobým preťažením. Bimetalový pásik sa ohrie nadprúdom, ohne a rozopne NC kontakt v ovládacom obvode stýkača. Tripping class 10, 20.',
    usage: 'Vždy v kombinácii so stýkačom na ochranu motorov, čerpadiel, kompresorov pred prehriatím vinutia.',
    svg: (
      <SymSvg vb="0 0 80 50">
        <line x1="0"  y1="25" x2="12" y2="25" {...sp} />
        <path d="M12,25 Q18,14 24,25 Q30,36 36,25 Q42,14 48,25" {...sp} />
        <line x1="48" y1="25" x2="60" y2="25" {...sp} />
        <line x1="60" y1="25" x2="72" y2="10" {...sp} />
        <line x1="72" y1="10" x2="72" y2="25" {...sp} />
        <line x1="72" y1="25" x2="80" y2="25" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'motor-protection', name: 'Motorová ochrana (PKZ)', iec: 'IEC 60617-7', category: 'protection',
    description: 'Kombinovaný ochranný spínač motora s tepelnou (bimetal) a magnetickou (elektromagnet) spúšťou. Môže nahradiť istič + tepelné relé. Priama ochrana motora v 1 prístroji.',
    usage: 'Priama ochrana menších motorov od 0,1 kW, čerpadlá, ventilátory, kompresory v kombinovanej doske.',
    svg: (
      <SymSvg vb="0 0 80 55">
        <line x1="0"  y1="38" x2="18" y2="38" {...sp} />
        <line x1="18" y1="38" x2="32" y2="18" {...sp} />
        <path d="M32,18 Q40,6 48,18" {...sp} />
        <line x1="48" y1="18" x2="48" y2="38" {...sp} />
        <line x1="48" y1="38" x2="80" y2="38" {...sp} />
        <path d="M24,32 Q32,22 40,32 Q48,42 56,32" {...{ ...sp, strokeWidth: 1.2, strokeDasharray: '2,2' }} />
      </SymSvg>
    ),
  },

  {
    id: 'spd', name: 'Prepäťová ochrana (SPD)', iec: 'IEC 61643-1', category: 'protection',
    description: 'Surge Protective Device — odvádza energiu prepäťových impulzov (blesk, spínanie) do ochranného vodiča. Typy podľa umiestnenia: T1 (vstup), T2 (za hl. ističom), T3 (pri zariadení).',
    usage: 'Vstup domového rozvádzača (T1+T2), ochrana citlivej elektroniky — riadiace systémy, FV invertery, meracia technika (T3).',
    svg: (
      <SymSvg vb="0 0 60 60">
        <line x1="30" y1="0"  x2="30" y2="14" {...sp} />
        <polygon points="30,14 10,46 50,46" {...sp} />
        <line x1="8"  y1="48" x2="52" y2="48" {...tp} />
        <line x1="30" y1="46" x2="30" y2="60" {...sp} />
      </SymSvg>
    ),
  },

  // ── Stroje & Pohony ───────────────────────────────────────────────────────────

  {
    id: 'motor-3ph', name: 'Motor asynchrónny 3~', iec: 'IEC 60617-6 · 06-11-01', category: 'machines',
    description: 'Trojfázový asynchrónny motor (AM) — najrozšírenejší priemyselný pohon. Rýchlosť: n = (120·f / p)·(1−s). Štvorpól 50 Hz → ~1470 rpm. Rozbeh: priamy, Y-Δ, softstarter, VFD.',
    usage: 'Pumpy, ventilátory, kompresory, dopravníky, obrábacie stroje, výťahy — prakticky všetky priemyselné pohony.',
    svg: (
      <SymSvg vb="0 0 80 60">
        <circle cx="42" cy="30" r="22" {...sp} />
        <text x="42" y="27" textAnchor="middle" fill={S} fontSize="11" fontWeight="bold" fontFamily="Inter">M</text>
        <text x="42" y="40" textAnchor="middle" fill={S} fontSize="9" fontFamily="Inter">3~</text>
        <line x1="0"  y1="30" x2="20" y2="30" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'motor-1ph', name: 'Motor jednofázový 1~', iec: 'IEC 60617-6', category: 'machines',
    description: 'Jednofázový asynchrónny motor — pre rozbeh potrebuje kondenzátor (vytváraný fázový posun). Menší výkon ako trojfázový pri rovnakej veľkosti.',
    usage: 'Domáce spotrebiče, malé čerpadlá, záhradné náradie, ventilátory chladičov, klimatizácie.',
    svg: (
      <SymSvg vb="0 0 80 60">
        <circle cx="42" cy="30" r="22" {...sp} />
        <text x="42" y="27" textAnchor="middle" fill={S} fontSize="11" fontWeight="bold" fontFamily="Inter">M</text>
        <text x="42" y="40" textAnchor="middle" fill={S} fontSize="9" fontFamily="Inter">1~</text>
        <line x1="0"  y1="30" x2="20" y2="30" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'dc-motor', name: 'Motor jednosmerný DC', iec: 'IEC 60617-6', category: 'machines',
    description: 'Jednosmerný motor — rýchlosť presne riadená napätím alebo bezdotykovú (BLDC). Konštrukcia: kartáčový alebo BLDC (EC). Reverzácia: zámenou polarity napájania kotvového vinutia.',
    usage: 'Presné pohony, robotika, elektrické vozidlá, zriaďovací stroje, náhon pásových strojov.',
    svg: (
      <SymSvg vb="0 0 80 60">
        <circle cx="42" cy="30" r="22" {...sp} />
        <text x="42" y="27" textAnchor="middle" fill={S} fontSize="11" fontWeight="bold" fontFamily="Inter">M</text>
        <text x="42" y="40" textAnchor="middle" fill={S} fontSize="8" fontFamily="Inter">DC</text>
        <line x1="0"  y1="30" x2="20" y2="30" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'generator', name: 'Generátor / alternátor', iec: 'IEC 60617-6 · 06-11-02', category: 'machines',
    description: 'Premieňa mechanickú energiu na elektrickú. Trojfázový alternátor vyrába 3-fázové striedavé napätie. AVR regulátor udržiava konštantné napätie.',
    usage: 'Elektrárne (turbínový alternátor), záložné dieselové generátory, FV invertery, veterné turbíny, kogenerácia CHP.',
    svg: (
      <SymSvg vb="0 0 80 60">
        <circle cx="42" cy="30" r="22" {...sp} />
        <text x="42" y="35" textAnchor="middle" fill={S} fontSize="15" fontWeight="bold" fontFamily="Inter">G</text>
        <line x1="0"  y1="30" x2="20" y2="30" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'power-transformer', name: 'Transformátor silový', iec: 'IEC 60617-6', category: 'machines',
    description: 'Silový transformátor — prenáša veľký výkon medzi napäťovými hladinami (napr. 22 kV / 0,4 kV). Jadro z transformátorového plechu, vinutia Cu alebo Al. Chlódenie: suchý, olejový.',
    usage: 'Distribučné transformátory 22/0,4 kV, trafostanice, napájanie závodov, zálohy UPS.',
    svg: (
      <SymSvg vb="0 0 70 60">
        <path d="M4,30 a6,6 0 0,1 12,0 a6,6 0 0,1 12,0" {...sp} />
        <line x1="0"  y1="30" x2="4"  y2="30" {...sp} />
        <line x1="28" y1="30" x2="34" y2="30" {...sp} />
        <line x1="34" y1="5"  x2="34" y2="55" strokeDasharray="3,2" {...sp} />
        <line x1="34" y1="30" x2="42" y2="30" {...sp} />
        <path d="M42,30 a6,6 0 0,1 12,0 a6,6 0 0,1 12,0" {...sp} />
        <line x1="66" y1="30" x2="70" y2="30" {...sp} />
        <text x="35" y="52" textAnchor="middle" fill={S} fontSize="8" fontFamily="Inter">TR</text>
      </SymSvg>
    ),
  },

  // ── Meranie & Signalizácia ────────────────────────────────────────────────────

  {
    id: 'voltmeter', name: 'Voltmeter (V)', iec: 'IEC 60617-8', category: 'measurement',
    description: 'Meria elektrické napätie medzi dvoma uzlami obvodu. Zapája sa PARALELNE k meranému prvku. Vnútorný odpor čo najväčší (ideálne ∞) aby neovplyvňoval meranie.',
    usage: 'Kontrola napájacej siete, meranie úbytku napätia na prvkoch, diagnostika poruchy, revízne merania.',
    svg: (
      <SymSvg vb="0 0 80 60">
        <circle cx="40" cy="30" r="22" {...sp} />
        <text x="40" y="35" textAnchor="middle" fill={S} fontSize="15" fontWeight="bold" fontFamily="Inter">V</text>
        <line x1="0"  y1="30" x2="18" y2="30" {...sp} />
        <line x1="62" y1="30" x2="80" y2="30" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'ammeter', name: 'Ampérmeter (A)', iec: 'IEC 60617-8', category: 'measurement',
    description: 'Meria elektrický prúd prechádzajúci obvodom. Zapája sa SÉRIOVO do meraného obvodu. Vnútorný odpor čo najmenší (ideálne 0) aby nespôsoboval úbytok napätia.',
    usage: 'Meranie pracovného zaťaženia motora, kontrola prúdového zaťaženia káblov, detekcia preťaženia.',
    svg: (
      <SymSvg vb="0 0 80 60">
        <circle cx="40" cy="30" r="22" {...sp} />
        <text x="40" y="35" textAnchor="middle" fill={S} fontSize="15" fontWeight="bold" fontFamily="Inter">A</text>
        <line x1="0"  y1="30" x2="18" y2="30" {...sp} />
        <line x1="62" y1="30" x2="80" y2="30" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'wattmeter', name: 'Wattmeter (W)', iec: 'IEC 60617-8', category: 'measurement',
    description: 'Meria elektrický výkon P = U · I · cos φ (činný výkon). Obsahuje prúdovú cievku (sériovo) a napäťovú cievku (paralelne). Výsledok v kW / MW.',
    usage: 'Meranie spotreby záťaží, elektromery, energetická bilancia závodov, výpočet účinnosti pohonov.',
    svg: (
      <SymSvg vb="0 0 80 60">
        <circle cx="40" cy="30" r="22" {...sp} />
        <text x="40" y="35" textAnchor="middle" fill={S} fontSize="15" fontWeight="bold" fontFamily="Inter">W</text>
        <line x1="0"  y1="30" x2="18" y2="30" {...sp} />
        <line x1="62" y1="30" x2="80" y2="30" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'ohmmeter', name: 'Ohmmeter (Ω)', iec: 'IEC 60617-8', category: 'measurement',
    description: 'Meria elektrický odpor vypnutého obvodu alebo súčiastky. Nesmie sa používať v obvodoch pod napätím! Revízny prístroj meria izolačný odpor ≥ 1 MΩ.',
    usage: 'Kontrola odporov, meranie izolačného odporu (megger), diagnostika vinutia motora, kontrola káblov.',
    svg: (
      <SymSvg vb="0 0 80 60">
        <circle cx="40" cy="30" r="22" {...sp} />
        <text x="40" y="36" textAnchor="middle" fill={S} fontSize="14" fontWeight="bold" fontFamily="Inter">Ω</text>
        <line x1="0"  y1="30" x2="18" y2="30" {...sp} />
        <line x1="62" y1="30" x2="80" y2="30" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'lamp', name: 'Signálna lampa / LED', iec: 'IEC 60617-4 · 04-04-01', category: 'measurement',
    description: 'Svetelný signalizačný prvok — indikuje stav zariadenia alebo obvodu. LED verzie sú štandardom v moderných rozvádzačoch: dlhá životnosť, nízka spotreba (< 1 W).',
    usage: 'Indikácia behu motora (zelená), poruchy (červená), zapnutia napájania (biela/modrá). Riadiace panely, rozvádzače.',
    svg: (
      <SymSvg vb="0 0 60 60">
        <circle cx="30" cy="30" r="18" {...sp} />
        <line x1="19" y1="19" x2="41" y2="41" {...sp} />
        <line x1="41" y1="19" x2="19" y2="41" {...sp} />
        <line x1="30" y1="0"  x2="30" y2="12" {...sp} />
        <line x1="30" y1="48" x2="30" y2="60" {...sp} />
      </SymSvg>
    ),
  },

  {
    id: 'horn', name: 'Zvuková signalizácia (húkač)', iec: 'IEC 60617', category: 'measurement',
    description: 'Elektromagnetická siréna, húkač alebo bzučiak. Vydáva zvukový signál pri zopnutí obvodu. Napájacie napätia: 24 V DC, 230 V AC. SPL: 85–110 dB.',
    usage: 'Poplachové systémy v priemysle, signalizácia poruchy strojov, ohlasovanie príchodov/odchodov, evakuačné alarmy.',
    svg: (
      <SymSvg vb="0 0 60 55">
        <path d="M10,20 L10,36 L28,44 L28,12 Z" {...sp} />
        <path d="M30,18 Q44,26 44,28 Q44,30 30,38" {...sp} />
        <line x1="10" y1="28" x2="0"  y2="28" {...sp} />
        <line x1="44" y1="28" x2="60" y2="28" {...sp} />
      </SymSvg>
    ),
  },
]

// ─── Detail Panel ───────────────────────────────────────────────────────────────

function SymbolDetail({ sym, onClose }: { sym: Sym; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="fixed inset-x-0 bottom-0 z-50 max-w-lg mx-auto"
    >
      <div className="bg-slate-900 border border-slate-700/60 rounded-t-2xl p-5 shadow-2xl">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-20 h-14 bg-slate-800/80 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
            {sym.svg}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-slate-500 mb-0.5 font-mono">{sym.iec}</p>
            <h3 className="text-white font-bold text-base leading-tight">{sym.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors p-1 flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed mb-3">{sym.description}</p>

        <div className="rounded-xl bg-slate-800/60 border border-slate-700/40 p-3">
          <p className="text-[11px] font-semibold text-electric-400 mb-1.5">Kde sa používa</p>
          <p className="text-slate-400 text-xs leading-relaxed">{sym.usage}</p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Symbols Page ───────────────────────────────────────────────────────────────

export function SymbolsPage() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Sym | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return SYMBOLS.filter(s =>
      (category === 'all' || s.category === category) &&
      (!q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.iec.toLowerCase().includes(q))
    )
  }, [category, search])

  function toggle(sym: Sym) {
    setSelected(prev => prev?.id === sym.id ? null : sym)
  }

  return (
    <div className="min-h-screen pb-28">
      {/* ── Header ── */}
      <div className="sticky top-0 z-30 bg-surface-900/95 backdrop-blur-md border-b border-slate-800/60 px-4 pt-4 pb-3">
        <h1 className="text-xl font-bold text-white mb-3">Značky IEC 60617</h1>

        {/* Search */}
        <div className="flex items-center gap-2 bg-slate-800/60 rounded-xl px-3 py-2 border border-slate-700/40 mb-3">
          <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Hľadaj značku..."
            value={search}
            onChange={e => { setSearch(e.target.value); setSelected(null) }}
            className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => { setCategory(c.id); setSelected(null) }}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors flex-shrink-0 ${
                category === c.id
                  ? 'bg-electric-500/20 border-electric-500/40 text-electric-400'
                  : 'bg-slate-800/50 border-slate-700/50 text-slate-500'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="px-4 pt-4 grid grid-cols-3 gap-3">
        {filtered.map(sym => (
          <motion.button
            key={sym.id}
            onClick={() => toggle(sym)}
            whileTap={{ scale: 0.95 }}
            className={`rounded-xl border p-2 flex flex-col items-center gap-1.5 transition-colors ${
              selected?.id === sym.id
                ? 'bg-electric-500/10 border-electric-500/50'
                : 'bg-slate-800/60 border-slate-700/40 active:border-slate-500'
            }`}
          >
            <div className="w-full h-12 flex items-center justify-center px-1">
              {sym.svg}
            </div>
            <span className="text-[10px] text-slate-400 text-center leading-tight font-medium line-clamp-2">
              {sym.name}
            </span>
          </motion.button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-slate-500 text-sm mt-20 px-8">
          Žiadne výsledky pre „{search}"
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setSelected(null)}
            />
            <SymbolDetail sym={selected} onClose={() => setSelected(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
