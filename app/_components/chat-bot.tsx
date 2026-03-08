"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowLeft, Send } from "lucide-react";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { ChatMessage } from "./chat-message";
import { ChatSuggestions } from "./chat-suggestions";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "chat_open",
    parseAsBoolean.withDefault(false),
  );
  const [initialMessage, setInitialMessage] = useQueryState(
    "chat_initial_message",
  );
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessageSentRef = useRef(false);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `${process.env.NEXT_PUBLIC_API_URL}/ai`,
      credentials: "include",
    }),
  });

  const isStreaming = status === "streaming";
  const hasMessages = messages.length > 0;

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      sendMessage({ parts: [{ type: "text", text: text.trim() }] });
      setInput("");
    },
    [sendMessage],
  );

  const handleClose = () => {
    setIsOpen(null);
    setInitialMessage(null);
  };

  useEffect(() => {
    if (!isOpen || !initialMessage || initialMessageSentRef.current) {
      if (!isOpen) {
        initialMessageSentRef.current = false;
      }
      return;
    }
    initialMessageSentRef.current = true;
    const message = initialMessage;
    setInitialMessage(null).then(() => {
      handleSend(message);
    });
  }, [isOpen, initialMessage, handleSend, setInitialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex flex-col bg-background">
      <header className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Button variant="ghost" size="icon" onClick={handleClose}>
          <ArrowLeft className="size-5" />
        </Button>
        <h1 className="font-anton text-lg uppercase tracking-wide">FIT.AI</h1>
      </header>

      <div className="flex flex-1 flex-col overflow-y-auto">
        {hasMessages ? (
          <div className="flex flex-col gap-3 p-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isStreaming={
                  isStreaming &&
                  message.role === "assistant" &&
                  message.id === messages[messages.length - 1].id
                }
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <ChatSuggestions onSend={handleSend} />
        )}
      </div>

      <div className="border-t border-border p-4">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={isStreaming}
            className="flex-1 rounded-full border border-border bg-secondary px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
          />
          <Button
            type="submit"
            size="icon"
            className="shrink-0 rounded-full"
            disabled={isStreaming || !input.trim()}
          >
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
