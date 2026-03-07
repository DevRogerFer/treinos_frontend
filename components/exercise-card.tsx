import { CircleHelp } from "lucide-react";

import type { GetWorkoutDay200ExercisesItem } from "@/app/_lib/api/fetch-generated";
import { Button } from "@/components/ui/button";

interface ExerciseCardProps {
  exercise: GetWorkoutDay200ExercisesItem;
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border p-4">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{exercise.name}</span>
        <span className="text-sm text-muted-foreground">
          {exercise.sets} séries × {exercise.reps} repetições · {exercise.restTimeInSeconds}s
          descanso
        </span>
      </div>
      <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground">
        <CircleHelp className="size-6" />
      </Button>
    </div>
  );
};
