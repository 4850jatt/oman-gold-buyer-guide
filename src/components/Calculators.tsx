import React, { useState } from 'react';
import { GoldPrice } from '../types';
import { Calculator, Coins, TrendingUp, ShieldAlert, Sparkles, Scale, Info, CheckCircle2 } from 'lucide-react';

interface CalculatorsProps {
  currentPrices: GoldPrice;
  lang: 'ar' | 'en';
}

export default function Calculators({ currentPrices, lang }: CalculatorsProps) {
  const [activeTab, setActiveTab] = useState<'gold' | 'purity' | 'investment' | 'jewelry' | 'savings'>('gold');

  // Calculator states
  // 1. Live Gold Calc
  const [gcWeight, setGcWeight] = useState<number>(10);
  const [gcKarat, setGcKarat] = useState<'24' | '22' | '21' | '18'>('22');
  const [gcMaking, setGcMaking] = useState<number>(2.5);

  // 2. Purity Calc
  const [pcTotalWeight, setPcTotalWeight] = useState<number>(25);
  const [pcHallmark, setPcHallmark] = useState<'999' | '916' | '875' | '750' | '585'>('916');
  const [pcStoneWeight, setPcStoneWeight] = useState<number>(2);

  // 3. Investment Calc
  const [icInvest, setIcInvest] = useState<number>(50); // Monthly contribution in OMR
  const [icRate, setIcRate] = useState<number>(9.5); // Expected annual appreciation in %
  const [icYears, setIcYears] = useState<number>(5);

  // 4. Jewelry Value Calc
  const [jvShowcasePrice, setJvShowcasePrice] = useState<number>(310);
  const [jvWeight, setJvWeight] = useState<number>(11.5);
  const [jvKarat, setJvKarat] = useState<'24' | '22' | '21' | '18'>('22');

  // 5. Savings Calc
  const [scYears, setScYears] = useState<number>(5);
  const [scCashAmount, setScCashAmount] = useState<number>(1000);

  // Helper translations
  const t = {
    title: lang === 'ar' ? 'أدوات ومحاسبات الذهب الذكية' : 'Smart Gold Calculators & Tools',
    sub: lang === 'ar' ? 'احمِ استثماراتك ووازن خياراتك المالية بسهولة تامة' : 'Protect your investments and balance your financial choices easily',
    karat: lang === 'ar' ? 'عيار الذهب' : 'Gold Karat',
    weight: lang === 'ar' ? 'الوزن بالجرام' : 'Weight in Grams',
    makingCharge: lang === 'ar' ? 'المصنعية للجرام (ر.ع)' : 'Making Charge/Gram (OMR)',
    calculate: lang === 'ar' ? 'احسب الآن' : 'Calculate Now',
    results: lang === 'ar' ? 'النتائج المحسوبة' : 'Calculated Results',
    totalPrice: lang === 'ar' ? 'السعر الإجمالي الكلي' : 'Total Net Retail Price',
    rawGoldValue: lang === 'ar' ? 'قيمة الذهب الخام الصافي' : 'Pure Raw Metal Worth',
    totalMakingCharge: lang === 'ar' ? 'إجمالي أجور المصنعية وصياغة' : 'Total Handcraft Making Charges',
    omr: lang === 'ar' ? 'ر.ع' : 'OMR',
    grams: lang === 'ar' ? 'جرام' : 'grams',
    purityLabel: lang === 'ar' ? 'نسبة نقاء السبيكة' : 'Purity Percentage',
    pureGoldWeight: lang === 'ar' ? 'وزن الذهب الخالص في القطعة' : 'Pure Gold Content Weight',
    alloyWeight: lang === 'ar' ? 'وزن المعادن المضافة الأخرى' : 'Other Alloy Metals Weight',
    investmentGrowth: lang === 'ar' ? 'النمو الاستثماري المتوقع للذهب' : 'Projected Gold Investment Value',
    totalInvested: lang === 'ar' ? 'إجمالي المبالغ المدخرة' : 'Total Amount Invested',
    futureValue: lang === 'ar' ? 'القيمة المستقبلية المقدرة بالتضخم' : 'Estimated Future Valuation',
    accumulatedGrams: lang === 'ar' ? 'جرامات الذهب المتراكمة' : 'Accumulated Gold (Grams)',
    appreciationLabel: lang === 'ar' ? 'العائد السنوي المتوقع (٪)' : 'Est. Annual Appreciation (%)',
    spanYears: lang === 'ar' ? 'المدة الزمنية (سنوات)' : 'Span of Investment (Years)',
    jewelryValueTab: lang === 'ar' ? 'تقييم سعر الصائغ' : 'Jeweler Fair-Value Decoupler',
    showcasePrice: lang === 'ar' ? 'السعر الكلي المعروض بالمحل' : 'Showcase Retail Price in Shop',
    fairMetalValue: lang === 'ar' ? 'القيمة العادلة الفورية للذهب' : 'Fair Raw Intrinsic Metal Value',
    impliedMakingCharge: lang === 'ar' ? 'أجور الصياغة المفتعلة لكل جرام' : 'Implied Making Charge Per Gram',
    alertOverpaying: lang === 'ar' ? 'انتبه: مصنعية الصياغة مرتفعة جداً!' : 'Warning: Extremely High Making Charges!',
    goodValue: lang === 'ar' ? 'مصنعية مقبولة وعادلة للعمل اليدوي.' : 'Fair, acceptable pricing for custom craftsmanship.',
    excellentValue: lang === 'ar' ? 'قيمة ممتازة مقارنة بالسعر الخام!' : 'Superb pricing, extremely close to raw metal cost!',
    savingsTitle: lang === 'ar' ? 'مقارن التضخم: النقد مقابل الذهب' : 'Inflation Shield: Cash vs. Gold',
    initCash: lang === 'ar' ? 'مبلغ الادخار المبدئي (ر.ع)' : 'Initial Savings Amount (OMR)',
    cashLeft: lang === 'ar' ? 'القيمة الشرائية للنقد بعد سنوات' : 'Purchasing Power of Cash After Span',
    goldSavingsValue: lang === 'ar' ? 'قيمة الذهب المتوقعة بعد سنوات' : 'Projected Value of Gold After Span',
    lossOfPurchasing: lang === 'ar' ? 'خسارة القيمة النقدية بسبب التضخم' : 'Loss of Cash Value to Inflation (est. 3% yearly)',
    goldGain: lang === 'ar' ? 'صعود القوة الشرائية عند حفظها بالذهب' : 'Purchasing Power Shield through Gold Holding',
  };

  // 1. Calculations
  const getKaratPrice = (k: string) => {
    switch (k) {
      case '24': return currentPrices.karat24;
      case '22': return currentPrices.karat22;
      case '21': return currentPrices.karat21;
      case '18': return currentPrices.karat18;
      default: return currentPrices.karat22;
    }
  };

  const rawMetalWorth = gcWeight * getKaratPrice(gcKarat);
  const totalMaking = gcWeight * gcMaking;
  const totalRetailPrice = rawMetalWorth + totalMaking;

  // 2. Purity calculations
  const hallmarkMultipliers: { [key: string]: number } = {
    '999': 0.999,
    '916': 0.916,
    '875': 0.875,
    '750': 0.750,
    '585': 0.585
  };
  const netMetalWeight = Math.max(0, pcTotalWeight - pcStoneWeight);
  const pureGoldContent = netMetalWeight * hallmarkMultipliers[pcHallmark];
  const alloyContent = Math.max(0, netMetalWeight - pureGoldContent);

  // 3. Investment calculations
  // Future value of ordinary annuity: PMT * [((1 + r/12)^(n*12) - 1) / (r/12)]
  const monthlyRate = (icRate / 100) / 12;
  const totalMonths = icYears * 12;
  const icTotalInvested = icInvest * totalMonths;
  let icFutureValue = 0;
  if (monthlyRate > 0) {
    icFutureValue = icInvest * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  } else {
    icFutureValue = icTotalInvested;
  }
  const avg24KPrice = currentPrices.karat24;
  const estAccumulatedGrams = icFutureValue / avg24KPrice;

  // 4. Fair Value checker
  const jvPricePerGram = getKaratPrice(jvKarat);
  const jvIntrinsicWorth = jvWeight * jvPricePerGram;
  const jvTotalMarkup = Math.max(0, jvShowcasePrice - jvIntrinsicWorth);
  const jvImpliedMakingPerGram = jvWeight > 0 ? jvTotalMarkup / jvWeight : 0;
  
  // Implied rating
  let impliedRating: 'green' | 'yellow' | 'red' = 'green';
  if (jvImpliedMakingPerGram > 4.5) {
    impliedRating = 'red';
  } else if (jvImpliedMakingPerGram > 2.0) {
    impliedRating = 'yellow';
  } else {
    impliedRating = 'green';
  }

  // 5. Cash vs Gold calculator (Shield)
  // Assuming 3.2% annual inflation. Cash depreciation: Cash * (1 - 0.032)^Years
  const finalCashPurchasingPower = scCashAmount * Math.pow(1 - 0.032, scYears);
  const cashLostValue = scCashAmount - finalCashPurchasingPower;
  // Assuming gold appreciates at average 8.5% annual rate
  const goldAppreciatedWorth = scCashAmount * Math.pow(1 + 0.085, scYears);

  return (
    <div className="w-full bg-[#0F172A] border-2 border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden my-12" id="smart-gold-calculators">
      {/* Pattern Bar */}
      <div className="h-2 bg-gradient-to-r from-[#8B6F3D] via-[#D4AF37] to-[#8B6F3D]"></div>

      {/* Header */}
      <div className="p-8 text-center border-b border-[#D4AF37]/20 bg-gradient-to-b from-black/50 to-transparent">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] mb-4">
          <Calculator className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wide uppercase font-mono">{lang === 'ar' ? 'حاسبة الذهب العمانية' : 'Omani Gold Calculator Engine'}</span>
        </div>
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
          {t.title}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          {t.sub}
        </p>
      </div>

      {/* Calculator Tabs */}
      <div className="flex flex-wrap border-b border-[#D4AF37]/10 bg-black/40 p-2 gap-1 md:gap-2">
        <button
          onClick={() => setActiveTab('gold')}
          className={`flex-1 min-w-[120px] py-3 px-4 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'gold'
              ? 'bg-[#D4AF37] text-black font-semibold shadow-lg'
              : 'text-gray-400 hover:text-[#D4AF37] hover:bg-white/5'
          }`}
        >
          <Coins className="w-4 h-4" />
          <span>{lang === 'ar' ? 'حساب سعر القطعة' : 'Piece Pricing'}</span>
        </button>

        <button
          onClick={() => setActiveTab('purity')}
          className={`flex-1 min-w-[120px] py-3 px-4 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'purity'
              ? 'bg-[#D4AF37] text-black font-semibold shadow-lg'
              : 'text-gray-400 hover:text-[#D4AF37] hover:bg-white/5'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>{lang === 'ar' ? 'فحص نقاء الوزن' : 'Purity & Weight'}</span>
        </button>

        <button
          onClick={() => setActiveTab('jewelry')}
          className={`flex-1 min-w-[120px] py-3 px-4 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'jewelry'
              ? 'bg-[#D4AF37] text-black font-semibold shadow-lg'
              : 'text-gray-400 hover:text-[#D4AF37] hover:bg-white/5'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{t.jewelryValueTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('investment')}
          className={`flex-1 min-w-[120px] py-3 px-4 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'investment'
              ? 'bg-[#D4AF37] text-black font-semibold shadow-lg'
              : 'text-gray-400 hover:text-[#D4AF37] hover:bg-white/5'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{lang === 'ar' ? 'مستقبل الاستثمار' : 'Growth Estimate'}</span>
        </button>

        <button
          onClick={() => setActiveTab('savings')}
          className={`flex-1 min-w-[120px] py-3 px-4 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'savings'
              ? 'bg-[#D4AF37] text-black font-semibold shadow-lg'
              : 'text-gray-400 hover:text-[#D4AF37] hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'ar' ? 'درع التضخم' : 'Inflation Shield'}</span>
        </button>
      </div>

      {/* Inner Panels */}
      <div className="p-6 md:p-8">
        
        {/* TAB 1: PIECE PRICING */}
        {activeTab === 'gold' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start fade-in">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-[#D4AF37]/20 pb-2">
                <Coins className="text-[#D4AF37] w-5 h-5" />
                <span>{lang === 'ar' ? 'تقدير معيار الصياغة والسعر' : 'Estimate Fabricated Piece cost'}</span>
              </h3>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{t.weight}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={gcWeight}
                    onChange={(e) => setGcWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-[#D4AF37]/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <span className="absolute right-4 top-3 text-gray-500 font-mono">g</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{t.karat}</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['24', '22', '21', '18'] as const).map((kar) => (
                    <button
                      key={kar}
                      onClick={() => setGcKarat(kar)}
                      className={`py-3 rounded-lg font-bold border font-mono transition-all duration-200 ${
                        gcKarat === kar
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                          : 'bg-slate-900 text-gray-300 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      {kar}K
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-300 font-medium">{t.makingCharge}</label>
                  <span className="text-xs text-[#D4AF37] font-mono">
                    {lang === 'ar' ? 'المتداول بالعاصمة: ٢ إلى ٥ ر.ع' : 'Standard OOM rate: 2 to 5 OMR'}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={gcMaking}
                  onChange={(e) => setGcMaking(parseFloat(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
                <div className="flex justify-between text-xs text-gray-500 font-mono mt-1">
                  <span>0 OMR</span>
                  <span className="font-bold text-[#D4AF37]">{gcMaking} OMR / gram</span>
                  <span>10 OMR</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-slate-900/80 p-6 rounded-xl border border-[#D4AF37]/20 flex flex-col justify-between h-full space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest font-mono mb-4">{t.results}</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10">
                    <span className="text-gray-400">{t.rawGoldValue}</span>
                    <span className="text-white font-mono font-semibold text-lg">{rawMetalWorth.toFixed(3)} {t.omr}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10">
                    <span className="text-gray-400">{t.totalMakingCharge}</span>
                    <span className="text-[#D4AF37] font-mono font-semibold text-lg">+{totalMaking.toFixed(3)} {t.omr}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-[#D4AF37]/30">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs text-gray-400 block mb-1">{t.totalPrice}</span>
                    <span className="text-2xl font-bold font-mono text-white glow-gold">{totalRetailPrice.toFixed(3)}</span>
                  </div>
                  <span className="text-xl font-bold text-[#D4AF37]">{t.omr}</span>
                </div>
              </div>

              <div className="p-3 bg-[#D4AF37]/5 rounded-lg border border-[#D4AF37]/20 text-xs text-gray-400 flex gap-2">
                <Info className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>
                  {lang === 'ar' 
                    ? 'هذا التقدير مفلت تماماً من ضريبة القيمة المضافة ومستند لسعر الذهب الفعلي لليوم. ننصحك بالمفاوضة بناءً على هذه الأرقام.'
                    : 'This estimate calculates raw metals + isolated making fee. Taxes (VAT) may apply. Use this decoupled pricing matrix to negotiate firmly.'
                  }
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PURITY & WEIGHT */}
        {activeTab === 'purity' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start fade-in">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-[#D4AF37]/20 pb-2">
                <Scale className="text-[#D4AF37] w-5 h-5" />
                <span>{lang === 'ar' ? 'حساب نقاوة الذهب ووزنه الصافي' : 'Calculate Gold Purity Content'}</span>
              </h3>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{lang === 'ar' ? 'الوزن الإجمالي للقطعة (مع الأحجار)' : 'Gross Item Weight (Includes Stones)'}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={pcTotalWeight}
                    onChange={(e) => setPcTotalWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-[#D4AF37]/30 rounded-lg py-3 px-4 text-white focus:outline-none"
                  />
                  <span className="absolute right-4 top-3 text-gray-500 font-mono">g</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{lang === 'ar' ? 'تقدير وزن الأحجار والفصوص (إن وجد)' : 'Estimated stones/gems weight (if any)'}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={pcStoneWeight}
                    onChange={(e) => setPcStoneWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-[#D4AF37]/30 rounded-lg py-3 px-4 text-white focus:outline-none"
                  />
                  <span className="absolute right-4 top-3 text-gray-500 font-mono">g</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{lang === 'ar' ? 'ختم الدمغة / العيار' : 'Hallmark / Karat Stamp'}</label>
                <select
                  value={pcHallmark}
                  onChange={(e: any) => setPcHallmark(e.target.value)}
                  className="w-full bg-slate-900 border border-[#D4AF37]/30 rounded-lg p-3 text-white focus:outline-none"
                >
                  <option value="999">999 - {lang === 'ar' ? 'بندقي عيار ٢٤ قيراط' : '24K Pure'}</option>
                  <option value="916">916 - {lang === 'ar' ? 'مشرك عيار ٢٢ قيراط' : '22K Standard'}</option>
                  <option value="875">875 - {lang === 'ar' ? 'محلي عيار ٢١ قيراط' : '21K Traditional'}</option>
                  <option value="750">750 - {lang === 'ar' ? 'أفرنجي عيار ١٨ قيراط' : '18K Jewelry'}</option>
                  <option value="585">585 - {lang === 'ar' ? 'عيار ١٤ قيراط' : '14K Low alloy'}</option>
                </select>
              </div>
            </div>

            {/* Results */}
            <div className="bg-slate-900/80 p-6 rounded-xl border border-[#D4AF37]/20 flex flex-col justify-between h-full space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest font-mono mb-4">{t.results}</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10">
                    <span className="text-gray-400">{lang === 'ar' ? 'نسبة نقاوة ذهب القطعة:' : 'Net Gold Purity Ratio:'}</span>
                    <span className="text-[#D4AF37] font-mono font-bold">{(hallmarkMultipliers[pcHallmark] * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10">
                    <span className="text-gray-400">{lang === 'ar' ? 'الوزن المعدني الصافي:' : 'Net Raw Metal Weight:'}</span>
                    <span className="text-white font-mono font-semibold">{netMetalWeight.toFixed(2)} g</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10">
                    <span className="text-gray-400 text-sm font-medium text-[#D4AF37]">{t.pureGoldWeight}</span>
                    <span className="text-white font-mono font-bold text-xl">{pureGoldContent.toFixed(3)} g</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10">
                    <span className="text-gray-400">{t.alloyWeight}</span>
                    <span className="text-gray-500 font-mono">{alloyContent.toFixed(3)} g</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/30 text-xs text-gray-300 space-y-2">
                <div className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>{lang === 'ar' ? 'توصية الخبراء في عمان:' : 'Expert Omani Recommendation:'}</span>
                </div>
                <p>
                  {lang === 'ar'
                    ? 'احذر من شراء قطع تحوي أحجاراً ثقيلة غير قيمة مسعّرة بوزن الذهب نفسه. اطلب دائماً تصفية وزن الحلية من فصوص الزجاج والخرز قبل الدفع.'
                    : 'Be cautious of heavy synthetic gems charged at pure gold raw prices. Insist that the jeweler calculates the net gold content separately.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: JEWELER FAIR-VALUE DECOUPLER */}
        {activeTab === 'jewelry' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start fade-in">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-[#D4AF37]/20 pb-2">
                <ShieldAlert className="text-[#D4AF37] w-5 h-5" />
                <span>{lang === 'ar' ? 'فصل وتعرية هامش ربح الصائد' : 'Expose Jeweler Markup Fees'}</span>
              </h3>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{t.showcasePrice}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={jvShowcasePrice}
                    onChange={(e) => setJvShowcasePrice(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-[#D4AF37]/30 rounded-lg py-3 px-4 text-white focus:outline-none"
                  />
                  <span className="absolute right-4 top-3 text-[#D4AF37] font-bold">{t.omr}</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{t.weight}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={jvWeight}
                    onChange={(e) => setJvWeight(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-[#D4AF37]/30 rounded-lg py-3 px-4 text-white focus:outline-none"
                  />
                  <span className="absolute right-4 top-3 text-gray-500 font-mono">g</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{t.karat}</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['24', '22', '21', '18'] as const).map((kar) => (
                    <button
                      key={kar}
                      onClick={() => setJvKarat(kar)}
                      className={`py-3 rounded-lg font-bold border font-mono transition-all duration-200 ${
                        jvKarat === kar
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                          : 'bg-slate-900 text-gray-300 border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      {kar}K
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-slate-900/80 p-6 rounded-xl border border-[#D4AF37]/20 flex flex-col justify-between h-full space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest font-mono mb-4">{t.results}</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10">
                    <span className="text-gray-400">{t.fairMetalValue}</span>
                    <span className="text-white font-mono font-semibold">{jvIntrinsicWorth.toFixed(3)} {t.omr}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10">
                    <span className="text-gray-400">{lang === 'ar' ? 'إجمالي زيادة سعر الصائغ:' : 'Implied Handcraft Margin:'}</span>
                    <span className={`font-mono font-bold ${jvTotalMarkup > 0 ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                      +{jvTotalMarkup.toFixed(3)} {t.omr}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10 bg-slate-800/50 p-3 rounded-lg">
                    <span className="text-white font-medium text-xs md:text-sm">{t.impliedMakingCharge}</span>
                    <span className={`font-mono font-bold text-lg ${impliedRating === 'red' ? 'text-red-400' : 'text-emerald-400'}`}>
                      {jvImpliedMakingPerGram.toFixed(3)} {t.omr}/g
                    </span>
                  </div>
                </div>
              </div>

              {/* Severity Advice */}
              <div className={`p-4 rounded-lg border text-sm ${
                impliedRating === 'red'
                  ? 'bg-red-500/10 border-red-500/30 text-red-300'
                  : impliedRating === 'yellow'
                  ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              }`}>
                <div className="font-bold flex items-center gap-1 mb-1">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>{impliedRating === 'red' ? t.alertOverpaying : lang === 'ar' ? 'تقييم السعر ماليًا:' : 'Financial Price Assessment:'}</span>
                </div>
                <p className="text-xs">
                  {impliedRating === 'red'
                    ? (lang === 'ar' 
                      ? 'رسوم الصائغ المفتعلة لكل جرام تتجاوز 4.5 ريال عماني! هذه مصنعية باهظة ومبالغ فيها جداً. لا تتردد بالمفاوضة لخفض السعر الكلي بذكاء.'
                      : 'The isolated manufacturing mark-up exceeds 4.5 OMR per gram! This is extremely inflated. Demand a heavy bargain and lower their margin fees!')
                    : impliedRating === 'yellow'
                    ? (lang === 'ar'
                      ? 'معدل مصنعية طبيعي للقطع العمانية المصنوعة يدويًا والناعمة. التفاوض البسيط قد يفي بالغرض.'
                      : 'Typical acceptable rate for handcrafted traditional jewelry. A slight negotiation will seal a great purchase.')
                    : (lang === 'ar'
                      ? 'قيمة عادلة استثنائية! سعر المصنعية أقل من ٢ ريالات للجرام. هذا قريب جداً من سعر الذهب الخام الفعلي.'
                      : 'Superb fair price! Implied cost is under 2 OMR/g. This is exceptionally close to wholesale raw gold values.')
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GROWTH ESTIMATE */}
        {activeTab === 'investment' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start fade-in">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-[#D4AF37]/20 pb-2">
                <TrendingUp className="text-[#D4AF37] w-5 h-5" />
                <span>{lang === 'ar' ? 'محاكي نمو محفظة الذهب للادخار' : 'Gold Investment Growth Simulator'}</span>
              </h3>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{lang === 'ar' ? 'الادخار الشهري المخطط له (ر.ع)' : 'Target Monthly Contribution (OMR)'}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={icInvest}
                    onChange={(e) => setIcInvest(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-[#D4AF37]/30 rounded-lg py-3 px-4 text-white focus:outline-none"
                  />
                  <span className="absolute right-4 top-3 text-[#D4AF37] font-bold">{t.omr}</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{t.appreciationLabel}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={icRate}
                    onChange={(e) => setIcRate(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-[#D4AF37]/30 rounded-lg py-3 px-4 text-white focus:outline-none"
                    step="0.1"
                  />
                  <span className="absolute right-4 top-3 text-gray-500 font-mono">%</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{t.spanYears}</label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={icYears}
                  onChange={(e) => setIcYears(parseInt(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
                <div className="flex justify-between text-xs text-gray-500 font-mono mt-1">
                  <span>1 {lang === 'ar' ? 'سنة' : 'year'}</span>
                  <span className="font-bold text-[#D4AF37]">{icYears} {lang === 'ar' ? 'سنوات' : 'years'}</span>
                  <span>15 {lang === 'ar' ? 'سنة' : 'years'}</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-slate-900/80 p-6 rounded-xl border border-[#D4AF37]/20 flex flex-col justify-between h-full space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest font-mono mb-4">{t.results}</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10">
                    <span className="text-gray-400">{t.totalInvested}</span>
                    <span className="text-white font-mono font-semibold">{icTotalInvested.toFixed(0)} {t.omr}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10">
                    <span className="text-gray-400 text-sm font-semibold text-[#D4AF37]">{t.futureValue}</span>
                    <span className="text-white font-mono font-bold text-2xl glow-gold">{icFutureValue.toFixed(2)} {t.omr}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#D4AF37]/10 bg-slate-800/80 p-3 rounded-lg">
                    <span className="text-gray-300 text-xs md:text-sm">{t.accumulatedGrams}</span>
                    <span className="text-white font-mono font-bold text-lg">{estAccumulatedGrams.toFixed(1)} g</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#D4AF37]/5 rounded-lg border border-[#D4AF37]/20 text-xs text-gray-400">
                <p>
                  {lang === 'ar'
                    ? 'الذهب يعتبر الملاذ الآمن التاريخي الأول. تاريخيًا، صعد معدل الذهب عالميًا بمعدل ٨-١١٪ سنويًا مما يحمي المدخرات تماماً من غلاء المعيشة وضعف العملات.'
                    : 'Historically, precious metals hold an average long-term growth of 8-11% annually. Your physical savings insulate capital securely against dynamic currency downfalls.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: INFLATION SHIELD */}
        {activeTab === 'savings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start fade-in">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-[#D4AF37]/20 pb-2">
                <Sparkles className="text-[#D4AF37] w-5 h-5" />
                <span>{t.savingsTitle}</span>
              </h3>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{t.initCash}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={scCashAmount}
                    onChange={(e) => setScCashAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-slate-900 border border-[#D4AF37]/30 rounded-lg py-3 px-4 text-white focus:outline-none"
                  />
                  <span className="absolute right-4 top-3 text-[#D4AF37] font-bold">{t.omr}</span>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2 font-medium">{t.spanYears}</label>
                <input
                  type="range"
                  min="2"
                  max="15"
                  value={scYears}
                  onChange={(e) => setScYears(parseInt(e.target.value))}
                  className="w-full accent-[#D4AF37]"
                />
                <div className="flex justify-between text-xs text-gray-500 font-mono mt-1">
                  <span>2 {lang === 'ar' ? 'سنوات' : 'years'}</span>
                  <span className="font-bold text-[#D4AF37]">{scYears} {lang === 'ar' ? 'سنوات' : 'years'}</span>
                  <span>15 {lang === 'ar' ? 'سنة' : 'years'}</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-slate-900/80 p-6 rounded-xl border border-[#D4AF37]/20 flex flex-col justify-between h-full space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest font-mono mb-4">{lang === 'ar' ? 'مقارنة القيمة بعد المدة المسجلة' : 'Value Comparison After Span'}</h4>
                <div className="space-y-4">
                  
                  {/* Cash View */}
                  <div className="pb-3 border-b border-[#D4AF37]/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-400 text-sm">{t.cashLeft}</span>
                      <span className="text-red-400 font-mono font-bold">{finalCashPurchasingPower.toFixed(0)} {t.omr}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 font-mono">
                      <span>{t.lossOfPurchasing}</span>
                      <span className="text-red-500/80">-{cashLostValue.toFixed(0)} OMR (-{(cashLostValue/scCashAmount*100).toFixed(0)}%)</span>
                    </div>
                  </div>

                  {/* Gold View */}
                  <div className="pb-3 border-b border-[#D4AF37]/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#D4AF37] text-sm font-bold">{t.goldSavingsValue}</span>
                      <span className="text-emerald-400 font-mono font-bold text-xl">{goldAppreciatedWorth.toFixed(0)} {t.omr}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 font-mono">
                      <span>{t.goldGain}</span>
                      <span className="text-emerald-500 font-bold">+{goldAppreciatedWorth - scCashAmount > 0 ? (goldAppreciatedWorth - scCashAmount).toFixed(0) : 0} OMR</span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/20 text-xs text-gray-400">
                <p>
                  {lang === 'ar'
                    ? 'يصاحب حفظ الأموال بأوراق النقد تآكل سنوي مستمر في القدرة الشرائية. في المقابل، يمثل شراء سبائك أو جنيهات الذهب في عمان درعًا صلبًا كالتاريخ للثروة الاستثمارية.'
                    : 'Uninvested paper currents constantly dissolve in local purchasing power. Holding assets in dedicated gold bars shields your primary wealth from inflation drops.'
                  }
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
