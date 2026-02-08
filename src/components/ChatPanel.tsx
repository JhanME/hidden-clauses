"use client";

import { useState, useRef, useEffect } from "react";
import type { ChatMessage, AnalysisResult } from "@/lib/types";

interface ChatPanelProps {
  contractText: string;
  analysisResult: AnalysisResult;
}

const exampleQuestions = [
  "What are the penalties for early cancellation?",
  "What are my obligations as a signer?",
  "Can I modify the conditions after signing?",
  "How long is the contract duration?",
];

export default function ChatPanel({ contractText, analysisResult }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: messageText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          contractText,
          analysisResult,
          conversationHistory: messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your question. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleExampleClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Messages area */}
      <div className="flex-1 overflow-auto p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="mb-6 text-center">
              <div className="mb-2 text-4xl">💬</div>
              <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-300">
                Ask about the contract
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Ask follow-up questions about the analyzed contract
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500">
                Suggested questions:
              </p>
              {exampleQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleExampleClick(question)}
                  className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                    }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.3s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:-0.15s]" />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="shrink-0 border-t border-zinc-200 p-4 dark:border-zinc-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
