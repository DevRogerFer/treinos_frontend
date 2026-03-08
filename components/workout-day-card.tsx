"use client";

import { CalendarDays, Clock, Dumbbell } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";

const WEEKDAY_LABELS: Record<string, string> = {
  SUNDAY: "DOMINGO",
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
};

interface WorkoutDayCardProps {
  workoutDay: {
    name: string;
    weekDay: string;
    coverImageUrl?: string;
    estimatedDurationInSeconds: number;
    exercisesCount: number;
  };
}

export const WorkoutDayCard = ({ workoutDay }: WorkoutDayCardProps) => {
  const [imageError, setImageError] = useState(false);
  const durationInMinutes = Math.round(
    workoutDay.estimatedDurationInSeconds / 60,
  );
  const weekDayLabel = WEEKDAY_LABELS[workoutDay.weekDay] ?? workoutDay.weekDay;
  const showImage = workoutDay.coverImageUrl && !imageError;

  return (
    <div className="relative h-52 overflow-hidden rounded-2xl">
      {showImage ? (
        <Image
          src={workoutDay.coverImageUrl!}
          alt={workoutDay.name}
          fill
          className="object-cover"
          unoptimized
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-primary/80 to-primary/30" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/20 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-between p-4">
        <div>
          <Badge className="gap-1.5 border-none bg-muted/60 text-foreground backdrop-blur-sm">
            <CalendarDays className="size-3" />
            {weekDayLabel}
          </Badge>
        </div>
        <div>
          <h4 className="text-xl font-bold">{workoutDay.name}</h4>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {durationInMinutes}min
            </span>
            <span className="flex items-center gap-1">
              <Dumbbell className="size-3.5" />
              {workoutDay.exercisesCount} exercícios
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
