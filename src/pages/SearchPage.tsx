import React, { useState, useEffect, useMemo } from 'react';
import { Article } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { updatePageSeo } from '../utils/seo';
import { Search as SearchIcon, X, Filter, ArrowRight } from 'lucide-react';

interface SearchPageProps {
  initialQuery: string;
  articles: Article[];
  onNavigate: (path: string) => void;
  onSearchChange: (query: string) => void;
}

const CATEGORY_FILTERS = [
  { label: 'All Sections', value: 'all' },
  { label: 'India News', value: 'india-news' },
  { label: 'World News', value: 'world-news' },
  { label: 'Technology', value: 'technology-news' },
  { label: 'Business', value: 'business-news' },
  { label: 'Sports', value: 'sports-news' },
  { label: 'Entertainment', value: 'entertainment-news' },
];

export const SearchPage: React.FC<SearchPageProps> = ({
  initialQuery,
  articles,
  onNavigate,
  onSearchChange
}) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const pageTitle = initialQuery 
      ? `Search results for "${initialQuery}" | DailyPulse`
      : 'Search News & Articles | DailyPulse';
    
    updatePageSeo({
      title: pageTitle,
      description: `Search results and in-depth articles matching "${initialQuery || 'news'}" on DailyPulse.`,
      canonicalUrl: `${window.location.origin}/search/?q=${encodeURIComponent(initialQuery)}`,
      type: 'website',
      keywords: ['news search', 'search headlines', initialQuery].filter(Boolean)
    });
  }, [initialQuery]);

  const filteredResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return articles.filter((art) => {
      // Category filter check
      if (selectedCategory !== 'all' && art.categorySlug !== selectedCategory) {
        return false;
      }
      if (!q) return true;

      // Query check across title, summary, content, tags, author, category
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchSummary = art.summary.toLowerCase().includes(q);
      const matchCategory = art.category.toLowerCase().includes(q);
      const matchAuthor = art.author.toLowerCase().includes(q);
      const matchTag = art.tags.some((t) => t.toLowerCase().includes(q));
      const matchKeywords = art.mainKeyword.toLowerCase().includes(q) || 
                            art.relatedKeywords.some(rk => rk.toLowerCase().includes(q));

      return matchTitle || matchSummary || matchCategory || matchAuthor || matchTag || matchKeywords;
    });
  }, [articles, searchTerm, selectedCategory]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearchChange('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header Bar */}
      <div className="max-w-3xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-neutral-900 tracking-tight mb-4">
          Search Articles & Archives
        </h1>
        <p className="text-sm text-neutral-600 mb-6">
          Find reporting, breaking updates, and beat analyses across all DailyPulse sections.
        </p>

        {/* Input box */}
        <form onSubmit={handleFormSubmit} className="relative flex items-center">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type topic, person, or keywords (e.g. AI, energy, cricket)..."
            className="w-full bg-white border-2 border-neutral-300 rounded-sm py-3 pl-11 pr-24 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-red-700 shadow-2xs"
            autoFocus
          />
          <SearchIcon className="w-5 h-5 text-neutral-400 absolute left-3.5 pointer-events-none" />

          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-20 text-neutral-400 hover:text-neutral-600 p-1"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="absolute right-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xs transition-colors"
          >
            Search
          </button>
        </form>

        {/* Popular / Suggested Search Queries */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
          <span className="font-semibold text-neutral-700">Suggested:</span>
          {['Clean Energy', 'Artificial Intelligence', 'Cricket', 'Semiconductors', 'Space'].map((term) => (
            <button
              key={term}
              onClick={() => {
                setSearchTerm(term);
                onSearchChange(term);
              }}
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-neutral-200">
        <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider flex items-center mr-1">
          <Filter className="w-3.5 h-3.5 mr-1" />
          Filter:
        </span>
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === cat.value
                ? 'bg-neutral-900 text-white font-bold'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results Meta Info */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base sm:text-lg font-bold text-neutral-800">
          {searchTerm ? (
            <span>
              Showing {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'} for "<strong>{searchTerm}</strong>"
            </span>
          ) : (
            <span>Browsing all {filteredResults.length} articles</span>
          )}
        </h2>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-xs text-red-700 hover:underline font-semibold"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Results Grid */}
      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((art) => (
            <ArticleCard
              key={art.id}
              article={art}
              onNavigate={onNavigate}
              variant="grid"
            />
          ))}
        </div>
      ) : (
        <div className="bg-neutral-50 border border-neutral-200 rounded p-12 text-center max-w-xl mx-auto">
          <p className="text-lg font-serif font-bold text-neutral-800 mb-2">
            No articles match your query
          </p>
          <p className="text-sm text-neutral-600 mb-6">
            We couldn't find any stories matching "{searchTerm}". Try exploring broad topics like "energy", "India", or "AI".
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleClear}
              className="bg-neutral-900 text-white text-xs font-bold px-4 py-2 rounded hover:bg-neutral-800"
            >
              Clear Search
            </button>
            <button
              onClick={() => onNavigate('/')}
              className="bg-red-700 text-white text-xs font-bold px-4 py-2 rounded hover:bg-red-800"
            >
              Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
