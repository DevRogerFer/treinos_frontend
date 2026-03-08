import dayjs from "dayjs";
import { CheckCircle2, Hourglass } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getHomeData, getStats } from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
import { checkOnboarding } from "@/app/_lib/check-onboarding";
import { BottomNav } from "@/components/bottom-nav";
import { Button } from "@/components/ui/button";

import { ConsistencyHeatmap } from "./_components/consistency-heatmap";
import { StreakBanner } from "./_components/streak-banner";

const StatsPage = async () => {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  await checkOnboarding();

  const to = dayjs().format("YYYY-MM-DD");
  const from = dayjs().subtract(2, "month").startOf("month").format("YYYY-MM-DD");

  const response = await getStats({ from, to }, { cache: "no-store" });

  if (response.status !== 200) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-2 pb-24">
        <p className="text-muted-foreground">
          Não foi possível carregar as estatísticas.
        </p>
        <Link href="/">
          <Button variant="link">Voltar</Button>
        </Link>
        <BottomNav activeTab="stats" />
      </div>
    );
  }

  const {
    workoutStreak,
    consistencyByDay,
    completedWorkoutsCount,
    conclusionRate,
    totalTimeInSeconds,
  } = response.data;

  const conclusionPercent = Math.round(conclusionRate * 100);
  const totalHours = Math.floor(totalTimeInSeconds / 3600);
  const totalMinutes = Math.round((totalTimeInSeconds % 3600) / 60);
  const timeDisplay =
    totalHours > 0 ? `${totalHours}h${totalMinutes}m` : `${totalMinutes}m`;

  const homeResponse = await getHomeData(dayjs().format("YYYY-MM-DD"), {
    cache: "no-store",
  });
  const calendarHref =
    homeResponse.status === 200 && homeResponse.data.todayWorkoutDay
      ? `/workout-plans/${homeResponse.data.activeWorkoutPlanId}/days/${homeResponse.data.todayWorkoutDay.id}`
      : undefined;

  return (
    <div className="flex min-h-dvh flex-col bg-background pb-24">
      <header className="px-5 pt-14 pb-4">
        <span className="font-anton text-xl uppercase tracking-wide">
          FIT.AI
        </span>
      </header>

      <section className="px-5">
        <StreakBanner workoutStreak={workoutStreak} />
      </section>

      <section className="mt-6 space-y-3 px-5">
        <h2 className="text-lg font-semibold">Consistência</h2>
        <ConsistencyHeatmap
          consistencyByDay={consistencyByDay}
          from={from}
          to={to}
        />
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3 px-5">
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary/10 p-5">
          <CheckCircle2 className="size-6 text-primary" />
          <span className="text-2xl font-bold">{completedWorkoutsCount}</span>
          <span className="text-xs text-muted-foreground">Treinos Feitos</span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary/10 p-5">
          <CheckCircle2 className="size-6 text-primary" />
          <span className="text-2xl font-bold">{conclusionPercent}%</span>
          <span className="text-xs text-muted-foreground">
            Taxa de conclusão
          </span>
        </div>
      </section>

      <section className="mt-3 px-5">
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary/10 p-5">
          <Hourglass className="size-6 text-primary" />
          <span className="text-2xl font-bold">{timeDisplay}</span>
          <span className="text-xs text-muted-foreground">Tempo Total</span>
        </div>
      </section>

      <BottomNav activeTab="stats" calendarHref={calendarHref} />
    </div>
  );
};

export default StatsPage;
