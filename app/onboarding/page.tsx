import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { authClient } from "@/app/_lib/auth-client";
import { Button } from "@/components/ui/button";

import { OnboardingChat } from "./_components/onboarding-chat";

const OnboardingPage = async () => {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data?.user) redirect("/auth");

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium">AI Onboarding</span>
        <Link href="/">
          <Button variant="outline" size="sm">
            Acessar FIT.AI
          </Button>
        </Link>
      </header>

      <OnboardingChat />
    </div>
  );
};

export default OnboardingPage;
