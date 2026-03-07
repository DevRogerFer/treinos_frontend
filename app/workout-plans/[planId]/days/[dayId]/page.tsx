import dayjs from "dayjs";
import { ArrowLeft, Clock, Dumbbell } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getHomeData, getWorkoutDay } from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
import { BottomNav } from "@/components/bottom-nav";
import { ExerciseCard } from "@/components/exercise-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { WorkoutSessionButton } from "./_components/workout-session-button";

const WEEKDAY_LABELS: Record<string, string> = {
  SUNDAY: "DOMINGO",
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
};

interface WorkoutDayPageProps {
  params: Promise<{ planId: string; dayId: string }>;
}

const WorkoutDayPage = async ({ params }: WorkoutDayPageProps) => {
  const { planId, dayId } = await params;

  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const response = await getWorkoutDay(planId, dayId, {
    cache: "no-store",
  });

  if (response.status !== 200) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-2 pb-24">
        <p className="text-muted-foreground">Treino não encontrado.</p>
        <Link href="/">
          <Button variant="link">Voltar</Button>
        </Link>
        <BottomNav />
      </div>
    );
  }

  const workoutDay = response.data;
  const durationInMinutes = Math.round(
    workoutDay.estimatedDurationInSeconds / 60,
  );
  const weekDayLabel =
    WEEKDAY_LABELS[workoutDay.weekDay] ?? workoutDay.weekDay;
  const sortedExercises = [...workoutDay.exercises].sort(
    (a, b) => a.order - b.order,
  );

  const inProgressSession = workoutDay.sessions.find(
    (s) => s.startedAt && !s.completedAt,
  );
  const completedSession = workoutDay.sessions.find((s) => s.completedAt);

  const homeResponse = await getHomeData(dayjs().format("YYYY-MM-DD"), {
    cache: "no-store",
  });
  const calendarHref =
    homeResponse.status === 200 && homeResponse.data.todayWorkoutDay
      ? `/workout-plans/${homeResponse.data.activeWorkoutPlanId}/days/${homeResponse.data.todayWorkoutDay.id}`
      : undefined;

  return (
    <div className="flex min-h-dvh flex-col bg-background pb-24">
      <section className="relative h-52 overflow-hidden">
        {workoutDay.coverImageUrl ? (
          <Image
            src={workoutDay.coverImageUrl}
            alt={workoutDay.name}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/80 to-primary/30" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div className="p-5">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-muted/40 backdrop-blur-sm"
              >
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
          </div>

          <div className="space-y-2 px-5 pb-5">
            <Badge className="gap-1.5 border-none bg-muted/60 text-foreground backdrop-blur-sm">
              {weekDayLabel}
            </Badge>
            <h1 className="text-2xl font-bold">{workoutDay.name}</h1>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {durationInMinutes}min
              </span>
              <span className="flex items-center gap-1">
                <Dumbbell className="size-3.5" />
                {workoutDay.exercises.length} exercícios
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 space-y-3 px-5">
        <h2 className="text-lg font-semibold">Exercícios</h2>
        <div className="space-y-3">
          {sortedExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </section>

      <section className="mt-6 px-5">
        <WorkoutSessionButton
          planId={planId}
          dayId={dayId}
          sessionId={inProgressSession?.id}
          isCompleted={!!completedSession}
        />
      </section>

      <BottomNav activeTab="calendar" calendarHref={calendarHref} />
    </div>
  );
};

export default WorkoutDayPage;
