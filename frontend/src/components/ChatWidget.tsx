import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, ArrowDownCircle, CheckCircle2, ShieldCheck, RefreshCw, MessageSquare } from 'lucide-react';
import { ApiService, ChatMessage, Order } from '../services/api';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  initialMessage?: string;
  presetContext?: string;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  isOpen,
  onToggle,
  initialMessage,
  presetContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Welcome to Jucas Royale Atelier. I am your AI Sommelier & Banquet Concierge powered by Groq intelligence. How may I orchestrate your upcoming commission? You may inquire about wine pairings, tasting reservations, or custom dietary menus.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Recommend pairings for Royal Indian Feast',
    'Quote for 300 guests with Live BBQ station',
    'How is my banquet data stored in the database?',
    'Book a private chef tasting session',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle incoming preset context from calculator or menu showcase
  useEffect(() => {
    if (presetContext && isOpen) {
      handleSend(`I would like to discuss this quotation:\n${presetContext}`);
    }
  }, [presetContext, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const response = await ApiService.sendChatMessage(newMessages);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.reply,
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I am currently fine-tuning cellars with the backend. For an instant quote, kindly select our Live Estimator or contact our Head Sommelier directly at concierge@jucasroyale.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 text-noir-950 font-medium shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-noir-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-noir-950 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-noir-950" />
          </div>
          <div className="text-left">
            <div className="text-xs uppercase tracking-wider font-bold">AI Sommelier</div>
            <div className="text-[10px] text-noir-900/80 font-mono">Live Groq Concierge</div>
          </div>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[440px] h-[640px] max-h-[85vh] bg-noir-950 border border-gold-400/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-noir-900 via-noir-900 to-noir-850 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-noir-950 shadow-gold-glow">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-medium text-stone-100">
                    Groq AI Sommelier
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-gold-400/80 font-mono">
                  qwen/qwen3.8-27b • Spring Boot Connected
                </p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-stone-400 hover:text-stone-100 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-4 py-2.5 bg-noir-900/40 border-b border-white/5 overflow-x-auto flex gap-2 no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                disabled={loading}
                onClick={() => handleSend(prompt)}
                className="shrink-0 text-[11px] px-3 py-1 rounded-full bg-white/5 hover:bg-gold-400/15 text-stone-300 hover:text-gold-300 border border-white/5 hover:border-gold-400/30 transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-gold-400/20 border border-gold-400/30 text-gold-300 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-noir-950 font-medium rounded-tr-none'
                        : 'bg-noir-900/90 text-stone-200 border border-white/10 rounded-tl-none font-light'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-white/10 text-stone-300 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-3 items-center text-stone-400 text-xs font-mono">
                <div className="w-7 h-7 rounded-full bg-gold-400/20 border border-gold-400/30 text-gold-300 flex items-center justify-center">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-noir-900/80 border border-white/5 text-gold-400">
                  Sommelier is curating pairings...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-noir-900/90 border-t border-white/10">
            <div className="flex items-center gap-2 bg-noir-950 border border-white/10 focus-within:border-gold-400/50 rounded-xl px-3 py-1.5 transition-colors">
              <input
                type="text"
                placeholder="Inquire on menus, guest tiers, wine..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 bg-transparent text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-lg bg-gold-400 hover:bg-gold-300 disabled:opacity-30 text-noir-950 flex items-center justify-center transition-all shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="mt-2 text-[10px] text-center text-stone-500 font-mono">
              Direct connection to Spring Boot /api/chat • H2 SQL Persistence
            </div>
          </div>
        </div>
      )}
    </>
  );
};
