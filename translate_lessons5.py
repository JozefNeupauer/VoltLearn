#!/usr/bin/env python3
"""
Fifth pass: translate all 26 long explanation template literal bodies
"""

import re

with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Each entry: (original_text, slovak_text)
# We'll replace exact template literal content

translations = [

# ── Block 1: eb-1 What is Electricity ────────────────────────────────────────
(
"""Electricity is the flow of **electric charge** — specifically, the movement of electrons through a conductor like copper wire.

Every material is made of **atoms**. At the center of each atom is a nucleus containing protons (positive charge) and neutrons (neutral). Orbiting the nucleus are **electrons** (negative charge).

In **conductors** (like copper, silver, aluminium), the outermost electrons are loosely bound and can move freely. In **insulators** (like rubber, plastic, wood), electrons are tightly bound and cannot move.

When a voltage is applied across a conductor, free electrons drift in one direction — this drift is **electric current**.

**Key facts:**
• Electron charge: 1.6 × 10⁻¹⁹ Coulombs
• Current = rate of charge flow: Q/t
• Symbol for charge: Q (Coulombs)""",

"""Elektrina je tok **elektrického náboja** — konkrétne pohyb elektrónov cez vodič, ako je medený drôt.

Každá látka sa skladá z **atómov**. V strede každého atómu je jadro obsahujúce protóny (kladný náboj) a neutróny (neutrálne). Okolo jadra obiehajú **elektróny** (záporný náboj).

V **vodičoch** (meď, striebro, hliník) sú vonkajšie elektróny voľne viazané a môžu sa slobodne pohybovať. V **izolátoroch** (guma, plast, drevo) sú elektróny pevne viazané a nemôžu sa pohybovať.

Keď sa priloží napätie na vodič, voľné elektróny sa pohybujú jedným smerom — toto je **elektrický prúd**.

**Kľúčové fakty:**
• Náboj elektrónu: 1,6 × 10⁻¹⁹ Coulombov
• Prúd = rýchlosť toku náboja: Q/t
• Symbol náboja: Q (Coulomby)"""
),

# ── Block 2: eb-2 Electrical Current ─────────────────────────────────────────
(
"""**Electrical current (I)** is the rate at which electric charge flows through a conductor. It's measured in **Amperes (A)**, often called "amps."

**Formula:** I = Q / t

Where: Q = charge in Coulombs, t = time in seconds

**Types of current:**
• **DC (Direct Current)** — electrons flow in one constant direction. Batteries produce DC.
• **AC (Alternating Current)** — electrons reverse direction periodically. Mains power is AC (50 Hz in Europe = 50 direction changes per second).

**Current levels and effects on the human body:**
| Current | Effect |
|---------|--------|
| 1 mA | Barely perceptible |
| 10 mA | Cannot let go (muscle lock) |
| 50 mA | Severe shock, possible heart arrhythmia |
| 100+ mA | Ventricular fibrillation, potentially fatal |
| 1 A+ | Severe burns, almost certainly fatal |

This is why 30 mA RCD protection is so important — it disconnects before lethal current can flow.""",

"""**Elektrický prúd (I)** je rýchlosť, s akou elektrický náboj tečie cez vodič. Meria sa v **Ampéroch (A)**, hovorovo "ampérach".

**Vzorec:** I = Q / t

Kde: Q = náboj v Coulomboch, t = čas v sekundách

**Typy prúdu:**
• **DC (jednosmerný prúd)** — elektróny tečú jedným stálym smerom. Batérie produkujú jednosmerný prúd.
• **AC (striedavý prúd)** — elektróny periodicky menia smer. Sieťové napájanie je striedavé (50 Hz v Európe = 50 zmien smeru za sekundu).

**Hladiny prúdu a účinky na ľudský organizmus:**
| Prúd | Účinok |
|------|--------|
| 1 mA | Sotva postrehnuteľné |
| 10 mA | Nie je možné pustiť (svalová kŕč) |
| 50 mA | Silný úraz, možná srdcová arytmia |
| 100+ mA | Komorová fibrilácia, potenciálne smrteľné |
| 1 A+ | Ťažké popáleniny, takmer určite smrteľné |

Preto je ochrana 30 mA chráničom (RCD) taká dôležitá — odpojí obvod skôr, než môže pretiecť smrteľný prúd."""
),

# ── Block 3: eb-3 Voltage ─────────────────────────────────────────────────────
(
"""**Voltage (V)** is the electrical potential difference between two points — the "pressure" that pushes electrons through a circuit. It's measured in **Volts (V)**.

**Think of it like water:**
• Voltage = water pressure
• Current = water flow rate
• Resistance = pipe restriction

**Formula:** V = I × R (Ohm's Law)

**Common voltage levels:**
| Voltage | Application |
|---------|-------------|
| 1.5V | AA/AAA battery |
| 12V | Car battery, LED lighting |
| 230V AC | European household mains |
| 400V AC | Three-phase industrial |
| 11,000V+ | Distribution network |
| 400,000V | National Grid transmission |

**Important:** Extra low voltage (ELV) is below 50V AC or 120V DC — considered safer but not safe at higher energies. Always respect all voltages!""",

"""**Napätie (V)** je elektrický potenciálový rozdiel medzi dvomi bodmi — "tlak", ktorý tlačí elektróny obvodom. Meria sa vo **Voltoch (V)**.

**Predstav si to ako vodu:**
• Napätie = tlak vody
• Prúd = rýchlosť toku vody
• Odpor = zúženie potrubia

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

**Dôležité:** Veľmi nízke napätie (ELV) je pod 50 V AC alebo 120 V DC — považuje sa za bezpečnejšie, nie však bezpečné pri vyššej energii. Vždy rešpektuj všetky napätia!"""
),

# ── Block 4: eb-4 Resistance ─────────────────────────────────────────────────
(
"""**Resistance (R)** is the opposition to the flow of electric current. Materials resist current because atoms block the movement of electrons. Resistance is measured in **Ohms (Ω)** — the Greek letter Omega.

**Factors affecting resistance:**
• **Length** — longer wire = higher resistance
• **Cross-section** — thicker wire = lower resistance
• **Material** — copper has lower resistance than aluminium
• **Temperature** — most metals: higher temp = higher resistance

**Formula:** R = ρL/A
Where: ρ = resistivity of material, L = length, A = cross-sectional area

**Resistivity of common materials:**
| Material | Resistivity (Ω·m) |
|----------|-------------------|
| Silver | 1.59 × 10⁻⁸ |
| Copper | 1.68 × 10⁻⁸ |
| Aluminium | 2.82 × 10⁻⁸ |
| Nichrome | 1.10 × 10⁻⁶ |
| Carbon | 3–60 × 10⁻⁵ |
| Rubber | 10¹³ |

**Practical implications:**
Thinner, longer cables have higher resistance → more voltage drop and heat. Always select the correct wire size!""",

"""**Odpor (R)** je odpor voči toku elektrického prúdu. Materiály kladú prúdu odpor, pretože atómy blokujú pohyb elektrónov. Odpor sa meria v **Ohmoch (Ω)** — grécke písmeno Omega.

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
Tenšie a dlhšie káble majú vyšší odpor → väčší úbytok napätia a zahrievanie. Vždy vyber správny prierez vodiča!"""
),

# ── Block 5: eb-5 Series and Parallel ────────────────────────────────────────
(
"""Electrical components can be connected in two fundamental ways: **series** or **parallel**.

**Series circuits:**
• Components connected end-to-end in one loop
• Same current through every component
• Voltages add up: V_total = V₁ + V₂ + V₃
• Resistances add up: R_total = R₁ + R₂ + R₃
• If one component fails → entire circuit breaks

**Parallel circuits:**
• Components connected across the same two points
• Same voltage across each component
• Currents add up: I_total = I₁ + I₂ + I₃
• Total resistance DECREASES when branches added
• If one branch fails → others still work

**Calculating parallel resistance:**
1/R_total = 1/R₁ + 1/R₂ + 1/R₃

**Real-world examples:**
| Series | Parallel |
|--------|----------|
| Old Christmas lights | Household wiring |
| Battery cells for more voltage | Car headlights |
| Resistor current limiters | Most electrical installations |

**Remember:** Household wiring is ALWAYS parallel — each socket/light operates independently at full supply voltage.""",

"""Elektrické komponenty môžu byť zapojené dvoma základnými spôsobmi: **sériovo** alebo **paralelne**.

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
| Článkové batérie pre vyššie napätie | Svetlomety auta |
| Odporové obmedzovače prúdu | Väčšina elektrických inštalácií |

**Pamätaj:** Domáca inštalácia je VŽDY paralelná — každá zásuvka/svetlo funguje nezávisle pri plnom napájacím napätí."""
),

# ── Block 6: ol-1 Ohm's Law Introduction ─────────────────────────────────────
(
"""**Ohm's Law** is the fundamental relationship between voltage, current, and resistance. Discovered by Georg Simon Ohm in 1827, it states:

# V = I × R

Where:
- **V** = Voltage (Volts)
- **I** = Current (Amperes)
- **R** = Resistance (Ohms)

**The Ohm's Law Triangle:**
```
      V
    ——————
    I | R
```
Cover what you want to find:
- Cover V → I × R
- Cover I → V / R
- Cover R → V / I

**Practical examples:**
1. A 12V battery pushing current through a 4Ω resistor: I = 12/4 = 3A
2. A heater draws 10A from 230V mains: R = 230/10 = 23Ω
3. A 1kΩ resistor with 5mA through it: V = 0.005 × 1000 = 5V

**Remember:** Ohm's Law applies to *resistive* components at constant temperature. It doesn't directly apply to capacitors, inductors, or non-linear devices like diodes.""",

"""**Ohmov zákon** je základný vzťah medzi napätím, prúdom a odporom. Objavil ho Georg Simon Ohm v roku 1827:

# V = I × R

Kde:
- **V** = Napätie (Volty)
- **I** = Prúd (Ampéry)
- **R** = Odpor (Ohmy)

**Trojuholník Ohmovho zákona:**
```
      V
    ——————
    I | R
```
Zakry, čo chceš nájsť:
- Zakry V → I × R
- Zakry I → V / R
- Zakry R → V / I

**Praktické príklady:**
1. 12 V batéria ženie prúd cez rezistor 4 Ω: I = 12/4 = 3 A
2. Ohrievač odoberá 10 A zo siete 230 V: R = 230/10 = 23 Ω
3. Rezistor 1 kΩ s 5 mA cez neho: V = 0,005 × 1000 = 5 V

**Pamätaj:** Ohmov zákon platí pre *odporové* súčiastky pri konštantnej teplote. Priamo neplatí pre kondenzátory, cievky ani nelineárne prvky ako diódy."""
),

# ── Block 7: ol-2 Calculating Voltage ────────────────────────────────────────
(
"""When you know the current (**I**) and resistance (**R**), you can calculate voltage:

# V = I × R

**Step-by-step method:**
1. Identify what you know (I and R)
2. Apply V = I × R
3. Check units: A × Ω = V ✓

**Examples:**
- A 10A toaster through a 23Ω element: V = 10 × 23 = 230V ✓ (European mains)
- A 0.5A LED circuit through 240Ω: V = 0.5 × 240 = 120V (North American)
- A sensor drawing 20mA through 500Ω: V = 0.020 × 500 = 10V

**Multiple resistors in series:**
V_total = I × (R₁ + R₂ + R₃)

**Voltage divider (two resistors in series):**
V₂ = V_supply × R₂ / (R₁ + R₂)

**Memory tip:** Think of voltage as the "effort" — the more resistance and the more current you force through, the more voltage is needed.

**Real electrician application:** Checking voltage drop across a cable run:
V_drop = I × R_cable
Keep voltage drop < 3% of supply voltage (IEC recommendation).""",

"""Keď poznáš prúd (**I**) a odpor (**R**), môžeš vypočítať napätie:

# V = I × R

**Postup krok za krokom:**
1. Identifikuj, čo vieš (I a R)
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

**Tip na zapamätanie:** Napätie si predstav ako "úsilie" — čím väčší odpor a čím viac prúdu musíš pretlačiť, tým viac napätia potrebuješ.

**Praktické využitie:** Kontrola úbytku napätia na káblovom vedení:
V_úbytok = I × R_kábla
Udržuj úbytok napätia < 3 % napájacieho napätia (odporúčanie IEC)."""
),

# ── Block 8: ol-3 Calculating Current ────────────────────────────────────────
(
"""When you know voltage and resistance, solve for current:

# I = V / R

**Step-by-step method:**
1. Identify V and R
2. Divide V by R
3. Result is in Amperes

**Practical examples:**
| Scenario | Calculation | Result |
|----------|------------|--------|
| 230V mains, 46Ω heater | I = 230/46 | 5A |
| 12V battery, 4Ω motor | I = 12/4 | 3A |
| 5V USB, 250Ω LED | I = 5/250 | 20mA |
| 24V control circuit, 4.8kΩ | I = 24/4800 | 5mA |

**Current in parallel branches:**
Each branch has V/R_branch regardless of other branches.

**Why current matters for electricians:**
• Determines cable size (ampacity)
• Determines fuse/MCB rating
• Determines heat generated: P = I²R
• Circuit breakers trip based on current

**Warning signs of too much current:**
- Hot cables
- Tripping breakers
- Burning smell
- Dimming lights when appliances start""",

"""Keď poznáš napätie a odpor, vypočítaj prúd:

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

**Prúd v paralelných větvách:**
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
- Stmievanie svetiel pri spustení spotrebičov"""
),

# ── Block 9: ol-4 Calculating Resistance ─────────────────────────────────────
(
"""When you know voltage and current, solve for resistance:

# R = V / I

**Step-by-step:**
1. Measure or know V across the component
2. Measure or know I through the component
3. R = V / I

**Common applications:**
| Problem | Formula | Answer |
|---------|---------|--------|
| What resistor limits 20mA from 5V? | R = 5/0.020 | 250Ω |
| Circuit draws 3A from 240V — what's load resistance? | R = 240/3 | 80Ω |
| Battery: 9V, 45mA drawn — internal resistance? | R = 9/0.045 | 200Ω |

**Checking insulation resistance:**
An insulation resistance tester (Megger) applies high voltage and measures the resistance of insulation. Values should be millions of Ohms (MΩ):
- Good insulation: > 100 MΩ
- Minimum acceptable: 1 MΩ (IEC 60364)
- Dangerous: < 0.5 MΩ

**Resistance colour code (for fixed resistors):**
Band colours represent digits. Black=0, Brown=1, Red=2, Orange=3, Yellow=4, Green=5, Blue=6, Violet=7, Grey=8, White=9""",

"""Keď poznáš napätie a prúd, vypočítaj odpor:

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
Farby prúžkov predstavujú číslice. Čierna=0, Hnedá=1, Červená=2, Oranžová=3, Žltá=4, Zelená=5, Modrá=6, Fialová=7, Sivá=8, Biela=9"""
),

# ── Block 10: ol-5 Electrical Power ──────────────────────────────────────────
(
"""**Electrical Power (P)** is the rate at which energy is consumed or produced. Measured in **Watts (W)**.

**Three power formulas:**
# P = V × I
# P = I² × R
# P = V² / R

**Deriving from Ohm's Law:** Since V = IR:
- P = V × I = (IR) × I = I²R
- P = V × I = V × (V/R) = V²/R

**Energy vs Power:**
- Power (P) = rate of energy consumption (W)
- Energy (E) = P × t (Wh or kWh)
- 1 kWh = 1000W × 1 hour = 3,600,000 Joules

**Practical calculations:**
| Appliance | Power | Running 8h/day for 30 days |
|-----------|-------|---------------------------|
| LED bulb | 10W | 2.4 kWh |
| TV | 100W | 24 kWh |
| Fridge | 150W | 36 kWh |
| Shower | 8500W | 2040 kWh |
| EV charger | 7400W | 1776 kWh |

**Electrician's formula for heat dissipation:**
P_heat = I²R — this determines cable minimum cross-section, fuse ratings, and component temperature rise.""",

"""**Elektrický výkon (P)** je rýchlosť, s akou sa energia spotrebúva alebo produkuje. Meria sa vo **Wattoch (W)**.

**Tri vzorce pre výkon:**
# P = V × I
# P = I² × R
# P = V² / R

**Odvodzovanie z Ohmovho zákona:** Pretože V = IR:
- P = V × I = (IR) × I = I²R
- P = V × I = V × (V/R) = V²/R

**Energia vs. Výkon:**
- Výkon (P) = rýchlosť spotreby energie (W)
- Energia (E) = P × t (Wh alebo kWh)
- 1 kWh = 1000 W × 1 hodina = 3 600 000 Joulov

**Praktické výpočty:**
| Spotrebič | Výkon | Prevádzka 8 h/deň za 30 dní |
|-----------|-------|-----------------------------|
| LED žiarovka | 10 W | 2,4 kWh |
| TV | 100 W | 24 kWh |
| Chladnička | 150 W | 36 kWh |
| Sprcha | 8 500 W | 2 040 kWh |
| Nabíjačka EV | 7 400 W | 1 776 kWh |

**Vzorec pre tepelné straty:**
P_teplo = I²R — určuje minimálny prierez kábla, menovité hodnoty poistiek a nárast teploty komponentov."""
),

# ── Block 11: wf-1 Wire Types ─────────────────────────────────────────────────
(
"""Choosing the right wire type is critical for safety and performance. Two main categories:

**By conductor structure:**
• **Solid wire** — one single conductor. Stiff, cheaper, best for fixed wiring in conduit. Sizes up to ~10mm² normally solid.
• **Stranded wire** — many thin wires twisted together. Flexible, resists fatigue. Used for flexible cables, motor leads.

**By conductor material:**
• **Copper (Cu)** — most common. Low resistance, easy to connect, corrosion resistant. Standard choice.
• **Aluminium (Al)** — lighter, cheaper for large cables. Higher resistance than copper, requires special connectors (galvanic corrosion risk at junctions).

**Common cable types:**
| Type | Use |
|------|-----|
| NYM (Germany) / Twin & Earth (UK) | Fixed house wiring |
| NYY | Outdoor and underground |
| H07RN-F | Flexible heavy-duty, construction sites |
| NYMZ (screened) | Control circuits, EMC-sensitive |
| Coaxial | TV, RF signals |

**Temperature ratings:**
• Standard PVC: 70°C continuous
• XLPE/EPR: 90°C continuous
• Silicone: 180°C — near boilers, ovens""",

"""Výber správneho typu vodiča je kľúčový pre bezpečnosť a výkon. Dve hlavné kategórie:

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
• Silikón: 180 °C — pri kotloch, rúrach"""
),

# ── Block 12: wf-2 Wire Color Codes ──────────────────────────────────────────
(
"""**Wire color codes are life-saving standards.** They tell you at a glance which conductor does what, preventing dangerous mistakes.

**European IEC 60446 Standard (used in EU + many countries):**
| Conductor | Color |
|-----------|-------|
| Phase L1 | Brown |
| Phase L2 | Black |
| Phase L3 | Grey |
| Neutral (N) | Blue |
| Protective Earth (PE) | Green/Yellow |

**UK historic (pre-2004):**
| Conductor | Old Color | New Color |
|-----------|-----------|-----------|
| Live | Red | Brown |
| Neutral | Black | Blue |
| Earth | Green/Yellow | Green/Yellow |

**NEVER:**
- Use Green/Yellow for any conductor other than PE
- Connect Blue (Neutral) to the load live terminal
- Work on unidentified conductors without testing first

**When you encounter old wiring:**
- Old UK/European wiring may have different colors
- Always test with a voltage indicator before touching
- Document the wiring system before working on it

**Flex color codes:**
Brown = Live, Blue = Neutral, Green/Yellow = Earth""",

"""**Farebné označenie vodičov sú normy zachraňujúce životy.** Na prvý pohľad ti povedia, čo ktorý vodič robí, čím zabraňujú nebezpečným chybám.

**Európska norma IEC 60446 (používaná v EÚ a mnohých krajinách):**
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

**NIKDY:**
- Nepoužívaj Zeleno/Žltú pre iný vodič než PE
- Nepripájaj Modrú (Nulový) na fázovú svorku záťaže
- Nepracuj s neidentifikovanými vodičmi bez predchádzajúceho testovania

**Pri stretnutí so starou inštaláciou:**
- Stará UK/európska inštalácia môže mať iné farby
- Vždy testuj testerom napätia pred dotykom
- Zdokumentuj inštalačný systém pred prácou na ňom

**Farebné kódy flexibilných káblov:**
Hnedá = Fáza, Modrá = Nulový, Zeleno/Žltá = Uzemnenie"""
),

# ── Block 13: wf-3 Cable Sizing ───────────────────────────────────────────────
(
"""**Cable sizing** (ampacity = current-carrying capacity) is one of the most important skills for electricians.

**Key rule:** Cable ampacity must be GREATER than the maximum circuit current.

**Standard copper cable ampacity (in free air, PVC, 30°C ambient):**
| Cross-section | Typical Ampacity | Typical Use |
|---------------|-----------------|-------------|
| 1.5 mm² | 15–17A | Lighting circuits |
| 2.5 mm² | 20–25A | Socket outlets |
| 4 mm² | 30–32A | Shower circuits |
| 6 mm² | 38–40A | Cooker circuits |
| 10 mm² | 52–55A | Sub-mains, EV chargers |
| 16 mm² | 70A | Large sub-boards |

**Derating factors that REDUCE ampacity:**
• Installed in insulation: × 0.5
• Bundled with other cables: × 0.65–0.8
• High ambient temperature: Apply correction table
• Buried in ground: Different values apply

**Voltage drop calculation:**
V_drop = (mV/A/m × I × L) / 1000
Keep < 3% for final circuits (IEC recommendation)

**Golden rule:** When in doubt, go one size larger. The cost difference is small, but undersized cables cause fires!""",

"""**Dimenzovanie káblov** (zaťažiteľnosť = prúdová kapacita) je jedna z najdôležitejších zručností elektrikára.

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

**Zlaté pravidlo:** V prípade pochybností zvoľ väčší prierez. Cenový rozdiel je malý, ale poddimenzované káble spôsobujú požiare!"""
),

# ── Block 14: wf-4 Circuit Protection ────────────────────────────────────────
(
"""**Circuit protection devices** prevent damage and protect lives by disconnecting the circuit when a fault occurs.

**Fuses:**
• Contain a wire that melts when current exceeds rating
• Single-use — must be replaced after operation
• Very fast for short circuits, slow for overloads
• Types: BS88 HRC, BS1361, BS3036 cartridge

**MCBs (Miniature Circuit Breakers):**
• Resettable — trip and reset without replacement
• Two trip mechanisms:
  - Thermal (bimetal): slow, for sustained overloads
  - Magnetic: fast, for short circuits
• Types: B (3-5×In), C (5-10×In), D (10-20×In)

**RCDs (Residual Current Devices):**
• Detect earth fault currents as small as 30mA
• Trip in < 30ms at 30mA — before cardiac arrest
• 30mA = personal protection (socket circuits)
• 100mA / 300mA = fire protection only
• Cannot protect against line-to-neutral faults!

**RCBOs:**
= MCB + RCD in one device. Provides both overcurrent AND earth fault protection. More expensive but ideal for individual circuits.

**Coordination principle:**
Fuse/MCB must trip BEFORE cable reaches maximum temperature. This is called "cable protection coordination".""",

"""**Ochranné zariadenia obvodov** zabraňujú poškodeniu a chránia životy tým, že pri poruche odpoja obvod.

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
Poistka/istič musí vypnúť PRED tým, ako kábel dosiahne maximálnu teplotu. Toto sa nazýva "koordinácia ochrany kábla"."""
),

# ── Block 15: dc-1 How DC Motors Work ────────────────────────────────────────
(
"""A **DC (Direct Current) motor** converts electrical energy into mechanical rotational energy using magnetic fields.

**Basic principle — Lorentz Force:**
When a current-carrying conductor is placed in a magnetic field, it experiences a force:
**F = B × I × L**
Where: B = magnetic flux density, I = current, L = length of conductor

**Motor components:**
• **Stator** — stationary part, creates magnetic field (permanent magnets or field coils)
• **Rotor/Armature** — rotating part with conductor coils
• **Commutator** — rotary switch that reverses current in armature every half-turn
• **Brushes** — carbon contacts that transfer current to/from spinning commutator

**How it works:**
1. Current flows through armature coils
2. Armature coils are in the stator's magnetic field
3. Lorentz force acts on the conductors → rotation
4. Commutator reverses current every 180° → continuous rotation in same direction

**Back-EMF:**
As the motor speeds up, it acts like a generator, producing a "back-EMF" that opposes the supply voltage. This limits current at running speed.
- At standstill: back-EMF = 0, current is high (I = V/Ra)
- At full speed: back-EMF ≈ V_supply, current is low""",

"""**Jednosmerný motor (DC motor)** premieňa elektrickú energiu na mechanickú rotačnú energiu pomocou magnetických polí.

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
- Pri plnej rýchlosti: protinapätie ≈ V_napájanie, prúd je nízky"""
),

# ── Block 16: dc-2 Motor Components ──────────────────────────────────────────
(
"""**DC motors have several key components** that require maintenance and understanding:

**Armature (Rotor):**
• Core: Laminated iron to reduce eddy current losses
• Windings: Copper coils embedded in slots
• Commutator: Copper segments, insulated from each other

**Field System (Stator):**
• Permanent magnets (small motors) or
• Field coils (larger motors — allows speed control)
• Types: Series, Shunt, Compound, Separately excited

**Brushes:**
• Made of carbon/graphite (soft to protect commutator)
• Spring-loaded to maintain contact pressure
• Wear out, need inspection every 1000-3000 hours
• Signs of brush problems: sparking, chattering, noise

**Bearings:**
• Support the rotor shaft
• Failure symptoms: vibration, noise, overheating
• Should be lubricated per manufacturer schedule

**Cooling:**
• Fan on rotor shaft (self-ventilated) or
• Forced ventilation for enclosed motors
• Overheating is the main cause of motor failure

**Motor name plate information:**
kW rating, voltage, current, RPM, duty cycle, insulation class (A=105°C, B=130°C, F=155°C, H=180°C)""",

"""**Jednosmerné motory majú niekoľko kľúčových komponentov**, ktoré vyžadujú údržbu a pochopenie:

**Kotva (Rotor):**
• Jadro: Laminované železo na zníženie strát víriacimi prúdmi
• Vinutia: Medené cievky zabudované v drážkach
• Komutátor: Medené segmenty, izolované od seba

**Budiaci systém (Stator):**
• Permanentné magnety (malé motory) alebo
• Budiace cievky (väčšie motory — umožňuje riadenie rýchlosti)
• Typy: Sériové, Paralelné (shunt), Kombinované, Samostatné budenie

**Kefky:**
• Vyrobené z uhlíka/grafitu (mäkké, aby nechránili komutátor)
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
Výkon kW, napätie, prúd, RPM, pracovný cyklus, trieda izolácie (A=105 °C, B=130 °C, F=155 °C, H=180 °C)"""
),

# ── Block 17: dc-3 Motor Speed Control and Starting ──────────────────────────
(
"""**Starting a DC motor directly** applies full voltage instantly — this causes very high inrush current (up to 10× rated) which can damage the motor and supply.

**Why inrush is dangerous:**
At standstill, back-EMF = 0, so I = V / R_armature
Since R_armature is very small (< 1Ω typically), current can be enormous.

**Starting methods:**
1. **Series starting resistor** — reduces voltage across armature at start, resistors switched out as speed builds
2. **Variable voltage starter** — gradually increases supply voltage
3. **PWM drive (modern)** — electronic controller ramps up current smoothly

**Speed control methods:**
| Method | Effect | Speed Range |
|--------|--------|-------------|
| Armature voltage control | Below base speed | 0 to base |
| Field weakening | Above base speed | Base to max |
| PWM control | Any speed | Full range |

**Regenerative braking:**
DC motors can act as generators when decelerating, feeding energy back to the supply — used in electric vehicles and cranes.

**Four-quadrant operation:**
Modern DC drives can:
1. Forward motoring
2. Forward braking (regenerative)
3. Reverse motoring
4. Reverse braking (regenerative)""",

"""**Priame spustenie jednosmerného motora** okamžite priloží plné napätie — to spôsobuje veľmi vysoký záberový prúd (až 10× menovitý), ktorý môže poškodiť motor a napájaciu sústavu.

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
4. Spätné brzdenie (rekuperácia)"""
),

# ── Block 18: dc-4 Motor Protection ──────────────────────────────────────────
(
"""**DC motors must be protected** against abnormal conditions that can damage or destroy the motor:

**Overcurrent/Overload protection:**
• Thermal overload relay — bimetal strips heated by motor current trip after sustained overload
• Setting: 115–120% of motor rated current
• Allow for 6× inrush during start (with time-delay)

**Short circuit protection:**
• Fast-blow HRC fuses or magnetic-only MCBs
• Must trip before current can damage windings
• Often set at 10× rated current for motor circuits

**Temperature protection:**
• PTC thermistors embedded in windings
• Resistance increases sharply at threshold temperature
• Triggers relay to trip motor before insulation damaged

**Field failure protection (shunt motors):**
• Loss of field causes uncontrolled speed increase (runaway)
• Field failure relay detects absence of field current
• Trips motor circuit immediately

**Under-voltage protection:**
• Loss of voltage stops motor (safe)
• Contactor drops out on loss of supply
• Prevents unexpected restart when power restored (for safety)

**Phase failure (3-phase motors):**
• Single-phasing causes 3× overcurrent
• Phase failure relay detects unbalanced/missing phase
• Motor-protective switches have built-in phase protection""",

"""**Jednosmerné motory musia byť chránené** pred abnormálnymi stavmi, ktoré môžu motor poškodiť alebo zničiť:

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
• Motorové ochranné spínače majú vbudovanú ochranu fázy"""
),

# ── Block 19: sf-1 Electrical Hazards ────────────────────────────────────────
(
"""Electricity is one of the leading causes of workplace fatalities. Understanding the hazards is the first step to preventing accidents.

**The main electrical hazards:**

**1. Electric shock**
Current passes through the body — can cause:
- Muscle contraction (cannot release grip)
- Respiratory failure
- Cardiac arrest (ventricular fibrillation)
- Burns at entry/exit points

**2. Arc flash**
An explosive electrical arc releases enormous energy:
- Temperatures up to 20,000°C (4× sun surface)
- Intense UV/IR radiation causing blindness
- Pressure wave (blast)
- Molten metal projectiles
- Intense sound (hearing damage)

**3. Fire and explosion**
- Overloaded cables ignite insulation
- Sparks ignite flammable vapors/dust
- Poorly rated equipment in hazardous areas

**Safe voltage levels:**
- Extra Low Voltage (ELV): < 50V AC / 120V DC
- Even ELV can be dangerous in wet conditions or if stored energy is high

**The golden rule of electrical safety:**
**ALWAYS ASSUME CIRCUITS ARE LIVE UNTIL PROVEN DEAD WITH TEST EQUIPMENT**""",

"""Elektrina je jednou z hlavných príčin pracovných úrazov s následkom smrti. Pochopenie nebezpečenstiev je prvým krokom k predchádzaniu nehodám.

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
**VŽDY PREDPOKLADAJ, ŽE OBVODY SÚ POD NAPÄTÍM, KÝM TO TESTOVACÍM ZARIADENÍM NEOVERÍ OPAK**"""
),

# ── Block 20: sf-2 PPE ────────────────────────────────────────────────────────
(
"""**PPE is the last line of defense** — engineering controls and isolation should always come first. But when PPE is required, it must be the right type for the hazard.

**Insulated Gloves (IEC 60903):**
| Class | Max AC Voltage | Max DC Voltage |
|-------|---------------|----------------|
| 00 | 500V | 750V |
| 0 | 1,000V | 1,500V |
| 1 | 7,500V | 11,250V |
| 2 | 17,000V | 25,500V |
| 3 | 26,500V | 39,750V |
| 4 | 36,000V | 54,000V |

**Inspection before each use:**
• Roll up to trap air, squeeze — check for holes (inflation test)
• Check for cuts, abrasions, chemical damage
• Check date — replace every 6-12 months or per manufacturer

**Arc Flash PPE categories (NFPA 70E):**
| Category | Min. Arc Rating | Typical Clothing |
|----------|----------------|-----------------|
| 1 | 4 cal/cm² | FR shirt + pants |
| 2 | 8 cal/cm² | FR shirt + pants + arc flash suit |
| 3 | 25 cal/cm² | Arc flash suit |
| 4 | 40 cal/cm² | Heavy arc flash suit |

**Always required for electrical work:**
• Safety glasses/goggles
• Hard hat (Class E for live work)
• Safety shoes/boots (non-conductive soles)
• Hi-vis vest where required by site rules""",

"""**OOPP sú poslednou líniou obrany** — inžinierske kontroly a izolácia musia byť vždy na prvom mieste. Ale ak sú OOPP potrebné, musia byť správneho typu pre dané nebezpečenstvo.

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
• Ochranná helma (trieda E pre prácu na live zariadeniach)
• Bezpečnostná obuv (nevodivá podrážka)
• Reflexná vesta tam, kde to vyžadujú pravidlá pracoviska"""
),

# ── Block 21: sf-3 LOTO ───────────────────────────────────────────────────────
(
"""**LOTO (Lockout/Tagout)** is the procedure used to ensure that electrical equipment is safely de-energized before maintenance or repair work begins.

**LOTO Procedure Steps:**
1. **Identify** all energy sources (electrical, pneumatic, hydraulic, spring, gravity)
2. **Notify** affected personnel
3. **Shut down** the equipment normally
4. **Isolate** using the main disconnect/isolator
5. **Apply lock** — each worker applies their own padlock
6. **Apply tag** — warning label explaining the lockout
7. **Release stored energy** — discharge capacitors, release springs, drain pressure
8. **Verify** zero energy with appropriate test equipment

**Critical rules:**
• EACH worker must apply THEIR OWN lock
• Only the worker who applied the lock may remove it
• Even supervisors cannot remove another person's lock
• Tags alone (without locks) are NOT sufficient

**Group lockout:**
When multiple workers are present, a group lockout hasp is used — everyone applies their own lock to the hasp, which locks the isolation point. Work can only proceed when ALL locks are on.

**Energy verification:**
After LOTO applied:
- Test voltage with a calibrated voltage indicator
- Attempt to press Start/Run controls
- Only when confirmed dead = safe to work""",

"""**LOTO (Uzamknutie/Označenie)** je postup používaný na zabezpečenie, že elektrické zariadenie je bezpečne bez napätia pred začatím údržby alebo opravných prác.

**Postup LOTO krok za krokom:**
1. **Identifikuj** všetky zdroje energie (elektrická, pneumatická, hydraulická, pružinová, gravitačná)
2. **Oznám** dotknutému personálu
3. **Normálne vypni** zariadenie
4. **Izoluj** pomocou hlavného odpojovaíča/odpájača
5. **Nasaď zámok** — každý pracovník nasadí vlastný visiaci zámok
6. **Nasaď štítok** — výstražná nálepka vysvetľujúca uzamknutie
7. **Uvoľni uloženú energiu** — vybi kondenzátory, uvoľni pružiny, odvzdušni tlak
8. **Over** nulový energetický stav vhodným testovacím zariadením

**Kritické pravidlá:**
• KAŽDÝ pracovník musí nasadiť VLASTNÝ zámok
• Iba pracovník, ktorý nasadil zámok, ho môže odstrániť
• Aj nadriadení nemôžu odstrániť zámok inej osoby
• Samotné štítky (bez zámkov) NIE SÚ dostatočné

**Skupinové uzamknutie:**
Keď je prítomných viacero pracovníkov, použije sa skupinová konzola LOTO — každý nasadí vlastný zámok na konzolu, ktorá uzamkne izolačný bod. Práce môžu pokračovať iba keď sú VŠETKY zámky nasadené.

**Overenie energie:**
Po nasadení LOTO:
- Testuj napätie kalibrovaným testerom napätia
- Pokús sa stlačiť ovládacie prvky Štart/Beh
- Iba po potvrdení nulového stavu = bezpečné na prácu"""
),

# ── Block 22: sf-4 Arc Flash ──────────────────────────────────────────────────
(
"""**Arc Flash** is one of the most severe electrical hazards. Understanding protection boundaries is critical for anyone working near energized equipment.

**Arc Flash Boundaries (NFPA 70E / IEC):**
```
                    [Electrical Panel]
                          |
← Limited Approach ────── | ───────────────── →  (~3m)
← Restricted Approach ─── | ────── →             (~300mm–1m)
← Arc Flash Boundary ──── | ── →                 (calculated)
                       [Worker Zone]
```

**Boundary definitions:**
• **Limited Approach** — unqualified persons must stop here
• **Restricted Approach** — qualified workers only, with PPE
• **Arc Flash Boundary** — where incident energy = 1.2 cal/cm² (threshold for 2nd degree burn)
• **Working Distance** — face/body position during task

**Factors affecting arc flash severity:**
1. Available fault current (higher = more energy)
2. Arcing time (longer arc = more energy incident)
3. Working distance (inverse square law)
4. System voltage
5. Equipment gap/opening size

**Reducing arc flash risk:**
• Zone selective interlocking (faster trip)
• Bus differential protection
• Arc flash detection systems (light sensors)
• High-resistance grounding
• Remote racking out switchgear""",

"""**Oblúkový výboj** je jedno z najzávažnejších elektrických nebezpečenstiev. Pochopenie ochranných hraníc je nevyhnutné pre každého, kto pracuje v blízkosti nabytých zariadení.

**Hranice oblúkového výboja (NFPA 70E / IEC):**
```
                    [Elektrický rozvádzač]
                          |
← Obmedzený prísig ─────── | ───────────────── →  (~3 m)
← Obmedzený prísig (kval.) | ────── →             (~300 mm–1 m)
← Hranica oblúka ──────── | ── →                  (vypočítaná)
                       [Zóna pracovníka]
```

**Definície hraníc:**
• **Obmedzený prísun** — nekvalifikované osoby sa musia zastaviť tu
• **Obmedzený prísun (kvalifikovaný)** — iba kvalifikovaní pracovníci s OOPP
• **Hranica oblúkového výboja** — kde dopadajúca energia = 1,2 cal/cm² (prah pre popálenie 2. stupňa)
• **Pracovná vzdialenosť** — poloha tváre/tela počas úlohy

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
• Diaľkové vytiahnutie odpínačov"""
),

# ── Block 23: sf-5 Regulations ────────────────────────────────────────────────
(
"""Electrical work is governed by strict regulations and standards. As an electrician, you are legally required to comply with them.

**International Standards:**
• **IEC 60364** — International standard for electrical installations (basis for most national codes)
• **IEC 60446** — Wire color codes
• **IEC 60529** — IP ratings (Ingress Protection)
• **IEC 60950/62368** — Equipment safety

**National standards examples:**
| Country | Standard |
|---------|---------|
| UK | BS 7671 (18th Edition) — IET Wiring Regulations |
| Germany | DIN VDE 0100 |
| France | NF C 15-100 |
| USA | NFPA 70 (National Electrical Code) |
| Australia | AS/NZS 3000 (Wiring Rules) |

**Key legal requirements (EU/UK):**
• All new installations must be inspected and tested
• Periodic inspection required (every 5-10 years for commercial)
• Work must be done by, or supervised by, a competent person
• Certificates of compliance must be issued

**Competency requirements:**
Most jurisdictions require:
- Formal qualifications (apprenticeship + exams)
- Registration/licensing with appropriate body
- Continuing Professional Development (CPD)

**Never cut corners on regulations — electrical faults cause thousands of house fires and deaths every year.**""",

"""Elektrická práca sa riadi prísnymi predpismi a normami. Ako elektrikár si zo zákona povinný ich dodržiavať.

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

**Nikdy nerob skratky v predpisoch — elektrické poruchy spôsobujú tisíce požiarov v domácnostiach a úmrtí každý rok.**"""
),

# ── Block 24: ti-1 Hand Tools ─────────────────────────────────────────────────
(
"""Every electrician needs a set of quality, well-maintained hand tools. Here are the essentials and how to use them safely.

**Voltage testers (always first!):**
• Non-contact voltage tester — detects AC voltage without touching conductor
• Pen-type voltage detector — basic live/dead indication
• Dual GS38 (UK) compliant test leads for multimeters

**Screwdrivers:**
• Standard & Phillips head, various sizes
• Insulated to IEC 60900 (1000V rated)
• VDE-tested tools carry orange handle markings

**Pliers:**
• Combination pliers — gripping + cutting
• Long-nose (needle-nose) — tight spaces, forming loops
• Side cutters (diagonal pliers) — cutting wire
• Curved jaw pliers — conduit, locknut work

**Cable tools:**
• Wire strippers — adjustable for different cable sizes
• Cable cutters — clean cuts on heavy cable
• Crimping tool — bootlace ferrules, cable lugs
• Fish tape/draw rod — pulling cables through conduit

**Torque screwdriver:**
Essential for terminal tightening — under/over torqued terminals cause failures and fires!

**Tool safety rules:**
- Inspect tools before use — don't use damaged tools
- Use insulated tools when near live parts
- Never use a screwdriver as a chisel or pry bar""",

"""Každý elektrikár potrebuje sadu kvalitného, dobre udržiavaného ručného náradia. Tu sú základné nástroje a spôsob ich bezpečného používania.

**Testery napätia (vždy ako prvé!):**
• Bezkontaktný tester napätia — detekuje striedavé napätie bez dotyku vodiča
• Pero-tester — základná indikácia live/dead
• Merací káble kompatibilné s GS38 (UK) pre multimetre

**Skrutkovače:**
• Plochá a krížová hlava, rôzne veľkosti
• Izolované podľa IEC 60900 (hodnotené 1000 V)
• Náradie testované VDE nesie označenie oranžovej rukovätí

**Kliešte:**
• Kombinované kliešte — uchopovanie + strihanie
• Ihlové kliešte — tiesnené priestory, tvorenie slučiek
• Bočné nožnice (uhlopriečne kliešte) — strihanie drôtu
• Kliešte s ohnutou čeľusťou — práca s chráničkami, poistnými maticami

**Káblovnárske nástroje:**
• Odizolátory — nastaviteľné pre rôzne priemery káblov
• Kabelárske nožnice — čisté rezy hrubých káblov
• Lisovacie kliešte — dutinky (bootlace ferrule), káblovéoka
• Ťahací drôt/tyč — ťahanie káblov cez chráničky

**Momentový skrutkovač:**
Nevyhnutný pre uťahovanie svoriek — nedotiahnuté alebo predotiahnuté svorky spôsobujú poruchy a požiare!

**Pravidlá bezpečnosti náradia:**
- Skontroluj náradie pred použitím — nepoužívaj poškodené náradie
- Používaj izolované náradie v blízkosti živých časti
- Nikdy nepoužívaj skrutkovač ako sekáč alebo páčidlo"""
),

# ── Block 25: ti-2 Multimeter ─────────────────────────────────────────────────
(
"""A **digital multimeter (DMM)** is the most essential instrument for every electrician. Mastering it is non-negotiable.

**What a multimeter measures:**
• **Voltage (V AC and V DC)** — in parallel
• **Current (A)** — in series (break the circuit!)
• **Resistance (Ω)** — circuit must be DE-ENERGIZED
• **Continuity** — low resistance = beep
• **Diodes**, capacitance, frequency (advanced models)

**How to measure voltage:**
1. Set to appropriate V range (AC or DC)
2. Connect BLACK probe to COM jack, RED probe to V/Ω jack
3. Touch probes across the source/component
4. Read voltage — for AC it shows RMS value

**How to measure current:**
1. Set to appropriate A range
2. Break the circuit and insert meter in SERIES
3. Current flows through the meter via the A/mA socket

**Safety rules for multimeter use:**
• Check probes for damage before use
• Never measure resistance on a live circuit
• Use CAT III / CAT IV rated meter for mains work
• Correct input socket — A ≠ V/Ω (fuses are inside!)
• Start on highest range, work down

**True-RMS meters:**
For AC measurements involving non-sine waveforms, use a True-RMS meter. Average-responding meters give wrong results on inverter outputs, variable speed drives, etc.""",

"""**Digitálny multimeter (DMM)** je najdôležitejší prístroj každého elektrikára. Ovládanie multimetra je nevyhnutné.

**Čo multimeter meria:**
• **Napätie (V AC a V DC)** — paralelne
• **Prúd (A)** — sériovo (prerušiť obvod!)
• **Odpor (Ω)** — obvod musí byť BEZ NAPÄTIA
• **Kontinuita** — nízky odpor = pípnutie
• **Diódy**, kapacita, frekvencia (pokročilé modely)

**Ako merať napätie:**
1. Nastav na príslušný rozsah V (AC alebo DC)
2. Čierny hrot do COM zdierky, červený do V/Ω zdierky
3. Dotkni sa hrotmi naprieč zdrojom/komponentom
4. Čítaj napätie — pre AC zobrazuje hodnotu RMS

**Ako merať prúd:**
1. Nastav na príslušný rozsah A
2. Prerušiť obvod a vložiť meter SÉRIOVO
3. Prúd tečie cez meter cez zdierku A/mA

**Bezpečnostné pravidlá pre používanie multimetra:**
• Skontroluj hroty pred použitím na poškodenie
• Nikdy nemeraj odpor na živom obvode
• Použi meter s hodnotením CAT III / CAT IV pre prácu so sieťou
• Správna vstupná zdierka — A ≠ V/Ω (vo vnútri sú poistky!)
• Začni na najvyššom rozsahu, potom znižuj

**True-RMS meradlá:**
Pre AC merania zahŕňajúce nesínusové priebehy použi True-RMS meter. Meradlá reagujúce priemerom dávajú nesprávne výsledky na výstupoch meničov, frekvenčných meničoch atď."""
),

# ── Block 26: ti-3 Professional Testing Equipment ────────────────────────────
(
"""Professional electricians use specialized test instruments beyond the basic multimeter for installation testing and fault-finding.

**Insulation Resistance Tester (Megger):**
• Applies DC voltage (500V or 1000V) and measures insulation resistance in MΩ
• Test at 500V DC for 230V/400V systems
• Pass threshold: > 1 MΩ (IEC 60364-6), expect >100 MΩ for new wiring
• Disconnect all electronics first! (Dimmers, RCDs, electronics can be damaged)

**Earth Loop Impedance Tester:**
• Measures earth fault loop impedance (Zs)
• Verifies protective device will operate within required time
• Zs must be ≤ maximum value tabulated in IEC 60364-6 or BS 7671

**RCD Tester:**
• Tests RCD trip time at rated fault current (30mA)
• Pass: trip within 300ms at 1×In, within 40ms at 5×In
• Also tests for nuisance-tripping with 15mA test

**Clamp Meter (CT Clamp):**
• Measures AC current without breaking the circuit
• Clamps around single conductor — induces current in CT coil
• Some models measure DC using Hall Effect sensor
• Also measures power, power factor, harmonics

**PAT Tester (Portable Appliance Tester):**
• Tests earth continuity and insulation resistance of portable appliances
• Required by UK law for work equipment in many workplaces

**Installation test sequence:**
1. Continuity of protective conductors
2. Insulation resistance
3. Polarity
4. Earth loop impedance
5. RCD operation
6. Functional tests""",

"""Profesionálni elektrikári používajú špeciálne testovacie prístroje nad rámec základného multimetra na testovanie inštalácií a hľadanie porúch.

**Tester odporu izolácie (Megger):**
• Aplikuje jednosmerné napätie (500 V alebo 1 000 V) a meria odpor izolácie v MΩ
• Testuj pri 500 V DC pre systémy 230 V/400 V
• Prahová hodnota: > 1 MΩ (IEC 60364-6), pre novú inštaláciu očakávaj > 100 MΩ
• Najprv odpoj všetku elektroniku! (Stmievače, chrániče, elektronika môžu byť poškodené)

**Tester slučky zemnej poruchy:**
• Meria impedanciu slučky zemnej poruchy (Zs)
• Overuje, že ochranné zariadenie vypne v požadovanom čase
• Zs musí byť ≤ maximálna hodnota tabulkovaná v IEC 60364-6 alebo BS 7671

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
6. Funkčné testy"""
),

]

# Apply all translations
count = 0
not_found = []
for original, translation in translations:
    if original in content:
        content = content.replace(original, translation, 1)
        count += 1
    else:
        not_found.append(original[:80])

print(f"Applied {count}/{len(translations)} replacements")
if not_found:
    print(f"\nNOT FOUND ({len(not_found)}):")
    for t in not_found:
        print(f"  {t!r}")

with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
