#!/usr/bin/env python3
"""
Final comprehensive fix for lessons.ts:
1. Remove English tails from all 26 explanation blocks
2. Cascade-shift Slovak content for blocks 10-22 (wf-1 to sf-5) to correct lesson slots  
3. Write new Slovak content for wf-1 (block 10) which was never translated
4. Fix all English quiz option strings
"""

import re

def has_slovak(text):
    return bool(re.search(r'[áéíóúäöüňšžčľŕýÁÉÍÓÚÄÖÜŇŠŽČĽŔÝ]', text))

def trim_english_tail(body):
    """Remove English tail by scanning from end to find last Slovak diacritics line."""
    lines = body.split('\n')
    last_sk = -1
    for i in range(len(lines) - 1, -1, -1):
        if has_slovak(lines[i]):
            last_sk = i
            break
    if last_sk == -1:
        return body  # no Slovak found, keep unchanged
    kept = lines[:last_sk + 1]
    while kept and not kept[-1].strip():
        kept.pop()
    return '\n'.join(kept)

# ────────────────────────────────────────────────────────────────────────────
# New Slovak content for wf-1 (wire types) – only lesson missing proper Slovak
# ────────────────────────────────────────────────────────────────────────────
NEW_WF1 = """
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

⚠️ Zaťažiteľnosť závisí od spôsobu uloženia (voľný vzduch, v rúrke, zamurovanie), teploty okolia a počtu súbežných káblov. Vždy over podľa tabuliek IEC 60364-5-52!"""

# ────────────────────────────────────────────────────────────────────────────
# Quiz / option / short-explanation fixes  (old, new)
# ────────────────────────────────────────────────────────────────────────────
STR_FIXES = [
    # wf4-q1
    ("options: ['MCB', 'Fuse', 'RCD', 'Isolator switch']",
     "options: ['MCB', 'Poistka', 'RCD', 'Odpájač']"),
    # wf4-q2
    ("options: ['2–3× rated current', '3–5× rated current', '5–10× rated current', '10–20× rated current']",
     "options: ['2–3× menovitý prúd', '3–5× menovitý prúd', '5–10× menovitý prúd', '10–20× menovitý prúd']"),
    # dc1-q1 options
    ("'To insulate the rotor'", "'Izolovať rotor'"),
    ("'To reverse current direction in the rotor for continuous rotation'",
     "'Meniť smer prúdu v rotore pre nepretržitú rotáciu'"),
    ("'To measure the motor speed'", "'Merať rýchlosť motora'"),
    ("'To connect the motor to the power supply'", "'Pripojiť motor k napájaciemu zdroju'"),
    # dc1 keyPoints
    ("\"Fleming's Left-Hand Rule predicts force direction\"",
     "'Flemingovo pravidlo ľavej ruky predpovedá smer sily'"),
    # dc2-q1 options
    ("'To make it lighter'", "'Odľahčiť ho'"),
    ("'To reduce eddy current losses'", "'Znížiť straty víriacimi prúdmi'"),
    ("'To improve heat dissipation'", "'Zlepšiť odvod tepla'"),
    ("'To increase the magnetic field'", "'Zvýšiť magnetické pole'"),
    # dc2-q3 options
    ("'Permanent magnet'", "'Permanentný magnet'"),
    ("'Shunt winding'", "'Shuntové (paralelné) vinutie'"),
    ("'Series winding'", "'Sériové vinutie'"),
    ("'Compound winding'", "'Kombinované vinutie'"),
    # dc3-q3 options
    ("'Variable series resistors'", "'Premenlivé sériové odpory'"),
    ("'Gear boxes'", "'Prevodovky'"),
    ("'PWM (Pulse Width Modulation)'", "'PWM (Pulzná šírková modulácia)'"),
    ("'Changing the motor windings'", "'Zmena vinutia motora'"),
    # dc4-q1 options
    ("'It stops immediately'", "'Okamžite sa zastaví'"),
    ("'It runs at slightly lower speed'", "'Beží s mierne nižšou rýchlosťou'"),
    ("'It overspeeds dangerously (runaway)'", "'Nebezpečne sa pretočí (samovoľné zrýchlenie)'"),
    ("'It draws less current'", "'Odoberá menej prúdu'"),
    # dc4-q3 options
    ("'Measure current consumption'", "'Merať spotrebu prúdu'"),
    ("'Monitor winding temperature'", "'Monitorovať teplotu vinutia'"),
    ("'Control motor speed'", "'Riadiť rýchlosť motora'"),
    ("'Protect against field loss'", "'Chrániť pred stratou budiaceho poľa'"),
    # safety - rubber glove inspection
    ("'Look for discoloration'", "'Hľadaj zmeny farby'"),
    ("'Inflate with air and check for leaks'", "'Nafúkni vzduchom a skontroluj úniky'"),
    ("'Test with a multimeter'", "'Otestuj multimetrom'"),
    ("'Submerge in water'", "'Ponor do vody'"),
    # LOTO - personal locks
    ("'Zero — the supervisor applies one for the team'",
     "'Žiadny — nadriadený aplikuje zámok za celý tím'"),
    ("'One per isolation point'", "'Jeden na každé izolačné miesto'"),
    ("'One — their own personal lock'", "'Jeden — vlastný osobný zámok'"),
    ("'As many as there are workers on the team'",
     "'Toľko, koľko je pracovníkov v tíme'"),
    # LOTO - last step
    ("'Check the work permit'", "'Skontroluj pracovné povolenie'"),
    ("'Put on PPE'", "'Nasaď OOPP'"),
    ("'Test with a meter to verify zero energy'",
     "'Testuj meradlom na overenie nulovej energie'"),
    ("'Inform the supervisor'", "'Informuj nadriadeného'"),
    # Arc flash - best protection
    ("'Wear the highest arc rating PPE available'",
     "'Nosi OOPP s najvyšším hodnotením pre oblúkový výboj'"),
    ("'Work very quickly near the equipment'",
     "'Pracuj veľmi rýchlo v blízkosti zariadenia'"),
    ("'Use longer insulated tools'", "'Použi dlhšie izolované náradie'"),
    # Arc flash label contents
    ("'Only the voltage level'", "'Iba hladinu napätia'"),
    ("'Incident energy, arc flash boundary, and required PPE'",
     "'Dopadajúca energia, hranica oblúkového výboja a požadované OOPP'"),
    ("'The name of the installer'", "'Meno inštalatéra'"),
    ("'The date of last maintenance'", "'Dátum poslednej údržby'"),
    # Commissioning / inspection
    ("'Only a visual inspection'", "'Iba vizuálna prehliadka'"),
    ("'Inspection and testing per relevant standard'",
     "'Prehliadka a skúšanie podľa príslušnej normy'"),
    ("'Approval from the electrical equipment supplier'",
     "'Schválenie od dodávateľa elektrického zariadenia'"),
    # ol1-q1 explanation (English single-line)
    ("explanation: \"I stands for current (Amperes). It comes from the French word 'intensité de courant' — intensity of current.\"",
     "explanation: \"I je symbol pre prúd (Ampéry). Pochádza z francúzskeho výrazu 'intensité de courant' — intenzita prúdu.\""),
]

# ────────────────────────────────────────────────────────────────────────────
# Main
# ────────────────────────────────────────────────────────────────────────────

with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# ── Step 1: Find all 26 explanation blocks ──────────────────────────────────
pattern = r'(    explanation: `)(.*?)(`,$)'
matches = list(re.finditer(pattern, content, re.DOTALL | re.MULTILINE))
print(f"Found {len(matches)} explanation blocks")

# ── Step 2: Trim English tail from each block ───────────────────────────────
trimmed = []
for i, m in enumerate(matches):
    original = m.group(2)
    cleaned = trim_english_tail(original)
    removed = original.count('\n') - cleaned.count('\n')
    if removed > 0:
        print(f"  Block {i:2d}: removed {removed} English lines")
    trimmed.append(cleaned)

# ── Step 3: Cascade-shift blocks 10-22 (wf-1 to sf-5) ─────────────────────
# After trimming, block N contains the CORRECT Slovak for block N+1.
# So: final[N+1] = trimmed[N]  for N in 10..21
# And final[10] = NEW_WF1 (wf-1 which had no correct Slovak anywhere)
final = list(trimmed)  # copy

# Save trimmed bodies 10-21 before overwriting
saved = [trimmed[n] for n in range(10, 22)]  # saved[0] = trimmed[10], etc.

for idx, n in enumerate(range(11, 23)):  # blocks 11..22 get cascade
    final[n] = saved[idx]               # block n gets saved[idx] = trimmed[n-1]
    print(f"  Block {n:2d} gets correct Slovak (was at block {n-1})")

final[10] = NEW_WF1
print(f"  Block 10: set to new wf-1 Slovak (wire types)")

# Blocks 23-25 (ti-1 to ti-3) already correct, untouched.

# ── Step 4: Apply block changes to the file ─────────────────────────────────
result = content
# Process in REVERSE order so that positions don't shift
for i in range(len(matches) - 1, -1, -1):
    m = matches[i]
    new_block = m.group(1) + final[i] + m.group(3)
    result = result[:m.start()] + new_block + result[m.end():]

# ── Step 5: Fix English quiz options and short explanations ─────────────────
fix_count = 0
for old, new in STR_FIXES:
    if old in result:
        result = result.replace(old, new)
        fix_count += 1
        print(f"  Fixed: {old[:60]}...")
    else:
        print(f"  NOT FOUND: {old[:60]}...")

print(f"\nQuiz/option fixes applied: {fix_count}/{len(STR_FIXES)}")

# ── Step 6: Write output ─────────────────────────────────────────────────────
with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(result)

print("\nDone! Now run: npm run build")
