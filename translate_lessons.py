#!/usr/bin/env python3
"""
Translate lessons.ts from English to Slovak.
Uses exact string replacement for identifiable user-facing text.
"""
import re

with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# ── Simple exact string replacements ──────────────────────────────────────────
replacements = [
    # ── Lesson titles & subtitles ─────────────────────────────────────────────
    ("title: 'What Is Electricity?'", "title: 'Čo je elektrina?'"),
    ("subtitle: 'Atoms, electrons and the flow of charge'", "subtitle: 'Atómy, elektróny a tok náboja'"),

    ("title: 'Electrical Current'", "title: 'Elektrický prúd'"),
    ("subtitle: 'Measuring the flow of charge — Amperes'", "subtitle: 'Meranie toku náboja — Ampéry'"),

    ("title: 'Voltage'", "title: 'Napätie'"),
    ("subtitle: 'Electrical pressure that drives current'", "subtitle: 'Elektrický tlak pohánajúci prúd'"),

    ("title: 'Electrical Resistance'", "title: 'Elektrický odpor'"),
    ("subtitle: 'Opposition to current flow — Ohms'", "subtitle: 'Odpor voči toku prúdu — Ohmy'"),

    ("title: 'Series & Parallel Circuits'", "title: 'Sériové a paralelné obvody'"),
    ("subtitle: 'Two fundamental ways to connect components'", "subtitle: 'Dva základné spôsoby zapojenia súčiastok'"),

    ("title: \"Introduction to Ohm's Law\"", "title: 'Úvod do Ohmovho zákona'"),
    ("subtitle: 'The most important formula in electricity'", "subtitle: 'Najdôležitejší vzorec v elektrotechnike'"),

    ("title: 'Calculating Voltage'", "title: 'Výpočet napätia'"),
    ("subtitle: 'V = I × R — practice with real examples'", "subtitle: 'V = I × R — príklady z praxe'"),

    ("title: 'Calculating Current'", "title: 'Výpočet prúdu'"),
    ("subtitle: 'I = V / R — applying the formula'", "subtitle: 'I = V / R — aplikovanie vzorca'"),

    ("title: 'Calculating Resistance'", "title: 'Výpočet odporu'"),
    ("subtitle: 'R = V / I — finding what opposes current'", "subtitle: 'R = V / I — hľadanie odporu'"),

    ("title: 'Electrical Power'", "title: 'Elektrický výkon'"),
    ("subtitle: 'P = V × I — watts and energy consumption'", "subtitle: 'P = V × I — watty a spotreba energie'"),

    ("title: 'Wire Types & Materials'", "title: 'Typy a materiály vodičov'"),
    ("subtitle: 'Solid vs stranded, copper vs aluminium'", "subtitle: 'Plný vs lanko, meď vs hliník'"),

    ("title: 'Wire Color Codes'", "title: 'Farebné kódy vodičov'"),
    ("subtitle: 'EU and international standard conductor identification'", "subtitle: 'Identifikácia vodičov podľa noriem EÚ a medzinárodných'"),

    ("title: 'Cable Sizing & Ampacity'", "title: 'Dimenzovanie káblov a prúdová zaťažiteľnosť'"),
    ("subtitle: 'Selecting the right cross-section for the load'", "subtitle: 'Výber správneho prierezu pre záťaž'"),

    ("title: 'Circuit Protection'", "title: 'Ochrana obvodu'"),
    ("subtitle: 'Fuses, MCBs, RCDs and their applications'", "subtitle: 'Poistky, ističe, chrániče a ich použitie'"),

    ("title: 'How DC Motors Work'", "title: 'Ako fungujú jednosmerné motory'"),
    ("subtitle: 'Electromagnetic force creates rotation'", "subtitle: 'Elektromagnetická sila vytvára rotáciu'"),

    ("title: 'Motor Components'", "title: 'Časti motora'"),
    ("subtitle: 'Armature, field windings, brushes & bearings'", "subtitle: 'Kotva, budenie, kefky a ložiská'"),

    ("title: 'Motor Starting & Speed Control'", "title: 'Spúšťanie a regulácia otáčok motora'"),
    ("subtitle: 'Starter circuits and speed regulation methods'", "subtitle: 'Spúšťacie obvody a metódy regulácie rýchlosti'"),

    ("title: 'Motor Protection'", "title: 'Ochrana motora'"),
    ("subtitle: 'Overload, short circuit and thermal protection'", "subtitle: 'Ochrana pred preťažením, skratom a teplom'"),

    ("title: 'Electrical Hazards'", "title: 'Elektrické nebezpečenstvá'"),
    ("subtitle: 'Understanding the risks: shock, burns, fire, arc flash'", "subtitle: 'Riziká: úraz prúdom, popálenie, požiar, oblúkový výboj'"),

    ("title: 'Personal Protective Equipment'", "title: 'Osobné ochranné pracovné prostriedky (OOPP)'"),
    ("subtitle: 'Gloves, eye protection, arc flash suits and more'", "subtitle: 'Rukavice, ochrana očí, obleky pri oblúku a ďalšie'"),

    ("title: 'Lockout / Tagout (LOTO)'", "title: 'Uzamknutie / Označenie (LOTO)'"),
    ("subtitle: 'The procedure that saves lives during maintenance'", "subtitle: 'Postup, ktorý zachraňuje životy pri údržbe'"),

    ("title: 'Arc Flash Safety'", "title: 'Bezpečnosť pri oblúkovom výboji'"),
    ("subtitle: 'Boundaries, PPE categories and risk assessment'", "subtitle: 'Hranice, kategórie OOPP a hodnotenie rizika'"),

    ("title: 'Regulations & Standards'", "title: 'Predpisy a normy'"),
    ("subtitle: 'OSHA, IEC, NEC and EU directives you must know'", "subtitle: 'OSHA, IEC, NEC a smernice EÚ, ktoré musíš poznať'"),

    ("title: 'Electrician Hand Tools'", "title: 'Ručné náradie elektrikára'"),
    ("subtitle: 'Essential tools every electrician needs'", "subtitle: 'Základné nástroje každého elektrikára'"),

    ("title: 'Using a Multimeter'", "title: 'Používanie multimetra'"),
    ("subtitle: 'Measuring voltage, current, resistance and continuity'", "subtitle: 'Meranie napätia, prúdu, odporu a kontinuity'"),

    ("title: 'Professional Testing Equipment'", "title: 'Profesionálne testovacie zariadenia'"),
    ("subtitle: 'Insulation testers, clamp meters & installation testers'", "subtitle: 'Testery izolácie, kliešťové ampérmetre a testery inštalácií'"),

    # ── keyPoints ─────────────────────────────────────────────────────────────
    ("{ icon: '⚛️', text: 'Electricity = flow of electrons through a conductor' }",
     "{ icon: '⚛️', text: 'Elektrina = tok elektrónov cez vodič' }"),
    ("{ icon: '➕', text: 'Protons are positive, electrons are negative' }",
     "{ icon: '➕', text: 'Protóny sú kladné, elektróny záporné' }"),
    ("{ icon: '🔵', text: 'Conductors have free (loosely bound) electrons' }",
     "{ icon: '🔵', text: 'Vodiče majú voľné (slabo viazané) elektróny' }"),
    ("{ icon: '🚫', text: 'Insulators hold electrons tightly — no current flows' }",
     "{ icon: '🚫', text: 'Izolátory pevne držia elektróny — prúd netečie' }"),

    ("{ icon: '🔴', text: 'Current (I) = charge flow, measured in Amperes (A)' }",
     "{ icon: '🔴', text: 'Prúd (I) = tok náboja, meraný v Ampéroch (A)' }"),
    ("{ icon: '🔋', text: 'DC flows one way; AC alternates direction' }",
     "{ icon: '🔋', text: 'Jednosmerný prúd tečie jedným smerom; striedavý sa striedavo mení' }"),
    ("{ icon: '⚠️', text: '100 mA through the body can be lethal' }",
     "{ icon: '⚠️', text: '100 mA pretekajúce telom môže byť smrteľné' }"),
    ("{ icon: '📏', text: 'Household circuits carry 15–20 A typically' }",
     "{ icon: '📏', text: 'Domáce obvody zvyčajne prenášajú 15–20 A' }"),

    ("{ icon: '💡', text: 'Voltage (V) = electrical pressure, drives current flow' }",
     "{ icon: '💡', text: 'Napätie (V) = elektrický tlak, pohání tok prúdu' }"),
    ("{ icon: '🔋', text: 'Measured in Volts using a voltmeter' }",
     "{ icon: '🔋', text: 'Merané vo Voltoch pomocou voltmetra' }"),
    ("{ icon: '🏠', text: 'Standard household: 230V (EU) or 120V (US)' }",
     "{ icon: '🏠', text: 'Štandardná domácnosť: 230 V (EÚ) alebo 120 V (USA)' }"),
    ("{ icon: '⬆️', text: 'Higher voltage = more potential energy per charge' }",
     "{ icon: '⬆️', text: 'Vyššie napätie = viac potenciálnej energie na náboj' }"),

    ("{ icon: '🚧', text: 'Resistance (R) opposes current flow, measured in Ohms (Ω)' }",
     "{ icon: '🚧', text: 'Odpor (R) kladie odpor toku prúdu, meraný v Ohmoch (Ω)' }"),
    ("{ icon: '📏', text: 'Longer & thinner wire → more resistance' }",
     "{ icon: '📏', text: 'Dlhší a tenší vodič → väčší odpor' }"),
    ("{ icon: '🌡️', text: 'Most conductors: resistance increases with temperature' }",
     "{ icon: '🌡️', text: 'Väčšina vodičov: odpor rastie s teplotou' }"),
    ("{ icon: '🎨', text: 'Resistors use color bands to show their value' }",
     "{ icon: '🎨', text: 'Rezistory používajú farebné prstence na označenie hodnoty' }"),

    ("{ icon: '➡️', text: 'Series: same current, voltage divides, one failure = all off' }",
     "{ icon: '➡️', text: 'Sériové: rovnaký prúd, napätie sa delí, jedna porucha = všetko vypnuté' }"),
    ("{ icon: '⬇️', text: 'Parallel: same voltage, current splits, independent operation' }",
     "{ icon: '⬇️', text: 'Paralelné: rovnaké napätie, prúd sa delí, nezávislá prevádzka' }"),
    ("{ icon: '🏠', text: 'Home circuits are parallel — outlets work independently' }",
     "{ icon: '🏠', text: 'Domáce obvody sú paralelné — zásuvky pracujú nezávisle' }"),
    ("{ icon: '➕', text: 'Series: total R = R₁ + R₂; Parallel: total R is less than smallest' }",
     "{ icon: '➕', text: 'Sériové: celkový R = R₁ + R₂; Paralelné: celkový R je menší ako najmenší' }"),

    ("{ icon: '📐', text: \"V = I × R — Ohm's Law triangle method\" }",
     "{ icon: '📐', text: 'V = I × R — trojuholníková metóda Ohmovho zákona' }"),
    ("{ icon: '⬆️', text: 'More voltage → more current (at fixed resistance)' }",
     "{ icon: '⬆️', text: 'Väčšie napätie → väčší prúd (pri pevnom odpore)' }"),
    ("{ icon: '⬆️', text: 'More resistance → less current (at fixed voltage)' }",
     "{ icon: '⬆️', text: 'Väčší odpor → menší prúd (pri pevnom napätí)' }"),
    ("{ icon: '🏆', text: \"Named after Georg Simon Ohm (1789–1854)\" }",
     "{ icon: '🏆', text: 'Pomenovaný podľa Georga Simona Ohma (1789–1854)' }"),

    ("{ icon: '🔢', text: 'For voltage: V = I × R' }",
     "{ icon: '🔢', text: 'Pre napätie: V = I × R' }"),
    ("{ icon: '💡', text: 'Always check: is the answer reasonable?' }",
     "{ icon: '💡', text: 'Vždy skontroluj: je výsledok rozumný?' }"),

    ("{ icon: '📐', text: 'For current: I = V / R' }",
     "{ icon: '📐', text: 'Pre prúd: I = V / R' }"),
    ("{ icon: '🔌', text: 'More resistance → less current at same voltage' }",
     "{ icon: '🔌', text: 'Väčší odpor → menší prúd pri rovnakom napätí' }"),

    ("{ icon: '⚙️', text: 'For resistance: R = V / I' }",
     "{ icon: '⚙️', text: 'Pre odpor: R = V / I' }"),
    ("{ icon: '🔧', text: 'Used to find unknown resistance in circuits' }",
     "{ icon: '🔧', text: 'Používa sa na hľadanie neznámeho odporu v obvode' }"),
    ("{ icon: '🌡️', text: 'Higher resistance heats up more under the same current' }",
     "{ icon: '🌡️', text: 'Väčší odpor sa viac zahrieva pri rovnakom prúde' }"),

    ("{ icon: '⚡', text: 'Power (P) = rate of energy conversion, Watts (W)' }",
     "{ icon: '⚡', text: 'Výkon (P) = rýchlosť premeny energie, Watty (W)' }"),
    ("{ icon: '💡', text: 'P = V × I or P = I²R or P = V²/R' }",
     "{ icon: '💡', text: 'P = V × I alebo P = I²×R alebo P = V²/R' }"),
    ("{ icon: '🏠', text: '1 kW for 1 hour = 1 kWh (unit on your electricity bill)' }",
     "{ icon: '🏠', text: '1 kW počas 1 hodiny = 1 kWh (jednotka na faktúre za elektrinu)' }"),
    ("{ icon: '🔥', text: 'Doubling current quadruples heat generated (P = I²R)' }",
     "{ icon: '🔥', text: 'Zdvojnásobenie prúdu štvornásobne zvýši teplo (P = I²×R)' }"),

    ("{ icon: '🔌', text: 'Copper is preferred: low resistance, flexible, durable' }",
     "{ icon: '🔌', text: 'Meď je preferovaná: nízky odpor, ohybná, odolná' }"),
    ("{ icon: '🌀', text: 'Stranded wire is more flexible than solid for same cross-section' }",
     "{ icon: '🌀', text: 'Lanko je ohybnejšie ako plný vodič pri rovnakom priereze' }"),
    ("{ icon: '⚖️', text: 'Aluminium: lighter & cheaper but needs special connectors' }",
     "{ icon: '⚖️', text: 'Hliník: ľahší a lacnejší, ale vyžaduje špeciálne konektory' }"),
    ("{ icon: '🛡️', text: 'Insulation material determines max temperature & voltage rating' }",
     "{ icon: '🛡️', text: 'Materiál izolácie určuje maximálnu teplotu a napäťové zaradenie' }"),

    ("{ icon: '🟤', text: 'EU: Brown=Live (L), Blue=Neutral (N), Green/Yellow=Earth' }",
     "{ icon: '🟤', text: 'EÚ: Hnedá=Fáza (L), Modrá=Nulový (N), Zeleno/Žltá=Uzemnenie' }"),
    ("{ icon: '🔴', text: 'Old UK: Red=Live, Black=Neutral, Green=Earth' }",
     "{ icon: '🔴', text: 'Stará UK norma: Červená=Fáza, Čierna=Nulový, Zelená=Uzemnenie' }"),
    ("{ icon: '⚠️', text: 'Never assume — always verify with a tester' }",
     "{ icon: '⚠️', text: 'Nikdy nepredpokladaj — vždy si overuj testerom' }"),
    ("{ icon: '🔵', text: '3-phase: L1=Brown, L2=Black, L3=Grey (EU IEC 60446)' }",
     "{ icon: '🔵', text: '3-fázové: L1=Hnedá, L2=Čierna, L3=Sivá (EÚ IEC 60446)' }"),

    ("{ icon: '📏', text: 'Larger cross-section → lower resistance → more current capacity' }",
     "{ icon: '📏', text: 'Väčší prierez → menší odpor → väčšia prúdová kapacita' }"),
    ("{ icon: '🌡️', text: 'Temperature, installation method affect ampacity' }",
     "{ icon: '🌡️', text: 'Teplota a spôsob uloženia ovplyvňujú prúdovú zaťažiteľnosť' }"),
    ("{ icon: '📋', text: 'Use cable tables (IEC 60364) — never guess cross-section' }",
     "{ icon: '📋', text: 'Používaj tabuľky káblov (IEC 60364) — nikdy neodhaduj prierez' }"),
    ("{ icon: '⬆️', text: 'Voltage drop must be < 3% for most installations' }",
     "{ icon: '⬆️', text: 'Úbytok napätia musí byť < 3 % pri väčšine inštalácií' }"),

    ("{ icon: '🔌', text: 'Fuse: melts to protect — single-use, must replace' }",
     "{ icon: '🔌', text: 'Poistka: roztaví sa na ochranu — jednorázová, treba vymeniť' }"),
    ("{ icon: '⚡', text: 'MCB: trips and resets — protects against overload & short circuit' }",
     "{ icon: '⚡', text: 'Istič: vypne a resetuje sa — chráni pred preťažením a skratom' }"),
    ("{ icon: '💧', text: 'RCD/RCCB: detects earth fault current — life-saving device' }",
     "{ icon: '💧', text: 'RCD/RCCB: detekuje unikajúci prúd — zariadenie zachraňujúce životy' }"),
    ("{ icon: '🔥', text: 'RCBO combines MCB + RCD in one unit' }",
     "{ icon: '🔥', text: 'RCBO kombinuje istič + RCD v jednom zariadení' }"),

    ("{ icon: '🧲', text: 'DC motors use Fleming\\'s Left Hand Rule' }",
     "{ icon: '🧲', text: 'Jednosmerné motory využívajú Flemingovo pravidlo ľavej ruky' }"),
    ("{ icon: '⚙️', text: 'Torque = force × radius — more current = more torque' }",
     "{ icon: '⚙️', text: 'Krútiaci moment = sila × polomer — väčší prúd = väčší moment' }"),
    ("{ icon: '🔄', text: 'Commutator keeps rotation continuous by reversing current' }",
     "{ icon: '🔄', text: 'Komutátor udržiava rotáciu zmenou smeru prúdu' }"),
    ("{ icon: '📈', text: 'Speed proportional to voltage; torque to current' }",
     "{ icon: '📈', text: 'Rýchlosť je úmerná napätiu; moment je úmerný prúdu' }"),

    ("{ icon: '🔄', text: 'Armature (rotor) carries the load current' }",
     "{ icon: '🔄', text: 'Kotva (rotor) prenáša zaťažovací prúd' }"),
    ("{ icon: '🧲', text: 'Field windings (stator) create the magnetic field' }",
     "{ icon: '🧲', text: 'Budiace vinutia (stator) vytvárajú magnetické pole' }"),
    ("{ icon: '⚡', text: 'Brushes are the main maintenance item in DC motors' }",
     "{ icon: '⚡', text: 'Kefky sú hlavným údržbovým prvkom jednosmerných motorov' }"),
    ("{ icon: '🔩', text: 'Bearings support the shaft — lubrication is critical' }",
     "{ icon: '🔩', text: 'Ložiská podopierajú hriadeľ — mazanie je kľúčové' }"),

    ("{ icon: '🚀', text: 'Direct-on-line (DOL) starting causes high inrush current' }",
     "{ icon: '🚀', text: 'Priamy záber (DOL) spôsobuje vysoký záberový prúd' }"),
    ("{ icon: '🔽', text: 'Star-delta starter reduces inrush to ~1/3 of DOL' }",
     "{ icon: '🔽', text: 'Hviezda-trojuholník rozbeháč znižuje záberový prúd na ~1/3 DOL' }"),
    ("{ icon: '🎛️', text: 'VFD (Variable Frequency Drive) gives smooth speed control' }",
     "{ icon: '🎛️', text: 'Frekvenčný menič (VFD) zabezpečuje plynulú reguláciu rýchlosti' }"),
    ("{ icon: '📊', text: 'Motor nameplate gives rated voltage, current, power, speed' }",
     "{ icon: '📊', text: 'Štítok motora uvádza menovité napätie, prúd, výkon a otáčky' }"),

    ("{ icon: '🌡️', text: 'Thermal relay protects against overload (sustained overcurrent)' }",
     "{ icon: '🌡️', text: 'Tepelné relé chráni pred preťažením (trvalý nadprúd)' }"),
    ("{ icon: '⚡', text: 'Fuses protect against short circuits (instantaneous overcurrent)' }",
     "{ icon: '⚡', text: 'Poistky chránia pred skratom (okamžitý nadprúd)' }"),
    ("{ icon: '🔵', text: 'Thermistors (PTC/NTC) monitor winding temperature directly' }",
     "{ icon: '🔵', text: 'Termistory (PTC/NTC) priamo monitorujú teplotu vinutia' }"),
    ("{ icon: '🛡️', text: 'IP rating indicates protection against dust and water' }",
     "{ icon: '🛡️', text: 'Stupeň krytia IP udáva ochranu proti prachu a vode' }"),

    ("{ icon: '⚡', text: 'Electric shock: current through body causes injury or death' }",
     "{ icon: '⚡', text: 'Úraz prúdom: prúd prechádzajúci telom spôsobuje zranenie alebo smrť' }"),
    ("{ icon: '🔥', text: 'Arc flash releases extreme heat, light and pressure' }",
     "{ icon: '🔥', text: 'Oblúkový výboj uvoľňuje extrémne teplo, svetlo a tlak' }"),
    ("{ icon: '🏥', text: 'Indirect effects: falling, muscle lock, cardiac arrest' }",
     "{ icon: '🏥', text: 'Nepriame účinky: pád, svalové stiahnutie, zástava srdca' }"),
    ("{ icon: '🎯', text: 'Path of current through body determines severity' }",
     "{ icon: '🎯', text: 'Dráha prúdu cez telo určuje závažnosť' }"),

    ("{ icon: '🧤', text: 'Insulated gloves: must be tested, rated for voltage class' }",
     "{ icon: '🧤', text: 'Izolačné rukavice: musia byť testované, hodnotené pre napäťovú triedu' }"),
    ("{ icon: '👓', text: 'Eye protection: safety glasses minimum; face shield for arc risk' }",
     "{ icon: '👓', text: 'Ochrana očí: ochranné okuliare ako minimum; štít tváre pri riziku oblúka' }"),
    ("{ icon: '👔', text: 'FR (flame-resistant) clothing mandatory for arc flash zones' }",
     "{ icon: '👔', text: 'Oblečenie odolné plameňom (FR) je povinné v zónach oblúkového výboja' }"),
    ("{ icon: '👟', text: 'Safety footwear: dielectric boots where voltage risk exists' }",
     "{ icon: '👟', text: 'Bezpečnostná obuv: dielektrické topánky tam, kde existuje riziko napätia' }"),

    ("{ icon: '🔒', text: 'LOTO prevents unexpected energization during maintenance' }",
     "{ icon: '🔒', text: 'LOTO zabraňuje neočakávanému spusteniu počas údržby' }"),
    ("{ icon: '🏷️', text: 'Each worker adds their own lock — cannot be removed by others' }",
     "{ icon: '🏷️', text: 'Každý pracovník pridá vlastný zámok — ostatní ho nemôžu odstrániť' }"),
    ("{ icon: '✅', text: 'Verify zero energy BEFORE touching: test voltage, pressure, gravity' }",
     "{ icon: '✅', text: 'Overif nulový stav PRED dotykom: testuj napätie, tlak, gravitáciu' }"),
    ("{ icon: '📋', text: '6 steps: Identify → Notify → Shut down → Isolate → Lock → Verify' }",
     "{ icon: '📋', text: '6 krokov: Identifikuj → Notifikuj → Vypni → Izoluj → Uzamkni → Overif' }"),

    ("{ icon: '⚡', text: 'Arc flash energy measured in cal/cm²— determines PPE needed' }",
     "{ icon: '⚡', text: 'Energia oblúka meraná v cal/cm² — určuje potrebné OOPP' }"),
    ("{ icon: '📏', text: 'Limited boundary: 300mm minimum no-work zone' }",
     "{ icon: '📏', text: 'Ohraničená hranica (obmedzená zóna): minimálna pracovná vzdialenosť' }"),
    ("{ icon: '🔬', text: 'Arc flash study needed for systems > 240V' }",
     "{ icon: '🔬', text: 'Štúdia oblúkového výboja je potrebná pre systémy > 240 V' }"),
    ("{ icon: '🏷️', text: 'PPE categories 1–4; higher category = more arc energy' }",
     "{ icon: '🏷️', text: 'Kategórie OOPP 1–4; vyššia kategória = väčšia energia oblúka' }"),

    ("{ icon: '📜', text: 'IEC 60364: global standard for low voltage electrical installations' }",
     "{ icon: '📜', text: 'IEC 60364: globálna norma pre nízkonapäťové elektroinštalácie' }"),
    ("{ icon: '🇺🇸', text: 'NEC (NFPA 70): the standard in the United States' }",
     "{ icon: '🇺🇸', text: 'NEC (NFPA 70): norma v Spojených štátoch' }"),
    ("{ icon: '🇪🇺', text: 'EU Low Voltage Directive: 50–1000V AC, 75–1500V DC equipment' }",
     "{ icon: '🇪🇺', text: 'Smernica EÚ o nízkom napätí: 50–1000 V AC, 75–1500 V DC zariadenia' }"),
    ("{ icon: '⚠️', text: 'OSHA 1910.333: safety-related work practices for electrical' }",
     "{ icon: '⚠️', text: 'OSHA 1910.333: bezpečnostné pracovné postupy pre elektroinštalácie' }"),

    ("{ icon: '🔧', text: 'Screwdrivers: use insulated handles rated at least 1000V' }",
     "{ icon: '🔧', text: 'Skrutkovače: používaj izolované rukoväte s hodnotením aspoň 1000 V' }"),
    ("{ icon: '✂️', text: 'Wire strippers: match size to wire gauge to avoid nicks' }",
     "{ icon: '✂️', text: 'Odizolátory: prispôsob veľkosť prierezu vodiča, aby si ho nepoškodil' }"),
    ("{ icon: '📐', text: 'Fish tape: pulls cable through conduit' }",
     "{ icon: '📐', text: 'Ťahací drôt (fish tape): ťahá kábel cez chránič' }"),
    ("{ icon: '🔍', text: 'Voltage tester: first tool to use before touching any wire' }",
     "{ icon: '🔍', text: 'Tester napätia: prvý nástroj pred dotykom akéhokoľvek vodiča' }"),

    ("{ icon: '🔢', text: 'Multimeter measures V, I, R and often capacitance & frequency' }",
     "{ icon: '🔢', text: 'Multimeter meria V, I, R a často kapacitanciu a frekvenciu' }"),
    ("{ icon: '⚠️', text: 'Always check range and test leads before measuring' }",
     "{ icon: '⚠️', text: 'Vždy skontroluj rozsah a meracie hroty pred meraním' }"),
    ("{ icon: '🔴', text: 'Red lead = positive (+), Black lead = negative/common (−)' }",
     "{ icon: '🔴', text: 'Červený hrot = kladný (+), Čierny hrot = záporný/COM (−)' }"),
    ("{ icon: '💡', text: 'For current measurement, the circuit must be broken (series)' }",
     "{ icon: '💡', text: 'Na meranie prúdu musí byť obvod prerušený (sériové zapojenie)' }"),

    ("{ icon: '🔬', text: 'Insulation tester (megger): tests insulation resistance in MΩ' }",
     "{ icon: '🔬', text: 'Tester izolácie (megóhmmeter): testuje odpor izolácie v MΩ' }"),
    ("{ icon: '🔄', text: 'Loop/earth tester: measures earth fault loop impedance' }",
     "{ icon: '🔄', text: 'Slučkový tester: meria impedanciu zemnej poruchovej slučky' }"),
    ("{ icon: '🌀', text: 'Clamp meter: measures current without breaking the circuit' }",
     "{ icon: '🌀', text: 'Kliešťový ampérmeter: meria prúd bez prerušenia obvodu' }"),
    ("{ icon: '📋', text: 'Multifunction tester: combines several tests for certification' }",
     "{ icon: '📋', text: 'Multifunkčný tester: kombinuje viacero testov pre certifikáciu' }"),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new, 1)
        count += 1
    else:
        print(f"WARNING: Not found: {old[:60]!r}")

print(f"Applied {count} of {len(replacements)} replacements")

# Now translate quiz questions - these are more complex, use regex approach
question_translations = [
    # eb1
    ("'What particles physically move when electricity flows through a wire?'",
     "'Aké častice sa fyzicky pohybujú, keď elektrina tečie drôtom?'"),
    ("'Insulators are good conductors of electricity.'",
     "'Izolátory sú dobrými vodičmi elektriny.'"),
    ("'Which of the following is the BEST conductor of electricity?'",
     "'Ktorý z nasledujúcich materiálov je NAJLEPŠÍM vodičom elektriny?'"),
    ("question: 'Electrons carry a ___ electrical charge.'",
     "question: 'Elektróny nesú ___ elektrický náboj.'"),
    ("answer: 'negative'", "answer: 'záporný'"),
    # eb2
    ("'What unit is used to measure electrical current?'",
     "'Akú jednotku používame na meranie elektrického prúdu?'"),
    ("\"In AC (alternating current), electrons flow in one direction only.\"",
     "\"Pri striedavom prúde (AC) elektróny tečú len jedným smerom.\""),
    ("question: 'The symbol for electrical current in formulas is ___.'",
     "question: 'Symbol pre elektrický prúd vo vzorcoch je ___.'"),
    ("\"It comes from the French word 'intensité'\"",
     "\"Pochádza z francúzskeho slova 'intensité'\""),
    ("explanation: \"Current uses the symbol 'I' from the French word intensité de courant (intensity of current).\"",
     "explanation: \"Prúd používa symbol 'I' z francúzskeho výrazu intensité de courant (intenzita prúdu).\""),
    ("'Which current level through the heart is considered potentially fatal?'",
     "'Aká hladina prúdu prechádzajúca srdcom je považovaná za potenciálne smrteľnú?'"),
    # eb3
    ("\"What does voltage represent in an electrical circuit?\"",
     "\"Čo predstavuje napätie v elektrickom obvode?\""),
    ("question: 'Voltage is measured in ___ using a voltmeter.'",
     "question: 'Napätie sa meria v ___ pomocou voltmetra.'"),
    ("answer: 'volts'", "answer: 'voltoch'"),
    ("\"Named after Alessandro ___ta, an Italian physicist\"",
     "\"Pomenované po Alessandrovi ___tovi, talianskom fyzikovi\""),
    ("'A standard European household outlet provides 230V AC.'",
     "'Štandardná európska domáca zásuvka poskytuje 230 V AC.'"),
    ("'In the water analogy for electricity, what does voltage correspond to?'",
     "'V analógii s vodou pre elektrickú energiu, čomu zodpovedá napätie?'"),
    # eb4
    ("'What unit is used to measure electrical resistance?'",
     "'Akú jednotku používame na meranie elektrického odporu?'"),
    ("'A longer wire has more resistance than a shorter wire of the same material and thickness.'",
     "'Dlhší vodič má väčší odpor ako kratší vodič z rovnakého materiálu a hrúbky.'"),
    ("'Which material has the LOWEST electrical resistance?'",
     "'Ktorý materiál má NAJNIŽŠÍ elektrický odpor?'"),
    ("'What happens to the resistance of a copper wire when its temperature increases?'",
     "'Čo sa stane s odporom medeného vodiča, keď sa zvýši jeho teplota?'"),
    # eb5
    ("'In a series circuit with two resistors, the total resistance is:'",
     "'V sériovom obvode s dvoma rezistormi je celkový odpor:'"),
    ("'In a parallel circuit, if one branch fails, all other branches also stop working.'",
     "'V paralelnom obvode, ak jedna vetva zlyhá, všetky ostatné vetvy tiež prestanú fungovať.'"),
    ("\"Your house wiring uses which type of circuit?\"",
     "\"Aký typ obvodu používa domáca inštalácia?\""),
    ("question: 'In a series circuit, the current through each component is the ___.'",
     "question: 'V sériovom obvode je prúd prechádzajúci každou súčiastkou ___.'"),
    ("answer: 'same'", "answer: 'rovnaký'"),
    ("hint: 'There is only one path for current to flow'",
     "hint: 'Pre prúd existuje len jedna cesta'"),
    # ol1
    ("\"What does the letter 'I' represent in Ohm's Law?\"",
     "\"Čo predstavuje písmeno 'I' v Ohmovom zákone?\""),
    ("question: \"State Ohm's Law: V = ___ × R\"",
     "question: \"Uveď Ohmov zákon: V = ___ × R\""),
    ("hint: 'The symbol for current'",
     "hint: 'Symbol pre prúd'"),
    ("\"Doubling the resistance (while keeping voltage constant) will double the current.\"",
     "\"Zdvojnásobenie odporu (pri konštantnom napätí) zdvojnásobí prúd.\""),
    ("'If you need to find current using the Ohm\\'s Law triangle, the formula is:'",
     "'Ak potrebuješ nájsť prúd pomocou trojuholníka Ohmovho zákona, vzorec je:'"),
]

for old, new in question_translations:
    if old in content:
        content = content.replace(old, new, 1)
        count += 1
    else:
        print(f"WARNING: Not found: {old[:70]!r}")

print(f"Total replacements after questions phase 1: {count}")

with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
