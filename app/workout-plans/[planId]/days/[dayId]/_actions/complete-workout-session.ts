"use server";

import dayjs from "dayjs";
import { revalidatePath } from "next/cache";

import { completeWorkoutSession } from "@/app/_lib/api/fetch-generated";

export const completeWorkoutSessionAction = async (
  planId: string,
  dayId: string,
  sessionId: string,
) => {
  const response = await completeWorkoutSession(planId, dayId, sessionId, {
    completedAt: dayjs().toISOString(),
  });

  if (response.status !== 200) {
    return { success: false as const };
  }

  revalidatePath(`/workout-plans/${planId}/days/${dayId}`);

  return { success: true as const };
};
