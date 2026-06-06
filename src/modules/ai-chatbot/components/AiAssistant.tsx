"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User, Loader2, MessageSquare } from "lucide-react";
import { cn } from "@/utils/cn";

export function AiAssistant() {
  const params = useParams();
  const pathname = usePathname();
  const lang = (params?.lang as string) || "pt";
  const isPt = lang === "pt";

  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Não renderizar o chatbot em rotas do painel admin ou de login
  const isAdminOrLogin = pathname?.includes("/admin") || pathname?.includes("/login");

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    streamProtocol: "text",
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (isAdminOrLogin) return null;

  const dictionary = {
    title: isPt ? "Assistente IA" : "AI Assistant",
    subtitle: isPt ? "Pergunte sobre a carreira de Henrique" : "Ask about Henrique's career",
    placeholder: isPt ? "Pergunte-me qualquer coisa..." : "Ask me anything...",
    welcome: isPt 
      ? "Olá! Eu sou o assistente do Henrique. Pergunte-me sobre sua experiência, projetos ou competências!"
      : "Hi! I am Henrique's assistant. Ask me about his experience, projects, or skills!",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
            }}
            className="w-[350px] sm:w-[400px] h-[500px] glass-premium rounded-2xl flex flex-col overflow-hidden mb-4 shadow-2xl border border-white/15"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-primary-600/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-primary-500/20 text-primary-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white leading-none mb-1">
                    {dictionary.title}
                  </h3>
                  <p className="text-[10px] text-white/50 leading-none">
                    {dictionary.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Welcome message */}
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-400 shrink-0 border border-primary-500/20">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl rounded-tl-none bg-white/5 text-white/90 text-sm leading-relaxed border border-white/5">
                  {dictionary.welcome}
                </div>
              </div>

              {messages.map((message, idx) => {
                const isUser = message.role === "user";
                const isLastAndStreaming = isLoading && idx === messages.length - 1 && message.role === "assistant";

                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300",
                      isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center shrink-0 border",
                        isUser
                          ? "bg-accent/10 text-accent border-accent/20"
                          : "bg-primary-500/10 text-primary-400 border-primary-500/20"
                      )}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed border",
                        isUser
                          ? "rounded-tr-none bg-accent/10 border-accent/20 text-white"
                          : "rounded-tl-none bg-white/5 border-white/5 text-white/90",
                        isLastAndStreaming && "ai-cursor"
                      )}
                    >
                      {message.content}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-white/10 bg-black/10 flex items-center gap-2"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder={dictionary.placeholder}
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary-500/50 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white disabled:opacity-40 disabled:hover:bg-primary-600 transition-colors flex items-center justify-center cursor-pointer shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-500 text-white shadow-lg flex items-center justify-center cursor-pointer transition-colors relative group animate-in fade-in zoom-in duration-500 delay-500"
        aria-label="Toggle AI assistant"
      >
        <div className="absolute inset-0 rounded-full bg-primary-600/30 blur-md group-hover:blur-lg transition-all opacity-80" />
        <div className="z-10 relative">
          {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </div>
      </motion.button>
    </div>
  );
}
