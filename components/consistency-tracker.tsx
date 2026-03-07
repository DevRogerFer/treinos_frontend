import { Flame } from "lucide-react";

import type { GetHomeData200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";
import { cn } from "@/lib/utils";

const WEEKDAY_SHORT_LABELS = ["S", "T", "Q", "Q", "S", "S", "D"];

interface ConsistencyTrackerProps {
  consistencyByDay: GetHomeData200ConsistencyByDay;
  workoutStreak: number;
}

export const ConsistencyTracker = ({
  consistencyByDay,
  workoutStreak,
}: ConsistencyTrackerProps) => {
  const sortedDays = Object.entries(consistencyByDay).sort(([a], [b]) =>
    a.localeCompare(b),
  );

  const reorderedDays = [...sortedDays.slice(1), sortedDays[0]];

  return (
    <div className="flex items-stretch gap-3">
      <div className="flex flex-1 items-center justify-between rounded-xl border border-border p-3">
        {reorderedDays.map(([date, status], index) => (
          <div key={date} className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "size-8 rounded-md",
                status.workoutDayCompleted && "bg-primary",
                !status.workoutDayCompleted &&
                  status.workoutDayStarted &&
                  "bg-primary/50",
                !status.workoutDayCompleted &&
                  !status.workoutDayStarted &&
                  "border border-border",
              )}
            />
            <span className="text-xs text-muted-foreground">
              {WEEKDAY_SHORT_LABELS[index]}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 rounded-xl border border-border px-4">
        <Flame className="size-5 fill-streak-foreground text-streak-foreground" />
        <span className="text-lg font-bold">{workoutStreak}</span>
      </div>
    </div>
  );
};
