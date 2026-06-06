export type LanguageType = 'ar' | 'en';

export interface GoldPrice {
  karat24: number; // in OMR per gram
  karat22: number;
  karat21: number;
  karat18: number;
  silver: number;  // in OMR per ounce or gram (let's use per gram for consistency)
  updatedAt: string;
}

export interface PriceHistoryPoint {
  date: string;
  karat24: number;
  karat22: number;
  karat18: number;
}

export interface BlogArticle {
  id: string;
  titleAr: string;
  titleEn: string;
  summaryAr: string;
  summaryEn: string;
  contentAr: string;
  contentEn: string;
  readTime: string;
  categoryAr: string;
  categoryEn: string;
  image: string;
  date: string;
  slug: string;
}

export interface PDFChapter {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  sampleContentAr: string;
  sampleContentEn: string;
  pagesRange: string;
}

export interface Testimonial {
  id: number;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  rating: number;
  commentAr: string;
  commentEn: string;
  avatar: string;
  locationAr: string;
  locationEn: string;
}

export interface FAQItem {
  id: number;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

export interface Order {
  id: string;
  email: string;
  name: string;
  date: string;
  amount: number;
  paymentMethod: string;
  status: 'completed' | 'pending';
  downloadCount: number;
}

export interface Lead {
  id: string;
  email: string;
  date: string;
  source: 'newsletter' | 'checklist_download';
}

export interface AdminAnalytics {
  totalRevenue: number;
  totalSales: number;
  totalDownloads: number;
  leadsCount: number;
  recentOrders: Order[];
  recentLeads: Lead[];
}
