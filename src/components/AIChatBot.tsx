"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

// ─── Icons (inline SVGs to avoid external deps) ──────────────────────────────
function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
      <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
    </svg>
  );
}

function MessageCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function BotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7v1a2 2 0 01-2 2h-1v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1H5a2 2 0 01-2-2v-1a7 7 0 017-7h1V5.73A2 2 0 0112 2zM9.5 13a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

// ─── Typing Animation Dots ───────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-[#38BDF8] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#38BDF8]/20">
        <BotIcon className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="bg-[#111827]/80 border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-[chatBounce_1.4s_ease-in-out_infinite]" />
          <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-[chatBounce_1.4s_ease-in-out_0.2s_infinite]" />
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-[chatBounce_1.4s_ease-in-out_0.4s_infinite]" />
        </div>
      </div>
    </div>
  );
}

// ─── Message Bubble ──────────────────────────────────────────────────────────
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex items-end gap-2.5 animate-[chatSlideIn_0.3s_ease-out]", isUser && "flex-row-reverse")}>
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center shadow-lg",
          isUser
            ? "bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] shadow-[#8B5CF6]/20"
            : "bg-gradient-to-br from-[#38BDF8] to-[#8B5CF6] shadow-[#38BDF8]/20"
        )}
      >
        {isUser ? <UserIcon className="w-3.5 h-3.5 text-white" /> : <BotIcon className="w-3.5 h-3.5 text-white" />}
      </div>

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[80%] px-4 py-2.5 text-[13.5px] leading-relaxed backdrop-blur-sm whitespace-pre-wrap break-words",
          isUser
            ? "bg-gradient-to-r from-[#8B5CF6]/90 to-[#6D28D9]/90 text-white rounded-2xl rounded-br-md shadow-lg shadow-[#8B5CF6]/10"
            : "bg-[#111827]/80 border border-white/[0.06] text-[#E2E8F0] rounded-2xl rounded-bl-md"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

// ─── Quick Action Suggestions ────────────────────────────────────────────────
const SUGGESTIONS = [
  "What services do you offer?",
  "Tell me about your projects",
  "How can I get started?",
];

// ─── Main Chatbot Component ──────────────────────────────────────────────────
export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const sessionIdRef = useRef<string>(`session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);

  // Auto-scroll to latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, isMinimized]);

  // ─── Open / Close ────────────────────────────────────────────────────────
  const toggleChat = useCallback(() => {
    if (isMinimized) {
      setIsMinimized(false);
      return;
    }
    setIsOpen((prev) => !prev);
    setHasUnread(false);
  }, [isMinimized]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
  }, []);

  const minimizeChat = useCallback(() => {
    setIsMinimized(true);
  }, []);

  // ─── Send Message ────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    async (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, sessionId: sessionIdRef.current }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong.");
        }

        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          role: "ai",
          content: data.reply,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMsg]);

        // Show unread badge if chat is minimized
        if (isMinimized) {
          setHasUnread(true);
        }
      } catch (err) {
        const errorMsg: Message = {
          id: `error-${Date.now()}`,
          role: "ai",
          content:
            err instanceof Error
              ? err.message
              : "Sorry, something went wrong. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, isMinimized]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* ─── Inline Keyframes (no external CSS needed) ─────────────────────── */}
      <style jsx global>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes chatSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatPulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes chatFabIn {
          from { transform: scale(0) rotate(-180deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes chatWindowIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes chatWindowOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(20px) scale(0.95); }
        }
        @keyframes chatGradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Custom themed scrollbar for chat */
        .chat-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .chat-scrollbar::-webkit-scrollbar-track {
          background: rgba(11, 16, 32, 0.4);
          border-radius: 10px;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #38BDF8, #8B5CF6);
          border-radius: 10px;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #56ccf9, #a78bfa);
        }
        /* Firefox scrollbar */
        .chat-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #6D28D9 rgba(11, 16, 32, 0.4);
        }
      `}</style>

      {/* ─── Floating Action Button ────────────────────────────────────────── */}
      <button
        id="ai-chatbot-toggle"
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        className={cn(
          "fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full",
          "bg-gradient-to-br from-[#38BDF8] via-[#6D28D9] to-[#8B5CF6]",
          "flex items-center justify-center",
          "shadow-xl shadow-[#8B5CF6]/30",
          "hover:shadow-2xl hover:shadow-[#8B5CF6]/40 hover:scale-110",
          "active:scale-95",
          "transition-all duration-300 ease-out",
          "cursor-pointer",
          "md:w-[60px] md:h-[60px]"
        )}
        style={{ animation: "chatFabIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        {/* Pulse ring */}
        {!isOpen && (
          <span
            className="absolute inset-0 rounded-full bg-[#8B5CF6]/40"
            style={{ animation: "chatPulseRing 2s ease-out infinite" }}
          />
        )}

        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-[#060816] animate-pulse" />
        )}

        {/* Icon */}
        <span className="relative z-10 transition-transform duration-300">
          {isOpen ? (
            <XIcon className="w-6 h-6 text-white" />
          ) : (
            <MessageCircleIcon className="w-6 h-6 text-white" />
          )}
        </span>
      </button>

      {/* ─── Chat Window ───────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          id="ai-chatbot-window"
          ref={chatContainerRef}
          className={cn(
            "fixed z-[9998]",
            // Mobile: full screen
            "inset-0",
            // Desktop: positioned bottom-right
            "md:inset-auto md:bottom-24 md:right-6",
            "md:w-[400px] md:h-[600px]",
            "md:rounded-2xl",
            "flex flex-col",
            "bg-[#060816]/95 backdrop-blur-2xl",
            "md:border md:border-white/[0.08]",
            "md:shadow-2xl md:shadow-black/40",
            "overflow-hidden"
          )}
          style={{
            animation: "chatWindowIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* ─── Header ──────────────────────────────────────────────────── */}
          <div
            className="relative flex items-center justify-between px-5 py-4 border-b border-white/[0.06]"
            style={{
              background: "linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(139, 92, 246, 0.08))",
            }}
          >
            {/* Left - Bot Identity */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38BDF8] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#38BDF8]/20">
                  <SparklesIcon className="w-5 h-5 text-white" />
                </div>
                {/* Online indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#060816]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">
                  AK Assistant
                </h3>
                <p className="text-[11px] text-emerald-400/90 font-medium">
                  Online • Typically replies instantly
                </p>
              </div>
            </div>

            {/* Right - Window Controls */}
            <div className="flex items-center gap-1">
              <button
                id="ai-chatbot-minimize"
                onClick={minimizeChat}
                aria-label="Minimize chat"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-all duration-200 cursor-pointer"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <button
                id="ai-chatbot-close"
                onClick={closeChat}
                aria-label="Close chat"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ─── Messages Area ───────────────────────────────────────────── */}
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth chat-scrollbar"
          >
            {/* Welcome state */}
            {messages.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-[chatSlideIn_0.5s_ease-out]">
                <div
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#38BDF8]/20 to-[#8B5CF6]/20 border border-white/[0.06] flex items-center justify-center mb-5"
                  style={{
                    backgroundSize: "200% 200%",
                    animation: "chatGradientShift 3s ease infinite",
                  }}
                >
                  <SparklesIcon className="w-8 h-8 text-[#38BDF8]" />
                </div>
                <h4 className="text-base font-semibold text-white mb-1.5">
                  Hi there! 👋
                </h4>
                <p className="text-[13px] text-[#94A3B8] mb-6 max-w-[260px] leading-relaxed">
                  I&apos;m your AI assistant, ready to help with any questions about our
                  services, projects, or anything else.
                </p>

                {/* Suggestion chips */}
                <div className="flex flex-col gap-2 w-full max-w-[280px]">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-left text-[12.5px] px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[#94A3B8] hover:text-white hover:bg-white/[0.06] hover:border-[#38BDF8]/30 transition-all duration-200 cursor-pointer"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages list */}
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}

            {/* Typing indicator */}
            {isLoading && <TypingIndicator />}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* ─── Input Area ──────────────────────────────────────────────── */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-3 border-t border-white/[0.06] bg-[#0B1020]/60 backdrop-blur-sm"
          >
            <input
              ref={inputRef}
              id="ai-chatbot-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              autoComplete="off"
              className={cn(
                "flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5",
                "text-[13.5px] text-white placeholder:text-[#64748B]",
                "focus:outline-none focus:border-[#38BDF8]/40 focus:ring-1 focus:ring-[#38BDF8]/20",
                "transition-all duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            />
            <button
              id="ai-chatbot-send"
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                "transition-all duration-200 cursor-pointer",
                input.trim() && !isLoading
                  ? "bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] text-white shadow-lg shadow-[#8B5CF6]/20 hover:shadow-xl hover:scale-105 active:scale-95"
                  : "bg-white/[0.04] text-[#64748B] cursor-not-allowed"
              )}
            >
              <SendIcon className="w-4 h-4" />
            </button>
          </form>

          {/* ─── Footer Branding ─────────────────────────────────────────── */}
          <div className="px-4 py-2 text-center border-t border-white/[0.04]">
            <p className="text-[10px] text-[#475569] tracking-wider">
              Powered by <span className="text-[#38BDF8]/70 font-medium">AKTECH AI</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
