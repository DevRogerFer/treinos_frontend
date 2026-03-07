"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { authClient } from "@/app/_lib/auth-client";

const Home = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/auth");
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return null;
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background">
      <p className="text-foreground">Home</p>
    </div>
  );
};

export default Home;
