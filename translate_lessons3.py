#!/usr/bin/env python3
"""
Third pass: translate all remaining English quiz questions, options, and explanations in lessons.ts
"""

with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

count = 0

def r(old, new):
    global content, count
    if old in content:
        content = content.replace(old, new, 1)
        count += 1
    else:
        print(f"NOT FOUND: {old[:80]!r}")

# ── Fix remaining AC question ─────────────────────────────────────────────────
r("question: 'In AC (alternating current), electrons flow in one direction only.'",
  "question: 'Pri striedavom prúde (AC) elektróny tečú len jedným smerom.'")

# ── ol3 questions & options ───────────────────────────────────────────────────
r("question: 'A 120V supply connects to a 30Ω resistor. What is the current?'",
  "question: 'Napájanie 120 V je zapojené cez rezistor 30 Ω. Aký je prúd?'")
r("options: ['3600 A', '0.25 A', '4 A', '150 A']",
  "options: ['3600 A', '0,25 A', '4 A', '150 A']")
r("explanation: 'I = V / R = 120V / 30Ω = 4 A'",
  "explanation: 'I = V / R = 120 V / 30 Ω = 4 A'")
r("question: 'A 9V battery connects to a 3Ω resistor. Current = ___ A.'",
  "question: '9V batéria je zapojená cez rezistor 3 Ω. Prúd = ___ A.'")
r("hint: 'I = V / R'", "hint: 'I = V / R'")  # keep as-is
r("question: 'A 230V circuit has a total resistance of 46Ω. What is the circuit current?'",
  "question: 'Obvod s napätím 230 V má celkový odpor 46 Ω. Aký je prúd v obvode?'")
r("options: ['10 A', '5 A', '46 A', '0.2 A']",
  "options: ['10 A', '5 A', '46 A', '0,2 A']")
r("explanation: 'I = V / R = 230V / 46Ω = 5 A'",
  "explanation: 'I = V / R = 230 V / 46 Ω = 5 A'")
r("question: 'If resistance increases from 10Ω to 20Ω (voltage constant at 100V), the current drops from 10A to 5A.'",
  "question: 'Ak sa odpor zvýši z 10 Ω na 20 Ω (napätie konštantné 100 V), prúd klesne z 10 A na 5 A.'")
r("explanation: 'I = V/R. At 10Ω: I = 100/10 = 10A. At 20Ω: I = 100/20 = 5A. Current halved when resistance doubled.'",
  "explanation: 'I = V/R. Pri 10 Ω: I = 100/10 = 10 A. Pri 20 Ω: I = 100/20 = 5 A. Prúd sa znížil na polovicu, keď sa odpor zdvojnásobil.'")

# ── ol4 questions & options ───────────────────────────────────────────────────
r("question: 'A 24V power supply delivers 6A to a load. What is the resistance of the load?'",
  "question: 'Napájací zdroj 24 V dodáva 6 A do záťaže. Aký je odpor záťaže?'")
r("options: ['144 Ω', '0.25 Ω', '4 Ω', '30 Ω']",
  "options: ['144 Ω', '0,25 Ω', '4 Ω', '30 Ω']")
r("question: 'A 12V circuit has 4A flowing. R = ___ Ω.'",
  "question: 'Obvodom s napätím 12 V tečie 4 A. R = ___ Ω.'")
r("question: 'Using a 9V battery, you measure 0.1A flowing through an unknown resistor. Its value is:'",
  "question: 'Pomocou 9 V batérie meriaš 0,1 A tečúcich cez neznámy rezistor. Jeho hodnota je:'")
r("options: ['0.9 Ω', '90 Ω', '9.1 Ω', '900 Ω']",
  "options: ['0,9 Ω', '90 Ω', '9,1 Ω', '900 Ω']")
r("question: 'R = V / I gives resistance in Ohms when V is in Volts and I is in Amperes.'",
  "question: 'R = V / I dáva odpor v Ohmoch, keď V je vo Voltoch a I v Ampéroch.'")
r("explanation: 'Correct! V/I = Volts/Amperes = Ohms (Ω). The units work out dimensionally: 1 Ω = 1 V/A.'",
  "explanation: 'Správne! V/I = Volty/Ampéry = Ohmy (Ω). Jednotky sú konzistentné: 1 Ω = 1 V/A.'")

# ── ol5 questions & options ───────────────────────────────────────────────────
r("question: 'A 230V appliance draws 10A. What is its power consumption?'",
  "question: 'Spotrebič s napätím 230 V odoberá 10 A. Aká je jeho spotreba výkonu?'")
r("question: 'Power is measured in ___ (symbol: W).'",
  "question: 'Výkon sa meria v ___ (symbol: W).'")
r("answer: 'Watts'", "answer: 'Wattoch'")
r("hint: 'Named after James Watt, Scottish inventor'",
  "hint: 'Pomenovaný po Jamesovi Wattovi, škótskom vynálezcovi'")
r("question: 'A 3000W shower runs for 0.5 hours. How much energy does it use?'",
  "question: 'Sprcha s príkonom 3000 W beží 0,5 hodiny. Koľko energie spotrebuje?'")
r("options: ['1500 Wh', '1.5 kWh', '6000 Wh', 'Both A and B']",
  "options: ['1500 Wh', '1,5 kWh', '6000 Wh', 'A aj B']")
r("explanation: 'Energy = P × t = 3kW × 0.5h = 1.5 kWh = 1500 Wh. A and B are both correct (same value, different units).'",
  "explanation: 'Energia = P × t = 3 kW × 0,5 h = 1,5 kWh = 1500 Wh. A aj B sú správne (rovnaká hodnota, iné jednotky).'")
r("question: 'A 2kW heater and a 500W TV run for 2 hours each. Total energy used is ___ kWh.'",
  "question: 'Ohrievač 2 kW a TV 500 W bežia každý 2 hodiny. Celková spotreba energie je ___ kWh.'")
r("answer: '5'", "answer: '5'")
r("hint: 'Calculate each separately then add'",
  "hint: 'Vypočítaj každý samostatne, potom sčítaj'")
r("explanation: 'Heater: 2kW × 2h = 4 kWh. TV: 0.5kW × 2h = 1 kWh. Total = 5 kWh.'",
  "explanation: 'Ohrievač: 2 kW × 2 h = 4 kWh. TV: 0,5 kW × 2 h = 1 kWh. Spolu = 5 kWh.'")

# ── wf-1 Wire Types ───────────────────────────────────────────────────────────
r("question: 'For a flexible extension cord that bends frequently, which conductor type is best?'",
  "question: 'Pre flexibilný predlžovací kábel, ktorý sa často ohýba, ktorý typ vodiča je najvhodnejší?'")
r("options: ['Solid conductor', 'Stranded conductor', 'Bare copper', 'Aluminium']",
  "options: ['Plný vodič', 'Laná (plety)', 'Holá meď', 'Hliník']")
r("explanation: 'Stranded conductors are used for flexible cables because the many thin wires can flex without breaking, unlike solid wire which would fatigue and break.'",
  "explanation: 'Lanko sa používa pre flexibilné káble, pretože veľa tenkých drôtov sa môže ohýbať bez prasknutia, na rozdiel od plného vodiča.'")
r("question: 'Aluminium has lower electrical resistance per meter than copper of the same cross-section.'",
  "question: 'Hliník má nižší elektrický odpor na meter ako meď rovnakého prierezu.'")
r("explanation: 'False. Copper has much lower resistivity (1.68 × 10⁻⁸ Ω·m) vs aluminium (2.82 × 10⁻⁸ Ω·m). Aluminium conductors need to be about 60% larger cross-section to match copper.'",
  "explanation: 'Nepravda. Meď má oveľa nižšiu merný odpor (1,68 × 10⁻⁸ Ω·m) ako hliník (2,82 × 10⁻⁸ Ω·m). Hliníkové vodiče musia mať asi o 60 % väčší prierez, aby zodpovedali medi.'")
r("question: 'What is the maximum continuous operating temperature for standard PVC insulation?'",
  "question: 'Aká je maximálna trvalá prevádzková teplota pre štandardnú PVC izoláciu?'")
r("options: ['50°C', '70°C', '90°C', '105°C']",
  "options: ['50 °C', '70 °C', '90 °C', '105 °C']")
r("explanation: 'Standard PVC (polyvinyl chloride) insulation is rated for a maximum conductor temperature of 70°C. XLPE and EPR insulation allows up to 90°C.'",
  "explanation: 'Štandardná PVC (polyvinylchlorid) izolácia je hodnotená pre maximálnu teplotu vodiča 70 °C. XLPE a EPR izolácia umožňuje až 90 °C.'")
r("question: 'NYY cable is used for ___ and underground wiring.'",
  "question: 'Kábel NYY sa používa pre ___ a podzemné vedenie.'")
r("answer: 'fixed'", "answer: 'pevné'")
r("hint: 'The opposite of flexible'", "hint: 'Opak flexibilného'")
r("explanation: 'NYY is a fixed wiring cable — rigid PVC insulated and sheathed, suitable for underground, outdoor, and indoor permanent installations.'",
  "explanation: 'NYY je kábel pre pevné inštalácie — tuhá PVC izolácia a plášť, vhodný pre podzemné, vonkajšie a vnútorné trvalé inštalácie.'")

# ── wf-2 Wire Color Codes ─────────────────────────────────────────────────────
r("question: 'In the European IEC standard, what color identifies the Neutral conductor?'",
  "question: 'Podľa európskej normy IEC, akú farbu má Nulový vodič (N)?'")
r("options: ['Brown', 'Blue', 'Green/Yellow', 'Grey']",
  "options: ['Hnedá', 'Modrá', 'Zeleno/Žltá', 'Sivá']")
r("explanation: 'In IEC 60446 (European standard), Blue identifies the Neutral conductor. Brown = Live/Phase, Green/Yellow = Earth.'",
  "explanation: 'Podľa IEC 60446 (európska norma) modrá farba označuje Nulový vodič. Hnedá = Fáza, Zeleno/Žltá = Uzemnenie.'")
r("question: 'In a 3-phase European system, which color is used for Phase 2?'",
  "question: 'V trojfázovom európskom systéme, akou farbou je označená fáza 2?'")
r("options: ['Brown', 'Black', 'Grey', 'Red']",
  "options: ['Hnedá', 'Čierna', 'Sivá', 'Červená']")
r("explanation: 'In IEC 60446 three-phase: L1 = Brown, L2 = Black, L3 = Grey, Neutral = Blue, Earth = Green/Yellow.'",
  "explanation: 'Podľa IEC 60446 trojfázové: L1 = Hnedá, L2 = Čierna, L3 = Sivá, Nulový = Modrá, Uzem = Zeleno/Žltá.'")
r("question: 'In European wiring, the Live/Line (Phase 1) conductor is ___ colored.'",
  "question: 'V európskej inštalácii má Fázový vodič (fáza 1) ___ farbu.'")
r("answer: 'brown'", "answer: 'hnedú'")
r("hint: 'Think of the color of tree bark or chocolate'",
  "hint: 'Myslite na farbu kôry stromu alebo čokolády'")
r("explanation: 'In the EU IEC 60446 standard, the live/Phase 1 conductor is brown. Always verify with a tester before touching!'",
  "explanation: 'Podľa normy EÚ IEC 60446 je Fázový vodič (L1) hnedý. Vždy over testerom pred dotykom!'")
r("question: 'What does a Green/Yellow striped wire indicate in European wiring?'",
  "question: 'Čo označuje zeleno/žltý prúžkovaný vodič v európskej inštalácii?'")
r("options: ['Live wire', 'Neutral wire', 'Earth/Ground wire', 'Phase 3']",
  "options: ['Fázový vodič', 'Nulový vodič', 'Zemniaci vodič', 'Fáza 3']")
r("explanation: 'Green/Yellow is exclusively reserved for the Earth (PE - Protective Earth) conductor. NEVER use it for any other purpose.'",
  "explanation: 'Zeleno/Žltá je výhradne vyhradená pre Zemniaci vodič (PE - Ochranné Uzemnenie). NIKDY ju nepoužívaj na iný účel.'")

# ── wf-3 Cable Sizing ─────────────────────────────────────────────────────────
r("question: 'What cross-section copper cable is typically used for household socket outlet circuits (20A)?'",
  "question: 'Aký prierez medeného kábla sa zvyčajne používa pre domáce zásuvkové okruhy (20 A)?'")
r("options: ['1.5 mm²', '2.5 mm²', '4 mm²', '6 mm²']",
  "options: ['1,5 mm²', '2,5 mm²', '4 mm²', '6 mm²']")
r("explanation: '2.5 mm² copper is the standard for 20A socket outlet circuits in European homes. 1.5 mm² is used for lighting. 4–6 mm² for cookers.'",
  "explanation: '2,5 mm² meď je štandard pre 20 A zásuvkové obvody v európskych domávnostiach. 1,5 mm² sa používa pre osvetlenie. 4–6 mm² pre sporáky.'")
r("question: 'Bundling multiple cables together increases the safe current-carrying capacity of each cable.'",
  "question: 'Zviazanie viacerých káblov dohromady zvyšuje bezpečnú prúdovú zaťažiteľnosť každého kábla.'")
r("explanation: 'False. When cables are bundled, heat cannot dissipate as easily, so cable ampacity is REDUCED. Correction factors (the derating factor) must be applied.'",
  "explanation: 'Nepravda. Keď sú káble zviazané, teplo sa nemôže tak ľahko odvádzať, takže zaťažiteľnosť je ZNÍŽENÁ. Musia sa aplikovať korekčné koeficienty.'")
r("question: 'Lighting circuits typically use which minimum cable cross-section?'",
  "question: 'Aký minimálny prierez kábla sa typicky používa pre osvetľovacie obvody?'")
r("options: ['1.0 mm²', '1.5 mm²', '2.5 mm²', '4.0 mm²']",
  "options: ['1,0 mm²', '1,5 mm²', '2,5 mm²', '4,0 mm²']")
r("explanation: '1.5 mm² copper is the minimum standard for fixed lighting circuits (up to ~13-15A). Always check local regulations.'",
  "explanation: '1,5 mm² meď je minimálny štandard pre pevné osvetľovacie obvody (do ~13–15 A). Vždy skontroluj miestne predpisy.'")
r("question: 'IEC standards require maximum ___ % voltage drop for final circuits.'",
  "question: 'Normy IEC požadujú maximálny ___ % úbytok napätia pre záverečné obvody.'")
r("answer: '3'", "answer: '3'")
r("hint: 'The percentage limit that ensures efficient power delivery'",
  "hint: 'Percentuálny limit zabezpečujúci efektívny prenos energie'")

# ── wf-4 Circuit Protection ───────────────────────────────────────────────────
r("question: 'Which protective device provides protection against electric shock from earth faults?'",
  "question: 'Ktoré ochranné zariadenie chráni pred úrazom prúdom pri zemnej poruche?'")
r("options: ['Fuse', 'MCB', 'RCD', 'Switch']",
  "options: ['Poistka', 'Istič (MCB)', 'Chránič (RCD)', 'Vypínač']")
r("explanation: 'An RCD (Residual Current Device) detects very small earth fault currents (typically 30mA) and trips in milliseconds, providing shock protection.'",
  "explanation: 'Chránič (RCD) detekuje veľmi malé unikajúce prúdy (typicky 30 mA) a vypne v milisekundách, čím chráni pred úrazom.'")
r("question: 'For a motor circuit that requires a Type C MCB, what is its magnetic trip threshold?'",
  "question: 'Pre motorový obvod vyžadujúci Typ C istič (MCB), aký je magnetický prahovník?'")
r("options: ['3–5× In', '5–10× In', '10–20× In', '20–50× In']",
  "options: ['3–5× In', '5–10× In', '10–20× In', '20–50× In']")
r("explanation: 'Type C MCBs trip magnetically at 5–10× rated current. Type B = 3–5× (lighting), Type C = 5–10× (motors/transformers), Type D = 10–20× (high-inrush).'",
  "explanation: 'Ističe Typu C majú magnetický výboj pri 5–10× menovitom prúde. Typ B = 3–5× (osvetlenie), Typ C = 5–10× (motory), Typ D = 10–20× (vysoký záberový prúd).'")
r("question: 'An MCB (Miniature Circuit Breaker) provides personal protection against electric shock.'",
  "question: 'Istič (MCB) poskytuje osobnú ochranu pred úrazom elektrickým prúdom.'")
r("explanation: 'False. MCBs protect cables from overcurrent and short circuits. They trip too slowly at low earth fault currents to protect against electric shock. RCDs are needed for personal protection.'",
  "explanation: 'Nepravda. Ističe chránia káble pred nadprúdom a skratom. Pri nízkych unikajúcich prúdoch reagujú príliš pomaly na ochranu pred úrazom. Na ochranu osôb sú potrebné chrániče (RCD).'")
r("question: 'The standard RCD sensitivity for personal protection is ___ mA.'",
  "question: 'Štandardná citlivosť chrániča (RCD) pre osobnú ochranu je ___ mA.'")
r("answer: '30'", "answer: '30'")
r("hint: 'The value below the threshold that typically causes ventricular fibrillation'",
  "hint: 'Hodnota pod prahom, ktorá typicky spôsobuje komorovú fibriláciu'")

# ── dc-1 How DC Motors Work ───────────────────────────────────────────────────
r("question: 'What is the purpose of the commutator in a DC motor?'",
  "question: 'Aký je účel komutátora v jednosmernom motore?'")
r("""options: [
          'To increase motor speed',
          'To reverse current direction in armature coils for continuous rotation',
          'To protect the motor from overload',
          'To cool the motor windings',
        ]""",
  """options: [
          'Zvýšiť rýchlosť motora',
          'Meniť smer prúdu v kotvových cievkach pre nepretržitú rotáciu',
          'Chrániť motor pred preťažením',
          'Chladiť vinutie motora',
        ]""")
r("explanation: 'The commutator reverses the direction of current in the armature coils every half-rotation, ensuring the electromagnetic force always acts in the same rotational direction.'",
  "explanation: 'Komutátor mení smer prúdu v kotvových cievkach pri každej polotáčke, čím zabezpečuje, že elektromagnetická sila vždy pôsobí rovnakým rotačným smerom.'")
r("question: 'What force causes rotation in a DC motor?'",
  "question: 'Aká sila spôsobuje rotáciu v jednosmernom motore?'")
r("options: ['Gravitational force', 'Centrifugal force', 'Electromagnetic (Lorentz) force', 'Friction force']",
  "options: ['Gravitačná sila', 'Dostredivá sila', 'Elektromagnetická (Lorentzova) sila', 'Trecia sila']")
r("explanation: 'DC motors use the Lorentz force (F = BIL) — a current-carrying conductor in a magnetic field experiences a force. The direction follows Fleming\\'s Left Hand Rule.'",
  "explanation: 'Jednosmerné motory využívajú Lorentzovu silu (F = BIL) — vodič nesúci prúd v magnetickom poli zažíva silu. Smer určuje Flemingovo pravidlo ľavej ruky.'")
r("question: 'In a DC motor, what is Back-EMF (counter-electromotive force)?'",
  "question: 'V jednosmernom motore, čo je protinapätie (back-EMF)?'")
r("""options: [
          'A voltage that helps the motor start faster',
          'A voltage generated by the motor that opposes the supply voltage',
          'The voltage stored in the capacitor',
          'An AC voltage in the motor',
        ]""",
  """options: [
          'Napätie, ktoré pomáha motoru rýchlejšie naštartovať',
          'Napätie generované motorom, ktoré sa protivít napájaciemu napätiu',
          'Napätie uložené v kondenzátore',
          'Striedavé napätie v motore',
        ]""")
r("explanation: 'Back-EMF is generated by the rotating armature (acting as a generator). It opposes the supply voltage, limiting current. At full speed, back-EMF is close to supply voltage, so only small current flows.'",
  "explanation: 'Protinapätie generuje rotujúca kotva (pôsobí ako generátor). Protivít sa napájaciemu napätiu, čím obmedzuje prúd. Pri plnej rýchlosti je protinapätie blízko napájacieho napätia, takže tečie len malý prúd.'")
r("question: 'Fleming\\'s Left Hand Rule for DC motors shows: thumb = Force direction, index finger = ___, middle finger = Current.'",
  "question: 'Flemingovo pravidlo ľavej ruky pre motory: palec = smer sily, ukazovák = ___, prostredník = prúd.'")
r("answer: 'Field'", "answer: 'Pole'")
r("hint: 'The magnetic component between fingers'",
  "hint: 'Magnetická zložka medzi prstami'")
r("explanation: 'In Fleming\\'s Left Hand Rule: Thumb = Motion (Force), Index finger = Field (magnetic), Middle finger = Current. Helps predict motor rotation direction.'",
  "explanation: 'Flemingovo pravidlo ľavej ruky: Palec = Pohyb (sila), Ukazovák = Pole (magnetic), Prostredník = Prúd. Pomáha predpovedať smer rotácie motora.'")

# ── dc-2 Motor Components ─────────────────────────────────────────────────────
r("question: 'Why is the armature core made of laminated iron sheets rather than solid iron?'",
  "question: 'Prečo je jadro kotvy vyrobené z laminovaných oceľových plechov a nie z plného železa?'")
r("""options: [
          'To make it lighter',
          'To reduce eddy current losses and heating',
          'To improve magnetic field strength',
          'To allow the commutator to fit',
        ]""",
  """options: [
          'Aby bolo ľahšie',
          'Na zníženie strát víriacimi prúdmi a zahrievania',
          'Na zlepšenie sily magnetického poľa',
          'Aby sa zmestil komutátor',
        ]""")
r("explanation: 'Laminating the core breaks it into thin sheets insulated from each other. This limits the loops where eddy currents can flow, greatly reducing resistive heating losses.'",
  "explanation: 'Laminovanie jadra ho rozdeľuje na tenké plátky izolované od seba. Tým sa obmedzujú slučky, kde môžu tiecť víriace prúdy, čo výrazne znižuje straty tepelným odporom.'")
r("question: 'DC motor brushes never need replacement as they are made of hardened steel.'",
  "question: 'Kefky jednosmerného motora nikdy nepotrebujú výmenu, pretože sú vyrobené z tvrdej ocele.'")
r("explanation: 'False. Brushes are made of soft carbon (graphite), which wears away as they slide against the commutator. They need regular inspection and replacement — typically every few thousand hours of operation.'",
  "explanation: 'Nepravda. Kefky sú vyrobené z mäkkého uhlíka (grafitu), ktorý sa opotrebúva, keď kĺže po komutátore. Vyžadujú pravidelné kontroly a výmenu — typicky každých niekoľko tisíc hodín prevádzky.'")
r("question: 'Which field winding type provides the highest starting torque in a DC motor?'",
  "question: 'Aký typ budenia poskytuje najvyšší záberový moment v jednosmernom motore?'")
r("options: ['Shunt (parallel) wound', 'Series wound', 'Separately excited', 'Permanent magnet']",
  "options: ['Paralelné (shunt) budenie', 'Sériové budenie', 'Samostatné budenie', 'Permanentný magnet']")
r("explanation: 'Series-wound DC motors have field coils in series with the armature. At start, high current flows through both — creating very high magnetic field and therefore very high starting torque. Used in traction (trains, cranes).'",
  "explanation: 'Sériovo budené jednosmerné motory majú budiacie cievky v sérii s kotvou. Pri štarte tečie veľký prúd cez obe — vytvára sa veľmi silné magnetické pole a teda veľmi vysoký záberový moment. Používa sa v trakčných aplikáciách (vlaky, žeriavy).'")
r("question: 'A healthy commutator should be smooth and ___ colored.'",
  "question: 'Zdravý komutátor by mal byť hladký a ___ farby.'")
r("answer: 'copper'", "answer: 'medenej'")
r("hint: 'What color is the metal it is made of?'",
  "hint: 'Akú farbu má kov, z ktorého je vyrobený?'")
r("explanation: 'A healthy commutator is smooth with a rich copper or brown color from a thin film of graphite. Black bars, grooves, or burns indicate problems needing service.'",
  "explanation: 'Zdravý komutátor je hladký s bohatou medenou alebo hnedastou farbou z tenkého grafitového filu. Čierne pásy, drážky alebo spálenie naznačujú problémy vyžadujúce servis.'")
r("question: 'What are carbon brushes in a DC motor designed to do?'",
  "question: 'Na čo slúžia uhlíkové kefky v jednosmernom motore?'")
r("""options: [
          'Transfer current between stationary and rotating parts',
          'Cool the armature',
          'Create the magnetic field',
          'Support the rotor shaft',
        ]""",
  """options: [
          'Prenášať prúd medzi statickými a rotujúcimi časťami',
          'Chladiť kotvu',
          'Vytvárať magnetické pole',
          'Podopierať hriadeľ rotora',
        ]""")
r("explanation: 'Carbon brushes maintain electrical contact between the stationary circuit and the rotating commutator. They must be soft enough not to damage the commutator while conducting current reliably.'",
  "explanation: 'Uhlíkové kefky udržiavajú elektrický kontakt medzi statickým obvodom a rotujúcim komutátorom. Musia byť dostatočne mäkké, aby nepoškodili komutátor, a zároveň spoľahlivo viesť prúd.'")

# ── dc-3 Motor Starting ───────────────────────────────────────────────────────
r("question: 'Increasing the field current (strengthening the field) increases the speed of a DC shunt motor.'",
  "question: 'Zvýšenie budiaceho prúdu (posilnenie poľa) zvyšuje rýchlosť jednosmerného shunt motora.'")
r("explanation: 'False. For a shunt motor, increasing the field REDUCES speed. To increase speed, you WEAKEN the field (above base speed) or increase the armature voltage (below base speed).'",
  "explanation: 'Nepravda. Pre shunt motor zvýšenie poľa ZNIŽUJE rýchlosť. Na zvyšenie rýchlosti sa oslabí pole (nad základnou rýchlosťou) alebo zvýši napätie kotvy (pod základnou rýchlosťou).'")
r("question: 'Which method is used in modern variable-speed DC drives to control motor speed?'",
  "question: 'Akú metódu používajú moderné pohony na riadenie rýchlosti jednosmerného motora?'")
r("options: ['Adding series resistance', 'Mechanical gearbox', 'Pulse Width Modulation (PWM)', 'Changing supply frequency']",
  "options: ['Pridávanie sériového odporu', 'Mechanická prevodovka', 'Pulzná šírková modulácia (PWM)', 'Zmena frekvencie napájania']")
r("explanation: 'Modern DC drives use PWM to rapidly switch voltage on and off. By varying the duty cycle (on-time ratio), the average voltage — and therefore motor speed — is precisely controlled with high efficiency.'",
  "explanation: 'Moderné jednosmerné pohony používajú PWM na rýchle spínanie napätia. Zmenou šírky impulzu (pomeru zapnutia) sa presne riadi priemerné napätie — a teda rýchlosť motora — s vysokou účinnosťou.'")
r("question: 'Field ___ is used to control DC motor speed above its base speed.'",
  "question: 'Oslabenie ___ sa používa na riadenie rýchlosti jednosmerného motora nad jeho základnou rýchlosťou.'")
r("answer: 'weakening'", "answer: 'poľa'")
r("hint: 'Reducing the magnetic component'",
  "hint: 'Znižovanie magnetickej zložky'")
r("explanation: 'Above base speed, DC motors are controlled by field weakening — reducing field current to reduce flux, which allows the armature to spin faster for the same voltage.'",
  "explanation: 'Nad základnou rýchlosťou sa jednosmerné motory riadia oslabením poľa — znížením budiaceho prúdu, čo znižuje magnetický tok a umožňuje kotve rýchlejšie sa otáčať pri rovnakom napätí.'")
r("question: 'What happens when a DC motor is first started (before back-EMF builds up)?'",
  "question: 'Čo sa stane, keď sa jednosmerný motor prvýkrát spustí (pred vytvorením protinapätia)?'")
r("""options: [
          'Very low current flows',
          'Very high current flows because back-EMF = 0',
          'Motor starts slowly with no issues',
          'The fuse must be removed first',
        ]""",
  """options: [
          'Tečie veľmi malý prúd',
          'Tečie veľmi veľký prúd, pretože protinapätie = 0',
          'Motor sa spúšťa pomaly bez problémov',
          'Najprv treba vybrať poistku',
        ]""")
r("explanation: 'At standstill, back-EMF = 0, so only armature resistance limits current. I = V/R_armature — this can be many times rated current! That\\'s why motor starters are needed.'",
  "explanation: 'V kľude je protinapätie = 0, takže prúd obmedzuje len odpor kotvy. I = V/R_kotvy — to môže byť mnohonásobok menovitého prúdu! Preto sú potrebné rozbeháče motorov.'")

# ── dc-4 Motor Protection ─────────────────────────────────────────────────────
r("question: 'What happens to a DC shunt motor if it loses its field current while running?'",
  "question: 'Čo sa stane s jednosmerným shunt motorom, ak stratí budiaci prúd počas prevádzky?'")
r("""options: [
          'Motor slows down and stops safely',
          'Motor speed becomes dangerously high (runaway)',
          'Motor reverses direction',
          'Nothing happens',
        ]""",
  """options: [
          'Motor spomaľuje a bezpečne sa zastaví',
          'Rýchlosť motora sa nebezpečne zvýši (pretočenie)',
          'Motor zmení smer otáčania',
          'Nič sa nestane',
        ]""")
r("explanation: 'Without field current, there\\'s no flux to limit speed. The motor races to dangerous speeds that can destroy the armature. Field failure relays are used to trip the circuit immediately.'",
  "explanation: 'Bez budiaceho prúdu nie je magnetický tok, ktorý by obmedzoval rýchlosť. Motor sa rozbehuje až na nebezpečné otáčky, ktoré môžu zničiť kotvu. Relé straty poľa okamžite vypne obvod.'")
r("question: 'A thermal overload relay is designed to handle the high current of a direct short circuit.'",
  "question: 'Tepelné relé preťaženia je navrhnuté na zvládnutie vysokého prúdu pri priamom skrate.'")
r("explanation: 'False. Thermal overload relays protect against sustained moderate overcurrent (overload). For short circuits, fuses or MCBs are needed — they react much faster than thermal relays.'",
  "explanation: 'Nepravda. Tepelné relé preťaženia chráni pred trvalým miernym nadprúdom (preťaženie). Pre skraty sú potrebné poistky alebo ističe — reagujú oveľa rýchlejšie ako tepelné relé.'")
r("question: 'A PTC thermistor embedded in motor windings is used to:'",
  "question: 'PTC termistor zabudovaný vo vinutí motora sa používa na:'")
r("""options: [
          'Measure motor speed',
          'Monitor winding temperature and trip if too hot',
          'Reduce starting current',
          'Improve power factor',
        ]""",
  """options: [
          'Meranie rýchlosti motora',
          'Monitorovanie teploty vinutia a výpadok pri prehriatí',
          'Zníženie záberového prúdu',
          'Zlepšenie účinníka',
        ]""")
r("explanation: 'PTC thermistors are embedded directly in motor windings. Their resistance rises sharply when the temperature exceeds a threshold, triggering a protection relay to shut down the motor before winding insulation is damaged.'",
  "explanation: 'PTC termistory sú zabudované priamo vo vinutí motora. Ich odpor prudko vzrastie, keď teplota prekročí prah, čím spustí ochranné relé na vypnutie motora pred poškodením izolácie vinutia.'")
r("question: 'A thermal overload relay senses motor ___ to protect against running overloads.'",
  "question: 'Tepelné relé preťaženia sníma ___ motora na ochranu pred preťažením.'")
r("answer: 'current'", "answer: 'prúd'")
r("hint: 'The electrical quantity that causes heating'",
  "hint: 'Elektrická veličina spôsobujúca zahrievanie'")
r("explanation: 'Thermal overload relays use bimetal strips heated by the motor current. If current exceeds the set value for too long, the bimetal bends far enough to trip the circuit.'",
  "explanation: 'Tepelné relé preťaženia používajú bimetalové pásky zohrievané prúdom motora. Ak prúd prekračuje nastavenú hodnotu príliš dlho, bimetal sa ohýba natoľko, že vypne obvod.'")

# ── sf-1 Electrical Hazards ───────────────────────────────────────────────────
r("question: 'At what current level does ventricular fibrillation (potentially fatal heart rhythm) typically occur?'",
  "question: 'Pri akej hladine prúdu typicky nastáva komorová fibrilácia (potenciálne smrteľný srdcový rytmus)?'")
r("options: ['1 mA', '10 mA', '50–100 mA', '1 A']",
  "options: ['1 mA', '10 mA', '50–100 mA', '1 A']")
r("explanation: '50–100mA through the heart is the most dangerous range, typically causing ventricular fibrillation. Even lower values (10mA) cause cannot-let-go muscular contraction.'",
  "explanation: '50–100 mA prechádzajúce srdcom je najnebezpečnejší rozsah, ktorý typicky spôsobuje komorovú fibriláciu. Aj nižšie hodnoty (10 mA) spôsobujú svalové stiahnutie, ktoré nedovolí pustiť.'")
r("question: 'Dry skin provides much less protection against electric shock than wet skin.'",
  "question: 'Suchá pokožka poskytuje oveľa menšiu ochranu pred úrazom prúdom ako mokrá pokožka.'")
r("explanation: 'False. Dry skin has much higher resistance (up to 100,000 Ω) than wet skin (as low as 1,000 Ω). Wet conditions dramatically reduce body resistance, making electric shock far more dangerous.'",
  "explanation: 'Nepravda. Suchá pokožka má oveľa vyšší odpor (až 100 000 Ω) ako mokrá (až 1 000 Ω). Mokré podmienky dramaticky znižujú odpor tela, čo robí úraz prúdom oveľa nebezpečnejším.'")
r("question: 'What temperature can an electrical arc flash reach?'",
  "question: 'Akú teplotu môže oblúkový výboj dosiahnuť?'")
r("options: ['500°C', '1,000°C', '5,000°C', '20,000°C']",
  "options: ['500 °C', '1 000 °C', '5 000 °C', '20 000 °C']")
r("explanation: 'An electrical arc flash can reach temperatures up to 20,000°C — four times hotter than the surface of the sun. This causes severe burns, blindness, and explosive pressure waves.'",
  "explanation: 'Oblúkový výboj môže dosiahnuť teploty až 20 000 °C — štyrikrát horúcejšie ako povrch Slnka. Spôsobuje ťažké popáleniny, slepotu a výbušné tlakové vlny.'")
r("question: 'The most dangerous path for current through the body is hand-to-hand because it passes through the ___.'",
  "question: 'Najnebezpečnejšia dráha prúdu cez telo je z ruky do ruky, pretože prechádza cez ___.'")
r("answer: 'heart'", "answer: 'srdce'")
r("hint: 'The vital organ in your chest'",
  "hint: 'Životne dôležitý orgán v hrudníku'")
r("explanation: 'The hand-to-hand path goes through the thorax and heart. The heart is extremely sensitive to even small currents — this path makes electric shock far more likely to be fatal.'",
  "explanation: 'Dráha z ruky do ruky prechádza cez hrudník a srdce. Srdce je mimoriadne citlivé na aj malé prúdy — táto dráha robí úraz prúdom oveľa pravdepodobnejšie smrteľným.'")
r("question: 'Which condition makes electric shock most dangerous?'",
  "question: 'Ktorá podmienka robí úraz prúdom najnebezpečnejším?'")
r("""options: [
          'Dry conditions, wearing gloves',
          'Wet conditions, barefoot on a grounded floor',
          'Working alone in a dry room',
          'Using only one hand',
        ]""",
  """options: [
          'Suché podmienky, wearing rukavice',
          'Mokré podmienky, bosý na uzemnenom podlahe',
          'Práca osamote v suchej miestnosti',
          'Používanie len jednej ruky',
        ]""")
r("explanation: 'Wet conditions + barefoot on conductive ground = very low body resistance + complete circuit. This maximizes current through the body and risk of fatal shock.'",
  "explanation: 'Mokré podmienky + bosý na vodivej podlahe = veľmi nízky odpor tela + úplný obvod. Tým sa maximalizuje prúd prechádzajúci telom a riziko smrteľného úrazu.'")

# ── sf-2 PPE ──────────────────────────────────────────────────────────────────
r("question: 'What class of insulating gloves is rated for up to 1,000V AC?'",
  "question: 'Aká trieda izolačných rukavíc je hodnotená pre napätia až 1 000 V AC?'")
r("options: ['Class 00', 'Class 0', 'Class 1', 'Class 2']",
  "options: ['Trieda 00', 'Trieda 0', 'Trieda 1', 'Trieda 2']")
r("explanation: 'IEC 60903 rubber insulating glove classes: 00 = 500V, 0 = 1,000V, 1 = 7,500V, 2 = 17,000V, 3 = 26,500V, 4 = 36,000V. Always select the class appropriate for your voltage level.'",
  "explanation: 'Triedy izolačných rukavíc IEC 60903: 00 = 500 V, 0 = 1 000 V, 1 = 7 500 V, 2 = 17 000 V, 3 = 26 500 V, 4 = 36 000 V. Vždy vyber triedu zodpovedajúcu tvojej hladine napätia.'")
r("question: 'Regular cotton clothing provides adequate protection against arc flash.'",
  "question: 'Bežné bavlnené oblečenie poskytuje dostatočnú ochranu pred oblúkovým výbojom.'")
r("explanation: 'False. Standard cotton can ignite and continue burning, significantly worsening arc flash injuries. Flame-resistant (FR) clothing is required — it does not ignite easily and self-extinguishes.'",
  "explanation: 'Nepravda. Štandardná bavlna može vznietiť a pokračovať horieť, čo výrazne zhoršuje popáleniny od oblúka. Je potrebné oblečenie odolné plameňom (FR) — ľahko sa nevznieti a samohasí.'")
r("question: 'Before using insulating rubber gloves, how should you check them for defects?'",
  "question: 'Pred použitím izolačných gumených rukavíc, ako ich skontrolujete na defekty?'")
r("""options: [
          'Run them under water to check for leaks',
          'Roll them up and check for cracks',
          'Inflate them with air and check for holes',
          'No inspection needed if they look fine',
        ]""",
  """options: [
          'Podrž ich pod vodou a skontroluj netesnosti',
          'Zviň ich a skontroluj praskliny',
          'Nafúkni ich vzduchom a skontroluj diery',
          'Žiadna kontrola nie je potrebná, ak vyzerajú v poriadku',
        ]""")
r("explanation: 'Roll the gloves toward the fingers to trap air, then squeeze to check for leaks — called the air inflation test. Also visually inspect for cuts, punctures, and deterioration. Never use damaged gloves!'",
  "explanation: 'Zvij rukavice smerom k prstom, aby si uzatvoril vzduch, potom stlač a skontroluj netesnosti — nazýva sa test nafúknutím vzduchom. Tiež vizuálne skontroluj porezanie, prepichnutie a znehodnotenie. Nikdy nepoužívaj poškodené rukavice!'")
r("question: 'Arc flash PPE categories are based on ___ energy levels measured in cal/cm².'",
  "question: 'Kategórie OOPP pre oblúkový výboj sú založené na ___ energetických úrovniach meraných v cal/cm².'")
r("answer: 'incident'", "answer: 'dopadajúcich'")
r("hint: 'The energy at the worker\\'s face/body, not the total released energy'",
  "hint: 'Energia pri tváre/tele pracovníka, nie celková uvoľnená energia'")
r("explanation: 'PPE categories 1–4 are based on incident energy at the working distance in cal/cm². Category 1 = up to 4 cal/cm², Category 4 = up to 40 cal/cm². Higher category = more protection needed.'",
  "explanation: 'Kategórie OOPP 1–4 sú založené na dopadajúcej energii vo vzdialenosti pracovníka v cal/cm². Kategória 1 = do 4 cal/cm², Kategória 4 = do 40 cal/cm². Vyššia kategória = potrebná väčšia ochrana.'")

# ── sf-3 LOTO ─────────────────────────────────────────────────────────────────
r("question: 'How many personal padlocks should a worker apply during a LOTO procedure?'",
  "question: 'Koľko osobných zámkov by mal pracovník nasadiť počas postupu LOTO?'")
r("options: ['None — just the supervisor\\'s lock', '1 — the group lock', '1 personal lock per worker', 'As many as the foreman decides']",
  "options: ['Žiadny — len zámok nadriadeného', '1 — skupinový zámok', '1 osobný zámok na pracovníka', 'Toľko, koľko rozhodne vedúci']")
r("explanation: 'Each worker must apply their OWN personal lock to every isolation point. Only the individual worker can remove their own lock. This ensures no one can energize the system while any worker is present.'",
  "explanation: 'Každý pracovník musí nasadiť VLASTNÝ osobný zámok na každý izolačný bod. Iba samotný pracovník môže odstrániť vlastný zámok. Tým sa zaistí, že nikto nemôže napájať systém, kým je prítomný akýkoľvek pracovník.'")
r("question: 'Which of the following is NOT a valid energy source that must be isolated in LOTO?'",
  "question: 'Čo z nasledujúceho NIE JE platným zdrojom energie, ktorý musí byť izolovaný v LOTO?'")
r("options: ['Electrical energy', 'Hydraulic pressure', 'Ambient temperature', 'Stored spring energy']",
  "options: ['Elektrická energia', 'Hydraulický tlak', 'Okolitá teplota', 'Uložená pružinová energia']")
r("explanation: 'Ambient temperature is not a stored/hazardous energy source in the LOTO context. LOTO must control ALL forms of hazardous energy: electrical, pneumatic, hydraulic, mechanical (springs, gravity), chemical, thermal.'",
  "explanation: 'Okolitá teplota nie je uloženým/nebezpečným zdrojom energie v kontexte LOTO. LOTO musí kontrolovať VŠETKY formy nebezpečnej energie: elektrická, pneumatická, hydraulická, mechanická (pružiny, gravitácia), chemická, tepelná.'")
r("question: 'What is the LAST step before starting maintenance work after applying LOTO?'",
  "question: 'Aký je POSLEDNÝ krok pred začatím údržby po nasadení LOTO?'")
r("""options: [
          'Apply your personal lock',
          'Notify your supervisor',
          'Verify zero energy state with appropriate testing equipment',
          'Put on your PPE',
        ]""",
  """options: [
          'Nasadiť osobný zámok',
          'Notifikovať nadriadeného',
          'Overiť stav nulovej energie vhodným testovacím zariadením',
          'Nasadiť OOPP',
        ]""")
r("explanation: 'The last step is ALWAYS to verify that the system is truly de-energized using a live voltage tester. Never assume isolation is complete — always test!'",
  "explanation: 'Posledným krokom je VŽDY overenie, že systém je skutočne bez napätia pomocou testeru živého napätia. Nikdy nepredpokladaj, že izolácia je úplná — vždy testuj!'")
r("question: 'LOTO stands for Lockout / ___.'",
  "question: 'LOTO znamená Uzamknutie / ___.'")
r("answer: 'Tagout'", "answer: 'Označenie'")
r("hint: 'The second action: attaching a warning label'",
  "hint: 'Druhá akcia: pripevnenie výstražného štítku'")
r("explanation: 'LOTO = Lockout/Tagout. Lockout: physically preventing energy with a lock. Tagout: attaching a tag (warning label) explaining why the equipment is locked out and who applied it.'",
  "explanation: 'LOTO = Uzamknutie/Označenie. Uzamknutie: fyzické zabránenie energii zámkom. Označenie: pripevnenie štítku (výstražnej nálepky) vysvetľujúcej, prečo je zariadenie uzamknuté a kto to urobil.'")

# ── sf-4 Arc Flash ────────────────────────────────────────────────────────────
r("question: 'What is the best way to protect yourself from arc flash hazards?'",
  "question: 'Aký je najlepší spôsob ochrany pred rizikom oblúkového výboja?'")
r("""options: [
          'Wear the highest category PPE available',
          'De-energize the equipment before working — eliminate the hazard',
          'Work quickly to minimize exposure time',
          'Stand further back from the panel',
        ]""",
  """options: [
          'Nosiť OOPP najvyššej dostupnej kategórie',
          'Odpoj napájanie pred prácou — odstráň nebezpečenstvo',
          'Pracuj rýchlo, aby si minimalizoval čas expozície',
          'Stoj ďalej od rozvádzača',
        ]""")
r("explanation: 'The best protection is to eliminate the hazard by de-energizing. PPE is the last resort, not the first defense. If you can safely de-energize — always do it!'",
  "explanation: 'Najlepšia ochrana je odstrániť nebezpečenstvo odpojením napájania. OOPP je posledná možnosť, nie prvá obrana. Ak môžeš bezpečne odpojiť — vždy to urob!'")
r("question: 'The Flash Protection Boundary is 1.2 cal/cm² — where a first-degree burn is the worst outcome.'",
  "question: 'Hranica ochrany pred oblukom je 1,2 cal/cm² — kde popálenie 1. stupňa je najhorší možný výsledok.'")
r("question: 'What information must be shown on an arc flash hazard label on an electrical panel?'",
  "question: 'Aké informácie musia byť uvedené na nálepke rizika oblúkového výboja na elektrickom rozvádzači?'")
r("""options: [
          'Panel color and installation date',
          'Incident energy or PPE category, flash boundary, and working voltage',
          'The name of the installer',
          'Maximum load current only',
        ]""",
  """options: [
          'Farba rozvádzača a dátum inštalácie',
          'Dopadajúca energia alebo kategória OOPP, hranica oblúka a pracovné napätie',
          'Meno inštalatéra',
          'Len maximálny záťažový prúd',
        ]""")
r("explanation: 'Arc flash labels must show: incident energy (cal/cm²) or PPE category, flash protection boundary, and working voltage. This allows workers to select appropriate PPE before opening the panel.'",
  "explanation: 'Nálepky oblúkového výboja musia uvádzať: dopadajúcu energiu (cal/cm²) alebo kategóriu OOPP, hranicu ochrany pred oblúkom a pracovné napätie. To umožňuje pracovníkom vybrať vhodné OOPP pred otvorením rozvádzača.'")
r("question: 'Arc flash incident energy is calculated based on fault current, arcing time, and working ___.'",
  "question: 'Dopadajúca energia oblúkového výboja sa vypočítava na základe skratového prúdu, doby oblúka a pracovnej ___.'")
r("answer: 'distance'", "answer: 'vzdialenosti'")
r("hint: 'How far away you stand'", "hint: 'Ako ďaleko stojíš'")
r("explanation: 'Incident energy decreases with the square of the distance from the arc. Working distance, fault current, and arcing time are the three main factors in arc flash calculations.'",
  "explanation: 'Dopadajúca energia klesá s druhou mocninou vzdialenosti od oblúka. Pracovná vzdialenosť, skratový prúd a doba oblúka sú tri hlavné faktory pri výpočtoch oblúkového výboja.'")

# ── sf-5 Regulations ──────────────────────────────────────────────────────────
r("question: 'Which standard governs electrical installation wiring in the United Kingdom?'",
  "question: 'Ktorá norma riadi elektrické inštalácie vo Veľkej Británii?'")
r("options: ['IEC 60364', 'NEC (NFPA 70)', 'BS 7671 (18th Edition)', 'OSHA 1910.302']",
  "options: ['IEC 60364', 'NEC (NFPA 70)', 'BS 7671 (18. vydanie)', 'OSHA 1910.302']")
r("explanation: 'BS 7671 (IET Wiring Regulations, 18th Edition) is the standard for UK electrical installations. IEC 60364 is the international standard, while NEC is the US standard.'",
  "explanation: 'BS 7671 (Nariadenia IET pre zapojenie, 18. vydanie) je norma pre UK elektrické inštalácie. IEC 60364 je medzinárodná norma, zatiaľ čo NEC je americká norma.'")
r("question: 'An electrician can legally work on any electrical system without supervision or certification if they feel confident.'",
  "question: 'Elektrikár môže legálne pracovať na akomkoľvek elektrickom systéme bez dohľadu alebo certifikácie, ak sa cíti sebaisto.'")
r("explanation: 'False. Most countries require electricians to be licensed, certified, or supervised. Work on live HV systems requires specific authorizations. \"Feeling confident\" is not a legal qualification.'",
  "explanation: 'Nepravda. Väčšina krajín vyžaduje, aby elektrikári boli licencovaní, certifikovaní alebo pod dohľadom. Práca na živých VN systémoch vyžaduje špecifické oprávnenia. Citit sa sebaisto nie je právna kvalifikácia.'")
r("question: 'What is required before a new electrical installation can be put into service?'",
  "question: 'Čo je potrebné pred uvedením novej elektrickej inštalácie do prevádzky?'")
r("""options: [
          'Approval from the building owner',
          'An installation certificate and testing to verify compliance',
          'A 30-day waiting period',
          'Only a visual inspection',
        ]""",
  """options: [
          'Schválenie od majiteľa budovy',
          'Certifikát inštalácie a testovanie na overenie súladu',
          '30-dňová čakacia lehota',
          'Iba vizuálna kontrola',
        ]""")
r("explanation: 'Before energizing a new installation, it must be inspected and tested (insulation resistance, continuity, earth fault loop impedance, RCD tests, etc.) and a certificate of compliance issued.'",
  "explanation: 'Pred spustením novej inštalácie musí byť inšpekovaná a testovaná (odpor izolácie, kontinuita, impedancia zemnej poruchovej slučky, testy chrániča atď.) a vydaný certifikát súladu.'")
r("question: 'The IEC standard for low voltage electrical installations worldwide is IEC ___.'",
  "question: 'Medzinárodná norma IEC pre nízkonapäťové elektrické inštalácie je IEC ___.'")
r("answer: '60364'", "answer: '60364'")
r("hint: 'The low voltage installations standard number'",
  "hint: 'Číslo normy pre nízkonapäťové inštalácie'")

# ── ti-1 Hand Tools ───────────────────────────────────────────────────────────
r("question: 'What voltage rating are IEC 60900 insulated electrician tools rated for?'",
  "question: 'Aké napäťové hodnotenie majú izolované elektrikárske náradie podľa IEC 60900?'")
r("options: ['240V', '500V', '1,000V', '10,000V']",
  "options: ['240 V', '500 V', '1 000 V', '10 000 V']")
r("explanation: 'IEC 60900 requires insulated tools to be tested and rated for 10,000V and safe for use up to 1,000V AC or 1,500V DC. Always look for the 1000V double triangle symbol.'",
  "explanation: 'IEC 60900 vyžaduje, aby izolované náradie bolo testované a hodnotené pre 10 000 V a bezpečné na použitie do 1 000 V AC alebo 1 500 V DC. Vždy hľadaj symbol 1000 V dvojitý trojuholník.'")
r("question: 'Which tool is used to pull cables through walls or conduit?'",
  "question: 'Ktorý nástroj sa používa na ťahanie káblov cez steny alebo chránič?'")
r("options: ['Cable stripper', 'Fish tape (draw wire)', 'Combination pliers', 'Cable ties']",
  "options: ['Odizolátory káblov', 'Ťahací drôt (fish tape)', 'Kombinované kliešte', 'Sťahovačky káblov']")
r("explanation: 'Fish tape (also called draw wire or cable puller) is a stiff but flexible tape fed through conduit or walls. The cable is attached to the end and pulled through.'",
  "explanation: 'Ťahací drôt (tiež nazývaný draw wire alebo cable puller) je tuhá ale flexibilná páska zavádzaná cez chránič alebo steny. Na konci sa pripevní kábel a ťahá sa cez.'")
r("question: 'Long-nose pliers are used to reach tight spaces and form ___ at wire terminals.'",
  "question: 'Ihlové kliešte sa používajú na dosiahnutie tiesnych priestorov a tvorenie ___ na svorkách vedenia.'")
r("answer: 'loops'", "answer: 'slučiek'")
r("hint: 'What shape you need for screw terminals'",
  "hint: 'Aký tvar potrebuješ pre skrutkové svorky'")
r("explanation: 'Long-nose (needle-nose) pliers excel at bending wire into small loops for screw terminals, gripping fine components, and working in tight spaces where combination pliers cannot reach.'",
  "explanation: 'Ihlové kliešte sú vynikajúce na ohýbanie vodičov do malých slučiek pre skrutkové svorky, uchopovanie jemných komponentov a prácu v tiesnych priestoroch, kde sa kombinované kliešte nedostanú.'")
r("question: 'Which of these is the FIRST tool you should use before touching any electrical wiring?'",
  "question: 'Ktorý z týchto nástrojov by si mal použiť AKO PRVÝ pred dotykom akéhokoľvek elektrického vedenia?'")
r("options: ['Wire stripper', 'Multimeter', 'Voltage tester / non-contact tester', 'Screwdriver']",
  "options: ['Odizolátory', 'Multimeter', 'Tester napätia / bezkontaktný tester', 'Skrutkovač']")
r("explanation: 'Always use a voltage tester or non-contact tester FIRST to verify the circuit is dead before touching any wires. Even if you think you turned off the circuit — always verify!'",
  "explanation: 'Vždy použi tester napätia alebo bezkontaktný tester AKO PRVÝ na overenie, že obvod je bez napätia pred dotykom akýchkoľvek vodičov. Aj keď si myslíš, že si obvod vypol — vždy overif!'")

# ── ti-2 Multimeter ───────────────────────────────────────────────────────────
r("question: 'When measuring resistance with a multimeter, the circuit being tested should be:'",
  "question: 'Pri meraní odporu multimetrom musí byť testovaný obvod:'")
r("options: ['Connected to mains power', 'De-energized and isolated', 'Running at full load', 'Connected to a signal generator']",
  "options: ['Zapojený do siete', 'Bez napätia a izolovaný', 'V plnom zaťažení', 'Zapojený na generátor signálu']")
r("explanation: 'ALWAYS de-energize and isolate a circuit before measuring resistance. Measuring resistance on a live circuit can damage the multimeter and give completely wrong readings.'",
  "explanation: 'VŽDY odpoj a izoluj obvod pred meraním odporu. Meranie odporu na živom obvode môže poškodiť multimeter a dávať úplne nesprávne hodnoty.'")
r("question: 'To measure current with a standard multimeter, you connect the probes in parallel with the load.'",
  "question: 'Na meranie prúdu štandardným multimetrom zapojíš hroty paralelne k záťaži.'")
r("explanation: 'False. Current measurement requires series connection — you must break the circuit and insert the multimeter in series. Connecting in parallel would short-circuit the load and damage the meter.'",
  "explanation: 'Nepravda. Meranie prúdu vyžaduje sériové zapojenie — musíš prerušiť obvod a vložiť multimeter do série. Zapojenie paralelne by skratovalo záťaž a poškodilo meter.'")
r("question: 'A continuity test beeps when connected across a fuse. This means the fuse is:'",
  "question: 'Test kontinuity pípne, keď je pripojený na poistku. To znamená, že poistka je:'")
r("options: ['Blown', 'Good (intact)', 'Needing replacement', 'Overloaded']",
  "options: ['Prepálená', 'V poriadku (neporušená)', 'Potrebujúca výmenu', 'Preťažená']")
r("explanation: 'A continuity test beeps when resistance is very low (near 0Ω) — indicating a complete circuit. A good fuse is a short circuit (very low resistance), so it beeps. A blown fuse is open circuit — no beep.'",
  "explanation: 'Test kontinuity pípne, keď je odpor veľmi nízky (blízko 0 Ω) — čo indikuje kompletný obvod. Dobrá poistka je skrat (veľmi nízky odpor), takže pípne. Prepálená poistka je otvorený obvod — bez pípnutia.'")
r("question: 'You need to measure the voltage of a car battery. You connect red probe to + terminal. Where does the black probe go?'",
  "question: 'Treba zmerať napätie autobatérie. Červený hrot zapojíš na + svorku. Kam patrí čierny hrot?'")
r("options: ['Also to + terminal', 'To the − terminal', 'To the body of the car', 'To the fuse box']",
  "options: ['Tiež na + svorku', 'Na − svorku', 'Na karosériu auta', 'Na poistkovú skriňu']")
r("explanation: 'Black probe connects to the − (negative/COM) terminal. Red to +, Black to − gives a positive voltage reading. +12V means the + terminal is 12V higher potential than the − terminal.'",
  "explanation: 'Čierny hrot sa zapája na − (záporný/COM) terminál. Červený na +, čierny na − dáva kladné napäťové čítanie. +12 V znamená, že + terminál má o 12 V vyšší potenciál ako − terminál.'")

# ── ti-3 Professional Testing ─────────────────────────────────────────────────
r("question: 'What minimum insulation resistance reading would you expect from new electrical wiring?'",
  "question: 'Akú minimálnu hodnotu odporu izolácie by si očakával od nového elektrického vedenia?'")
r("options: ['> 100 kΩ', '> 1 MΩ', '> 100 MΩ', '> 100 Ω']",
  "options: ['> 100 kΩ', '> 1 MΩ', '> 100 MΩ', '> 100 Ω']")
r("explanation: 'New wiring should show insulation resistance > 100 MΩ when tested at 500V DC. IEC 60364-6 requires minimum 1 MΩ for final circuits at 0.5kV test voltage — but good new wiring should be much higher.'",
  "explanation: 'Nové vedenie by malo vykazovať odpor izolácie > 100 MΩ pri testovaní 500 V DC. IEC 60364-6 vyžaduje minimum 1 MΩ pre záverečné obvody pri testovacom napätí 0,5 kV — ale nové vedenie by malo byť oveľa vyššie.'")
r("question: 'When performing an insulation resistance test, all electronic equipment should be disconnected.'",
  "question: 'Pri vykonávaní testu odporu izolácie by malo byť všetko elektronické zariadenie odpojené.'")
r("explanation: 'True. Insulation testers apply 500–1000V DC. This high voltage can damage or destroy sensitive electronics (dimmers, sensors, variable speed drives, electronic switches). Disconnect all electronics first!'",
  "explanation: 'Pravda. Testery izolácie aplikujú 500–1000 V DC. Toto vysoké napätie môže poškodiť alebo zničiť citlivú elektroniku (stmievače, senzory, frekvenčné meniče, elektronické spínače). Najprv odpoj všetku elektroniku!'")
r("question: 'A standard 30mA RCD must trip within what maximum time when tested at rated fault current?'",
  "question: 'Štandardný 30 mA chránič musí vypnúť v maximálnom čase, keď je testovaný pri menovitom poruchovom prúde?'")
r("options: ['500 ms', '200 ms', '100 ms', '300 ms']",
  "options: ['500 ms', '200 ms', '100 ms', '300 ms']")
r("explanation: 'IEC 61008 requires that a 30mA RCD trips within 300ms at rated fault current (30mA), and within 40ms at 5×In (150mA). Modern quality RCDs typically trip in 20–30ms.'",
  "explanation: 'IEC 61008 vyžaduje, aby 30 mA chránič vypol do 300 ms pri menovitom poruchovom prúde (30 mA) a do 40 ms pri 5×In (150 mA). Moderné kvalitné chrániče typicky vypnú za 20–30 ms.'")
r("question: 'A clamp meter measures current using a ___ sensor that clamps around a single conductor.'",
  "question: 'Kliešťový ampérmeter meria prúd pomocou ___ snímača, ktorý sa zovrie okolo jedného vodiča.'")
r("answer: 'magnetic'", "answer: 'magnetického'")
r("hint: 'Related to the field created by current flow'",
  "hint: 'Súvisí s poľom vytvoreným tokom prúdu'")
r("explanation: 'Clamp meters use a current transformer (CT) sensor. The alternating current in the conductor creates a changing magnetic field. The CT core concentrates this field — inducing a small proportional current in the secondary winding.'",
  "explanation: 'Kliešťové ampérmetre používajú snímač s prúdovým transformátorom (CT). Striedavý prúd vo vodiči vytvára meniace sa magnetické pole. Jadro CT koncentruje toto pole — indukujúc malý úmerný prúd v sekundárnom vinutí.'")

# ── Explanation body translations (template literals) ────────────────────────
# Note: these are long template literals — translate key sentences
# Rather than trying to replace entire blocks, we'll do sentence-level

print(f"Applied {count} replacements")

with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
