"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, Play, Square } from "lucide-react";

/**
 * Vorlese-Funktion über die Web Speech API — ohne externe Dienste und Kosten.
 * Qualitäts-Strategie:
 * 1. Neural-/Online-Stimmen bevorzugen (Edge: "… Online (Natural)", Chrome: "Google Deutsch")
 * 2. Nutzer kann die Stimme wechseln (Auswahl wird gespeichert)
 * 3. Text wird satzweise vorgelesen — verhindert den Chrome-Abbruch bei langen Texten
 */

const VOICE_STORAGE_KEY = "readAloudVoice";
const RATE_STORAGE_KEY = "readAloudRate";

function rankVoice(voice: SpeechSynthesisVoice): number {
  const name = voice.name.toLowerCase();
  let score = 0;
  if (voice.lang === "de-AT") score += 4;
  if (voice.lang === "de-DE") score += 3;
  if (voice.lang.startsWith("de")) score += 2;
  if (name.includes("natural") || name.includes("neural")) score += 10; // Edge-Neural-Stimmen
  if (name.includes("online")) score += 6;
  if (name.includes("google")) score += 5; // Chrome-Cloud-Stimme
  if (name.includes("siri") || name.includes("premium") || name.includes("enhanced")) score += 5;
  if (name.includes("anna") || name.includes("petra") || name.includes("katja") || name.includes("conrad")) score += 2;
  if (name.includes("compact") || name.includes("espeak")) score -= 5;
  return score;
}

function splitIntoChunks(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 0);
}

export function ReadAloud({ text, label = "Vorlesen" }: { text: string; label?: string }) {
  const [supported, setSupported] = useState(false);
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceName, setVoiceName] = useState<string>("");
  const [rate, setRate] = useState(0.95);
  const queueRef = useRef<{ chunks: string[]; index: number; cancelled: boolean } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);

    function loadVoices() {
      const germanVoices = window.speechSynthesis
        .getVoices()
        .filter((v) => v.lang.toLowerCase().startsWith("de"))
        .sort((a, b) => rankVoice(b) - rankVoice(a));
      setVoices(germanVoices);
      const saved = localStorage.getItem(VOICE_STORAGE_KEY);
      if (saved && germanVoices.some((v) => v.name === saved)) {
        setVoiceName(saved);
      } else if (germanVoices.length > 0) {
        setVoiceName(germanVoices[0].name); // beste verfügbare Stimme
      }
    }
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    const savedRate = localStorage.getItem(RATE_STORAGE_KEY);
    if (savedRate) setRate(parseFloat(savedRate));

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!supported) return null;

  function speakChunk() {
    const queue = queueRef.current;
    if (!queue || queue.cancelled || queue.index >= queue.chunks.length) {
      setState("idle");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(queue.chunks[queue.index]);
    utterance.lang = "de-DE";
    const voice = voices.find((v) => v.name === voiceName) ?? voices[0];
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    utterance.rate = rate;
    utterance.onend = () => {
      queue.index += 1;
      speakChunk();
    };
    utterance.onerror = () => setState("idle");
    window.speechSynthesis.speak(utterance);
  }

  function start() {
    window.speechSynthesis.cancel();
    queueRef.current = { chunks: splitIntoChunks(text), index: 0, cancelled: false };
    setState("playing");
    speakChunk();
  }

  function togglePause() {
    if (state === "playing") {
      window.speechSynthesis.pause();
      setState("paused");
    } else if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
    }
  }

  function stop() {
    if (queueRef.current) queueRef.current.cancelled = true;
    window.speechSynthesis.cancel();
    setState("idle");
  }

  function onVoiceChange(name: string) {
    setVoiceName(name);
    localStorage.setItem(VOICE_STORAGE_KEY, name);
    if (state !== "idle") { stop(); }
  }

  function onRateChange(value: number) {
    setRate(value);
    localStorage.setItem(RATE_STORAGE_KEY, String(value));
  }

  const buttonClass =
    "inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-medium hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800";

  return (
    <div className="space-y-2">
      <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
        {state === "idle" ? (
          <button type="button" onClick={start} className={buttonClass}>
            <Volume2 className="h-4 w-4" aria-hidden="true" />
            {label}
          </button>
        ) : (
          <>
            <button type="button" onClick={togglePause} className={buttonClass}>
              {state === "playing" ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
              {state === "playing" ? "Pause" : "Weiter"}
            </button>
            <button type="button" onClick={stop} className={buttonClass} aria-label="Vorlesen beenden">
              <Square className="h-4 w-4" aria-hidden="true" />
              Stopp
            </button>
          </>
        )}
        {voices.length > 1 && (
          <select
            aria-label="Stimme wählen"
            value={voiceName}
            onChange={(e) => onVoiceChange(e.target.value)}
            className="h-10 rounded-lg border border-slate-300 bg-white px-2 text-sm dark:border-slate-600 dark:bg-slate-800"
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name.replace("Microsoft ", "").replace(" Online (Natural)", " (Natural)")} · {voice.lang}
              </option>
            ))}
          </select>
        )}
        <label className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          Tempo
          <input
            type="range"
            min={0.7}
            max={1.3}
            step={0.05}
            value={rate}
            onChange={(e) => onRateChange(parseFloat(e.target.value))}
            aria-label="Vorlese-Tempo"
            className="w-24"
          />
        </label>
      </div>
      {voices.length > 0 && !voices.some((v) => rankVoice(v) >= 8) && (
        <p className="text-xs text-slate-400 dark:text-slate-500">
          Tipp: In Microsoft Edge stehen besonders natürliche Stimmen zur Verfügung („Natural").
        </p>
      )}
    </div>
  );
}
