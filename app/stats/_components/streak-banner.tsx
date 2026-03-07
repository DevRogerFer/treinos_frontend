import { Flame } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface StreakBannerProps {
  workoutStreak: number;
}

export const StreakBanner = ({ workoutStreak }: StreakBannerProps) => {
  const isActive = workoutStreak > 0;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <Image
        src="/stats-banner.png"
        alt=""
        fill
        className="object-cover"
        unoptimized
      />
      <div
        className={cn(
          "absolute inset-0",
          isActive
            ? "bg-streak-banner-active/80"
            : "bg-streak-banner-inactive/90",
        )}
      />
      <div className="relative z-10 flex flex-col items-center gap-1 py-8">
        <Flame
          className={cn(
            "size-10",
            isActive
              ? "fill-streak-foreground text-streak-foreground"
              : "fill-muted-foreground text-muted-foreground",
          )}
        />
        <p className="text-3xl font-bold text-foreground">
          {workoutStreak} {workoutStreak === 1 ? "dia" : "dias"}
        </p>
        <p className="text-sm text-muted-foreground">Sequência Atual</p>
      </div>
    </div>
  );
};
