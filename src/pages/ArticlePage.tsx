import React, { useEffect, useState } from 'react';
import { Article } from '../types';
import { CATEGORIES } from '../data/categories';
import { ShareBar } from '../components/ShareBar';
import { AeoSection } from '../components/AeoSection';
import { ArticleCard } from '../components/ArticleCard';
import { updatePageSeo } from '../utils/seo';
import { handleImageError } from '../utils/imageFallback';
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Calendar, 
  Tag, 
  CheckCircle2, 
  ChevronRight, 
  Compass, 
  Volume2, 
  VolumeX,
  Type
} from 'lucide-react';

interface ArticlePageProps {
  slug: string;
  articles: Article[];
  onNavigate: (path: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({
  slug,
  articles,
  onNavigate
}) => {
  const [largeFont, setLargeFont] = useState(false);
  const [isSimulatedAudioPlaying, setIsSimulatedAudioPlaying] = useState(false);

  const article = articles.find((a) => a.slug === slug);

  useEffect(() => {
    if (!article) return;

    const fullUrl = `${window.location.origin}/news/${article.slug}/`;
    const pageTitle = `${article.title} | DailyPulse`;
    const metaDesc = article.summary.slice(0, 155);

    updatePageSeo({
      title: pageTitle,
      description: metaDesc,
      canonicalUrl: fullUrl,
      type: 'article',
      image: article.image,
      imageAlt: article.imageAlt,
      publishedTime: article.publishedDateISO,
      author: article.author,
      keywords: [article.mainKeyword, ...article.relatedKeywords],
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.summary,
        image: [article.image],
        datePublished: article.publishedDateISO,
        dateModified: article.publishedDateISO,
        author: [{
          '@type': 'Person',
          name: article.author,
          jobTitle: article.authorRole
        }],
        publisher: {
          '@type': 'NewsMediaOrganization',
          name: 'DailyPulse',
          url: window.location.origin,
          logo: {
            '@type': 'ImageObject',
            url: `${window.location.origin}/logo.png`
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullUrl
        },
        keywords: [article.mainKeyword, ...article.relatedKeywords].join(', ')
      }
    });

    window.scrollTo(0, 0);
  }, [article]);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold font-serif text-neutral-900 mb-4">Article Not Found</h1>
        <p className="text-neutral-600 mb-6">
          The requested news report could not be found or may have been relocated.
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="bg-red-700 text-white font-bold px-5 py-2 rounded text-sm hover:bg-red-800 transition-colors"
        >
          Return to DailyPulse Home
        </button>
      </div>
    );
  }

  // Related articles in the same category or others
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.categorySlug === article.categorySlug)
    .concat(articles.filter((a) => a.id !== article.id && a.categorySlug !== article.categorySlug))
    .slice(0, 3);

  const categoryConfig = CATEGORIES[article.categorySlug];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8" itemScope itemType="https://schema.org/NewsArticle">
      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-xs text-neutral-500 overflow-x-auto whitespace-nowrap pb-1">
        <button
          onClick={() => onNavigate('/')}
          className="hover:text-red-700 transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
        <button
          onClick={() => onNavigate(`/${article.categorySlug}/`)}
          className="hover:text-red-700 transition-colors"
        >
          {article.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
        <span className="text-neutral-900 font-medium truncate max-w-[200px] sm:max-w-xs">
          {article.title}
        </span>
      </nav>

      {/* Back to category button with descriptive text */}
      <div className="mb-4">
        <button
          onClick={() => onNavigate(`/${article.categorySlug}/`)}
          className="inline-flex items-center text-xs font-bold text-red-700 hover:text-red-900 hover:underline transition-colors"
          aria-label={`Return to ${article.category}`}
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Back to {article.category}</span>
        </button>
      </div>

      {/* Header section */}
      <header className="mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-red-700 text-white font-black text-xs uppercase px-2.5 py-0.5 rounded-xs tracking-wider">
            {article.category}
          </span>
          <span className="text-neutral-400 text-xs">•</span>
          <span className="text-xs text-neutral-500 font-medium">{article.source}</span>
          <span className="text-neutral-400 text-xs">•</span>
          {/* Target keywords natural metadata display */}
          <span className="text-xs text-neutral-500 italic">
            Focus: {article.mainKeyword}
          </span>
        </div>

        {/* H1 Article Headline */}
        <h1 
          className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black text-neutral-900 leading-tight tracking-tight mb-4"
          itemProp="headline"
        >
          {article.title}
        </h1>

        {/* Short Introductory Lead Paragraph */}
        <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed font-sans mb-6 border-l-4 border-red-700 pl-4 py-1 italic bg-neutral-50">
          {article.summary}
        </p>

        {/* Author / Date / Reading info row */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-neutral-200 text-xs text-neutral-600">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 font-bold font-serif text-sm">
              {article.author.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-neutral-900" itemProp="author">
                {article.author}
              </div>
              <div className="text-[11px] text-neutral-500">{article.authorRole}</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center" title="Published date">
              <Calendar className="w-3.5 h-3.5 mr-1 text-neutral-400" />
              {article.publishedAt}
            </span>
            <span className="flex items-center" title="Estimated reading time">
              <Clock className="w-3.5 h-3.5 mr-1 text-neutral-400" />
              {article.readTime}
            </span>

            {/* Accessibility: Font size toggle */}
            <button
              onClick={() => setLargeFont(!largeFont)}
              className="p-1 rounded hover:bg-neutral-100 text-neutral-600 transition-colors flex items-center"
              title={largeFont ? "Default text size" : "Enlarge text size"}
              aria-label="Toggle text size"
            >
              <Type className="w-3.5 h-3.5 mr-0.5" />
              <span className="text-[10px] font-bold">{largeFont ? 'A-' : 'A+'}</span>
            </button>

            {/* Simulated audio listen player */}
            <button
              onClick={() => setIsSimulatedAudioPlaying(!isSimulatedAudioPlaying)}
              className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium transition-colors"
              title="Listen to article briefing"
            >
              {isSimulatedAudioPlaying ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 mr-1 text-red-600 animate-pulse" />
                  <span>Pause Briefing</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 mr-1 text-neutral-600" />
                  <span>Listen (4 min)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share buttons */}
        <ShareBar title={article.title} url={`/news/${article.slug}/`} />
      </header>

      {/* Hero Image with Web-Optimized Sizing and Descriptive Alt Text */}
      <figure className="mb-8">
        <div className="aspect-16/9 overflow-hidden bg-neutral-100 rounded-xs border border-neutral-200">
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="eager"
            onError={handleImageError}
            className="w-full h-full object-cover"
            itemProp="image"
          />
        </div>
        <figcaption className="mt-2.5 text-xs text-neutral-500 flex items-center justify-between px-1">
          <span>{article.imageAlt}</span>
          <span className="text-[11px] text-neutral-400">Photo: Unsplash / DailyPulse Archives</span>
        </figcaption>
      </figure>

      {/* Key Takeaways Box */}
      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <section className="mb-8 bg-neutral-50 border border-neutral-300 rounded p-5">
          <div className="text-xs font-black uppercase tracking-wider text-red-700 mb-3 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            <span>Key Story Takeaways</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-800">
            {article.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-red-700 mt-2 mr-2.5 flex-shrink-0"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Main Article Content Body with Question-based H2 AEO Sections */}
      <div className={`prose max-w-none text-neutral-800 leading-relaxed font-sans ${largeFont ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
        {article.content.map((para, idx) => (
          <p key={idx} className="mb-6 leading-relaxed">
            {para}
          </p>
        ))}

        {/* Question-based H2 headings followed immediately by concise answer paragraphs (AEO) */}
        {article.aeoQuestions && article.aeoQuestions.map((qa, index) => (
          <div key={index} className="my-8 pt-4 border-t border-neutral-200">
            {/* Semantic Question-based H2 */}
            <h2 className="text-xl sm:text-2xl font-serif font-black text-neutral-900 mb-3">
              {qa.question}
            </h2>
            {/* Immediate concise answering paragraph */}
            <p className="bg-neutral-50 border-l-4 border-red-700 p-4 text-sm sm:text-base text-neutral-700 rounded-r shadow-2xs font-normal">
              {qa.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Tags List */}
      <div className="mt-8 pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mr-2 flex items-center">
          <Tag className="w-3.5 h-3.5 mr-1" />
          Tags:
        </span>
        {article.tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onNavigate(`/search/?q=${encodeURIComponent(tag)}`)}
            className="text-xs px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded transition-colors font-medium"
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Demonstration Notice */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 leading-relaxed">
        <strong>Editorial Transparency Note:</strong> This demonstration article is created for test and interface evaluation on DailyPulse. It follows standard journalism ethics and does not present fictional events as real current events.
      </div>

      {/* Second Share Bar at bottom */}
      <ShareBar title={article.title} url={`/news/${article.slug}/`} />

      {/* Related Articles Section */}
      <section className="mt-12 pt-8 border-t-2 border-neutral-900" aria-labelledby="related-stories-heading">
        <div className="flex items-center justify-between mb-6">
          <h2 id="related-stories-heading" className="text-xl font-bold font-serif uppercase tracking-wider text-neutral-900">
            Related Stories & Further Reading
          </h2>
          <button
            onClick={() => onNavigate(`/${article.categorySlug}/`)}
            className="text-xs font-bold text-red-700 hover:underline"
          >
            Explore more {article.category}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <ArticleCard
              key={rel.id}
              article={rel}
              onNavigate={onNavigate}
              variant="grid"
            />
          ))}
        </div>
      </section>

      {/* Related Category Links */}
      <section className="mt-12 pt-6 border-t border-neutral-200 bg-neutral-50 p-6 rounded-sm">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
          <Compass className="w-4 h-4 text-red-700" />
          <span>Explore Related Categories</span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => onNavigate(`/${article.categorySlug}/`)}
            className="px-3 py-1.5 bg-red-700 text-white rounded font-bold hover:bg-red-800 transition-colors"
          >
            View all {article.category}
          </button>
          <button
            onClick={() => onNavigate('/latest-news/')}
            className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-800 rounded font-medium hover:border-red-600 transition-colors"
          >
            View latest news today
          </button>
          <button
            onClick={() => onNavigate('/india-news/')}
            className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-800 rounded font-medium hover:border-red-600 transition-colors"
          >
            View all India news
          </button>
          <button
            onClick={() => onNavigate('/technology-news/')}
            className="px-3 py-1.5 bg-white border border-neutral-300 text-neutral-800 rounded font-medium hover:border-red-600 transition-colors"
          >
            Read the latest technology news
          </button>
        </div>
      </section>
    </article>
  );
};
