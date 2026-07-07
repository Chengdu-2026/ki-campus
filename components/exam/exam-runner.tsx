"use client";

import { useState, useTransition } from "react";
import { saveAnswer, submitExam } from "@/app/actions/exam-actions";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export interface RunnerQuestion {
  id: string;
  text: string;
  multiple: boolean;
  options: { id: string; text: string }[];
}

/** Prüfungs-UI: eine Frage pro Schritt, serverseitige Zwischenspeicherung, Resume-fähig. */
export function ExamRunner({
  attemptId,
  questions,
  savedAnswers,
  labels,
}: {
  attemptId: string;
  questions: RunnerQuestion[];
  savedAnswers: Record<string, string[]>;
  labels: {
    question: string; multipleHint: string; singleHint: string;
    next: string; back: string; finish: string; confirmFinish: string; saving: string;
  };
}) {
  const firstOpen = Math.max(0, questions.findIndex((q) => !(savedAnswers[q.id]?.length)));
  const [index, setIndex] = useState(firstOpen === -1 ? 0 : firstOpen);
  const [answers, setAnswers] = useState<Record<string, string[]>>(savedAnswers);
  const [pending, startTransition] = useTransition();
  const [submitting, setSubmitting] = useState(false);

  const q = questions[index];
  const selected = answers[q.id] ?? [];
  const answeredCount = questions.filter((question) => (answers[question.id]?.length ?? 0) > 0).length;

  function toggle(optionId: string) {
    setAnswers((prev) => {
      const current = prev[q.id] ?? [];
      let next: string[];
      if (q.multiple) {
        next = current.includes(optionId) ? current.filter((x) => x !== optionId) : [...current, optionId];
      } else {
        next = [optionId];
      }
      startTransition(() => {
        void saveAnswer({ attemptId, questionId: q.id, selectedOptionIds: next });
      });
      return { ...prev, [q.id]: next };
    });
  }

  async function onFinish() {
    if (!window.confirm(labels.confirmFinish)) return;
    setSubmitting(true);
    await submitExam(attemptId);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>{labels.question.replace("{{current}}", String(index + 1)).replace("{{total}}", String(questions.length))}</span>
          <span>{answeredCount}/{questions.length}</span>
        </div>
        <Progress value={(answeredCount / questions.length) * 100} />
      </div>

      <fieldset className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <legend className="sr-only">{q.text}</legend>
        <p className="mb-1 text-lg font-medium text-slate-900 dark:text-slate-100">{q.text}</p>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
          {q.multiple ? labels.multipleHint : labels.singleHint}
        </p>
        <div className="space-y-2">
          {q.options.map((option) => {
            const isSelected = selected.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                role={q.multiple ? "checkbox" : "radio"}
                aria-checked={isSelected}
                onClick={() => toggle(option.id)}
                className={
                  "flex w-full items-start gap-3 rounded-lg border p-4 text-left text-sm transition-colors " +
                  (isSelected
                    ? "border-brand-700 bg-brand-50 font-medium text-brand-900 dark:border-accent-400 dark:bg-slate-800 dark:text-white"
                    : "border-slate-200 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500")
                }
              >
                <span
                  aria-hidden="true"
                  className={
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border text-xs " +
                    (q.multiple ? "rounded" : "rounded-full") +
                    (isSelected ? " border-brand-700 bg-brand-700 text-white dark:border-accent-400 dark:bg-accent-400 dark:text-brand-900" : " border-slate-300 dark:border-slate-600")
                  }
                >
                  {isSelected ? "✓" : ""}
                </span>
                {option.text}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" disabled={index === 0} onClick={() => setIndex(index - 1)}>
          {labels.back}
        </Button>
        {index < questions.length - 1 ? (
          <Button onClick={() => setIndex(index + 1)}>{labels.next}</Button>
        ) : (
          <Button onClick={onFinish} disabled={submitting || pending}>
            {submitting ? labels.saving : labels.finish}
          </Button>
        )}
      </div>
    </div>
  );
}
