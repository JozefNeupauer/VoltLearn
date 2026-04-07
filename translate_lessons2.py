#!/usr/bin/env python3
"""
Second pass: translate remaining English strings in lessons.ts
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
        print(f"NOT FOUND: {old[:70]!r}")

# ── Remaining keyPoints (after first pass) ────────────────────────────────────
# ol-2 Calculating Voltage
r("text: 'V = I × R — multiply current by resistance'", "text: 'V = I × R — vynásob prúd odporom'")
r("text: 'Always include units: A × Ω = V'", "text: 'Vždy uvádzaj jednotky: A × Ω = V'")
r("text: '3A through 10Ω = 30V voltage drop'", "text: '3 A cez 10 Ω = pokles napätia 30 V'")
r("text: '20mA LED through 100Ω → 2V'", "text: '20 mA LED cez 100 Ω → 2 V'")

# ol-3 Calculating Current
r("text: 'I = V / R — divide voltage by resistance'", "text: 'I = V / R — vydeľ napätie odporom'")
r("text: '230V / 460Ω bulb → 0.5A current'", "text: '230 V / 460 Ω žiarovka → 0,5 A prúd'")
r("text: 'Use this to size cables and breakers'", "text: 'Použij na dimenzovanie káblov a ističov'")
r("text: '1 A = 1000 mA'", "text: '1 A = 1000 mA'")

# ol-4 Calculating Resistance
r("text: 'R = V / I — divide voltage by current'", "text: 'R = V / I — vydeľ napätie prúdom'")
r("text: 'Used for fault diagnosis and component sizing'", "text: 'Používa sa pri diagnostike porúch a dimenzovaní súčiastok'")
r("text: 'LED circuits: R = (Supply V - LED V) / Current'", "text: 'LED obvody: R = (napájací V − LED V) / prúd'")
r("text: 'Insulation testing measures MΩ values'", "text: 'Testovanie izolácie meria hodnoty v MΩ'")

# ol-5 Power
r("text: 'P = V × I — power in Watts'", "text: 'P = V × I — výkon vo Wattoch'")
r("text: 'Also: P = I²R and P = V²/R'", "text: 'Tiež: P = I²×R a P = V²/R'")
r("text: 'Energy (kWh) = Power (kW) × Time (h)'", "text: 'Energia (kWh) = Výkon (kW) × Čas (h)'")
r("text: 'More power = more heat in wires — check cable size!'", "text: 'Väčší výkon = väčšie teplo vo vodičoch — skontroluj prierez!'")

# wf-1 Wire Types
r("text: 'Solid wire: fixed wiring; Stranded: flexible applications'", "text: 'Plný vodič: pevná inštalácia; Lanko: flexibilné aplikácie'")
r("text: 'Copper: best choice for all standard wiring'", "text: 'Meď: najlepšia voľba pre štandardnú inštaláciu'")
r("text: 'NYM = standard house wiring cable type'", "text: 'NYM = štandardný typ kábla pre domácu inštaláciu'")
r("text: 'PVC rated to 70°C; XLPE/EPR to 90°C'", "text: 'PVC do 70 °C; XLPE/EPR do 90 °C'")

# wf-2 Wire Color Codes
r("text: 'Brown = Live/Line (Phase)'", "text: 'Hnedá = Fáza (L)'")
r("text: 'Blue = Neutral'", "text: 'Modrá = Nulový vodič (N)'")
r("text: 'Green/Yellow = Earth/Ground ONLY'", "text: 'Zeleno/Žltá = IBA Uzemnenie (PE)'")
r("text: 'Always test! Old wiring may differ'", "text: 'Vždy testuj! Stará inštalácia sa môže líšiť'")

# wf-3 Cable Sizing
r("text: '2.5mm² copper: 20A — standard socket circuits'", "text: '2,5 mm² meď: 20 A — štandardné zásuvkové okruhy'")
r("text: 'Bunched cables, hot areas: apply derating factors'", "text: 'Káblov zväzky, horúce miesta: aplikuj korekčné koeficienty'")
r("text: 'Max voltage drop: 3% for final circuits'", "text: 'Max. úbytok napätia: 3 % pre záverečné obvody'")
r("text: 'Size steps: calculate Ib → pick In → verify ampacity'", "text: 'Kroky dimenz.: vypočítaj Ib → vyber In → overif zaťažiteľnosť'")

# wf-4 Circuit Protection
r("text: 'Fuse: melts once — must replace after fault'", "text: 'Poistka: roztaví sa raz — po poruche treba vymeniť'")
r("text: 'MCB: reusable circuit breaker, types B/C/D'", "text: 'Istič (MCB): opakovane použiteľný, typy B/C/D'")
r("text: 'RCD 30mA: life-saving earth fault protection'", "text: 'Chránič (RCD) 30 mA: ochrana pred unikajúcim prúdom'")
r("text: 'MCB protects cable; RCD protects people'", "text: 'Istič chráni kábel; chránič chráni ľudí'")

# dc-1 How DC Motors Work
r("text: 'Motor works on Lorentz force: F = BIL'", "text: 'Motor pracuje na Lorentzovej sile: F = BIL'")
r("text: 'Commutator reverses current for continuous rotation'", "text: 'Komutátor mení smer prúdu pre plynulú rotáciu'")
r("text: 'Back-EMF limits current at full speed'", "text: 'Protinapätie (back-EMF) obmedzuje prúd pri plnej rýchlosti'")
r("text: 'Carbon brushes wear — inspect and replace regularly'", "text: 'Uhlíkové kefky sa opotrebúvajú — pravidelne kontroluj a vymeň'")

# dc-2 Motor Components
r("text: 'Laminated armature core reduces eddy current losses'", "text: 'Laminované jadro kotvy znižuje straty víriacimi prúdmi'")
r("text: 'Bearings need periodic lubrication checks'", "text: 'Ložiská potrebujú pravidelné kontroly mazania'")
r("text: 'Commutator should be smooth and copper-colored'", "text: 'Komutátor musí byť hladký a farby medi'")

# dc-3 Motor Starting
r("text: 'Direct-on-line start causes huge inrush current'", "text: 'Priamy záber (DOL) spôsobuje obrovský záberový prúd'")
r("text: 'Starters gradually reduce series resistance as speed rises'", "text: 'Rozbeháče postupne znižujú sériový odpor pri zvyšovaní rýchlosti'")
r("text: 'Speed control: armature voltage (below base) or field weakening (above base)'", "text: 'Regulácia: napätie kotvy (pod základnou rýchlosťou) alebo oslabenie poľa (nad základnou)'")
r("text: 'Modern DC drives use PWM for smooth control'", "text: 'Moderné jednosmerné pohony používajú PWM na plynulé riadenie'")

# dc-4 Motor Protection
r("text: 'Thermal overload relay protects against running overload'", "text: 'Tepelné relé preťaženia chráni pred trvalým preťažením'")
r("text: 'Fuse/MCB protects against short circuit'", "text: 'Poistka/istič chráni pred skratom'")
r("text: 'Field failure relay prevents dangerous motor runaway'", "text: 'Relé straty budiaceho poľa zabraňuje nebezpečnému pretočeniu motora'")
r("text: 'PTC thermistors monitor winding temperature directly'", "text: 'PTC termistory priamo monitorujú teplotu vinutia'")

# sf-1 Electrical Hazards
r("text: '50–100mA through heart can be fatal'", "text: '50–100 mA cez srdce môže byť smrteľné'")
r("text: 'Wet skin drastically reduces body resistance'", "text: 'Mokrá pokožka výrazne znižuje odpor tela'")
r("text: 'Arc flash: 20,000°C — most dangerous electrical hazard'", "text: 'Oblúkový výboj: 20 000 °C — najnebezpečnejšie elektrické riziko'")
r("text: 'Overloaded wiring can cause fires without immediate tripping'", "text: 'Preťaženie vedenia môže spôsobiť požiar bez okamžitého výpadku'")

# sf-2 PPE
r("text: 'Insulating gloves: check class for voltage level'", "text: 'Izolačné rukavice: skontroluj triedu pre príslušné napätie'")
r("text: 'Face shield required for arc flash work'", "text: 'Štít tváre je povinný pri práci s rizikom oblúkového výboja'")
r("text: 'Arc flash PPE rated in cal/cm² incident energy'", "text: 'OOPP pri oblúku je hodnotené v cal/cm² dopadajúcej energie'")
r("text: 'Check gloves for holes before every use (inflate test)'", "text: 'Pred každým použitím skontroluj rukavice na diery (nafukovací test)'")

# sf-3 LOTO
r("text: 'Each worker applies their OWN personal lock'", "text: 'Každý pracovník nasadí VLASTNÝ osobný zámok'")
r("text: '6 steps: Prepare → Notify → Shutdown → Isolate → Lock → Verify'", "text: '6 krokov: Priprav → Notifikuj → Vypni → Izoluj → Uzamkni → Overif'")
r("text: 'ALWAYS test with meter to verify zero voltage'", "text: 'VŽDY overif multimetrom nulové napätie'")
r("text: '4 protection boundaries from innermost to outermost'", "text: '4 ochranné hranice od vnútornej po vonkajšiu'")

# sf-4 Arc Flash
r("text: 'Best protection: ALWAYS de-energize first!'", "text: 'Najlepšia ochrana: VŽDY najprv odpoj napájanie!'")
r("text: 'Arc flash labels on panels — must be read before work'", "text: 'Nálepky oblúkového výboja na rozvádzačoch — prečítaj pred prácou'")
r("text: 'Incident energy in cal/cm² determines PPE category'", "text: 'Dopadajúca energia v cal/cm² určuje kategóriu OOPP'")

# sf-5 Regulations
r("text: 'Know your national standard: NEC (US), IEC 60364 (EU), BS 7671 (UK)'", "text: 'Poznej svoju národnú normu: IEC 60364 (EÚ), NEC (USA), BS 7671 (UK)'")
r("text: 'OSHA 1910.269: US law for electrical safety'", "text: 'OSHA 1910.269: americký zákon pre elektrickú bezpečnosť'")
r("text: 'Qualified electrician = trained, certified, competent'", "text: 'Kvalifikovaný elektrikár = vyškolený, certifikovaný, kompetentný'")
r("text: 'All new installations must be tested before energizing'", "text: 'Všetky nové inštalácie musia byť testované pred spustením'")

# ti-1 Hand Tools
r("text: 'Wire strippers: set depth correctly to avoid nicking'", "text: 'Odizolátory: správne nastav hĺbku, aby si neporušil vodič'")
r("text: 'Insulated screwdrivers: IEC 60900, rated 1000V'", "text: 'Izolované skrutkovače: IEC 60900, hodnotené 1000 V'")
r("text: 'Fish tape: pulls cables through conduit and walls'", "text: 'Ťahací drôt: ťahá káble cez chráničky a steny'")
r("text: 'Never use pliers as hammers or pry bars'", "text: 'Nikdy nepoužívaj kliešte ako kladivo alebo páčidlo'")

# ti-2 Multimeter
r("text: 'Red probe = + (Voltage, current); Black = -/COM/Ground'", "text: 'Červený hrot = + (napätie, prúd); Čierny = −/COM/GND'")
r("text: 'Measure voltage: set VΩ terminal; parallel to component'", "text: 'Meranie napätia: nastav svorku VΩ; paralelne k súčiastke'")
r("text: 'Measure current: SERIES connection, special A terminal'", "text: 'Meranie prúdu: SÉRIOVÉ zapojenie, špeciálna svorka A'")
r("text: 'Continuity: beeps if circuit is complete; circuit must be DEAD'", "text: 'Kontinuita: pípne ak je obvod kompletný; obvod musí byť BEZ NAPÄTIA'")

# ti-3 Professional Testing
r("text: 'Megger tests insulation at high voltage — new wiring: >100MΩ'", "text: 'Megóhmmeter testuje izoláciu pri vysokom napätí — nové vedenie: >100 MΩ'")
r("text: 'Clamp meter: safe current measurement without circuit break'", "text: 'Kliešťový ampérmeter: bezpečné meranie prúdu bez prerušenia obvodu'")
r("text: 'Earth loop tester: verify fault protection will work'", "text: 'Slučkový tester: overif, že ochrana pred poruchou bude fungovať'")
r("text: 'Phase rotation meter: verify 3-phase motor rotation'", "text: 'Merač sledu fáz: overif smer otáčania 3-fázového motora'")

# ── Options translation (quiz answer choices) ─────────────────────────────────
# eb1
r("options: ['Protons', 'Neutrons', 'Electrons', 'Photons']",
  "options: ['Protóny', 'Neutróny', 'Elektróny', 'Fotóny']")
r("options: ['Rubber', 'Plastic', 'Copper', 'Wood']",
  "options: ['Guma', 'Plast', 'Meď', 'Drevo']")

# eb2
r("options: ['Volts', 'Ohms', 'Watts', 'Amperes']",
  "options: ['Volty', 'Ohmy', 'Watty', 'Ampéry']")
r("options: ['1 mA', '10 mA', '100 mA', '1000 mA']",
  "options: ['1 mA', '10 mA', '100 mA', '1000 mA']")

# eb3
r("""options: [
          'The flow of electrons',
          'The opposition to current flow',
          'The electrical pressure difference',
          'The rate of energy consumption',
        ]""",
  """options: [
          'Tok elektrónov',
          'Odpor voči toku prúdu',
          'Rozdiel elektrického tlaku (potenciálu)',
          'Rýchlosť spotreby energie',
        ]""")
r("options: ['Water flow rate', 'Pipe diameter', 'Water pressure', 'Pipe material']",
  "options: ['Rýchlosť toku vody', 'Priemer potrubia', 'Tlak vody', 'Materiál potrubia']")

# eb4
r("options: ['Volts (V)', 'Amperes (A)', 'Ohms (Ω)', 'Watts (W)']",
  "options: ['Volty (V)', 'Ampéry (A)', 'Ohmy (Ω)', 'Watty (W)']")
r("options: ['Rubber', 'Glass', 'Copper', 'Plastic']",
  "options: ['Guma', 'Sklo', 'Meď', 'Plast']")
r("""options: [
          'Resistance decreases',
          'Resistance stays the same',
          'Resistance increases',
          'Resistance becomes zero',
        ]""",
  """options: [
          'Odpor klesá',
          'Odpor zostáva rovnaký',
          'Odpor rastie',
          'Odpor sa stáva nulou',
        ]""")

# eb5
r("""options: [
          'Less than the smallest resistor',
          'Equal to the largest resistor',
          'The sum of both resistors',
          'Half of the sum',
        ]""",
  """options: [
          'Menší ako najmenší rezistor',
          'Rovnaký ako najväčší rezistor',
          'Súčet oboch rezisorov',
          'Polovica súčtu',
        ]""")
r("options: ['Series only', 'Parallel', 'Series-parallel mixture', 'Neither']",
  "options: ['Iba sériový', 'Paralelný', 'Zmes sériového a paralelného', 'Ani jeden']")

# ol1
r("options: ['Impedance', 'Current', 'Insulation', 'Inductance']",
  "options: ['Impedancia', 'Prúd', 'Izolácia', 'Indukčnosť']")
r("options: ['I = V × R', 'I = R / V', 'I = V / R', 'I = V + R']",
  "options: ['I = V × R', 'I = R / V', 'I = V / R', 'I = V + R']")

# ── Quiz question texts ────────────────────────────────────────────────────────
# ol2
r("question: 'A resistor has 5A flowing through it and a resistance of 8Ω. What is the voltage across it?'",
  "question: 'Cez rezistor s odporom 8 Ω tečie prúd 5 A. Aké je napätie na ňom?'")
r("question: 'A heating element draws 10A and has a resistance of 24Ω. Calculate the supply voltage.'",
  "question: 'Vykurovací článok odberá 10 A a má odpor 24 Ω. Vypočítaj napájacie napätie.'")
r("question: 'A 2A current flows through a 12Ω resistor. The voltage is ___ V.'",
  "question: 'Cez rezistor 12 Ω tečie prúd 2 A. Napätie je ___ V.'")
r("question: 'If the current doubles and the resistance stays the same, the voltage also doubles.'",
  "question: 'Ak sa prúd zdvojnásobí a odpor zostane rovnaký, napätie sa tiež zdvojnásobí.'")

# ol3 - need to read the file to get exact questions
r("question: 'What current flows through a 120Ω resistor connected to 240V?'",
  "question: 'Aký prúd tečie cez rezistor 120 Ω zapojený na 240 V?'")
r("question: 'A lamp has a resistance of 460Ω and is connected to 230V mains. What current flows?'",
  "question: 'Žiarovka má odpor 460 Ω a je zapojená na 230 V. Aký prúd tečie?'")
r("question: 'A 100V supply pushes 4A through a circuit. The current is ___ A.'",
  "question: 'Napájanie 100 V tlačí prúd obvodom. Prúd je ___ A (odpor = 25 Ω).'")
r("question: 'Reducing the resistance in a circuit (at fixed voltage) will reduce the current.'",
  "question: 'Zníženie odporu v obvode (pri pevnom napätí) zníži prúd.'")

print(f"Applied {count} replacements")

with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
