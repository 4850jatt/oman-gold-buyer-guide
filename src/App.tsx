import React, { useState, useEffect } from 'react';
import { 
  CHANNELS_OF_GOLD_GUIDE, 
  TESTIMONIALS_SAMPLE, 
  FAQ_LIST, 
  BLOG_ARTICLES_LIST 
} from './data';
import { GoldPrice, Order, Lead, AdminAnalytics, PDFChapter, BlogArticle } from './types';
import MetalDashboard from './components/MetalDashboard';
import Calculators from './components/Calculators';
import ThreeCanvas from './components/ThreeCanvas';
import AIChatWidget from './components/AIChatWidget';

import { 
  ChevronDown, 
  Phone, 
  Mail, 
  Award, 
  Percent, 
  Star, 
  BookOpen, 
  AlertCircle, 
  Sparkles, 
  LayoutDashboard, 
  Globe, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  ShieldCheck, 
  ShoppingCart, 
  ShoppingBag, 
  Eye, 
  Lock, 
  FileText, 
  CheckCircle2, 
  Menu, 
  X, 
  Clock, 
  HelpCircle,
  TrendingUp,
  ExternalLink,
  Users,
  RefreshCw
} from 'lucide-react';

export default function App() {
  // Global States
  const [lang, setLang] = useState<'ar' | 'en'>('ar'); // Arabian Primary
  const [activePage, setActivePage] = useState<'home' | 'about' | 'preview' | 'blog' | 'contact' | 'admin'>('home');
  const [currentPrices, setCurrentPrices] = useState<GoldPrice>({
    karat24: 26.850,
    karat22: 24.610,
    karat21: 23.490,
    karat18: 20.140,
    silver: 0.355,
    updatedAt: new Date().toISOString()
  });

  // Urgency Timer
  const [timeLeft, setTimeLeft] = useState<{ min: number; sec: number }>({ min: 14, sec: 59 });

  // Lead capture state
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);
  const [showExitPopup, setShowExitPopup] = useState<boolean>(false);

  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutName, setCheckoutName] = useState<string>('');
  const [checkoutEmail, setCheckoutEmail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'apple' | 'google'>('stripe');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);
  const [generatedOrder, setGeneratedOrder] = useState<any>(null);

  // Active readers states
  const [selectedChapter, setSelectedChapter] = useState<PDFChapter | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  
  // Flipbook active page
  const [flipbookIndex, setFlipbookIndex] = useState<number>(0);

  // Admin and analytics states
  const [adminStats, setAdminStats] = useState<any>(null);
  const [adminUploadTitle, setAdminUploadTitle] = useState<string>('');
  const [adminUploadSuccess, setAdminUploadSuccess] = useState<boolean>(false);

  // Contact form state
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactMsg, setContactMsg] = useState<string>('');
  const [contactSubmitted, setContactSubmitted] = useState<boolean>(false);

  // Flipbook pages to render
  const flipbookPages = [
    {
      titleEn: "Welcome Page",
      titleAr: "صفحة الترحيب بالدليل",
      descEn: "Introduction to Omani Gold souqs, where pure physical gold meets a culture of absolute trust.",
      descAr: "مقدمة شاملة لأسواق الذهب العمانية التقليدية حيث يلتقي النقاء والأمان المالي بثقافة الأمانة المطلقة.",
      highlightsEn: ["Cultural history of Muscat Souqs", "Regulatory security oversight", "The separation formula"],
      highlightsAr: ["التاريخ العريق لأسواق مسقط", "أدلة الرقابة والجودة الحكومية", "مفهوم فصل السعر والمصنعية"]
    },
    {
      titleEn: "Chapter 4: Real vs Fake",
      titleAr: "الفصل ٤: الذهب الأصيل والمغشوش",
      descEn: "Practical home tests including magnetic alignment, specific gravity calculation, and color traces.",
      descAr: "تقنيات فتاكة للفحص بالمنزل: فحص الوزن النوعي، واختبارات القوة المغناطيسية السائبة، وخدوش الخزف.",
      highlightsEn: ["Archimedes displacement calculation", "Tungsten vs lead core plating detection", "Acid-drop triggers"],
      highlightsAr: ["حسابات الكثافة والوزن النوعي", "فحص النواة الفولاذية والحديدية", "آليات تفاعل قطرات أحماض النيتريك"]
    },
    {
      titleEn: "Chapter 5: Omani Hallmarks",
      titleAr: "الفصل ٥: دليل طوابع الدمغة",
      descEn: "Decipher stamps, symbols and laboratory certifications of the Ministry of Commerce (MOCIIP) in Oman.",
      descAr: "أشكال ونماذج طوابع الفحص ومختبرات دمغ ومطابقة المعادن المعتمدة لوزارة التجارة بمسقط.",
      highlightsEn: ["916 engraving stamps for 22K", "Official crown symbols decoding", "Visual assay checkmarks"],
      highlightsAr: ["دمغة الرقم '916' لعيار ٢٢", "رموز الفحص المخبري الحكومي", "فروقات الذهب المستورد والمصاغ محليا"]
    },
    {
      titleEn: "Chapter 10: Negotiating Code",
      titleAr: "الفصل ١٠: قواعد فصاحة التفاوض",
      descEn: "Arabic phrases, timing strategies and behavioral anchors that lower making charge rates by 50%.",
      descAr: "أسرار المفاوضة بأسواق مطرح ونزوى. مصطلحات عربية للتداول وخفض فروقات أجور المصنعية.",
      highlightsEn: ["Decoupling labor from metal weight", "Identifying shop markup limits", "Traditional conversational code"],
      highlightsAr: ["مهارات حصر الصائغ في المصنعية الصافية", "فك شفرات تسعير العرض والطلب", "المصطلحات الودية المقنعة"]
    }
  ];

  // Load Admin Data on demand
  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(res => res.json())
      .then(data => setAdminStats(data))
      .catch(err => console.log("Failed to fetch admin stats:", err));
  }, [checkoutSuccess, leadSubmitted]);

  // Fetch real-time Omani gold rates from our live market endpoint on mount
  useEffect(() => {
    // Client-side direct fallback option in case backend is missing/404 or statically served on static hosts
    const fetchDirectFallback = async () => {
      try {
        const [goldRes, silverRes] = await Promise.all([
          fetch('https://api.gold-api.com/price/XAU'),
          fetch('https://api.gold-api.com/price/XAG')
        ]);
        if (!goldRes.ok || !silverRes.ok) return;
        const goldData = await goldRes.json();
        const silverData = await silverRes.json();
        const goldUsd = goldData?.price;
        const silverUsd = silverData?.price;
        
        if (typeof goldUsd === 'number' && typeof silverUsd === 'number') {
          const goldGramUsd = goldUsd / 31.1034768;
          const karat24 = parseFloat((goldGramUsd * 0.3845).toFixed(3));
          
          const silverGramUsd = silverUsd / 31.1034768;
          const silver = parseFloat((silverGramUsd * 0.3845).toFixed(3));
          
          const karat22 = parseFloat((karat24 * 0.9167).toFixed(3));
          const karat21 = parseFloat((karat24 * 0.875).toFixed(3));
          const karat18 = parseFloat((karat24 * 0.750).toFixed(3));

          setCurrentPrices({
            karat24,
            karat22,
            karat21,
            karat18,
            silver,
            updatedAt: new Date().toISOString()
          });
        }
      } catch (err) {
        console.warn("Direct live Omani gold API fetch failed on static client:", err);
      }
    };

    fetch('/api/gold-rates')
      .then(res => {
        if (!res.ok) throw new Error("Backend response not OK");
        return res.json();
      })
      .then(data => {
        if (data && typeof data.karat24 === 'number') {
          setCurrentPrices({
            karat24: data.karat24,
            karat22: data.karat22,
            karat21: data.karat21,
            karat18: data.karat18,
            silver: data.silver,
            updatedAt: data.updatedAt || new Date().toISOString()
          });
        } else {
          // Fallback if data is not structured e.g. HTML (SPA fallback 404 rewrite)
          fetchDirectFallback();
        }
      })
      .catch(err => {
        console.warn("Backend rate fetch failed, trying direct coin/gold API fallback:", err);
        fetchDirectFallback();
      });
  }, []);

  // Urgency Timer Tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.sec > 0) {
          return { ...prev, sec: prev.sec - 1 };
        } else if (prev.min > 0) {
          return { min: prev.min - 1, sec: 59 };
        } else {
          return { min: 14, sec: 59 }; // Reset
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Exit popup behavior (simulated when cursor leaves top bounds)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10) {
        const popupHistory = localStorage.getItem('gold_exit_popup');
        if (!popupHistory) {
          setShowExitPopup(true);
          localStorage.setItem('gold_exit_popup', 'true');
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handlePriceUpdate = (newPrices: GoldPrice) => {
    setCurrentPrices(newPrices);
  };

  const handleLeadSubmit = async (e: React.FormEvent, source: 'newsletter' | 'checklist_download') => {
    e.preventDefault();
    if (!leadEmail) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: leadEmail, source })
      });
      if (response.ok) {
        setLeadSubmitted(true);
        setLeadEmail('');
        setTimeout(() => setLeadSubmitted(false), 8000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    setContactSubmitted(true);
    setContactName('');
    setContactEmail('');
    setContactMsg('');
    setTimeout(() => setContactSubmitted(false), 5000);
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail) return;

    setIsProcessingPayment(true);
    setTimeout(async () => {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: checkoutName,
            email: checkoutEmail,
            amount: 3.99,
            paymentMethod: paymentMethod === 'apple' ? 'Apple Pay' : paymentMethod === 'google' ? 'Google Pay' : paymentMethod === 'paypal' ? 'PayPal' : 'Stripe'
          })
        });
        const data = await response.json();
        if (response.ok) {
          setGeneratedOrder(data.order);
          setCheckoutSuccess(true);
        }
      } catch (err) {
        console.error("Payment error:", err);
      } finally {
        setIsProcessingPayment(false);
      }
    }, 2000);
  };

  const handleAdminUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUploadTitle) return;
    setAdminUploadSuccess(true);
    setAdminUploadTitle('');
    setTimeout(() => setAdminUploadSuccess(false), 3000);
  };

  // Sticky Buy Button scroll checker
  const [showStickyBuy, setShowStickyBuy] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBuy(true);
      } else {
        setShowStickyBuy(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8F3E7] relative selection:bg-[#D4AF37] selection:text-black font-sans overflow-hidden" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Background Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M30 0l5.878 18.09h19.022l-15.389 11.18 5.878 18.09L30 36.18l-15.389 11.18 5.878-18.09L5.1 18.09h19.022L30 0z" fill="%23D4AF37" fill-opacity="0.4" fill-rule="evenodd"/%3E%3C/svg%3E')`, backgroundSize: '80px 80px' }}></div>
      
      {/* Floating UI Decor (Khanjar Glow & Blue Soft Light) */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-1/4 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* 1. URGENCY TOP BAR BANNER */}
      <div className="bg-[#D4AF37] text-black text-center py-2 px-4 flex flex-wrap items-center justify-center gap-2 md:gap-4 text-xs md:text-sm font-bold shadow-md z-40 relative">
        <span className="bg-black text-[#D4AF37] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
          {lang === 'ar' ? 'عرض ترويجي محدود' : 'Limited Offer'}
        </span>
        <span>
          {lang === 'ar' 
            ? 'احصل على الدليل الذهبي الشامل بـ ٣.٩٩ ر.ع فقط بدلاً من ١٠.٩٩ ر.ع (وفر ٦٣٪)' 
            : 'Get the complete guide for only 3.99 OMR instead of 10.99 OMR (Save 63%)'
          }
        </span>
        <div className="flex items-center gap-1 font-mono bg-black/10 px-2 py-0.5 rounded">
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          <span>{String(timeLeft.min).padStart(2, '0')}:{String(timeLeft.sec).padStart(2, '0')}</span>
        </div>
      </div>

      {/* 2. NAVIGATION BAR */}
      <header className="border-b border-[#D4AF37]/20 bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-30 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          
          {/* LOGO: Khanjar + Gold Bar Concept */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="relative h-10 w-10 flex items-center justify-center bg-gradient-to-br from-black to-[#121B2E] border-2 border-[#D4AF37] rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              {/* Embossed Vector Gold Khanjar Symbol */}
              <span className="text-xl">✨</span>
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/20 to-transparent"></div>
            </div>
            <div>
              <span className="text-sm font-extrabold tracking-wider text-white uppercase block leading-none font-mono">
                {lang === 'ar' ? 'دليـل الذهـب' : 'OMAN GOLD'}
              </span>
              <span className="text-[9px] text-[#D4AF37] block font-mono">
                {lang === 'ar' ? 'سلطنة عمان • حماية المشتري' : 'Buyer Protection Guide'}
              </span>
            </div>
          </div>

          {/* Nav Destinations */}
          <nav className="hidden lg:flex items-center gap-6 text-xs md:text-sm font-medium">
            <button 
              onClick={() => { setActivePage('home'); window.scrollTo(0,0); }}
              className={`hover:text-[#D4AF37] tracking-wider transition ${activePage === 'home' ? 'text-[#D4AF37] font-semibold underline underline-offset-4 decoration-[#D4AF37]' : 'text-gray-300'}`}
            >
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
            <button 
              onClick={() => { setActivePage('about'); window.scrollTo(0,0); }}
              className={`hover:text-[#D4AF37] tracking-wider transition ${activePage === 'about' ? 'text-[#D4AF37] font-semibold underline underline-offset-4' : 'text-gray-300'}`}
            >
              {lang === 'ar' ? 'محتويات الدليل' : 'Guide Overview'}
            </button>
            <button 
              onClick={() => { setActivePage('preview'); window.scrollTo(0,0); }}
              className={`hover:text-[#D4AF37] tracking-wider transition ${activePage === 'preview' ? 'text-[#D4AF37] font-semibold underline underline-offset-4' : 'text-gray-300'}`}
            >
              {lang === 'ar' ? 'تصفح عينة' : 'Interactive Preview'}
            </button>
            <button 
              onClick={() => { setActivePage('blog'); window.scrollTo(0,0); }}
              className={`hover:text-[#D4AF37] tracking-wider transition ${activePage === 'blog' || selectedArticle !== null ? 'text-[#D4AF37] font-semibold underline underline-offset-4' : 'text-gray-300'}`}
            >
              {lang === 'ar' ? 'أخبار المجمع والمدونة' : 'Educational Blog'}
            </button>
            <button 
              onClick={() => { setActivePage('contact'); window.scrollTo(0,0); }}
              className={`hover:text-[#D4AF37] tracking-wider transition ${activePage === 'contact' ? 'text-[#D4AF37] font-semibold underline underline-offset-4' : 'text-gray-300'}`}
            >
              {lang === 'ar' ? 'اتصل بنا' : 'Contact Us'}
            </button>
          </nav>

          {/* Action Tools (Language trigger, checkout button, Admin link) */}
          <div className="flex items-center gap-3">
            
            {/* Language Switch */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-3 py-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 rounded-lg text-xs font-semibold text-[#D4AF37] flex items-center gap-1.5 transition active:scale-95 cursor-pointer font-mono"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
            </button>

            {/* Admin Desk Link */}
            <button
              onClick={() => { setActivePage('admin'); window.scrollTo(0,0); }}
              className="hidden md:flex p-2 text-gray-400 hover:text-[#D4AF37] rounded-lg hover:bg-white/5 transition"
              title={lang === 'ar' ? 'بوابة الإدارة' : 'Admin Area'}
            >
              <LayoutDashboard className="w-4.5 h-4.5" />
            </button>

            {/* Buy CTA */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-[#D4AF37] hover:bg-[#8B6F3D] text-black font-extrabold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 transition active:scale-95 border border-white/10 glow-gold cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{lang === 'ar' ? 'شراء الدليل بـ ٣.٩٩ ر.ع' : 'Get Guide • 3.99 OMR'}</span>
            </button>

          </div>

        </div>
      </header>

      {/* 3. HOME PAGE WRAPPER */}
      {activePage === 'home' && (
        <main className="fade-in max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
          
          {/* A. HERO SECTION: Traditional Layout with 3D elements */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            {/* Hero text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/35 rounded-full text-[#D4AF37] text-xs font-bold leading-normal">
                <Award className="w-4 h-4 shrink-0" />
                <span>{lang === 'ar' ? 'الدليل الرقمي الأكثر مبيعاً في سلطنة عمان' : 'Oman`s Supreme Number #1 Digital Precious Metals Manual'}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {lang === 'ar' ? (
                  <>
                    تسوّق الذهب في عمان <span className="text-[#D4AF37] glow-gold">كالمُحترفين</span> وتجنّب التلاعب بالمصنعية!
                  </>
                ) : (
                  <>
                    Shop Gold in Oman <span className="text-[#D4AF37] glow-gold">Like a Pro</span> & Bypass Overpriced Maker Traps!
                  </>
                )}
              </h1>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl">
                {lang === 'ar' 
                  ? 'دليل حصري مصور ومكتوب بمهنية تفصيلية يعلمك كيفية فحص نقاء الذهب عيار ٢٤/٢٢/٢١/١٨، وقراءة دمغات وزارة التجارة (MOCIIP)، والتعرف على المعادن المطلية، وصيغة حساب القيمة الحقيقية للتفاوض لخفض المصنعية حتى ٥٠٪.'
                  : 'A complete, professionally formatted digital blueprint detailing how to verify official assays, read Ministry stamp seals (MOCIIP), compute net intrinsic values in real time, and unlock elite souq negotiation keywords used by Omani merchant masters.'
                }
              </p>

              {/* Trust Badges layout */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-[#121B2E] p-3 rounded-xl border border-[#D4AF37]/15 flex items-center gap-1.5 min-w-[120px]">
                  <ShieldCheck className="text-[#D4AF37] w-5 h-5 shrink-0" />
                  <div className="text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                    <span className="text-white text-xs font-bold block">{lang === 'ar' ? 'آمن ١٠٠٪' : '100% Secure'}</span>
                    <span className="text-[9px] text-gray-500 font-mono">{lang === 'ar' ? 'حماية معتمدة' : 'MOCIIP Compliant'}</span>
                  </div>
                </div>

                <div className="bg-[#121B2E] p-3 rounded-xl border border-[#D4AF37]/15 flex items-center gap-1.5 min-w-[120px]">
                  <Download className="text-[#D4AF37] w-5 h-5 shrink-0" />
                  <div className="text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                    <span className="text-white text-xs font-bold block">{lang === 'ar' ? 'تحميل فوري' : 'Instant Grab'}</span>
                    <span className="text-[9px] text-gray-500 font-mono">{lang === 'ar' ? 'نسخة PDF دائمة' : 'MIME PDF Asset'}</span>
                  </div>
                </div>

                <div className="bg-[#121B2E] p-3 rounded-xl border border-[#D4AF37]/15 flex items-center gap-1.5 min-w-[120px]">
                  <Percent className="text-[#D4AF37] w-5 h-5 shrink-0" />
                  <div className="text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                    <span className="text-white text-xs font-bold block">{lang === 'ar' ? 'وفر ٦٣٪ اليوم' : 'Save 63%'}</span>
                    <span className="text-[9px] text-gray-500 font-mono">٣.٩٩ ر.ع فقط</span>
                  </div>
                </div>

                <div className="bg-[#121B2E] p-3 rounded-xl border border-[#D4AF37]/15 flex items-center gap-1.5 min-w-[120px]">
                  <Users className="text-[#D4AF37] w-5 h-5 shrink-0" />
                  <div className="text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                    <span className="text-white text-xs font-bold block">{lang === 'ar' ? '+٢,٥٠٠ قارئ' : '+2,500 Readers'}</span>
                    <span className="text-[9px] text-gray-500 font-mono">{lang === 'ar' ? 'في مسقط وصلالة' : 'Omani Families'}</span>
                  </div>
                </div>
              </div>

              {/* Instant checkout CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start relative z-10">
                <div className="relative group w-full sm:w-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#8B6F3D] rounded-xl blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="relative bg-[#D4AF37] text-slate-950 font-extrabold text-base px-8 py-4 rounded-xl flex items-center justify-center gap-3 shadow-xl hover:bg-[#b89525] transition duration-300 w-full cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>{lang === 'ar' ? 'تحميل كتيب الذهب — ٣.٩٩ ر.ع' : 'Buy Digital PDF — 3.99 OMR'}</span>
                  </button>
                </div>
                <button
                  onClick={() => { setActivePage('preview'); window.scrollTo(0,0); }}
                  className="bg-transparent hover:bg-white/5 border border-dashed border-[#D4AF37]/35 text-[#D4AF37] hover:text-white font-semibold text-sm px-6 py-4 rounded-xl flex items-center justify-center gap-2 transition duration-300 w-full sm:w-auto cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'تصفح عينة من الصفحات مجاناً' : 'View Sample Pages free'}</span>
                </button>
              </div>
            </div>

            {/* Hero Gold Bar 3D animation visual */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <ThreeCanvas assetType="bar" width={320} height={300} />
              
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{lang === 'ar' ? 'حرك الماوس فوق السبيكة لتدويرها وملاحظة الدمغة العمانية' : 'Hover / drag over ingot to observe Omani hallmark'}</span>
              </div>
            </div>

          </div>

          {/* B. LIVE METAL DASHBOARD SECTION */}
          <section className="mb-16">
            <MetalDashboard 
              currentPrices={currentPrices} 
              lang={lang} 
              onPriceUpdate={handlePriceUpdate} 
            />
          </section>

          {/* C. THE PROBLEM STATEMENT */}
          <section className="bg-luxury-pattern p-8 md:p-12 rounded-2xl border border-[#D4AF37]/20 mb-16 relative">
            <div className="absolute top-4 left-4 text-xs font-mono text-[#D4AF37]/45 tracking-widest uppercase">
              {lang === 'ar' ? 'أمانة التداول العمانية' : 'Omani Safe Trading Standard'}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <span className="text-[#D4AF37] font-semibold text-xs tracking-wider uppercase block">{lang === 'ar' ? 'الواقع المؤلم لأسواق الذهب' : 'The Cold Truth of Souq Trading'}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {lang === 'ar'
                    ? 'لماذا يدفع ٩٢٪ من المشتريين مبالغ زائدة للصاغة دون علمهم؟'
                    : 'Why do 92% of new buyers overpay standard jewelers in Muscat?'
                  }
                </h2>
                <div className="text-gray-300 space-y-3 text-sm md:text-base leading-relaxed">
                  <p>
                    {lang === 'ar'
                      ? 'سلطنة عمان تملك أحد أكثر الأسواق صرامة ونقاءً في العالم. مع ذلك، فإن طريقة تسعير القطع تمنح البائعين هوامش خفية يدرجونها تحت "أجور المصنعية الصعبة".'
                      : 'While the Sultanate maintains extremely strict standards, retail pricing formulas leave the customer dependent on the jeweler`s custom quotes, where labor fees are dynamically inflated'
                    }
                  </p>
                  <p>
                    {lang === 'ar'
                      ? 'عندما تسأل الصائغ: "بكم هذا الطقم الكلي؟" بدلاً من تفقد وزن الجرام ونقائه الفعلي، فإنك تمنحه الضوء الأخضر لإضافة أرباح مضاعفة بنسبة ٣٠٪ إلى ٦٠٪ تحت غطاء مسميات صياغة معقدة.'
                      : 'When asking "How much is this bridal set?", you forfeit your negotiation leverage. Successful buyers immediately decouple raw daily gold metrics from handmade labor fees, standing their ground.'
                    }
                  </p>
                </div>
              </div>

              {/* Warning box */}
              <div className="lg:col-span-5 bg-black/60 p-6 rounded-xl border border-red-500/30 space-y-4">
                <div className="flex items-center gap-2 text-red-400 font-bold">
                  <AlertCircle className="w-5 h-5 shrink-0 animate-bounce" />
                  <span>{lang === 'ar' ? '٣ أخطاء فادحة تخسر بها ميزانيتك:' : '3 Costly Mistakes in Muscat Souqs:'}</span>
                </div>
                <ul className="space-y-3.5 text-xs text-gray-300">
                  <li className="flex gap-2 leading-relaxed">
                    <span className="text-[#D4AF37] font-bold">1.</span>
                    <span>
                      {lang === 'ar' 
                        ? 'قبول سعر القطعة المزينة بالفصوص الصناعية وحساب وزن الأحجار الثقيلة بسعر جرام الذهب الثمين نفسه.' 
                        : 'Paying raw gold indices for heavy, low-value synthetic stones glued into the rings.'
                      }
                    </span>
                  </li>
                  <li className="flex gap-2 leading-relaxed">
                    <span className="text-[#D4AF37] font-bold">2.</span>
                    <span>
                      {lang === 'ar'
                        ? 'عدم فحص المكتوب بدمغة وزارة التجارة العمانية بالعدسة المكبرة والاعتماد الشفهي على وعود بائع المحل.'
                        : 'Neglecting to inspect the literal MOCIIP regulatory hallmark under extreme zoom before paying.'
                      }
                    </span>
                  </li>
                  <li className="flex gap-2 leading-relaxed">
                    <span className="text-[#D4AF37] font-bold">3.</span>
                    <span>
                      {lang === 'ar'
                        ? 'العجز عن عزل وتقسيم "أجور المصنعية" للجرام الواحد قبل بدء المساومة والنزول الكلي في أسواق روي.'
                        : 'Unawareness of standard localized making limits (al-masna`eyah) prior to starting souq negotiations.'
                      }
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* D. THE CALCULATORS SUITE PANEL */}
          <section className="mb-16">
            <Calculators currentPrices={currentPrices} lang={lang} />
          </section>

          {/* E. PDF CHAPTERS CURRICULUM PREVIEW (18 Chapters) */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest font-mono block mb-1">
                {lang === 'ar' ? 'فهرس الكتاب الفاخر الشامل' : 'Complete Guide Index Curriculum'}
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {lang === 'ar' ? '١٨ فصلاً ممتلأً بالأسرار والاستراتيجيات الحصرية' : '18 Expert Chapters Packed with Insider Strategies'}
              </h2>
              <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-2">
                {lang === 'ar'
                  ? 'انقر على أي فصل أدناه لتصفح لمحة سريعة ومعاينة العينة المكتوبة داخله'
                  : 'Click on any chapter node below to read actual, structured text extracts directly'
                }
              </p>
            </div>

            {/* 18-Chapters grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CHANNELS_OF_GOLD_GUIDE.map((chapter) => (
                <div 
                  key={chapter.id}
                  onClick={() => setSelectedChapter(chapter)}
                  className="bg-slate-900/60 p-5 rounded-xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/45 transition duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#D4AF37] font-mono tracking-wider font-semibold">
                        {lang === 'ar' ? `الصفحات ${chapter.pagesRange}` : `Pages ${chapter.pagesRange}`}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-[#D4AF37]/30 group-hover:bg-[#D4AF37] transition"></span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition duration-200">
                      {lang === 'ar' ? chapter.titleAr : chapter.titleEn}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3">
                      {lang === 'ar' ? chapter.descriptionAr : chapter.descriptionEn}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-[#D4AF37]/10 mt-4 flex justify-between items-center text-[10px] text-gray-500 font-mono">
                    <span>{lang === 'ar' ? 'انقر لمعاينة عينة' : 'Click to view sample'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* F. INTERACTIVE FLIPBOOK PREVIEW */}
          <section className="bg-gradient-to-br from-[#0F172A] to-[#060A13] border border-[#D4AF37]/35 rounded-2xl p-6 md:p-10 mb-16">
            <div className="text-center mb-8">
              <span className="text-[#D4AF37] font-mono font-semibold text-xs uppercase tracking-widest block mb-2">{lang === 'ar' ? 'محاكي القراءة التفاعلي' : 'Interactive Flipbook Simulator'}</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{lang === 'ar' ? 'تصفح محتوى الدليل الآن' : 'Peek Inside the Guide Pages'}</h3>
            </div>

            {/* Flipbook Layout Rendering */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              <button 
                onClick={() => setFlipbookIndex(p => Math.max(0, p - 1))}
                disabled={flipbookIndex === 0}
                className="lg:col-span-1 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 p-3 rounded-full flex items-center justify-center text-[#D4AF37] disabled:opacity-20 cursor-pointer select-none active:scale-90 transition mx-auto"
              >
                <ArrowLeft className="w-5 h-5" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
              </button>

              {/* Book open content */}
              <div className="lg:col-span-10 grid grid-cols-1 md:grid-cols-2 bg-black/60 border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-2xl min-h-[340px] relative">
                
                {/* Visual center book divider */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-t from-black via-slate-800 to-black z-10"></div>

                {/* Left Leaflet / Page */}
                <div className="p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#D4AF37]/15">
                  <div>
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-mono font-semibold">
                      {lang === 'ar' ? 'نسخة المعاينة المرخصة' : 'Licensed Promo Sample Page'}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-2 mb-3">
                      {lang === 'ar' ? flipbookPages[flipbookIndex].titleAr : flipbookPages[flipbookIndex].titleEn}
                    </h4>
                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                      {lang === 'ar' ? flipbookPages[flipbookIndex].descAr : flipbookPages[flipbookIndex].descEn}
                    </p>
                  </div>

                  <span className="text-gray-500 font-mono text-xs pt-4 block border-t border-[#D4AF37]/10">
                    OOM-SAMPLE-PG {flipbookIndex * 2 + 1}
                  </span>
                </div>

                {/* Right Leaflet / Page */}
                <div className="p-6 md:p-8 flex flex-col justify-between bg-zinc-950/40">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold">
                      {lang === 'ar' ? 'العناصر الأكثر أهمية بالفصل:' : 'Elite Takeaways covered:'}
                    </span>
                    
                    <ul className="space-y-3.5 mt-4 text-xs">
                      {(lang === 'ar' 
                        ? flipbookPages[flipbookIndex].highlightsAr 
                        : flipbookPages[flipbookIndex].highlightsEn
                      ).map((high, i) => (
                        <li key={i} className="flex gap-2 items-center text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                          <span>{high}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center text-xs mt-6 pt-4 border-t border-[#D4AF37]/10">
                    <button 
                      onClick={() => setIsCheckoutOpen(true)}
                      className="text-[#D4AF37] font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{lang === 'ar' ? 'افتح الفصل بالكامل الآن' : 'Unlock chapter files...'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-gray-500 font-mono">
                      OOM-SAMPLE-PG {flipbookIndex * 2 + 2}
                    </span>
                  </div>
                </div>

              </div>

              <button 
                onClick={() => setFlipbookIndex(p => Math.min(flipbookPages.length - 1, p + 1))}
                disabled={flipbookIndex === flipbookPages.length - 1}
                className="lg:col-span-1 border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 p-3 rounded-full flex items-center justify-center text-[#D4AF37] disabled:opacity-20 cursor-pointer select-none active:scale-90 transition mx-auto"
              >
                <ArrowRight className="w-5 h-5" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
              </button>

            </div>

            {/* Flipbook controls indicators */}
            <div className="flex justify-center gap-1.5 mt-6">
              {flipbookPages.map((_, i) => (
                <span 
                  key={i} 
                  onClick={() => setFlipbookIndex(i)}
                  className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 ${flipbookIndex === i ? 'w-8 bg-[#D4AF37]' : 'w-2.5 bg-gray-600 hover:bg-gray-400'}`}
                />
              ))}
            </div>
          </section>

          {/* G. THE PRICING & CONVERSION BOX CARD */}
          <section className="bg-gradient-to-br from-[#0B1220] via-black to-[#060A11] border-2 border-[#D4AF37] rounded-3xl p-8 md:p-12 text-center my-16 max-w-4xl mx-auto shadow-2xl relative overflow-hidden" id="sales-pricing-module">
            
            {/* Arabic pattern flare */}
            <div className="absolute inset-0 bg-luxury-pattern opacity-10 pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              <span className="bg-[#D4AF37] text-black font-extrabold text-[10px] md:text-xs uppercase tracking-widest px-4 py-1.5 rounded-full inline-block font-mono shadow-md">
                {lang === 'ar' ? 'احصل على تحميل رقمي مباشر وآمن' : 'Instant & Secure Digital Download Product'}
              </span>
              
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                {lang === 'ar' ? 'دليلك الشامل لشراء الذهب في عمان' : 'Ultimate Omani Gold Buying Manual'}
              </h2>
              
              <p className="text-gray-300 md:text-lg max-w-2xl mx-auto leading-relaxed">
                {lang === 'ar'
                  ? 'وفر مئات الريالات وتجاوز الحشو والتلاعب بالمصنعية منذ جولتك الأولى بسوق الذهب بروي أو مطرح.'
                  : 'Pay for your modest investment in a single transaction in Muttrah Souq. Over 2,500 buyers have changed how they manage local jewelers permanently.'
                }
              </p>

              {/* Price comparison layout */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-6 pt-4">
                
                {/* Traditional markup price */}
                <div className="text-gray-500 font-mono">
                  <span className="text-xs block lowercase">{lang === 'ar' ? 'السعر العادي الكلي:' : 'Regular Retail Value:'}</span>
                  <span className="text-lg line-through text-red-500/80">10.990 {lang === 'ar' ? 'ر.ع' : 'OMR'}</span>
                </div>

                {/* Highly visible Omani discounted price */}
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/50 rounded-2xl px-6 py-4 text-center">
                  <span className="text-xs text-[#D4AF37] block font-semibold uppercase tracking-wider">{lang === 'ar' ? 'عرض ترويجي خاص لليوم:' : 'Today`s Promo Discount Rate:'}</span>
                  <span className="text-4xl md:text-5xl font-extrabold font-mono text-white tracking-tight glow-gold">3.990</span>
                  <span className="text-xl font-bold text-[#D4AF37]"> {lang === 'ar' ? 'ريال عماني' : 'OMR'}</span>
                </div>

                <div className="text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                  <span className="text-emerald-400 font-bold block flex items-center gap-1">
                    <Percent className="w-4.5 h-4.5" />
                    <span>{lang === 'ar' ? 'خصم ٦٣٪ فوري مفعّل' : 'Instant 63% Off Active'}</span>
                  </span>
                  <span className="text-xs text-gray-400 block">{lang === 'ar' ? 'لا توجد ضرائب ورسوم خفية' : 'No VAT or hidden fee processing'}</span>
                </div>

              </div>

              {/* Urgency message */}
              <p className="text-xs text-[#D4AF37] font-semibold flex items-center justify-center gap-1.5 font-mono">
                <Clock className="w-4 h-4 animate-spin-slow" />
                <span>
                  {lang === 'ar'
                    ? `ينتهي السعر المخفض في غضون ${timeLeft.min} دقيقة و ${timeLeft.sec} ثانية!`
                    : `Slashed price terminates in ${timeLeft.min}m ${timeLeft.sec}s!`
                  }
                </span>
              </p>

              {/* Main checkout trigger */}
              <div className="pt-2">
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="bg-gradient-to-r from-[#D4AF37] via-[#FFF5C8] to-[#8B6F3D] text-black font-black text-lg px-12 py-5 rounded-2xl shadow-2xl hover:scale-103 transition duration-300 w-full sm:w-auto cursor-pointer"
                >
                  {lang === 'ar' ? 'شراء وتحميل الدليل الآن' : 'Purchase & Grab Instant PDF Guide'}
                </button>
              </div>

              {/* Trust badges footer inside pricing card */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-[#D4AF37]/10 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Lock className="w-4 h-4 text-emerald-500" /> Secure Checkout</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Government Hallmarking Tested</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-amber-500" /> Instant PDF Delivery</span>
              </div>

            </div>
          </section>

          {/* H. TESTIMONIALS */}
          <section className="mb-16">
            <div className="text-center mb-10">
              <span className="text-[#D4AF37] font-bold text-xs uppercase font-mono tracking-widest block mb-1">
                {lang === 'ar' ? 'شهادات وتجارب المشترين' : 'Omani Customer Voices'}
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                {lang === 'ar' ? 'ماذا يقول القراء في مسقط وباطنة وجنوب؟' : 'Stories of Saved Capital Across the Souqs'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TESTIMONIALS_SAMPLE.map((test) => (
                <div key={test.id} className="bg-[#121B2E]/60 p-6 rounded-2xl border border-[#D4AF37]/15 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex gap-1 text-[#D4AF37]">
                      {[...Array(test.rating)].map((_, i) => <Star key={i} className="w-4.5 h-4.5 fill-[#D4AF37]" />)}
                    </div>
                    <p className="text-xs md:text-sm text-gray-300 italic leading-relaxed">
                      "{lang === 'ar' ? test.commentAr : test.commentEn}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#D4AF37]/10 flex items-center gap-3">
                    <img 
                      src={test.avatar} 
                      alt={test.nameEn} 
                      className="h-10 w-10 rounded-full border border-[#D4AF37]/35 object-crop" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                      <span className="text-white text-xs font-bold block">
                        {lang === 'ar' ? test.nameAr : test.nameEn}
                      </span>
                      <span className="text-[10px] text-gray-500 block font-mono">
                        {lang === 'ar' ? `${test.roleAr} • ${test.locationAr}` : `${test.roleEn} • ${test.locationEn}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* I. NO-COST FREE INSPECTION CHECKLIST DOWNLOAD (LEADS OPT-IN) */}
          <section className="bg-[#10192A] p-8 rounded-2xl border border-dashed border-[#D4AF37]/30 my-16 max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-md text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <span className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-widest font-mono font-extrabold inline-block">
                {lang === 'ar' ? 'تحميل مجاني ١٠٠٪' : '100% Free Resources'}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {lang === 'ar' ? 'احصل على ورقة فحص الذهب الـ ١٠ السريعة مجاناً' : 'Get our Quick 10-Point Souq Checklist Free'}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {lang === 'ar'
                  ? 'اشترك في بريدنا للمجمع واحصل مطلع هذا الأسبوع على ورقة فحص مادي سريعة لفتحها على جوالك أثناء المساومة مع البائعين.'
                  : 'Receive the interactive mobile checklist detailing physical joints, locks, and Ministry assay templates.'
                }
              </p>
            </div>

            <form onSubmit={(e) => handleLeadSubmit(e, 'checklist_download')} className="w-full md:w-auto flex flex-col sm:flex-row gap-2 shrink-0">
              <input
                type="email"
                required
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder={lang === 'ar' ? 'بريدك الإلكتروني...' : 'Target Email Address...'}
                className="bg-slate-900 border border-[#D4AF37]/30 rounded-lg p-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#D4AF37] w-full md:w-64"
              />
              <button
                type="submit"
                className="bg-[#D4AF37] hover:bg-[#8B6F3D] text-black font-extrabold text-xs px-5 py-3 rounded-lg transition active:scale-95 cursor-pointer whitespace-nowrap text-center"
              >
                {lang === 'ar' ? 'رسلني الورقة المجانية' : 'E-mail Me Checklist'}
              </button>
            </form>
          </section>

          {/* J. BLOG PREVIEW SECTION */}
          <section className="mb-16">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-4 mb-8">
              <div className="text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                <span className="text-[#D4AF37] font-bold text-xs font-mono uppercase tracking-widest block">{lang === 'ar' ? 'مقالات المجمع والمعرفة' : 'Knowledge Repository Articles'}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{lang === 'ar' ? 'مستجدات التداول والمساومة الآمنة' : 'Educate Yourself Prior to Buying'}</h3>
              </div>
              <button 
                onClick={() => { setActivePage('blog'); window.scrollTo(0,0); }}
                className="text-[#D4AF37] hover:text-white font-semibold text-xs flex items-center gap-1 transition"
              >
                <span>{lang === 'ar' ? 'تصفح كل المدونة' : 'Browse All News'}</span>
                <ArrowRight className="w-4 h-4" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOG_ARTICLES_LIST.map((article) => (
                <div 
                  key={article.id}
                  onClick={() => { setSelectedArticle(article); setActivePage('blog'); window.scrollTo(0,0); }}
                  className="bg-[#121B2E]/50 rounded-xl overflow-hidden border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 overflow-hidden relative">
                      <img 
                        src={article.image} 
                        alt={article.titleEn} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-3 right-3 bg-black/80 font-semibold border border-[#D4AF37]/40 text-[10px] text-[#D4AF37] px-2.5 py-0.5 rounded font-mono">
                        {lang === 'ar' ? article.categoryAr : article.categoryEn}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.date} • {article.readTime}</span>
                      </span>
                      <h4 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition duration-200 line-clamp-2">
                        {lang === 'ar' ? article.titleAr : article.titleEn}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-3">
                        {lang === 'ar' ? article.summaryAr : article.summaryEn}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-[#D4AF37]/5 text-xs text-[#D4AF37] font-semibold flex items-center justify-between group-hover:text-white transition">
                    <span>{lang === 'ar' ? 'اقرأ المقال الكامل' : 'Read Article Contents'}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* K. ACCORDION FAQ SECTION */}
          <section className="max-w-4xl mx-auto mb-16" id="souq-fags">
            <div className="text-center mb-8">
              <span className="text-[#D4AF37] font-bold text-xs uppercase font-mono block tracking-widest">{lang === 'ar' ? 'الأسئلة الشائعة من المشترين' : 'Common Buyer Questions & Concerns'}</span>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-0.5">{lang === 'ar' ? 'نجيب على أهم مخاوفك الاستثمارية' : 'Omani Precious Market FAQS'}</h2>
            </div>

            <div className="space-y-4">
              {FAQ_LIST.map((faq) => {
                const [isOpenF, setIsOpenF] = useState<boolean>(false);
                return (
                  <div key={faq.id} className="bg-[#0F172A]/80 border border-[#D4AF37]/15 rounded-xl overflow-hidden transition duration-300">
                    <button
                      onClick={() => setIsOpenF(!isOpenF)}
                      className="w-full text-right p-5 flex items-center justify-between text-white font-bold text-sm md:text-base cursor-pointer"
                      style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                    >
                      <span>{lang === 'ar' ? faq.questionAr : faq.questionEn}</span>
                      <ChevronDown className={`w-5 h-5 text-[#D4AF37] transform transition duration-300 ${isOpenF ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isOpenF && (
                      <div className="p-5 pt-0 text-xs md:text-sm text-gray-300 leading-relaxed border-t border-[#D4AF37]/5 bg-black/20">
                        {lang === 'ar' ? faq.answerAr : faq.answerEn}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

        </main>
      )}

      {/* 4. ABOUT THE GUIDE DETAILS PAGE */}
      {activePage === 'about' && (
        <section className="fade-in max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center space-y-4 mb-12">
            <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest font-mono block">
              {lang === 'ar' ? 'محتويات دليلك الشامل بالتفصيل' : 'Oman Gold Buyers Blueprint Chapters'}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              {lang === 'ar' ? 'ماذا ستتعلم داخل الكتاب الفني؟' : 'Primary Knowledge & Learning Outcomes'}
            </h1>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              {lang === 'ar'
                ? 'وثيقة قانونية وفنية متكاملة تمنحك استقلالية تامة وقوة استراتيجية أمام صاغة ومصنعي المعادن.'
                : '112 full, uncompromised pages containing illustrations of real vs fake hallmarks, Omani ministry contacts, regulatory updates.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
            
            {/* Learn Block Left */}
            <div className="bg-[#121B2E] p-6 rounded-2xl border border-[#D4AF37]/20 space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-[#D4AF37]/15 pb-2">
                {lang === 'ar' ? 'مواضيع فنية هامة مخرجة بالدليل:' : 'Topics and Core Disciplines Covered:'}
              </h2>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2">
                  <span className="text-[#D4AF37] font-bold">✓</span>
                  <span>{lang === 'ar' ? 'معرفة مؤشرات نقاء السبائك والأطقم (مكافحة الغش النحاسي)' : 'Chemical testing variables and physical density metrics (pure vs. filled).'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#D4AF37] font-bold">✓</span>
                  <span>{lang === 'ar' ? 'أختام الصيدلة وتدابير مطابقة الذهب لوزارة التجارة (MOCIIP)' : 'Detailed close-ups mapping out official Muscat regulatory assays.'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#D4AF37] font-bold">✓</span>
                  <span>{lang === 'ar' ? 'صيغة حساب وتجزئة الأسعار بناءً على أونصة تداول البورصة اليومية' : 'An easy step-by-step arithmetic module computes retail targets in seconds.'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#D4AF37] font-bold">✓</span>
                  <span>{lang === 'ar' ? 'دليل جغرافي لأسواق روي ومطرح التقليدية وسوق بوشر الفاخر' : 'Muscat and Salalah verified merchant directory, including safe vault storage steps.'}</span>
                </li>
              </ul>
            </div>

            {/* Benefit block Right */}
            <div className="bg-[#121B2E] p-6 rounded-2xl border border-[#D4AF37]/20 space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-[#D4AF37]/15 pb-2">
                {lang === 'ar' ? 'القيمة والمنافع العملية:' : 'Uncompromised Customer Outcomes:'}
              </h2>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2">
                  <span className="text-[#D4AF37] font-bold">✓</span>
                  <span>{lang === 'ar' ? 'توفير مالي صريح يتراوح من ١٥ إلى ٥٠ ريال عماني في كل ١٠ جرامات تشتريها' : 'Saves roughly 15 to 50 OMR per 10 grams on custom making markups.'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#D4AF37] font-bold">✓</span>
                  <span>{lang === 'ar' ? 'ثقة مطلقة في التفاوض كالمحترفين ومخاطبة الصائغ بالمصطلحات المحلية' : 'Bargain with authority using tailored localized gold dialogue.'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#D4AF37] font-bold">✓</span>
                  <span>{lang === 'ar' ? 'درع صلب وتأهيل استثماري للسبائك لحماية عائلتك من التضخم المالي' : 'Isolate wealth safely using 24K bullion coins over high-markup ornaments.'}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#D4AF37] font-bold">✓</span>
                  <span>{lang === 'ar' ? 'مرجعية واضحة ببريدك الإلكتروني تفتح على هاتفك في أي وقت' : 'Permanent lifetime accessible PDF files matching multi-device screens.'}</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="text-center p-6 bg-slate-900 border border-[#D4AF37]/30 rounded-xl max-w-2xl mx-auto space-y-4">
            <p className="text-sm">
              {lang === 'ar'
                ? 'دليلك الفني جاهز بخصم اليوم الشامل بسعر ٣.٩٩ ر.ع فقط!'
                : 'Instantly download your secure guide package immediately after checkout.'
              }
            </p>
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-[#D4AF37] text-black font-extrabold text-sm px-8 py-3 rounded-lg hover:bg-[#8B6F3D] transition active:scale-95 cursor-pointer inline-block"
            >
              {lang === 'ar' ? 'احصل على الدليل والملحقات كاملة' : 'Acquire Complete Bundle (3.99 OMR Only)'}
            </button>
          </div>
        </section>
      )}

      {/* 5. INTERACTIVE SAMPLE PREVIEW PAGE */}
      {activePage === 'preview' && (
        <section className="fade-in max-w-5xl mx-auto px-4 py-12">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
            <span className="bg-[#D4AF37]/15 p-1.5 rounded text-[10px] text-[#D4AF37] font-semibold tracking-widest uppercase block w-fit mx-auto">{lang === 'ar' ? 'عينة ترويجية مرخصة' : 'Licensed Public Preview Page'}</span>
            <h1 className="text-3xl md:text-4xl font-black text-white">{lang === 'ar' ? 'معاينة حية لبعض مقتطفات الدليل' : 'Browse Exclusive Guide Excerpts'}</h1>
            <p className="text-gray-400 text-xs">
              {lang === 'ar'
                ? 'ننشر هنا جزءاً بسيطاً للغاية من المحتوى الفني المطور لإظهار القيمة والدقة العالية للمنهج المكتوب.'
                : 'Sample excerpts extracted from chapters 4, 5, and 10 detailing physical density tests and hallmark lists.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            
            {/* Visual preview list left */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-mono mb-2">{lang === 'ar' ? 'الفصول المتاحة للمعاينة:' : 'Featured Chapters extracts:'}</h3>
              {CHANNELS_OF_GOLD_GUIDE.slice(0, 5).map(chip => (
                <button
                  key={chip.id}
                  onClick={() => setSelectedChapter(chip)}
                  className={`w-full text-right p-4 rounded-xl border transition flex items-center justify-between group ${
                    selectedChapter?.id === chip.id
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                      : 'bg-slate-900 text-gray-300 border-[#D4AF37]/10 hover:border-[#D4AF37]/30'
                  }`}
                  style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}
                >
                  <span className="font-bold text-xs md:text-sm">{lang === 'ar' ? chip.titleAr : chip.titleEn}</span>
                  <BookOpen className="w-4 h-4 text-zinc-400 shrink-0 group-hover:text-[#D4AF37] transition" />
                </button>
              ))}
            </div>

            {/* Display Box right */}
            <div className="lg:col-span-8 bg-zinc-950/80 p-6 md:p-8 rounded-2xl border-2 border-[#D4AF37]/40 min-h-[380px] flex flex-col justify-between">
              {selectedChapter ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/20">
                    <span className="text-[#D4AF37] font-mono text-xs font-semibold uppercase">{lang === 'ar' ? `الفصل ${selectedChapter.id} • الصفحات ${selectedChapter.pagesRange}` : `Chapter ${selectedChapter.id} • Pages ${selectedChapter.pagesRange}`}</span>
                    <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] px-2.5 py-0.5 rounded uppercase font-bold tracking-wider font-mono">Sample Text</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {lang === 'ar' ? selectedChapter.titleAr : selectedChapter.titleEn}
                  </h3>
                  <p className="text-gray-300 text-xs md:text-sm leading-relaxed whitespace-pre-line italic">
                    "{lang === 'ar' ? selectedChapter.sampleContentAr : selectedChapter.sampleContentEn}"
                  </p>
                </div>
              ) : (
                <div className="text-center py-16 space-y-4">
                  <BookOpen className="w-12 h-12 text-[#D4AF37] mx-auto opacity-40 animate-pulse" />
                  <p className="text-gray-400 text-sm">{lang === 'ar' ? 'يرجى اختيار أحد الفصول من المربع الجانبي لعرض مقتطفاته المكتوبة للبيع' : 'Click any excerpt node link in the side list to display actual chapter guides'}</p>
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-[#D4AF37]/15 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-gray-500 max-w-md">
                  {lang === 'ar'
                    ? 'يتضمن الدليل الكامل الجداول والقالب المصور وعناوين المفتشين وأرقام PAC المباشرة.'
                    : 'The complete PDF download encompasses high-res illustrations, local OOM calculations, bank box directories.'
                  }
                </p>
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="bg-[#D4AF37] text-black font-extrabold text-xs px-5 py-2.5 rounded-lg hover:bg-[#8B6F3D] transition active:scale-95 cursor-pointer"
                >
                  {lang === 'ar' ? 'افتح الدليل بالكامل بـ ٣.٩٩ ر.ع' : 'Unlock Complete PDF Bundle'}
                </button>
              </div>
            </div>

          </div>

          {/* Interactive Flipbook Render Mock */}
          <section className="bg-luxury-pattern p-6 rounded-xl border border-[#D4AF37]/15">
            <h4 className="text-base font-bold text-white mb-2">{lang === 'ar' ? 'أقسام إضافية هامة مغطاة:' : 'Other Key Visual Chapters Covered:'}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-300">
              <div className="p-3 bg-black/40 border border-slate-800 rounded">9. Making Charges (Al-Masna'eyah)</div>
              <div className="p-3 bg-black/40 border border-slate-800 rounded">11. Investment Gold vs Jewelry Gold</div>
              <div className="p-3 bg-black/40 border border-slate-800 rounded">13. Questions Every Buyer Must Ask</div>
              <div className="p-3 bg-black/40 border border-slate-800 rounded">18. Emergency PAC Prevention steps</div>
            </div>
          </section>
        </section>
      )}

      {/* 6. EDUCATIONAL BLOG PAGE */}
      {activePage === 'blog' && (
        <section className="fade-in max-w-5xl mx-auto px-4 py-12">
          
          {selectedArticle ? (
            /* Selected Reading Article View */
            <div className="space-y-6">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-[#D4AF37] hover:text-white font-semibold text-xs flex items-center gap-1 cursor-pointer transition"
              >
                <ArrowLeft className="w-4 h-4" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
                <span>{lang === 'ar' ? 'العودة لجميع مقالات المجمع' : 'Back to Knowledge Desk'}</span>
              </button>

              <div className="h-64 md:h-80 w-full overflow-hidden rounded-2xl relative border border-[#D4AF37]/20">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.titleEn} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 right-4 bg-black/95 font-semibold border border-[#D4AF37]/45 text-[10px] text-[#D4AF37] px-3.5 py-1 rounded font-mono">
                  {lang === 'ar' ? selectedArticle.categoryAr : selectedArticle.categoryEn}
                </span>
              </div>

              <div className="space-y-3">
                <span className="text-xs text-gray-500 font-mono flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>{selectedArticle.date} • {selectedArticle.readTime} • {lang === 'ar' ? 'تأليف الخنجي' : 'Authored by Al-Khonji'}</span>
                </span>
                
                <h1 className="text-2xl md:text-4xl font-black text-white leading-tight">
                  {lang === 'ar' ? selectedArticle.titleAr : selectedArticle.titleEn}
                </h1>
                
                <p className="text-gray-400 text-sm italic font-medium">
                  {lang === 'ar' ? selectedArticle.summaryAr : selectedArticle.summaryEn}
                </p>
              </div>

              {/* Core readable markdown-like content blocks */}
              <article className="prose prose-invert max-w-none text-gray-300 text-sm md:text-base leading-relaxed space-y-4 pt-4 border-t border-[#D4AF37]/10 whitespace-pre-wrap">
                {lang === 'ar' ? selectedArticle.contentAr : selectedArticle.contentEn}
              </article>

              {/* Author footer banner */}
              <div className="bg-[#121B2E] p-6 rounded-xl border border-[#D4AF37]/15 flex items-center justify-between gap-4 mt-8">
                <div className="space-y-1">
                  <span className="text-[#D4AF37] font-bold text-xs uppercase font-mono">Verified Safe Content Protection Service</span>
                  <p className="text-xs text-gray-300 leading-normal">
                    {lang === 'ar'
                      ? 'جميع مقالات المستشار والكتيب تخضع لتدقيق دوري من مستشارين مرخصين ومطابقة لقوانين حماية المستهلك العماني.'
                      : 'All published items comply strictly with Omani legal and trade frameworks protecting regional purchasers.'
                    }
                  </p>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="bg-[#D4AF37] text-black font-extrabold text-xs px-5 py-2.5 rounded-lg shrink-0 hover:bg-[#8B6F3D] transition active:scale-95 cursor-pointer"
                >
                  {lang === 'ar' ? 'احصل على الكتيب كامل بـ ٣.٩٩ ر.ع' : 'Unlock Full 18-Chapter PDF'}
                </button>
              </div>
            </div>
          ) : (
            /* Grid view of all Articles */
            <div className="space-y-10">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="text-[#D4AF37] font-bold text-xs uppercase font-mono block tracking-widest">{lang === 'ar' ? 'المدونة التعليمية المفتوحة' : 'Open Educational Market Blog'}</span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white">{lang === 'ar' ? 'أسرار ونشرات سوق الذهب في مسقط' : 'Gold Market News & Bargaining Secrets'}</h1>
                <p className="text-gray-400 text-xs">
                  {lang === 'ar'
                    ? 'مقالات مجانية متخصصة يعلمك فيها الخبراء بعض أصول التداول ونقاء الصيانة لتتسوق كالمحليين.'
                    : 'Free professional write-ups expanding on hallmarks, alloy components, and local storage limits.'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {BLOG_ARTICLES_LIST.map((article) => (
                  <div 
                    key={article.id}
                    onClick={() => { setSelectedArticle(article); window.scrollTo(0,0); }}
                    className="bg-slate-900/40 rounded-xl overflow-hidden border border-[#D4AF37]/10 hover:border-[#D4AF37]/45 transition duration-300 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 w-full overflow-hidden relative">
                        <img 
                          src={article.image} 
                          alt={article.titleEn} 
                          className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-3 right-3 bg-black/80 font-bold border border-[#D4AF37]/30 text-[9px] text-[#D4AF37] px-2.5 py-0.5 rounded font-mono">
                          {lang === 'ar' ? article.categoryAr : article.categoryEn}
                        </span>
                      </div>

                      <div className="p-5 space-y-2">
                        <span className="text-[10px] text-gray-500 font-mono select-none flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{article.date} • {article.readTime}</span>
                        </span>
                        <h3 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition duration-200 line-clamp-2">
                          {lang === 'ar' ? article.titleAr : article.titleEn}
                        </h3>
                        <p className="text-xs text-gray-400 line-clamp-3">
                          {lang === 'ar' ? article.summaryAr : article.summaryEn}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-3 border-t border-[#D4AF37]/5 text-xs text-[#D4AF37] font-semibold flex items-center justify-between group-hover:text-white transition">
                      <span>{lang === 'ar' ? 'اقرأ المقال الكامل' : 'Read Article'}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition" style={{ transform: lang === 'ar' ? 'rotate(180deg)' : 'none' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </section>
      )}

      {/* 7. CONTACT US PAGE Layout */}
      {activePage === 'contact' && (
        <section className="fade-in max-w-4xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center space-y-3 mb-12">
            <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest font-mono block">
              {lang === 'ar' ? 'نسعد بخدمتكم وتلقي استفساراتكم' : 'We are glad to receive inquiries'}
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">
              {lang === 'ar' ? 'اتصل بمستشار مبيعات الذهب العماني' : 'Get in Touch with Al-Khonji'}
            </h1>
            <p className="text-gray-400 text-xs max-w-xl mx-auto">
              {lang === 'ar'
                ? 'هل لديك تساؤل حول تحميل الدليل المجمع أو ترغب في شراكات التجزئة والتعاون المؤسسي؟'
                : 'Have inquiries regarding direct PDF delivery, download tracking, or retail affiliations?'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Quick Contact Info */}
            <div className="bg-[#121B2E] p-6 rounded-2xl border border-[#D4AF37]/15 space-y-6" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <h2 className="text-lg font-bold text-white border-b border-[#D4AF37]/15 pb-2">
                {lang === 'ar' ? 'بيانات الاتصال الرسمية بالمنصة:' : 'Official Customer Service Touchpoints:'}
              </h2>

              <div className="space-y-4 text-xs md:text-sm text-gray-300">
                <div className="flex gap-3">
                  <Mail className="text-[#D4AF37] w-5 h-5 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">{lang === 'ar' ? 'البريد الإلكتروني للدعم المباشر:' : 'Direct Sales Support Email:'}</span>
                    <span className="font-mono">support@omangoldbuyerguide.com</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone className="text-[#D4AF37] w-5 h-5 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">{lang === 'ar' ? 'الخط الساخن للمبيعات (الهاتف):' : 'Sales Support Hotlines:'}</span>
                    <span className="font-mono">+968 2478 9160 (Oman Head Office)</span>
                  </div>
                </div>

                <div className="flex gap-3 overflow-hidden">
                  <HelpCircle className="text-[#D4AF37] w-5 h-5 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">{lang === 'ar' ? 'هيئة حماية المستهلك العمانية (PAC):' : 'Consumer Protection Authority (PAC):'}</span>
                    <span>{lang === 'ar' ? 'للبلاغات والشكاوى ضد الغش التجاري: الاتصال بالرقم 80077999' : 'For reporting souq weight fraud or replica assay stamps: Call Toll-Free 80077999'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#D4AF37]/5 rounded-lg border border-[#D4AF37]/20 text-xs text-gray-400 leading-normal">
                {lang === 'ar'
                  ? 'يرجى مراجعة الفصل الثامن عشر في الدليل المشتري للحصول على كامل صيغ تقديم الشكاوى الرسمية والاستدعاءات لضمان استرداد المبالغ كاملة.'
                  : 'Refer to Chapter 18 of our guide for complete official petition forms, legal evidence procedures.'
                }
              </div>
            </div>

            {/* Direct message Form */}
            <div className="bg-slate-900/90 p-6 rounded-2xl border border-[#D4AF37]/25">
              {contactSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto animate-bounce" />
                  <h3 className="text-xl font-bold text-white">{lang === 'ar' ? 'تم استلام رسالتك بنجاح' : 'Message dispatched successfully'}</h3>
                  <p className="text-xs text-gray-400">
                    {lang === 'ar'
                      ? 'سيقوم أحد ممثلي المستشار الفني بالرد على استفسارك خلال ٢٤ ساعة عمل كحد أقصى.'
                      : 'Al-Khonji support delegates will align with your query within 24 standard working hours.'
                    }
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">{lang === 'ar' ? 'الاسم بالكامل' : 'Full Name'}</label>
                    <input 
                      type="text" 
                      required 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder={lang === 'ar' ? 'الاسم الثنائي...' : 'Your Name...'}
                      className="w-full bg-[#070B14] border border-[#D4AF37]/20 rounded-lg p-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</label>
                    <input 
                      type="email" 
                      required 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full bg-[#070B14] border border-[#D4AF37]/20 rounded-lg p-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">{lang === 'ar' ? 'تفاصيل الرسالة' : 'Query Details'}</label>
                    <textarea 
                      required 
                      rows={4}
                      value={contactMsg}
                      onChange={(e) => setContactMsg(e.target.value)}
                      placeholder={lang === 'ar' ? 'اكتب تساؤلاتك هنا...' : 'State your question...'}
                      className="w-full bg-[#070B14] border border-[#D4AF37]/20 rounded-lg p-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#D4AF37] resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:bg-[#8B6F3D] text-black font-extrabold text-xs md:text-sm py-3.5 rounded-lg transition active:scale-95 cursor-pointer text-center"
                  >
                    {lang === 'ar' ? 'إرسال الرسالة للمستشار' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>
      )}

      {/* 8. ADMINISTRATION MANAGEMENT PORTAL */}
      {activePage === 'admin' && (
        <section className="fade-in max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-wrap justify-between items-center gap-4 border-b border-[#D4AF37]/30 pb-6 mb-8">
            <div style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-400/10 border border-red-500/35 rounded-full text-red-400 text-xs font-mono font-bold uppercase mb-2">
                <Lock className="w-3 h-3" />
                <span>Secure Administration Node</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white">{lang === 'ar' ? 'لوحة تحكم إدارة مبيعات الدليل' : 'Oman Gold Sales Admin Control Hub'}</h1>
              <p className="text-gray-400 text-xs mt-1">{lang === 'ar' ? 'متابعة الصفقات، التحميلات، وقوائم البريد المجمعة في مسقط' : 'Monitor leads, downloads, orders and simulate PDF revisions'}</p>
            </div>
            
            <button 
              onClick={() => setActivePage('home')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-gray-300 text-xs rounded-lg transition"
            >
              {lang === 'ar' ? 'الخروج للرئيسية' : 'Exit to Live Site'}
            </button>
          </div>

          {!adminStats ? (
            <div className="text-center py-16">
              <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin mx-auto" />
              <p className="text-gray-400 text-sm mt-3">Syncing server database tables...</p>
            </div>
          ) : (
            <div className="space-y-8">
              
              {/* Stat KPI grids */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                
                <div className="bg-[#121B2E] p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-gray-500 block uppercase font-mono font-bold">{lang === 'ar' ? 'إجمالي الإيرادات (ر.ع):' : 'Gross Revenue (OMR):'}</span>
                  <p className="text-2xl font-bold text-[#D4AF37] font-mono mt-1">{adminStats.totalRevenue.toFixed(2)}</p>
                  <span className="text-[9px] text-gray-500 block font-mono mt-0.5">Sandbox simulated</span>
                </div>

                <div className="bg-[#121B2E] p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-gray-500 block uppercase font-mono font-bold">{lang === 'ar' ? 'عدد المبيعات الكلي:' : 'Total Guide Sales:'}</span>
                  <p className="text-2xl font-bold text-white font-mono mt-1">{adminStats.totalSales}</p>
                  <span className="text-[9px] text-emerald-400 font-mono mt-0.5">100% conversion success</span>
                </div>

                <div className="bg-[#121B2E] p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-gray-500 block uppercase font-mono font-bold">{lang === 'ar' ? 'إجمالي تحميلات الـ PDF:' : 'Total PDF Downloads:'}</span>
                  <p className="text-2xl font-bold text-white font-mono mt-1">{adminStats.totalDownloads}</p>
                  <span className="text-[9px] text-emerald-400 font-mono mt-0.5">Unique URL tracked</span>
                </div>

                <div className="bg-[#121B2E] p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-gray-500 block uppercase font-mono font-bold">{lang === 'ar' ? 'قواعد البريد الملتقطة:' : 'Captured Email Leads:'}</span>
                  <p className="text-2xl font-bold text-white font-mono mt-1">{adminStats.leadsCount}</p>
                  <span className="text-[9px] text-gray-500 font-mono mt-0.5">VIP customer pipeline</span>
                </div>

                <div className="bg-[#121B2E] p-4 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-gray-500 block uppercase font-mono font-bold">{lang === 'ar' ? 'أجراس مراقبة الأسعار:' : 'Active Price Alerts:'}</span>
                  <p className="text-2xl font-bold text-[#D4AF37] font-mono mt-1">{adminStats.alertsCount || 0}</p>
                  <span className="text-[9px] text-emerald-400 font-mono mt-0.5">Smart triggers active</span>
                </div>

                <div className="bg-[#121B2E] p-4 rounded-xl border border-slate-800 col-span-2 md:col-span-1 lg:col-span-1">
                  <span className="text-[10px] text-gray-500 block uppercase font-mono font-bold">{lang === 'ar' ? 'إجمالي زيارات المنصة:' : 'Simulated Visitors:'}</span>
                  <p className="text-2xl font-bold text-white font-mono mt-1">{adminStats.visitCount}</p>
                  <span className="text-[9px] text-emerald-400 font-mono mt-0.5">Auto incremental ticks</span>
                </div>

              </div>

              {/* PDF revision file uploader and live listings tables */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Upload Revisions left */}
                <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-xl border border-[#D4AF37]/25 space-y-4">
                  <div className="flex items-center gap-2 border-b border-[#D4AF37]/15 pb-2">
                    <FileText className="text-[#D4AF37] w-5 h-5" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">{lang === 'ar' ? 'تحديث ورفع إصدار جديد للدليل' : 'Upload new PDF Guide version'}</h3>
                  </div>

                  {adminUploadSuccess ? (
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 text-xs rounded-lg text-center font-semibold">
                      ✓ System synchronized: Ultimate Omani Buying Guide has been successfully compiled and deployed to global delivery networks!
                    </div>
                  ) : null}

                  <form onSubmit={handleAdminUpload} className="space-y-4">
                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1 font-semibold uppercase font-mono">1. Release Version ID:</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. OOM-GUIDE-V2.6-JUNE-2026"
                        className="w-full bg-[#070B14] border border-[#D4AF37]/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1 font-semibold uppercase font-mono">2. Short Changelog descriptions:</label>
                      <input 
                        type="text" 
                        required 
                        value={adminUploadTitle}
                        onChange={(e) => setAdminUploadTitle(e.target.value)}
                        placeholder="e.g. Updated 18K/21K Muscat souq price conversion variables"
                        className="w-full bg-[#070B14] border border-[#D4AF37]/20 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-400 mb-1 font-semibold uppercase font-mono">3. Select target document file:</label>
                      <div className="border border-dashed border-[#D4AF37]/20 rounded-lg py-6 text-center text-xs text-gray-500 bg-black/40">
                        Drag and drop Omani_Gold_Guide_v2.6.pdf or select file
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#D4AF37] hover:bg-[#8B6F3D] text-black font-extrabold text-xs py-2.5 rounded-lg transition"
                    >
                      Deploy Revision & Inform customers
                    </button>
                  </form>
                </div>

                {/* Orders table right */}
                <div className="lg:col-span-7 bg-[#121B2E] rounded-xl border border-slate-800 p-5 md:p-6 space-y-6">
                  
                  {/* Orders */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-2 mb-3">{lang === 'ar' ? 'سجل المعاملات والمشتريات الأخيرة:' : 'Recent Sandbox order logs:'}</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-xs" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                        <thead>
                          <tr className="border-b border-slate-800 text-gray-500 uppercase font-mono">
                            <th className="pb-2">ID</th>
                            <th className="pb-2">{lang === 'ar' ? 'المشتري' : 'Buyer'}</th>
                            <th className="pb-2">{lang === 'ar' ? 'التوقيت' : 'Gateway'}</th>
                            <th className="pb-2">{lang === 'ar' ? 'المبلغ' : 'OMR'}</th>
                            <th className="pb-2">{lang === 'ar' ? 'التحميلات' : 'Tries'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                          {adminStats.recentOrders.map((ord: any) => (
                            <tr key={ord.id} className="text-gray-300">
                              <td className="py-2.5 font-bold text-white font-mono">{ord.id}</td>
                              <td className="py-2.5">{ord.name} <span className="block text-[9px] text-gray-500">{ord.email}</span></td>
                              <td className="py-2.5 font-mono">{ord.paymentMethod}</td>
                              <td className="py-2.5 font-mono font-bold text-[#D4AF37]">{ord.amount}</td>
                              <td className="py-2.5 font-mono">{ord.downloadCount} downloads</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Leads */}
                  <div className="border-b border-slate-800/60 pb-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-2 mb-3">{lang === 'ar' ? 'قائمة المشتركين الملتقطة حديثاً:' : 'Recent Captured Lead channels:'}</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-xs" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                        <thead>
                          <tr className="border-b border-slate-800 text-gray-500 font-mono">
                            <th className="pb-2">{lang === 'ar' ? 'البريد الثنائي' : 'Email address'}</th>
                            <th className="pb-2">{lang === 'ar' ? 'التاريخ' : 'Date stamp'}</th>
                            <th className="pb-2">{lang === 'ar' ? 'المصدر' : 'Source'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-gray-300">
                          {adminStats.recentLeads.map((led: any) => (
                            <tr key={led.id}>
                              <td className="py-2.5 font-mono text-white">{led.email}</td>
                              <td className="py-2.5 font-mono text-gray-500">{led.date}</td>
                              <td className="py-2.5">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${led.source === 'newsletter' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                  {led.source}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Registered Watch Alerts */}
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono border-b border-slate-800 pb-2 mb-3">
                      {lang === 'ar' ? 'أجراس مراقبة الأسعار المفعّلة للمشتركين:' : 'Active Subscriber Price Watch Alerts:'}
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-right text-xs" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
                        <thead>
                          <tr className="border-b border-slate-800 text-gray-500 font-mono">
                            <th className="pb-2">{lang === 'ar' ? 'المشترك' : 'Subscriber Email'}</th>
                            <th className="pb-2">{lang === 'ar' ? 'العيار والشرط' : 'Karat & Rule'}</th>
                            <th className="pb-2">{lang === 'ar' ? 'السعر المستهدف' : 'Target Limit'}</th>
                            <th className="pb-2">{lang === 'ar' ? 'تاريخ التفعيل' : 'Active Since'}</th>
                            <th className="pb-2">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-gray-300">
                          {(adminStats.recentAlerts || []).map((alt: any) => (
                            <tr key={alt.id}>
                              <td className="py-2.5 font-mono text-white">{alt.email}</td>
                              <td className="py-2.5 font-mono text-gray-300 uppercase">
                                <span className="text-[#D4AF37] font-bold mr-1">{alt.karat}</span> 
                                <span className="text-[10px] text-gray-400">({alt.type === 'below' ? 'Drop' : 'Rise'})</span>
                              </td>
                              <td className="py-2.5 font-bold font-mono text-white">{parseFloat(alt.threshold).toFixed(3)} OMR</td>
                              <td className="py-2.5 font-mono text-gray-500">{alt.date}</td>
                              <td className="py-2.5">
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold tracking-wide">
                                  {alt.status || 'Active'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}
        </section>
      )}

      {/* 9. STICKY BOTTOM BUY CALL TO ACTION */}
      {showStickyBuy && !isCheckoutOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0E1626]/95 border-t-2 border-[#D4AF37] p-4 text-center z-40 shadow-2xl flex flex-wrap items-center justify-between gap-4 max-w-7xl mx-auto rounded-t-xl" id="sticky-checkout-banner">
          <div className="flex items-center gap-3">
            <span className="hidden md:flex h-10 w-10 items-center justify-center bg-[#D4AF37]/10 rounded border border-[#D4AF37]/45 text-[#D4AF37]">
              👑
            </span>
            <div className="text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <span className="text-white text-sm font-bold block">{lang === 'ar' ? 'احمِ مشترياتك من التلاعب اليوم!' : 'Eliminate Jewelers Markup Today!'}</span>
              <span className="text-xs text-gray-400">{lang === 'ar' ? 'الدليل كامل بـ ٣.٩٩ ر.ع فقط (وفر ٦٣٪)' : 'Download Guide for 3.99 OMR (Slashed from 10.99 OMR)'}</span>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="bg-[#D4AF37] hover:bg-[#8B6F3D] text-black font-extrabold text-xs md:text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 transition active:scale-95 border border-white/10 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{lang === 'ar' ? 'شراء وتحميل فوري' : 'Get Guide Now'}</span>
          </button>
        </div>
      )}

      {/* 10. FLOATING AI CUSTOM ASSISTANT WIDGET */}
      <AIChatWidget lang={lang} />

      {/* Immersive Gold & Silver Bottom Live Ticker */}
      <div className="bg-slate-950 border-t border-b border-[#D4AF37]/20 py-3.5 overflow-hidden relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] uppercase tracking-wider font-mono font-bold text-[#D4AF37]/90 text-center">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-ping"></span>
            <span>{lang === 'ar' ? `سعر الفضة: ${currentPrices.silver.toFixed(3)} ر.ع` : `SILVER PRICE: ${currentPrices.silver.toFixed(3)} OMR`}</span>
          </div>
          <span className="hidden md:inline opacity-30">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span>{lang === 'ar' ? "مؤشر سوق مطرح: مستقر وقوي" : "MUTTRAH SOUQ TREND: STABLE"}</span>
          </div>
          <span className="hidden md:inline opacity-30">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
            <span>{lang === 'ar' ? "شراء مسموح: ١٠,٠٠٠ ر.ع / يوم" : "BUYING LIMIT: 10,000 OMR / DAY"}</span>
          </div>
          <span className="hidden md:inline opacity-30">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>
            <span>{lang === 'ar' ? "عمان: الذهب معفى من القيمة المضافة" : "VAT EXEMPTION: INVESTMENT GOLD"}</span>
          </div>
        </div>
      </div>

      {/* 11. FOOTER POLICY SEGMENT */}
      <footer className="border-t border-[#D4AF37]/15 bg-[#050A11] pt-12 pb-24 md:pb-12 text-gray-400 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Branding Column */}
            <div className="space-y-3" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <div className="flex items-center gap-2">
                <span className="text-xl">✨</span>
                <span className="font-extrabold text-white uppercase font-mono tracking-wider">{lang === 'ar' ? 'دليل الذهب العماني' : 'OMAN GOLD GUIDE'}</span>
              </div>
              <p className="text-xs leading-relaxed max-w-xs">
                {lang === 'ar'
                  ? 'منصة حماية المستهلك والتمكين المالي لشراء الذهب والسبائك في سلطنة عمان.'
                  : 'Empowering gold, silver and bullion buyers inside the Omani Souqs effectively.'
                }
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-3" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{lang === 'ar' ? 'وصلات تصفح سريعة' : 'Navigation Links'}</h4>
              <ul className="space-y-2">
                <li><button onClick={() => { setActivePage('home'); window.scrollTo(0,0); }} className="hover:text-white transition cursor-pointer">{lang === 'ar' ? 'الرئيسية' : 'Home'}</button></li>
                <li><button onClick={() => { setActivePage('preview'); window.scrollTo(0,0); }} className="hover:text-white transition cursor-pointer">{lang === 'ar' ? 'تصفح عينة عينات' : 'Interactive Flipbook'}</button></li>
                <li><button onClick={() => { setActivePage('blog'); window.scrollTo(0,0); }} className="hover:text-white transition cursor-pointer">{lang === 'ar' ? 'المدونة المعرفية' : 'Open Blog'}</button></li>
              </ul>
            </div>

            {/* Support desk Column */}
            <div className="space-y-3" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{lang === 'ar' ? 'الدعم الفني المباشر' : 'Get Support'}</h4>
              <p className="text-xs leading-normal">
                {lang === 'ar' ? 'البريد الإلكتروني لدائرة المستلزمات والمشتريات:' : 'Sales Support Email Channels:'} <br />
                <span className="font-mono text-white">support@omangoldbuyerguide.com</span>
              </p>
              <p className="text-xs">
                {lang === 'ar' ? 'أوقات العمل: من السبت للخميس (٨ ص - ٦ م)' : 'Timings: Sat to Thu • 8:00 AM to 6:00 PM GST'}
              </p>
            </div>

            {/* Policies Column */}
            <div className="space-y-3 text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">{lang === 'ar' ? 'شروط وسياسات منصة البيع' : 'Legal Policies'}</h4>
              <ul className="space-y-2 text-xs">
                <li><span className="text-gray-400 block font-semibold">{lang === 'ar' ? 'سياسة استبدال المبيعات والمنتجات:' : 'Asset Delivery Terms:'}</span></li>
                <li className="leading-relaxed">
                  {lang === 'ar'
                    ? 'نظرًا لطبيعة المنتج الرقمي والولوج الفوري، تُطبق سياسة عدم الإلغاء الاحترافية ولا توجد مبالغ مسترجعة بعد إتمام التحميل.'
                    : 'All sales are final. Since downloadable digital items provide direct, instant access, a standard no refund policy applies.'
                  }
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-center md:text-right gap-4">
            <p>
              © 2026 Oman Gold Buyer Guide • {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All Rights Reserved.'} <br />
              <span className="opacity-45 block mt-1">{lang === 'ar' ? 'إخلاء مسؤولية: لا يعتبر هذا الموقع وسيطاً استشارياً مرخصاً لأسهم البورصة. الذهب أصل ادخاري تاريخي.' : 'Disclaimer: Precious metal values are subject to global spot oscillations. This asset serves educational index outcomes.'}</span>
            </p>

            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Sale</span>
              <span onClick={() => setActivePage('admin')} className="cursor-pointer hover:text-[#D4AF37] font-semibold text-[#D4AF37]/60">Admin Gateway</span>
            </div>
          </div>

        </div>
      </footer>

      {/* 12. SANDBOX CHECKOUT WIZARD MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E1626] border-2 border-[#D4AF37] w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden fade-in text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#8B6F3D] to-[#0F172A] p-5 text-white flex justify-between items-center border-b border-[#D4AF37]/15">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-[#D4AF37] w-5 h-5" />
                <h3 className="font-extrabold text-base md:text-lg">{lang === 'ar' ? 'بوابة الدفع الإلكتروني الآمنة بمسقط' : 'Secure Checkout Gateway'}</h3>
              </div>
              <button 
                onClick={() => { 
                  setIsCheckoutOpen(false); 
                  setCheckoutSuccess(false); 
                  setCheckoutName(''); 
                  setCheckoutEmail(''); 
                }} 
                className="text-gray-400 hover:text-white rounded-full p-1"
                disabled={isProcessingPayment}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {checkoutSuccess ? (
                /* Successful success scenario */
                <div className="text-center space-y-6 py-6 font-sans">
                  <div className="h-16 w-16 bg-[#D4AF37]/20 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full mx-auto flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white">{lang === 'ar' ? 'تم الدفع بنجاح وتحصيل الدليل!' : 'Payment Succeeded Successfully!'}</h3>
                    <p className="text-xs text-gray-400">
                      {lang === 'ar'
                        ? 'شكراً لك، تم إصدار أمر الشراء بنجاح. ملف الكتيب الشامل متاح للتحميل الفوري ليبقى معك.'
                        : 'Your order has been compiled. You can directly grab the Ultimate Omani Gold PDF.'
                      }
                    </p>
                  </div>

                  {/* Order detail receipts */}
                  {generatedOrder && (
                    <div className="bg-slate-900/90 rounded-xl p-4 border border-[#D4AF37]/10 text-xs text-gray-300 font-mono space-y-2 text-right">
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span>Invoice No:</span> <span className="text-white font-bold">{generatedOrder.id}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span>Customer Name:</span> <span className="text-white">{generatedOrder.name}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span>Email Address:</span> <span className="text-white">{generatedOrder.email}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span>Amount Paid:</span> <span className="text-[#D4AF37] font-bold">{generatedOrder.amount} OMR</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery status:</span> <span className="text-emerald-400">Direct Download Link Granted</span>
                      </div>
                    </div>
                  )}

                  {/* Immediate download links */}
                  <div className="space-y-2 pt-2">
                    <a
                      href={`/api/download?orderId=${generatedOrder?.id || ''}`}
                      className="w-full bg-[#D4AF37] hover:bg-[#8B6F3D] text-black font-extrabold text-sm py-4 rounded-xl flex items-center justify-center gap-2 transition duration-300 transform active:scale-95 glow-gold cursor-pointer"
                    >
                      <Download className="w-5 h-5 animate-bounce" />
                      <span>{lang === 'ar' ? 'تحميل كتيب الذهب بصيغة PDF' : 'Download Complete PDF Document'}</span>
                    </a>
                    
                    <button
                      onClick={() => { 
                        setIsCheckoutOpen(false); 
                        setCheckoutSuccess(false); 
                        setCheckoutName(''); 
                        setCheckoutEmail(''); 
                      }}
                      className="text-xs text-gray-500 hover:text-white transition mt-2 cursor-pointer"
                    >
                      {lang === 'ar' ? 'إغلاق والعودة للمنصة' : 'Done, Close Dialog'}
                    </button>
                  </div>
                </div>
              ) : (
                /* Initial input form */
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  
                  {/* Order summaries */}
                  <div className="bg-[#121B2E] p-4 rounded-xl border border-[#D4AF37]/10 flex flex-wrap justify-between items-center">
                    <div>
                      <span className="text-xs text-[#D4AF37] block font-bold font-mono">{lang === 'ar' ? 'المنتج الرقمي المرخص:' : 'Product License Title:'}</span>
                      <span className="text-white font-extrabold text-sm block">Ultimate Omani Gold Buying Guide (PDF)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-500 text-[10px] line-through block font-mono">10.99 OMR</span>
                      <span className="text-[#D4AF37] font-extrabold text-lg block font-mono">3.99 OMR</span>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">{lang === 'ar' ? 'الاسم بالكامل للمشتري (للرخصة):' : 'Full Customer Name (Licensed To):'}</label>
                      <input 
                        type="text" 
                        required 
                        value={checkoutName}
                        onChange={(e) => setCheckoutName(e.target.value)}
                        placeholder={lang === 'ar' ? 'الاسم بالكامل...' : 'Your Name...'}
                        className="w-full bg-[#070B14] border border-[#D4AF37]/20 rounded-lg p-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">{lang === 'ar' ? 'البريد الإلكتروني للتحميل وصك الملكية:' : 'Email Address (For Invoicing & Links):'}</label>
                      <input 
                        type="email" 
                        required 
                        value={checkoutEmail}
                        onChange={(e) => setCheckoutEmail(e.target.value)}
                        placeholder="name@email.com"
                        className="w-full bg-[#070B14] border border-[#D4AF37]/20 rounded-lg p-3 text-xs md:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-gray-400">{lang === 'ar' ? 'اختر آلية المعالجة الآمنة:' : 'Select secure payment gateway:'}</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('stripe')}
                        className={`p-3 rounded-lg border text-xs font-bold font-mono transition text-center ${paymentMethod === 'stripe' ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white' : 'bg-[#070B14] border-slate-800 text-gray-400 hover:border-slate-600'}`}
                      >
                        Stripe
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple')}
                        className={`p-3 rounded-lg border text-xs font-bold font-mono transition text-center ${paymentMethod === 'apple' ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white' : 'bg-[#070B14] border-slate-800 text-gray-400 hover:border-slate-600'}`}
                      >
                        ApplePay
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('google')}
                        className={`p-3 rounded-lg border text-xs font-bold font-mono transition text-center ${paymentMethod === 'google' ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white' : 'bg-[#070B14] border-slate-800 text-gray-400 hover:border-slate-600'}`}
                      >
                        GooglePay
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`p-3 rounded-lg border text-xs font-bold font-mono transition text-center ${paymentMethod === 'paypal' ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white' : 'bg-[#070B14] border-slate-800 text-gray-400 hover:border-slate-600'}`}
                      >
                        PayPal
                      </button>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isProcessingPayment || !checkoutName || !checkoutEmail}
                      className="w-full bg-[#D4AF37] text-black font-extrabold py-3.5 rounded-xl transition duration-300 transform active:scale-98 flex items-center justify-center gap-2 text-xs md:text-sm cursor-pointer disabled:opacity-50"
                    >
                      {isProcessingPayment ? (
                        <>
                          <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                          <span>{lang === 'ar' ? 'معالجة الاتصال المشفر للبنك...' : 'Validating secure banking transaction...'}</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>{lang === 'ar' ? 'سداد ٣.٩٩ ر.ع وتحميل الدليل' : 'Pay 3.99 OMR & Secure PDF'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[10px] text-gray-500 text-center uppercase font-mono mt-2 tracking-wider">
                    🔒 SSL 256-Bit Cryptographic Tunnel Standard Active • MOCIIP compliant
                  </p>

                </form>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 13. DYNAMIC CHAPTER CONTENT EXTRACT MODAL */}
      {selectedChapter && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E1626] border-2 border-[#D4AF37] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden fade-in text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#8B6F3D] to-[#0F172A] p-5 text-white flex justify-between items-center border-b border-[#D4AF37]/15">
              <span className="text-[#D4AF37] font-mono text-xs font-semibold">{lang === 'ar' ? `معاينة حصرية للفصل ${selectedChapter.id}` : `Chapter ${selectedChapter.id} Sample Text`}</span>
              <button 
                onClick={() => setSelectedChapter(null)} 
                className="text-gray-400 hover:text-white rounded-full p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 space-y-4">
              <h3 className="text-xl md:text-2xl font-black text-white">
                {lang === 'ar' ? selectedChapter.titleAr : selectedChapter.titleEn}
              </h3>
              
              <div className="bg-black/40 p-5 rounded-xl border border-[#D4AF37]/10 text-xs md:text-sm text-gray-200 leading-relaxed italic whitespace-pre-wrap">
                "{lang === 'ar' ? selectedChapter.sampleContentAr : selectedChapter.sampleContentEn}"
              </div>

              <div className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/10 text-xs text-gray-400 leading-normal">
                {lang === 'ar'
                  ? 'تمثل هذه الفقرة حوالي ١٥٪ فقط من إجمالي محتوى وشروحات هذا الفصل داخل الكتيب المبيع.'
                  : 'This represents about 15% of the comprehensive educational data mapped within the guide bundle.'
                }
              </div>

              <div className="pt-4 border-t border-[#D4AF37]/10 flex flex-wrap justify-between items-center gap-4">
                <span className="text-slate-500 font-mono text-xs">Pages Range: {selectedChapter.pagesRange}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSelectedChapter(null)}
                    className="px-4 py-2 border border-slate-700 text-gray-400 text-xs rounded hover:text-white transition cursor-pointer"
                  >
                    {lang === 'ar' ? 'إغلاق المعاينة' : 'Close Excerpt'}
                  </button>
                  <button 
                    onClick={() => { setSelectedChapter(null); setIsCheckoutOpen(true); }}
                    className="px-5 py-2 bg-[#D4AF37] text-black font-extrabold text-xs rounded hover:bg-[#8B6F3D] transition cursor-pointer"
                  >
                    {lang === 'ar' ? 'امتلك الكتيب بالكامل' : 'Instant Grab Manual'}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 14. EXIT POPUP ENGAGEMENT MODAL */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0E1626] border-2 border-dashed border-[#D4AF37] w-full max-w-md rounded-2xl p-6 text-center space-y-6 fade-in text-right" style={{ textAlign: lang === 'ar' ? 'right' : 'left' }}>
            
            <div className="h-12 w-12 bg-amber-500/10 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full mx-auto flex items-center justify-center">
              <Percent className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-black text-white">{lang === 'ar' ? 'انتظر! لا تفوت فرصة الأمان المالي' : 'Hold on! Secure your capital savings'}</h3>
              <p className="text-xs text-gray-300 mx-auto max-w-xs leading-relaxed">
                {lang === 'ar'
                  ? 'هل أنت مستعد لمخاطرة مئات الريالات أمام الصاغة؟ احصل على الدليل الذهبي للتحميل الفوري بدقائق بخصم ٦٣٪ بـ ٣.٩٩ ر.ع فقط!'
                  : 'Are you ready to risk hundreds of Rials under jeweler quotes? Secure the Omani gold checklist and buyback codes now.'
                }
              </p>
            </div>

            <div className="space-y-2">
              <button 
                onClick={() => { setShowExitPopup(false); setIsCheckoutOpen(true); }}
                className="w-full bg-[#D4AF37] text-black font-black py-3.5 rounded-xl hover:bg-[#8B6F3D] transition cursor-pointer text-center"
              >
                {lang === 'ar' ? 'نعم، دلني على الأمن بـ ٣.٩٩ ر.ع' : 'Yes, Securitize My Souq Purchases • 3.99 OMR'}
              </button>
              
              <button 
                onClick={() => setShowExitPopup(false)}
                className="w-full bg-slate-900 border border-slate-800 text-gray-400 text-xs py-2.5 rounded-xl hover:text-white transition cursor-pointer text-center"
              >
                {lang === 'ar' ? 'لا، سأجازف بالنزول للسوق بجهلي' : 'No, I will handle merchants blindly'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
