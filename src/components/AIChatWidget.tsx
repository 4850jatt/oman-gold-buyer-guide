import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, User, Bot, HelpCircle } from 'lucide-react';

interface AIChatWidgetProps {
  lang: 'ar' | 'en';
}

export default function AIChatWidget({ lang }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; isDemo?: boolean }>>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add initial greeting on first open
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          text: lang === 'ar'
            ? 'أهلاً بك يا أخي/أختي المشتري. أنا "الخنجي"، خبير تداول الذهب والمجوهرات بالسلطنة. كيف يمكنني إرشادك اليوم لتتسوق بذكاء وتتجنب التلاعب بالمصنعية في أسواق مسقط مطرح وروي؟'
            : 'Welcome, respected guest. I am "Al-Khonji", your Omani precious metals trading advisor. How can I guide your purchases today to bargain effectively and verify hallmarks inside Mutrah or Ruwi Souqs?'
        }
      ]);
    }
  }, [isOpen, lang]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg = inputText.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { sender: 'bot', text: data.text, isDemo: data.isDemo }]);
      } else {
        setMessages(prev => [
          ...prev, 
          { 
            sender: 'bot', 
            text: lang === 'ar'
              ? 'معذرة، لم أستطع الاتصال بالخادم الرئيسي حالياً. يرجى التأكد من اتصال الإنترنت وإعادة التجربة.'
              : 'I apologize, I could not reach Al-Khonji database. Please verify your connection and try again.'
          }
        ]);
      }
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: lang === 'ar'
            ? 'خطأ في معالجة طلب المحادثة العمانية. هل ترغب بسؤالي عن عيارات الذهب بدلاً من ذلك؟'
            : 'Error communicating with gold advisor feed. Would you like to check Omani Karats instead?'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const setPresetQuestion = (q: string) => {
    setInputText(q);
  };

  const presets = lang === 'ar' ? [
    'كيف أتفاوض على المصنعية في سوق روي؟',
    'ما الفرق بين عيار ٢٢ وعيار ٢٤ للاستثمار؟',
    'كيف أتحقق من دمغة وزارة التجارة العمانية؟',
  ] : [
    'How do I negotiate making charges in Muttrah Souq?',
    'What is the difference between 24K and 22K for saving?',
    'How do I spot the MOCIIP hallmark stamp?',
  ];

  return (
    <div className="fixed bottom-6 z-50 transition-all duration-300" style={{ right: lang === 'ar' ? 'auto' : '24px', left: lang === 'ar' ? '24px' : 'auto' }}>
      
      {/* Floating Circular Bubble button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] hover:bg-[#8B6F3D] text-black shadow-2xl transition-transform duration-300 hover:scale-110 border-2 border-white/20 active:scale-95 glow-gold cursor-pointer"
          id="chat-floating-button"
        >
          <MessageSquare className="w-6 h-6 animate-pulse" />
        </button>
      )}

      {/* Expanded Luxury Window */}
      {isOpen && (
        <div className="w-[330px] md:w-[380px] h-[500px] bg-[#0E1626] border-2 border-[#D4AF37] rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden relative fade-in">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#8B6F3D] to-[#0F172A] p-4 text-white flex items-center justify-between border-b border-[#D4AF37]/20">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <Bot className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-tight">
                  {lang === 'ar' ? 'الخنجي • خبير الذهب العماني' : 'Al-Khonji • Gold Expert'}
                </h4>
                <span className="text-[10px] text-emerald-400 font-mono font-medium block">
                  ● {lang === 'ar' ? 'مستشار مباشر نشط' : 'Online OMR Advisor'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/40">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 max-w-[85%] ${m.sender === 'user' ? (lang === 'ar' ? 'mr-auto flex-row-reverse' : 'ml-auto flex-row') : 'mr-0'}`}
                style={{ marginLeft: m.sender === 'user' ? 'auto' : '0', marginRight: m.sender === 'user' ? '0' : 'auto' }}
              >
                {m.sender === 'bot' && (
                  <div className="h-6 w-6 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </div>
                )}
                
                <div>
                  <div className={`p-3 rounded-2xl text-xs md:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#D4AF37] text-black font-medium rounded-tr-none'
                      : 'bg-slate-900 border border-[#D4AF37]/15 text-gray-200 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                  {m.isDemo && (
                    <span className="text-[9px] text-[#D4AF37] opacity-60 mt-1 block font-mono">
                      * Demo AI simulated feedback *
                    </span>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 max-w-[80%] items-center">
                <div className="h-6 w-6 rounded-full bg-[#D4AF37]/10 justify-center flex items-center">
                  <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
                </div>
                <div className="bg-slate-900 p-3 rounded-xl rounded-tl-none border border-slate-800 text-xs">
                  <div className="flex gap-1.5 items-center">
                    <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="h-1.5 w-1.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick preset chips */}
          {messages.length < 3 && (
            <div className="px-4 py-2 bg-[#0A0F1D] flex flex-wrap gap-1.5 border-t border-[#D4AF37]/10">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setPresetQuestion(p)}
                  className="text-[10px] bg-slate-900 hover:bg-[#D4AF37]/10 text-gray-400 hover:text-[#D4AF37] border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 px-2 py-1 rounded-full cursor-pointer transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-[#0F172A] border-t border-[#D4AF37]/10 flex gap-2 items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={lang === 'ar' ? 'اسأل الخبير العماني المباشر...' : 'Query Al-Khonji gold index...'}
              className="flex-1 bg-slate-900 border border-[#D4AF37]/20 rounded-xl py-2 px-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="h-9 w-9 bg-[#D4AF37] text-black hover:bg-[#8B6F3D] rounded-xl flex items-center justify-center cursor-pointer transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
