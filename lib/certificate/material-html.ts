/**
 * Lernunterlagen-Handbuch als HTML — im freigegebenen Styleguide (v1 / _generator.py).
 * Bewusst OHNE Framework-/App-Imports, damit das Modul 1:1 in Route und Render-Harness läuft.
 * Erzeugt pro Modul eine eigene .page (Masthead · Eule · Legende · farbige Boxen ·
 * "Für mich"-Checkboxen · Fachbegriff-Fußnoten · QR · Fußzeile mit Trust-Badges).
 */

export interface MaterialHtmlMiniCheck {
  question: string;
  answer: string;
}

export interface MaterialHtmlLesson {
  title: string;
  goal: string;
  content: string;
  example: string;
  risk: string;
  memo: string;
  /** Lernfragen dieser Lektion — Antwort wird kopfüber (180°) darunter gedruckt. */
  miniChecks?: MaterialHtmlMiniCheck[];
}

export interface MaterialHtmlModule {
  order: number;
  slug: string;
  title: string;
  heroUrl?: string | null;
  lessons: MaterialHtmlLesson[];
}

export interface MaterialHtmlAssets {
  logoUrl: string;
  mascotUrl: string;
  qrUrl: string;
}

export interface MaterialHtmlParams {
  courseTitle: string;
  handbuchVersion: string;
  contentVersion: string;
  modules: MaterialHtmlModule[];
  assets: MaterialHtmlAssets;
  /** Platzhalter-Ersatz "[Name / Firma]" — personalisiertes Exemplar. */
  recipientLabel?: string;
  /** Platzhalter-Ersatz "[AUSGABE-ID]". */
  ausgabeId?: string;
}

interface GlossEntry {
  term: string;
  long: string;
  ex: string;
  rx: RegExp;
}

const GLOSS: GlossEntry[] = [
  { term: "KI", long: "Künstliche Intelligenz", ex: "Software, die aus Daten lernt statt stur Regeln abzuarbeiten — und deshalb Texte schreiben, Bilder erzeugen oder Muster erkennen kann. Beispiele: ChatGPT, Microsoft Copilot, Gemini.", rx: /\bKI\b/ },
  { term: "LLM", long: "Large Language Model (großes Sprachmodell)", ex: "Die Technik hinter ChatGPT & Co.: sagt das jeweils wahrscheinlichste nächste Wort voraus. Klingt überzeugend — auch wenn es falsch liegt.", rx: /\bLLMs?\b|Large Language Model/i },
  { term: "GPAI", long: "General Purpose AI", ex: "KI-Modelle, die für viele Aufgaben taugen — etwa hinter ChatGPT. Für Hersteller gelten eigene Pflichten.", rx: /\bGPAI\b/ },
  { term: "Bias", long: "Verzerrung", ex: "Systematische Schieflagen aus einseitigen Trainingsdaten — kann diskriminieren.", rx: /\bBias\b/i },
  { term: "DSGVO", long: "Datenschutz-Grundverordnung", ex: "Das europäische Datenschutzgesetz. Gilt immer bei personenbezogenen Daten — auch bei Eingaben in ein KI-Tool.", rx: /\bDSGVO\b/ },
  { term: "EU AI Act", long: "Verordnung (EU) 2024/1689", ex: "Erstes umfassendes KI-Gesetz der EU. Teilt KI nach Risiko ein; Art. 4 verlangt KI-Kompetenz.", rx: /EU AI Act|AI Act/ },
  { term: "Art. 4", long: "Artikel 4 EU AI Act", ex: "Unternehmen müssen ausreichende KI-Kompetenz der Mitarbeitenden sicherstellen. Die Schulung dokumentiert das.", rx: /Art\.\s?4|Artikel 4/ },
  { term: "2FA", long: "Zwei-Faktor-Authentifizierung", ex: "Anmeldung mit zweitem Schutzfaktor zusätzlich zum Passwort.", rx: /\b2FA\b/ },
  { term: "AVV", long: "Auftragsverarbeitungsvertrag", ex: "Vertrag mit Dienstleister, der Daten im Auftrag verarbeitet. Ohne AVV kein datenschutzkonformer Einsatz.", rx: /\bAVV\b/ },
  { term: "DSFA", long: "Datenschutz-Folgenabschätzung", ex: "Vertiefte Risikoprüfung nach DSGVO vor riskanten Verarbeitungen.", rx: /\bDSFA\b/ },
  { term: "Deepfake", long: "", ex: "Mit KI gefälschte Stimmen/Fotos/Videos, die echt wirken. Für Betrug genutzt.", rx: /Deepfakes?/i },
  { term: "Phishing", long: "", ex: "Betrugsnachrichten, die Passwörter/Zahlungen erschleichen. Mit KI fehlerfrei und persönlich.", rx: /Phishing/i },
  { term: "Schatten-KI", long: "", ex: "KI-Tools ohne Wissen/Freigabe des Unternehmens — niemand prüft, wo die Daten landen.", rx: /Schatten-KI/i },
  { term: "Prompt", long: "", ex: "Deine Eingabe an ein KI-Tool. Je präziser, desto brauchbarer.", rx: /\bPrompts?\b/i },
  { term: "QM", long: "Qualitätsmanagement", ex: "Systematische Qualitätssicherung durch Abläufe, Kennzahlen, laufende Verbesserung.", rx: /\bQM\b/ },
  { term: "Halluzination", long: "", ex: "Wenn eine KI überzeugend klingende, aber erfundene Inhalte liefert. Gegenmittel: prüfen.", rx: /Halluzination/i },
  { term: "Prompt-Injection", long: "", ex: "Versteckte Anweisungen in fremden Texten, die ein KI-System manipulieren.", rx: /Prompt-Injection/i },
  { term: "Kontextfenster", long: "", ex: "Begrenzter Arbeitsspeicher einer KI-Unterhaltung. Große Dokumente zerlegen.", rx: /Kontextfenster/i },
];

function esc(s: string | null | undefined): string {
  return (s ?? "")
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

/** Fügt beim ersten Vorkommen eines Fachbegriffs (je Modul) eine Fußnote-Hochzahl ein. */
function mark(tHtml: string, seen: Set<string>, foot: GlossEntry[]): string {
  for (const g of GLOSS) {
    if (seen.has(g.term)) continue;
    const m = g.rx.exec(tHtml);
    if (!m) continue;
    const n = foot.length + 1;
    foot.push(g);
    seen.add(g.term);
    const e = m.index + m[0].length;
    tHtml = tHtml.slice(0, e) + '<sup class="fn">' + n + "</sup>" + tHtml.slice(e);
  }
  return tHtml;
}

function paras(text: string, seen: Set<string>, foot: GlossEntry[]): string {
  const out: string[] = [];
  for (let p of (text ?? "").trim().split(/\n{2,}/)) {
    p = p.trim();
    if (p) out.push("<p>" + mark(esc(p.replace(/\n/g, " ")), seen, foot) + "</p>");
  }
  return out.join("");
}

const SVG =
  '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
  '<symbol id="target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="#0891b2" stroke-width="2.4"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="#0891b2" stroke-width="2.4"/><circle cx="12" cy="12" r="1.6" fill="#0891b2"/></symbol>' +
  '<symbol id="warn" viewBox="0 0 24 24"><path d="M12 3 L22 20 H2 Z" fill="#c0392b"/><rect x="10.8" y="9" width="2.4" height="6" rx="1.2" fill="#fff"/><circle cx="12" cy="17" r="1.4" fill="#fff"/></symbol>' +
  '<symbol id="idea" viewBox="0 0 24 24"><circle cx="12" cy="10" r="7" fill="#f4b400"/><rect x="9" y="16" width="6" height="4" rx="1.5" fill="#b7791f"/></symbol>' +
  '<symbol id="book" viewBox="0 0 24 24"><path d="M3 4h8v16H3z" fill="#64748b"/><path d="M13 4h8v16h-8z" fill="#94a3b8"/><rect x="11" y="4" width="2" height="16" fill="#334155"/></symbol>' +
  '<symbol id="laptop" viewBox="0 0 24 24"><rect x="4" y="5" width="16" height="10" rx="1.5" fill="none" stroke="#0f9d58" stroke-width="2"/><path d="M2 19h20" stroke="#0f9d58" stroke-width="2" stroke-linecap="round"/></symbol>' +
  "</defs></svg>";

function css(handbuchVersion: string): string {
  return `
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
.work ul{list-style:none;margin:0;padding:0}.work li{font-size:13.5px;padding:3px 0;color:#334155}.work li::before{content:"\\2610";font-size:17px;margin-right:9px;color:var(--navy);vertical-align:-1px}
.quiz{margin:16px 0 4px;padding:12px 16px 14px;border:1px solid var(--line);border-left:5px solid var(--goal);border-radius:11px;background:#f7feff;break-inside:avoid}
.quiz .lbl{display:block;font-size:11px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:var(--goal);margin-bottom:2px}
.quiz .qhint{font-size:12px;color:#94a3b8;margin:0 0 9px}
.quiz ol{margin:0;padding-left:20px}
.qitem{margin:0 0 11px;padding-bottom:8px;border-bottom:1px dashed var(--line)}.qitem:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.qq{display:block;font-weight:700;color:var(--navy);font-size:13.5px}
.qa{display:inline-block;transform:rotate(180deg);color:#64748b;font-size:12px;margin-top:5px;line-height:1.35}
.report{display:flex;gap:14px;align-items:center;background:#0b1f40;border-radius:12px;padding:14px 16px;margin:16px 0;color:#fff;break-inside:avoid}
.report img{width:92px;height:92px;background:#fff;padding:6px;border-radius:8px;flex:0 0 auto}.report .small{font-size:12px;color:#bcd3f0;margin-top:4px}.report b{color:#fff}
.footer{border-top:2px solid var(--line);padding:16px 40px 24px;color:var(--muted);font-size:11.5px}
.footer .row{display:flex;justify-content:space-between;flex-wrap:wrap;gap:6px}.footer b{color:var(--navy)}
.tbadges{display:flex;flex-wrap:wrap;gap:8px 12px;margin:12px 0 4px}
.tbadges span{display:inline-flex;align-items:center;gap:5px;background:#f0f4fb;border:1px solid #d6e2fb;border-radius:999px;padding:4px 11px;font-size:11.5px;font-weight:700;color:var(--navy)}
.notice{margin-top:8px;padding:8px 12px;background:#fff6da;border:1px solid #eed99a;border-radius:8px;color:#7a5410;font-weight:600}
.screen-hint{max-width:840px;margin:0 auto;padding:10px 14px;background:#fff8e1;border:1px solid #f0d98a;border-radius:10px;color:#7a5410;font-size:13px}
@page{size:A4;margin:10mm 10mm 10mm 20mm;@bottom-center{content:"© 2026 Hainan Salzburg Consulting Co., Ltd. · KI-Kompetenz-Handbuch ${handbuchVersion} · www.ki-nachweis.at · Weitergabe nicht gestattet · Seite " counter(page) " / " counter(pages);font-size:8pt;color:#5b6572}}
@media print{body{background:#fff;font-size:11pt}.page{box-shadow:none;margin:0;max-width:none;border-radius:0}.screen-hint{display:none}.masthead{border-radius:0}.modhero{max-height:105mm}.brk{page-break-before:always}}
`;
}

function renderModulePage(
  mod: MaterialHtmlModule,
  p: MaterialHtmlParams,
  brk: boolean,
): string {
  const recipient = esc(p.recipientLabel ?? "[Name / Firma]");
  const ausgabeId = esc(p.ausgabeId ?? "[AUSGABE-ID]");
  const seen = new Set<string>();
  const foot: GlossEntry[] = [];
  const cards: string[] = [];

  mod.lessons.forEach((l, i) => {
    const li = i + 1;
    const goal = l.goal
      ? '<div class="box goal"><svg class="ic"><use href="#target"/></svg><span class="lbl">🟢 Dein Lernziel</span><p>' +
        mark(esc(l.goal), seen, foot) +
        "</p></div>"
      : "";
    const body = paras(l.content, seen, foot);
    const ex = l.example
      ? '<div class="box ex"><svg class="ic"><use href="#laptop"/></svg><span class="lbl">💻 Aus dem Büroalltag</span><p>' +
        mark(esc(l.example), seen, foot) +
        "</p></div>"
      : "";
    const rk = l.risk
      ? '<div class="box risk"><svg class="ic"><use href="#warn"/></svg><span class="lbl">🟠 Vorsicht</span><p>' +
        mark(esc(l.risk), seen, foot) +
        "</p></div>"
      : "";
    const mo = l.memo
      ? '<div class="box memo"><svg class="ic"><use href="#idea"/></svg><span class="lbl">💡 Merk dir</span><p>' +
        mark(esc(l.memo), seen, foot) +
        "</p></div>"
      : "";
    const work =
      '<div class="work"><span class="lbl">✎ Für mich</span><ul><li>Das habe ich verstanden.</li><li>Das betrifft meinen Arbeitsplatz.</li><li>Das möchte ich im Unternehmen nachfragen.</li></ul></div>';
    cards.push(
      '<div class="lesson"><div class="lesson-head"><span class="lnum">' +
        li +
        '</span><h2>' +
        esc(l.title) +
        '</h2></div><div class="lesson-body">' +
        goal +
        body +
        ex +
        rk +
        mo +
        work +
        "</div></div>",
    );
  });

  let fach = "";
  if (foot.length) {
    const items = foot
      .map(
        (g) =>
          "<li><b>" +
          esc(g.term) +
          "</b>" +
          (g.long ? " (" + esc(g.long) + ")" : "") +
          " — " +
          esc(g.ex) +
          "</li>",
      )
      .join("");
    fach =
      '<div class="box fach"><svg class="ic"><use href="#book"/></svg><span class="lbl">📚 Fachbegriffe in diesem Modul (Nummern im Text)</span><ol>' +
      items +
      "</ol></div>";
  }

  const quizItems = mod.lessons.flatMap((l) => l.miniChecks ?? []);
  let quiz = "";
  if (quizItems.length) {
    const qs = quizItems
      .map(
        (q) =>
          '<li class="qitem"><span class="qq">' +
          esc(q.question) +
          '</span><span class="qa">Antwort: ' +
          esc(q.answer) +
          "</span></li>",
      )
      .join("");
    quiz =
      '<div class="quiz"><span class="lbl">❓ Lernfragen zur Selbstkontrolle</span><p class="qhint">Erst selbst überlegen — die Antwort steht kopfüber direkt darunter (Seite drehen).</p><ol>' +
      qs +
      "</ol></div>";
  }

  const hero = mod.heroUrl
    ? '<img class="modhero" src="' +
      mod.heroUrl +
      '" alt="Modul ' +
      mod.order +
      " — " +
      esc(mod.title) +
      '">'
    : "";

  const masthead =
    '<div class="masthead"><img class="mh-logo" src="' +
    p.assets.logoUrl +
    '" alt="KI-Kompetenz Campus"><div><div class="course">' +
    esc(p.courseTitle) +
    '</div><div class="sub">Modul ' +
    mod.order +
    ": " +
    esc(mod.title) +
    " · Praxis-Nachschlagewerk</div></div></div>";
  const verbar =
    '<div class="verbar"><span class="chip">Handbuch-Version ' +
    esc(p.handbuchVersion) +
    '</span><span class="chip">Inhaltsstand ' +
    esc(p.contentVersion) +
    '</span><span class="chip">Modul ' +
    mod.order +
    '</span><span class="spacer"></span><span>Letzte fachliche Prüfung: <b>ausstehend</b> (Freigabe über Review-System) · Nächste: halbjährlich nach Freigabe</span></div>';
  const mentor =
    '<div class="mentor"><img src="' +
    p.assets.mascotUrl +
    '" alt="KI-Campus Mentor (Eule)"><div><b>Dein KI-Campus Mentor</b><span>Ich führe dich durch dieses Modul — verständlich, praxisnah und auf den Punkt.</span></div></div>';
  const legend =
    '<div class="legend"><span>🟢 Empfehlung</span><span>🟠 Achtung</span><span>🔴 Verbot</span><span>📚 Hintergrund</span><span>💡 Tipp / Merksatz</span></div>';
  const report =
    '<div class="report"><img src="' +
    p.assets.qrUrl +
    '" alt="QR: eigenen Zugang auf ki-nachweis.at"><div><div style="font-weight:800">📱 Weitergegeben bekommen? Hol dir deinen eigenen Zugang.</div><div class="small">QR scannen → Anmeldung auf www.ki-nachweis.at. Ausgegeben für <b>' +
    recipient +
    "</b> · Ausgabe-ID <b>" +
    ausgabeId +
    "</b>. Persönliches Exemplar — Weitergabe nicht gestattet.</div></div></div>";
  const footer =
    '<div class="footer"><div class="row"><span><b>KI-Kompetenz-Handbuch</b> · Modul ' +
    mod.order +
    " · Version " +
    esc(p.handbuchVersion) +
    " · Inhaltsstand " +
    esc(p.contentVersion) +
    '</span><span>© 2026 Hainan Salzburg Consulting Co., Ltd.</span></div><div class="row" style="margin-top:4px"><span>www.ki-nachweis.at · info@ki-nachweis.at</span><span>Privater Schulungs- und Kompetenznachweis nach Art. 4 EU AI Act</span></div><div class="tbadges"><span>🇪🇺 Art. 4 EU AI Act</span><span>🇦🇹 Österreich</span><span>🔒 DSGVO</span><span>📄 Audit-tauglich</span><span>🏢 Für Unternehmen</span><span>🎓 Kompetenzbescheinigung</span></div><div class="notice">Persönliches Lernexemplar — ausgegeben für ' +
    recipient +
    " · Ausgabe-ID " +
    ausgabeId +
    ". Vervielfältigung und Weitergabe an Dritte nicht gestattet. © Alle Rechte vorbehalten.</div></div>";

  return (
    '<div class="page' +
    (brk ? " brk" : "") +
    '">' +
    masthead +
    verbar +
    '<div class="pad">' +
    mentor +
    legend +
    hero +
    cards.join("") +
    fach +
    quiz +
    report +
    "</div>" +
    footer +
    "</div>"
  );
}

/** Vollständiges Handbuch-HTML (alle übergebenen Module) im freigegebenen Design. */
export function renderMaterialHtml(p: MaterialHtmlParams): string {
  const head =
    '<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' +
    esc(p.courseTitle) +
    " — Lernunterlagen</title><style>" +
    css(p.handbuchVersion) +
    "</style></head><body>";
  const hint =
    '<p class="screen-hint">💡 <b>Tipp:</b> Als PDF speichern: <b>Strg + P</b> (A4). Fließtext ist ein Vorschlag — versionierte DB-Inhalte bleiben unverändert bis zur Freigabe.</p>';
  const pages = p.modules
    .map((mod, i) => renderModulePage(mod, p, i > 0))
    .join("");
  return head + SVG + hint + pages + "</body></html>";
}
