import { PDFChapter, Testimonial, FAQItem, BlogArticle } from './types';

export const CHANNELS_OF_GOLD_GUIDE: PDFChapter[] = [
  {
    id: 1,
    titleEn: "1. Introduction to Gold Buying in Oman",
    titleAr: "١. مقدمة عن شراء الذهب في عمان",
    descriptionEn: "A comprehensive welcome to the world of precious metals in the Sultanate. Learn about Oman's rich cultural connection to gold, typical market dynamics, and why Omani gold remains some of the purest and highly sought-after globally.",
    descriptionAr: "مقدمة شاملة لعالم المعادن الثمينة في السلطنة. تعرف على ارتباط عمان الثقافي الغني بالذهب، وآليات السوق، ولماذا يعتبر الذهب العماني من الأنقى والأكثر طلبًا عالميًا.",
    sampleContentEn: "Oman stands as a beacon of trust in gold trading. With long histories embedded in Souq Muttrah and Ruwi's bustling avenues, buying gold here carries a mixture of culture, heritage, and pure financial wisdom...",
    sampleContentAr: "تقف عمان كمنارة للثقة في تجارة الذهب. مع تاريخ طويل متأصل في سوق مطرح وشوارع روي النابضة بالحياة، فإن شراء الذهب هنا يحمل مزيجًا من الثقافة والتراث والحكمة المالية الخالصة...",
    pagesRange: "3 - 8"
  },
  {
    id: 2,
    titleEn: "2. Gold Purity Explained (Karats Demystified)",
    titleAr: "٢. توضيح نقاء الذهب (أسرار عيارات الذهب)",
    descriptionEn: "Uncover the exact mathematical breakdown of gold purity indicators. Explore what karats mean, the alloy components mixed with pure gold, and what determines the standard shades of precious gold jewelry.",
    descriptionAr: "اكتشف التحليل الرياضي الدقيق لمؤشرات نقاء الذهب. تعرف على معنى عيارات الذهب، ومكونات السبائك المخلوطة بالذهب الخالص، وما يحدد لون المجوهرات.",
    sampleContentEn: "The term 'Karat' measures parts of 24. Hence, 24K gold is 99.9% pure, while 22K contains 22 parts gold and 2 parts other metals (91.6% purity). Understanding this ratio is your shield against overpaying...",
    sampleContentAr: "يقيس مصطلح 'العيار' أجزاء من ٢٤. لذلك، فإن الذهب عيار ٢٤ هو نقي بنسبة ٩٩.٩٪، في حين يحتوي عيار ٢٢ على ٢٢ جزءًا من الذهب وجزءين من معادن أخرى (نقاء ٩١.٦٪). فهم هذه النسبة هو درعك ضد دفع مبالغ زائدة...",
    pagesRange: "9 - 14"
  },
  {
    id: 3,
    titleEn: "3. 24K vs 22K vs 21K vs 18K Comparison Guide",
    titleAr: "٣. دليل المقارنة بين عيارات ٢٤ و ٢٢ و ٢١ و ١٨",
    descriptionEn: "A visual and analytical comparative matrix detailing durability, appearance, investment suitability, and common use-cases for each major karat level found across Omani souqs.",
    descriptionAr: "مصفوفة مقارنة بصرية وتحليلية توضح المتانة، والمظهر، ومدى ملاءمة الاستثمار، وافتراضات الاستخدام الشائعة لكل عيار رئيسي في الأسواق العمانية.",
    sampleContentEn: "While 24K is the supreme investment asset, it is remarkably soft and unsuitable for intricate daily jewelry. 22K and 21K represent the absolute standard for traditional Omani bridal sets...",
    sampleContentAr: "في حين أن عيار ٢٤ هو الأصل الاستثماري الأسمى، إلا أنه ناعم بشكل ملحوظ وغير مناسب للمجوهرات اليومية المعقدة. يمثل عيار ٢٢ وعيار ٢١ المعيار المطلق للأطقم العمانية التقليدية...",
    pagesRange: "15 - 20"
  },
  {
    id: 4,
    titleEn: "4. Real vs Fake Gold: The Definitive Identification",
    titleAr: "٤. الذهب الحقيقي مقابل المزيف: التحديد الحاسم",
    descriptionEn: "Practical, instantly applicable on-site inspection rules. Arm yourself with standard observational routines that quickly flush out gold-plated base metals, heavy brass, and sophisticated copper alloys.",
    descriptionAr: "قواعد فحص عملي قابلة للتطبيق الفوري في المتجر. سلّح نفسك بأساليب مراقبة قياسية تكشف بسرعة المعادن المطلية بالذهب، والنحاس الثقيل، وسبائك النحاس المتطورة.",
    sampleContentEn: "Fake gold will often feel strangely light or exhibit microscopic discoloration under high magnification around active friction points like locks and jump rings. Authentic gold maintains color integrity...",
    sampleContentAr: "غالبًا ما يبدو الذهب المزيف خفيف الوزن بشكل غريب أو يُظهر تغيرًا مجهريًا في اللون تحت التكبير العالي حول نقاط الاحتكاك النشطة مثل الأقفال والحلقات. يحافظ الذهب الأصيل على سلامة اللون...",
    pagesRange: "21 - 27"
  },
  {
    id: 5,
    titleEn: "5. Hallmark Verification & Gulf Standards Guide",
    titleAr: "٥. التحقق من الدمغات ودليل المعايير الخليجية",
    descriptionEn: "Read and decode international hallmark stamps and the official Ministry of Commerce, Industry and Investment Promotion (MOCIIP) regulatory stamps used in the Sultanate of Oman.",
    descriptionAr: "قراءة وفك رموز طوابع الدمغة الدولية وطوابع الضبط الرسمية الصادرة عن وزارة التجارة والصناعة وترويج الاستثمار في سلطنة عمان.",
    sampleContentEn: "In Oman, gold jewelry must bear regulated hallmark stamps such as '916' for 22K, '875' for 21K, or '750' for 18K, alongside the official laboratory assay symbol. Never buy jewelry without checking these...",
    sampleContentAr: "في عمان، يجب أن تحمل مجوهرات الذهب دمغات تنظيمية رسمية مثل '916' لعيار ٢٢، أو '875' لعيار ٢١، أو '750' لعيار ١٨، إلى جانب رمز مختبر فحص الجودة الرسمي. لا تشترِ أبدًا دون التحقق منها...",
    pagesRange: "28 - 33"
  },
  {
    id: 6,
    titleEn: "6. Common Gold Scams in Gulf Countries",
    titleAr: "٦. عمليات الاحتيال الشائعة بالذهب في دول الخليج",
    descriptionEn: "Critical case studies of active tourist trap manipulations, street solicitation schemes, fabricated documentation, and synthetic core gold-bar scams occurring in regional trade circles.",
    descriptionAr: "دراسات حالة حاسمة لأساليب التلاعب للسائحين، ومخططات الالتماس بالشوارع، والوثائق المفبركة، وعمليات احتيال سبائك الذهب ذات القلب الاصطناعي التي تحدث إقليميًا.",
    sampleContentEn: "Be highly cautious of street sellers promising 'cheap tax-free raw gold' in historic souqs. Legitimate merchants in Oman operate strictly within licensed stalls under government supervision. If a price seems too low to be true...",
    sampleContentAr: "كن حذرًا للغاية من الباعة في الشوارع الذين يعدون بـ 'ذهب خام رخيص معفى من الضرائب' في الأسواق التاريخية. يعمل التجار الشرعيون في عمان بصرامة داخل محلات مرخصة تحت إشراف حكومي...",
    pagesRange: "34 - 40"
  },
  {
    id: 7,
    titleEn: "7. Jewelry Inspection Checklist for Smarter Buys",
    titleAr: "٧. قائمة فحص المجوهرات لعمليات شراء ذكية",
    descriptionEn: "A step-by-step physical inspection guide for locks, solders, links, stones weight adjustments, and structural integrity of traditional necklaces and rings.",
    descriptionAr: "دليل فحص مادي خطوة بخطوة للأقفال، واللحامات، والوصلات، وتعديلات وزن الأحجار الثمينة، والسلامة الهيكلية للقلائد والخواتم التقليدية.",
    sampleContentEn: "Always insist that the jeweler weighs the piece with semi-precious stones detached if possible, or request the calculated stone weight deduction. Gems should never be charged at the raw gold price index...",
    sampleContentAr: "احرص دائمًا على أن يقوم الصائغ بوزن القطعة مع خصم الأوزان التقديرية للأحجار شبه الكريمة، حيث لا ينبغي أبدًا احتساب سعر الأحجار بسعر جرام الذهب نفسه...",
    pagesRange: "41 - 45"
  },
  {
    id: 8,
    titleEn: "8. Omani Gold Weight Calculation Formula",
    titleAr: "٨. معادلة حساب وزن الذهب العماني",
    descriptionEn: "Master the exact math. Calculate retail gold prices using live global ounce figures, currency conversion factors, and specific karat weight matrices.",
    descriptionAr: "احترف الحسابات الدقيقة. احسب أسعار التجزئة للذهب باستخدام أرقام الأونصة الحية بالدولار، وعوامل تحويل العملات بالريال العماني، ومصفوفات عيار الوزن المحددة.",
    sampleContentEn: "To calculate: (Live USD Gold/Ounce) ÷ 31.1035 × (Weight in Grams) × (Karat Purity Ratio) × (Exchange Rate to OMR) + Making Charges. This guide provides pre-calculated quick multipliers so you do it in seconds...",
    sampleContentAr: "للحساب: (سعر الأونصة العالمي بالدولار) ÷ ٣١.١٠٣٥ × (الوزن بالجرام) × (نسبة نقاء العيار) × (سعر الصرف للريال العماني) + مصنعية الصياغة. يوفر الدليل معاملات ضرب سريعة لتنهيها في ثوانٍ...",
    pagesRange: "46 - 51"
  },
  {
    id: 9,
    titleEn: "9. Making Charges (Al-Masna'eyah) Explained",
    titleAr: "٩. توضيح أجور المصنعية وصياغة الذهب",
    descriptionEn: "Demystify 'Al-Masna'eyah' — the fabrication fees charged per gram. Know how custom handmade Omani silver and gold craft differ from mass-imported machine designs.",
    descriptionAr: "كشف أسرار 'المصنعية' - رسوم التصنيع والصياغة المفروضة على الجرام الواحد. اعرف كيف تختلف المصنعية اليدوية العمانية عن التصاميم المستوردة آلياً.",
    sampleContentEn: "Making charges represent the jeweler's room for dynamic pricing. Imported Italian machine jewelry usually carries fixed fees, while local handcrafted filigree has high initial rates, but are highly negotiable...",
    sampleContentAr: "تمثل أجور المصنعية مساحة الصائغ لتحديد الأسعار بشكل ديناميكي. عادةً ما تحمل المجوهرات الإيطالية المستوردة رسومًا ثابتة، بينما الذهب العماني المصنوع يدويًا يتميز لدمج تقاليد عريقة...",
    pagesRange: "52 - 58"
  },
  {
    id: 10,
    titleEn: "10. How to Negotiate Gold Prices with Omani Souq Sellers",
    titleAr: "١٠. كيفية التفاوض على أسعار الذهب مع البائعين",
    descriptionEn: "Our legendary negotiation playbook. Exact Arabic phrases, mental anchors, timing tips, and strategies to lower custom making charges by up to 50%.",
    descriptionAr: "كتيب التفاوض الأسطوري لدينا. عبارات عربية دقيقة، ومحاور ذهنية، وتلميحات التوقيت الزمني، واستراتيجيات لخفض رسوم المصنعية بما يصل إلى ٥٠٪.",
    sampleContentEn: "Start by establishing that you know the exact raw gold trading rate of the day in OMR before talking about making charges. Ask the seller: 'Kam al-masna'eyah ala hazha al-ghram?' and negotiate using our systematic formula...",
    sampleContentAr: "ابدأ بتوضيح أنك تعرف سعر جرام الذهب الخام المتداول لليوم بالريال قبل التفاوض في المصنعية. اسأل البائع مباشرة: 'كم المصنعية على هذا الجرام؟' وتفاوض بناءً على القواعد المكتوبة هنا...",
    pagesRange: "59 - 64"
  },
  {
    id: 11,
    titleEn: "11. Investment Gold vs Jewelry Gold in Oman",
    titleAr: "١١. الذهب الاستثماري مقابل الذهب الزينة في عمان",
    descriptionEn: "Determine the best wealth preservation vehicle. Learn about the tax treatment, liquidity margins, and capital gains of Omani commemorative gold coins, minted bars, and jewelry sets.",
    descriptionAr: "حدد الوعاء الاستثماري الأفضل للحفاظ على الثروة. تعرف على الفروقات الضريبية، وهامش السيولة، والأرباح الرأسمالية للسبائك والجنيهات والعملات الذهبية...",
    sampleContentEn: "For pure growth, focus strictly on minted 24K bars (Suja) and certified coins. They skip high making charges entirely and sell back at 99.9% market value. Jewelry remains a hybrid option combining elegance with long-term backings...",
    sampleContentAr: "للحصول على نمو مالي نقي، ركز بصرامة على السبائك المعتمدة عيار ٢٤ والأونصات. فهي تتجنب أجور المصنعية وتحافظ على قيمتها السوقية بنسبة ٩٩.٩٪ عند البيع مقارنة بالذهب المصوغ...",
    pagesRange: "65 - 71"
  },
  {
    id: 12,
    titleEn: "12. Safe Gold Storage Methods & Bank Lockers in Muscat",
    titleAr: "١٢. طرق تخزين الذهب الآمنة وخزائن البنوك في مسقط",
    descriptionEn: "Comprehensive look at home security vaults, microclimatic protection for jewelry metals, and safety deposit box access costs in leading bank networks across Muscat.",
    descriptionAr: "نظرة شاملة على الخزائن المنزلية الآمنة، والحماية من رطوبة الجو، وتكلفة استئجار صناديق الأمانات في البنوك الرائدة في عمان.",
    sampleContentEn: "Never store luxury gold jewelry loosely rubbing against each other, as high-karat gold scratches easily. Learn how custom felt-lined wooden chests and bank deposit boxes shield high-net asset acquisitions...",
    sampleContentAr: "لا تقم أبدًا بتخزين مجوهرات الذهب الفاخرة بشكل عشوائي يسبب احتكاكها، لأن العيارات العالية تخدش بسهولة. ننشر هنا متطلبات الحفظ الأمثل والخزائن الذكية...",
    pagesRange: "72 - 76"
  },
  {
    id: 13,
    titleEn: "13. Questions Every Buyer Must Ask the Jeweler",
    titleAr: "١٣. أسئلة يجب على كل مشتري طرحها على الصائغ",
    descriptionEn: "A high-impact print-and-carry script. Crucial questions regarding assay certifications, buyback policies, stones adjustment weights, and final vat invoices.",
    descriptionAr: "سيناريو مكتوب عالي التأثير للحفظ والطباعة. أسئلة بالغة الأهمية حول شهادات الفحص وعيار الذهب والوزن قبل وبعد إزالة الأحجار وسياسات استرجاع الذهب.",
    sampleContentEn: "Before passing your credit card, ask: 'Is this invoice detailed with separate gold weight, karat purity, MOCIIP stamp reference, and making charges listed clearly?' This script ensures complete transparency under Omani law...",
    sampleContentAr: "قبيل الدفع بالبطاقة، اسأل: 'هل الفاتورة مفصلة ومقسومة بوزن الذهب الصافي ومعدن العيار، مع الإشارة لدمغة الوزارة الموضحة والمصنعية بشكل مستقل؟'...",
    pagesRange: "77 - 81"
  },
  {
    id: 14,
    titleEn: "14. Advanced DIY Gold Testing Techniques at Home",
    titleAr: "١٤. تقنيات اختبار الذهب المتقدمة يدويًا في المنزل",
    descriptionEn: "Safe, scientific, and non-destructive testing routines using specific gravity, ceramic scratch pads, and high-grade jeweler's magnets.",
    descriptionAr: "اختبارات علمية آمنة وغير مدمرة للقطع والسبائك الكبيرة باستخدام قوانين الفيزياء (الوزن النوعي)، والخدش السيراميكي غير المتلف، والمغناطيس القوي.",
    sampleContentEn: "Learn to compute precise density fractions using kitchen digital scales and water displacement. Genuine gold has a heavy specific gravity of 19.3 g/cm³, far above brass, iron, or lead coatings...",
    sampleContentAr: "تعلم حساب الكثافة النوعية الدقيقة للسبائك باستخدام الميزان الرقمي المنزلي وقياس إزاحة الماء. الذهب الخالص يتميز بكثافة ثقيلة تبلغ ١٩.٣ جم/سم٣...",
    pagesRange: "82 - 88"
  },
  {
    id: 15,
    titleEn: "15. Omani Market Buying Guide: Muscat, Muttrah & Salalah Souqs",
    titleAr: "١٥. دليل شراء أسواق عمان الشهيرة: مسقط، ومطرح، وصلالة",
    descriptionEn: "A geographic walkthrough of physical souqs in Ruwi, Muttrah, Nizwa, and Salalah. Directory of verified trust sellers, peak trading hours, and historic layout maps.",
    descriptionAr: "جولة جغرافية لأسواق الذهب التقليدية في روي، مطرح، نزوى، وصلالة. دليل أوقات التداول الرئيسية ومواقع المحلات المعتمدة والأكثر أمانًا ونزاهة.",
    sampleContentEn: "Muttrah Souq specializes in classic heritage designs and heavy bridal ornamentations. Ruwi Gold Souq is your ideal hub for global bullion bars, certified coins, and competitive standard making charges...",
    sampleContentAr: "يتخصص سوق مطرح في التصاميم التراثية الكلاسيكية والزخارف العمانية التقليدية الثقيلة للأعراس. بينما يعتبر سوق الذهب في روي مركزك لسبائك الاستثمار والجنيهات...",
    pagesRange: "89 - 95"
  },
  {
    id: 16,
    titleEn: "16. The Ultimate 10-Point Gold Buying Checklist",
    titleAr: "١٦. قائمة فحص شراء الذهب الـ ١٠ النهائية",
    descriptionEn: "Our concise, high-speed checklist designed for quick reference on your mobile screen during live negotiations at the display case.",
    descriptionAr: "قائمة فحص شاملة مكونة من ١٠ نقاط، مصممة للشاشات المحمولة للتحقق السريع والواثق خلال وقوفك المباشر أمام البائع في السوق تفاديًا لأي خطأ.",
    sampleContentEn: "1. Check Live Rate on Website. 2. Verify MOCIIP Official Hallmark Stamp. 3. Ask for Stone-Free Gold Net Weight. 4. Isolate the Making Charge per gram...",
    sampleContentAr: "١. التأكد من سعر الجرام العالمي. ٢. التحقق من دمغة وزارة التجارة الرسمية. ٣. طرح وزن الفصوص غير الكريمة. ٤. عزل أجور المصنعية للجرام الواحد وفصلها...",
    pagesRange: "96 - 100"
  },
  {
    id: 17,
    titleEn: "17. Quick Reference Conversion & Karat Weight Charts",
    titleAr: "١٧. جداول مرجعية سريعة للتحويل وأوزان العيارات",
    descriptionEn: "Easy tables mapping Ounces to Tolas, Grams to Ounces, Grams to Tolas, carat percentages, OMR conversion matrices, and standard thickness values.",
    descriptionAr: "جداول مبسطة لتحويل الأونصة إلى تولات، والجرامات إلى أونصات، ونسب نقاء الفضة والذهب، وحسابات القيمة الفورية حسب الريال العماني بدقة قصوى.",
    sampleContentEn: "1 Tola equals exactly 11.6638 grams. 1 Ounce equals 31.1035 grams. Use our pre-compiled guide charts to immediately decode local merchants measuring in Omani Tolas...",
    sampleContentAr: "تساوي التولة الواحدة ١١.٦٦٣٨ جرامًا بالضبط. بينما تساوي الأونصة ٣١.١٠٣٥ جرامًا. تمنحك هذه الجداول دقة متناهية لمقارنة الموازين المحلية والعالمية...",
    pagesRange: "101 - 106"
  },
  {
    id: 18,
    titleEn: "18. Emergency Scam Prevention Guide & Action Steps",
    titleAr: "١٨. دليل مكافحة الاحتيال الطارئ وخطوات التصرف الصارمة",
    descriptionEn: "Discovered an issue? Step-by-step Omani consumer protection (PAC) reporting routines, contact lines, evidence-gathering procedures, and legal protections.",
    descriptionAr: "هل اكتشفت تلاعباً؟ دليل الإجراءات القانونية المباشرة وحماية المستهلك العماني، قنوات التبليغ الرسمية، وكتابة الشكاوى لضمان الترجيع الكامل لأموالك.",
    sampleContentEn: "Oman enforces extremely strict laws against precious metal counterfeiters. If you identify a fake MOCIIP stamp or have proof of weighted gold manipulation, instantly save your official VAT invoice and contact Consumer Protection at (+968)...",
    sampleContentAr: "تفرض السلطنة قوانين صارمة للغاية لحماية المستهلكين. إذا اكتشفت تلاعبًا في الأوزان أو تزويرًا للدمغة، احتفظ بالفاتورة والقطعة فورًا واتصل بالهيئة العامة لحماية المستهلك...",
    pagesRange: "107 - 112"
  }
];

export const TESTIMONIALS_SAMPLE: Testimonial[] = [
  {
    id: 1,
    nameAr: "سليمان بن ناصر المعولي",
    nameEn: "Suleiman bin Nasser Al-Maawali",
    roleAr: "مستثمر في الذهب والفضة",
    roleEn: "Precious Metals Investor",
    rating: 5,
    commentAr: "هذا الدليل وفر عليّ مئات الريالات عند شراء سبائك استثمارية لعائلتي. طريقة التفاوض المكتوبة فعالة للغاية، وخاصة كيف تفصل المصنعية عن سعر جرام الذهب الخام. أنصح به كلياً لكل مقبل على الشراء في مسقط.",
    commentEn: "This guide literally saved me hundreds of Omani Rials when sourcing standard investment bars for my family. The bargaining walkthrough is highly practical. It teaches you how to decouple pure metal value from making charges. Highly recommended for everyone in Muscat.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop&q=80",
    locationAr: "روي، مسقط",
    locationEn: "Ruwi, Muscat"
  },
  {
    id: 2,
    nameAr: "أميرة بنت خالد البوسعيدية",
    nameEn: "Amira bent Khalid Al-Busaidi",
    roleAr: "شغوفة باقتناء الذهب الفاخر",
    roleEn: "Fine Jewelry Collector",
    rating: 5,
    commentAr: "يحتوي الدليل على صور توضيحية ممتازة لدمغة وزارة التجارة العمانية الرسمية وكيفية تجنب دفع مبالغ إضافية على الأحجار شبه الكريمة. واجهت الصائغ بالأسئلة الموصى بها في الفصل الثالث عشر وتغير تعامله معي فوراً بجدية!",
    commentEn: "The close-ups and explanation of the Omani MOCIIP hallmark are outstanding. I used the verification checks and questions in Chapter 13, and the jeweler immediately changed his tone when he knew I was highly trained. It paid for itself in my first purchase!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&fit=crop&q=80",
    locationAr: "بوشر، مسقط",
    locationEn: "Bawshar, Muscat"
  },
  {
    id: 3,
    nameAr: "ديفيد ريتشاردز",
    nameEn: "David Richards",
    roleAr: "مصور وسائح مهتم بالتسوق",
    roleEn: "Cultural Tourist / Expat",
    rating: 5,
    commentAr: "كسائح يزور سوق مطرح التاريخي، كنت أخاف دائماً من التعرض للاحتيال أو دفع أسعار سياحية مبالغ فيها. هذا الكتاب ومحرك حسابات أسعار الذهب الفوري في الموقع أعطاني الثقة الكاملة للتسوق كالمحترفين المحليين.",
    commentEn: "As a traveler walking through Muttrah Souq, I was terrified of being overcharged. This digital guide paired with the live pricing tool on this platform gave me total confidence to bargain like a seasoned local expert. Phenomenal resource!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&fit=crop&q=80",
    locationAr: "لندن، بريطانيا (زائر لمسقط)",
    locationEn: "London, UK (Visiting Muscat)"
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    id: 1,
    questionAr: "كيف سأحصل على دليل الذهب بعد إتمام عملية الدفع؟",
    questionEn: "How do I receive the gold buying guide after payment?",
    answerAr: "بمجرد إتمام الدفع الآمن بسعر ٣.٩٩ ر.ع (عن طريق بطاقة الائتمان، بيبال، أو أبل باي/جوجل باي)، ستظهر لك فوراً شاشة تحميل الملف الشخصي وسيتم إرسال رابط تحميل مباشر بنسق PDF عالي الجودة إلى بريدك الإلكتروني المدخل ليبقى معك مدى الحياة.",
    answerEn: "Directly after your secure payment of 3.99 OMR (via Stripe, PayPal, Apple Pay, or Google Pay), a dynamic download panel will appear instantly on-screen. A high-resolution PDF download link will also be dispatched directly to your email address for permanent lifetime access."
  },
  {
    id: 2,
    questionAr: "ما هو عيار الذهب الأكثر تفضيلاً للشراء والاستثمار في عمان؟",
    questionEn: "Which gold karat is most preferred for buying and investment in Oman?",
    answerAr: "للاستثمار النقي وحفظ وتنمية رأس المال، فإن السبائك والليرات عيار ٢٤ قيراط هي الأفضل على الإطلاق لغياب رسوم المصنعية المرتفعة وضريبة القيمة المضافة العالية عليها. أما للمصوغات وشبكات الأعراس التقليدية، فيعتبر عيار ٢٢ وعيار ٢١ قيراط هو الأكثر شعبية وتداولاً في مسقط وباقي مدن السلطنة.",
    answerEn: "For absolute wealth accumulation and growth, 24K minted bullion bars or sovereign coins are supreme as they completely bypass high making charges. For traditional bridal and everyday jewelry, 22K (91.6% purity) and 21K are the undisputed standards across Oman."
  },
  {
    id: 3,
    questionAr: "هل أسعار جرامات الذهب المعروضة على موقعكم حقيقية ومحدثة؟",
    questionEn: "Are the gold prices displayed on your website real and updated?",
    answerAr: "نعم، أسعار الذهب المعروضة في لوحة البيانات المتقدمة لدينا مرتبطة بأسعار البورصة العالمية المباشرة للمعادن الثمينة ويتم احتسابها بالريال العماني بشكل فوري بناءً على أسعار صرف العملات والعيارات الأربعة الرئيسية بمعدل تحديث مستمر.",
    answerEn: "Yes, all gold and silver rates displayed on our Live Dashboard coordinate with live international market feeds. They are computed in real-time in Omani Rial (OMR) using precise currency and purity multipliers with constant updates."
  },
  {
    id: 4,
    questionAr: "هل هناك سياسة استرجاع الأموال في حال لم يعجبني محتوى الدليل؟",
    questionEn: "Is there a refund policy if I am not satisfied with the guide?",
    answerAr: "نظرًا لطبيعة المنتج الرقمية وإمكانية تحميل وقراءة المحتوى والاحتفاظ به بشكل فوري وبصيغة مفتوحة، فإن جميع عمليات المبيعات نهائية وغير قابلة للاسترجاع (تطبق سياسة عدم الإلغاء الاحترافية). ومع ذلك، نحن واثقون بشدة أن المعلومات الفنية الحصرية المذكورة ستوفر عليك مئات أضعاف ثمن الشراء البسيط منذ جولتك الأولى في السوق.",
    answerEn: "Due to the instant, digital nature of downloadable assets, all sales are permanent and non-refundable (as outlined professionally in our standard digital terms). However, we are fully confident that the elite negotiation terms, diagrams, and checklist tips will save you hundreds of times the modest guide cost from your first jewelry souq visit."
  },
  {
    id: 5,
    questionAr: "كيف يمكنني التأكد من سلامة دمغة الذهب الرسمية في أسواق مسقط؟",
    questionEn: "How do I double check the gold hallmark certificate stamps in Muscat Souqs?",
    answerAr: "يغطي الفصل الخامس من الدليل بتفصيل مصور أشكال ومواقع الدمغات الرسمية المعتمدة لوزارة التجارة العمانية، والتي تُفحص دورياً بواسطة مفتشي الوزارة. لا يجب عليك الاكتفاء بكلام البائع الشفهي، بل تستطيع استخدام تقنيات الفحص بالعدسة المكبرة المتوفرة في أدواتنا للتحقق بصوتك المسموع.",
    answerEn: "Chapter 5 of our premium guide provides visual layouts of genuine Omani government assay stamps and symbols under the Ministry of Commerce. We teach you exactly how to spot fraudulent imprints under jeweler loupes and stand your ground effectively."
  }
];

export const BLOG_ARTICLES_LIST: BlogArticle[] = [
  {
    id: "buy-gold-safely-oman",
    titleEn: "How to Buy Gold Safely in Oman: A Souq Navigator's Guide",
    titleAr: "كيف تشتري الذهب بأمان في سلطنة عمان: دليل التنقل في الأسواق",
    summaryEn: "A profound analysis of Muscat's legendary gold souqs, government security standards, hallmark verification, and essential precautions for secure jewelry shopping.",
    summaryAr: "تحليل عميق لأسواق الذهب الأسطورية بمسقط، ومعايير الأمان الحكومية الصارمة، وكيفية قراءة وتدقيق أختام الدمغات المعتمدة لتجنب التلاعب بالأوزان.",
    readTime: "7 Min Read",
    categoryEn: "Souq Advice",
    categoryAr: "نصائح الأسواق",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&fit=crop&q=80",
    date: "June 3, 2026",
    slug: "buy-gold-safely-oman",
    contentEn: `Omani gold is famous globally for its rich colors and strict, reliable purity standards. This is backed by strict enforcement from the Ministry of Commerce, Industry and Investment Promotion (MOCIIP). Still, as a customer shopping at Muttrah, Ruwi, or Salalah Souqs, understanding the local playground is key.

### Step 1: Track the OMR Raw Rate
Before entering any shop, verify the live gold price in Omani Rial (OMR). Jewelers often have electronic displays, but knowing the exact rate beforehand places you ahead.

### Step 2: The Decoupling Trick (Price per Gram)
The biggest mistake tourists and new buyers make is asking for a global piece price. Always request: "Divide this price into Gold Weight, Daily Gold Value, and Making Charges (Al-Masna'eyah)." Decoupling is the only way to avoid hidden markup traps.

### Step 3: Check regulatory hallmarks
Every piece of gold crafted or imported into Oman must bear small, certified stamps. Ensure you see the Arabic letters or clear numerical values (e.g. 916 for 22K) stamped cleanly, which guarantees quality testing under municipal laws.`,
    contentAr: `يتميز الذهب في سلطنة عمان بجودته ونقائه العاليين وسمعته الممتازة عالمياً. بفضل قوانين وزارة التجارة والصناعة وترويج الاستثمار، يحظى المستهلك بحماية حكومية قوية للغاية. ومع ذلك، لا غنى عن التثقيف والتأهيل المالي قبل التجهيز لعملية الشراء الكبيرة.

### الخطوة الأولى: رصد أسعار الذهب الخام بالريال العماني
قبل خطو خطوة واحدة داخل أي مبنى في سوق الذهب بروي أو مطرح، يجب عليك تفقد أسعار تداول الجرام الفورية لليوم. الأسعار تتغير يوميًا بناءً على حركة البورصة العالمية.

### الخطوة الثانية: حيل الفصل المالي (عزل قيمة المصنعية)
الخطأ الأكبر الذي يقع فيه المشترون الجدد والسياح هو الاستقصاء عن السعر الإجمالي للقطعة المزخرفة دفعة واحدة. اطلب دائمًا من البائع: "افصل لي وزن الذهب وسعره الخام عن تكلفة المصنعية والصياغة (المصنعية) للجرام الواحد." تمنحك هذه الصراحة قوة استراتيجية هائلة للتفاوض وتكشف محاولة بعض الباعة زيادة الهامش الربحي لأرقام خيالية.

### الخطوة الثالثة: فحص ختم الدمغة الحكومية الرسمية
تضمن القوانين العمانية ضرورة دمغ الذهب بكسور نقاء معتمدة (مثل الرمز 916 لعيار ٢٢ أو 750 لعيار ١٨). لا تتردد أبداً بطلب عدصة الصائغ المكبرة للتأكد من وجود هذا الختم المصدق واثقًا من حقوقك الاستهلاكية.`
  },
  {
    id: "real-vs-fake-gold",
    titleEn: "Genuine vs Counterfeit Gold: Scientific Testing Protocols",
    titleAr: "الذهب الأصيل مقابل المغشوش: بروتوكولات الاختبارات العلمية الصارمة",
    summaryEn: "Learn high-grade home testing strategies, including specific gravity checks and magnetic reviews to confirm total purity without damaging precious ornaments.",
    summaryAr: "تعرف على استراتيجيات الفحص المنزلي المتقدمة للسبائك، بما في ذلك حساب الوزن النوعي الدقيق واختبارات المغناطيس، لتأكيد سلامتك المالية دون إتلاف القطعة.",
    readTime: "6 Min Read",
    categoryEn: "Purity Testing",
    categoryAr: "اختبار النقاء",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d8222?w=600&fit=crop&q=80",
    date: "May 28, 2026",
    slug: "real-vs-fake-gold",
    contentEn: `Identifying genuine gold does not always require high-tech laboratories. Using simple physics and material rules, anyone can detect fake gold plating, gold-filled items, and copper mixtures.

### 1. Specific Gravity displacement test
Gold is intensely dense (19.3 grams per cubic centimeter). Copper, brass, or iron mixtures barely hover around 8.5 to 9.0 g/cm³. By using water displacement inside a graduated cylinder and a digital gram scale, you can easily divide mass by volume to get raw specific density. If the ratio output lands under 19.3 for 24K (or 17.5 for 22K), your asset contains heavy alloy core fillings.

### 2. High-Grade Magnet Test
Pure gold and pure silver are entirely non-magnetic (diamagnetic). If a custom jeweler's earth magnet (neodymium-based) lightly pulls at your gold chain or bar, it immediately indicates underlying steel, iron, or cobalt core coatings underneath.

### 3. The Unglazed Ceramic Plate Scratch Route
Gently draw a small hidden corner of the piece across an unglazed ceramic tile. A black streak reveals copper or iron base fillings covered in gold plate, whereas a true golden-yellow line signifies absolute authenticity and homogeneous structures.`,
    contentAr: `لا يستوجب الكشف عن حقيقة الذهب دائماً الانتقال إلى فني مختبرات متطور. بواسطة قواعد الفيزياء الأساسية للمواد وكثافة المعادن، يمكن لأي فرد رصد الطلاءات الزائفة والمعادن الرخيصة وحشو الرصاص أو النحاس بنجاح.

### ١. اختبار الكثافة والوزن النوعي عن طريق إزاحة الماء
الذهب معدن فائق الثقل والكتلة (تبلغ كثافة ٢٤ قيراط ١٩.٣ جرام لكل سنتيمتر مكعب). بينما المعادن الرخيصة مثل النحاس والحديد والنيكل لا تتجاوز كثافتها ٨.٥ إلى ٩ جم/سم٣. عن طريق وزن القطعة جافة بالميزان الرقمي، ثم قياس وزنها معلقة تماماً داخل كوب من الماء، يمكنك قسمة الوزن الجاف على الفرق لتحديد معامل الوزن النوعي. خروج النتيجة بأقل من السقف يثبت وجود غش مركزي.

### ٢. اختبار المغناطيس القوي (نيوديميوم)
الذهب معدن معزول كلياً عن الانجذاب المغناطيسي. إذا لاحظت أي استجابة حركية طفيفة أو شعرت ببطء سحب طرف العقد الذهبي للمغناطيس فاعلم فوراً بوجود حشو بنواة حديدية مغلفة بقشرة رقيقة خداعة.

### ٣. الخدش السيراميكي غير المصقول
بسحب طرف خفي للقطعة فوق قطعة سيراميك مطفأة، يترك الذهب المغشوش خطًا أسود ناتجًا عن انكشاف أساس الرصاص أو النحاس، بينما يحافظ الذهب الصحيح على بريقه تاركاً خطًا أصفر ناصعًا كالبرق.`
  },
  {
    id: "gold-investment-muscat",
    titleEn: "Gold Investment in Muscat: Bars, Coins or Jewelry Ornaments?",
    titleAr: "الاستثمار في الذهب بمسقط: سبائك، عملات، أم حلي للزينة والادخار؟",
    summaryEn: "Explore the wealth preservation paths in Muscat, Oman. Weigh the liquid spreads, commission pricing, and long-term security factors for each option.",
    summaryAr: "استكشف سبل الحفاظ على الثروة وتنميتها في عمان. قارن بين هوامش البيع والشراء والعمولات المترتبة على اقتناء سبائك الاستثمار مقابل طواقم الحلي.",
    readTime: "8 Min Read",
    categoryEn: "Wealth Strategy",
    categoryAr: "استراتيجية الثروة",
    image: "https://images.unsplash.com/photo-1599690982127-bdfef133c9e1?w=600&fit=crop&q=80",
    date: "May 20, 2026",
    slug: "gold-investment-muscat",
    contentEn: `When capital preservation is your absolute objective, choosing the form of gold determines your profit margins. 

### Minted Bars: The Professional Choice
For pure financial goals, certified 24K bars (called 'Suja' locally) are elite assets. Spanning from 1 gram to 100 grams, they bypass making charges entirely or carry tiny production margins ($1 to $2 per gram). Over long periods, they guarantee minimal bid-ask spreads when selling back to banks or scrap brokers in Muscat.

### Commemorative Coins: High Liquidity
Omani gold sovereigns or global standard coins (e.g. British Sovereigns, Canadian Maples) represent wonderful hybrid solutions. Highly portable, universally traded, and easy to break into smaller parts compared to a single, heavy 100-gram block of gold.

### Ornamental Jewelry: The Dual Advantage
Traditional jewelry sets (such as heavy Omani bridal sets) let you enjoy wearing your assets. However, they carry high handcraft labor fees (making charges) that range from 3 to 10 OMR per gram. When selling, jewelers ALWAYS deduct making charges and buy back solely at raw weight gold indices.`,
    contentAr: `عندما تركز طموحاتك على حفظ رأس المال من التضخم العالمي، فإن اختيار شكل الذهب وهيئته المناسبة يحدد نجاح استثمارك ونهاية حسابات أرباحك الصافية.

### سبائك الاستثمار المعتمدة: خيار المحترفين الواعدين
للأهداف المالية البحته، تعتبر السبائك عيار ٢٤ قيراط (النقاء المعتمد ٩٩٩.٩) الأداة الأفضل بلا منازع. بأوزانها المتنوعة من جرام واحد وحتى كيلو جرام، تتفادى السبائك أجور المصنعية المرتفعة كلياً، وتتميز بأقل الفوارق السعرية بين الشراء والبيع (Bid-Ask Spreads) عند قيامك بتسييل ثروتك لاحقًا بسوق روي.

### العملات والجنيهات الذهبية: سيولة عالية وقدرة تجزئة
جنيهات الذهب بمسقط تمثل مرونة استثنائية وجاذبية تخزينية فائقة. تملك وزناً موحداً (كالجنيه الإنجليزي وزن ٨ جرامات بنقائه عيار ٢٢ المرتفع) مما يجعلها سهلة الحمل والتجزئة عند الحاجة للبيع الجزئي المتكرر مقارنة بسبيكة واحدة ضخمة.

### المجوهرات وحلي الزينة: المنفعة المزدوجة وضريبتها
اقتناء أطقم المجوهرات الكلاسيكية يمنح صاحبه المنفعة والجمال بالاستخدام المباشر. ولكنه يحمل في كواليسه رسوم مصنعية وصياغة عالية للغاية وتتراوح بين ٣ إلى ١٠ ريالات للجرام الواحد تبعاً لدقة التفاصيل والزخرفة. عند البيع، يخصم الصائغ كل تلك الأجور ليشتري القطعة بوزن الذهب الصافي فقط!`
  }
];
