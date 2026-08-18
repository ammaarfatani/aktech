"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  RotateCcw,
  ArrowRight,
  ArrowDown,
  User,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface SmartLink {
  title: string;
  url: string;
}

interface ProjectHighlight {
  id: string;
  name: string;
  category: string;
  industry: string;
  url: string;
  tagline: string;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  smartLinks?: SmartLink[];
  suggestedPrompts?: string[];
  projectHighlights?: ProjectHighlight[];
  leadCapturePrompt?: boolean;
}

export function AIAssistant() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [showNewMessageIndicator, setShowNewMessageIndicator] = useState(false);
  const [isUserNearBottom, setIsUserNearBottom] = useState(true);

  // Lead Capture State
  const [leadName, setLeadName] = useState<string>("");
  const [leadContact, setLeadContact] = useState<string>("");
  const [leadService, setLeadService] = useState<string>("");
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize session & welcome message
  useEffect(() => {
    const existingSession = localStorage.getItem("aktech_ai_session_id");
    const sId = existingSession || `aktech-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    if (!existingSession) {
      localStorage.setItem("aktech_ai_session_id", sId);
    }
    setSessionId(sId);

    setMessages([
      {
        id: "welcome-1",
        sender: "ai",
        text: "Hi there! I'm **AKTech AI Agent**.\n\nI can help you explore our services, compare platforms (WordPress, Shopify, Next.js, CRM, ERP), view real client projects, or find the right solution for your business.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedPrompts: [
          "Explore Services",
          "Find the right solution",
          "View Projects",
          "Compare CRM vs ERP",
          "Explore Web Development",
          "Talk about your project"
        ]
      }
    ]);
  }, []);

  // Track whether user is scrolled near the bottom
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const threshold = 80;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold;
    setIsUserNearBottom(nearBottom);
    if (nearBottom) {
      setShowNewMessageIndicator(false);
    }
  }, []);

  // Smart auto-scroll: only scroll to bottom if user is near the bottom
  useEffect(() => {
    if (!isOpen) return;
    if (isUserNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      // User is scrolled up — show "new message" indicator for new AI messages
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.sender === "ai" && lastMsg.id !== "welcome-1") {
        setShowNewMessageIndicator(true);
      }
    }
  }, [messages, isOpen, isLoading, isUserNearBottom]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowNewMessageIndicator(false);
  };

  const handleSendMessage = async (customText?: string) => {
    const query = (customText || inputMessage).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputMessage("");
    setIsLoading(true);

    // When user sends a message, always scroll to bottom
    setIsUserNearBottom(true);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          currentPath: pathname,
          sessionId
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: data.reply || "I am AKTech AI Agent. How can I assist your business today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        smartLinks: data.smartLinks || [],
        suggestedPrompts: data.suggestedPrompts || [],
        projectHighlights: data.projectHighlights || [],
        leadCapturePrompt: data.leadCapturePrompt || false
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Assistant error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "ai",
          text: "I'm having a little trouble connecting right now. Please try again in a moment or visit our **[Contact Page](/contact)**.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          smartLinks: [{ title: "Contact AKTech →", url: "/contact" }]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: "ai",
        text: "Chat cleared! I'm **AKTech AI Agent**. How can I help you find the right digital solution today?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedPrompts: [
          "Explore Services",
          "Shopify vs WordPress",
          "Do I need a CRM or ERP?",
          "View Projects"
        ]
      }
    ]);
    setShowNewMessageIndicator(false);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadContact) return;

    setLeadSubmitted(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `lead-ack-${Date.now()}`,
        sender: "ai",
        text: `Thank you, **${leadName}**! We have received your inquiry for **${leadService || "Digital Services"}**. An AKTech engineer will reach out to you via **${leadContact}** shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        smartLinks: [{ title: "Explore Services →", url: "/services" }, { title: "View Projects →", url: "/portfolio" }]
      }
    ]);
  };

  /**
   * Render clean, human-friendly formatted text.
   * Accepts `isUserBubble` to adapt text/bullet colors for red user bubbles.
   */
  const renderCleanFormattedText = (text: string, isUserBubble: boolean) => {
    // Strip raw markdown heading prefixes
    const cleanedText = text.replace(/###\s+/g, "").replace(/##\s+/g, "").replace(/#\s+/g, "");
    const lines = cleanedText.split("\n");

    const textColor = isUserBubble ? "text-white" : "text-gray-800";
    const boldColor = isUserBubble ? "text-white" : "text-[#111111]";
    const bulletColor = isUserBubble ? "bg-white" : "bg-[#E0000B]";

    return lines.map((line, lIdx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={lIdx} className="h-1.5" />;

      // Numbered items like "1. Something"
      const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
      if (numberedMatch) {
        return (
          <div key={lIdx} className="flex items-start gap-2.5 my-1.5 pl-0.5">
            <span className={`text-[11px] font-bold ${isUserBubble ? "text-white/80" : "text-[#E0000B]"} mt-0.5 shrink-0 w-4 text-center`}>
              {numberedMatch[1]}.
            </span>
            <span className={`${textColor} leading-relaxed`}>{parseInlineFormatting(numberedMatch[2], isUserBubble)}</span>
          </div>
        );
      }

      // Bullet items
      if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
        return (
          <div key={lIdx} className="flex items-start gap-2.5 my-1.5 pl-0.5">
            <span className={`w-1.5 h-1.5 rounded-full ${bulletColor} shrink-0 mt-[7px]`} />
            <span className={`${textColor} leading-relaxed`}>{parseInlineFormatting(trimmed.substring(2), isUserBubble)}</span>
          </div>
        );
      }

      // Standard paragraph
      return (
        <p key={lIdx} className={`mb-1.5 leading-relaxed ${textColor}`}>
          {parseInlineFormatting(line, isUserBubble)}
        </p>
      );
    });
  };

  const parseInlineFormatting = (text: string, isUserBubble: boolean) => {
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    const boldClass = isUserBubble ? "font-bold text-white" : "font-bold text-[#111111]";
    const linkClass = isUserBubble
      ? "inline-flex items-center gap-1 font-bold text-white underline underline-offset-2 transition-colors mx-0.5"
      : "inline-flex items-center gap-1 font-bold text-[#E0000B] hover:underline underline-offset-2 transition-colors mx-0.5";

    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx} className={boldClass}>{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        return (
          <Link
            key={idx}
            href={linkMatch[2]}
            onClick={() => setIsOpen(false)}
            className={linkClass}
          >
            <span>{linkMatch[1]}</span>
            <ExternalLink className="w-3 h-3 inline" />
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* ═════════════════════════════════════════════════════════════
          1. AKTECH BRAND LAUNCHER BUTTON
             Positioned at bottom-24 right-6 — ABOVE WhatsApp (bottom-6 right-6)
         ═════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-24 right-6 z-[10001]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-white border border-gray-200/90 text-[#111111] shadow-2xl hover:border-[#E0000B] transition-all duration-300 group cursor-pointer"
          aria-label="Toggle AKTech AI Agent"
        >
          {/* Subtle Red Halo Glow */}
          <span className="absolute inset-0 rounded-full bg-[#E0000B]/5 group-hover:bg-[#E0000B]/10 transition-colors pointer-events-none" />

          {/* AKTech Official Logo */}
          <div className="relative w-6 h-6 shrink-0">
            <Image
              src="/logo.png"
              alt="AKTech Logo"
              fill
              className="object-contain"
            />
          </div>

          <span className="font-heading font-extrabold text-xs tracking-wider uppercase text-[#111111] group-hover:text-[#E0000B] transition-colors">
            AKTech AI Agent
          </span>

          {/* Live Indicator Dot */}
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        </motion.button>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          2. PREMIUM WHITE CHAT WINDOW — z-[10001] safe layer
             data-lenis-prevent stops Lenis from stealing wheel events
         ═════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
            className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-[10001] w-[calc(100vw-2rem)] sm:w-[420px] h-[560px] max-h-[calc(100vh-8rem)] rounded-3xl bg-white border border-gray-200/90 text-gray-900 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* ── HEADER (FIXED) ── */}
            <div className="shrink-0 p-4 border-b border-gray-100 bg-[#F8FAFC] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center p-1.5 shadow-sm">
                  <Image src="/logo.png" alt="AKTech" width={22} height={22} className="object-contain" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-[#111111]">
                    AKTech AI Agent
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Online • Ready to help</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  className="p-2 rounded-full hover:bg-gray-200/60 text-gray-400 hover:text-gray-700 transition-colors"
                  title="Clear Chat History"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-200/60 text-gray-400 hover:text-gray-700 transition-colors"
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── SCROLLABLE MESSAGE AREA ──
                data-lenis-prevent ensures Lenis smooth scroll does NOT
                capture wheel/touch events inside the chat container */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              data-lenis-prevent
              className="flex-1 min-h-0 p-4 overflow-y-auto overscroll-contain space-y-5 bg-[#F8FAFC]/50 text-[13px] sm:text-sm custom-scrollbar"
            >
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    {/* Sender Label */}
                    <div className={`flex items-center gap-1.5 mb-1.5 text-[10px] font-semibold uppercase tracking-wider ${isUser ? "text-gray-400" : "text-gray-400"}`}>
                      {!isUser ? (
                        <>
                          <div className="relative w-3.5 h-3.5 inline-block">
                            <Image src="/logo.png" alt="AKTech" fill className="object-contain" />
                          </div>
                          <span className="text-[#111111] font-bold">AKTech AI Agent</span>
                        </>
                      ) : (
                        <>
                          <span>You</span>
                          <User className="w-3 h-3 text-gray-400" />
                        </>
                      )}
                      <span>• {msg.timestamp}</span>
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[88%] p-4 rounded-2xl ${
                        isUser
                          ? "bg-[#E0000B] text-white rounded-tr-sm shadow-md"
                          : "bg-white border border-gray-200/80 text-gray-800 rounded-tl-sm shadow-sm"
                      }`}
                    >
                      {renderCleanFormattedText(msg.text, isUser)}

                      {/* SMART BUTTON LINKS — only for AI messages */}
                      {!isUser && msg.smartLinks && msg.smartLinks.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
                          {msg.smartLinks.map((link, lIdx) => (
                            <Link
                              key={lIdx}
                              href={link.url}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#111111] hover:bg-[#E0000B] text-white text-[11px] font-heading font-bold uppercase tracking-wider transition-all shadow-sm group/btn"
                            >
                              <span>{link.title}</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform text-[#E0000B] group-hover/btn:text-white" />
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* PROJECT HIGHLIGHT CARDS */}
                      {!isUser && msg.projectHighlights && msg.projectHighlights.length > 0 && (
                        <div className="mt-3.5 space-y-2">
                          {msg.projectHighlights.map((proj) => (
                            <Link
                              key={proj.id}
                              href={proj.url}
                              onClick={() => setIsOpen(false)}
                              className="block p-3 rounded-xl bg-[#F8FAFC] border border-gray-200 hover:border-[#E0000B] transition-all group/proj"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-bold text-[#111111] group-hover/proj:text-[#E0000B] transition-colors">
                                  {proj.name}
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover/proj:text-[#E0000B]" />
                              </div>
                              <span className="text-[10px] text-gray-500 font-medium block">
                                {proj.category} • {proj.industry}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}

                      {/* INLINE LEAD CAPTURE FORM */}
                      {!isUser && msg.leadCapturePrompt && !leadSubmitted && (
                        <form onSubmit={handleLeadSubmit} className="mt-3.5 pt-3 border-t border-gray-100 space-y-2.5">
                          <input
                            type="text"
                            placeholder="Your Name"
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#E0000B] transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="Email or WhatsApp Number"
                            value={leadContact}
                            onChange={(e) => setLeadContact(e.target.value)}
                            required
                            className="w-full px-3 py-2 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#E0000B] transition-colors"
                          />
                          <input
                            type="text"
                            placeholder="Service Required (e.g. Web Dev, CRM, AI)"
                            value={leadService}
                            onChange={(e) => setLeadService(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#E0000B] transition-colors"
                          />
                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-xl bg-[#E0000B] text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#C00009] transition-colors"
                          >
                            Submit Inquiry
                          </button>
                        </form>
                      )}
                    </div>

                    {/* QUICK ACTION CHIPS */}
                    {!isUser && msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {msg.suggestedPrompts.map((promptText, pIdx) => (
                          <button
                            key={pIdx}
                            onClick={() => handleSendMessage(promptText)}
                            className="px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:border-[#E0000B] hover:bg-[#E0000B] text-gray-700 hover:text-white text-[11px] font-semibold transition-all shadow-xs cursor-pointer"
                          >
                            {promptText}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* THINKING INDICATOR */}
              {isLoading && (
                <div className="flex items-start gap-1.5">
                  <div className="relative w-3.5 h-3.5 mt-0.5 shrink-0">
                    <Image src="/logo.png" alt="AKTech" fill className="object-contain" />
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-gray-200 shadow-xs">
                    <span className="text-[11px] font-semibold text-gray-500">Thinking</span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E0000B] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E0000B] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E0000B] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* ── "NEW MESSAGE" SCROLL-TO-BOTTOM INDICATOR ── */}
            <AnimatePresence>
              {showNewMessageIndicator && (
                <motion.button
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-[76px] left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111111] text-white text-[11px] font-semibold shadow-lg hover:bg-[#E0000B] transition-colors z-10 cursor-pointer"
                >
                  <ArrowDown className="w-3 h-3" />
                  <span>New message</span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* ── INPUT BAR (FIXED) ── */}
            <div className="shrink-0 p-3.5 border-t border-gray-100 bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask AKTech AI Agent about services, solutions, projects..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#E0000B] focus:bg-white transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="w-11 h-11 rounded-xl bg-[#E0000B] text-white flex items-center justify-center hover:bg-[#C00009] disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0 shadow-sm cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
