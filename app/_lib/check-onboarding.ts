import dayjs from "dayjs";
import { redirect } from "next/navigation";

import { getHomeData, getUserTrainData } from "@/app/_lib/api/fetch-generated";

export const checkOnboarding = async () => {
  const [trainDataResponse, homeResponse] = await Promise.all([
    getUserTrainData({ cache: "no-store" }),
    getHomeData(dayjs().format("YYYY-MM-DD"), { cache: "no-store" }),
  ]);

  const hasTrainData =
    trainDataResponse.status === 200 && trainDataResponse.data !== null;
  const hasActivePlan =
    homeResponse.status === 200 && !!homeResponse.data.activeWorkoutPlanId;

  if (!hasTrainData || !hasActivePlan) {
    redirect("/onboarding");
  }
};
