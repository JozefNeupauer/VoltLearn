import type { Lesson } from '../types'

// ─────────────────────────────────────────────────────────────────────────────
//  ELECTRICITY BASICS
// ─────────────────────────────────────────────────────────────────────────────

const electricityBasics: Lesson[] = [
  {
    id: 'eb-1-what-is-electricity',
    topicId: 'electricity-basics',
    order: 1,
    title: 'Čo je elektrina?',
    subtitle: 'Atómy, elektróny a tok náboja',
    xpReward: 20,
    diagramType: 'atom',
    explanation: `
Elektrina je tok **elektrického náboja** — konkrétne pohyb elektrónov cez vodič, ako je medený drôt.

Každá látka sa skladá z **atómov**. V strede každého atómu je jadro obsahujúce protóny (kladný náboj) a neutróny (neutrálne). Okolo jadra obiehajú **elektróny** (záporný náboj).

V **vodičoch** (ako meď, striebro, hliník) sú vonkajšie elektróny voľne viazané a môžu sa slobodne pohybovať. V **izolátoroch** (ako guma, plast, drevo) sú elektróny pevne viazané a nemôžu sa pohybovať.

Keď sa priloží napätie na vodič, voľné elektróny sa pohybujú jedným smerom — toto je **elektrický prúd**.

**Kľúčové fakty:**
• Náboj elektrónu: 1,6 × 10⁻¹⁹ Coulombov
• Prúd = rýchlosť toku náboja: Q/t
• Symbol náboja: Q (Coulomby)Electricity is the flow of **electric charge** — specifically, the movement of electrons through a conductor like copper wire.`,
    keyPoints: [
      { icon: '⚛️', text: 'Elektrina = tok elektrónov cez vodič' },
      { icon: '➕', text: 'Protóny sú kladné, elektróny záporné' },
      { icon: '🔵', text: 'Vodiče majú voľné (slabo viazané) elektróny' },
      { icon: '🚫', text: 'Izolátory pevne držia elektróny — prúd netečie' },
    ],
    questions: [
      {
        id: 'eb1-q1',
        type: 'multiple_choice',
        question: 'Aké častice sa fyzicky pohybujú, keď elektrina tečie drôtom?',
        options: ['Protóny', 'Neutróny', 'Elektróny', 'Fotóny'],
        correctIndex: 2,
        explanation: 'Elektrický prúd je tok elektrónov — záporne nabitých častíc, ktoré sa môžu voľne pohybovať vo vodičoch, ako je meď.',
      },
      {
        id: 'eb1-q2',
        type: 'true_false',
        question: 'Izolátory sú dobrými vodičmi elektriny.',
        correct: false,
        explanation: 'Izolátory (guma, plast, sklo) majú tesne viazané elektróny, ktoré sa nemôžu voľne pohybovať, takže blokujú tok prúdu.',
      },
      {
        id: 'eb1-q3',
        type: 'multiple_choice',
        question: 'Ktorý z nasledujúcich materiálov je NAJLEPŠÍM vodičom elektriny?',
        options: ['Guma', 'Plast', 'Meď', 'Drevo'],
        correctIndex: 2,
        explanation: 'Meď má veľa voľných elektrónov a veľmi nízky odpor, čo z nej robí najčastejšie používaný elektrický vodič.',
      },
      {
        id: 'eb1-q4',
        type: 'fill_blank',
        question: 'Elektróny nesú ___ elektrický náboj.',
        answer: 'záporný',
        hint: 'Pomysli na opak protónu',
        explanation: 'Elektróny nesú záporný náboj, zatiaľ čo protóny v jadre nesú kladný náboj.',
      },
    ],
  },
  {
    id: 'eb-2-current',
    topicId: 'electricity-basics',
    order: 2,
    title: 'Elektrický prúd',
    subtitle: 'Meranie toku náboja — Ampéry',
    xpReward: 25,
    diagramType: 'circuit',
    explanation: `
**Elektrický prúd (I)** je rýchlosť, s akou elektrický náboj tečie cez vodič. Meria sa v **Ampéroch (A)**, hovorovo "ampérach".

**Vzorec:** I = Q / t
Kde Q = náboj (Coulomby) a t = čas (sekundy)

Jeden Ampér = jeden Coulomb náboja prechádzajúceho bodom za sekundu. To je asi 6,24 × 10¹⁸ elektrónov pretekajúcich za sekundu!

**Typy prúdu:**
• **DC (jednosmerný prúd)** — elektróny tečú iba jedným smerom. Používa sa v batériách, elektronike, solárnych paneloch.
• **AC (striedavý prúd)** — elektróny tečú tam a späť, menia smer 50–60-krát za sekundu. Používa sa v domácnostiach a priemysle.

**Príklady prúdov v praxi:**
| Zariadenie | Približný prúd |
|------------|----------------|
| LED žiarovka | 0,1 A |
| Nabíjačka telefónu | 1–2 A |
| Domáca zásuvka | Až 15–20 A |
| Elektrický sporák | 20–50 A |
| Priemyselný motor | 100–500 A |

⚠️ **Bezpečnosť:** Už len **0,1 A (100 mA)** prechádzajúce ľudským srdcom môže byť smrteľné.**Electrical current (I)** is the rate at which electric charge flows through a conductor. It's measured in **Amperes (A)**, often called "amps."`,
    keyPoints: [
      { icon: '🔴', text: 'Prúd (I) = tok náboja, meraný v Ampéroch (A)' },
      { icon: '🔋', text: 'Jednosmerný prúd tečie jedným smerom; striedavý sa striedavo mení' },
      { icon: '⚠️', text: '100 mA pretekajúce telom môže byť smrteľné' },
      { icon: '📏', text: 'Domáce obvody zvyčajne prenášajú 15–20 A' },
    ],
    questions: [
      {
        id: 'eb2-q1',
        type: 'multiple_choice',
        question: 'Akú jednotku používame na meranie elektrického prúdu?',
        options: ['Volty', 'Ohmy', 'Watty', 'Ampéry'],
        correctIndex: 3,
        explanation: 'Prúd sa meria v Ampéroch (A), pomenovaných po francúzskom fyzikovi André-Marie Ampèrovi.',
      },
      {
        id: 'eb2-q2',
        type: 'true_false',
        question: 'Pri striedavom prúde (AC) elektróny tečú len jedným smerom.',
        correct: false,
        explanation: 'Pri striedavom prúde elektróny menia smer 50–60-krát za sekundu (50 Hz v Európe, 60 Hz v Severnej Amerike).',
      },
      {
        id: 'eb2-q3',
        type: 'fill_blank',
        question: 'Symbol pre elektrický prúd vo vzorcoch je ___.',
        answer: 'I',
        hint: "Pochádza z francúzskeho slova 'intensité'",
        explanation: "Prúd používa symbol 'I' z francúzskeho výrazu intensité de courant (intenzita prúdu).",
      },
      {
        id: 'eb2-q4',
        type: 'multiple_choice',
        question: 'Aká hladina prúdu prechádzajúca srdcom je považovaná za potenciálne smrteľnú?',
        options: ['1 mA', '10 mA', '100 mA', '1000 mA'],
        correctIndex: 2,
        explanation: '100 mA (0,1 A) prechádzajúce srdcom môže spôsobiť komorovú fibriláciu a smrť. Už 10 mA môže spôsobiť neschopnosť pustiť vodič.',
      },
    ],
  },
  {
    id: 'eb-3-voltage',
    topicId: 'electricity-basics',
    order: 3,
    title: 'Napätie',
    subtitle: 'Elektrický tlak pohánajúci prúd',
    xpReward: 25,
    diagramType: 'voltage',
    explanation: `
**Napätie (V)** je elektrický potenciálový rozdiel medzi dvomi bodmi. Je to „tlak", ktorý ženie elektróny obvodom. Meria sa vo **Voltoch (V)**.

**Predstav si to ako vodovodný systém:**
• Napätie = tlak vody
• Prúd = prietok vody
• Odpor = zúženie potrubia
Bez tlaku (napätia) tečie nulový prúd — rovnako ako voda bez tlaku.

**Vzorec:** V = I × R (Ohmov zákon)

**Bežné hladiny napätia:**
| Napätie | Aplikácia |
|---------|-----------|
| 1,5 V | Batéria AA/AAA |
| 12 V | Autobatéria, LED osvetlenie |
| 230 V AC | Európska domáca sieť |
| 400 V AC | Trojfázová priemyselná sieť |
| 11 000 V+ | Distribučná sieť |
| 400 000 V | Prenosová sústava VN |

⚠️ **Bezpečnosť:** Aj nízke napätia môžu byť smrteľné za správnych podmienok (vlhkosť, priamy kontakt so srdcom). Vždy zaobchádzaj s akýmkoľvek napätím s rešpektom!**Voltage (V)** is the electrical potential difference between two points — the "pressure" that pushes electrons through a circuit. It's measured in **Volts (V)**.`,
    keyPoints: [
      { icon: '💡', text: 'Napätie (V) = elektrický tlak, pohání tok prúdu' },
      { icon: '🔋', text: 'Merané vo Voltoch pomocou voltmetra' },
      { icon: '🏠', text: 'Štandardná domácnosť: 230 V (EÚ) alebo 120 V (USA)' },
      { icon: '⬆️', text: 'Vyššie napätie = viac potenciálnej energie na náboj' },
    ],
    questions: [
      {
        id: 'eb3-q1',
        type: 'multiple_choice',
        question: "Čo predstavuje napätie v elektrickom obvode?",
        options: [
          'Tok elektrónov',
          'Odpor voči toku prúdu',
          'Rozdiel elektrického tlaku (potenciálu)',
          'Rýchlosť spotreby energie',
        ],
        correctIndex: 2,
        explanation: 'Napätie (elektrický potenciálový rozdiel) je tlak, ktorý ženie elektróny obvodom — analogicky k tlaku vody v potrubí.',
      },
      {
        id: 'eb3-q2',
        type: 'fill_blank',
        question: 'Napätie sa meria v ___ pomocou voltmetra.',
        answer: 'voltoch',
        hint: "Pomenované po Alessandrovi ___tovi, talianskom fyzikovi",
        explanation: 'Napätie sa meria vo Voltoch (V), pomenovaných po Alessandrovi Voltovi, ktorý vynašiel prvú batériu.',
      },
      {
        id: 'eb3-q3',
        type: 'true_false',
        question: 'Štandardná európska domáca zásuvka poskytuje 230 V AC.',
        correct: true,
        explanation: 'Európsky štandardný domáci napájací obvod je 230 V AC pri 50 Hz. Severoamerický štandard je 120 V AC pri 60 Hz.',
      },
      {
        id: 'eb3-q4',
        type: 'multiple_choice',
        question: 'V analógii s vodou pre elektrickú energiu, čomu zodpovedá napätie?',
        options: ['Rýchlosť toku vody', 'Priemer potrubia', 'Tlak vody', 'Materiál potrubia'],
        correctIndex: 2,
        explanation: 'Napätie = tlak vody. Rovnako ako vyšší tlak ženie viac vody, vyššie napätie ženie viac prúdu obvodom.',
      },
    ],
  },
  {
    id: 'eb-4-resistance',
    topicId: 'electricity-basics',
    order: 4,
    title: 'Elektrický odpor',
    subtitle: 'Odpor voči toku prúdu — Ohmy',
    xpReward: 25,
    diagramType: 'resistor',
    explanation: `
**Odpor (R)** je odpor voči toku elektrického prúdu. Materiály kladú prúdu odpor, pretože atómy blokujú pohyb elektrónov. Meria sa v **Ohmoch (Ω)** — grécke písmeno Omega.

**Faktory ovplyvňujúce odpor:**
• **Dĺžka** — dlhší vodič = vyšší odpor
• **Prierez** — hrubší vodič = nižší odpor
• **Materiál** — meď má nižší odpor ako hliník
• **Teplota** — väčšina kovov: vyššia teplota = vyšší odpor

**Vzorec:** R = ρL/A
Kde: ρ = merný odpor materiálu, L = dĺžka, A = plocha prierezu

**Merný odpor bežných materiálov:**
| Materiál | Merný odpor (Ω·m) |
|----------|-------------------|
| Striebro | 1,59 × 10⁻⁸ |
| Meď | 1,68 × 10⁻⁸ |
| Hliník | 2,82 × 10⁻⁸ |
| Nichróm | 1,10 × 10⁻⁶ |
| Uhlík | 3–60 × 10⁻⁵ |
| Guma | 10¹³ |

**Praktické dôsledky:**
Tenšie a dlhšie káble majú vyšší odpor → väčší úbytok napätia a zahrievanie. Vždy vyber správny prierez vodiča!**Resistance (R)** is the opposition to the flow of electric current. Materials resist current because atoms block the movement of electrons. Resistance is measured in **Ohms (Ω)** — the Greek letter Omega.`,
    keyPoints: [
      { icon: '🚧', text: 'Odpor (R) kladie odpor toku prúdu, meraný v Ohmoch (Ω)' },
      { icon: '📏', text: 'Dlhší a tenší vodič → väčší odpor' },
      { icon: '🌡️', text: 'Väčšina vodičov: odpor rastie s teplotou' },
      { icon: '🎨', text: 'Rezistory používajú farebné prstence na označenie hodnoty' },
    ],
    questions: [
      {
        id: 'eb4-q1',
        type: 'multiple_choice',
        question: 'Akú jednotku používame na meranie elektrického odporu?',
        options: ['Volty (V)', 'Ampéry (A)', 'Ohmy (Ω)', 'Watty (W)'],
        correctIndex: 2,
        explanation: 'Odpor sa meria v Ohmoch (Ω), pomenovaných po nemeckom fyzikovi Georgovi Simonovi Ohmovi.',
      },
      {
        id: 'eb4-q2',
        type: 'true_false',
        question: 'Dlhší vodič má väčší odpor ako kratší vodič z rovnakého materiálu a hrúbky.',
        correct: true,
        explanation: 'Odpor je úmerný dĺžke — čím dlhší vodič, tým viac atómov musia elektróny prekonať, čo zvyšuje odpor.',
      },
      {
        id: 'eb4-q3',
        type: 'multiple_choice',
        question: 'Ktorý materiál má NAJNIŽŠÍ elektrický odpor?',
        options: ['Guma', 'Sklo', 'Meď', 'Plast'],
        correctIndex: 2,
        explanation: 'Meď má veľmi nízku merný odpor (1,68 × 10⁻⁸ Ω·m), čo z nej robí najpoužívanejší vodič v elektrickej inštalácii.',
      },
      {
        id: 'eb4-q4',
        type: 'multiple_choice',
        question: 'Čo sa stane s odporom medeného vodiča, keď sa zvýši jeho teplota?',
        options: [
          'Odpor klesá',
          'Odpor zostáva rovnaký',
          'Odpor rastie',
          'Odpor sa stáva nulou',
        ],
        correctIndex: 2,
        explanation: 'U väčšiny vodičov vyššia teplota spôsobuje, že atómy více vibrujú, čím zvyšujú počet zrážok s elektrónmi a teda aj odpor.',
      },
    ],
  },
  {
    id: 'eb-5-series-parallel',
    topicId: 'electricity-basics',
    order: 5,
    title: 'Sériové a paralelné obvody',
    subtitle: 'Dva základné spôsoby zapojenia súčiastok',
    xpReward: 30,
    diagramType: 'series-parallel',
    explanation: `
Elektrické komponenty môžu byť zapojené dvoma základnými spôsobmi: **sériovo** alebo **paralelne**.

**Sériové obvody:**
• Komponenty zapojené za sebou v jednej slučke
• Rovnaký prúd cez každý komponent
• Napätia sa sčítavajú: V_celk = V₁ + V₂ + V₃
• Odpory sa sčítavajú: R_celk = R₁ + R₂ + R₃
• Ak jeden komponent zlyhá → celý obvod sa preruší

**Paralelné obvody:**
• Komponenty zapojené na rovnakých dvoch bodoch
• Rovnaké napätie na každom komponente
• Prúdy sa sčítavajú: I_celk = I₁ + I₂ + I₃
• Celkový odpor KLESÁ pri pridávaní vetiev
• Ak jedna vetva zlyhá → ostatné naďalej fungujú

**Výpočet paralelného odporu:**
1/R_celk = 1/R₁ + 1/R₂ + 1/R₃

**Príklady z praxe:**
| Sériové | Paralelné |
|---------|-----------|
| Staré vianočné reťaze | Domáca inštalácia |
| Článkové batérie | Svetlomety auta |
| Odporové obmedzovače | Väčšina elektrických inštalácií |

**Pamätaj:** Domáca inštalácia je VŽDY paralelná — každá zásuvka/svetlo funguje nezávisle pri plnom napájacím napätí.Electrical components can be connected in two fundamental ways: **series** or **parallel**.`,
    keyPoints: [
      { icon: '➡️', text: 'Sériové: rovnaký prúd, napätie sa delí, jedna porucha = všetko vypnuté' },
      { icon: '⬇️', text: 'Paralelné: rovnaké napätie, prúd sa delí, nezávislá prevádzka' },
      { icon: '🏠', text: 'Domáce obvody sú paralelné — zásuvky pracujú nezávisle' },
      { icon: '➕', text: 'Sériové: celkový R = R₁ + R₂; Paralelné: celkový R je menší ako najmenší' },
    ],
    questions: [
      {
        id: 'eb5-q1',
        type: 'multiple_choice',
        question: 'V sériovom obvode s dvoma rezistormi je celkový odpor:',
        options: [
          'Menší ako najmenší rezistor',
          'Rovnaký ako najväčší rezistor',
          'Súčet oboch rezisorov',
          'Polovica súčtu',
        ],
        correctIndex: 2,
        explanation: 'V sériovom zapojení sa odpory sčítavajú priamo: R_celk = R₁ + R₂. Napríklad 10 Ω + 20 Ω = 30 Ω celkovo.',
      },
      {
        id: 'eb5-q2',
        type: 'true_false',
        question: 'V paralelnom obvode, ak jedna vetva zlyhá, všetky ostatné vetvy tiež prestanú fungovať.',
        correct: false,
        explanation: 'Toto je hlavná výhoda paralelných obvodov — každá vetva je nezávislá. Ak jedna zlyhá, prúd stále tečie cez ostatné. Takto funguje domáca inštalácia.',
      },
      {
        id: 'eb5-q3',
        type: 'multiple_choice',
        question: "Aký typ obvodu používa domáca inštalácia?",
        options: ['Iba sériový', 'Paralelný', 'Zmes sériového a paralelného', 'Ani jeden'],
        correctIndex: 1,
        explanation: 'Domáca inštalácia je paralelná, takže každá zásuvka a svetlo je na vlastnej vetve pri plnom napätí 230 V (alebo 120 V), pracujúc nezávisle od ostatných.',
      },
      {
        id: 'eb5-q4',
        type: 'fill_blank',
        question: 'V sériovom obvode je prúd prechádzajúci každou súčiastkou ___.',
        answer: 'rovnaký',
        hint: 'Pre prúd existuje len jedna cesta',
        explanation: 'V sériovom obvode existuje iba jedna cesta pre prúd, takže rovnaký prúd tečie cez každý komponent v slučke.',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
//  OHM'S LAW
// ─────────────────────────────────────────────────────────────────────────────

const ohmsLaw: Lesson[] = [
  {
    id: 'ol-1-introduction',
    topicId: 'ohms-law',
    order: 1,
    title: 'Úvod do Ohmovho zákona',
    subtitle: 'Najdôležitejší vzorec v elektrotechnike',
    xpReward: 25,
    diagramType: 'ohms-triangle',
    explanation: `
**Ohmov zákon** je základný vzťah medzi napätím, prúdom a odporom. Objavil ho Georg Simon Ohm v roku 1827:

# V = I × R

Kde:
- **V** = Napätie (Volty)
- **I** = Prúd (Ampéry)
- **R** = Odpor (Ohmy)

**Trojuholník Ohmovho zákona:**
Zakry, čo chceš nájsť:
• Zakry V → V = I × R
• Zakry I → I = V / R
• Zakry R → R = V / I

**Praktické príklady:**
1. 12 V batéria, rezistor 4 Ω: I = 12/4 = **3 A**
2. Ohrievač odoberá 10 A zo siete 230 V: R = 230/10 = **23 Ω**
3. Rezistor 1 kΩ s 5 mA: V = 0,005 × 1000 = **5 V**

**Pamätaj:** Ohmov zákon platí pre *odporové* súčiastky pri konštantnej teplote. Priamo neplatí pre kondenzátory, cievky ani nelineárne prvky ako diódy.

**Poznámka k značeniu:**
Napätie sa v praxi značí buď **V** alebo **U**. Oba zápisy sú správne:
• V = I × R
• U = R × I`,
    keyPoints: [
      { icon: '📐', text: 'V = I × R — trojuholníková metóda Ohmovho zákona' },
      { icon: '⬆️', text: 'Väčšie napätie → väčší prúd (pri pevnom odpore)' },
      { icon: '⬆️', text: 'Väčší odpor → menší prúd (pri pevnom napätí)' },
      { icon: '🏆', text: 'Pomenovaný podľa Georga Simona Ohma (1789–1854)' },
    ],
    questions: [
      {
        id: 'ol1-q1',
        type: 'multiple_choice',
        question: "Čo predstavuje písmeno 'I' v Ohmovom zákone?",
        options: ['Impedancia', 'Prúd', 'Izolácia', 'Indukčnosť'],
        correctIndex: 1,
        explanation: "I je symbol pre prúd (Ampéry). Pochádza z francúzskeho výrazu 'intensité de courant' — intenzita prúdu.",
      },
      {
        id: 'ol1-q2',
        type: 'fill_blank',
        question: "Uveď Ohmov zákon: V = ___ × R",
        answer: 'I',
        hint: 'Symbol pre prúd',
        explanation: 'Ohmov zákon: V = I × R. Napätie sa rovná prúdu vynásobenému odporom.',
      },
      {
        id: 'ol1-q3',
        type: 'true_false',
        question: "Zdvojnásobenie odporu (pri konštantnom napätí) zdvojnásobí prúd.",
        correct: false,
        explanation: 'Zdvojnásobenie odporu ZNIŽUJE prúd na polovicu (I = V/R). Prúd je nepriamo úmerný odporu.',
      },
      {
        id: 'ol1-q4',
        type: 'multiple_choice',
        question: 'Ak potrebuješ nájsť prúd pomocou trojuholníka Ohmovho zákona, vzorec je:',
        options: ['I = V × R', 'I = R / V', 'I = V / R', 'I = V + R'],
        correctIndex: 2,
        explanation: 'Prúd I = V / R. V trojuholníku zakrytie I odhalí V navrchu vydelené R naspodku.',
      },
    ],
  },
  {
    id: 'ol-2-calculating-voltage',
    topicId: 'ohms-law',
    order: 2,
    title: 'Výpočet napätia',
    subtitle: 'V = I × R — príklady z praxe',
    xpReward: 30,
    diagramType: 'ohms-triangle',
    explanation: `
Keď poznáš prúd (**I**) a odpor (**R**), môžeš vypočítať napätie:

# V = I × R

**Postup krok za krokom:**
1. Identifikuj čo vieš (I a R)
2. Použi V = I × R
3. Skontroluj jednotky: A × Ω = V ✓

**Príklady:**
- Toster 10 A cez ohrievací článok 23 Ω: V = 10 × 23 = 230 V ✓ (európska sieť)
- Obvod LED 0,5 A cez 240 Ω: V = 0,5 × 240 = 120 V (Severná Amerika)
- Senzor odoberajúci 20 mA cez 500 Ω: V = 0,020 × 500 = 10 V

**Viacero rezistorov v sérii:**
V_celk = I × (R₁ + R₂ + R₃)

**Odporový delič (dva rezistory v sérii):**
V₂ = V_zdroj × R₂ / (R₁ + R₂)

**Tip na zapamätanie:** Napätie si predstav ako „úsilie" — čím väčší odpor a čím viac prúdu musíš pretlačiť, tým viac napätia potrebuješ.

**Využitie v praxi:** Kontrola úbytku napätia na káblovom vedení:
V_úbytok = I × R_kábla
Udržuj úbytok napätia < 3 % napájacieho napätia (odporúčanie IEC).`,
    keyPoints: [
      { icon: '🔢', text: 'V = I × R — vynásob prúd odporom' },
      { icon: '📏', text: 'Vždy uvádzaj jednotky: A × Ω = V' },
      { icon: '✅', text: '3 A cez 10 Ω = pokles napätia 30 V' },
      { icon: '💡', text: '20 mA LED cez 100 Ω → 2 V' },
    ],
    questions: [
      {
        id: 'ol2-q1',
        type: 'multiple_choice',
        question: 'Cez rezistor s odporom 8 Ω tečie prúd 5 A. Aké je napätie na ňom?',
        options: ['1.6 V', '13 V', '40 V', '0.625 V'],
        correctIndex: 2,
        explanation: 'V = I × R = 5 A × 8 Ω = 40 V',
      },
      {
        id: 'ol2-q2',
        type: 'multiple_choice',
        question: 'Vykurovací článok odberá 10 A a má odpor 24 Ω. Vypočítaj napájacie napätie.',
        options: ['2.4 V', '240 V', '34 V', '14 V'],
        correctIndex: 1,
        explanation: 'V = I × R = 10 A × 24 Ω = 240 V — typické európske domáce napätie.',
      },
      {
        id: 'ol2-q3',
        type: 'fill_blank',
        question: 'Cez rezistor 12 Ω tečie prúd 2 A. Napätie je ___ V.',
        answer: '24',
        hint: 'Použi V = I × R',
        explanation: 'V = I × R = 2 A × 12 Ω = 24 V',
      },
      {
        id: 'ol2-q4',
        type: 'true_false',
        question: 'Ak sa prúd zdvojnásobí a odpor zostane rovnaký, napätie sa tiež zdvojnásobí.',
        correct: true,
        explanation: 'Správne! V = I × R. Ak sa I zdvojnásobí a R zostane konštantné, V = 2I × R = dvojnásobné pôvodné napätie.',
      },
    ],
  },
  {
    id: 'ol-3-calculating-current',
    topicId: 'ohms-law',
    order: 3,
    title: 'Výpočet prúdu',
    subtitle: 'I = V / R — aplikovanie vzorca',
    xpReward: 30,
    diagramType: 'ohms-triangle',
    explanation: `
Keď poznáš napätie a odpor, vypočítaj prúd:

# I = V / R

**Postup krok za krokom:**
1. Identifikuj V a R
2. Vydeľ V hodnotou R
3. Výsledok je v Ampéroch

**Praktické príklady:**
| Scenár | Výpočet | Výsledok |
|--------|---------|---------|
| 230 V sieť, ohrievač 46 Ω | I = 230/46 | 5 A |
| 12 V batéria, motor 4 Ω | I = 12/4 | 3 A |
| 5 V USB, LED 250 Ω | I = 5/250 | 20 mA |
| Riadiaci obvod 24 V, 4,8 kΩ | I = 24/4800 | 5 mA |

**Prúd v paralelných vetvách:**
Každá vetva má V/R_vetvy nezávisle od ostatných vetiev.

**Prečo prúd záleží pre elektrikára:**
• Určuje prierez kábla (zaťažiteľnosť)
• Určuje menovitý prúd poistky/ističa
• Určuje generované teplo: P = I²R
• Ističe vypínajú na základe prúdu

**Varovné znaky priveľkého prúdu:**
- Horúce káble
- Vypínajúce ističe
- Zápach horenia
- Stmievanie svetiel pri spustení spotrebičov`,
    keyPoints: [
      { icon: '🔢', text: 'I = V / R — vydeľ napätie odporom' },
      { icon: '💡', text: '230 V / 460 Ω žiarovka → 0,5 A prúd' },
      { icon: '🔌', text: 'Použij na dimenzovanie káblov a ističov' },
      { icon: '📏', text: '1 A = 1000 mA' },
    ],
    questions: [
      {
        id: 'ol3-q1',
        type: 'multiple_choice',
        question: 'Napájanie 120 V je zapojené cez rezistor 30 Ω. Aký je prúd?',
        options: ['3600 A', '0,25 A', '4 A', '150 A'],
        correctIndex: 2,
        explanation: 'I = V / R = 120 V / 30 Ω = 4 A',
      },
      {
        id: 'ol3-q2',
        type: 'fill_blank',
        question: '9V batéria je zapojená cez rezistor 3 Ω. Prúd = ___ A.',
        answer: '3',
        hint: 'I = V / R',
        explanation: 'I = V / R = 9 V / 3 Ω = 3 A',
      },
      {
        id: 'ol3-q3',
        type: 'multiple_choice',
        question: 'Obvod s napätím 230 V má celkový odpor 46 Ω. Aký je prúd v obvode?',
        options: ['10 A', '5 A', '46 A', '0,2 A'],
        correctIndex: 1,
        explanation: 'I = V / R = 230 V / 46 Ω = 5 A',
      },
      {
        id: 'ol3-q4',
        type: 'true_false',
        question: 'Ak sa odpor zvýši z 10 Ω na 20 Ω (napätie konštantné 100 V), prúd klesne z 10 A na 5 A.',
        correct: true,
        explanation: 'I = V/R. Pri 10 Ω: I = 100/10 = 10 A. Pri 20 Ω: I = 100/20 = 5 A. Prúd sa znížil na polovicu, keď sa odpor zdvojnásobil.',
      },
    ],
  },
  {
    id: 'ol-4-calculating-resistance',
    topicId: 'ohms-law',
    order: 4,
    title: 'Výpočet odporu',
    subtitle: 'R = V / I — hľadanie odporu',
    xpReward: 30,
    diagramType: 'ohms-triangle',
    explanation: `
Keď poznáš napätie a prúd, vypočítaj odpor:

# R = V / I

**Postup krok za krokom:**
1. Zmeraj alebo získaj V na komponente
2. Zmeraj alebo získaj I cez komponent
3. R = V / I

**Bežné aplikácie:**
| Problém | Vzorec | Odpoveď |
|---------|--------|---------|
| Aký rezistor obmedzí 20 mA z 5 V? | R = 5/0,020 | 250 Ω |
| Obvod odoberá 3 A z 240 V — aký je odpor záťaže? | R = 240/3 | 80 Ω |
| Batéria: 9 V, odoberá 45 mA — vnútorný odpor? | R = 9/0,045 | 200 Ω |

**Meranie odporu izolácie:**
Tester izolácie (Megger) prikladá vysoké napätie a meria odpor izolácie. Hodnoty by mali byť v miliónoch ohmov (MΩ):
- Dobrá izolácia: > 100 MΩ
- Minimálne akceptovateľné: 1 MΩ (IEC 60364)
- Nebezpečné: < 0,5 MΩ

**Farebný kód odporov (pre pevné rezistory):**
Farby prúžkov predstavujú číslice. Čierna=0, Hnedá=1, Červená=2, Oranžová=3, Žltá=4, Zelená=5, Modrá=6, Fialová=7, Sivá=8, Biela=9When you know voltage and current, solve for resistance:`,
    keyPoints: [
      { icon: '🔢', text: 'R = V / I — vydeľ napätie prúdom' },
      { icon: '🔍', text: 'Používa sa pri diagnostike porúch a dimenzovaní súčiastok' },
      { icon: '🧪', text: 'LED obvody: R = (napájací V − LED V) / prúd' },
      { icon: '🔬', text: 'Testovanie izolácie meria hodnoty v MΩ' },
    ],
    questions: [
      {
        id: 'ol4-q1',
        type: 'multiple_choice',
        question: 'Napájací zdroj 24 V dodáva 6 A do záťaže. Aký je odpor záťaže?',
        options: ['144 Ω', '0,25 Ω', '4 Ω', '30 Ω'],
        correctIndex: 2,
        explanation: 'R = V / I = 24 V / 6 A = 4 Ω',
      },
      {
        id: 'ol4-q2',
        type: 'fill_blank',
        question: 'Obvodom s napätím 12 V tečie 4 A. R = ___ Ω.',
        answer: '3',
        hint: 'R = V / I',
        explanation: 'R = V / I = 12 V / 4 A = 3 Ω',
      },
      {
        id: 'ol4-q3',
        type: 'multiple_choice',
        question: 'Pomocou 9 V batérie meriaš 0,1 A tečúcich cez neznámy rezistor. Jeho hodnota je:',
        options: ['0,9 Ω', '90 Ω', '9,1 Ω', '900 Ω'],
        correctIndex: 1,
        explanation: 'R = V / I = 9 V / 0,1 A = 90 Ω',
      },
      {
        id: 'ol4-q4',
        type: 'true_false',
        question: 'R = V / I dáva odpor v Ohmoch, keď V je vo Voltoch a I v Ampéroch.',
        correct: true,
        explanation: 'Správne! V/I = Volty/Ampéry = Ohmy (Ω). Jednotky sú konzistentné: 1 Ω = 1 V/A.',
      },
    ],
  },
  {
    id: 'ol-5-power-formula',
    topicId: 'ohms-law',
    order: 5,
    title: 'Elektrický výkon',
    subtitle: 'P = V × I — watty a spotreba energie',
    xpReward: 35,
    diagramType: 'power-triangle',
    explanation: `
**Elektrický výkon (P)** je rýchlosť, s akou sa energia spotrebúva alebo produkuje. Meria sa vo **Wattoch (W)**.

**Tri vzorce pre výkon (odporové/DC obvody):**
• P = V × I
• P = I² × R
• P = V² / R

**Pri striedavom prúde (AC):**
• Činný výkon: P = U × I × cos φ
• Zdanlivý výkon: S = U × I
• Jalový výkon: Q = U × I × sin φ

Kde φ je fázový uhol medzi napätím a prúdom. Pre čistý jednosmerný (DC) obvod platí φ = 0, takže P = U × I.

**Odvodzovanie z Ohmovho zákona:** Pretože V = IR:
- P = V × I = (IR) × I = I²R
- P = V × I = V × (V/R) = V²/R

**Energia vs. Výkon:**
- Výkon (P) = rýchlosť spotreby energie (W)
- Energia (E) = P × t (Wh alebo kWh)
- 1 kWh = 1000 W × 1 hodina = 3 600 000 Joulov

**Praktické výpočty:**
| Spotrebič | Výkon | 8 h/deň, 30 dní |
|-----------|-------|-----------------|
| LED žiarovka | 10 W | 2,4 kWh |
| TV | 100 W | 24 kWh |
| Chladnička | 150 W | 36 kWh |
| Sprcha | 8 500 W | 2 040 kWh |
| Nabíjačka EV | 7 400 W | 1 776 kWh |

**Vzorec pre tepelné straty:**
P_teplo = I²R — určuje minimálny prierez kábla, menovité hodnoty poistiek a nárast teploty komponentov.`,
    keyPoints: [
      { icon: '⚡', text: 'P = V × I — výkon vo Wattoch' },
      { icon: '🔌', text: 'Tiež: P = I²×R a P = V²/R' },
      { icon: '💰', text: 'Energia (kWh) = Výkon (kW) × Čas (h)' },
      { icon: '🔥', text: 'Väčší výkon = väčšie teplo vo vodičoch — skontroluj prierez!' },
    ],
    questions: [
      {
        id: 'ol5-q1',
        type: 'multiple_choice',
        question: 'Spotrebič s napätím 230 V odoberá 10 A. Aká je jeho spotreba výkonu?',
        options: ['23 W', '240 W', '2300 W', '23000 W'],
        correctIndex: 2,
        explanation: 'P = V × I = 230 V × 10 A = 2300 W = 2,3 kW — typický výkon práčky.',
      },
      {
        id: 'ol5-q2',
        type: 'fill_blank',
        question: 'Výkon sa meria v ___ (symbol: W).',
        answer: 'watty',
        hint: 'Pomenovaný po Jamesovi ___, škótskom vynálezcovi',
        explanation: 'Výkon sa meria vo Wattoch (W), pomenovaných po Jamesovi Wattovi, škótskom vynálezcovi, ktorý zdokonalil parný stroj.',
      },
      {
        id: 'ol5-q3',
        type: 'multiple_choice',
        question: 'Sprcha s príkonom 3000 W beží 0,5 hodiny. Koľko energie spotrebuje?',
        options: ['0.5 kWh', '1.5 kWh', '3 kWh', '6 kWh'],
        correctIndex: 1,
        explanation: 'Energia = P × t = 3 kW × 0,5 h = 1,5 kWh',
      },
      {
        id: 'ol5-q4',
        type: 'multiple_choice',
        question: "Rezistor 4 Ω nesie prúd 5 A. Pomocou P = I²R, aký výkon rozptyľuje?",
        options: ['20 W', '100 W', '0,8 W', '80 W'],
        correctIndex: 1,
        explanation: 'P = I² × R = 5² × 4 = 25 × 4 = 100 W — to by generovalo značné teplo!',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
//  WIRING FUNDAMENTALS  (Premium)
// ─────────────────────────────────────────────────────────────────────────────

const wiringFundamentals: Lesson[] = [
  {
    id: 'wf-1-wire-types',
    topicId: 'wiring-fundamentals',
    order: 1,
    title: 'Typy a materiály vodičov',
    subtitle: 'Plný vs lanko, meď vs hliník',
    xpReward: 30,
    diagramType: 'wire-types',
    explanation: `
**Typy vodičov a káblov v elektrickej inštalácii**

Elektrikári pracujú s mnohými typmi vodičov. Správny výber závisí od aplikácie — pevná inštalácia, pohyblivé prívody, vonkajšie prostredie alebo priemysel.

**Pevný vs. lankový vodič:**
• **Pevný (jednodrotový)** — jedno plné jadro; lacnejší, menej ohybný; vhodný pre pevnú inštaláciu v rúrkach a rozvádzačoch
• **Lankový (viacdrôtový)** — veľa jemných drôtikov; ohybnejší; vhodný pre pohyblivé prívody, miesta s vibráciami a opakovaným ohýbaním

**Materiál jadra:**
• **Meď (Cu)** — nízky merný odpor, najčastejšie používaná
• **Hliník (Al)** — ľahší a lacnejší, ale vyšší odpor; potrebuje väčší prierez ako meď a špeciálne svorky

**Izolácia:**
• **PVC** — bežná a lacná; teplotný limit jadra 70 °C; vhodná pre väčšinu inštalácií do 1 000 V
• **XLPE (zosieťovaný PE)** — teplotný limit 90 °C; vyššia prúdová zaťažiteľnosť pri rovnakom priereze
• **Guma / silikón** — vysoko ohybná; odolnosť voči teplu a opakovanému ohýbaniu; pre predlžovačky a priemyselné prívody

**Bežné typy káblov:**
| Označenie | Opis | Typické použitie |
|-----------|------|-----------------|
| NYM | PVC izolácia + PVC plášť, pevné jadrá | Vnútorná inštalácia v stenách a rúrkach |
| NYY | PVC + silnejší vonkajší plášť | Vonkajšia a podzemná inštalácia |
| CYKY | PVC, lankové jadrá | Bytová inštalácia (SK/CZ štandard) |
| H05VV-F | Flexibilný PVC obal | Pohyblivé prívody spotrebičov |
| CYKFY | Plochý, flexibilný | Šnúry, predlžovačky |

**Orientačná zaťažiteľnosť medeného kábla v rúrke:**
• 1,5 mm² → ~15 A → osvetľovací okruh
• 2,5 mm² → ~20 A → zásuvkový okruh 16 A
• 4 mm²   → ~25 A → varná doska, klimatizácia
• 6 mm²   → ~32 A → sporák, nabíjačka EV
• 10 mm²  → ~40 A → hlavný prívod

⚠️ Zaťažiteľnosť závisí od spôsobu uloženia (voľný vzduch, v rúrke, zamurovanie), teploty okolia a počtu súbežných káblov. Vždy over podľa tabuliek IEC 60364-5-52!`,
    keyPoints: [
      { icon: '🔩', text: 'Plný vodič: pevná inštalácia; Lanko: flexibilné aplikácie' },
      { icon: '🔴', text: 'Meď: najlepšia voľba pre štandardnú inštaláciu' },
      { icon: '📦', text: 'NYM = štandardný typ kábla pre domácu inštaláciu' },
      { icon: '🌡️', text: 'PVC do 70 °C; XLPE/EPR do 90 °C' },
    ],
    questions: [
      {
        id: 'wf1-q1',
        type: 'multiple_choice',
        question: 'Pre flexibilný predlžovací kábel, ktorý sa často ohýba, ktorý typ vodiča je najvhodnejší?',
        options: ['Solid copper', 'Stranded copper', 'Solid aluminium', 'Bare copper'],
        correctIndex: 1,
        explanation: 'Lankový vodič sa ohýba bez lámani, čo ho robí ideálnym pre prenosné prívody a flexibilné káble.',
      },
      {
        id: 'wf1-q2',
        type: 'true_false',
        question: 'Hliník má nižší elektrický odpor na meter ako meď rovnakého prierezu.',
        correct: false,
        explanation: 'Hliník má vyšší merný odpor ako meď. Pre rovnaký odpor musí mať hliníkový vodič väčší prierez (asi 1,5× plochy medi).',
      },
      {
        id: 'wf1-q3',
        type: 'multiple_choice',
        question: 'Aká je maximálna trvalá prevádzková teplota pre štandardnú PVC izoláciu?',
        options: ['50°C', '70°C', '90°C', '120°C'],
        correctIndex: 1,
        explanation: 'Štandardná PVC izolácia kábla je hodnotená na 70 °C teplotu vodiča pri trvalej prevádzke. Prekročenie tejto hodnoty degraduje izoláciu.',
      },
      {
        id: 'wf1-q4',
        type: 'fill_blank',
        question: 'Kábel NYY sa používa pre ___ a podzemné vedenie.',
        answer: 'outdoor',
        hint: 'Tento kábel má robustný PVC vonkajší plášť vhodný pre náročné prostredie',
        explanation: 'Kábel NYY má odolný vonkajší PVC plášť určený pre vonkajšie a priamo zabudované podzemné inštalácie.',
      },
    ],
  },
  {
    id: 'wf-2-color-codes',
    topicId: 'wiring-fundamentals',
    order: 2,
    title: 'Farebné kódy vodičov',
    subtitle: 'Identifikácia vodičov podľa noriem EÚ a medzinárodných',
    xpReward: 30,
    diagramType: 'wire-colors',
    explanation: `
**Farebné označenie vodičov sú normy zachraňujúce životy.** Na prvý pohľad ti povedia, čo ktorý vodič robí, čím zabraňujú nebezpečným chybám.

**Európska norma IEC 60446 (Európa a mnohé iné krajiny):**
| Vodič | Farba |
|-------|-------|
| Fáza L1 | Hnedá |
| Fáza L2 | Čierna |
| Fáza L3 | Sivá |
| Nulový (N) | Modrá |
| Ochranné uzemnenie (PE) | Zeleno/Žltá |

**Historické UK (pred rokom 2004):**
| Vodič | Stará farba | Nová farba |
|-------|-------------|------------|
| Fáza | Červená | Hnedá |
| Nulový | Čierna | Modrá |
| Uzemnenie | Zeleno/Žltá | Zeleno/Žltá |

⚠️ **NIKDY:**
- Nepoužívaj Zeleno/Žltú pre iný vodič než PE
- Nepripájaj Modrú (Nulový) na fázovú svorku záťaže
- Nepracuj na neidentifikovaných vodičoch bez predchádzajúceho testovania

**Pri stretnutí so starou inštaláciou:**
- Stará UK/európska inštalácia môže mať iné farby
- Vždy testuj testerom napätia pred dotykom
- Zdokumentuj inštalačný systém pred prácou na ňomVýber správneho typu vodiča je kľúčový pre bezpečnosť a výkon. Dve hlavné kategórie:

**Podľa štruktúry vodiča:**
• **Plný vodič** — jeden kompaktný vodič. Tuhý, lacnejší, najlepší pre pevnú inštaláciu v chránički. Prierez do ~10 mm² je zvyčajne plný.
• **Lanko** — mnoho tenkých drôtov skrútených dohromady. Flexibilné, odolné voči únave. Používa sa pre flexibilné káble, prívody motorov.

**Podľa materiálu vodiča:**
• **Meď (Cu)** — najpoužívanejšia. Nízky odpor, ľahká na spájanie, odolná voči korózii. Štandardná voľba.
• **Hliník (Al)** — ľahší, lacnejší pre veľké káble. Vyšší odpor ako meď, vyžaduje špeciálne konektory (riziko galvánovej korózie na spojoch).

**Bežné typy káblov:**
| Typ | Použitie |
|-----|----------|
| NYM (Nemecko) / Twin & Earth (UK) | Pevná domáca inštalácia |
| NYY | Vonkajšie a podzemné vedenie |
| H07RN-F | Flexibilné ťažké, staveniskové použitie |
| NYMZ (tienený) | Riadiace obvody, citlivé na EMC |
| Koaxiálny | TV, RF signály |

**Teplotné hodnotenia:**
• Štandardný PVC: 70 °C trvalá prevádzka
• XLPE/EPR: 90 °C trvalá prevádzka
• Silikón: 180 °C — pri kotloch, rúrach`,
    keyPoints: [
      { icon: '🟤', text: 'Hnedá = Fáza (L)' },
      { icon: '🔵', text: 'Modrá = Nulový vodič (N)' },
      { icon: '🟢', text: 'Zeleno/Žltá = IBA Uzemnenie (PE)' },
      { icon: '⚠️', text: 'Vždy testuj! Stará inštalácia sa môže líšiť' },
    ],
    questions: [
      {
        id: 'wf2-q1',
        type: 'multiple_choice',
        question: 'Podľa európskej normy IEC, akú farbu má Nulový vodič (N)?',
        options: ['Brown', 'Green/Yellow', 'Blue', 'Grey'],
        correctIndex: 2,
        explanation: 'Modrá je Nulový (N) vodič podľa normy IEC. Nikdy ho nezamieňaj s uzemnením — uzemnenie je Zeleno/Žltá.',
      },
      {
        id: 'wf2-q2',
        type: 'true_false',
        question: "Zeleno/žltý prúžkovaný vodič možno použiť ako fázový vodič, ak nie je k dispozícii iná farba.",
        correct: false,
        explanation: 'Zeleno/žltá je VÝHRADNE vyhradená pre Ochranné uzemnenie (PE). Jej použitie pre akýkoľvek živý vodič je nelegálne a mimoriadne nebezpečné.',
      },
      {
        id: 'wf2-q3',
        type: 'multiple_choice',
        question: 'V trojfázovom európskom systéme, akou farbou je označená fáza 2?',
        options: ['Hnedá', 'Čierna', 'Sivá', 'Modrá'],
        correctIndex: 1,
        explanation: 'V európskej trojfázovej sústave: L1=Hnedá, L2=Čierna, L3=Sivá. Poznámka: v staršej UK inštalácii boli fázy Červená/Žltá/Modrá.',
      },
      {
        id: 'wf2-q4',
        type: 'fill_blank',
        question: 'V európskej inštalácii má Fázový vodič (fáza 1) ___ farbu.',
        answer: 'hnedú',
        hint: 'Pomysli na farbu fázového vodiča od harmonizácie v roku 2004',
        explanation: 'Hnedá je štandardná farba IEC/európskej normy pre fázový vodič L1 (živý) od harmonizácie v roku 2004.',
      },
    ],
  },
  {
    id: 'wf-3-cable-sizing',
    topicId: 'wiring-fundamentals',
    order: 3,
    title: 'Dimenzovanie káblov a prúdová zaťažiteľnosť',
    subtitle: 'Výber správneho prierezu pre záťaž',
    xpReward: 35,
    diagramType: 'cable-sizing',
    explanation: `
**Dimenzovanie káblov** (zaťažiteľnosť = prúdová kapacita) je jedna z najdôležitejších zručností elektrikára.

**Kľúčové pravidlo:** Zaťažiteľnosť kábla musí byť VÄČŠIA ako maximálny prúd obvodu.

**Štandardná zaťažiteľnosť medeného kábla (na vzduchu, PVC, okolitá teplota 30 °C):**
| Prierez | Typická zaťažiteľnosť | Typické použitie |
|---------|----------------------|------------------|
| 1,5 mm² | 15–17 A | Osvetľovacie obvody |
| 2,5 mm² | 20–25 A | Zásuvkové obvody |
| 4 mm² | 30–32 A | Sprchové obvody |
| 6 mm² | 38–40 A | Sporáky |
| 10 mm² | 52–55 A | Podradné rozvody, nabíjačky EV |
| 16 mm² | 70 A | Veľké rozvádzače |

**Korekčné faktory ZNIŽUJÚCE zaťažiteľnosť:**
• Inštalácia v izolácii: × 0,5
• Zviazané s inými káblami: × 0,65–0,8
• Vysoká okolitá teplota: Použi korekčnú tabuľku
• Uložené v zemi: Platia iné hodnoty

**Výpočet úbytku napätia:**
V_úbytok = (mV/A/m × I × L) / 1000
Udržuj < 3 % pre záverečné obvody (odporúčanie IEC)

**Zlaté pravidlo:** V prípade pochybností zvoľ väčší prierez. Cenový rozdiel je malý, ale poddimenzované káble spôsobujú požiare!**Wire color codes are life-saving standards.** They tell you at a glance which conductor does what, preventing dangerous mistakes.`,
    keyPoints: [
      { icon: '📏', text: '2,5 mm² meď: 20 A — štandardné zásuvkové okruhy' },
      { icon: '🌡️', text: 'Káblov zväzky, horúce miesta: aplikuj korekčné koeficienty' },
      { icon: '📉', text: 'Max. úbytok napätia: 3 % pre záverečné obvody' },
      { icon: '1️⃣', text: 'Kroky dimenz.: vypočítaj Ib → vyber In → overif zaťažiteľnosť' },
    ],
    questions: [
      {
        id: 'wf3-q1',
        type: 'multiple_choice',
        question: 'Aký prierez medeného kábla sa zvyčajne používa pre domáce zásuvkové okruhy (20 A)?',
        options: ['1.0 mm²', '1.5 mm²', '2.5 mm²', '6.0 mm²'],
        correctIndex: 2,
        explanation: 'Medený kábel 2,5 mm² má zaťažiteľnosť ~20 A, čo ho robí štandardom pre zásuvkové radiálne a kruhové obvody.',
      },
      {
        id: 'wf3-q2',
        type: 'true_false',
        question: 'Zviazanie viacerých káblov dohromady zvyšuje bezpečnú prúdovú zaťažiteľnosť každého kábla.',
        correct: false,
        explanation: 'Zviazané káble zachytávajú teplo. Bezpečná kapacita každého kábla musí byť ZNÍŽENÁ (korekcia) pri skupinovom uložení s inými káblami.',
      },
      {
        id: 'wf3-q3',
        type: 'multiple_choice',
        question: 'Aký minimálny prierez kábla sa typicky používa pre osvetľovacie obvody?',
        options: ['0.75 mm²', '1.5 mm²', '2.5 mm²', '4.0 mm²'],
        correctIndex: 1,
        explanation: '1,5 mm² (kapacita 14 A) je štandardné minimum pre osvetľovacie obvody — výrazne nad typickým 10–16 A ističom pre osvetlenie.',
      },
      {
        id: 'wf3-q4',
        type: 'fill_blank',
        question: 'Normy IEC požadujú maximálny ___ % úbytok napätia pre záverečné obvody.',
        answer: '3',
        hint: 'Tým sa zabezpečí, že záťaže dostanú dostatočné napätie',
        explanation: 'IEC 60364-5-52 povoľuje maximálny pokles napätia 3 % pri záverečných obvodoch (od rozvádzača po zásuvku).',
      },
    ],
  },
  {
    id: 'wf-4-circuit-protection',
    topicId: 'wiring-fundamentals',
    order: 4,
    title: 'Ochrana obvodu',
    subtitle: 'Poistky, ističe, chrániče a ich použitie',
    xpReward: 35,
    diagramType: 'protection',
    explanation: `
**Ochranné zariadenia obvodov** zabraňujú poškodeniu a chránia životy tým, že pri poruche odpoja obvod.

**Poistky:**
• Obsahujú drôt, ktorý sa roztaví, keď prúd prekročí menovitú hodnotu
• Jednorazové — po vypálení ich treba vymeniť
• Veľmi rýchle pri skratoch, pomalé pri preťažení
• Typy: BS88 HRC, BS1361, BS3036 kazetové

**Ističe (MCB):**
• Opäť zopínateľné — vypnú a dajú sa resetovať bez výmeny
• Dva mechanizmy vypnutia:
  - Tepelný (bimetal): pomalý, pri trvalých preťaženiach
  - Magnetický: rýchly, pri skratoch
• Typy: B (3–5×In), C (5–10×In), D (10–20×In)

**Chrániče (RCD):**
• Detekujú unikajúce prúdy do zeme ako malé ako 30 mA
• Vypnú za < 30 ms pri 30 mA — pred zástavou srdca
• 30 mA = osobná ochrana (zásuvkové obvody)
• 100 mA / 300 mA = ochrana iba pred požiarom
• Nechráni pred poruchami fáza-nulový!

**RCBO:**
= Istič + Chránič v jednom zariadení. Poskytuje ochranu pred nadprúdom AJ zemnou poruchou. Drahšie, ale ideálne pre jednotlivé obvody.

**Princíp koordinácie:**
Poistka/istič musí vypnúť PRED tým, ako kábel dosiahne maximálnu teplotu. Toto sa nazýva "koordinácia ochrany kábla".**Cable sizing** (ampacity = current-carrying capacity) is one of the most important skills for electricians.`,
    keyPoints: [
      { icon: '🔴', text: 'Poistka: roztaví sa raz — po poruche treba vymeniť' },
      { icon: '🔵', text: 'Istič (MCB): opakovane použiteľný, typy B/C/D' },
      { icon: '🟢', text: 'Chránič (RCD) 30 mA: ochrana pred unikajúcim prúdom' },
      { icon: '⚠️', text: 'Istič chráni kábel; chránič chráni ľudí' },
    ],
    questions: [
      {
        id: 'wf4-q1',
        type: 'multiple_choice',
        question: 'Ktoré ochranné zariadenie chráni pred úrazom prúdom pri zemnej poruche?',
        options: ['MCB', 'Poistka', 'RCD', 'Odpájač'],
        correctIndex: 2,
        explanation: 'RCD (Chránič) detekuje únikový prúd do zeme a odpojí do 40 ms — dostatočne rýchlo na predchádzanie smrteľnému úrazu.',
      },
      {
        id: 'wf4-q2',
        type: 'multiple_choice',
        question: 'Pre motorový obvod vyžadujúci Typ C istič (MCB), aký je magnetický prahovník?',
        options: ['2–3× menovitý prúd', '3–5× menovitý prúd', '5–10× menovitý prúd', '10–20× menovitý prúd'],
        correctIndex: 2,
        explanation: 'Ističe typu C vypínajú magneticky pri 5–10× menovitom prúde, čo umožňuje záberový prúd motora pri štarte.',
      },
      {
        id: 'wf4-q3',
        type: 'true_false',
        question: 'Istič (MCB) poskytuje osobnú ochranu pred úrazom elektrickým prúdom.',
        correct: false,
        explanation: 'Istič (MCB) chráni kábel pred nadprúdom/skratom. Pre osobnú ochranu pred elektrickým úrazom je potrebný chránič (RCD).',
      },
      {
        id: 'wf4-q4',
        type: 'fill_blank',
        question: 'Štandardná citlivosť chrániča (RCD) pre osobnú ochranu je ___ mA.',
        answer: '30',
        hint: 'Toto je polovica smrteľného prahu pre väčšinu ľudí',
        explanation: 'Chrániče 30 mA sú štandardom pre osobnú ochranu v domácich a komerčných inštaláciách.',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
//  DC MOTORS  (Premium)
// ─────────────────────────────────────────────────────────────────────────────

const dcMotors: Lesson[] = [
  {
    id: 'dc-1-how-motors-work',
    topicId: 'dc-motors',
    order: 1,
    title: 'Ako fungujú jednosmerné motory',
    subtitle: 'Elektromagnetická sila vytvára rotáciu',
    xpReward: 30,
    diagramType: 'dc-motor',
    explanation: `
**Jednosmerný motor (DC motor)** premieňa elektrickú energiu na mechanickú rotačnú energiu pomocou magnetických polí.

**Základný princíp — Lorentzova sila:**
Keď sa vodič nesúci prúd nachádza v magnetickom poli, zažíva silu:
**F = B × I × L**
Kde: B = hustota magnetického toku, I = prúd, L = dĺžka vodiča

**Komponenty motora:**
• **Stator** — statická časť, vytvára magnetické pole (permanentné magnety alebo budiacie cievky)
• **Rotor/Kotva** — rotujúca časť s vodivými cievkami
• **Komutátor** — rotačný spínač, ktorý mení smer prúdu v kotve každú polotáčku
• **Kefky** — uhlíkové kontakty prenášajúce prúd do/od rotujúceho komutátora

**Ako to funguje:**
1. Prúd tečie cez cievky kotvy
2. Cievky kotvy sú v magnetickom poli statora
3. Lorentzova sila pôsobí na vodiče → rotácia
4. Komutátor mení smer prúdu každých 180° → nepretržitá rotácia rovnakým smerom

**Protinapätie (back-EMF):**
Keď sa motor zrýchľuje, pôsobí ako generátor a produkuje "protinapätie", ktoré sa protivít napájaciemu napätiu. Tým obmedzuje prúd pri bežnej rýchlosti.
- V kľude: protinapätie = 0, prúd je vysoký (I = V/Ra)
- Pri plnej rýchlosti: protinapätie ≈ V_napájanie, prúd je nízky**Circuit protection devices** prevent damage and protect lives by disconnecting the circuit when a fault occurs.`,
    keyPoints: [
      { icon: '🧲', text: 'Motor pracuje na Lorentzovej sile: F = BIL' },
      { icon: '🔄', text: 'Komutátor mení smer prúdu pre plynulú rotáciu' },
      { icon: '✋', text: 'Flemingovo pravidlo ľavej ruky predpovedá smer sily' },
      { icon: '⬅️', text: 'Protinapätie (back-EMF) obmedzuje prúd pri plnej rýchlosti' },
    ],
    questions: [
      {
        id: 'dc1-q1',
        type: 'multiple_choice',
        question: 'Aký je účel komutátora v jednosmernom motore?',
        options: [
          'Izolovať rotor',
          'Meniť smer prúdu v rotore pre nepretržitú rotáciu',
          'Merať rýchlosť motora',
          'Pripojiť motor k napájaciemu zdroju',
        ],
        correctIndex: 1,
        explanation: 'Komutátor mení smer prúdu v kotvovom vinutí v správnom momente, aby rotor vždy zažíval silu v rovnakom smere rotácie.',
      },
      {
        id: 'dc1-q2',
        type: 'true_false',
        question: "V jednosmernom motore je stator rotujúca časť.",
        correct: false,
        explanation: 'Stator je STATICKÁ časť. Rotor (kotva) je rotujúca časť motora.',
      },
      {
        id: 'dc1-q3',
        type: 'multiple_choice',
        question: "Čo je 'protinapätie' (back-EMF) v jednosmernom motore?",
        options: [
          'Napätie, ktoré pomáha motoru naštartovať',
          'Napätie generované motorom, ktoré sa protivít napájaciemu napätiu',
          'Menovité napätie motora',
          'Napätie stratené v odpore kábla',
        ],
        correctIndex: 1,
        explanation: 'Keď sa jednosmerný motor zrýchľuje, pôsobí ako generátor a vytvára protinapätie, ktoré sa protivít priloženému napätiu a obmedzuje tok prúdu pri stálej rýchlosti.',
      },
      {
        id: 'dc1-q4',
        type: 'fill_blank',
        question: "Flemingovo pravidlo ľavej ruky sa používa s palcom, ukazovákom a prostredníkom na nájdenie ___ motora.",
        answer: 'silu',
        hint: 'Čo motor produkuje, čo vytvára rotáciu?',
        explanation: "Flemingovo pravidlo ľavej ruky (pre motory): palec = Sila (pohyb), ukazovák = Pole, prostredník = Prúd. Udáva smer sily na vodič.",
      },
    ],
  },
  {
    id: 'dc-2-motor-components',
    topicId: 'dc-motors',
    order: 2,
    title: 'Časti motora',
    subtitle: 'Kotva, budenie, kefky a ložiská',
    xpReward: 25,
    diagramType: 'dc-motor',
    explanation: `
**Jednosmerné motory majú niekoľko kľúčových komponentov**, ktoré vyžadujú údržbu a pochopenie:

**Kotva (Rotor):**
• Jadro: Laminované železo na zníženie strát víriacimi prúdmi
• Vinutia: Medené cievky zabudované v drážkach
• Komutátor: Medené segmenty, izolované od seba

**Budiaci systém (Stator):**
• Permanentné magnety (malé motory) alebo
• Budiace cievky (väčšie motory — umožňuje riadenie rýchlosti)
• Typy: Sériové, Paralelné (shunt), Kombinované, Samostatné budenie

**Kefky:**
• Vyrobené z uhlíka/grafitu (mäkké, chránia komutátor)
• Prúžinami pritlačené na udržanie kontaktného tlaku
• Opotrebúvajú sa, treba kontrolovať každých 1 000–3 000 hodín
• Príznaky problémov s kefkami: iskrenie, chvenie, hluk

**Ložiská:**
• Podopierajú hriadeľ rotora
• Príznaky poruchy: vibrácie, hluk, prehriatie
• Treba mazať podľa harmonogramu výrobcu

**Chladenie:**
• Ventilátor na hriadeli rotora (samochladené) alebo
• Nútená ventilácia pre uzavreté motory
• Prehriatie je hlavnou príčinou poruchy motora

**Informácie na štítku motora:**
Výkon kW, napätie, prúd, RPM, pracovný cyklus, trieda izolácie (A=105 °C, B=130 °C, F=155 °C, H=180 °C)A **DC (Direct Current) motor** converts electrical energy into mechanical rotational energy using magnetic fields.`,
    keyPoints: [
      { icon: '🔴', text: 'Uhlíkové kefky sa opotrebúvajú — pravidelne kontroluj a vymeň' },
      { icon: '🧩', text: 'Laminované jadro kotvy znižuje straty víriacimi prúdmi' },
      { icon: '⚙️', text: 'Ložiská potrebujú pravidelné kontroly mazania' },
      { icon: '✨', text: 'Komutátor musí byť hladký a farby medi' },
    ],
    questions: [
      {
        id: 'dc2-q1',
        type: 'multiple_choice',
        question: 'Prečo je jadro kotvy vyrobené z laminovaných oceľových plechov a nie z plného železa?',
        options: [
          'Odľahčiť ho',
          'Znížiť straty víriacimi prúdmi',
          'Zlepšiť odvod tepla',
          'Zvýšiť magnetické pole',
        ],
        correctIndex: 1,
        explanation: 'Laminovanie prerušuje dráhy víriacich prúdov (indukovaných cirkulačných prúdov v železnom jadre), čím výrazne znižuje tepelné straty v jadre.',
      },
      {
        id: 'dc2-q2',
        type: 'true_false',
        question: 'Kefky jednosmerného motora nikdy nepotrebujú výmenu, pretože sú vyrobené z tvrdej ocele.',
        correct: false,
        explanation: 'Kefky sú vyrobené z mäkkého uhlíka/grafitu a postupne sa opotrebúvajú. Pravidelná kontrola a výmena je súčasťou údržby jednosmerných motorov.',
      },
      {
        id: 'dc2-q3',
        type: 'multiple_choice',
        question: 'Aký typ budenia poskytuje najvyšší záberový moment v jednosmernom motore?',
        options: ['Permanentný magnet', 'Shuntové (paralelné) vinutie', 'Sériové vinutie', 'Kombinované vinutie'],
        correctIndex: 2,
        explanation: 'Sériové jednosmerné motory majú budiace vinutie v sérii s kotvou — pri štarte (vysoký prúd) silné pole vytvára mimoriadne vysoký moment. Používa sa v trakčných/žeriavových motoroch.',
      },
      {
        id: 'dc2-q4',
        type: 'fill_blank',
        question: 'Zdravý komutátor by mal byť hladký a ___ farby.',
        answer: 'medenej',
        hint: 'Pomysli na to, z čoho je vyrobený komutátor',
        explanation: 'Zdravý komutátor má hladký, medeno sfarbený povrch. Čierne sfarbenie môže indikovať problémy s kefkami; modré/zelené sfarbenie indikuje prehriatie.',
      },
    ],
  },
  {
    id: 'dc-3-motor-control',
    topicId: 'dc-motors',
    order: 3,
    title: 'Spúšťanie a regulácia otáčok motora',
    subtitle: 'Spúšťacie obvody a metódy regulácie rýchlosti',
    xpReward: 35,
    diagramType: 'motor-control',
    explanation: `
**Priame spustenie jednosmerného motora** okamžite priloží plné napätie — to spôsobuje veľmi vysoký záberový prúd (až 10× menovitý), ktorý môže poškodiť motor a napájaciu sústavu.

**Prečo je záberový prúd nebezpečný:**
V kľude je protinapätie = 0, takže I = V / R_kotvy
Keďže R_kotvy je veľmi malý (typicky < 1 Ω), prúd môže byť obrovský.

**Metódy spúšťania:**
1. **Sériový rozbehovací odpor** — znižuje napätie na kotve pri štarte, odpory sa vypínajú pri naberaní rýchlosti
2. **Softvér napätia (soft starter)** — postupne zvyšuje napájacie napätie
3. **PWM pohon (moderný)** — elektronický regulátor postupne zvyšuje prúd

**Metódy riadenia rýchlosti:**
| Metóda | Účinok | Rozsah rýchlostí |
|--------|--------|-----------------|
| Riadenie napätia kotvy | Pod základnou rýchlosťou | 0 na základ |
| Oslabenie poľa | Nad základnou rýchlosťou | Základ na maximum |
| PWM regulácia | Akákoľvek rýchlosť | Celý rozsah |

**Rekuperačné brzdenie:**
Jednosmerné motory môžu pri spomaľovaní pôsobiť ako generátory a vracať energiu naspäť do siete — používa sa v elektrických vozidlách a žeriavoch.

**Štvorštvorcová prevádzka:**
Moderné jednosmerné pohony dokážu:
1. Dopredné motorické riadenie
2. Dopredné brzdenie (rekuperácia)
3. Spätné motorické riadenie
4. Spätné brzdenie (rekuperácia)**DC motors have several key components** that require maintenance and understanding:`,
    keyPoints: [
      { icon: '⚡', text: 'Priamy záber (DOL) spôsobuje obrovský záberový prúd' },
      { icon: '📉', text: 'Rozbeháče postupne znižujú sériový odpor pri zvyšovaní rýchlosti' },
      { icon: '🔧', text: 'Regulácia: napätie kotvy (pod základnou rýchlosťou) alebo oslabenie poľa (nad základnou)' },
      { icon: '💻', text: 'Moderné jednosmerné pohony používajú PWM na plynulé riadenie' },
    ],
    questions: [
      {
        id: 'dc3-q1',
        type: 'multiple_choice',
        question: "Prečo je nebezpečné spustiť veľký jednosmerný motor 'priamo zo siete' (plné napätie, bez rozbeháča)?",
        options: [
          'Motor sa bude otáčať dozadu',
          'Veľmi vysoký záberový prúd môže poškodiť vinutia a zdroj',
          'Motor nevyvinie dostatočný krútiaci moment',
          'Komutátor prestane fungovať',
        ],
        correctIndex: 1,
        explanation: 'V kľude je protinapätie nulové, takže prúd kotvy = V/Ra. Odpor kotvy je veľmi malý, čo spôsobuje prúd až 10× menovitej hodnoty, ktorý môže spáliť vinutia.',
      },
      {
        id: 'dc3-q2',
        type: 'true_false',
        question: 'Zvýšenie budiaceho prúdu (posilnenie poľa) zvyšuje rýchlosť jednosmerného shunt motora.',
        correct: false,
        explanation: 'Zvýšenie budiaceho prúdu zvyšuje tok, čo ZNIŽUJE rýchlosť (rýchlosť je nepriamo úmerná toku v jednosmerných motoroch). Oslabenie poľa zvyšuje rýchlosť.',
      },
      {
        id: 'dc3-q3',
        type: 'multiple_choice',
        question: 'Akú metódu používajú moderné pohony na riadenie rýchlosti jednosmerného motora?',
        options: ['Premenlivé sériové odpory', 'Prevodovky', 'PWM (Pulzná šírková modulácia)', 'Zmena vinutia motora'],
        correctIndex: 2,
        explanation: 'Moderné jednosmerné pohony používajú PWM alebo fázové riadenie SCR/tyristorov na zmenu priemerného napätia na kotve, čím poskytujú plynulé, efektívne riadenie rýchlosti bez zbytočného tepla.',
      },
      {
        id: 'dc3-q4',
        type: 'fill_blank',
        question: 'Oslabenie ___ sa používa na riadenie rýchlosti jednosmerného motora nad jeho základnou rýchlosťou.',
        answer: 'poľa',
        hint: 'Znižuješ budiaci prúd, aby si to dosiahol',
        explanation: 'Oslabenie poľa (zníženie budiaceho prúdu) sa používa na dosiahnutie rýchlostí nad základnou rýchlosťou pri zachovaní približne konštantného výkonu.',
      },
    ],
  },
  {
    id: 'dc-4-motor-protection',
    topicId: 'dc-motors',
    order: 4,
    title: 'Ochrana motora',
    subtitle: 'Ochrana pred preťažením, skratom a teplom',
    xpReward: 30,
    diagramType: 'dc-motor',
    explanation: `
**Jednosmerné motory musia byť chránené** pred abnormálnymi stavmi, ktoré môžu motor poškodiť alebo zničiť:

**Ochrana pred nadprúdom/preťažením:**
• Tepelné relé preťaženia — bimetalové pásky zahrievané prúdom motora vypnú po trvalej preťaži
• Nastavenie: 115–120 % menovitého prúdu motora
• Povolenie pre záberový prúd 6× počas štartu (s časovým oneskorením)

**Ochrana pred skratom:**
• Rýchlopoistky HRC alebo ističe len s magnetickým vypnutím
• Musia vypnúť skôr, ako prúd môže poškodiť vinutia
• Často nastavené na 10× menovitý prúd pre motorové obvody

**Teplotná ochrana:**
• PTC termistory zabudované vo vinutiach
• Odpor prudko vzrastie pri prahovej teplote
• Spustí relé na vypnutie motora pred poškodením izolácie

**Ochrana proti strate budiaceho poľa (shunt motory):**
• Strata poľa spôsobuje nekontrolovateľné zvyšovanie rýchlosti (pretočenie)
• Relé straty poľa detekuje absenciu budiaceho prúdu
• Okamžite vypne motorový obvod

**Ochrana proti podnapätiu:**
• Strata napätia zastaví motor (bezpečné)
• Stykač vypadne pri strate napájania
• Zabraňuje nečakanému opätovnému spusteniu po obnovení napájania (bezpečnosť)

**Strata fázy (trojfázové motory):**
• Prevádzka na jednej fáze spôsobuje 3× nadprúd
• Relé straty fázy detekuje nevyváženú/chýbajúcu fázu
• Motorové ochranné spínače majú vbudovanú ochranu fázy**Starting a DC motor directly** applies full voltage instantly — this causes very high inrush current (up to 10× rated) which can damage the motor and supply.`,
    keyPoints: [
      { icon: '🌡️', text: 'Tepelné relé preťaženia chráni pred trvalým preťažením' },
      { icon: '💥', text: 'Poistka/istič chráni pred skratom' },
      { icon: '🏃', text: 'Relé straty budiaceho poľa zabraňuje nebezpečnému pretočeniu motora' },
      { icon: '📡', text: 'PTC termistory priamo monitorujú teplotu vinutia' },
    ],
    questions: [
      {
        id: 'dc4-q1',
        type: 'multiple_choice',
        question: 'Čo sa stane s jednosmerným shunt motorom, ak stratí budiaci prúd počas prevádzky?',
        options: [
          'Okamžite sa zastaví',
          'Beží s mierne nižšou rýchlosťou',
          'Nebezpečne sa pretočí (samovoľné zrýchlenie)',
          'Odoberá menej prúdu',
        ],
        correctIndex: 2,
        explanation: 'Bez magnetického toku poľa klesá protinapätie, čo spôsobuje obrovský prúd kotvy a motor sa pokúša zrýchliť na nebezpečne vysoké otáčky — stav "pretočenia", ktorý môže motor zničiť.',
      },
      {
        id: 'dc4-q2',
        type: 'true_false',
        question: 'Tepelné relé preťaženia je navrhnuté na zvládnutie vysokého prúdu pri priamom skrate.',
        correct: false,
        explanation: 'Tepelné relé sú navrhnuté iba pre dlhotrvajúce preťaženia. Skratové prúdy sú v tisíckach ampérov — len rýchlopoistky HRC alebo ističe ich môžu bezpečne prerušiť.',
      },
      {
        id: 'dc4-q3',
        type: 'multiple_choice',
        question: 'PTC termistor zabudovaný vo vinutí motora sa používa na:',
        options: [
          'Merať spotrebu prúdu',
          'Monitorovať teplotu vinutia',
          'Riadiť rýchlosť motora',
          'Chrániť pred stratou budiaceho poľa',
        ],
        correctIndex: 1,
        explanation: 'PTC (Pozitívny teplotný koeficient) termistory sú zabudované vo vinutiach; ich odpor prudko vzrastie pri nastavenej teplote, čím spustia vypnutie na ochranu vinutia.',
      },
      {
        id: 'dc4-q4',
        type: 'fill_blank',
        question: 'Tepelné relé preťaženia sníma ___ motora na ochranu pred preťažením.',
        answer: 'prúd',
        hint: 'Na akú veličinu reaguje ohrievací článok v tepelnom relé?',
        explanation: 'Tepelné relé preťaženia obsahuje ohrievacie články, ktoré nesú prúd motora. Nadmerný prúd zahrieva bimetalovú pásku, ktorá sa ohne a odpojí motor.',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
//  SAFETY RULES  (Premium)
// ─────────────────────────────────────────────────────────────────────────────

const safetyRules: Lesson[] = [
  {
    id: 'sf-1-hazards',
    topicId: 'safety-rules',
    order: 1,
    title: 'Elektrické nebezpečenstvá',
    subtitle: 'Riziká: úraz prúdom, popálenie, požiar, oblúkový výboj',
    xpReward: 30,
    diagramType: 'safety',
    explanation: `
Elektrina je jednou z hlavných príčin pracovných úrazov s následkom smrti. Pochopenie nebezpečenstiev je prvým krokom k predchádzaniu nehodám.

**Hlavné elektrické nebezpečenstvá:**

**1. Úraz elektrickým prúdom**
Prúd prechádza cez telo — môže spôsobiť:
- Svalové stiahnutie (nemôžeš pustiť)
- Zlyhanie dýchania
- Zástava srdca (komorová fibrilácia)
- Popáleniny v mieste vstupu/výstupu

**2. Oblúkový výboj**
Výbušný elektrický oblúk uvoľňuje obrovskú energiu:
- Teploty až 20 000 °C (4× povrch Slnka)
- Intenzívne UV/IR žiarenie spôsobujúce slepotu
- Tlaková vlna (výbuch)
- Roztavené kovové projektily
- Intenzívny zvuk (poškodenie sluchu)

**3. Požiar a výbuch**
- Preťažené káble zapaľujú izoláciu
- Iskry zapaľujú horľavé výpary/prach
- Nevhodné zariadenia v nebezpečných priestoroch

**Bezpečné hladiny napätia:**
- Veľmi nízke napätie (ELV): < 50 V AC / 120 V DC
- Aj ELV môže byť nebezpečné vo vlhkých podmienkach alebo pri vysokej uloženej energii

**Zlaté pravidlo elektrickej bezpečnosti:**
**VŽDY PREDPOKLADAJ, ŽE OBVODY SÚ POD NAPÄTÍM, KÝM TO TESTOVACÍM ZARIADENÍM NEOVERÍ OPAK****DC motors must be protected** against abnormal conditions that can damage or destroy the motor:`,
    keyPoints: [
      { icon: '⚡', text: '50–100 mA cez srdce môže byť smrteľné' },
      { icon: '🌊', text: 'Mokrá pokožka výrazne znižuje odpor tela' },
      { icon: '💥', text: 'Oblúkový výboj: 20 000 °C — najnebezpečnejšie elektrické riziko' },
      { icon: '🔥', text: 'Preťaženie vedenia môže spôsobiť požiar bez okamžitého výpadku' },
    ],
    questions: [
      {
        id: 'sf1-q1',
        type: 'multiple_choice',
        question: 'Pri akej hladine prúdu typicky nastáva komorová fibrilácia (potenciálne smrteľný srdcový rytmus)?',
        options: ['1 mA', '10 mA', '50–100 mA', '1000 mA'],
        correctIndex: 2,
        explanation: '50–100 mA prechádzajúce srdcom môže spôsobiť komorovú fibriláciu. Pri 10 mA sa dosiahne prah "nemôžeš pustiť" — svaly sa stiahnu a obeť nemôže uvoľniť vodič.',
      },
      {
        id: 'sf1-q2',
        type: 'true_false',
        question: 'Suchá pokožka poskytuje oveľa menšiu ochranu pred úrazom prúdom ako mokrá pokožka.',
        correct: false,
        explanation: 'SUCHÁ pokožka má vysoký odpor (~100 000 Ω), čo obmedzuje prúd. MOKRÁ pokožka znižuje odpor na ~1 000 Ω, čo robí úraz OVEĽA nebezpečnejším. Preto vlhké podmienky výrazne zvyšujú riziko úrazu elektrickým prúdom.',
      },
      {
        id: 'sf1-q3',
        type: 'multiple_choice',
        question: 'Akú teplotu môže oblúkový výboj dosiahnuť?',
        options: ['500°C', '2,000°C', '5,000°C', '20,000°C'],
        correctIndex: 3,
        explanation: 'Oblúkový výboj môže dosiahnuť teploty až 20 000 °C — približne štyrikrát horúcejšie ako povrch Slnka. Pri tejto teplote sa kovy okamžite odparujú.',
      },
      {
        id: 'sf1-q4',
        type: 'fill_blank',
        question: 'Najnebezpečnejšia dráha prúdu cez telo je z ruky do ruky, pretože prechádza cez ___.',
        answer: 'srdce',
        hint: 'Ktorý životne dôležitý orgán sa nachádza medzi tvojimi dvomi rukami?',
        explanation: 'Dráha prúdu ruka-ruka prechádza hrudníkom a srdcom, čo je najnebezpečnejšia cesta, pretože môže spôsobiť fibriláciu srdca aj pri relatívne nízkych prúdoch.',
      },
    ],
  },
  {
    id: 'sf-2-ppe',
    topicId: 'safety-rules',
    order: 2,
    title: 'Osobné ochranné pracovné prostriedky (OOPP)',
    subtitle: 'Rukavice, ochrana očí, obleky pri oblúku a ďalšie',
    xpReward: 30,
    diagramType: 'safety',
    explanation: `
**OOPP sú poslednou líniou obrany** — inžinierske kontroly a izolácia musia byť vždy na prvom mieste. Ale ak sú OOPP potrebné, musia byť správneho typu pre dané nebezpečenstvo.

**Izolačné rukavice (IEC 60903):**
| Trieda | Max. AC napätie | Max. DC napätie |
|--------|-----------------|-----------------|
| 00 | 500 V | 750 V |
| 0 | 1 000 V | 1 500 V |
| 1 | 7 500 V | 11 250 V |
| 2 | 17 000 V | 25 500 V |
| 3 | 26 500 V | 39 750 V |
| 4 | 36 000 V | 54 000 V |

**Kontrola pred každým použitím:**
• Zvij na zachytenie vzduchu, stlač — skontroluj diery (test nafúknutím)
• Skontroluj rezy, odreniny, chemické poškodenie
• Skontroluj dátum — vymeň každých 6–12 mesiacov alebo podľa výrobcu

**Kategórie OOPP pre oblúkový výboj (NFPA 70E):**
| Kategória | Min. hodnotenie oblúka | Typické oblečenie |
|-----------|------------------------|-------------------|
| 1 | 4 cal/cm² | FR košeľa + nohavice |
| 2 | 8 cal/cm² | FR košeľa + nohavice + oblek proti oblúku |
| 3 | 25 cal/cm² | Oblek proti oblúku |
| 4 | 40 cal/cm² | Ťažký oblek proti oblúku |

**Vždy potrebné pri elektrickej práci:**
• Ochranné okuliare/štít
• Ochranná helma (trieda E pre prácu na živých zariadeniach)
• Bezpečnostná obuv (nevodivá podrážka)
• Reflexná vesta tam, kde to vyžadujú pravidlá pracoviskaElectricity is one of the leading causes of workplace fatalities. Understanding the hazards is the first step to preventing accidents.`,
    keyPoints: [
      { icon: '🧤', text: 'Izolačné rukavice: skontroluj triedu pre príslušné napätie' },
      { icon: '👁️', text: 'Štít tváre je povinný pri práci s rizikom oblúkového výboja' },
      { icon: '🦺', text: 'OOPP pri oblúku je hodnotené v cal/cm² dopadajúcej energie' },
      { icon: '✅', text: 'Pred každým použitím skontroluj rukavice na diery (nafukovací test)' },
    ],
    questions: [
      {
        id: 'sf2-q1',
        type: 'multiple_choice',
        question: 'Aká trieda izolačných rukavíc je hodnotená pre napätia až 1 000 V AC?',
        options: ['Trieda 00', 'Trieda 0', 'Trieda 1', 'Trieda 2'],
        correctIndex: 1,
        explanation: 'Rukavice triedy 0 sú hodnotené pre napätie až 1 000 V AC. Trieda 00 je pre napätie až 500 V. Vždy vyber triedu vhodnú pre pracovné napätie.',
      },
      {
        id: 'sf2-q2',
        type: 'true_false',
        question: 'Bežné bavlnené oblečenie poskytuje dostatočnú ochranu pred oblúkovým výbojom.',
        correct: false,
        explanation: 'Bežná bavlna neposkytuje ochranu pred oblúkovým výbojom. Oblúkový výboj vyžaduje ŠPECIÁLNE oblečenie s hodnotením AR (ohnivzdorné) nad úrovňou dopadajúcej energie. Bežný polyester/nylon sa taví a spôsobuje horšie popáleniny.',
      },
      {
        id: 'sf2-q3',
        type: 'multiple_choice',
        question: 'Pred použitím izolačných gumených rukavíc, ako ich skontrolujete na defekty?',
        options: [
          'Hľadaj zmeny farby',
          'Nafúkni vzduchom a skontroluj úniky',
          'Otestuj multimetrom',
          'Ponor do vody',
        ],
        correctIndex: 1,
        explanation: 'Zvij manžetu a zachyť vzduch vo vnútri rukavice, potom stlač na vytvorenie tlaku. Každá diera umožní únik vzduchu, ktorý pocítiš. Vizuálna kontrola nestačí — aj najmenší otvor môže byť smrteľný.',
      },
      {
        id: 'sf2-q4',
        type: 'fill_blank',
        question: 'Kategórie OOPP pre oblúkový výboj sú založené na ___ energetických úrovniach meraných v cal/cm².',
        answer: 'dopadajúcich',
        hint: 'Energia, ktorá môže dosiahnuť pracovníka v danej vzdialenosti',
        explanation: 'Dopadajúca energia (cal/cm²) je energia na jednotku plochy, ktorá by mohla dosiahnuť pracovníka počas udalosti oblúkového výboja. OOPP musia byť hodnotené na tejto úrovni alebo vyššie.',
      },
    ],
  },
  {
    id: 'sf-3-loto',
    topicId: 'safety-rules',
    order: 3,
    title: 'Uzamknutie / Označenie (LOTO)',
    subtitle: 'Postup, ktorý zachraňuje životy pri údržbe',
    xpReward: 35,
    diagramType: 'safety',
    explanation: `
**LOTO (Uzamknutie/Označenie)** je postup používaný na zabezpečenie, že elektrické zariadenie je bezpečne bez napätia pred začatím údržby alebo opravných prác.

**Postup LOTO krok za krokom:**
1. **Identifikuj** všetky zdroje energie (elektrická, pneumatická, hydraulická, pružinová, gravitačná)
2. **Oznám** dotknutému personálu
3. **Normálne vypni** zariadenie
4. **Izoluj** pomocou hlavného odpájača/odpojovaíča
5. **Nasaď zámok** — každý pracovník nasadí vlastný visiaci zámok
6. **Nasaď štítok** — výstražná nálepka vysvetľujúca uzamknutie
7. **Uvoľni uloženú energiu** — vybi kondenzátory, uvoľni pružiny, odvzdušni tlak
8. **Over** nulový energetický stav vhodným testovacím zariadením

**Kritické pravidlá:**
• KAŽDÝ pracovník musí nasadiť VLASTNÝ zámok
• Iba pracovník, ktorý nasadil zámok, ho môže odstrániť
• Ani nadriadení nemôžu odstrániť zámok inej osoby
• Samotné štítky (bez zámkov) NIE SÚ dostatočné

**Skupinové uzamknutie:**
Keď je prítomných viacero pracovníkov, použije sa skupinová konzola LOTO — každý nasadí vlastný zámok na konzolu, ktorá uzamkne izolačný bod. Práce môžu pokračovať iba keď sú VŠETKY zámky nasadené.

**Overenie energie:**
Po nasadení LOTO:
- Testuj napätie kalibrovaným testerom napätia
- Pokús sa stlačiť ovládacie prvky Štart/Beh
- Iba po potvrdení nulového stavu = bezpečné na prácu**PPE is the last line of defense** — engineering controls and isolation should always come first. But when PPE is required, it must be the right type for the hazard.`,
    keyPoints: [
      { icon: '🔒', text: 'Každý pracovník nasadí VLASTNÝ osobný zámok' },
      { icon: '📋', text: '6 krokov: Priprav → Notifikuj → Vypni → Izoluj → Uzamkni → Overif' },
      { icon: '⚡', text: 'VŽDY overif multimetrom nulové napätie' },
      { icon: '🚫', text: 'NEVER remove someone else\'s lock — ever' },
    ],
    questions: [
      {
        id: 'sf3-q1',
        type: 'multiple_choice',
        question: 'Koľko osobných zámkov by mal pracovník nasadiť počas postupu LOTO?',
        options: [
          'Žiadny — nadriadený aplikuje zámok za celý tím',
          'Jeden na každé izolačné miesto',
          'Jeden — vlastný osobný zámok',
          'Toľko, koľko je pracovníkov v tíme',
        ],
        correctIndex: 2,
        explanation: 'Každý jednotlivý pracovník nasadí VLASTNÝ osobný visací zámok. Kľúč zostáva pri ňom. Tým sa zabezpečí, že nikto nemôže opätovne nabiť zariadenie, kým na tom pracuje.',
      },
      {
        id: 'sf3-q2',
        type: 'true_false',
        question: "V núdzovej situácii môže nadriadený odstrániť LOTO zámok iného pracovníka na opätovné prepojenie zariadenia.",
        correct: false,
        explanation: 'Za ŽIADNYCH okolností by nemala iná osoba odstrániť zámok pracovníka — ani nadriadený. Núdzové odstránenie vyžaduje prísne zdokumentované postupy a overenie, že pracovník je v bezpečí.',
      },
      {
        id: 'sf3-q3',
        type: 'multiple_choice',
        question: 'Aký je POSLEDNÝ krok pred začatím údržby po nasadení LOTO?',
        options: [
          'Skontroluj pracovné povolenie',
          'Nasaď OOPP',
          'Testuj meradlom na overenie nulovej energie',
          'Informuj nadriadeného',
        ],
        correctIndex: 2,
        explanation: 'Vždy over nulový energetický stav správne fungujúcim testovacím prístrojom. Nikdy nepredpokladaj — izolačné zariadenia môžu zlyhať. Zlaté pravidlo: Testuj pred dotykom.',
      },
      {
        id: 'sf3-q4',
        type: 'fill_blank',
        question: 'LOTO znamená Uzamknutie / ___.',
        answer: 'tagout',
        hint: 'Výstražná nálepka pripevnená, keď nie je možné použiť zámok',
        explanation: 'Uzamknutie/Označenie: Uzamknuté zariadenie (visací zámok) fyzicky zabraňuje opätovnému nabitiu; výstražná nálepka poskytuje informácie. Keď uzamknutie nie je možné, samotný štítok môže byť použitý s dodatočnými opatreniami.',
      },
    ],
  },
  {
    id: 'sf-4-arc-flash',
    topicId: 'safety-rules',
    order: 4,
    title: 'Bezpečnosť pri oblúkovom výboji',
    subtitle: 'Hranice, kategórie OOPP a hodnotenie rizika',
    xpReward: 35,
    diagramType: 'safety',
    explanation: `
**Oblúkový výboj** je jedno z najzávažnejších elektrických nebezpečenstiev. Pochopenie ochranných hraníc je nevyhnutné pre každého, kto pracuje v blízkosti nabytých zariadení.

**Hranice oblúkového výboja (NFPA 70E / IEC):**
Obmedzený prístup (~3 m): nekvalifikované osoby sa zastavujú tu.
Obmedzený prístup (kvalifikovaný, ~300 mm–1 m): iba kvalifikovaní pracovníci s OOPP.
Hranica oblúkového výboja (vypočítaná): kde dopadajúca energia = 1,2 cal/cm².
Pracovná vzdialenosť: poloha tváre/tela počas práce.

**Faktory ovplyvňujúce závažnosť oblúkového výboja:**
1. Dostupný skratový prúd (vyšší = viac energie)
2. Čas oblúka (dlhší oblúk = viacej dopadajúcej energie)
3. Pracovná vzdialenosť (zákon inverzného štvorca)
4. Napätie sústavy
5. Vzduchová medzera/otvory zariadenia

**Zníženie rizika oblúkového výboja:**
• Zónová selektívna väzba (rýchlejší výpadok)
• Diferenciálna ochrana prípojníc
• Systémy detekcie oblúka (svetelné senzory)
• Uzemnenie s vysokým odporom
• Diaľkové vytiahnutie odpínačov**LOTO (Lockout/Tagout)** is the procedure used to ensure that electrical equipment is safely de-energized before maintenance or repair work begins.`,
    keyPoints: [
      { icon: '📍', text: '4 ochranné hranice od vnútornej po vonkajšiu' },
      { icon: '1️⃣', text: 'Najlepšia ochrana: VŽDY najprv odpoj napájanie!' },
      { icon: '🏷️', text: 'Nálepky oblúkového výboja na rozvádzačoch — prečítaj pred prácou' },
      { icon: '📐', text: 'Dopadajúca energia v cal/cm² určuje kategóriu OOPP' },
    ],
    questions: [
      {
        id: 'sf4-q1',
        type: 'multiple_choice',
        question: 'Aký je najlepší spôsob ochrany pred rizikom oblúkového výboja?',
        options: [
          'Nosi OOPP s najvyšším hodnotením pre oblúkový výboj',
          'Pracuj veľmi rýchlo v blízkosti zariadenia',
          'De-energize and follow LOTO before working',
          'Použi dlhšie izolované náradie',
        ],
        correctIndex: 2,
        explanation: 'Eliminácia nebezpečenstva je vždy najlepšou kontrolou — odenergetizuj zariadenie. OOPP sú poslednou možnosťou, nie prvým riešením.',
      },
      {
        id: 'sf4-q2',
        type: 'true_false',
        question: 'Hranica ochrany pred oblukom je 1,2 cal/cm² — kde popálenie 1. stupňa je najhorší možný výsledok.',
        correct: false,
        explanation: '1,2 cal/cm² je prah pre popálenie DRUHÉHO stupňa. Hranica ochrany pred výbojom je vonkajšia hranica, kde sú OOPP potrebné na zabránenie vážnym popáleninám.',
      },
      {
        id: 'sf4-q3',
        type: 'multiple_choice',
        question: 'Aké informácie musia byť uvedené na nálepke rizika oblúkového výboja na elektrickom rozvádzači?',
        options: [
          'Iba hladinu napätia',
          'Dopadajúca energia, hranica oblúkového výboja a požadované OOPP',
          'Meno inštalatéra',
          'Dátum poslednej údržby',
        ],
        correctIndex: 1,
        explanation: 'NFPA 70E vyžaduje, aby nálepky oblúkového výboja obsahovali: dopadajúcu energiu (cal/cm²), hranicu oblúka, požadovanú kategóriu OOPP/hodnotenie oblúka a dostupný skratový prúd.',
      },
      {
        id: 'sf4-q4',
        type: 'fill_blank',
        question: 'Dopadajúca energia oblúkového výboja sa vypočítava na základe skratového prúdu, doby oblúka a pracovnej ___.',
        answer: 'vzdialenosti',
        hint: 'Ako ďaleko je pracovník od zdroja oblúka?',
        explanation: 'Dopadajúca energia klesá so vzdialenosťou (nepriamo úmerne druhej mocnine vzdialenosti). Pracovná vzdialenosť od zdroja oblúka je kľúčovým vstupom vo výpočtoch oblúkového výboja.',
      },
    ],
  },
  {
    id: 'sf-5-osha',
    topicId: 'safety-rules',
    order: 5,
    title: 'Predpisy a normy',
    subtitle: 'OSHA, IEC, NEC a smernice EÚ, ktoré musíš poznať',
    xpReward: 30,
    diagramType: 'safety',
    explanation: `
Elektrická práca sa riadi prísnymi predpismi a normami. Ako elektrikár si zo zákona povinný ich dodržiavať.

**Medzinárodné normy:**
• **IEC 60364** — Medzinárodná norma pre elektrické inštalácie (základ pre väčšinu národných kódexov)
• **IEC 60446** — Farebné kódy vodičov
• **IEC 60529** — Stupne krytia (IP)
• **IEC 60950/62368** — Bezpečnosť zariadení

**Príklady národných noriem:**
| Krajina | Norma |
|---------|-------|
| UK | BS 7671 (18. vydanie) — Nariadenia IET pre zapojenie |
| Nemecko | DIN VDE 0100 |
| Francúzsko | NF C 15-100 |
| USA | NFPA 70 (Národný elektrický kódex) |
| Austrália | AS/NZS 3000 (Pravidlá zapojenia) |

**Kľúčové zákonné požiadavky (EÚ/UK):**
• Všetky nové inštalácie musia byť inšpekciou testované
• Pravidelná inšpekcia je potrebná (každých 5–10 rokov pre komerčné priestory)
• Práce musí vykonávať alebo dohliadať kompetentná osoba
• Musia byť vydané certifikáty súladu

**Požiadavky na odbornosť:**
Väčšina jurisdikcií vyžaduje:
- Formálnu kvalifikáciu (učebný pomer + skúšky)
- Registráciu/licencovanie u príslušného orgánu
- Priebežné odborné vzdelávanie (CPD)

**Nikdy nerob skratky v predpisoch — elektrické poruchy spôsobujú tisíce požiarov v domácnostiach a úmrtí každý rok.****Arc Flash** is one of the most severe electrical hazards. Understanding protection boundaries is critical for anyone working near energized equipment.`,
    keyPoints: [
      { icon: '📜', text: 'Poznej svoju národnú normu: IEC 60364 (EÚ), NEC (USA), BS 7671 (UK)' },
      { icon: '🏛️', text: 'OSHA 1910.269: americký zákon pre elektrickú bezpečnosť' },
      { icon: '🎓', text: 'Kvalifikovaný elektrikár = vyškolený, certifikovaný, kompetentný' },
      { icon: '🔍', text: 'Všetky nové inštalácie musia byť testované pred spustením' },
    ],
    questions: [
      {
        id: 'sf5-q1',
        type: 'multiple_choice',
        question: 'Ktorá norma riadi elektrické inštalácie vo Veľkej Británii?',
        options: ['NEC (NFPA 70)', 'IEC 60364', 'BS 7671 (IET Wiring Regulations)', 'OSHA 1910.303'],
        correctIndex: 2,
        explanation: 'BS 7671 (Nariadenia IET pre zapojenie, v súčasnosti 18. vydanie) je britský národný štandard pre elektrické inštalácie. Je založený na IEC 60364.',
      },
      {
        id: 'sf5-q2',
        type: 'true_false',
        question: 'Elektrikár môže legálne pracovať na akomkoľvek elektrickom systéme bez dohľadu alebo certifikácie, ak sa cíti sebaisto.',
        correct: false,
        explanation: 'Všetky krajiny vyžadujú, aby boli elektrikári kvalifikovaní, vyškolení a vo väčšine prípadov licencovaní alebo certifikovaní. Práca mimo rozsahu svojej kvalifikácie je nezákonná a nebezpečná.',
      },
      {
        id: 'sf5-q3',
        type: 'multiple_choice',
        question: 'Čo je potrebné pred uvedením novej elektrickej inštalácie do prevádzky?',
        options: [
          'Iba vizuálna prehliadka',
          'Prehliadka a skúšanie podľa príslušnej normy',
          'Schválenie od dodávateľa elektrického zariadenia',
          'Nothing — if installed correctly it is ready to use',
        ],
        correctIndex: 1,
        explanation: 'Všetky nové inštalácie musia byť inšpekciou a testovaním overené podľa IEC 60364 / BS 7671 / NEC a certifikačný dokument vydaný pred nabitím obvodu.',
      },
      {
        id: 'sf5-q4',
        type: 'fill_blank',
        question: 'Medzinárodná norma IEC pre nízkonapäťové elektrické inštalácie je IEC ___.',
        answer: '60364',
        hint: '5-ciferné číslo začínajúce 6',
        explanation: 'IEC 60364 (Elektrické inštalácie budov) je medzinárodná norma používaná ako základ pre predpisy elektrických inštalácií vo väčšine krajín sveta.',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
//  TOOLS & INSTRUMENTS  (Premium)
// ─────────────────────────────────────────────────────────────────────────────

const toolsInstruments: Lesson[] = [
  {
    id: 'ti-1-hand-tools',
    topicId: 'tools-instruments',
    order: 1,
    title: 'Ručné náradie elektrikára',
    subtitle: 'Základné nástroje každého elektrikára',
    xpReward: 25,
    diagramType: 'tools',
    explanation: `Každý elektrikár potrebuje sadu kvalitného, dobre udržiavaného ručného náradia. Tu sú základné nástroje a spôsob ich bezpečného používania.

**Rezanie a odstraňovanie izolácie:**
• **Odizolátor plášťa** — odstraňuje vonkajší plášť; nastav hĺbku, aby si neporušil vodiče
• **Odizolátor vodičov** — odstraňuje izoláciu z jednotlivých vodičov
• **Bočné nožnice (uhlopriečne kliešte)** — čisté rezy drôtu; nikdy nepoužívaj na živé vodiče

**Uchopovanie a ohýbanie:**
• **Kombinované kliešte (Lineman's)** — uchopovanie, skrúcanie, strihanie. Základ elektrikárskeho náradia.
• **Ihlové kliešte** — prístup do stiesnených priestorov, tvorba slučiek pre svorky
• **Nastaviteľné kliešte** — veľké chráničkové fitingy a poistkové matice

**Uťahovanie:**
• **Skrutkovače** — plochá a Pozidriv/krížová hlava. Používaj izolovanú verziu (IEC 60900).
• **Šesthrany (kľúče Allen)** — skrutky panela, svorky
• **Nástrčné skrutkovače** — rýchlejšie ako skrutkovač pre šesťhranné skrutky

**Inštalácia káblov:**
• **Ťahací drôt** — ťahá drôt cez chráničky alebo steny
• **Káblové tyče** — tuhé pre kratšie úseky v chránički
• **Pištoľ na sťavovacie pásky** — rovnomerné napätie na káblových pásoch

**Bezpečnosť pri práci s náradím:**
⚠️ Izolované náradie (hodnotené 1000 V podľa IEC 60900) chráni pri náhodnom kontakte so živými časťami pri práci na nízkom napätí — ale LOTO by sa malo vždy vykonávať, keď je to praktické.`,
    keyPoints: [
      { icon: '✂️', text: 'Odizolátory: správne nastav hĺbku, aby si neporušil vodič' },
      { icon: '🔧', text: 'Izolované skrutkovače: IEC 60900, hodnotené 1000 V' },
      { icon: '🎣', text: 'Ťahací drôt: ťahá káble cez chráničky a steny' },
      { icon: '🚫', text: 'Nikdy nepoužívaj kliešte ako kladivo alebo páčidlo' },
    ],
    questions: [
      {
        id: 'ti1-q1',
        type: 'multiple_choice',
        question: 'Aké napäťové hodnotenie majú izolované elektrikárske náradie podľa IEC 60900?',
        options: ['230 V', '400 V', '1000 V', '11,000 V'],
        correctIndex: 2,
        explanation: 'IEC 60900 špecifikuje izolované náradie hodnotené pre použitie do 1 000 V AC. Izolácia poskytuje poslednú líniu obrany — nie je dôvodom vynechať odenergetizovanie.',
      },
      {
        id: 'ti1-q2',
        type: 'true_false',
        question: "A wire stripper can be adjusted to strip cables without nicking the conductor inside.",
        correct: true,
        explanation: 'Správne odizolátory majú nastaviteľné zarážky hĺbky alebo viacero otvorov pre rôzne priemery. Správne nastavenie zabraňuje zárezu vodiča, ktorý by ho oslabil a vytvoril potenciálny teplý bod.',
      },
      {
        id: 'ti1-q3',
        type: 'multiple_choice',
        question: 'Ktorý nástroj sa používa na ťahanie káblov cez steny alebo chránič?',
        options: ['Cable stripper', 'Fish tape', 'Cable tie gun', 'Lineman\'s pliers'],
        correctIndex: 1,
        explanation: 'Ťahací drôt (alebo ťahacia páska) je flexibilná oceľová alebo sklolaminátová páska, ktorá sa tlačí cez chráničky alebo dutiny stien a potom priloží ku káblu a ťahá naspäť.',
      },
      {
        id: 'ti1-q4',
        type: 'fill_blank',
        question: 'Ihlové kliešte sa používajú na dosiahnutie tiesnych priestorov a tvorenie ___ na svorkách vedenia.',
        answer: 'slučiek',
        hint: 'Aký tvar potrebuješ pre skrutkové svorky?',
        explanation: 'Ihlové kliešte sú ideálne na tvorenie slučiek (háčikov) vodičov okolo skrutkových svoriek a prístup do stiesnených priestorov, kam bežné kliešte nezájdu.',
      },
    ],
  },
  {
    id: 'ti-2-multimeter',
    topicId: 'tools-instruments',
    order: 2,
    title: 'Používanie multimetra',
    subtitle: 'Meranie napätia, prúdu, odporu a kontinuity',
    xpReward: 35,
    diagramType: 'multimeter',
    explanation: `**Digitálny multimeter (DMM)** je najdôležitejší prístroj každého elektrikára. Ovládanie multimetra je nevyhnutné.

**Čo multimeter meria:**
• **Napätie (V AC a V DC)** — paralelne
• **Prúd (A)** — sériovo (prerušiť obvod!)
• **Odpor (Ω)** — obvod musí byť BEZ NAPÄTIA
• **Kontinuita** — nízky odpor = pípnutie
• **Diódy**, kapacita, frekvencia (pokročilé modely)

**Meranie napätia:**
• Nastav prepínač na ACV (striedavé) alebo DCV (jednosmerné)
• Hrot VΩ (červený) na bod pod napätím; čierny COM na nulu/zem
• Začni na najvyššom rozsahu, ak nepoznáš hodnotu

**Meranie prúdu:**
⚠️ Ampérmeter musí byť SÉRIOVO s obvodom. Nikdy nie paralelne!
• Presun červený hrot na svorku A
• Nastav na meranie prúdu
• Kliešťové ampérmetre merajú prúd bez prerušenia obvodu

**Meranie odporu:**
• Obvod musí byť ÚPLNE BEZ NAPÄTIA a vybitý
• Nastav na rozsah Ω
• Pripojiť hroty naprieč komponentu

**Kontinuita:**
• Pípnutie pri odpore < ~30 Ω
• Skontroluj integritu obvodu, vodiče, poistky
• VŽDY len na obvodoch bez napätia

**Test diódy:** Priepustné napätie ~0,6 V pre kremíkovú diódu

**Rady pre prax:**
• Vždy začni na najvyššom rozsahu a znižuj
• Skontroluj káble meradla pred použitím — popraskané izolácie sú nebezpečné
• Poistený vstup prúdu chráni meter pred poruchovým prúdom

**True-RMS meradlá:**
Pre AC merania zahŕňajúce nesínusové priebehy použi True-RMS meter. Meradlá reagujúce priemerom dávajú nesprávne výsledky na výstupoch meničov, frekvenčných meničoch atď.`,
    keyPoints: [
      { icon: '🔴', text: 'Červený hrot = + (napätie, prúd); Čierny = −/COM/GND' },
      { icon: '⚡', text: 'Meranie napätia: nastav svorku VΩ; paralelne k súčiastke' },
      { icon: '🔄', text: 'Meranie prúdu: SÉRIOVÉ zapojenie, špeciálna svorka A' },
      { icon: '🔇', text: 'Kontinuita: pípne ak je obvod kompletný; obvod musí byť BEZ NAPÄTIA' },
    ],
    questions: [
      {
        id: 'ti2-q1',
        type: 'multiple_choice',
        question: 'Pri meraní odporu multimetrom musí byť testovaný obvod:',
        options: ['Energized at normal operating voltage', 'Energized at half voltage', 'Dead (completely de-energized)', 'Under light load only'],
        correctIndex: 2,
        explanation: 'Meranie odporu na nabitom obvode poškodí meter a poskytne nesprávne hodnoty. Meraný obvod MUSÍ byť bez napätia a všetky kondenzátory vybi.',
      },
      {
        id: 'ti2-q2',
        type: 'true_false',
        question: 'Na meranie prúdu štandardným multimetrom zapojíš hroty paralelne k záťaži.',
        correct: false,
        explanation: 'Ampérmetre merajú prúd zapojením SÉRIOVO s obvodom. Paralelné zapojenie vytvára takmer skrat cez meter — zničí ho a môže spôsobiť zranenie.',
      },
      {
        id: 'ti2-q3',
        type: 'multiple_choice',
        question: 'Test kontinuity pípne, keď je pripojený na poistku. To znamená, že poistka je:',
        options: ['Blown (open circuit)', 'Good (conducting)', 'Overloaded', 'Reversed'],
        correctIndex: 1,
        explanation: 'Pípnutie pri kontinuite znamená nízky odpor — prúd môže tiecť — poistka je V PORIADKU. Žiadne pípnutie (prerušený obvod) znamená, že poistka je vypálená.',
      },
      {
        id: 'ti2-q4',
        type: 'fill_blank',
        question: "To measure voltage, the multimeter probes are connected in ___ with the component being tested.",
        answer: 'parallel',
        hint: 'Oba hroty sa pripájajú k dvom stranám komponentu — aký typ zapojenia?',
        explanation: 'Voltmetre musia mať veľmi vysoký vnútorný odpor a zapájajú sa PARALELNE naprieč komponentom. Tým môžu merať úbytok napätia bez výrazného ovplyvnenia obvodu.',
      },
    ],
  },
  {
    id: 'ti-3-testing-equipment',
    topicId: 'tools-instruments',
    order: 3,
    title: 'Profesionálne testovacie zariadenia',
    subtitle: 'Testery izolácie, kliešťové ampérmetre a testery inštalácií',
    xpReward: 35,
    diagramType: 'tools',
    explanation: `Profesionálni elektrikári používajú špeciálne testovacie prístroje nad rámec základného multimetra na testovanie inštalácií a hľadanie porúch.

**Tester odporu izolácie (Megger):**
• Aplikuje jednosmerné napätie (500 V alebo 1 000 V) a meria odpor izolácie v MΩ
• Testuj pri 500 V DC pre systémy 230 V/400 V
• Prahová hodnota: > 1 MΩ (IEC 60364-6), pre novú inštaláciu očakávaj > 100 MΩ
• Najprv odpoj všetku elektroniku! (Stmievače, chrániče, elektronika môžu byť poškodené)

**Tester slučky zemnej poruchy:**
• Meria impedanciu slučky zemnej poruchy (Zs)
• Overuje, že ochranné zariadenie vypne v požadovanom čase
• Zs musí byť menší alebo rovný maximálnej hodnote tabulkovanej v IEC 60364-6 alebo BS 7671

**Tester chrániča (RCD):**
• Testuje čas výpadku chrániča pri menovitom poruchovom prúde (30 mA)
• Vyhovuje: výpadok do 300 ms pri 1×In, do 40 ms pri 5×In
• Testuje tiež nežiadúce vypnutie pri 15 mA

**Kliešťový ampérmeter (CT kliešte):**
• Meria striedavý prúd bez prerušenia obvodu
• Zvierka okolo jedného vodiča — indukuje prúd v CT cievke
• Niektoré modely merajú jednosmerný prúd pomocou Hallovho senzoru
• Meria tiež výkon, účinník, harmonické

**PAT tester (Tester prenosných spotrebičov):**
• Testuje kontinuitu uzemnenia a odpor izolácie prenosných spotrebičov
• Požadovaný legislatívou UK pre pracovné zariadenia na mnohých pracoviskách

**Postupnosť testov inštalácie:**
1. Kontinuita ochranných vodičov
2. Odpor izolácie
3. Polarita
4. Impedancia zemnej slučky
5. Prevádzka chrániča
6. Funkčné testy`,
    keyPoints: [
      { icon: '🔬', text: 'Megóhmmeter testuje izoláciu pri vysokom napätí — nové vedenie: >100 MΩ' },
      { icon: '🔌', text: 'Kliešťový ampérmeter: bezpečné meranie prúdu bez prerušenia obvodu' },
      { icon: '🌍', text: 'Slučkový tester: overif, že ochrana pred poruchou bude fungovať' },
      { icon: '🔄', text: 'Merač sledu fáz: overif smer otáčania 3-fázového motora' },
    ],
    questions: [
      {
        id: 'ti3-q1',
        type: 'multiple_choice',
        question: 'Akú minimálnu hodnotu odporu izolácie by si očakával od nového elektrického vedenia?',
        options: ['> 1 Ω', '> 100 Ω', '> 1 MΩ', '> 100 MΩ'],
        correctIndex: 3,
        explanation: 'Nová inštalácia by mala mať odpor izolácie > 100 MΩ (typicky stovky MΩ alebo až GΩ). Hodnoty pod 1 MΩ indikujú vážne degradovanú izoláciu.',
      },
      {
        id: 'ti3-q2',
        type: 'true_false',
        question: 'Pri vykonávaní testu odporu izolácie by malo byť všetko elektronické zariadenie odpojené.',
        correct: true,
        explanation: 'Testery izolácie aplikujú 250–1 000 V DC. Toto POŠKODÍ citlivé elektronické zariadenia (počítače, PLC, stmievače, frekvenčné meniče). Vždy odpoj pred testovaním.',
      },
      {
        id: 'ti3-q3',
        type: 'multiple_choice',
        question: 'Štandardný 30 mA chránič musí vypnúť v maximálnom čase, keď je testovaný pri menovitom poruchovom prúde?',
        options: ['30 ms', '40 ms', '300 ms', '3000 ms'],
        correctIndex: 2,
        explanation: 'Chránič typu AC 30 mA musí vypnúť do 300 ms (0,3 sekundy) pri menovitom reziduálnom prúde (30 mA). Bežné chrániče vypínajú oveľa rýchlejšie — často 20–40 ms.',
      },
      {
        id: 'ti3-q4',
        type: 'fill_blank',
        question: 'Kliešťový ampérmeter meria prúd pomocou ___ snímača, ktorý sa zovrie okolo jedného vodiča.',
        answer: 'hall effect',
        hint: 'Magnetický senzor pomenovaný po fyzikovi Edwinovi ___ Hallovi',
        explanation: 'Kliešťové ampérmetre používajú Hallov senzor (alebo Rogowského cievku pre AC) vo vnútri čeľustí na detekciu magnetického poľa produkovaného tokom prúdu vo vodiči, bez prerušenia obvodu.',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
//  Combine all lessons and export helpers
// ─────────────────────────────────────────────────────────────────────────────

export const allLessons: Lesson[] = [
  ...electricityBasics,
  ...ohmsLaw,
  ...wiringFundamentals,
  ...dcMotors,
  ...safetyRules,
  ...toolsInstruments,
]

export const getLessonById = (id: string): Lesson | undefined =>
  allLessons.find((l) => l.id === id)

export const getLessonsByTopic = (topicId: string): Lesson[] =>
  allLessons.filter((l) => l.topicId === topicId).sort((a, b) => a.order - b.order)
