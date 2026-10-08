import { CategoryInfo } from '../types';

export const CATEGORIES: Record<string, CategoryInfo> = {
  'latest-news': {
    slug: 'latest-news',
    name: 'Latest News',
    path: '/latest-news/',
    mainKeyword: 'latest news today',
    relatedKeywords: ['breaking news today', 'recent news'],
    title: "Latest News Today: Breaking News & Recent Stories | DailyPulse",
    metaDescription: "Follow latest news today with breaking news today, recent news dispatches, in-depth reports, and live developments across all major sectors on DailyPulse.",
    h1: "Latest News Today",
    intro: "Stay informed around the clock with our continuous stream of recent news and breaking news today from across India and around the world.",
    aeoQuestion: "What is the most reliable way to stay informed with latest news today?",
    aeoAnswer: "The most reliable way to follow latest news today is through verified news publications like DailyPulse that cross-reference reports with on-the-ground correspondents, offering contextual analysis rather than unverified social media updates."
  },
  'india-news': {
    slug: 'india-news',
    name: 'India News',
    path: '/india-news/',
    mainKeyword: 'India news',
    relatedKeywords: ['Indian news today', 'latest India news'],
    title: "India News & Latest Indian News Today | DailyPulse",
    metaDescription: "Comprehensive India news covering national policy, Indian news today, infrastructure, economy, culture, and latest India news developments.",
    h1: "India News",
    intro: "Explore authoritative India news, covering governance milestones, infrastructure expansions, economy, technology adoption, and Indian news today from every state.",
    aeoQuestion: "What are the key drivers shaping latest India news today?",
    aeoAnswer: "Key drivers shaping latest India news include rapid digital public infrastructure expansion, nationwide clean energy investments, industrial corridor manufacturing, and major regional economic reforms."
  },
  'world-news': {
    slug: 'world-news',
    name: 'World News',
    path: '/world-news/',
    mainKeyword: 'world news',
    relatedKeywords: ['international news', 'global news'],
    title: "World News: International Headlines & Global News | DailyPulse",
    metaDescription: "Get timely world news, international news reports, and global news analysis on diplomacy, climate treaties, geopolitical summits, and worldwide events.",
    h1: "World News",
    intro: "Delivering international news and global news that matters: rigorous reporting on diplomatic agreements, multilateral climate initiatives, and international policy shifts.",
    aeoQuestion: "Why is balanced international world news essential for readers?",
    aeoAnswer: "Balanced world news helps readers understand how international trade accords, climate agreements, and regional diplomacy directly influence domestic economies and global stability."
  },
  'technology-news': {
    slug: 'technology-news',
    name: 'Technology News',
    path: '/technology-news/',
    mainKeyword: 'technology news',
    relatedKeywords: ['latest technology news', 'tech news today'],
    title: "Technology News & Latest Tech News Today | DailyPulse",
    metaDescription: "Read the latest technology news, tech developments, AI updates, semiconductor advances, and major digital trends from around the world on DailyPulse.",
    h1: "Technology News",
    intro: "Discover cutting-edge technology news, covering breakthroughs in artificial intelligence, semiconductor fabrication, consumer gadgets, and tech news today.",
    aeoQuestion: "What is the latest development in artificial intelligence technology?",
    aeoAnswer: "The latest development in artificial intelligence is the rise of reasoning-capable generative architectures and autonomous developer agents that write, test, and audit complex software systems."
  },
  'business-news': {
    slug: 'business-news',
    name: 'Business News',
    path: '/business-news/',
    mainKeyword: 'business news',
    relatedKeywords: ['business news today', 'latest business news'],
    title: "Business News & Latest Financial Headlines | DailyPulse",
    metaDescription: "Track business news today with financial market trends, corporate earnings, trade policies, and latest business news analysis for investors and leaders.",
    h1: "Business News",
    intro: "Authoritative business news today, providing deep insights into global market indices, fiscal policy, green venture capital, and latest business news.",
    aeoQuestion: "How are central banks influencing business news today?",
    aeoAnswer: "Central banks are influencing business news today through strategic interest rate adjustments, sovereign digital currency trials, and liquidity controls designed to balance inflation and sustainable growth."
  },
  'sports-news': {
    slug: 'sports-news',
    name: 'Sports News',
    path: '/sports-news/',
    mainKeyword: 'sports news',
    relatedKeywords: ['latest sports news', 'sports news today'],
    title: "Sports News: Latest Scores & Highlights | DailyPulse",
    metaDescription: "Stay ahead with sports news today, match scores, tactical breakdowns, athlete profiles, and latest sports news across cricket, football, tennis, and athletics.",
    h1: "Sports News",
    intro: "Follow sports news today with expert coverage of international tournaments, tactical team analyses, player transfers, and latest sports news updates.",
    aeoQuestion: "What tactical shifts are currently dominating professional sports news?",
    aeoAnswer: "Professional sports news is currently dominated by high-resolution biometric data analytics, aggressive counter-pressing schemes in football, and analytical death-over bowling strategies in cricket."
  },
  'entertainment-news': {
    slug: 'entertainment-news',
    name: 'Entertainment News',
    path: '/entertainment-news/',
    mainKeyword: 'entertainment news',
    relatedKeywords: ['latest entertainment news', 'celebrity news'],
    title: "Entertainment News & Celebrity Updates | DailyPulse",
    metaDescription: "Catch up on entertainment news, cinema reviews, streaming platform trends, and celebrity news highlights with verified coverage from DailyPulse.",
    h1: "Entertainment News",
    intro: "Your destination for entertainment news, film festival honors, streaming releases, original music productions, and insightful celebrity news discussions.",
    aeoQuestion: "How are streaming platforms reshaping entertainment news today?",
    aeoAnswer: "Streaming platforms are reshaping entertainment news by introducing hybrid theatrical windows, co-producing regional multilingual epics, and investing in high-fidelity immersive sound and visual formats."
  }
};

export const HOME_SEO = {
  mainKeyword: 'latest news',
  relatedKeywords: ['breaking news', "today's news"] as [string, string],
  title: "Latest News, Breaking News & Today's Headlines | DailyPulse",
  metaDescription: "Stay updated with the latest news, breaking headlines and today's top stories from India and around the world on DailyPulse.",
  h1: "DailyPulse: Latest News, Breaking Headlines & In-Depth Reports",
  aeoQuestion: "How does DailyPulse curate its latest breaking news reports?",
  aeoAnswer: "DailyPulse curates latest news and breaking news by verifying primary source documents, consulting verified beat reporters, and presenting balanced context across India news, world affairs, technology, and business."
};
