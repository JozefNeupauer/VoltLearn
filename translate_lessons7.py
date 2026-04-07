#!/usr/bin/env python3
"""
Seventh pass: translate all remaining short quiz explanation strings.
"""

with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

orig_len = len(content)

replacements = [
    # eb-2 quiz explanations
    (
        "explanation: 'In AC, electrons reverse direction 50–60 times per second (50 Hz in Europe, 60 Hz in North America). DC flows in one constant direction.',",
        "explanation: 'V striedavom prúde (AC) elektróny menia smer 50–60-krát za sekundu (50 Hz v Európe, 60 Hz v Severnej Amerike). Jednosmerný prúd (DC) tečie jedným stálym smerom.',"
    ),
    (
        "explanation: '100 mA (0.1 A) through the heart can cause ventricular fibrillation and death. Even 10 mA can cause painful muscle contraction (cannot let go).',",
        "explanation: '100 mA (0,1 A) prechádzajúce srdcom môže spôsobiť komorovú fibriláciu a smrť. Už 10 mA môže spôsobiť bolestivú svalovú kŕč (nemôžeš pustiť).',"
    ),
    # eb-4 quiz explanations
    (
        "explanation: 'In most conductors, higher temperature causes atoms to vibrate more, increasing collisions with electrons and raising resistance.',",
        "explanation: 'U väčšiny vodičov vyššia teplota spôsobuje, že atómy viac vibrujú, čím zvyšujú počet zrážok s elektrónmi a zvyšujú odpor.',"
    ),
    # eb-5 quiz explanations
    (
        "explanation: 'In series, resistances add directly: R_total = R₁ + R₂. For example, 10Ω + 20Ω = 30Ω total.',",
        "explanation: 'V sériovom zapojení sa odpory sčítavajú priamo: R_celk = R₁ + R₂. Napríklad 10 Ω + 20 Ω = 30 Ω celkovo.',"
    ),
    (
        "explanation: 'In a series circuit, there is only one path for current, so the same current flows through all components. If one fails, current stops everywhere.',",
        "explanation: 'V sériovom obvode existuje iba jedna cesta pre prúd, takže rovnaký prúd tečie cez všetky komponenty. Ak jeden zlyhá, prúd sa zastaví všade.',"
    ),
    # ol-1 quiz explanations
    (
        "explanation: \"Ohm's Law: V = I × R. Voltage equals current multiplied by resistance.\",",
        "explanation: 'Ohmov zákon: V = I × R. Napätie sa rovná prúdu vynásobenému odporom.',"
    ),
    # ol-2 quiz explanations (V = I × R calculations)
    (
        "explanation: 'V = I × R = 5A × 8Ω = 40 V',",
        "explanation: 'V = I × R = 5 A × 8 Ω = 40 V',"
    ),
    (
        "explanation: 'V = I × R = 10A × 24Ω = 240 V — a typical European household voltage.',",
        "explanation: 'V = I × R = 10 A × 24 Ω = 240 V — typické európske domáce napätie.',"
    ),
    (
        "explanation: 'V = I × R = 2A × 12Ω = 24 V',",
        "explanation: 'V = I × R = 2 A × 12 Ω = 24 V',"
    ),
    # ol-3 quiz explanations (I = V / R calculations)
    (
        "explanation: 'I = V / R = 120 V / 30 Ω = 4 A',",
        "explanation: 'I = V / R = 120 V / 30 Ω = 4 A',"
    ),
    (
        "explanation: 'I = V / R = 9V / 3Ω = 3 A',",
        "explanation: 'I = V / R = 9 V / 3 Ω = 3 A',"
    ),
    (
        "explanation: 'I = V / R = 230 V / 46 Ω = 5 A',",
        "explanation: 'I = V / R = 230 V / 46 Ω = 5 A',"
    ),
    # ol-4 quiz explanations (R = V / I calculations)
    (
        "explanation: 'R = V / I = 24V / 6A = 4 Ω',",
        "explanation: 'R = V / I = 24 V / 6 A = 4 Ω',"
    ),
    (
        "explanation: 'R = V / I = 12V / 4A = 3 Ω',",
        "explanation: 'R = V / I = 12 V / 4 A = 3 Ω',"
    ),
    (
        "explanation: 'R = V / I = 9V / 0.1A = 90 Ω',",
        "explanation: 'R = V / I = 9 V / 0,1 A = 90 Ω',"
    ),
    # ol-5 quiz explanations
    (
        "explanation: 'P = V × I = 230V × 10A = 2300 W = 2.3 kW — typical power for a washing machine.',",
        "explanation: 'P = V × I = 230 V × 10 A = 2300 W = 2,3 kW — typický výkon práčky.',"
    ),
    # wf-1 quiz explanations
    (
        "explanation: 'Stranded wire flexes without breaking, making it ideal for portable cords and flexible connections where movement occurs.',",
        "explanation: 'Lankový vodič sa ohýba bez lámani, čo ho robí ideálnym pre prenosné prívody a flexibilné prípojky tam, kde dochádza k pohybu.',"
    ),
    (
        "explanation: 'Aluminium has higher resistivity than copper. For the same resistance, aluminium wire must be about 1.6× larger in cross-section.',",
        "explanation: 'Hliník má vyšší merný odpor ako meď. Pre rovnaký odpor musí byť priemer hliníkového vodiča asi 1,6× väčší.',"
    ),
    (
        "explanation: 'Standard PVC cable insulation is rated to 70°C continuous conductor temperature. Exceeding this degrades insulation and shortens cable life.',",
        "explanation: 'Štandardná PVC izolácia kábla je hodnotená na 70 °C teplotu vodiča pri trvalej prevádzke. Prekročenie tejto hodnoty degraduje izoláciu a skracuje životnosť kábla.',"
    ),
    (
        "explanation: 'NYY cable has a robust outer PVC sheath designed for outdoor and direct burial underground applications.',",
        "explanation: 'Kábel NYY má odolný vonkajší PVC plášť určený pre vonkajšie použitie a priame uloženie pod zemou.',"
    ),
    # wf-2 quiz explanations
    (
        "explanation: 'Blue is the Neutral (N) conductor in IEC standard. Never confuse it with the Earth — they are NOT the same! Earth (PE) is always Green/Yellow.',",
        "explanation: 'Modrá je Nulový (N) vodič podľa normy IEC. Nikdy ho nezamieňaj s uzemnením — NIE SÚ to isté! Uzemnenie (PE) je vždy Zeleno/Žltá.',"
    ),
    (
        "explanation: 'Brown is the IEC/European standard color for the Line 1 (live) conductor since harmonisation in 2004.',",
        "explanation: 'Hnedá je štandardná farba IEC/európskej normy pre fázový vodič L1 (živý) od harmonizácie v roku 2004.',"
    ),
    # wf-3 quiz explanations
    (
        "explanation: '2.5mm² copper cable has ~20A ampacity, making it the standard for socket outlet radial circuits in residential wiring.',",
        "explanation: 'Medeným kábel 2,5 mm² má zaťažiteľnosť ~20 A, čo ho robí štandardom pre zásuvkové obvody v domácej inštalácii.',"
    ),
    (
        "explanation: 'Bundled cables trap heat. Each cable\\'s safe capacity must be REDUCED (derated) when grouped. The exact factor depends on the number of cables.',",
        "explanation: 'Zviazané káble zachytávajú teplo. Bezpečná kapacita každého kábla musí byť ZNÍŽENÁ (korekcia) pri skupinovom uložení. Presný faktor závisí od počtu káblov.',"
    ),
    (
        "explanation: '1.5mm² (14A capacity) is the standard minimum for lighting circuits — well above the typical load, providing safety margin.',",
        "explanation: '1,5 mm² (kapacita 14 A) je štandardné minimum pre osvetľovacie obvody — výrazne nad typickým zaťažením, poskytuje bezpečnostnú rezervu.',"
    ),
    (
        "explanation: 'IEC 60364-5-52 allows maximum 3% voltage drop in final circuits (from distribution board to socket). Longer or thinner cables increase voltage drop.',",
        "explanation: 'IEC 60364-5-52 povoľuje maximálny pokles napätia 3 % pri záverečných obvodoch (od rozvádzača po zásuvku). Dlhšie alebo tenšie káble zvyšujú úbytok napätia.',"
    ),
    # wf-4 quiz explanations
    (
        "explanation: 'RCD (Residual Current Device) detects leakage current to earth and disconnects within 30ms to prevent electrocution. MCBs only protect against overload/short circuit.',",
        "explanation: 'RCD (Chránič) detekuje únikový prúd do zeme a odpojí do 30 ms, aby zabránil elektrickému úrazu. Ističe (MCB) chránia iba pred preťažením/skratom.',"
    ),
    (
        "explanation: 'Type C MCBs trip magnetically at 5–10× rated current, accommodating motor inrush current without nuisance tripping.',",
        "explanation: 'Ističe typu C vypínajú magneticky pri 5–10× menovitom prúde, čo umožňuje záberový prúd motora bez nežiaduceho výpadku.',"
    ),
    (
        "explanation: 'An MCB protects the cable from overcurrent/short circuit. For personal protection from electric shock, an RCD (30mA) is also needed.',",
        "explanation: 'Istič (MCB) chráni kábel pred nadprúdom/skratom. Pre osobnú ochranu pred elektrickým úrazom je potrebný aj chránič (RCD 30 mA).',"
    ),
    (
        "explanation: '30mA RCDs are the standard for personal protection in residential and commercial installations. Higher currents (100mA, 300mA) are used only for fire protection.',",
        "explanation: 'Chrániče 30 mA sú štandardom pre osobnú ochranu v domácich a komerčných inštaláciách. Vyššie prúdy (100 mA, 300 mA) sa používajú iba na ochranu pred požiarom.',"
    ),
    # dc-1 quiz explanations
    (
        "explanation: 'The commutator reverses the current direction in the armature windings at the right moment to ensure continuous rotation in the same direction.',",
        "explanation: 'Komutátor mení smer prúdu v kotvovom vinutí v správnom momente, aby zabezpečil nepretržitú rotáciu rovnakým smerom.',"
    ),
    # dc-2 quiz explanations
    (
        "explanation: 'Lamination breaks up the paths for eddy currents (induced circulating currents in the iron core that waste energy as heat). Thinner laminations = lower losses.',",
        "explanation: 'Laminovanie prerušuje dráhy víriacich prúdov (indukovaných cirkulačných prúdov v železnom jadre, ktoré mrhajú energiou ako teplo). Tenšie lamely = menšie straty.',"
    ),
    (
        "explanation: 'Brushes are made of soft carbon/graphite and gradually wear down with use. Regular inspection and replacement prevents commutator damage.',",
        "explanation: 'Kefky sú vyrobené z mäkkého uhlíka/grafitu a postupne sa opotrebúvajú. Pravidelná kontrola a výmena zabraňuje poškodeniu komutátora.',"
    ),
    (
        "explanation: 'Series-wound DC motors have the field winding in series with the armature — at startup they produce very high torque, but speed is hard to control under light load.',",
        "explanation: 'Sériové jednosmerné motory majú budiace vinutie v sérii s kotvou — pri štarte produkujú veľmi vysoký moment, ale rýchlosť je ťažko kontrolovateľná pri malom zaťažení.',"
    ),
    (
        "explanation: 'A healthy commutator has a smooth, copper-colored surface. Black discoloration can indicate burning, poor brush contact, or incorrect brush grade.',",
        "explanation: 'Zdravý komutátor má hladký, medeno sfarbený povrch. Čierne sfarbenie môže indikovať pálenie, zlý kontakt kefiek alebo nesprávny druh kefiek.',"
    ),
    # dc-3 quiz explanations
    (
        "explanation: 'Modern DC drives use PWM or SCR/thyristor phase control to vary the average voltage to the motor armature, achieving smooth speed control from 0 to full speed.',",
        "explanation: 'Moderné jednosmerné pohony používajú PWM alebo fázové riadenie SCR/tyristorov na zmenu priemerného napätia na kotve motora, čím dosahujú plynulé riadenie rýchlosti od 0 po plnú rýchlosť.',"
    ),
    (
        "explanation: 'Field weakening (reducing field current) is used to achieve speeds above base speed while keeping armature voltage constant. Used in machine tools and traction drives.',",
        "explanation: 'Oslabenie poľa (zníženie budiaceho prúdu) sa používa na dosiahnutie rýchlostí nad základnou rýchlosťou pri konštantnom napätí kotvy. Používa sa v obrábacích strojoch a trakčných pohonoch.',"
    ),
    # dc-4 quiz explanations
    (
        "explanation: 'Without field flux, the back-EMF drops, causing huge armature current and the motor attempts to reach infinite speed — this is called a runaway condition and is extremely dangerous.',",
        "explanation: 'Bez magnetického toku poľa klesá protinapätie, čo spôsobuje obrovský prúd kotvy a motor sa pokúša dosiahnuť nekonečnú rýchlosť — toto sa nazýva pretočenie a je mimoriadne nebezpečné.',"
    ),
    (
        "explanation: 'Thermal overloads are designed for prolonged overloads only. Short circuit currents are so high they need fast-acting fuses or MCBs for proper protection.',",
        "explanation: 'Tepelné relé sú navrhnuté iba pre dlhotrvajúce preťaženia. Skratové prúdy sú také vysoké, že potrebujú rýchlopoistky alebo ističe pre správnu ochranu.',"
    ),
    (
        "explanation: 'PTC (Positive Temperature Coefficient) thermistors are embedded in windings and their resistance rises sharply above the threshold temperature, triggering a trip relay.',",
        "explanation: 'PTC (Pozitívny teplotný koeficient) termistory sú zabudované vo vinutiach a ich odpor prudko vzrastie nad prahovou teplotou, čím spustia vypínacie relé.',"
    ),
    (
        "explanation: 'The thermal overload relay contains heater elements that carry the motor current. Excessive current heats the bimetal strip which bends and trips the contact.',",
        "explanation: 'Tepelné relé preťaženia obsahuje ohrievacie články, ktoré nesú prúd motora. Nadmerný prúd zohreje bimetalovú pásku, ktorá sa ohne a spustí kontakt.',"
    ),
    # sf-1 quiz explanations
    (
        "explanation: '50–100 mA through the heart can cause ventricular fibrillation. At 10 mA, the \"let-go\" threshold is reached — muscles contract and you cannot release a live conductor.',",
        "explanation: '50–100 mA prechádzajúce srdcom môže spôsobiť komorovú fibriláciu. Pri 10 mA sa dosiahne prah \"nemôžeš pustiť\" — svaly sa stiahnu a nemôžeš uvoľniť živý vodič.',"
    ),
    (
        "explanation: 'DRY skin has high resistance (~100,000 Ω), limiting current. WET skin reduces resistance to ~1,000 Ω, increasing current by ~100×. This is why wet conditions are extremely dangerous.',",
        "explanation: 'SUCHÁ pokožka má vysoký odpor (~100 000 Ω), čo obmedzuje prúd. MOKRÁ pokožka znižuje odpor na ~1 000 Ω, čím zvyšuje prúd ~100×. Preto sú vlhké podmienky mimoriadne nebezpečné.',"
    ),
    (
        "explanation: \"An arc flash can reach temperatures of up to 20,000°C — approximately four times hotter than the surface of the sun. It releases blinding light, pressure waves, and molten metal.\",",
        "explanation: 'Oblúkový výboj môže dosiahnuť teploty až 20 000 °C — približne štyrikrát horúcejšie ako povrch Slnka. Uvoľňuje oslnivé svetlo, tlakové vlny a roztavený kov.',"
    ),
    (
        "explanation: 'Hand-to-hand current path passes through the chest and heart, which is the most dangerous path. Hand-to-foot also crosses the heart region.',",
        "explanation: 'Dráha prúdu ruka-ruka prechádza hrudníkom a srdcom, čo je najnebezpečnejšia cesta. Dráha ruka-noha tiež prechádza oblasťou srdca.',"
    ),
    # sf-2 quiz explanations
    (
        "explanation: 'Class 0 gloves are rated for up to 1,000V AC. Class 00 is for up to 500V. Always choose the correct class for your work voltage and check for damage before use.',",
        "explanation: 'Rukavice triedy 0 sú hodnotené pre napätie až 1 000 V AC. Trieda 00 je pre napätie až 500 V. Vždy vyber správnu triedu pre pracovné napätie a skontroluj poškodenie pred použitím.',"
    ),
    (
        "explanation: 'Regular cotton does not provide arc flash protection. Arc flash requires SPECIFIC arc-rated FR (Flame Resistant) clothing with a tested incident energy rating.',",
        "explanation: 'Bežná bavlna neposkytuje ochranu pred oblúkovým výbojom. Oblúkový výboj vyžaduje ŠPECIÁLNE hodnotené FR (ohnivzdorné) oblečenie s testovaným hodnotením dopadajúcej energie.',"
    ),
    (
        "explanation: 'Roll the cuff and trap air inside the glove, then squeeze to pressurize. Any hole will allow air to escape. This inflation test must be done before every use.',",
        "explanation: 'Zvij manžetu a zachyť vzduch vo vnútri rukavice, potom stlač na vytvorenie tlaku. Každá diera umožní únik vzduchu. Tento test nafúknutím sa musí vykonávať pred každým použitím.',"
    ),
    (
        "explanation: 'Incident energy (cal/cm²) is the energy per unit area that could reach a worker during an arc flash event. PPE must have an arc rating exceeding the calculated incident energy.',",
        "explanation: 'Dopadajúca energia (cal/cm²) je energia na jednotku plochy, ktorá by mohla dosiahnuť pracovníka počas udalosti oblúkového výboja. OOPP musia mať hodnotenie oblúka prevyšujúce vypočítanú dopadajúcu energiu.',"
    ),
    # sf-3 quiz explanations
    (
        "explanation: 'Each individual worker applies THEIR OWN personal padlock. The key stays with them. This ensures that nobody can re-energize equipment while any worker is still exposed.',",
        "explanation: 'Každý jednotlivý pracovník nasadí VLASTNÝ osobný visací zámok. Kľúč zostáva pri ňom. Tým sa zabezpečí, že nikto nemôže opätovne nabiť zariadenie, kým je akýkoľvek pracovník stále exponovaný.',"
    ),
    (
        "explanation: 'Always verify zero energy with a properly functioning test instrument. Never assume — test, test, test! The instrument should itself be tested on a known live source first.',",
        "explanation: 'Vždy over nulový energetický stav správne fungujúcim testovacím prístrojom. Nikdy nepredpokladaj — testuj, testuj, testuj! Prístroj by mal byť sám otestovaný na známom živom zdroji ako prvý.',"
    ),
    (
        "explanation: 'Lockout/Tagout: A lockout device (padlock) physically prevents re-energization; a tagout label warns workers. BOTH must be applied. Tagout alone is never sufficient.',",
        "explanation: 'Uzamknutie/Označenie: Uzamknuté zariadenie (visací zámok) fyzicky zabraňuje opätovnému nabitiu; výstražná nálepka upozorňuje pracovníkov. Musia byť aplikované OBE. Iba štítok nikdy nie je dostatočný.',"
    ),
    # sf-4 quiz explanations
    (
        "explanation: 'Elimination of the hazard is always the best control — de-energize the equipment. PPE is the last resort when elimination and engineering controls are not feasible.',",
        "explanation: 'Eliminácia nebezpečenstva je vždy najlepšou kontrolou — odenergetizuj zariadenie. OOPP sú poslednou možnosťou, keď eliminácia a inžinierske kontroly nie sú uskutočniteľné.',"
    ),
    (
        "explanation: '1.2 cal/cm² is the threshold for a SECOND-degree burn. The Flash Protection Boundary is where the incident energy equals this value — workers beyond this point require arc-rated PPE.',",
        "explanation: '1,2 cal/cm² je prah pre popálenie DRUHÉHO stupňa. Hranica ochrany pred výbojom je tam, kde sa dopadajúca energia rovná tejto hodnote — pracovníci za týmto bodom vyžadujú OOPP hodnotené pre oblúk.',"
    ),
    (
        "explanation: 'NFPA 70E requires arc flash labels to include: incident energy (cal/cm²), arc flash boundary distance, required PPE category, and available fault current.',",
        "explanation: 'NFPA 70E vyžaduje, aby nálepky oblúkového výboja obsahovali: dopadajúcu energiu (cal/cm²), vzdialenosť hranice oblúkového výboja, požadovanú kategóriu OOPP a dostupný skratový prúd.',"
    ),
    (
        "explanation: 'Incident energy decreases with distance (inversely proportional to distance squared). Working further from the source significantly reduces arc flash risk.',",
        "explanation: 'Dopadajúca energia klesá so vzdialenosťou (nepriamo úmerne druhej mocnine vzdialenosti). Práca vo väčšej vzdialenosti od zdroja výrazne znižuje riziko oblúkového výboja.',"
    ),
    # sf-5 quiz explanations
    (
        "explanation: 'BS 7671 (the IET Wiring Regulations, currently 18th Edition) is the UK national standard for electrical installations. It is NOT a legal document itself but is cited in building regulations.',",
        "explanation: 'BS 7671 (Nariadenia IET pre zapojenie, v súčasnosti 18. vydanie) je britský národný štandard pre elektrické inštalácie. Sám osebe NIE JE právnym dokumentom, ale je citovaný v stavebných predpisoch.',"
    ),
    (
        "explanation: 'All countries require electricians to be qualified, trained, and in most cases licensed or registered with an official body before performing electrical work.',",
        "explanation: 'Všetky krajiny vyžadujú, aby boli elektrikári kvalifikovaní, vyškolení a vo väčšine prípadov licencovaní alebo registrovaní u oficiálneho orgánu pred vykonávaním elektrickej práce.',"
    ),
    (
        "explanation: 'All new installations must be inspected and tested in accordance with IEC 60364 / BS 7671 before being put into service. An Electrical Installation Certificate (EIC) must be issued.',",
        "explanation: 'Všetky nové inštalácie musia byť inšpekciou a testovaním overené podľa IEC 60364 / BS 7671 pred uvedením do prevádzky. Musí byť vydaný certifikát elektrickej inštalácie (EIC).',"
    ),
    (
        "explanation: 'IEC 60364 (Electrical Installations of Buildings) is the international standard used as the basis for national electrical installation codes in most countries.',",
        "explanation: 'IEC 60364 (Elektrické inštalácie budov) je medzinárodná norma používaná ako základ pre národné kódexy elektrických inštalácií vo väčšine krajín.',"
    ),
    # ti-1 quiz explanations
    (
        "explanation: 'IEC 60900 specifies insulated tools rated for use up to 1000V AC. The insulation provides protection against accidental contact with live parts.',",
        "explanation: 'IEC 60900 špecifikuje izolované náradie hodnotené pre použitie do 1 000 V AC. Izolácia poskytuje ochranu pred náhodným dotykom so živými časťami.',"
    ),
    (
        "explanation: 'Proper wire strippers have adjustable depth stops or multiple gauge holes. Correct setting prevents nicking (cutting) the conductor strands, which weakens the wire.',",
        "explanation: 'Správne odizolátory majú nastaviteľné zarážky hĺbky alebo viacero otvorov pre rôzne priemery. Správne nastavenie zabraňuje zárezu (prestrihnutiu) vodičových lánkov, čo oslabuje drôt.',"
    ),
    (
        "explanation: 'Fish tape (or draw tape) is a flexible steel or fiberglass ribbon that is pushed through conduit or wall cavities, then used to pull cables back through.',",
        "explanation: 'Ťahací drôt (alebo ťahacia páska) je flexibilná oceľová alebo sklolaminátová páska, ktorá sa tlačí cez chráničky alebo dutiny stien a potom sa používa na ťahanie káblov späť.',"
    ),
    (
        "explanation: 'Long-nose pliers are ideal for forming wire loops (hooks) around screw terminals and for reaching into confined spaces. Essential for panel wiring.',",
        "explanation: 'Ihlové kliešte sú ideálne na tvorenie slučiek (háčikov) vodičov okolo skrutkových svoriek a na prístup do stiesnených priestorov. Nevyhnutné pre zapojenie rozvádzačov.',"
    ),
    # ti-2 quiz explanations
    (
        "explanation: \"Measuring resistance on an energized circuit will damage the meter and give wrong readings (the meter's internal voltage source conflicts with the circuit voltage). Always de-energize first.\",",
        "explanation: 'Meranie odporu na nabitom obvode poškodí meter a poskytne nesprávne hodnoty (vnútorný napäťový zdroj metra je v konflikte s napätím obvodu). Vždy najprv odenergetizuj.',"
    ),
    (
        "explanation: 'Ammeters measure current by being connected in SERIES with the circuit. Connecting in parallel (like a voltmeter) would short-circuit the circuit — dangerous and damaging.',",
        "explanation: 'Ampérmetre merajú prúd zapojením SÉRIOVO s obvodom. Paralelné zapojenie (ako voltmeter) by skratovalo obvod — nebezpečné a poškodzujúce.',"
    ),
    (
        "explanation: 'A beep on continuity means low resistance — current can flow — the fuse is GOOD. No beep means high resistance — open circuit — the fuse is BLOWN.',",
        "explanation: 'Pípnutie pri kontinuite znamená nízky odpor — prúd môže tiecť — poistka je V PORIADKU. Žiadne pípnutie znamená vysoký odpor — prerušený obvod — poistka je VYPÁLENÁ.',"
    ),
    (
        "explanation: 'Voltmeters must have very high internal resistance and connect in PARALLEL across the component. Low internal resistance would draw current and change the circuit being tested.',",
        "explanation: 'Voltmetre musia mať veľmi vysoký vnútorný odpor a zapájajú sa PARALELNE naprieč komponentom. Nízky vnútorný odpor by odoberával prúd a menil testovaný obvod.',"
    ),
    # ti-3 quiz explanations
    (
        "explanation: 'New wiring should have insulation resistance > 100 MΩ (typically hundreds of MΩ or even GΩ). Values below 1 MΩ indicate a fault that must be investigated.',",
        "explanation: 'Nová inštalácia by mala mať odpor izolácie > 100 MΩ (typicky stovky MΩ alebo dokonca GΩ). Hodnoty pod 1 MΩ indikujú poruchu, ktorú treba preskúmať.',"
    ),
    (
        "explanation: 'Insulation testers apply 250–1000V DC. This WILL damage sensitive electronic equipment (dimmers, RCDs, VFDs, consumer electronics). Always disconnect these devices first.',",
        "explanation: 'Testery izolácie aplikujú 250–1000 V DC. Toto POŠKODÍ citlivé elektronické zariadenia (stmievače, chrániče, frekvenčné meniče, spotrebná elektronika). Vždy najprv odpoj tieto zariadenia.',"
    ),
    (
        "explanation: 'A Type AC 30mA RCD must trip within 300ms (0.3 seconds) at rated residual current (30mA). At 5× rated current (150mA), it must trip within 40ms.',",
        "explanation: 'Chránič typu AC 30 mA musí vypnúť do 300 ms (0,3 sekundy) pri menovitom reziduálnom prúde (30 mA). Pri 5× menovitom prúde (150 mA) musí vypnúť do 40 ms.',"
    ),
    (
        "explanation: 'Clamp meters use a Hall effect sensor (or Rogowski coil for AC) inside the jaw to detect the magnetic field produced by current flow.',",
        "explanation: 'Kliešťové ampérmetre používajú Hallov senzor (alebo Rogowského cievku pre AC) vo vnútri čeľustí na detekciu magnetického poľa produkovaného tokom prúdu.',"
    ),
]

count = 0
not_found = []
for orig, replaced in replacements:
    if orig in content:
        content = content.replace(orig, replaced, 1)
        count += 1
    else:
        not_found.append(orig[:80])

print(f'Applied {count}/{len(replacements)} replacements')
if not_found:
    print(f'\nNOT FOUND ({len(not_found)}):')
    for t in not_found:
        print(f'  {t!r}')

with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')
