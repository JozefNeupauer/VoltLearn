#!/usr/bin/env python3
"""
Eighth pass: translate remaining short quiz explanation strings (exact text).
"""

with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = [
    (
        "explanation: 'In AC, electrons reverse direction 50–60 times per second (50 Hz in Europe, 60 Hz in North America).',",
        "explanation: 'Pri striedavom prúde elektróny menia smer 50–60-krát za sekundu (50 Hz v Európe, 60 Hz v Severnej Amerike).',"
    ),
    (
        "explanation: '100 mA (0.1 A) through the heart can cause ventricular fibrillation and death. Even 10 mA can cause inability to release a grip.',",
        "explanation: '100 mA (0,1 A) prechádzajúce srdcom môže spôsobiť komorovú fibriláciu a smrť. Už 10 mA môže spôsobiť neschopnosť pustiť vodič.',"
    ),
    (
        "explanation: 'In most conductors, higher temperature causes atoms to vibrate more, increasing collisions with electrons and therefore increasing resistance.',",
        "explanation: 'U väčšiny vodičov vyššia teplota spôsobuje, že atómy více vibrujú, čím zvyšujú počet zrážok s elektrónmi a teda aj odpor.',"
    ),
    (
        "explanation: 'In a series circuit, there is only one path for current, so the same current flows through every component in the loop.',",
        "explanation: 'V sériovom obvode existuje iba jedna cesta pre prúd, takže rovnaký prúd tečie cez každý komponent v slučke.',"
    ),
    # Ohm formulae left as-is (already neutral/mathematical), but translate if needed
    (
        "explanation: 'V = I × R = 5 A × 8 Ω = 40 V',",
        "explanation: 'V = I × R = 5 A × 8 Ω = 40 V',"
    ),
    (
        "explanation: 'V = I × R = 2 A × 12 Ω = 24 V',",
        "explanation: 'V = I × R = 2 A × 12 Ω = 24 V',"
    ),
    (
        "explanation: 'I = V / R = 120 V / 30 Ω = 4 A',",
        "explanation: 'I = V / R = 120 V / 30 Ω = 4 A',"
    ),
    (
        "explanation: 'I = V / R = 9 V / 3 Ω = 3 A',",
        "explanation: 'I = V / R = 9 V / 3 Ω = 3 A',"
    ),
    (
        "explanation: 'I = V / R = 230 V / 46 Ω = 5 A',",
        "explanation: 'I = V / R = 230 V / 46 Ω = 5 A',"
    ),
    (
        "explanation: 'R = V / I = 24 V / 6 A = 4 Ω',",
        "explanation: 'R = V / I = 24 V / 6 A = 4 Ω',"
    ),
    (
        "explanation: 'R = V / I = 12 V / 4 A = 3 Ω',",
        "explanation: 'R = V / I = 12 V / 4 A = 3 Ω',"
    ),
    (
        "explanation: 'R = V / I = 9 V / 0,1 A = 90 Ω',",
        "explanation: 'R = V / I = 9 V / 0,1 A = 90 Ω',"
    ),
    # wf-1
    (
        "explanation: 'Stranded wire flexes without breaking, making it ideal for portable cords and flexible cables.',",
        "explanation: 'Lankový vodič sa ohýba bez lámani, čo ho robí ideálnym pre prenosné prívody a flexibilné káble.',"
    ),
    (
        "explanation: 'Aluminium has higher resistivity than copper. For the same resistance, aluminium wire must have a larger cross-section (about 1.5× the area of copper).',",
        "explanation: 'Hliník má vyšší merný odpor ako meď. Pre rovnaký odpor musí mať hliníkový vodič väčší prierez (asi 1,5× plochy medi).',"
    ),
    (
        "explanation: 'Standard PVC cable insulation is rated to 70°C continuous conductor temperature. Exceeding this degrades the insulation.',",
        "explanation: 'Štandardná PVC izolácia kábla je hodnotená na 70 °C teplotu vodiča pri trvalej prevádzke. Prekročenie tejto hodnoty degraduje izoláciu.',"
    ),
    (
        "explanation: 'NYY cable has a robust outer PVC sheath designed for outdoor and direct burial underground installations.',",
        "explanation: 'Kábel NYY má odolný vonkajší PVC plášť určený pre vonkajšie a priamo zabudované podzemné inštalácie.',"
    ),
    # wf-2
    (
        "explanation: 'Blue is the Neutral (N) conductor in IEC standard. Never confuse it with the Earth — the Earth is Green/Yellow.',",
        "explanation: 'Modrá je Nulový (N) vodič podľa normy IEC. Nikdy ho nezamieňaj s uzemnením — uzemnenie je Zeleno/Žltá.',"
    ),
    # wf-3
    (
        "explanation: '2.5mm² copper cable has ~20A ampacity, making it the standard for socket outlet radial and ring final circuits.',",
        "explanation: 'Medený kábel 2,5 mm² má zaťažiteľnosť ~20 A, čo ho robí štandardom pre zásuvkové radiálne a kruhové obvody.',"
    ),
    (
        "explanation: 'Bundled cables trap heat. Each cable\\'s safe capacity must be REDUCED (derated) when grouped with other cables.',",
        "explanation: 'Zviazané káble zachytávajú teplo. Bezpečná kapacita každého kábla musí byť ZNÍŽENÁ (korekcia) pri skupinovom uložení s inými káblami.',"
    ),
    (
        "explanation: '1.5mm² (14A capacity) is the standard minimum for lighting circuits — well above the typical 10–16A circuit breaker used for lighting.',",
        "explanation: '1,5 mm² (kapacita 14 A) je štandardné minimum pre osvetľovacie obvody — výrazne nad typickým 10–16 A ističom pre osvetlenie.',"
    ),
    (
        "explanation: 'IEC 60364-5-52 allows maximum 3% voltage drop in final circuits (from distribution board to outlet).',",
        "explanation: 'IEC 60364-5-52 povoľuje maximálny pokles napätia 3 % pri záverečných obvodoch (od rozvádzača po zásuvku).',"
    ),
    # wf-4
    (
        "explanation: 'RCD (Residual Current Device) detects leakage current to earth and disconnects within 40ms — fast enough to prevent a lethal shock.',",
        "explanation: 'RCD (Chránič) detekuje únikový prúd do zeme a odpojí do 40 ms — dostatočne rýchlo na predchádzanie smrteľnému úrazu.',"
    ),
    (
        "explanation: 'Type C MCBs trip magnetically at 5–10× rated current, accommodating motor inrush current on startup.',",
        "explanation: 'Ističe typu C vypínajú magneticky pri 5–10× menovitom prúde, čo umožňuje záberový prúd motora pri štarte.',"
    ),
    (
        "explanation: 'An MCB protects the cable from overcurrent/short circuit. For personal protection from shock, an RCD is required.',",
        "explanation: 'Istič (MCB) chráni kábel pred nadprúdom/skratom. Pre osobnú ochranu pred elektrickým úrazom je potrebný chránič (RCD).',"
    ),
    (
        "explanation: '30mA RCDs are the standard for personal protection in residential and commercial installations.',",
        "explanation: 'Chrániče 30 mA sú štandardom pre osobnú ochranu v domácich a komerčných inštaláciách.',"
    ),
    # dc-1
    (
        "explanation: 'The commutator reverses the current direction in the armature windings at the right moment to ensure the rotor always experiences a force in the same rotational direction.',",
        "explanation: 'Komutátor mení smer prúdu v kotvovom vinutí v správnom momente, aby rotor vždy zažíval silu v rovnakom smere rotácie.',"
    ),
    # dc-2
    (
        "explanation: 'Lamination breaks up the paths for eddy currents (induced circulating currents in the iron), significantly reducing heat losses in the core.',",
        "explanation: 'Laminovanie prerušuje dráhy víriacich prúdov (indukovaných cirkulačných prúdov v železnom jadre), čím výrazne znižuje tepelné straty v jadre.',"
    ),
    (
        "explanation: 'Brushes are made of soft carbon/graphite and gradually wear down with use. Regular inspection and replacement is part of DC motor maintenance.',",
        "explanation: 'Kefky sú vyrobené z mäkkého uhlíka/grafitu a postupne sa opotrebúvajú. Pravidelná kontrola a výmena je súčasťou údržby jednosmerných motorov.',"
    ),
    (
        "explanation: 'Series-wound DC motors have the field winding in series with the armature — at startup (high current), the strong field creates extremely high torque. Used in traction/crane motors.',",
        "explanation: 'Sériové jednosmerné motory majú budiace vinutie v sérii s kotvou — pri štarte (vysoký prúd) silné pole vytvára mimoriadne vysoký moment. Používa sa v trakčných/žeriavových motoroch.',"
    ),
    (
        "explanation: 'A healthy commutator has a smooth, copper-colored surface. Black discoloration can indicate brush problems; blue/green indicates overheating.',",
        "explanation: 'Zdravý komutátor má hladký, medeno sfarbený povrch. Čierne sfarbenie môže indikovať problémy s kefkami; modré/zelené sfarbenie indikuje prehriatie.',"
    ),
    # dc-3
    (
        "explanation: 'Modern DC drives use PWM or SCR/thyristor phase control to vary the average voltage to the armature, giving smooth, efficient speed control without wasted heat.',",
        "explanation: 'Moderné jednosmerné pohony používajú PWM alebo fázové riadenie SCR/tyristorov na zmenu priemerného napätia na kotve, čím poskytujú plynulé, efektívne riadenie rýchlosti bez zbytočného tepla.',"
    ),
    (
        "explanation: 'Field weakening (reducing field current) is used to achieve speeds above base speed while maintaining approximately constant power output.',",
        "explanation: 'Oslabenie poľa (zníženie budiaceho prúdu) sa používa na dosiahnutie rýchlostí nad základnou rýchlosťou pri zachovaní približne konštantného výkonu.',"
    ),
    # dc-4
    (
        """explanation: 'Without field flux, the back-EMF drops, causing huge armature current and the motor attempts to accelerate to dangerously high speeds — a "runaway" condition that can destroy the motor.',""",
        """explanation: 'Bez magnetického toku poľa klesá protinapätie, čo spôsobuje obrovský prúd kotvy a motor sa pokúša zrýchliť na nebezpečne vysoké otáčky — stav "pretočenia", ktorý môže motor zničiť.',"""
    ),
    (
        "explanation: 'Thermal overloads are designed for prolonged overloads only. Short circuit currents are thousands of amps — only HRC fuses or MCBs can interrupt these safely.',",
        "explanation: 'Tepelné relé sú navrhnuté iba pre dlhotrvajúce preťaženia. Skratové prúdy sú v tisíckach ampérov — len rýchlopoistky HRC alebo ističe ich môžu bezpečne prerušiť.',"
    ),
    (
        "explanation: 'PTC (Positive Temperature Coefficient) thermistors are embedded in windings and their resistance rises sharply at a set temperature, triggering a trip to prevent winding damage.',",
        "explanation: 'PTC (Pozitívny teplotný koeficient) termistory sú zabudované vo vinutiach; ich odpor prudko vzrastie pri nastavenej teplote, čím spustia vypnutie na ochranu vinutia.',"
    ),
    (
        "explanation: 'The thermal overload relay contains heater elements that carry the motor current. Excessive current heats the bimetal strip, causing it to trip and disconnect the motor.',",
        "explanation: 'Tepelné relé preťaženia obsahuje ohrievacie články, ktoré nesú prúd motora. Nadmerný prúd zahrieva bimetalovú pásku, ktorá sa ohne a odpojí motor.',"
    ),
    # sf-1
    (
        """explanation: '50–100 mA through the heart can cause ventricular fibrillation. At 10 mA, the "let-go" threshold is reached — muscles contract and victim cannot release the conductor.',""",
        """explanation: '50–100 mA prechádzajúce srdcom môže spôsobiť komorovú fibriláciu. Pri 10 mA sa dosiahne prah "nemôžeš pustiť" — svaly sa stiahnu a obeť nemôže uvoľniť vodič.',"""
    ),
    (
        "explanation: 'DRY skin has high resistance (~100,000 Ω), limiting current. WET skin reduces resistance to ~1,000 Ω, making shock FAR more dangerous. This is why wet/damp conditions significantly increase electric shock risk.',",
        "explanation: 'SUCHÁ pokožka má vysoký odpor (~100 000 Ω), čo obmedzuje prúd. MOKRÁ pokožka znižuje odpor na ~1 000 Ω, čo robí úraz OVEĽA nebezpečnejším. Preto vlhké podmienky výrazne zvyšujú riziko úrazu elektrickým prúdom.',"
    ),
    (
        """explanation: "An arc flash can reach temperatures of up to 20,000°C — approximately four times hotter than the sun's surface. At this temperature, metals vaporize instantly.",""",
        """explanation: 'Oblúkový výboj môže dosiahnuť teploty až 20 000 °C — približne štyrikrát horúcejšie ako povrch Slnka. Pri tejto teplote sa kovy okamžite odparujú.',"""
    ),
    (
        "explanation: 'Hand-to-hand current path passes through the chest and heart, which is the most dangerous because it can cause cardiac fibrillation even at relatively low currents.',",
        "explanation: 'Dráha prúdu ruka-ruka prechádza hrudníkom a srdcom, čo je najnebezpečnejšia cesta, pretože môže spôsobiť fibriláciu srdca aj pri relatívne nízkych prúdoch.',"
    ),
    # sf-2
    (
        "explanation: 'Class 0 gloves are rated for up to 1,000V AC. Class 00 is for up to 500V. Always choose the class appropriate for the working voltage.',",
        "explanation: 'Rukavice triedy 0 sú hodnotené pre napätie až 1 000 V AC. Trieda 00 je pre napätie až 500 V. Vždy vyber triedu vhodnú pre pracovné napätie.',"
    ),
    (
        "explanation: 'Regular cotton does not provide arc flash protection. Arc flash requires SPECIFIC arc-rated (AR) clothing rated above the incident energy level. Regular polyester/nylon melts and causes worse burns.',",
        "explanation: 'Bežná bavlna neposkytuje ochranu pred oblúkovým výbojom. Oblúkový výboj vyžaduje ŠPECIÁLNE oblečenie s hodnotením AR (ohnivzdorné) nad úrovňou dopadajúcej energie. Bežný polyester/nylon sa taví a spôsobuje horšie popáleniny.',"
    ),
    (
        "explanation: 'Roll the cuff and trap air inside the glove, then squeeze to pressurize. Any hole will allow air to escape and can be felt. Visual inspection is insufficient — even a pinhole can be lethal.',",
        "explanation: 'Zvij manžetu a zachyť vzduch vo vnútri rukavice, potom stlač na vytvorenie tlaku. Každá diera umožní únik vzduchu, ktorý pocítiš. Vizuálna kontrola nestačí — aj najmenší otvor môže byť smrteľný.',"
    ),
    (
        "explanation: 'Incident energy (cal/cm²) is the energy per unit area that could reach a worker during an arc flash event. PPE must be rated at or above this level.',",
        "explanation: 'Dopadajúca energia (cal/cm²) je energia na jednotku plochy, ktorá by mohla dosiahnuť pracovníka počas udalosti oblúkového výboja. OOPP musia byť hodnotené na tejto úrovni alebo vyššie.',"
    ),
    # sf-3
    (
        "explanation: 'Each individual worker applies THEIR OWN personal padlock. The key stays with them. This ensures no one can re-energize equipment while that person is working on it.',",
        "explanation: 'Každý jednotlivý pracovník nasadí VLASTNÝ osobný visací zámok. Kľúč zostáva pri ňom. Tým sa zabezpečí, že nikto nemôže opätovne nabiť zariadenie, kým na tom pracuje.',"
    ),
    (
        "explanation: 'Always verify zero energy with a properly functioning test instrument. Never assume — isolation devices can fail. The golden rule: Test-before-touch.',",
        "explanation: 'Vždy over nulový energetický stav správne fungujúcim testovacím prístrojom. Nikdy nepredpokladaj — izolačné zariadenia môžu zlyhať. Zlaté pravidlo: Testuj pred dotykom.',"
    ),
    (
        "explanation: 'Lockout/Tagout: A lockout device (padlock) physically prevents re-energization; a tagout label provides warning information. When lockout is not possible, tagout alone may be used with additional precautions.',",
        "explanation: 'Uzamknutie/Označenie: Uzamknuté zariadenie (visací zámok) fyzicky zabraňuje opätovnému nabitiu; výstražná nálepka poskytuje informácie. Keď uzamknutie nie je možné, samotný štítok môže byť použitý s dodatočnými opatreniami.',"
    ),
    # sf-4
    (
        "explanation: 'Elimination of the hazard is always the best control — de-energize the equipment. PPE is the last resort, not the first solution.',",
        "explanation: 'Eliminácia nebezpečenstva je vždy najlepšou kontrolou — odenergetizuj zariadenie. OOPP sú poslednou možnosťou, nie prvým riešením.',"
    ),
    (
        "explanation: '1.2 cal/cm² is the threshold for a SECOND-degree burn. The Flash Protection Boundary is the outer limit where PPE is required to prevent serious burns.',",
        "explanation: '1,2 cal/cm² je prah pre popálenie DRUHÉHO stupňa. Hranica ochrany pred výbojom je vonkajšia hranica, kde sú OOPP potrebné na zabránenie vážnym popáleninám.',"
    ),
    (
        "explanation: 'NFPA 70E requires arc flash labels to include: incident energy (cal/cm²), arc flash boundary, required PPE category/arc rating, and available fault current.',",
        "explanation: 'NFPA 70E vyžaduje, aby nálepky oblúkového výboja obsahovali: dopadajúcu energiu (cal/cm²), hranicu oblúka, požadovanú kategóriu OOPP/hodnotenie oblúka a dostupný skratový prúd.',"
    ),
    (
        "explanation: 'Incident energy decreases with distance (inversely proportional to distance squared). The working distance from the arc source is a key input in arc flash calculations.',",
        "explanation: 'Dopadajúca energia klesá so vzdialenosťou (nepriamo úmerne druhej mocnine vzdialenosti). Pracovná vzdialenosť od zdroja oblúka je kľúčovým vstupom vo výpočtoch oblúkového výboja.',"
    ),
    # sf-5
    (
        "explanation: 'BS 7671 (the IET Wiring Regulations, currently 18th Edition) is the UK national standard for electrical installations. It is based on IEC 60364.',",
        "explanation: 'BS 7671 (Nariadenia IET pre zapojenie, v súčasnosti 18. vydanie) je britský národný štandard pre elektrické inštalácie. Je založený na IEC 60364.',"
    ),
    (
        "explanation: 'All countries require electricians to be qualified, trained, and in most cases licensed or certified. Working outside your qualification level is illegal and dangerous.',",
        "explanation: 'Všetky krajiny vyžadujú, aby boli elektrikári kvalifikovaní, vyškolení a vo väčšine prípadov licencovaní alebo certifikovaní. Práca mimo rozsahu svojej kvalifikácie je nezákonná a nebezpečná.',"
    ),
    (
        "explanation: 'All new installations must be inspected and tested in accordance with IEC 60364 / BS 7671 / NEC requirements and a certification document issued before energizing.',",
        "explanation: 'Všetky nové inštalácie musia byť inšpekciou a testovaním overené podľa IEC 60364 / BS 7671 / NEC a certifikačný dokument vydaný pred nabitím obvodu.',"
    ),
    (
        "explanation: 'IEC 60364 (Electrical Installations of Buildings) is the international standard used as the basis for electrical installation regulations in most countries worldwide.',",
        "explanation: 'IEC 60364 (Elektrické inštalácie budov) je medzinárodná norma používaná ako základ pre predpisy elektrických inštalácií vo väčšine krajín sveta.',"
    ),
    # ti-1
    (
        "explanation: 'IEC 60900 specifies insulated tools rated for use up to 1000V AC. The insulation provides a last line of defense — not a reason to skip de-energizing.',",
        "explanation: 'IEC 60900 špecifikuje izolované náradie hodnotené pre použitie do 1 000 V AC. Izolácia poskytuje poslednú líniu obrany — nie je dôvodom vynechať odenergetizovanie.',"
    ),
    (
        "explanation: 'Proper wire strippers have adjustable depth stops or multiple gauge holes. Correct setting prevents nicking the conductor, which would weaken it and create a potential hot spot.',",
        "explanation: 'Správne odizolátory majú nastaviteľné zarážky hĺbky alebo viacero otvorov pre rôzne priemery. Správne nastavenie zabraňuje zárezu vodiča, ktorý by ho oslabil a vytvoril potenciálny teplý bod.',"
    ),
    (
        "explanation: 'Fish tape (or draw tape) is a flexible steel or fiberglass ribbon that is pushed through conduit or wall cavities, then attached to the cable and pulled back to route the wire.',",
        "explanation: 'Ťahací drôt (alebo ťahacia páska) je flexibilná oceľová alebo sklolaminátová páska, ktorá sa tlačí cez chráničky alebo dutiny stien a potom priloží ku káblu a ťahá naspäť.',"
    ),
    (
        "explanation: 'Long-nose pliers are ideal for forming wire loops (hooks) around screw terminals and for reaching into confined spaces where regular pliers cannot fit.',",
        "explanation: 'Ihlové kliešte sú ideálne na tvorenie slučiek (háčikov) vodičov okolo skrutkových svoriek a prístup do stiesnených priestorov, kam bežné kliešte nezájdu.',"
    ),
    # ti-2
    (
        """explanation: "Measuring resistance on an energized circuit will damage the meter and give wrong readings. The measured circuit MUST be dead and any capacitors must be discharged.",""",
        """explanation: 'Meranie odporu na nabitom obvode poškodí meter a poskytne nesprávne hodnoty. Meraný obvod MUSÍ byť bez napätia a všetky kondenzátory vybi.',"""
    ),
    (
        "explanation: 'Ammeters measure current by being connected in SERIES with the circuit. Connecting in parallel creates a near short circuit through the meter — destroying it and potentially causing injury.',",
        "explanation: 'Ampérmetre merajú prúd zapojením SÉRIOVO s obvodom. Paralelné zapojenie vytvára takmer skrat cez meter — zničí ho a môže spôsobiť zranenie.',"
    ),
    (
        "explanation: 'A beep on continuity means low resistance — current can flow — the fuse is GOOD. No beep (open circuit) means the fuse has blown.',",
        "explanation: 'Pípnutie pri kontinuite znamená nízky odpor — prúd môže tiecť — poistka je V PORIADKU. Žiadne pípnutie (prerušený obvod) znamená, že poistka je vypálená.',"
    ),
    (
        "explanation: 'Voltmeters must have very high internal resistance and connect in PARALLEL across the component. This allows them to measure the voltage drop without significantly affecting the circuit.',",
        "explanation: 'Voltmetre musia mať veľmi vysoký vnútorný odpor a zapájajú sa PARALELNE naprieč komponentom. Tým môžu merať úbytok napätia bez výrazného ovplyvnenia obvodu.',"
    ),
    # ti-3
    (
        "explanation: 'New wiring should have insulation resistance > 100 MΩ (typically hundreds of MΩ or even GΩ). Values below 1 MΩ indicate seriously degraded insulation.',",
        "explanation: 'Nová inštalácia by mala mať odpor izolácie > 100 MΩ (typicky stovky MΩ alebo až GΩ). Hodnoty pod 1 MΩ indikujú vážne degradovanú izoláciu.',"
    ),
    (
        "explanation: 'Insulation testers apply 250–1000V DC. This WILL damage sensitive electronic equipment (computers, PLCs, dimmers, VFDs). Always disconnect before testing.',",
        "explanation: 'Testery izolácie aplikujú 250–1 000 V DC. Toto POŠKODÍ citlivé elektronické zariadenia (počítače, PLC, stmievače, frekvenčné meniče). Vždy odpoj pred testovaním.',"
    ),
    (
        "explanation: 'A Type AC 30mA RCD must trip within 300ms (0.3 seconds) at rated residual current (30mA). General purpose RCDs trip much faster — often 20–40ms.',",
        "explanation: 'Chránič typu AC 30 mA musí vypnúť do 300 ms (0,3 sekundy) pri menovitom reziduálnom prúde (30 mA). Bežné chrániče vypínajú oveľa rýchlejšie — často 20–40 ms.',"
    ),
    (
        "explanation: 'Clamp meters use a Hall effect sensor (or Rogowski coil for AC) inside the jaw to detect the magnetic field produced by current flowing in the conductor, without any circuit break.',",
        "explanation: 'Kliešťové ampérmetre používajú Hallov senzor (alebo Rogowského cievku pre AC) vo vnútri čeľustí na detekciu magnetického poľa produkovaného tokom prúdu vo vodiči, bez prerušenia obvodu.',"
    ),
]

count = 0
not_found = []
for orig, repl in replacements:
    if orig in content:
        content = content.replace(orig, repl, 1)
        count += 1
    else:
        not_found.append(orig[:80])

print(f'Applied {count}/{len(replacements)} replacements')
if not_found:
    print(f'\nNOT FOUND ({len(not_found)}):')
    for t in not_found:
        print(f'  {repr(t)}')

with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
