import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User, RefreshCw, Sparkles } from 'lucide-react';
import { ApiService, ChatMessage } from '../services/api';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
  presetContext?: string;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({
  isOpen,
  onToggle,
  presetContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Welcome to Jucas Royale Atelier. I am your AI Sommelier & Banquet Concierge powered by Groq real-time intelligence. How may I orchestrate your upcoming dining commission? You may inquire about wine cellar pairings, private chef tastings, or tailored dietary protocols.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Recommend wine pairings for Royal Awadhi Feast',
    'Quote for 300 guests with Live BBQ smokehouse',
    'Book a private chef tasting session',
    'Explain strict Jain & allergen segregation protocols',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (presetContext && isOpen) {
      handleSend(`I would like to consult on this quotation:\n${presetContext}`);
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
            "I am currently reviewing reserve cellar allocations with the atelier. For immediate date holds, please use our Live Estimator or reach our Head Sommelier directly at concierge@jucasroyale.com.",
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
      {/* Discreet Quiet Luxury Floating Trigger */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 px-4 py-3 rounded-sm bg-espresso text-ivory border border-gold/40 shadow-elevated hover:bg-espresso-charcoal hover:border-gold transition-all duration-300"
        >
          <div className="w-2 h-2 rounded-full bg-gold" />
          <div className="text-left">
            <div className="text-[11px] uppercase tracking-[0.16em] font-medium text-ivory">
              AI Sommelier
            </div>
            <div className="text-[9px] text-taupe-light font-mono">Live Atelier Concierge</div>
          </div>
        </button>
      )}

      {/* Elegant Quiet Luxury Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[440px] h-[620px] max-h-[85vh] bg-ivory border border-beige rounded-sm shadow-luxe flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="px-6 py-4 bg-espresso text-ivory flex items-center justify-between border-b border-espresso-surface">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm border border-gold/40 flex items-center justify-center text-gold font-serif">
                J
              </div>
              <div>
                <h3 className="font-serif text-lg font-light text-ivory">
                  Atelier Sommelier Concierge
                </h3>
                <p className="text-[10px] text-gold font-mono">
                  Groq qwen3.8-27b • Spring Boot Connected
                </p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="text-taupe-light hover:text-ivory transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-4 py-2.5 bg-champagne-light border-b border-beige overflow-x-auto flex gap-2 no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                disabled={loading}
                onClick={() => handleSend(prompt)}
                className="shrink-0 text-[10px] px-3 py-1 rounded-sm bg-ivory text-espresso border border-beige hover:border-gold transition-colors font-medium"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-ivory-light">
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={index}
                  className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-sm bg-champagne border border-beige text-gold flex items-center justify-center shrink-0 mt-0.5 text-xs font-serif">
                      J
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-sm text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-espresso text-ivory font-normal'
                        : 'bg-ivory text-espresso border border-beige font-light shadow-xs'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-sm bg-espresso text-ivory flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      <User className="w-3 h-3 text-gold" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-3 items-center text-taupe text-xs font-mono">
                <div className="w-6 h-6 rounded-sm bg-champagne border border-beige flex items-center justify-center text-gold">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                </div>
                <div className="px-3.5 py-2 rounded-sm bg-ivory border border-beige text-taupe font-light">
                  Sommelier is curating recommendations...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3.5 bg-ivory border-t border-beige">
            <div className="flex items-center gap-2 bg-ivory-light border border-beige focus-within:border-espresso rounded-sm px-3 py-2 transition-colors">
              <input
                type="text"
                placeholder="Inquire on wine, tasting reservations, dietary..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 bg-transparent text-xs text-espresso placeholder-taupe/60 focus:outline-none font-light"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="px-3 py-1 bg-espresso hover:bg-espresso-charcoal disabled:opacity-40 text-ivory text-xs uppercase tracking-wider font-medium rounded-sm transition-all"
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-[9px] text-center text-taupe font-mono">
              Inference via Spring Boot /api/chat • Persistent SQL Architecture
            </div>
          </div>
        </div>
      )}
    </>
  );
};
