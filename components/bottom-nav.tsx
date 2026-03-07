import {
  BarChart3,
  CalendarDays,
  Home,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <div className="mx-auto flex max-w-md items-center justify-around py-3">
        <Link href="/" className="p-2 text-foreground">
          <Home className="size-6 fill-foreground" />
        </Link>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <CalendarDays className="size-6" />
        </Button>
        <Button className="size-14 rounded-full shadow-lg">
          <Sparkles className="size-7" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <BarChart3 className="size-6" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <User className="size-6" />
        </Button>
      </div>
    </nav>
  );
};
