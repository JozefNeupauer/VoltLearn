#!/usr/bin/env python3
"""
Fourth pass: translate remaining English explanations, hints, options, answers
"""

with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

orig_len = len(content)
count = 0

def r(old, new):
    global content, count
    if old in content:
        content = content.replace(old, new, 1)
        count += 1
    else:
        print(f"NOT FOUND: {old[:90]!r}")

# ── Explanations - Electricity Basics eb1-eb5 ─────────────────────────────────
r("explanation: 'Electric current is the flow of electrons — negatively charged particles that can move freely in conductors like copper.'",
  "explanation: 'Elektrický prúd je tok elektrónov — záporne nabitých častíc, ktoré sa môžu voľne pohybovať vo vodičoch, ako je meď.'")

r("explanation: 'Insulators (rubber, plastic, glass) have tightly-bound electrons that cannot move freely, so they block the flow of current.'",
  "explanation: 'Izolátory (guma, plast, sklo) majú tesne viazané elektróny, ktoré sa nemôžu voľne pohybovať, takže blokujú tok prúdu.'")

r("explanation: 'Copper has many free electrons and very low resistance, making it the most commonly used electrical conductor.'",
  "explanation: 'Meď má veľa voľných elektrónov a veľmi nízky odpor, čo z nej robí najčastejšie používaný elektrický vodič.'")

r("hint: 'Think about the opposite of a proton'",
  "hint: 'Pomysli na opak protónu'")

r("explanation: 'Electrons carry a negative charge, while protons in the nucleus carry a positive charge.'",
  "explanation: 'Elektróny nesú záporný náboj, zatiaľ čo protóny v jadre nesú kladný náboj.'")

r("explanation: 'Current is measured in Amperes (A), named after French physicist André-Marie Ampère.'",
  "explanation: 'Prúd sa meria v Ampéroch (A), pomenovaných po francúzskom fyzikovi André-Marie Ampèrovi.'")

# ── Explanations - Voltage ────────────────────────────────────────────────────
r("explanation: 'Voltage (electrical potential difference) is the pressure that drives electrons through a circuit — analogous to water pressure in a pipe.'",
  "explanation: 'Napätie (elektrický potenciálový rozdiel) je tlak, ktorý ženie elektróny obvodom — analogicky k tlaku vody v potrubí.'")

r("explanation: 'Voltage is measured in Volts (V), named after Alessandro Volta, who invented the first battery.'",
  "explanation: 'Napätie sa meria vo Voltoch (V), pomenovaných po Alessandrovi Voltovi, ktorý vynašiel prvú batériu.'")

r("explanation: 'European standard household voltage is 230V AC at 50 Hz. North American standard is 120V AC at 60 Hz.'",
  "explanation: 'Európsky štandardný domáci napájací obvod je 230 V AC pri 50 Hz. Severoamerický štandard je 120 V AC pri 60 Hz.'")

r("explanation: 'Voltage = water pressure. Just as higher pressure drives more water flow, higher voltage drives more current through a circuit.'",
  "explanation: 'Napätie = tlak vody. Rovnako ako vyšší tlak ženie viac vody, vyššie napätie ženie viac prúdu obvodom.'")

# ── Explanations - Resistance ─────────────────────────────────────────────────
r("explanation: 'Resistance is measured in Ohms (Ω), named after German physicist Georg Simon Ohm.'",
  "explanation: 'Odpor sa meria v Ohmoch (Ω), pomenovaných po nemeckom fyzikovi Georgovi Simonovi Ohmovi.'")

r("explanation: 'Resistance is proportional to length — the longer the wire, the more atoms electrons must collide with, increasing resistance.'",
  "explanation: 'Odpor je úmerný dĺžke — čím dlhší vodič, tým viac atómov musia elektróny prekonať, čo zvyšuje odpor.'")

r("explanation: 'Copper has very low resistivity (1.68 × 10⁻⁸ Ω·m), making it the most widely used conductor in electrical wiring.'",
  "explanation: 'Meď má veľmi nízku merný odpor (1,68 × 10⁻⁸ Ω·m), čo z nej robí najpoužívanejší vodič v elektrickej inštalácii.'")

# ── Explanations - Circuits ───────────────────────────────────────────────────
r("explanation: 'This is the key advantage of parallel circuits — each branch is independent. If one fails, current still flows through the others. This is how household wiring works.'",
  "explanation: 'Toto je hlavná výhoda paralelných obvodov — každá vetva je nezávislá. Ak jedna zlyhá, prúd stále tečie cez ostatné. Takto funguje domáca inštalácia.'")

r("explanation: 'Household wiring is parallel so each outlet and light is on its own branch at full 230V (or 120V), operating independently of all others.'",
  "explanation: 'Domáca inštalácia je paralelná, takže každá zásuvka a svetlo je na vlastnej vetve pri plnom napätí 230 V (alebo 120 V), pracujúc nezávisle od ostatných.'")

# ── Explanations - Ohm's Law ──────────────────────────────────────────────────
r("explanation: 'Doubling resistance HALVES the current (I = V/R). Current is inversely proportional to resistance.'",
  "explanation: 'Zdvojnásobenie odporu ZNIŽUJE prúd na polovicu (I = V/R). Prúd je nepriamo úmerný odporu.'")

r("explanation: 'Current I = V / R. In the triangle, covering I reveals V on top divided by R on the bottom.'",
  "explanation: 'Prúd I = V / R. V trojuholníku zakrytie I odhalí V navrchu vydelené R naspodku.'")

r("explanation: 'Correct! V = I × R. If I doubles and R is constant, V = 2I × R = twice the original voltage.'",
  "explanation: 'Správne! V = I × R. Ak sa I zdvojnásobí a R zostane konštantné, V = 2I × R = dvojnásobné pôvodné napätie.'")

# ── Hints ─────────────────────────────────────────────────────────────────────
r("hint: 'Use V = I × R'", "hint: 'Použi V = I × R'")
r("hint: 'I = V / R'", "hint: 'I = V / R'")
r("hint: 'R = V / I'", "hint: 'R = V / I'")

r("hint: 'Named after James ___, the Scottish inventor'",
  "hint: 'Pomenovaný po Jamesovi ___, škótskom vynálezcovi'")

r("answer: 'watts'", "answer: 'watty'")

r("hint: 'This cable has robust PVC outer sheath suitable for harsh environments'",
  "hint: 'Tento kábel má robustný PVC vonkajší plášť vhodný pre náročné prostredie'")

r("hint: 'Think of the color used for live since the 2004 harmonisation'",
  "hint: 'Pomysli na farbu fázového vodiča od harmonizácie v roku 2004'")

r("hint: 'This ensures loads receive adequate voltage'",
  "hint: 'Tým sa zabezpečí, že záťaže dostanú dostatočné napätie'")

r("hint: 'This is half the lethal threshold for most people'",
  "hint: 'Toto je polovica smrteľného prahu pre väčšinu ľudí'")

r("hint: 'Think of what the commutator is made of'",
  "hint: 'Pomysli na to, z čoho je vyrobený komutátor'")

r("hint: 'You reduce the field current to achieve this'",
  "hint: 'Znižuješ budiaci prúd, aby si to dosiahol'")

r("hint: 'What quantity does the heater element in a thermal relay respond to?'",
  "hint: 'Na akú veličinu reaguje ohrievací článok v tepelnom relé?'")

r("hint: 'Which vital organ sits between your two hands?'",
  "hint: 'Ktorý životne dôležitý orgán sa nachádza medzi tvojimi dvomi rukami?'")

r("hint: 'The energy that could reach the worker at a given distance'",
  "hint: 'Energia, ktorá môže dosiahnuť pracovníka v danej vzdialenosti'")

r("hint: 'A warning label applied when a lock cannot be used'",
  "hint: 'Výstražná nálepka pripevnená, keď nie je možné použiť zámok'")

r("hint: 'How far is the worker from the arc source?'",
  "hint: 'Ako ďaleko je pracovník od zdroja oblúka?'")

r("hint: '5 digit number starting with 6'",
  "hint: '5-ciferné číslo začínajúce 6'")

r("hint: 'What shape do you need for a screw terminal connection?'",
  "hint: 'Aký tvar potrebuješ pre skrutkové svorky?'")

r("hint: 'Both leads connect to the two sides of the component — which connection type?'",
  "hint: 'Oba hroty sa pripájajú k dvom stranám komponentu — aký typ zapojenia?'")

r("hint: 'A magnetic sensor named after physicist Edwin ___ Hall'",
  "hint: 'Magnetický senzor pomenovaný po fyzikovi Edwinovi ___ Hallovi'")

# ── wf2-q3 options and explanation ───────────────────────────────────────────
r("        options: ['Brown', 'Black', 'Grey', 'Blue'],\n        correctIndex: 1,\n        explanation: 'In European 3-phase: L1=Brown, L2=Black, L3=Grey. Note: in older UK wiring, phases were Red/Yellow/Blue.'",
  "        options: ['Hnedá', 'Čierna', 'Sivá', 'Modrá'],\n        correctIndex: 1,\n        explanation: 'V európskej trojfázovej sústave: L1=Hnedá, L2=Čierna, L3=Sivá. Poznámka: v staršej UK inštalácii boli fázy Červená/Žltá/Modrá.'")

# ── Power explanations ────────────────────────────────────────────────────────
r("explanation: 'Power is measured in Watts (W), named after James Watt, the Scottish inventor who improved the steam engine.'",
  "explanation: 'Výkon sa meria vo Wattoch (W), pomenovaných po Jamesovi Wattovi, škótskom vynálezcovi, ktorý zdokonalil parný stroj.'")

r("explanation: 'Energy = P × t = 3 kW × 0.5 h = 1.5 kWh'",
  "explanation: 'Energia = P × t = 3 kW × 0,5 h = 1,5 kWh'")

# ── dc3-q1 explanation ────────────────────────────────────────────────────────
r("        explanation: 'At standstill, back-EMF is zero, so armature current = V/Ra. Armature resistance is very small, causing current up to 10× the rated value which can burn windings.'",
  "        explanation: 'V kľude je protinapätie nulové, takže prúd kotvy = V/Ra. Odpor kotvy je veľmi malý, čo spôsobuje prúd až 10× menovitej hodnoty, ktorý môže spáliť vinutia.'")

# ── dc3-q2 explanation ────────────────────────────────────────────────────────
r("        explanation: 'Increasing field current increases flux, which DECREASES speed (speed is inversely proportional to flux in DC motors). Weakening the field increases speed.'",
  "        explanation: 'Zvýšenie budiaceho prúdu zvyšuje tok, čo ZNIŽUJE rýchlosť (rýchlosť je nepriamo úmerná toku v jednosmerných motoroch). Oslabenie poľa zvyšuje rýchlosť.'")

# ── Remaining English explanations not yet caught ────────────────────────────
# Check for wf-1 explanation body section items
r("explanation: 'NYY is a fixed wiring cable — rigid PVC insulated and sheathed, suitable for underground, outdoor, and indoor permanent installations. The answer is fixed (pevné).'",
  "explanation: 'NYY je kábel pre pevné inštalácie — tuhá PVC izolácia a plášť, vhodný pre podzemné, vonkajšie a vnútorné trvalé inštalácie.'")

r("explanation: 'IEC standard voltage drop limit is 3% for final circuits (some national standards allow 4%). Keeping voltage drop low ensures equipment operates at correct voltage.'",
  "explanation: 'Norma IEC stanovuje limit úbytku napätia 3 % pre záverečné obvody (niektoré národné normy dovoľujú 4 %). Udržanie nízkeho úbytku napätia zabezpečuje správnu prevádzku zariadenia.'")

r("explanation: 'The 30mA RCD sensitivity is below the threshold that typically causes cardiac arrest. It provides human protection where the body could complete a circuit to earth.'",
  "explanation: 'Citlivosť 30 mA chrániča je pod prahom, ktorý typicky spôsobuje zástavu srdca. Poskytuje ochranu pri dotyku, kde by telo mohlo dokončiť obvod do zeme.'")

# ── Remaining wf wiring explanations that were NOT found in script3 ───────────
r("explanation: 'I = V / R = 120V / 30Ω = 4 A'",
  "explanation: 'I = V / R = 120 V / 30 Ω = 4 A'")

r("explanation: 'I = V / R = 230V / 46Ω = 5 A'",
  "explanation: 'I = V / R = 230 V / 46 Ω = 5 A'")

# ── ol5-q4 explanation ────────────────────────────────────────────────────────
r("explanation: 'Heater: 2kW × 2h = 4 kWh. TV: 0.5kW × 2h = 1 kWh. Total = 5 kWh. The fill-in-blank answer is 5.'",
  "explanation: 'Ohrievač: 2 kW × 2 h = 4 kWh. TV: 0,5 kW × 2 h = 1 kWh. Spolu = 5 kWh. Odpoveď je 5.'")

# ── Check for remaining English options in wf,dc,sf,ti sections ──────────────
# wf-1 wire types
r("        options: ['Solid conductor', 'Stranded conductor', 'Bare copper', 'Aluminium'],",
  "        options: ['Plný vodič', 'Lanko (plety)', 'Holá meď', 'Hliník'],")

r("        options: ['50°C', '70°C', '90°C', '105°C'],",
  "        options: ['50 °C', '70 °C', '90 °C', '105 °C'],")

# wf-2 color codes  
r("        options: ['Brown', 'Blue', 'Green/Yellow', 'Grey'],",
  "        options: ['Hnedá', 'Modrá', 'Zeleno/Žltá', 'Sivá'],")

r("        answer: 'brown',", "        answer: 'hnedú',")

r("        options: ['Live wire', 'Neutral wire', 'Earth/Ground wire', 'Phase 3'],",
  "        options: ['Fázový vodič', 'Nulový vodič', 'Zemniaci vodič', 'Fáza 3'],")

# wf-3 sizing
r("        options: ['1.5 mm²', '2.5 mm²', '4 mm²', '6 mm²'],",
  "        options: ['1,5 mm²', '2,5 mm²', '4 mm²', '6 mm²'],")

r("        options: ['1.0 mm²', '1.5 mm²', '2.5 mm²', '4.0 mm²'],",
  "        options: ['1,0 mm²', '1,5 mm²', '2,5 mm²', '4,0 mm²'],")

r("        answer: 'fixed',", "        answer: 'pevné',")

# wf-4 circuit protection
r("        options: ['Fuse', 'MCB', 'RCD', 'Switch'],",
  "        options: ['Poistka', 'Istič (MCB)', 'Chránič (RCD)', 'Vypínač'],")

r("        options: ['3–5× In', '5–10× In', '10–20× In', '20–50× In'],",
  "        options: ['3–5× In', '5–10× In', '10–20× In', '20–50× In'],")

r("        answer: '30',", "        answer: '30',")

# dc-1 motors
r("        answer: 'Field',", "        answer: 'Pole',")

r("        options: ['Gravitational force', 'Centrifugal force', 'Electromagnetic (Lorentz) force', 'Friction force'],",
  "        options: ['Gravitačná sila', 'Dostredivá sila', 'Elektromagnetická (Lorentzova) sila', 'Trecia sila'],")

# dc-2 components
r("        options: ['Shunt (parallel) wound', 'Series wound', 'Separately excited', 'Permanent magnet'],",
  "        options: ['Paralelné (shunt) budenie', 'Sériové budenie', 'Samostatné budenie', 'Permanentný magnet'],")

r("        answer: 'copper',", "        answer: 'medenej',")

r("""        options: [
          'Transfer current between stationary and rotating parts',
          'Cool the armature',
          'Create the magnetic field',
          'Support the rotor shaft',
        ],""",
  """        options: [
          'Prenášať prúd medzi statickými a rotujúcimi časťami',
          'Chladiť kotvu',
          'Vytvárať magnetické pole',
          'Podopierať hriadeľ rotora',
        ],""")

# dc-3 speed control
r("        options: ['Adding series resistance', 'Mechanical gearbox', 'Pulse Width Modulation (PWM)', 'Changing supply frequency'],",
  "        options: ['Pridávanie sériového odporu', 'Mechanická prevodovka', 'Pulzná šírková modulácia (PWM)', 'Zmena frekvencie napájania'],")

r("        answer: 'weakening',", "        answer: 'poľa',")

r("""        options: [
          'Very low current flows',
          'Very high current flows because back-EMF = 0',
          'Motor starts slowly with no issues',
          'The fuse must be removed first',
        ],""",
  """        options: [
          'Tečie veľmi malý prúd',
          'Tečie veľmi veľký prúd, pretože protinapätie = 0',
          'Motor sa spúšťa pomaly bez problémov',
          'Najprv treba vybrať poistku',
        ],""")

# dc-4 protection
r("""        options: [
          'Motor slows down and stops safely',
          'Motor speed becomes dangerously high (runaway)',
          'Motor reverses direction',
          'Nothing happens',
        ],""",
  """        options: [
          'Motor spomaľuje a bezpečne sa zastaví',
          'Rýchlosť motora sa nebezpečne zvýši (pretočenie)',
          'Motor zmení smer otáčania',
          'Nič sa nestane',
        ],""")

r("        answer: 'current',", "        answer: 'prúd',")

r("""        options: [
          'Measure motor speed',
          'Monitor winding temperature and trip if too hot',
          'Reduce starting current',
          'Improve power factor',
        ],""",
  """        options: [
          'Meranie rýchlosti motora',
          'Monitorovanie teploty vinutia a výpadok pri prehriatí',
          'Zníženie záberového prúdu',
          'Zlepšenie účinníka',
        ],""")

# sf-1 hazards
r("        options: ['1 mA', '10 mA', '50–100 mA', '1 A'],",
  "        options: ['1 mA', '10 mA', '50–100 mA', '1 A'],")

r("        options: ['500°C', '1,000°C', '5,000°C', '20,000°C'],",
  "        options: ['500 °C', '1 000 °C', '5 000 °C', '20 000 °C'],")

r("        answer: 'heart',", "        answer: 'srdce',")

r("""        options: [
          'Dry conditions, wearing gloves',
          'Wet conditions, barefoot on a grounded floor',
          'Working alone in a dry room',
          'Using only one hand',
        ],""",
  """        options: [
          'Suché podmienky, rukavice',
          'Mokré podmienky, bosý na uzemnenom podlahe',
          'Práca osamote v suchej miestnosti',
          'Používanie len jednej ruky',
        ],""")

# sf-2 PPE
r("        options: ['Class 00', 'Class 0', 'Class 1', 'Class 2'],",
  "        options: ['Trieda 00', 'Trieda 0', 'Trieda 1', 'Trieda 2'],")

r("""        options: [
          'Run them under water to check for leaks',
          'Roll them up and check for cracks',
          'Inflate them with air and check for holes',
          'No inspection needed if they look fine',
        ],""",
  """        options: [
          'Drž ich pod vodou a skontroluj netesnosti',
          'Zviň ich a skontroluj praskliny',
          'Nafúkni ich vzduchom a skontroluj diery',
          'Žiadna kontrola nie je potrebná, ak vyzerajú v poriadku',
        ],""")

r("        answer: 'incident',", "        answer: 'dopadajúcich',")

# sf-3 LOTO
r("        options: ['None — just the supervisor\\'s lock', '1 — the group lock', '1 personal lock per worker', 'As many as the foreman decides'],",
  "        options: ['Žiadny — len zámok nadriadeného', '1 — skupinový zámok', '1 osobný zámok na pracovníka', 'Toľko, koľko rozhodne vedúci'],")

r("        options: ['Electrical energy', 'Hydraulic pressure', 'Ambient temperature', 'Stored spring energy'],",
  "        options: ['Elektrická energia', 'Hydraulický tlak', 'Okolitá teplota', 'Uložená pružinová energia'],")

r("""        options: [
          'Apply your personal lock',
          'Notify your supervisor',
          'Verify zero energy state with appropriate testing equipment',
          'Put on your PPE',
        ],""",
  """        options: [
          'Nasadiť osobný zámok',
          'Notifikovať nadriadeného',
          'Overiť stav nulovej energie vhodným testovacím zariadením',
          'Nasadiť OOPP',
        ],""")

r("        answer: 'Tagout',", "        answer: 'Označenie',")

# sf-4 arc flash
r("""        options: [
          'Wear the highest category PPE available',
          'De-energize the equipment before working — eliminate the hazard',
          'Work quickly to minimize exposure time',
          'Stand further back from the panel',
        ],""",
  """        options: [
          'Nosiť OOPP najvyššej dostupnej kategórie',
          'Odpoj napájanie pred prácou — odstráň nebezpečenstvo',
          'Pracuj rýchlo, aby si minimalizoval čas expozície',
          'Stoj ďalej od rozvádzača',
        ],""")

r("""        options: [
          'Panel color and installation date',
          'Incident energy or PPE category, flash boundary, and working voltage',
          'The name of the installer',
          'Maximum load current only',
        ],""",
  """        options: [
          'Farba rozvádzača a dátum inštalácie',
          'Dopadajúca energia alebo kategória OOPP, hranica oblúka a pracovné napätie',
          'Meno inštalatéra',
          'Len maximálny záťažový prúd',
        ],""")

r("        answer: 'distance',", "        answer: 'vzdialenosti',")

# sf-5 regulations
r("        options: ['IEC 60364', 'NEC (NFPA 70)', 'BS 7671 (18th Edition)', 'OSHA 1910.302'],",
  "        options: ['IEC 60364', 'NEC (NFPA 70)', 'BS 7671 (18. vydanie)', 'OSHA 1910.302'],")

r("""        options: [
          'Approval from the building owner',
          'An installation certificate and testing to verify compliance',
          'A 30-day waiting period',
          'Only a visual inspection',
        ],""",
  """        options: [
          'Schválenie od majiteľa budovy',
          'Certifikát inštalácie a testovanie na overenie súladu',
          '30-dňová čakacia lehota',
          'Iba vizuálna kontrola',
        ],""")

r("        answer: '60364',", "        answer: '60364',")

# ti-1 hand tools
r("        options: ['240V', '500V', '1,000V', '10,000V'],",
  "        options: ['240 V', '500 V', '1 000 V', '10 000 V'],")

r("        options: ['Cable stripper', 'Fish tape (draw wire)', 'Combination pliers', 'Cable ties'],",
  "        options: ['Odizolátory káblov', 'Ťahací drôt (fish tape)', 'Kombinované kliešte', 'Sťahovačky káblov'],")

r("        answer: 'loops',", "        answer: 'slučiek',")

r("        options: ['Wire stripper', 'Multimeter', 'Voltage tester / non-contact tester', 'Screwdriver'],",
  "        options: ['Odizolátory', 'Multimeter', 'Tester napätia / bezkontaktný tester', 'Skrutkovač'],")

# ti-2 multimeter
r("        options: ['Connected to mains power', 'De-energized and isolated', 'Running at full load', 'Connected to a signal generator'],",
  "        options: ['Zapojený do siete', 'Bez napätia a izolovaný', 'V plnom zaťažení', 'Zapojený na generátor signálu'],")

r("        options: ['Blown', 'Good (intact)', 'Needing replacement', 'Overloaded'],",
  "        options: ['Prepálená', 'V poriadku (neporušená)', 'Potrebujúca výmenu', 'Preťažená'],")

r("        options: ['Also to + terminal', 'To the − terminal', 'To the body of the car', 'To the fuse box'],",
  "        options: ['Tiež na + svorku', 'Na − svorku', 'Na karosériu auta', 'Na poistkovú skriňu'],")

# ti-3 testing
r("        options: ['> 100 kΩ', '> 1 MΩ', '> 100 MΩ', '> 100 Ω'],",
  "        options: ['> 100 kΩ', '> 1 MΩ', '> 100 MΩ', '> 100 Ω'],")

r("        options: ['500 ms', '200 ms', '100 ms', '300 ms'],",
  "        options: ['500 ms', '200 ms', '100 ms', '300 ms'],")

r("        answer: 'magnetic',", "        answer: 'magnetického',")

# ── dc2 copper answer ─────────────────────────────────────────────────────────
# already handled in replacements above

print(f"Applied {count} replacements")
print(f"File size: {len(content)} chars (was {orig_len})")

with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
