"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { authClient } from "@/app/_lib/auth-client";
import { GoogleIcon } from "@/components/icons/google-icon";
import { Button } from "@/components/ui/button";

const AuthPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);

  if (isPending || session) {
    return null;
  }

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <div className="relative flex flex-1 flex-col items-center">
        <h1 className="absolute top-5 z-10 font-anton text-2xl uppercase tracking-wide text-foreground">
          FIT.AI
        </h1>

        <div className="relative w-full flex-1">
          <Image
            src="/auth-banner.jpg"
            alt="Pessoa treinando"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      <div className="-mt-8 flex flex-col items-center gap-8 rounded-t-4xl bg-primary px-6 pb-6 pt-10">
        <h2 className="text-center font-heading text-3xl font-bold leading-tight text-primary-foreground">
          O app que vai transformar a forma como você treina.
        </h2>

        <Button
          variant="secondary"
          size="lg"
          className="w-full max-w-xs gap-2 rounded-full bg-foreground text-background hover:bg-foreground/90"
          onClick={handleGoogleLogin}
        >
          <GoogleIcon />
          Fazer login com Google
        </Button>
      </div>

      <p className="py-4 text-center text-xs text-muted-foreground">
        ©2026 Copyright FIT.AI. Todos os direitos reservados
      </p>
    </div>
  );
};

export default AuthPage;