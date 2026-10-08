import React from 'react';
import { Clock, User, ArrowUpRight } from 'lucide-react';
import { Article } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface ArticleCardProps {
  article: Article;
  onNavigate: (path: string) => void;
  variant?: 'hero' | 'lead' | 'grid' | 'horizontal' | 'compact';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onNavigate,
  variant = 'grid'
}) => {
  const articleUrl = `/news/${article.slug}/`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(articleUrl);
  };

  // 1. Large Hero Featured Variant (for top stories lead)
  if (variant === 'hero') {
    return (
      <article 
        className="group bg-white border border-neutral-200 rounded-sm overflow-hidden hover:border-neutral-400 transition-all cursor-pointer flex flex-col lg:flex-row shadow-2xs"
        onClick={handleClick}
      >
        <div className="lg:w-7/12 relative overflow-hidden bg-neutral-100 aspect-16/10 sm:aspect-16/9 lg:aspect-auto">
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="eager"
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          />
          <div className="absolute top-3 left-3 bg-red-700 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xs shadow-xs">
            {article.category}
          </div>
        </div>
        <div className="lg:w-5/12 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center text-xs text-neutral-500 mb-2.5 space-x-2">
              <span className="font-semibold text-neutral-700">{article.source}</span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-neutral-400" />
                {article.publishedAt}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 group-hover:text-red-700 transition-colors leading-tight mb-4">
              {article.title}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
              {article.summary}
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
            <div className="flex items-center text-xs text-neutral-500">
              <User className="w-3.5 h-3.5 mr-1 text-neutral-400" />
              <span className="truncate max-w-[180px]">{article.author}</span>
            </div>
            <a
              href={articleUrl}
              onClick={handleClick}
              className="inline-flex items-center text-xs font-bold text-red-700 hover:text-red-900 uppercase tracking-wider"
              aria-label={`Read the full article: ${article.title}`}
            >
              Read Full Article
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </article>
    );
  }

  // 2. Lead Secondary Variant (2-column prominence)
  if (variant === 'lead') {
    return (
      <article
        className="group bg-white border border-neutral-200 rounded-sm overflow-hidden hover:border-neutral-400 transition-all cursor-pointer flex flex-col h-full shadow-2xs"
        onClick={handleClick}
      >
        <div className="relative overflow-hidden bg-neutral-100 aspect-16/10">
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          />
          <div className="absolute top-2.5 left-2.5 bg-neutral-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
            {article.category}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center text-xs text-neutral-500 mb-2 space-x-2">
              <span>{article.publishedAt}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-neutral-900 group-hover:text-red-700 transition-colors leading-snug mb-2.5">
              {article.title}
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
              {article.summary}
            </p>
          </div>
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
            <span className="text-neutral-500">{article.author}</span>
            <a
              href={articleUrl}
              onClick={handleClick}
              className="font-bold text-red-700 hover:underline uppercase tracking-wider text-[11px]"
              aria-label={`Read the full article: ${article.title}`}
            >
              Read full article
            </a>
          </div>
        </div>
      </article>
    );
  }

  // 3. Horizontal list item (for sidebars and feed lists)
  if (variant === 'horizontal') {
    return (
      <article
        className="group bg-white border border-neutral-200 rounded-sm p-3.5 hover:border-neutral-400 transition-all cursor-pointer flex gap-3.5 shadow-2xs"
        onClick={handleClick}
      >
        <div className="w-28 sm:w-32 h-20 sm:h-24 flex-shrink-0 relative overflow-hidden bg-neutral-100 rounded-xs">
          <img
            src={article.image}
            alt={article.imageAlt}
            loading="lazy"
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <div className="flex items-center text-[10px] uppercase font-bold text-red-700 tracking-wider mb-1">
              <span>{article.category.replace(' News', '')}</span>
              <span className="mx-1.5 text-neutral-300">•</span>
              <span className="text-neutral-400 normal-case">{article.publishedAt}</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
              {article.title}
            </h4>
          </div>
          <div className="mt-2 text-right">
            <a
              href={articleUrl}
              onClick={handleClick}
              className="text-[11px] font-semibold text-neutral-600 hover:text-red-700 inline-flex items-center"
              aria-label={`Read the full article: ${article.title}`}
            >
              Read article
              <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      </article>
    );
  }

  // 4. Compact text item (for fast list sidebars)
  if (variant === 'compact') {
    return (
      <article
        className="group py-3 border-b border-neutral-200 last:border-b-0 cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center text-[10px] font-bold text-red-700 uppercase tracking-wider mb-1">
          <span>{article.category.replace(' News', '')}</span>
          <span className="mx-1.5 text-neutral-300">•</span>
          <span className="text-neutral-500 normal-case">{article.publishedAt}</span>
        </div>
        <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 group-hover:text-red-700 transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h4>
        <div className="mt-1.5">
          <a
            href={articleUrl}
            onClick={handleClick}
            className="text-[11px] font-medium text-neutral-500 hover:text-red-700 hover:underline"
            aria-label={`Read the full article: ${article.title}`}
          >
            Read story
          </a>
        </div>
      </article>
    );
  }

  // 5. Standard Grid Card (default)
  return (
    <article
      className="group bg-white border border-neutral-200 rounded-sm overflow-hidden hover:border-neutral-400 transition-all cursor-pointer flex flex-col h-full shadow-2xs"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden bg-neutral-100 aspect-16/10">
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
        />
        <div className="absolute top-2.5 left-2.5 bg-neutral-900/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
          {article.category}
        </div>
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center text-xs text-neutral-500 mb-2 space-x-2">
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <h3 className="text-base sm:text-lg font-serif font-bold text-neutral-900 group-hover:text-red-700 transition-colors leading-snug mb-2">
            {article.title}
          </h3>
          <p className="text-neutral-600 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
            {article.summary}
          </p>
        </div>
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
          <span className="text-neutral-500 text-[11px] truncate max-w-[140px]">{article.author}</span>
          <a
            href={articleUrl}
            onClick={handleClick}
            className="font-bold text-red-700 hover:underline uppercase tracking-wider text-[11px] inline-flex items-center"
            aria-label={`Read the full article: ${article.title}`}
          >
            Read full article
            <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
};
