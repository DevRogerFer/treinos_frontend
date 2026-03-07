"use server";

import { revalidatePath } from "next/cache";

import { startWorkoutSession } from "@/app/_lib/api/fetch-generated";

export const startWorkoutSessionAction = async (
  planId: string,
  dayId: string,
) => {
  const response = await startWorkoutSession(planId, dayId);

  if (response.status !== 201) {
    return { success: false as const };
  }

  revalidatePath(`/workout-plans/${planId}/days/${dayId}`);

  return { success: true as const };
};
