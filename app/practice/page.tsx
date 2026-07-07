import Link from "next/link";
import { requireUser } from "@/lib/rbac";
import { getT } from "@/lib/i18n";
import { getPracticeQuestions, type PracticeMode } from "@/app/actions/practice-actions";
import { PracticeRunner } from "@/components/exam/practice-runner";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { RotateCcw, TrendingUp, BookOpen, ClipboardList } from "lucide-react";

export const metadata = { title: "Wiederholungsmodus" };

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; category?: string }>;
}) {
  const { mode, category } = await searchParams;
  const user = await requireUser();
  const t = getT(user.locale);

  const validModes: PracticeMode[] = ["wrong", "weak", "all", "simulation", "category"];
  const activeMode = validModes.includes(mode as PracticeMode) ? (mode as PracticeMode) : null;

  if (activeMode) {
    const questions = await getPracticeQuestions(activeMode, category);
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("practice.title")}</h1>
          <Link href="/practice" className="text-sm text-brand-700 hover:underline dark:text-accent-400">{t("common.back")}</Link>
        </div>
        {questions.length === 0 ? (
          <EmptyState title={t("practice.noWrong")} />
        ) : (
          <PracticeRunner
            questions={questions}
            labels={{
              check: t("practice.check"),
              correct: t("practice.correct"),
              incorrect: t("practice.incorrect"),
              next: t("practice.nextQuestion"),
              done: t("practice.done"),
              result: t("practice.result", { correct: "{{correct}}", total: "{{total}}" }),
              explanation: t("exam.explanation"),
            }}
          />
        )}
      </div>
    );
  }

  const modes = [
    { key: "wrong", icon: RotateCcw, label: t("practice.modeWrong") },
    { key: "weak", icon: TrendingUp, label: t("practice.modeWeak") },
    { key: "all", icon: BookOpen, label: t("practice.modeAll") },
    { key: "simulation", icon: ClipboardList, label: t("practice.modeSimulation") },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-900 dark:text-white">{t("practice.title")}</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">{t("practice.intro")}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {modes.map(({ key, icon: Icon, label }) => (
          <Link key={key} href={`/practice?mode=${key}`}>
            <Card className="h-full transition-colors hover:border-accent-500">
              <CardHeader>
                <Icon className="mb-2 h-7 w-7 text-accent-500" aria-hidden="true" />
                <CardTitle className="text-base">{label}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
