import React, { useState } from 'react';
import { Search, Menu, X, Globe, Calendar, CloudSun, Bookmark, ArrowRight } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onSearch: (query: string) => void;
  savedCount?: number;
}

const NAV_ITEMS = [
  { name: 'Home', path: '/' },
  { name: 'Latest', path: '/latest-news/' },
  { name: 'India', path: '/india-news/' },
  { name: 'World', path: '/world-news/' },
  { name: 'Technology', path: '/technology-news/' },
  { name: 'Business', path: '/business-news/' },
  { name: 'Sports', path: '/sports-news/' },
  { name: 'Entertainment', path: '/entertainment-news/' },
];

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onSearch,
  savedCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [edition, setEdition] = useState<'India' | 'Global'>('India');

  // Close menus on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formattedDate = React.useMemo(() => {
    try {
      return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Friday, October 9, 2026';
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchOpen(false);
      setMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 shadow-xs" role="banner">
      {/* Top Utility Masthead Bar */}
      <div className="bg-neutral-100 border-b border-neutral-200 text-xs text-neutral-600 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center">
          {/* Dateline & Weather */}
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-neutral-700 font-medium">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-neutral-500" />
              {formattedDate}
            </span>
            <span className="flex items-center text-neutral-600 border-l border-neutral-300 pl-4">
              <CloudSun className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              <span>New Delhi 28°C</span>
              <span className="mx-2 text-neutral-400">•</span>
              <span>London 16°C</span>
              <span className="mx-2 text-neutral-400">•</span>
              <span>New York 19°C</span>
            </span>
          </div>

          {/* Right Edition switcher & Test site indicator */}
          <div className="flex items-center space-x-4">
            <span className="text-[11px] uppercase tracking-wider bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded font-semibold">
              Demo Publication
            </span>
            <div className="flex items-center border border-neutral-300 rounded overflow-hidden bg-white">
              <button
                onClick={() => setEdition('India')}
                className={`px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                  edition === 'India' ? 'bg-red-700 text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                India Edition
              </button>
              <button
                onClick={() => setEdition('Global')}
                className={`px-2.5 py-0.5 text-xs font-semibold transition-colors ${
                  edition === 'Global' ? 'bg-red-700 text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Global Edition
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Branding Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo & Tagline */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="flex flex-col items-center sm:items-start text-center sm:text-left focus:outline-none focus:ring-2 focus:ring-red-600 rounded"
            aria-label="DailyPulse - Return to Homepage"
          >
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center justify-center bg-red-700 text-white font-black text-xl sm:text-2xl px-2 py-0.5 rounded-sm tracking-tight shadow-xs">
                DAILY
              </span>
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 font-serif">
                PULSE
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mt-0.5">
              Independent Global Reporting & Analysis
            </span>
          </a>

          {/* Right Action Tools: Search & Saved Articles */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Input on Desktop */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center relative">
              <input
                type="search"
                placeholder="Search headlines, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 lg:w-60 bg-neutral-100 border border-neutral-300 rounded-full py-1.5 pl-9 pr-3 text-xs text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white transition-all"
                aria-label="Search articles"
              />
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bg-red-700 text-white p-1 rounded-full hover:bg-red-800 transition-colors"
                  aria-label="Submit search"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </form>

            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="sm:hidden p-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-md"
              aria-label="Toggle search bar"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick Explore Button */}
            <a
              href="/latest-news/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/latest-news/');
              }}
              className="hidden md:inline-flex items-center bg-neutral-900 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded transition-colors"
            >
              Live Feed
            </a>
          </div>
        </div>

        {/* Mobile Search dropdown */}
        {searchOpen && (
          <form onSubmit={handleSearchSubmit} className="mt-3 sm:hidden relative">
            <input
              type="search"
              placeholder="Search news by topic or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-100 border border-neutral-300 rounded-lg py-2 pl-9 pr-10 text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white"
              autoFocus
            />
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-red-700 text-white px-3 py-1 rounded text-xs font-semibold"
            >
              Search
            </button>
          </form>
        )}
      </div>

      {/* Primary Navigation Bar */}
      <nav className="border-t border-neutral-200 bg-neutral-50 hidden lg:block" aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center space-x-1 py-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.path);
                    }}
                    className={`inline-block px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded transition-colors ${
                      isActive
                        ? 'text-red-700 bg-red-50 border-b-2 border-red-700 font-extrabold'
                        : 'text-neutral-700 hover:text-red-700 hover:bg-neutral-100'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-neutral-200 px-4 py-4 space-y-3 shadow-lg max-h-[85vh] overflow-y-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 px-2">
            News Sections
          </div>
          <div className="grid grid-cols-1 gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-semibold transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-red-50 text-red-700 font-bold border-l-4 border-red-700'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.name} News</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-neutral-200 flex justify-between items-center text-xs text-neutral-500 px-2">
            <span>Edition: <strong>{edition}</strong></span>
            <span className="text-[11px] bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">
              Demo Site
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
