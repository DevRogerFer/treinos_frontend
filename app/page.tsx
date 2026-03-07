import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getHomeData } from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
import { BottomNav } from "@/components/bottom-nav";
import { ConsistencyTracker } from "@/components/consistency-tracker";
import { Button } from "@/components/ui/button";
import { WorkoutDayCard } from "@/components/workout-day-card";

const Home = async () => {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  const response = await getHomeData(dayjs().format("YYYY-MM-DD"), {
    cache: "no-store",
  });

  if (response.status !== 200) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-2 pb-24">
        <p className="text-muted-foreground">
          Nenhum plano de treino ativo encontrado.
        </p>
        <BottomNav />
      </div>
    );
  }

  const {
    todayWorkoutDay,
    consistencyByDay,
    workoutStreak,
    activeWorkoutPlanId,
  } = response.data;
  const firstName = session.data.user.name?.split(" ")[0] ?? "Atleta";

  return (
    <div className="flex min-h-dvh flex-col bg-background pb-24">
      <section className="relative h-72 overflow-hidden rounded-b-4xl">
        <Image
          src="/home-banner.jpg"
          alt="Pessoa treinando"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 rounded-b-4xl bg-linear-to-b from-background/40 via-background/20 to-background/80" />
        <div className="relative z-10 flex h-full flex-col justify-between p-6">
          <span className="font-anton text-xl uppercase tracking-wide">
            FIT.AI
          </span>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold">Olá, {firstName}</h1>
              <p className="text-sm text-foreground/70">
                Bora treinar hoje?
              </p>
            </div>
            <Button size="sm" className="rounded-full px-5">
              Bora!
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-6 space-y-3 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Consistência</h2>
          <Button variant="link" className="text-primary">
            Ver histórico
          </Button>
        </div>
        <ConsistencyTracker
          consistencyByDay={consistencyByDay}
          workoutStreak={workoutStreak}
        />
      </section>

      {todayWorkoutDay && (
        <section className="mt-6 space-y-3 px-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Treino de Hoje</h2>
            <Button variant="link" className="text-primary">
              Ver treinos
            </Button>
          </div>
          <Link
            href={`/workout-plans/${activeWorkoutPlanId}/workout-days/${todayWorkoutDay.id}`}
          >
            <WorkoutDayCard workoutDay={todayWorkoutDay} />
          </Link>
        </section>
      )}

      <BottomNav />
    </div>
  );
};

export default Home;
