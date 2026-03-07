"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

export const SignOutButton = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignOut = () => {
    startTransition(async () => {
      await authClient.signOut();
      router.push("/auth");
    });
  };

  return (
    <Button
      variant="ghost"
      className="text-destructive"
      onClick={handleSignOut}
      disabled={isPending}
    >
      {isPending ? "Saindo..." : "Sair da conta"}
      <LogOut className="size-4" />
    </Button>
  );
};
