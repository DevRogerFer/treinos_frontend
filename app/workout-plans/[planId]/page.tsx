import dayjs from "dayjs";
import { Zap } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  getHomeData,
  getWorkoutPlan,
} from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
import { checkOnboarding } from "@/app/_lib/check-onboarding";
import { BottomNav } from "@/components/bottom-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkoutDayCard } from "@/components/workout-day-card";

interface WorkoutPlanPageProps {
  params: Promise<{ planId: string }>;
}

const WEEKDAY_ORDER: Record<string, number> = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

const WEEKDAY_LABELS: Record<string, string> = {
  SUNDAY: "DOMINGO",
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
};

const WorkoutPlanPage = async ({ params }: WorkoutPlanPageProps) => {
  const { planId } = await params;

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  await checkOnboarding();

  const response = await getWorkoutPlan(planId, {
    cache: "no-store",
  });

  if (response.status !== 200) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-2 pb-24">
        <p className="text-muted-foreground">
          Plano de treino não encontrado.
        </p>
        <Link href="/">
          <Button variant="link">Voltar</Button>
        </Link>
        <BottomNav />
      </div>
    );
  }

  const workoutPlan = response.data;
  const sortedDays = [...workoutPlan.workoutDays].sort(
    (a, b) =>
      (WEEKDAY_ORDER[a.weekDay] ?? 0) - (WEEKDAY_ORDER[b.weekDay] ?? 0),
  );

  const homeResponse = await getHomeData(dayjs().format("YYYY-MM-DD"), {
    cache: "no-store",
  });
  const calendarHref =
    homeResponse.status === 200 && homeResponse.data.todayWorkoutDay
      ? `/workout-plans/${homeResponse.data.activeWorkoutPlanId}/days/${homeResponse.data.todayWorkoutDay.id}`
      : undefined;

  return (
    <div className="flex min-h-dvh flex-col bg-background pb-24">
      <section className="relative h-56 overflow-hidden rounded-b-4xl">
        <Image
          src="/workout-plan-banner.png"
          alt="Plano de treino"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/20 to-background/80" />
        <div className="relative z-10 flex h-full flex-col justify-between p-6">
          <span className="font-anton text-xl uppercase tracking-wide">
            FIT.AI
          </span>
          <div className="space-y-1">
            <Badge className="gap-1.5 border-none bg-primary/80 text-primary-foreground backdrop-blur-sm">
              💪 {workoutPlan.name}
            </Badge>
            <h1 className="text-2xl font-bold">Plano de Treino</h1>
          </div>
        </div>
      </section>

      <section className="mt-4 space-y-3 px-5">
        {sortedDays.map((day) => {
          const weekDayLabel = WEEKDAY_LABELS[day.weekDay] ?? day.weekDay;

          if (day.isRest) {
            return (
              <div
                key={day.id}
                className="rounded-2xl border border-border p-4"
              >
                <Badge
                  variant="secondary"
                  className="gap-1.5 border-none text-muted-foreground"
                >
                  {weekDayLabel}
                </Badge>
                <div className="mt-2 flex items-center gap-2">
                  <Zap className="size-5 fill-foreground text-foreground" />
                  <span className="text-lg font-bold">Descanso</span>
                </div>
              </div>
            );
          }

          return (
            <Link
              key={day.id}
              href={`/workout-plans/${planId}/days/${day.id}`}
            >
              <WorkoutDayCard workoutDay={day} />
            </Link>
          );
        })}
      </section>

      <BottomNav calendarHref={calendarHref} />
    </div>
  );
};

export default WorkoutPlanPage;
