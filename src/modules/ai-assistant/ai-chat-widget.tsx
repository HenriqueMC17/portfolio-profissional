"use client";

import { useChat, type Message } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import { X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        id: "sys-welcome",
        role: "assistant",
        content: "Olá. Sou o assistente virtual do Henrique. Estou aqui para responder suas dúvidas sobre sua stack, senioridade e histórico técnico. O que você gostaria de saber?"
      }
    ]
  });

  // Auto-scroll para baixo a cada mensagem streamada
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      {/* Botão de Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-8 right-8 z-50 flex items-center justify-center p-4 rounded-full bg-cobalt-blue/90 text-white shadow-xl shadow-cobalt-blue/20 hover:scale-105 transition-all duration-300 backdrop-blur-md",
          isOpen ? "rotate-90 opacity-0 pointer-events-none scale-50" : "rotate-0 opacity-100 scale-100"
        )}
        aria-label="Abrir assistente de IA"
      >
        <Sparkles className="size-6 relative z-10" />
      </button>

      {/* Janela de Chat */}
      <div
        className={cn(
          "fixed bottom-8 right-8 z-50 w-[380px] h-[550px] max-w-[calc(100vw-40px)] max-h-[calc(100vh-100px)] flex flex-col bg-background-primary/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden",
          isOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "translate-y-8 opacity-0 pointer-events-none"
        )}
      >
        {/* Chat Header */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="size-8 rounded-full bg-cobalt-blue/20 flex items-center justify-center">
                <Bot className="size-4 text-cobalt-blue" aria-hidden="true" />
              </div>
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-500 border-2 border-background-primary" aria-label="Status Online" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white leading-tight">AI Recruiter Agent</h3>
              <p className="text-[10px] uppercase tracking-widest text-text-muted font-mono">Powered by Gemini</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Fechar assistente de IA"
            className="p-2 text-text-muted hover:text-white hover:bg-white/10 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </header>

        {/* Chat Messages */}
        <div 
          className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col gap-4"
          role="log"
          aria-live="polite"
        >
          {messages.map((message: Message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 max-w-[85%]",
                message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "size-7 rounded-full flex flex-shrink-0 items-center justify-center",
                message.role === "user" ? "bg-white/10" : "bg-cobalt-blue/20"
              )}>
                {message.role === "user" ? <User className="size-4 text-text-secondary" aria-hidden="true" /> : <Bot className="size-4 text-cobalt-blue" aria-hidden="true" />}
              </div>
              <div
                className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed",
                  message.role === "user" 
                    ? "bg-white/10 text-white rounded-tr-sm" 
                    : "bg-surface-glass border border-white/5 text-text-secondary rounded-tl-sm"
                )}
              >
                {/* Aqui poderíamos acoplar react-markdown, por simplificação exibiremos texto cru */}
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && messages[messages.length -1]?.role === "user" && (
            <div className="flex items-center gap-2 text-text-muted text-xs mr-auto bg-surface-glass border border-white/5 p-3 rounded-2xl rounded-tl-sm" role="status">
              <Loader2 className="size-3 animate-spin" aria-hidden="true" />
              <span>Sintetizando resposta...</span>
            </div>
          )}

          {error && (
            <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 p-3 rounded-xl text-center" role="alert">
              Desculpe, ocorreu uma falha de conexão com a interface neural. Tente novamente.
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <footer className="p-4 bg-white/5 border-t border-white/5">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-background-primary/50 border border-white/10 p-1.5 rounded-full focus-within:border-cyber-cyan/50 transition-colors"
          >
            <label htmlFor="ai-chat-input" className="sr-only">Sua pergunta para a IA</label>
            <input
              id="ai-chat-input"
              className="flex-1 bg-transparent border-none outline-none px-4 text-sm text-white placeholder:text-text-muted"
              value={input}
              placeholder="Pergunte sobre minhas skills..."
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Enviar mensagem"
              className="p-2.5 rounded-full bg-cobalt-blue text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan"
            >
              <Send className="size-4 -ml-0.5 mt-0.5" aria-hidden="true" />
            </button>
          </form>
        </footer>
      </div>
    </>
  );
}
