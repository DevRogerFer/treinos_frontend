import dayjs from "dayjs";
import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  getHomeData,
  getWorkoutPlan,
} from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
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

const WorkoutPlanPage = async ({ params }: WorkoutPlanPageProps) => {
  const { planId } = await params;

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

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
      <header className="flex items-center gap-3 px-5 pt-14 pb-4">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="size-5" />
          </Button>
        </Link>
        <Badge className="border-none bg-muted/60 text-foreground">
          {workoutPlan.name}
        </Badge>
      </header>

      <section className="mt-2 space-y-3 px-5">
        <h1 className="text-2xl font-bold">Meu Plano</h1>
        <div className="space-y-3">
          {sortedDays.map((day) => (
            <Link
              key={day.id}
              href={`/workout-plans/${planId}/days/${day.id}`}
            >
              <WorkoutDayCard workoutDay={day} />
            </Link>
          ))}
        </div>
      </section>

      <BottomNav calendarHref={calendarHref} />
    </div>
  );
};

export default WorkoutPlanPage;
