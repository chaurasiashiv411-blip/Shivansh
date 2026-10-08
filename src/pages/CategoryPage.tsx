import React, { useEffect } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { AeoSection } from '../components/AeoSection';
import { Article } from '../types';
import { CATEGORIES } from '../data/categories';
import { updatePageSeo } from '../utils/seo';
import { Layers, ArrowRight, Tag, Compass } from 'lucide-react';

interface CategoryPageProps {
  categorySlug: string;
  articles: Article[];
  onNavigate: (path: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categorySlug,
  articles,
  onNavigate
}) => {
  const categoryConfig = CATEGORIES[categorySlug] || CATEGORIES['latest-news'];

  useEffect(() => {
    updatePageSeo({
      title: categoryConfig.title,
      description: categoryConfig.metaDescription,
      canonicalUrl: `${window.location.origin}${categoryConfig.path}`,
      type: 'website',
      keywords: [categoryConfig.mainKeyword, ...categoryConfig.relatedKeywords],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: categoryConfig.h1,
        url: `${window.location.origin}${categoryConfig.path}`,
        description: categoryConfig.metaDescription,
        isPartOf: {
          '@type': 'NewsMediaOrganization',
          name: 'DailyPulse',
          url: window.location.origin
        }
      }
    });
    window.scrollTo(0, 0);
  }, [categoryConfig]);

  // Filter articles: if 'latest-news', show all articles sorted by date; otherwise filter by categorySlug
  const categoryArticles = categorySlug === 'latest-news'
    ? articles
    : articles.filter(a => a.categorySlug === categorySlug);

  const featuredCategoryArticle = categoryArticles[0];
  const remainingArticles = categoryArticles.slice(1);

  // Other categories for internal linking
  const otherCategories = Object.values(CATEGORIES).filter(c => c.slug !== categorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Header Banner with Keywords */}
      <header className="mb-10 pb-6 border-b border-neutral-200">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-red-700 text-white font-black text-xs uppercase px-2.5 py-0.5 rounded-xs tracking-wider">
            Beat Desk
          </span>
          <span className="text-neutral-400 text-xs">•</span>
          {/* Main and Related Keywords naturally highlighted */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-600">
            <span className="font-semibold text-neutral-800">Focus: {categoryConfig.mainKeyword}</span>
            <span className="text-neutral-300">|</span>
            <span className="text-neutral-500">Related: {categoryConfig.relatedKeywords.join(', ')}</span>
          </div>
        </div>

        {/* H1 Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-neutral-900 tracking-tight mb-4">
          {categoryConfig.h1}
        </h1>

        {/* Natural Introductory Paragraph */}
        <p className="text-base sm:text-lg text-neutral-600 max-w-3xl leading-relaxed">
          {categoryConfig.intro}
        </p>
      </header>

      {/* Featured Lead in this Category */}
      {featuredCategoryArticle && (
        <section className="mb-12" aria-label="Featured Story in Category">
          <ArticleCard
            article={featuredCategoryArticle}
            onNavigate={onNavigate}
            variant="hero"
          />
        </section>
      )}

      {/* Remaining Category Articles Grid */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-neutral-900">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-neutral-900 font-serif">
            {categoryConfig.name} Stories & In-Depth Reports
          </h2>
          <span className="text-xs font-semibold text-neutral-500">
            {categoryArticles.length} stories published
          </span>
        </div>

        {remainingArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingArticles.map((art) => (
              <ArticleCard
                key={art.id}
                article={art}
                onNavigate={onNavigate}
                variant="grid"
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded p-8 text-center text-neutral-500">
            More stories in {categoryConfig.name} are currently being filed by correspondents.
          </div>
        )}
      </section>

      {/* AEO QUESTION & ANSWER SECTION FOR CATEGORY */}
      <AeoSection
        items={[
          {
            question: categoryConfig.aeoQuestion,
            answer: categoryConfig.aeoAnswer
          },
          {
            question: `How frequently does DailyPulse update its ${categoryConfig.mainKeyword}?`,
            answer: `DailyPulse updates its ${categoryConfig.mainKeyword} continually throughout each editorial cycle, verifying reports through designated correspondents and official beat briefings.`
          }
        ]}
        title={`${categoryConfig.name} Insights & Core Briefing`}
        subtitle={`Concise answers on ${categoryConfig.mainKeyword} and major developments.`}
      />

      {/* Internal Links to other relevant categories */}
      <section className="mt-12 pt-8 border-t border-neutral-200 bg-neutral-50 p-6 rounded-sm border border-neutral-200">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
          <Compass className="w-4 h-4 text-red-700" />
          <span>Explore Related News Categories</span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 mb-4">
          Connect across our independent editorial sections to explore wider perspectives and breaking coverage:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
          {otherCategories.map((c) => (
            <button
              key={c.slug}
              onClick={() => onNavigate(c.path)}
              className="p-2.5 bg-white border border-neutral-200 hover:border-red-600 hover:text-red-700 text-neutral-800 rounded text-left transition-colors font-medium flex items-center justify-between"
              title={`Read ${c.name} news`}
            >
              <span>{c.name}</span>
              <ArrowRight className="w-3 h-3 text-neutral-400" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
