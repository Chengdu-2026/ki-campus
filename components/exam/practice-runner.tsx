"use client";

import { useState } from "react";
import type { PracticeQuestion } from "@/app/actions/practice-actions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/** Übungsmodus: sofortiges Feedback mit Erklärung, kein Einfluss auf Testergebnis. */
export function PracticeRunner({
  questions,
  labels,
}: {
  questions: PracticeQuestion[];
  labels: { check: string; correct: string; incorrect: string; next: string; done: string; result: string; explanation: string };
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  if (finished || questions.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
        <p className="text-lg font-semibold text-brand-900 dark:text-white">{labels.done}</p>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {labels.result.replace("{{correct}}", String(correctCount)).replace("{{total}}", String(questions.length))}
        </p>
      </div>
    );
  }

  const q = questions[index];
  const correctIds = q.options.filter((o) => o.correct).map((o) => o.id);
  const isCorrect =
    selected.length === correctIds.length && selected.every((id) => correctIds.includes(id));

  function toggle(id: string) {
    if (checked) return;
    setSelected((prev) =>
      q.multiple ? (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]) : [id]
    );
  }

  function onCheck() {
    setChecked(true);
    if (isCorrect) setCorrectCount((c) => c + 1);
  }

  function onNext() {
    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex(index + 1);
      setSelected([]);
      setChecked(false);
    }
  }

  return (
    <div className="space-y-4">
      <Progress value={(index / questions.length) * 100} />
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <p className="mb-4 text-lg font-medium text-slate-900 dark:text-slate-100">{q.text}</p>
        <div className="space-y-2">
          {q.options.map((option) => {
            const isSel = selected.includes(option.id);
            let style = isSel
              ? "border-brand-700 bg-brand-50 dark:border-accent-400 dark:bg-slate-800"
              : "border-slate-200 hover:border-slate-400 dark:border-slate-700";
            if (checked) {
              if (option.correct) style = "border-green-600 bg-green-50 dark:bg-green-950";
              else if (isSel) style = "border-red-500 bg-red-50 dark:bg-red-950";
              else style = "border-slate-200 opacity-60 dark:border-slate-700";
            }
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggle(option.id)}
                aria-pressed={isSel}
                disabled={checked}
                className={`flex w-full items-start gap-2 rounded-lg border p-4 text-left text-sm transition-colors ${style}`}
              >
                {checked && option.correct && <span aria-hidden="true">✓</span>}
                {checked && !option.correct && isSel && <span aria-hidden="true">✗</span>}
                {option.text}
              </button>
            );
          })}
        </div>
        {checked && (
          <div
            role="status"
            className={
              "mt-4 rounded-lg p-4 text-sm " +
              (isCorrect
                ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
                : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200")
            }
          >
            <p className="font-semibold">{isCorrect ? labels.correct : labels.incorrect}</p>
            <p className="mt-1">{labels.explanation}: {q.explanation}</p>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        {!checked ? (
          <Button onClick={onCheck} disabled={selected.length === 0}>{labels.check}</Button>
        ) : (
          <Button onClick={onNext}>{labels.next}</Button>
        )}
      </div>
    </div>
  );
}
