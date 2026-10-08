import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { BreakingTicker } from './components/BreakingTicker';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ArticlePage } from './pages/ArticlePage';
import { SearchPage } from './pages/SearchPage';
import { ARTICLES } from './data/articles';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('q') || '';
    }
    return '';
  });

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      const params = new URLSearchParams(window.location.search);
      setCurrentPath(path);
      setSearchQuery(params.get('q') || '');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Safe navigation function updating History API
  const handleNavigate = useCallback((path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    if (!path.startsWith('/search/')) {
      setSearchQuery('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Search handler
  const handleSearch = useCallback((query: string) => {
    const encoded = encodeURIComponent(query);
    const searchUrl = `/search/?q=${encoded}`;
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', searchUrl);
    }
    setSearchQuery(query);
    setCurrentPath('/search/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Render active page based on current path
  const renderPage = () => {
    // 1. Search page
    if (currentPath.startsWith('/search')) {
      return (
        <SearchPage
          initialQuery={searchQuery}
          articles={ARTICLES}
          onNavigate={handleNavigate}
          onSearchChange={(q) => handleSearch(q)}
        />
      );
    }

    // 2. Individual Article page: /news/[slug]/
    if (currentPath.startsWith('/news/')) {
      const match = currentPath.match(/\/news\/([^/]+)/);
      const slug = match ? match[1] : '';
      return (
        <ArticlePage
          slug={slug}
          articles={ARTICLES}
          onNavigate={handleNavigate}
        />
      );
    }

    // 3. Category pages
    switch (currentPath) {
      case '/latest-news/':
      case '/latest-news':
        return <CategoryPage categorySlug="latest-news" articles={ARTICLES} onNavigate={handleNavigate} />;

      case '/india-news/':
      case '/india-news':
        return <CategoryPage categorySlug="india-news" articles={ARTICLES} onNavigate={handleNavigate} />;

      case '/world-news/':
      case '/world-news':
        return <CategoryPage categorySlug="world-news" articles={ARTICLES} onNavigate={handleNavigate} />;

      case '/technology-news/':
      case '/technology-news':
        return <CategoryPage categorySlug="technology-news" articles={ARTICLES} onNavigate={handleNavigate} />;

      case '/business-news/':
      case '/business-news':
        return <CategoryPage categorySlug="business-news" articles={ARTICLES} onNavigate={handleNavigate} />;

      case '/sports-news/':
      case '/sports-news':
        return <CategoryPage categorySlug="sports-news" articles={ARTICLES} onNavigate={handleNavigate} />;

      case '/entertainment-news/':
      case '/entertainment-news':
        return <CategoryPage categorySlug="entertainment-news" articles={ARTICLES} onNavigate={handleNavigate} />;

      case '/':
      default:
        return <HomePage articles={ARTICLES} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100/50 flex flex-col font-sans text-neutral-900 selection:bg-red-700 selection:text-white">
      {/* Top Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
      />

      {/* Breaking News Ticker below header */}
      <BreakingTicker
        articles={ARTICLES}
        onNavigate={handleNavigate}
      />

      {/* Main Publication Content */}
      <main className="flex-1 bg-white">
        {renderPage()}
      </main>

      {/* Publication Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
