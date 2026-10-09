export interface AeoQA {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  mainKeyword: string;
  relatedKeywords: [string, string];
  summary: string;
  seoTitle?: string;
  metaDescription?: string;
  content: string[];
  aeoQuestions: AeoQA[];
  keyTakeaways: string[];
  author: string;
  authorRole: string;
  source: string;
  publishedAt: string;
  publishedDateISO: string;
  readTime: string;
  image: string;
  imageAlt: string;
  tags: string[];
  isFeatured?: boolean;
  isBreaking?: boolean;
}

export interface CategoryInfo {
  slug: string;
  name: string;
  path: string;
  mainKeyword: string;
  relatedKeywords: [string, string];
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  aeoQuestion: string;
  aeoAnswer: string;
}
