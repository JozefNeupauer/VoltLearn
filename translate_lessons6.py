#!/usr/bin/env python3
"""
Sixth pass: translate all 25 remaining long explanation template literal bodies
Uses regex to find each block by index and replaces with Slovak text.
"""

import re

with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all explanation template literal blocks
pattern = r'(    explanation: `)([^`]*?)(`(?:,|\s*\n))'
matches = list(re.finditer(pattern, content, re.DOTALL))
print(f'Found {len(matches)} explanation blocks')

# Slovak translations indexed 0-25 (block 11 index 10 is already done, will skip)
translations = {
    0: """Elektrina je tok **elektrického náboja** — konkrétne pohyb elektrónov cez vodič, ako je medený drôt.

Každá látka sa skladá z **atómov**. V strede každého atómu je jadro obsahujúce protóny (kladný náboj) a neutróny (neutrálne). Okolo jadra obiehajú **elektróny** (záporný náboj).

V **vodičoch** (ako meď, striebro, hliník) sú vonkajšie elektróny voľne viazané a môžu sa slobodne pohybovať. V **izolátoroch** (ako guma, plast, drevo) sú elektróny pevne viazané a nemôžu sa pohybovať.

Keď sa priloží napätie na vodič, voľné elektróny sa pohybujú jedným smerom — toto je **elektrický prúd**.

**Kľúčové fakty:**
• Náboj elektrónu: 1,6 × 10⁻¹⁹ Coulombov
• Prúd = rýchlosť toku náboja: Q/t
• Symbol náboja: Q (Coulomby)""",

    1: """**Elektrický prúd (I)** je rýchlosť, s akou elektrický náboj tečie cez vodič. Meria sa v **Ampéroch (A)**, hovorovo "ampérach".

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

⚠️ **Bezpečnosť:** Už len **0,1 A (100 mA)** prechádzajúce ľudským srdcom môže byť smrteľné.""",

    2: """**Napätie (V)** je elektrický potenciálový rozdiel medzi dvomi bodmi. Je to „tlak", ktorý ženie elektróny obvodom. Meria sa vo **Voltoch (V)**.

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

⚠️ **Bezpečnosť:** Aj nízke napätia môžu byť smrteľné za správnych podmienok (vlhkosť, priamy kontakt so srdcom). Vždy zaobchádzaj s akýmkoľvek napätím s rešpektom!""",

    3: """**Odpor (R)** je odpor voči toku elektrického prúdu. Materiály kladú prúdu odpor, pretože atómy blokujú pohyb elektrónov. Meria sa v **Ohmoch (Ω)** — grécke písmeno Omega.

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
Tenšie a dlhšie káble majú vyšší odpor → väčší úbytok napätia a zahrievanie. Vždy vyber správny prierez vodiča!""",

    4: """Elektrické komponenty môžu byť zapojené dvoma základnými spôsobmi: **sériovo** alebo **paralelne**.

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

**Pamätaj:** Domáca inštalácia je VŽDY paralelná — každá zásuvka/svetlo funguje nezávisle pri plnom napájacím napätí.""",

    5: """**Ohmov zákon** je základný vzťah medzi napätím, prúdom a odporom. Objavil ho Georg Simon Ohm v roku 1827:

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

**Pamätaj:** Ohmov zákon platí pre *odporové* súčiastky pri konštantnej teplote. Priamo neplatí pre kondenzátory, cievky ani nelineárne prvky ako diódy.""",

    6: """Keď poznáš prúd (**I**) a odpor (**R**), môžeš vypočítať napätie:

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
Udržuj úbytok napätia < 3 % napájacieho napätia (odporúčanie IEC).""",

    7: """Keď poznáš napätie a odpor, vypočítaj prúd:

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
- Stmievanie svetiel pri spustení spotrebičov""",

    8: """Keď poznáš napätie a prúd, vypočítaj odpor:

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
Farby prúžkov predstavujú číslice. Čierna=0, Hnedá=1, Červená=2, Oranžová=3, Žltá=4, Zelená=5, Modrá=6, Fialová=7, Sivá=8, Biela=9""",

    9: """**Elektrický výkon (P)** je rýchlosť, s akou sa energia spotrebúva alebo produkuje. Meria sa vo **Wattoch (W)**.

**Tri vzorce pre výkon:**
• P = V × I
• P = I² × R
• P = V² / R

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
P_teplo = I²R — určuje minimálny prierez kábla, menovité hodnoty poistiek a nárast teploty komponentov.""",

    # block 10 index is already SK — skip

    11: """**Farebné označenie vodičov sú normy zachraňujúce životy.** Na prvý pohľad ti povedia, čo ktorý vodič robí, čím zabraňujú nebezpečným chybám.

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
- Zdokumentuj inštalačný systém pred prácou na ňom""",

    12: """**Dimenzovanie káblov** (zaťažiteľnosť = prúdová kapacita) je jedna z najdôležitejších zručností elektrikára.

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

**Zlaté pravidlo:** V prípade pochybností zvoľ väčší prierez. Cenový rozdiel je malý, ale poddimenzované káble spôsobujú požiare!""",

    13: """**Ochranné zariadenia obvodov** zabraňujú poškodeniu a chránia životy tým, že pri poruche odpoja obvod.

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
Poistka/istič musí vypnúť PRED tým, ako kábel dosiahne maximálnu teplotu. Toto sa nazýva "koordinácia ochrany kábla".""",

    14: """**Jednosmerný motor (DC motor)** premieňa elektrickú energiu na mechanickú rotačnú energiu pomocou magnetických polí.

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
- Pri plnej rýchlosti: protinapätie ≈ V_napájanie, prúd je nízky""",

    15: """**Jednosmerné motory majú niekoľko kľúčových komponentov**, ktoré vyžadujú údržbu a pochopenie:

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
Výkon kW, napätie, prúd, RPM, pracovný cyklus, trieda izolácie (A=105 °C, B=130 °C, F=155 °C, H=180 °C)""",

    16: """**Priame spustenie jednosmerného motora** okamžite priloží plné napätie — to spôsobuje veľmi vysoký záberový prúd (až 10× menovitý), ktorý môže poškodiť motor a napájaciu sústavu.

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
4. Spätné brzdenie (rekuperácia)""",

    17: """**Jednosmerné motory musia byť chránené** pred abnormálnymi stavmi, ktoré môžu motor poškodiť alebo zničiť:

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
• Motorové ochranné spínače majú vbudovanú ochranu fázy""",

    18: """Elektrina je jednou z hlavných príčin pracovných úrazov s následkom smrti. Pochopenie nebezpečenstiev je prvým krokom k predchádzaniu nehodám.

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
**VŽDY PREDPOKLADAJ, ŽE OBVODY SÚ POD NAPÄTÍM, KÝM TO TESTOVACÍM ZARIADENÍM NEOVERÍ OPAK**""",

    19: """**OOPP sú poslednou líniou obrany** — inžinierske kontroly a izolácia musia byť vždy na prvom mieste. Ale ak sú OOPP potrebné, musia byť správneho typu pre dané nebezpečenstvo.

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
• Reflexná vesta tam, kde to vyžadujú pravidlá pracoviska""",

    20: """**LOTO (Uzamknutie/Označenie)** je postup používaný na zabezpečenie, že elektrické zariadenie je bezpečne bez napätia pred začatím údržby alebo opravných prác.

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
- Iba po potvrdení nulového stavu = bezpečné na prácu""",

    21: """**Oblúkový výboj** je jedno z najzávažnejších elektrických nebezpečenstiev. Pochopenie ochranných hraníc je nevyhnutné pre každého, kto pracuje v blízkosti nabytých zariadení.

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
• Diaľkové vytiahnutie odpínačov""",

    22: """Elektrická práca sa riadi prísnymi predpismi a normami. Ako elektrikár si zo zákona povinný ich dodržiavať.

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

**Nikdy nerob skratky v predpisoch — elektrické poruchy spôsobujú tisíce požiarov v domácnostiach a úmrtí každý rok.**""",

    23: """Každý elektrikár potrebuje sadu kvalitného, dobre udržiavaného ručného náradia. Tu sú základné nástroje a spôsob ich bezpečného používania.

**Testery napätia (vždy ako prvé!):**
• Bezkontaktný tester napätia — detekuje striedavé napätie bez dotyku vodiča
• Pero-tester — základná indikácia live/dead
• Meracie káble kompatibilné s GS38 (UK) pre multimetre

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
- Nikdy nepoužívaj skrutkovač ako sekáč alebo páčidlo""",

    24: """**Digitálny multimeter (DMM)** je najdôležitejší prístroj každého elektrikára. Ovládanie multimetra je nevyhnutné.

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
• Správna vstupná zdierka — A nie je V/Ω (vo vnútri sú poistky!)
• Začni na najvyššom rozsahu, potom znižuj

**True-RMS meradlá:**
Pre AC merania zahŕňajúce nesínusové priebehy použi True-RMS meter. Meradlá reagujúce priemerom dávajú nesprávne výsledky na výstupoch meničov, frekvenčných meničoch atď.""",

    25: """Profesionálni elektrikári používajú špeciálne testovacie prístroje nad rámec základného multimetra na testovanie inštalácií a hľadanie porúch.

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
6. Funkčné testy""",
}

# Now perform replacements by finding each block and replacing its content
# We'll rebuild the content by doing targeted substitutions
result = content

count = 0
for block_idx, slovak_text in translations.items():
    # Find this block
    m = matches[block_idx]
    original_body = m.group(1)
    
    # Skip if already in Slovak (has Slovak chars)
    has_czech_slovak = any(c in original_body for c in 'áéíóúýčšžľäôúäňťÁÉÍÓÚÝČŠŽĽÄÔÚÄŇŤ')
    if has_czech_slovak:
        print(f'Block {block_idx+1}: already translated, skipping')
        continue
    
    if original_body in result:
        result = result.replace(original_body, slovak_text, 1)
        count += 1
        print(f'Block {block_idx+1}: translated OK')
    else:
        print(f'Block {block_idx+1}: NOT FOUND in file!')

print(f'\nTotal: {count} blocks translated')

with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(result)

print('File saved.')
