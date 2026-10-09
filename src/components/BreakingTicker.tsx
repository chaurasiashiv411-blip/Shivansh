import React, { useState } from 'react';
import { Flame, ChevronRight, Pause, Play } from 'lucide-react';
import { Article } from '../types';

interface BreakingTickerProps {
  articles: Article[];
  onNavigate: (path: string) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ articles, onNavigate }) => {
  const [isPaused, setIsPaused] = useState(false);
  const tickerItems = articles.slice(0, 6);

  return (
    <div 
      className="bg-neutral-900 text-neutral-100 border-b border-neutral-800 text-xs sm:text-sm select-none"
      role="region"
      aria-label="Breaking News Ticker"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-10 overflow-hidden">
        {/* Badge */}
        <div className="flex items-center space-x-1.5 bg-red-600 text-white font-bold px-3 py-1 rounded-sm uppercase tracking-wider text-xs flex-shrink-0 z-10 shadow-sm">
          <Flame className="w-3.5 h-3.5 animate-pulse" />
          <span>Breaking</span>
        </div>

        {/* Scrolling or Ticker content */}
        <div 
          className="relative flex-1 overflow-hidden ml-4 flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div 
            className={`flex items-center space-x-8 whitespace-nowrap ${isPaused ? '' : 'animate-[ticker_35s_linear_infinite]'}`}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {tickerItems.concat(tickerItems).map((art, idx) => (
              <a
                key={`${art.id}-${idx}`}
                href={`/news/${art.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/news/${art.slug}/`);
                }}
                className="inline-flex items-center text-neutral-200 hover:text-white hover:underline focus:outline-none focus:ring-1 focus:ring-red-500 rounded px-1 transition-colors text-xs sm:text-sm"
                title={`Read breaking story: ${art.title}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 inline-block"></span>
                <span className="font-semibold text-neutral-400 mr-1.5">[{art.category.replace(' News', '')}]</span>
                <span className="truncate max-w-xs sm:max-w-md md:max-w-none">{art.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-neutral-500 ml-1 opacity-70" />
              </a>
            ))}
          </div>
        </div>

        {/* Pause toggle for accessibility */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="text-neutral-400 hover:text-white p-1 ml-2 rounded transition-colors hidden sm:flex items-center"
          aria-label={isPaused ? "Resume breaking news ticker" : "Pause breaking news ticker"}
          title={isPaused ? "Resume ticker" : "Pause ticker"}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
