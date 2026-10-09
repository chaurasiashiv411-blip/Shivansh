import React, { useEffect } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { FeaturedCarousel } from '../components/FeaturedCarousel';
import { AeoSection } from '../components/AeoSection';
import { Article } from '../types';
import { HOME_SEO } from '../data/categories';
import { updatePageSeo } from '../utils/seo';
import { ArrowRight, TrendingUp, Sparkles, Newspaper, ShieldCheck } from 'lucide-react';

interface HomePageProps {
  articles: Article[];
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ articles, onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: HOME_SEO.title,
      description: HOME_SEO.metaDescription,
      canonicalUrl: window.location.origin + '/',
      type: 'website',
      keywords: [HOME_SEO.mainKeyword, ...HOME_SEO.relatedKeywords],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'NewsMediaOrganization',
        name: 'DailyPulse',
        url: window.location.origin,
        description: HOME_SEO.metaDescription,
        foundingDate: '2026',
        publishingPrinciples: `${window.location.origin}/`,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${window.location.origin}/search/?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }
    });
  }, []);

  // Curated story buckets across our 30 articles
  const spotlightArticles = articles.filter(a => a.isFeatured).slice(0, 4);
  const remainingStories = articles.filter(a => !spotlightArticles.some(s => s.id === a.id));

  const heroArticle = remainingStories[0] || articles[0];
  const secondaryLeadArticles = remainingStories.slice(1, 3);
  const trendingArticles = articles.slice(0, 5);

  const indiaArticles = articles.filter(a => a.categorySlug === 'india-news');
  const techArticles = articles.filter(a => a.categorySlug === 'technology-news');
  const worldArticles = articles.filter(a => a.categorySlug === 'world-news');
  const bizArticles = articles.filter(a => a.categorySlug === 'business-news');
  const sportsArticles = articles.filter(a => a.categorySlug === 'sports-news');
  const entArticles = articles.filter(a => a.categorySlug === 'entertainment-news');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Editorial Headline & Keyword Introduction */}
      <section className="mb-6 border-b border-neutral-200 pb-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-700 inline-block animate-pulse"></span>
              <span className="text-[11px] font-black uppercase tracking-widest text-red-700">
                Daily Edition • Continuous Wire
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-neutral-900 tracking-tight">
              Latest News, Breaking News & Today's Top Headlines
            </h1>
          </div>
          <div className="text-xs text-neutral-600 max-w-md leading-relaxed border-l-2 border-neutral-200 pl-3">
            Welcome to DailyPulse. Follow continuous updates featuring today's news, verified international reporting, and breaking news analysis across India and global centers.
          </div>
        </div>
      </section>

      {/* FEATURED STORY SPOTLIGHT CAROUSEL */}
      <FeaturedCarousel
        articles={spotlightArticles.length > 0 ? spotlightArticles : articles.slice(0, 4)}
        onNavigate={onNavigate}
      />

      {/* TOP STORIES HERO GRID */}
      <section className="mb-14" aria-labelledby="top-stories-heading">
        <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-neutral-900">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-red-700 rounded-full inline-block"></span>
            <h2 id="top-stories-heading" className="text-lg sm:text-xl font-bold uppercase tracking-wider text-neutral-900 font-serif">
              Lead Investigations & Breaking News
            </h2>
          </div>
          <a
            href="/latest-news/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/latest-news/');
            }}
            className="text-xs font-bold text-red-700 hover:text-red-900 inline-flex items-center group"
          >
            <span>View all latest news today</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Hero Grid: Big lead + 2 secondary leads + right trending column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Hero Card (8 cols) */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            {heroArticle && (
              <ArticleCard
                article={heroArticle}
                onNavigate={onNavigate}
                variant="hero"
              />
            )}

            {/* 2 Sub-leads below Hero */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {secondaryLeadArticles.map((art) => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  onNavigate={onNavigate}
                  variant="lead"
                />
              ))}
            </div>
          </div>

          {/* Right Trending & Fast Headlines (4 cols) */}
          <aside className="lg:col-span-4 bg-neutral-50/80 border border-neutral-200 rounded-sm p-5 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                <span className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-red-700 mr-1.5" />
                  Trending Today's News
                </span>
                <span className="text-[10px] text-neutral-500 font-mono">Live Rank</span>
              </div>
              <div className="space-y-1">
                {trendingArticles.map((art, idx) => (
                  <div key={art.id} className="relative pl-7 py-2.5 border-b border-neutral-200/80 last:border-b-0">
                    <span className="absolute left-0 top-3 font-serif font-black text-sm text-red-700">
                      0{idx + 1}
                    </span>
                    <ArticleCard
                      article={art}
                      onNavigate={onNavigate}
                      variant="compact"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Editorial Wire Note */}
            <div className="mt-6 pt-4 border-t border-neutral-200 bg-white p-4 rounded border border-neutral-200/90 text-xs">
              <div className="flex items-center space-x-1.5 text-neutral-900 font-bold uppercase tracking-wider text-[11px] mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                <span>DailyPulse Standards</span>
              </div>
              <p className="text-neutral-600 text-xs leading-relaxed mb-3">
                All 30 stories are independently indexed across beat desks with verified sources, structured data, and AEO optimization.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-neutral-100">
                <a
                  href="/india-news/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/india-news/');
                  }}
                  className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded font-semibold text-[11px] transition-colors"
                >
                  India News
                </a>
                <a
                  href="/technology-news/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/technology-news/');
                  }}
                  className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded font-semibold text-[11px] transition-colors"
                >
                  Technology News
                </a>
                <a
                  href="/world-news/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/world-news/');
                  }}
                  className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded font-semibold text-[11px] transition-colors"
                >
                  World News
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* SECTION: TECHNOLOGY & INNOVATION */}
      <section className="mb-14" aria-labelledby="tech-section-heading">
        <div className="flex items-center justify-between mb-5 pb-2 border-b-2 border-neutral-900">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-red-700 rounded-xs"></span>
            <h2 id="tech-section-heading" className="text-lg sm:text-xl font-bold uppercase tracking-wider text-neutral-900 font-serif">
              Technology & Innovation Desk
            </h2>
          </div>
          <a
            href="/technology-news/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/technology-news/');
            }}
            className="text-xs font-bold text-red-700 hover:text-red-900 inline-flex items-center group"
          >
            <span>Read the latest technology news</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techArticles.slice(0, 3).map((art) => (
            <ArticleCard
              key={art.id}
              article={art}
              onNavigate={onNavigate}
              variant="grid"
            />
          ))}
        </div>
      </section>

      {/* SECTION: INDIA & WORLD NEWS (TWO-COLUMN EDITORIAL SPREAD) */}
      <section className="mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* India Column */}
          <div className="bg-white border border-neutral-200 rounded-sm p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-neutral-900">
              <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-900 font-serif">
                India News
              </h2>
              <a
                href="/india-news/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/india-news/');
                }}
                className="text-xs font-bold text-red-700 hover:text-red-900"
              >
                View all India news
              </a>
            </div>
            <div className="space-y-4">
              {indiaArticles.slice(0, 3).map((art) => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  onNavigate={onNavigate}
                  variant="horizontal"
                />
              ))}
            </div>
          </div>

          {/* World Column */}
          <div className="bg-white border border-neutral-200 rounded-sm p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-neutral-900">
              <h2 className="text-lg font-bold uppercase tracking-wider text-neutral-900 font-serif">
                World News
              </h2>
              <a
                href="/world-news/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/world-news/');
                }}
                className="text-xs font-bold text-red-700 hover:text-red-900"
              >
                Read international world news
              </a>
            </div>
            <div className="space-y-4">
              {worldArticles.slice(0, 3).map((art) => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  onNavigate={onNavigate}
                  variant="horizontal"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: BUSINESS, SPORTS & ENTERTAINMENT (THREE COLUMNS) */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-5 pb-2 border-b-2 border-neutral-900">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-neutral-900 font-serif">
            Business, Sports & Entertainment
          </h2>
          <div className="flex items-center space-x-3 text-xs font-bold">
            <a
              href="/business-news/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/business-news/');
              }}
              className="text-neutral-700 hover:text-red-700"
            >
              Business
            </a>
            <span className="text-neutral-300">•</span>
            <a
              href="/sports-news/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/sports-news/');
              }}
              className="text-neutral-700 hover:text-red-700"
            >
              Sports
            </a>
            <span className="text-neutral-300">•</span>
            <a
              href="/entertainment-news/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/entertainment-news/');
              }}
              className="text-neutral-700 hover:text-red-700"
            >
              Entertainment
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bizArticles[0] && (
            <ArticleCard
              article={bizArticles[0]}
              onNavigate={onNavigate}
              variant="grid"
            />
          )}
          {sportsArticles[0] && (
            <ArticleCard
              article={sportsArticles[0]}
              onNavigate={onNavigate}
              variant="grid"
            />
          )}
          {entArticles[0] && (
            <ArticleCard
              article={entArticles[0]}
              onNavigate={onNavigate}
              variant="grid"
            />
          )}
        </div>
      </section>

      {/* AEO QUESTION & ANSWER SECTION FOR HOME */}
      <AeoSection
        items={[
          {
            question: "How does DailyPulse deliver latest news and breaking news today?",
            answer: "DailyPulse delivers latest news and breaking news today through structured newsroom desks covering national policy, international diplomacy, technology breakthroughs, financial markets, and athletic milestones with contextual analysis."
          },
          {
            question: "What makes today's news reporting reliable and answer-engine optimized on DailyPulse?",
            answer: "Today's news reporting on DailyPulse is verified against primary technical briefings and official sources, structured with clear H2 question headings and concise answers designed for both human readers and modern answer engines."
          }
        ]}
        title="Editorial Overview: Latest News & Breaking Insights"
        subtitle="Answers to common questions regarding today's news and how DailyPulse covers major developments."
      />
    </div>
  );
};
