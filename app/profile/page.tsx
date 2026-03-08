import dayjs from "dayjs";
import { Dumbbell, PersonStanding, Ruler, Scale } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  getHomeData,
  getUserTrainData,
  listWorkoutPlans,
} from "@/app/_lib/api/fetch-generated";
import { authClient } from "@/app/_lib/auth-client";
import { checkOnboarding } from "@/app/_lib/check-onboarding";
import { BottomNav } from "@/components/bottom-nav";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { SignOutButton } from "./_components/sign-out-button";

const ProfilePage = async () => {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  await checkOnboarding();

  const user = session.data.user;

  const [trainDataResponse, plansResponse, homeResponse] = await Promise.all([
    getUserTrainData({ cache: "no-store" }),
    listWorkoutPlans({ active: "true" }, { cache: "no-store" }),
    getHomeData(dayjs().format("YYYY-MM-DD"), { cache: "no-store" }),
  ]);

  const trainData =
    trainDataResponse.status === 200 ? trainDataResponse.data : null;

  const activePlanName =
    plansResponse.status === 200 && plansResponse.data.length > 0
      ? plansResponse.data[0].name
      : null;

  const calendarHref =
    homeResponse.status === 200 && homeResponse.data.todayWorkoutDay
      ? `/workout-plans/${homeResponse.data.activeWorkoutPlanId}/days/${homeResponse.data.todayWorkoutDay.id}`
      : undefined;

  const weightKg = trainData
    ? (trainData.weightInGrams / 1000).toFixed(1)
    : "—";
  const heightCm = trainData ? trainData.heightInCentimeters : "—";
  const bodyFat = trainData ? `${trainData.bodyFatPercentage}%` : "—";
  const age = trainData ? trainData.age : "—";
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="flex min-h-dvh flex-col bg-background pb-24">
      <header className="px-5 pt-14 pb-4">
        <span className="font-anton text-xl uppercase tracking-wide">
          FIT.AI
        </span>
      </header>

      <section className="flex items-center gap-4 px-5">
        <Avatar className="size-14">
          {user.image && <AvatarImage src={user.image} alt={user.name} />}
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-bold">{user.name}</h1>
          {activePlanName && (
            <p className="text-sm text-muted-foreground">{activePlanName}</p>
          )}
        </div>
      </section>

      {trainData ? (
        <section className="mt-6 grid grid-cols-2 gap-3 px-5">
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary/10 p-5">
            <Scale className="size-6 text-primary" />
            <span className="text-2xl font-bold">{weightKg}</span>
            <span className="text-xs text-muted-foreground">KG</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary/10 p-5">
            <Ruler className="size-6 text-primary" />
            <span className="text-2xl font-bold">{heightCm}</span>
            <span className="text-xs text-muted-foreground">CM</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary/10 p-5">
            <Dumbbell className="size-6 text-primary" />
            <span className="text-2xl font-bold">{bodyFat}</span>
            <span className="text-xs text-muted-foreground">GC</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-primary/10 p-5">
            <PersonStanding className="size-6 text-primary" />
            <span className="text-2xl font-bold">{age}</span>
            <span className="text-xs text-muted-foreground">ANOS</span>
          </div>
        </section>
      ) : (
        <section className="mt-6 px-5">
          <p className="text-center text-sm text-muted-foreground">
            Dados de treino não cadastrados.
          </p>
        </section>
      )}

      <section className="mt-6 flex justify-center">
        <SignOutButton />
      </section>

      <BottomNav activeTab="profile" calendarHref={calendarHref} />
    </div>
  );
};

export default ProfilePage;
