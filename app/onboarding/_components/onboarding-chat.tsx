"use client";

import { ArrowUp, Sparkles } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";

const WELCOME_MESSAGES = [
  "Bem-vindo ao FIT.AI! 🎉",
  "O app que vai transformar a forma como você treina. Aqui você monta seu plano de treino personalizado, acompanha sua evolução com estatísticas detalhadas e conta com uma IA disponível 24h para te guiar em cada exercício.",
  "Tudo pensado para você alcançar seus objetivos de forma inteligente e consistente.",
  "Vamos configurar seu perfil?",
];

export const OnboardingChat = () => {
  const [, setIsOpen] = useQueryState(
    "chat_open",
    parseAsBoolean.withDefault(false),
  );
  const [, setInitialMessage] = useQueryState("chat_initial_message");

  const handleStart = async () => {
    await setInitialMessage("Quero começar a melhorar minha saúde");
    setIsOpen(true);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary">
          <Sparkles className="size-5 text-primary-foreground" />
        </div>
        <div>
          <p className="font-semibold leading-tight">Coach AI</p>
          <p className="text-xs text-green-500">● Online</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 pb-4">
        {WELCOME_MESSAGES.map((message, index) => (
          <div
            key={index}
            className="max-w-[85%] self-start rounded-2xl rounded-tl-sm bg-secondary px-4 py-3 text-sm"
          >
            {message}
          </div>
        ))}

        <div className="mt-2 self-end">
          <Button onClick={handleStart} className="rounded-full px-6">
            Começar!
          </Button>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleStart();
          }}
        >
          <input
            placeholder="Digite sua mensagem"
            className="flex-1 rounded-full border border-border bg-secondary px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
            readOnly
            onFocus={handleStart}
          />
          <Button
            type="submit"
            size="icon"
            className="shrink-0 rounded-full"
          >
            <ArrowUp className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
