"use client";

import { Check, Play } from "lucide-react";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import { completeWorkoutSessionAction } from "../_actions/complete-workout-session";
import { startWorkoutSessionAction } from "../_actions/start-workout-session";

interface WorkoutSessionButtonProps {
  planId: string;
  dayId: string;
  sessionId?: string;
  isCompleted?: boolean;
  variant?: "start" | "full";
}

export const WorkoutSessionButton = ({
  planId,
  dayId,
  sessionId,
  isCompleted,
  variant = "full",
}: WorkoutSessionButtonProps) => {
  const [isPending, startTransition] = useTransition();

  if (variant === "start") {
    const handleStart = () => {
      startTransition(async () => {
        await startWorkoutSessionAction(planId, dayId);
      });
    };

    return (
      <Button
        size="sm"
        onClick={handleStart}
        disabled={isPending}
      >
        <Play className="size-4" />
        {isPending ? "Iniciando..." : "Iniciar Treino"}
      </Button>
    );
  }

  if (isCompleted) {
    return (
      <Button variant="ghost" className="w-full">
        <Check className="size-5" />
        Concluído!
      </Button>
    );
  }

  if (sessionId) {
    const handleComplete = () => {
      startTransition(async () => {
        await completeWorkoutSessionAction(planId, dayId, sessionId);
      });
    };

    return (
      <Button className="w-full" onClick={handleComplete} disabled={isPending}>
        <Check className="size-5" />
        {isPending ? "Finalizando..." : "Marcar como concluído"}
      </Button>
    );
  }

  const handleStart = () => {
    startTransition(async () => {
      await startWorkoutSessionAction(planId, dayId);
    });
  };

  return (
    <Button className="w-full" onClick={handleStart} disabled={isPending}>
      <Play className="size-5" />
      {isPending ? "Iniciando..." : "Iniciar treino"}
    </Button>
  );
};
