"use client";

import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ChatSuggestionsProps {
  onSend: (text: string) => void;
}

export const ChatSuggestions = ({ onSend }: ChatSuggestionsProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
        <Sparkles className="size-8 text-primary" />
      </div>
      <div className="space-y-1 text-center">
        <h3 className="text-lg font-semibold">Como posso ajudar?</h3>
        <p className="text-sm text-muted-foreground">
          Pergunte sobre treinos, exercícios ou peça um plano personalizado.
        </p>
      </div>
      <Button
        variant="outline"
        className="rounded-full"
        onClick={() => onSend("Monte meu plano de treino")}
      >
        Monte meu plano de treino
      </Button>
    </div>
  );
};
