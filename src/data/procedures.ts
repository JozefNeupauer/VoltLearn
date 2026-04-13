export interface ProcedureStep {
  id: string
  text: string
}

export interface Procedure {
  id: string
  title: string
  icon: string
  difficulty: 'easy' | 'medium' | 'hard'
  steps: ProcedureStep[] // in the CORRECT order
}

export const procedures: Procedure[] = [
  {
    id: 'voltmeter-measurement',
    title: 'Meranie napätia multimetrom',
    icon: '🔌',
    difficulty: 'easy',
    steps: [
      { id: 'vm-1', text: 'Zapni multimeter a nastav prepínač na AC alebo DC napätie' },
      { id: 'vm-2', text: 'Zasuň červený vodič do konektora V/Ω' },
      { id: 'vm-3', text: 'Zasuň čierny vodič do konektora COM' },
      { id: 'vm-4', text: 'Pritiakni červenú sondu na +, čiernu na −' },
      { id: 'vm-5', text: 'Odčítaj zobrazenú hodnotu napätia na displeji' },
    ],
  },
  {
    id: 'replace-socket',
    title: 'Výmena stenovej zásuvky',
    icon: '🔧',
    difficulty: 'easy',
    steps: [
      { id: 'rs-1', text: 'Vypni príslušný istič na rozvádzači' },
      { id: 'rs-2', text: 'Skontroluj absenciu napätia skúšačkou' },
      { id: 'rs-3', text: 'Odskrutkuj kryt a vytiahni zásuvku z krabice' },
      { id: 'rs-4', text: 'Odznač a odpoj vodiče (L, N, PE)' },
      { id: 'rs-5', text: 'Pripoj vodiče k novej zásuvke podľa farieb' },
      { id: 'rs-6', text: 'Zatlač zásuvku do krabice, prichyť a nasaď kryt' },
      { id: 'rs-7', text: 'Zapni istič a otestuj funkčnosť' },
    ],
  },
  {
    id: 'replace-breaker',
    title: 'Výmena ističa v rozvádzači',
    icon: '⚡',
    difficulty: 'medium',
    steps: [
      { id: 'rb-1', text: 'Vypni hlavný vypínač rozvádzača' },
      { id: 'rb-2', text: 'Over absenciu napätia na všetkých vodičoch' },
      { id: 'rb-3', text: 'Odznač vodiče pripojené k vadnému ističu' },
      { id: 'rb-4', text: 'Odskrutkuj a odpoj vodiče od ističa' },
      { id: 'rb-5', text: 'Stiahni starý istič z DIN lišty' },
      { id: 'rb-6', text: 'Nasaď nový istič rovnakej hodnoty na DIN lištu' },
      { id: 'rb-7', text: 'Pripoj vodiče k novému ističu' },
      { id: 'rb-8', text: 'Zapni hlavný vypínač a otestuj istič' },
    ],
  },
  {
    id: 'light-switch',
    title: 'Inštalácia svetelného vypínača',
    icon: '💡',
    difficulty: 'medium',
    steps: [
      { id: 'ls-1', text: 'Vypni istič svetelného obvodu' },
      { id: 'ls-2', text: 'Over napätie skúšačkou' },
      { id: 'ls-3', text: 'Vyvŕtaj otvor pre inštalačnú krabicu' },
      { id: 'ls-4', text: 'Pripoj kábel do krabice a zaistí ho' },
      { id: 'ls-5', text: 'Fázový vodič (L) zapoj na svorku vypínača' },
      { id: 'ls-6', text: 'Spínací vodič zapoj na druhú svorku' },
      { id: 'ls-7', text: 'Vsuň vypínač do krabice a prichyť skrutkami' },
      { id: 'ls-8', text: 'Nasaď kryt, zapni istič a vyskúšaj' },
    ],
  },
  {
    id: 'cable-sizing',
    title: 'Dimenzovanie prívodného kábla',
    icon: '📐',
    difficulty: 'hard',
    steps: [
      { id: 'cs-1', text: 'Zisti príkon spotrebiča (W) alebo prevádzkový prúd (A)' },
      { id: 'cs-2', text: 'Urči napájacie napätie (230 V alebo 400 V)' },
      { id: 'cs-3', text: 'Vypočítaj prevádzkový prúd: I = P / (U × cosφ)' },
      { id: 'cs-4', text: 'Zohľadni činitele uloženia kábla a okolitú teplotu' },
      { id: 'cs-5', text: 'Vyber prierez vodiča z tabuľky podľa STN noriem' },
      { id: 'cs-6', text: 'Skontroluj úbytok napätia na celej trase' },
      { id: 'cs-7', text: 'Zvol správny typ kábla pre dané prostredie' },
    ],
  },
]
