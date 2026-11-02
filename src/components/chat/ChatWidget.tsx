"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  Minimize2,
} from "lucide-react";
import type { AIProductSummary } from "@/lib/ai/catalog-knowledge";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  products?: AIProductSummary[];
  timestamp?: string;
}

const STARTER_PROMPTS = [
  "I need a device to measure color accuracy on flexible packaging",
  "Recommend a portable spectrophotometer for press checks",
  "What benchtop spectrophotometer is best for ink formulation?",
  "How can we automate artwork proofreading & barcode checks?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I am **Phoenix Color Intelligence AI**, your technical color consultant.\n\nAsk me anything about color measurement, spectrophotometers, ISO 12647 / G7 standardization, or tell me your application (e.g. *\"I need an instrument for color accuracy on flexible packaging\"*) to see instant product recommendations.",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: query,
      
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: "ai-" + Date.now(),
        role: "assistant",
        content: data.reply || "I am currently processing your request.",
        products: data.products || [],
        
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "assistant",
          content:
            "I encountered a temporary connection issue. Please try again or contact Phoenix Colour Technologies directly at **+971 4 000 0000**.",
          
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content:
          "Conversation cleared. How can I assist you with your color management or equipment requirements today?",
        
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-200 shadow-lg text-xs font-semibold text-slate-800 hover:text-[rgb(196,30,58)] hover:border-[rgb(196,30,58)] transition-all cursor-pointer animate-fade-in"
          >
            <Sparkles className="w-3.5 h-3.5 text-[rgb(196,30,58)] animate-pulse" />
            <span>Chat with Color AI</span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close AI Chat" : "Open AI Chat"}
          className={`relative p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer ${
            isOpen
              ? "bg-slate-900 text-white hover:bg-slate-800 rotate-90"
              : "bg-gradient-to-tr from-[rgb(15,23,66)] to-[rgb(196,30,58)] text-white hover:scale-110 ring-4 ring-rose-500/20"
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[rgb(196,30,58)] border-2 border-white"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[460px] h-[640px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[rgb(15,23,66)] via-[rgb(22,34,95)] to-[rgb(15,23,66)] text-white p-4 sm:p-5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
                <Sparkles className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold tracking-tight">Phoenix Color AI</h3>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live
                  </span>
                </div>
                <p className="text-[11px] text-white/70">
                  Technical Solutions & Product Advisor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClear}
                title="Restart chat"
                className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize"
                className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[rgb(15,23,66)] to-[rgb(196,30,58)] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-3`}>
                  <div
                    className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                      m.role === "user"
                        ? "bg-[rgb(15,23,66)] text-white rounded-br-sm"
                        : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-sm"
                    }`}
                  >
                    <div
                      className="whitespace-pre-line prose-xs"
                      dangerouslySetInnerHTML={{
                        __html: formatMarkdown(m.content),
                      }}
                    />
                  </div>

                  {/* Render Recommended Product Cards inside Assistant Bubble */}
                  {m.products && m.products.length > 0 && (
                    <div className="space-y-2.5 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[rgb(196,30,58)] flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" /> Recommended Instruments
                      </span>

                      <div className="grid grid-cols-1 gap-2.5">
                        {m.products.map((prod) => (
                          <div
                            key={prod.id}
                            className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
                          >
                            <div className="relative w-16 h-16 rounded-lg bg-[#f6f7f9] p-1 shrink-0 overflow-hidden border border-slate-100 flex items-center justify-center">
                              <Image
                                src={prod.image}
                                alt={prod.name}
                                fill
                                className="object-contain p-1 group-hover:scale-105 transition-transform"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <span className="text-[10px] font-semibold uppercase text-slate-500">
                                {prod.brand}
                              </span>
                              <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-[rgb(196,30,58)] transition-colors">
                                {prod.name}
                              </h4>
                              <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                                {prod.shortDescription}
                              </p>

                              <div className="mt-2 flex items-center gap-2">
                                <Link
                                  href={prod.canonicalUrl}
                                  onClick={() => setIsOpen(false)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-[rgb(15,23,66)] text-white hover:bg-[rgb(196,30,58)] transition-colors"
                                >
                                  View Specs
                                  <ArrowRight className="w-3 h-3" />
                                </Link>

                                <Link
                                  href={`/contact?subject=${encodeURIComponent(
                                    `Quote Request: ${prod.name}`
                                  )}`}
                                  onClick={() => setIsOpen(false)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                                >
                                  Request Quote
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[rgb(15,23,66)] to-[rgb(196,30,58)] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[rgb(196,30,58)] animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[rgb(196,30,58)] animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[rgb(196,30,58)] animate-bounce"></span>
                  <span className="text-xs text-slate-500 font-medium ml-2">
                    Analyzing technical catalog...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter Chips (Visible on initial state or when 1 message) */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200/60 overflow-x-auto flex gap-2 no-scrollbar">
              {STARTER_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="shrink-0 text-[11px] font-medium bg-white text-slate-700 hover:text-[rgb(196,30,58)] hover:border-[rgb(196,30,58)] border border-slate-200 px-3 py-1.5 rounded-full transition-all cursor-pointer shadow-2xs"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products, color accuracy, ISO 12647..."
                disabled={isLoading}
                className="flex-1 bg-slate-100 text-slate-900 placeholder:text-slate-500 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[rgb(196,30,58)]/20 focus:border-[rgb(196,30,58)] transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send Message"
                className="p-2.5 rounded-xl bg-[rgb(196,30,58)] text-white hover:bg-[rgb(170,24,48)] disabled:opacity-40 disabled:hover:bg-[rgb(196,30,58)] transition-all cursor-pointer shadow-sm shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-500 mt-2">
              Powered by Phoenix Color Intelligence Engine. Instant technical guidance.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// Basic markdown formatter for bolding, headings, and lists
function formatMarkdown(text: string): string {
  return text
    .replace(/^### (.*$)/gim, '<strong class="block text-slate-900 font-bold mt-2 mb-1">$1</strong>')
    .replace(/^## (.*$)/gim, '<strong class="block text-slate-900 font-bold mt-2 mb-1">$1</strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700">$1</li>');
}

