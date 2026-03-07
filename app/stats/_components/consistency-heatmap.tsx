import dayjs from "dayjs";

import type { GetStats200ConsistencyByDay } from "@/app/_lib/api/fetch-generated";
import { cn } from "@/lib/utils";

interface ConsistencyHeatmapProps {
  consistencyByDay: GetStats200ConsistencyByDay;
  from: string;
  to: string;
}

interface WeekData {
  days: (string | null)[];
}

interface MonthGroup {
  label: string;
  weeks: WeekData[];
}

const MONTH_LABELS: Record<number, string> = {
  0: "Jan",
  1: "Fev",
  2: "Mar",
  3: "Abril",
  4: "Maio",
  5: "Jun",
  6: "Jul",
  7: "Ago",
  8: "Set",
  9: "Out",
  10: "Nov",
  11: "Dez",
};

const buildMonthGroups = (from: string, to: string): MonthGroup[] => {
  const start = dayjs(from);
  const end = dayjs(to);
  const groups: MonthGroup[] = [];

  let currentMonth = start.startOf("month");

  while (
    currentMonth.isBefore(end, "month") ||
    currentMonth.isSame(end, "month")
  ) {
    const monthStart = currentMonth.startOf("month");
    const monthEnd = currentMonth.endOf("month");

    const firstDayOfWeek = monthStart.day();
    const mondayOffset = firstDayOfWeek === 0 ? -6 : 1 - firstDayOfWeek;
    const firstMonday = monthStart.add(mondayOffset, "day");

    const weeks: WeekData[] = [];
    let weekStart = firstMonday;

    while (weekStart.isBefore(monthEnd) || weekStart.isSame(monthEnd, "day")) {
      const days: (string | null)[] = [];

      for (let d = 0; d < 7; d++) {
        const day = weekStart.add(d, "day");
        if (day.isBefore(monthStart, "day") || day.isAfter(monthEnd, "day")) {
          days.push(null);
        } else {
          days.push(day.format("YYYY-MM-DD"));
        }
      }

      weeks.push({ days });
      weekStart = weekStart.add(7, "day");
    }

    groups.push({
      label: MONTH_LABELS[currentMonth.month()] ?? "",
      weeks,
    });

    currentMonth = currentMonth.add(1, "month");
  }

  return groups;
};

export const ConsistencyHeatmap = ({
  consistencyByDay,
  from,
  to,
}: ConsistencyHeatmapProps) => {
  const monthGroups = buildMonthGroups(from, to);

  return (
    <div className="overflow-x-auto rounded-xl border border-border p-4">
      <div className="flex gap-1">
        <div className="flex shrink-0 flex-col gap-1 pt-6">
          {["S", "T", "Q", "Q", "S", "S", "D"].map((label, i) => (
            <div
              key={i}
              className="flex size-6 items-center justify-center text-[10px] text-muted-foreground"
            >
              {label}
            </div>
          ))}
        </div>

        {monthGroups.map((month) => (
          <div key={month.label} className="flex flex-col gap-1">
            <p className="h-5 text-xs text-muted-foreground">{month.label}</p>
            <div className="flex gap-1">
              {month.weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1">
                  {week.days.map((date, dayIdx) => {
                    if (!date) {
                      return <div key={dayIdx} className="size-6" />;
                    }

                    const status = consistencyByDay[date];
                    const isCompleted = status?.workoutDayCompleted;
                    const isStarted = status?.workoutDayStarted;

                    return (
                      <div
                        key={dayIdx}
                        className={cn(
                          "size-6 rounded-md",
                          isCompleted && "bg-primary",
                          !isCompleted && isStarted && "bg-primary/50",
                          !isCompleted && !isStarted && "border border-border",
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
