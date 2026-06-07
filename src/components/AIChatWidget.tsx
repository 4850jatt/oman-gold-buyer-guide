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

      const contentType = response.headers.get("content-type");
      if (response.ok && contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setMessages(prev => [...prev, { sender: 'bot', text: data.text, isDemo: data.isDemo }]);
      } else {
        throw new Error("Backend offline or non-JSON returned");
      }
    } catch (e) {
      console.warn("AI Chat server endpoint unavailable, invoking local Omani Gold advisory matrix fallback:", e);
      
      // Determine user intent and formulate dynamic expert responses client-side
      const msgLower = userMsg.toLowerCase();
      let reply = "";

      if (lang === 'ar') {
        if (msgLower.includes('مصنعية') || msgLower.includes('تفاوض') || msgLower.includes('خصم') || msgLower.includes('أجور') || msgLower.includes('اجور')) {
          reply = "للتفاوض على المصنعية (أجور الصياغة) بأسواق عمان، اطلب من الصائغ أولاً فصل كلفة جرام الذهب الأساسي لليوم بالكامل عن كلفة العمل اليدوي. للآلات والقصات البسيطة، يجب ألا تتجاوز المصنعية 1.5 إلى 2 ريال عماني للجرام بحد أقصى. أما القطع الفنية التراثية يدوية الصنع الراقية، فتتراوح بين 3 إلى 3.5 ر.ع. واجه البائع بثقة واطلب دائماً المفاصلة بعبارة 'عطيني مفاوضة جميلة تليق بك'!";
        } else if (msgLower.includes('عيار') || msgLower.includes('22') || msgLower.includes('24') || msgLower.includes('21') || msgLower.includes('18') || msgLower.includes('نقاء')) {
          reply = "التصنيفات المعتمدة للذهب في سلطنة عمان تحت رقابة دائرة فحص المعادن:\n- عيار 24 (99.9% نقاء): دهب خالص نقي جداً، مخصص للسبائك والليرات الاستثمارية (Suja).\n- عيار 22 (91.6% نقاء): المعيار الخليجي الكلاسيكي للأعراس والقلائد الفاخرة لجماله وقوته.\n- عيار 21 (87.5% نقاء): متين وممتاز للأساور والاستعمال اليومي المتكرر.\n- عيار 18 (75.0% نقاء): قوي جداً ويستخدم غالباً في قطع الألماس لضمان ثبات الأحجار الكريمة.";
        } else if (msgLower.includes('دمغة') || msgLower.includes('طابع') || msgLower.includes('ختم') || msgLower.includes('وزارة') || msgLower.includes('تجارة') || msgLower.includes('mociip')) {
          reply = "تلزم قوانين وزارة التجارة والصناعة وترويج الاستثمار العمانية (MOCIIP) بوجود دمغات فحص مجهرية على كل حلي تباع بمسقط. ابحث عن ختم '916' لعيار 22، وختم '875' لعيار 21، وختم '750' لعيار 18. وتأكد من وجود رمز الخنجر الصغير الدال على الدمغة الرسمية. تجنب الصاغة الذين يعارضون تسليمك فاتورة مفصلة بالجرام والعيار وبدون دمغة!";
        } else {
          reply = "أهلاً بك! أنا مرشدك الذكي 'الخنجي' لخبراء الذهب العماني. كخبير مالي متمرس، أنصحك دوماً بفصل 'أجور المصنعية' عن سعر الذهب الخام وتتبع مؤشرنا اللحظي. يمكنك سؤالي عن دمغات وزارة التجارة (MOCIIP)، أو طرق خفض الأسعار بنسبة 30%، أو شراء دليلك الاستثماري الفاخر المباشر بـ ٣.٩٩ ر.ع فقط لادخار مضمون.";
        }
      } else {
        if (msgLower.includes('negotiate') || msgLower.includes('charge') || msgLower.includes('making') || msgLower.includes('bargain') || msgLower.includes('masna')) {
          reply = "To negotiate making charges (Al-Masna'eyah) in Omani gold souqs like Muttrah or Ruwi, always demand the seller to isolate the raw metal weight from their labor fees. Machine-made items should carry 1.5 to 2.0 OMR per gram maximum. High-end traditional Omani hand-filigree works go around 3 to 3.5 OMR/g. Use friendly local phrases like 'Kam aakhir mufawadah?' to secure a 30% markdown!";
        } else if (msgLower.includes('karat') || msgLower.includes('22') || msgLower.includes('24') || msgLower.includes('21') || msgLower.includes('18') || msgLower.includes('purity')) {
          reply = "Regulated gold purities in the Sultanate of Oman are strictly monitored:\n- 24K (99.9% pure): Ultra-rich golden color, very malleable. Reserved exclusively for investment bullion bars & commemorative sovereign coins.\n- 22K (91.6% pure / 916 Stamp): The default gulf bridal standard. Perfect balance of gold luster and structural strength.\n- 21K (87.5% pure): Sturdy, great for daily necklaces.\n- 18K (75.0% pure): Highest durability, optimal for holding heavy premium diamonds and gemstones securely.";
        } else if (msgLower.includes('hallmark') || msgLower.includes('stamp') || msgLower.includes('mociip') || msgLower.includes('ministry') || msgLower.includes('fake') || msgLower.includes('seal')) {
          reply = "Under Omani consumer protection watch, all legal jewelry must bear official micro-milled stamp markings regulated by the Ministry of Commerce (MOCIIP): '916' for 22K, '875' for 21K, and '750' for 18K. These stamps sit beside the tiny Omani Khanjar certification icon of purity. Never buy physical items that lack these official markings!";
        } else {
          reply = "Welcome to Al-Khonji Gold Advisor! I am your premium trading partner. To maximize your wealth in Muscat's physical Souqs, you must focus on the core gold weight and limit craftsmanship premiums. Ask me anything about making charge negotiation tactics, official MOCIIP hallmarks, or get our licensed buyer handbook for a discounted bargain of 3.99 OMR!";
        }
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply, isDemo: true }]);
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
