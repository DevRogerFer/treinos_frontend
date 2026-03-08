"use client";

import type { UIMessage } from "ai";
import { Streamdown } from "streamdown";
import "streamdown/styles.css";

interface ChatMessageProps {
  message: UIMessage;
  isStreaming: boolean;
}

export const ChatMessage = ({ message, isStreaming }: ChatMessageProps) => {
  const isUser = message.role === "user";

  const textContent = message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-primary-foreground">
          <p className="text-sm">{textContent}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5">
        <div className="text-sm text-secondary-foreground">
          <Streamdown isAnimating={isStreaming}>{textContent}</Streamdown>
        </div>
      </div>
    </div>
  );
};
