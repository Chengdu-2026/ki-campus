# -*- coding: utf-8 -*-
"""Generiert Einzel-Handbücher je Modul im FREIGEGEBENEN Standard (Styleguide v1)."""
import sqlite3, html, re, os
DB="prisma/dev.db"; SLUG="ki-kompetenz-basic"
COURSE_TITLE="KI-Kompetenz-Handbuch nach Art. 4 EU AI Act"
CONTENT_VERSION="V1.008"; HANDBUCH_VERSION="V2.1"; SKIP_ORDERS={5}
GLOSS=[
 ("KI","Künstliche Intelligenz","Software, die aus Daten lernt statt stur Regeln abzuarbeiten — und deshalb Texte schreiben, Bilder erzeugen oder Muster erkennen kann. Beispiele: ChatGPT, Microsoft Copilot, Gemini.",re.compile(r"\bKI\b")),
 ("LLM","Large Language Model (großes Sprachmodell)","Die Technik hinter ChatGPT & Co.: sagt das jeweils wahrscheinlichste nächste Wort voraus. Klingt überzeugend — auch wenn es falsch liegt.",re.compile(r"\bLLMs?\b|Large Language Model",re.I)),
 ("GPAI","General Purpose AI","KI-Modelle, die für viele Aufgaben taugen — etwa hinter ChatGPT. Für Hersteller gelten eigene Pflichten.",re.compile(r"\bGPAI\b")),
 ("Bias","Verzerrung","Systematische Schieflagen aus einseitigen Trainingsdaten — kann diskriminieren.",re.compile(r"\bBias\b",re.I)),
 ("DSGVO","Datenschutz-Grundverordnung","Das europäische Datenschutzgesetz. Gilt immer bei personenbezogenen Daten — auch bei Eingaben in ein KI-Tool.",re.compile(r"\bDSGVO\b")),
 ("EU AI Act","Verordnung (EU) 2024/1689","Erstes umfassendes KI-Gesetz der EU. Teilt KI nach Risiko ein; Art. 4 verlangt KI-Kompetenz.",re.compile(r"EU AI Act|AI Act")),
 ("Art. 4","Artikel 4 EU AI Act","Unternehmen müssen ausreichende KI-Kompetenz der Mitarbeitenden sicherstellen. Die Schulung dokumentiert das.",re.compile(r"Art\.\s?4|Artikel 4")),
 ("2FA","Zwei-Faktor-Authentifizierung","Anmeldung mit zweitem Schutzfaktor zusätzlich zum Passwort.",re.compile(r"\b2FA\b")),
 ("AVV","Auftragsverarbeitungsvertrag","Vertrag mit Dienstleister, der Daten im Auftrag verarbeitet. Ohne AVV kein datenschutzkonformer Einsatz.",re.compile(r"\bAVV\b")),
 ("DSFA","Datenschutz-Folgenabschätzung","Vertiefte Risikoprüfung nach DSGVO vor riskanten Verarbeitungen.",re.compile(r"\bDSFA\b")),
 ("Deepfake","","Mit KI gefälschte Stimmen/Fotos/Videos, die echt wirken. Für Betrug genutzt.",re.compile(r"Deepfakes?",re.I)),
 ("Phishing","","Betrugsnachrichten, die Passwörter/Zahlungen erschleichen. Mit KI fehlerfrei und persönlich.",re.compile(r"Phishing",re.I)),
 ("Schatten-KI","","KI-Tools ohne Wissen/Freigabe des Unternehmens — niemand prüft, wo die Daten landen.",re.compile(r"Schatten-KI",re.I)),
 ("Prompt","","Deine Eingabe an ein KI-Tool. Je präziser, desto brauchbarer.",re.compile(r"\bPrompts?\b",re.I)),
 ("QM","Qualitätsmanagement","Systematische Qualitätssicherung durch Abläufe, Kennzahlen, laufende Verbesserung.",re.compile(r"\bQM\b")),
 ("Halluzination","","Wenn eine KI überzeugend klingende, aber erfundene Inhalte liefert. Gegenmittel: prüfen.",re.compile(r"Halluzination",re.I)),
 ("Prompt-Injection","","Versteckte Anweisungen in fremden Texten, die ein KI-System manipulieren.",re.compile(r"Prompt-Injection",re.I)),
 ("Kontextfenster","","Begrenzter Arbeitsspeicher einer KI-Unterhaltung. Große Dokumente zerlegen.",re.compile(r"Kontextfenster",re.I)),
]
def esc(s): return html.escape((s or "").strip())
def mark(t_html, seen, foot):
    for (t,lf,ex,rx) in GLOSS:
        if t in seen: continue
        m=rx.search(t_html)
        if not m: continue
        n=len(foot)+1; foot.append((t,lf,ex)); seen.add(t); e=m.end()
        t_html=t_html[:e]+'<sup class="fn">'+str(n)+'</sup>'+t_html[e:]
    return t_html
def paras(text, seen, foot):
    out=[]
    for p in re.split(r"\n{2,}",(text or "").strip()):
        p=p.strip()
        if p: out.append("<p>"+mark(esc(p.replace("\n"," ")),seen,foot)+"</p>")
    return "".join(out)
CSS=r"""
:root{--navy:#0b1f40;--navy2:#12315f;--cyan:#06b6d4;--ink:#1f2937;--muted:#5b6572;--line:#e4e8ef;--paper:#fff;--soft:#f5f7fb;--goal:#0891b2;--goal-bg:#e8fbff;--ex:#0f9d58;--ex-bg:#eafaf0;--risk:#c0392b;--risk-bg:#fdece9;--memo:#b7791f;--memo-bg:#fff6da;--fach:#475569;--fach-bg:#eef2f8;}
*{box-sizing:border-box}html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:"Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif;color:var(--ink);background:#e9edf3;line-height:1.5;font-size:15px}
.page{max-width:840px;margin:22px auto;background:var(--paper);box-shadow:0 10px 30px rgba(11,31,64,.14);border-radius:14px;overflow:hidden}
.pad{padding:24px 40px}
.masthead{background:linear-gradient(135deg,var(--navy),var(--navy2));color:#fff;padding:20px 40px;display:flex;align-items:center;gap:16px}
.mh-logo{height:78px;width:auto;flex:0 0 auto;border-radius:10px}
.masthead .course{margin:0;font-size:20px;font-weight:800;color:#fff}.masthead .sub{margin:3px 0 0;font-size:12.5px;color:#9fb4d4}
.verbar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;background:#f0f4fb;border-bottom:1px solid var(--line);padding:9px 40px;font-size:12px;color:#334155}
.verbar .chip{background:#fff;border:1px solid #d6e2fb;border-radius:999px;padding:2px 10px;font-weight:700;color:var(--navy)}.verbar .spacer{flex:1}
.mod-strip{background:var(--cyan);color:#03303a;font-weight:800;padding:9px 40px;font-size:14px;display:flex;justify-content:space-between}
.mentor{display:flex;align-items:center;gap:16px;background:#fff;border:1px solid #d6e2fb;border-radius:12px;padding:8px 16px;margin:0 0 14px;break-inside:avoid}
.mentor img{height:92px;width:auto;flex:0 0 auto}.mentor b{color:var(--navy);display:block;font-size:14px}.mentor span{font-size:13px;color:#334155}
.legend{display:flex;flex-wrap:wrap;gap:12px;margin:0 0 16px;padding:10px 14px;background:var(--soft);border:1px solid var(--line);border-radius:10px;font-size:12.5px;font-weight:600;color:#334155}
.modhero{display:block;max-width:460px;max-height:120mm;width:auto;height:auto;margin:2px auto 14px;border-radius:12px;border:1px solid var(--line);break-inside:avoid}
.page img{max-width:100%}
.lesson{border:1px solid var(--line);border-radius:14px;margin:18px 0;overflow:hidden;break-inside:avoid}
.lesson-head{display:flex;align-items:center;gap:12px;background:var(--soft);padding:12px 18px;border-bottom:1px solid var(--line)}
.lnum{background:var(--navy);color:#fff;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;flex:0 0 auto}
.lesson-head h2{margin:0;font-size:17px;color:var(--navy)}.lesson-body{padding:6px 20px 18px}
p{margin:9px 0}strong{color:var(--navy)}sup.fn{color:var(--cyan);font-weight:800;font-size:.7em;padding-left:1px}
.box{border-radius:11px;padding:12px 15px 12px 46px;margin:12px 0;position:relative;break-inside:avoid}
.box .ic{position:absolute;left:12px;top:12px;width:22px;height:22px}
.box .lbl{display:block;font-size:11px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;margin-bottom:3px}
.box p{margin:2px 0}
.goal{background:var(--goal-bg);border-left:5px solid var(--goal)}.goal .lbl{color:var(--goal)}
.ex{background:var(--ex-bg);border-left:5px solid var(--ex)}.ex .lbl{color:var(--ex)}
.risk{background:var(--risk-bg);border-left:5px solid var(--risk)}.risk .lbl{color:var(--risk)}
.memo{background:var(--memo-bg);border:2px dashed #e6c35a;padding-left:46px}.memo .lbl{color:var(--memo)}.memo p{font-size:15px;font-weight:800;color:#7a5410}
.fach{background:var(--fach-bg);border-left:5px solid var(--fach)}.fach .lbl{color:var(--fach)}.fach ol{margin:4px 0 2px;padding-left:22px}.fach li{margin:4px 0;font-size:13px}.fach b{color:var(--navy)}
.work{margin:14px 0 2px;padding:11px 15px;border:1px dashed var(--cyan);border-radius:10px;background:#f7feff;break-inside:avoid}
.work .lbl{font-size:11px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:#0891b2;display:block;margin-bottom:3px}
.work ul{list-style:none;margin:0;padding:0}.work li{font-size:13.5px;padding:3px 0;color:#334155}.work li::before{content:"\2610";font-size:17px;margin-right:9px;color:var(--navy);vertical-align:-1px}
.report{display:flex;gap:14px;align-items:center;background:#0b1f40;border-radius:12px;padding:14px 16px;margin:16px 0;color:#fff;break-inside:avoid}
.report img{width:92px;height:92px;background:#fff;padding:6px;border-radius:8px;flex:0 0 auto}.report .small{font-size:12px;color:#bcd3f0;margin-top:4px}.report b{color:#fff}
.footer{border-top:2px solid var(--line);padding:16px 40px 24px;color:var(--muted);font-size:11.5px}
.footer .row{display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px}.footer b{color:var(--navy)}
.tbadges{display:flex;flex-wrap:wrap;gap:8px 12px;margin:12px 0 4px}
.tbadges span{display:inline-flex;align-items:center;gap:5px;background:#f0f4fb;border:1px solid #d6e2fb;border-radius:999px;padding:4px 11px;font-size:11.5px;font-weight:700;color:var(--navy)}
.notice{margin-top:8px;padding:8px 12px;background:#fff6da;border:1px solid #eed99a;border-radius:8px;color:#7a5410;font-weight:600}
.screen-hint{max-width:840px;margin:0 auto;padding:10px 14px;background:#fff8e1;border:1px solid #f0d98a;border-radius:10px;color:#7a5410;font-size:13px}
@page{size:A4;margin:10mm 10mm 10mm 20mm;@bottom-center{content:"© 2026 Hainan Salzburg Consulting Co., Ltd. · KI-Kompetenz-Handbuch VERPLATZ · www.ki-nachweis.at · Weitergabe nicht gestattet · Seite " counter(page) " / " counter(pages);font-size:8pt;color:#5b6572}}
@media print{body{background:#fff;font-size:11pt}.page{box-shadow:none;margin:0;max-width:none;border-radius:0}.screen-hint{display:none}.masthead{border-radius:0}.modhero{max-height:105mm}}
"""
SVG='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>'\
'<symbol id="target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#0891b2" stroke-width="2.4"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="#0891b2" stroke-width="2.4"/><circle cx="12" cy="12" r="1.6" fill="#0891b2"/></symbol>'\
'<symbol id="warn" viewBox="0 0 24 24"><path d="M12 3 L22 20 H2 Z" fill="#c0392b"/><rect x="10.8" y="9" width="2.4" height="6" rx="1.2" fill="#fff"/><circle cx="12" cy="17" r="1.4" fill="#fff"/></symbol>'\
'<symbol id="idea" viewBox="0 0 24 24"><circle cx="12" cy="10" r="7" fill="#f4b400"/><rect x="9" y="16" width="6" height="4" rx="1.5" fill="#b7791f"/></symbol>'\
'<symbol id="book" viewBox="0 0 24 24"><path d="M3 4h8v16H3z" fill="#64748b"/><path d="M13 4h8v16h-8z" fill="#94a3b8"/><rect x="11" y="4" width="2" height="16" fill="#334155"/></symbol>'\
'<symbol id="laptop" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="10" rx="1.5" fill="none" stroke="#0f9d58" stroke-width="2"/><path d="M2 19h20" stroke="#0f9d58" stroke-width="2" stroke-linecap="round"/></symbol>'\
'</defs></svg>'
db=sqlite3.connect(DB); db.row_factory=sqlite3.Row
cid=db.execute("select id from Course where slug=?",(SLUG,)).fetchone()["id"]
mods=db.execute('select m.id,m.slug,m."order",mt.title from Module m join ModuleTranslation mt on mt.moduleId=m.id and mt.locale="de" where m.courseId=? order by m."order"',(cid,)).fetchall()
written=[]
for m in mods:
    order=m["order"]
    if order in SKIP_ORDERS: continue
    lessons=db.execute('select lt.title,lt.goal,lt.content,lt.example,lt.risk,lt.memo from Lesson l join LessonTranslation lt on lt.lessonId=l.id and lt.locale="de" where l.moduleId=? order by l."order"',(m["id"],)).fetchall()
    seen=set(); foot=[]; cards=[]
    for li,l in enumerate(lessons,1):
        goal='<div class="box goal"><svg class="ic"><use href="#target"/></svg><span class="lbl">🟢 Dein Lernziel</span><p>'+mark(esc(l["goal"]),seen,foot)+'</p></div>' if l["goal"] else ""
        body=paras(l["content"],seen,foot)
        ex='<div class="box ex"><svg class="ic"><use href="#laptop"/></svg><span class="lbl">💻 Aus dem Büroalltag</span><p>'+mark(esc(l["example"]),seen,foot)+'</p></div>' if l["example"] else ""
        rk='<div class="box risk"><svg class="ic"><use href="#warn"/></svg><span class="lbl">🟠 Vorsicht</span><p>'+mark(esc(l["risk"]),seen,foot)+'</p></div>' if l["risk"] else ""
        mo='<div class="box memo"><svg class="ic"><use href="#idea"/></svg><span class="lbl">💡 Merk dir</span><p>'+mark(esc(l["memo"]),seen,foot)+'</p></div>' if l["memo"] else ""
        work='<div class="work"><span class="lbl">✎ Für mich</span><ul><li>Das habe ich verstanden.</li><li>Das betrifft meinen Arbeitsplatz.</li><li>Das möchte ich im Unternehmen nachfragen.</li></ul></div>'
        cards.append('<div class="lesson"><div class="lesson-head"><span class="lnum">'+str(li)+'</span><h2>'+esc(l["title"])+'</h2></div><div class="lesson-body">'+goal+body+ex+rk+mo+work+'</div></div>')
    fach=""
    if foot:
        items="".join('<li><b>'+esc(t)+'</b>'+((" ("+esc(lf)+")") if lf else "")+' — '+esc(ex)+'</li>' for (t,lf,ex) in foot)
        fach='<div class="box fach"><svg class="ic"><use href="#book"/></svg><span class="lbl">📚 Fachbegriffe in diesem Modul (Nummern im Text)</span><ol>'+items+'</ol></div>'
    hero=""
    if os.path.exists("public/modules/"+m["slug"]+".png"):
        hero='<img class="modhero" src="../public/modules/'+m["slug"]+'.png" alt="Modul '+str(order)+' — '+esc(m["title"])+'">'
    masthead='<div class="masthead"><img class="mh-logo" src="img/KI-Kompetenz-Logo-dunkel.png" alt="KI-Kompetenz Campus"><div><div class="course">'+esc(COURSE_TITLE)+'</div><div class="sub">Modul '+str(order)+': '+esc(m["title"])+' · Praxis-Nachschlagewerk</div></div></div>'
    verbar='<div class="verbar"><span class="chip">Handbuch-Version '+HANDBUCH_VERSION+'</span><span class="chip">Inhaltsstand '+CONTENT_VERSION+'</span><span class="chip">Modul '+str(order)+'</span><span class="spacer"></span><span>Letzte fachliche Prüfung: <b>ausstehend</b> (Freigabe über Review-System) · Nächste: halbjährlich nach Freigabe</span></div>'
    mentor='<div class="mentor"><img src="img/mascot/hero.png" alt="KI-Campus Mentor (Eule)"><div><b>Dein KI-Campus Mentor</b><span>Ich führe dich durch dieses Modul — verständlich, praxisnah und auf den Punkt.</span></div></div>'
    legend='<div class="legend"><span>🟢 Empfehlung</span><span>🟠 Achtung</span><span>🔴 Verbot</span><span>📚 Hintergrund</span><span>💡 Tipp / Merksatz</span></div>'
    report='<div class="report"><img src="img/qr-signup.png" alt="QR: eigenen Zugang auf ki-nachweis.at"><div><div style="font-weight:800">📱 Weitergegeben bekommen? Hol dir deinen eigenen Zugang.</div><div class="small">QR scannen → Anmeldung auf www.ki-nachweis.at. Ausgegeben für <b>[Name / Firma]</b> · Ausgabe-ID <b>[AUSGABE-ID]</b>. Persönliches Exemplar — Weitergabe nicht gestattet.</div></div></div>'
    footer='<div class="footer"><div class="row"><span><b>KI-Kompetenz-Handbuch</b> · Modul '+str(order)+' · Version '+HANDBUCH_VERSION+' · Inhaltsstand '+CONTENT_VERSION+'</span><span>© 2026 Hainan Salzburg Consulting Co., Ltd.</span></div><div class="row" style="margin-top:4px"><span>www.ki-nachweis.at · info@ki-nachweis.at</span><span>Privater Schulungs- und Kompetenznachweis nach Art. 4 EU AI Act</span></div><div class="tbadges"><span>🇪🇺 Art. 4 EU AI Act</span><span>🇦🇹 Österreich</span><span>🔒 DSGVO</span><span>📄 Audit-tauglich</span><span>🏢 Für Unternehmen</span><span>🎓 Kompetenzbescheinigung</span></div><div class="notice">Persönliches Lernexemplar — ausgegeben für [Name / Firma] · Ausgabe-ID [AUSGABE-ID]. Vervielfältigung und Weitergabe an Dritte nicht gestattet. © Alle Rechte vorbehalten.</div></div>'
    hint='<p class="screen-hint">💡 <b>Tipp:</b> Als PDF speichern: <b>Strg + P</b> (A4). Fließtext ist ein Vorschlag — versionierte DB-Inhalte bleiben unverändert bis zur Freigabe.</p>'
    css=CSS.replace("VERPLATZ", HANDBUCH_VERSION)
    head='<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+esc(COURSE_TITLE)+' — Modul '+str(order)+': '+esc(m["title"])+'</title><style>'+css+'</style></head><body>'
    page='<div class="page">'+masthead+verbar+'<div class="pad">'+mentor+legend+hero+"".join(cards)+fach+report+'</div>'+footer+'</div>'
    htmlout=head+SVG+hint+page+'</body></html>'
    fn="lernunterlagen/KI-Kompetenz-Handbuch_Modul-%02d.html"%order
    open(fn,"w",encoding="utf-8").write(htmlout)
    written.append((order,m["title"],len(lessons),len(foot)))
print("Erzeugt:",len(written),"Modul-Handbücher (Modul 5 = Flaggschiff übersprungen)")
for o,t,nl,nf in written: print("  Modul %02d: %d Lekt., %d Fachbegriffe"%(o,nl,nf))
