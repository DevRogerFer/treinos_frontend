"use client";

import {
  BarChart3,
  CalendarDays,
  Home,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { parseAsBoolean, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeTab?: "home" | "calendar" | "stats" | "profile";
  calendarHref?: string;
}

export const BottomNav = ({
  activeTab = "home",
  calendarHref,
}: BottomNavProps) => {
  const [, setIsOpen] = useQueryState(
    "chat_open",
    parseAsBoolean.withDefault(false),
  );
  const isHome = activeTab === "home";
  const isCalendar = activeTab === "calendar";
  const isStats = activeTab === "stats";
  const isProfile = activeTab === "profile";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <div className="mx-auto flex max-w-md items-center justify-around py-3">
        <Link
          href="/"
          className={cn(
            "p-2",
            isHome ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <Home className={cn("size-6", isHome && "fill-foreground")} />
        </Link>
        {calendarHref ? (
          <Link
            href={calendarHref}
            className={cn(
              "p-2",
              isCalendar ? "text-foreground" : "text-muted-foreground",
            )}
          >
            <CalendarDays
              className={cn("size-6", isCalendar && "fill-foreground")}
            />
          </Link>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
          >
            <CalendarDays className="size-6" />
          </Button>
        )}
        <Button
          className="size-14 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <Sparkles className="size-7" />
        </Button>
        <Link
          href="/stats"
          className={cn(
            "p-2",
            isStats ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <BarChart3 className={cn("size-6", isStats && "fill-foreground")} />
        </Link>
        <Link
          href="/profile"
          className={cn(
            "p-2",
            isProfile ? "text-foreground" : "text-muted-foreground",
          )}
        >
          <User className={cn("size-6", isProfile && "fill-foreground")} />
        </Link>
      </div>
    </nav>
  );
};
