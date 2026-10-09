import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Clock, ArrowUpRight } from 'lucide-react';
import { Article } from '../types';
import { getOptimizedImageUrl, handleImageError } from '../utils/imageFallback';
import { calculateReadingTime } from '../utils/readingTime';

interface FeaturedCarouselProps {
  articles: Article[];
  onNavigate: (path: string) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({
  articles,
  onNavigate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Take top 4 featured or lead stories
  const slides = articles.slice(0, 4);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance every 6 seconds if playing and not hovered
  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsPlaying(false);
      return;
    }

    if (isPlaying && !isHovered) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, nextSlide]);

  if (slides.length === 0) return null;

  const current = slides[currentIndex];
  const articleUrl = `/news/${current.slug}/`;
  const readingTime = calculateReadingTime(current.content);

  return (
    <section 
      className="relative bg-neutral-900 text-white rounded-md overflow-hidden border border-neutral-800 shadow-lg mb-10"
      aria-roledescription="carousel"
      aria-label="DailyPulse Featured News Spotlight"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
        }
      }}
      tabIndex={0}
    >
      {/* Slide Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] lg:min-h-[460px]">
        {/* Left: Image with Subtle Gradient Overlay (7 cols) */}
        <div className="lg:col-span-7 relative overflow-hidden bg-neutral-950 aspect-16/10 lg:aspect-auto">
          <img
            key={current.id}
            src={getOptimizedImageUrl(current.image, 1200)}
            alt={current.imageAlt}
            width={1200}
            height={675}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-103"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent lg:hidden" />

          {/* Badge over image */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <span className="bg-red-700 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-xs shadow-md">
              {current.category}
            </span>
            <span className="bg-neutral-900/80 backdrop-blur-xs text-neutral-200 text-[11px] font-semibold px-2.5 py-1 rounded-xs border border-neutral-700">
              Spotlight #{currentIndex + 1}
            </span>
          </div>
        </div>

        {/* Right: Editorial Narrative Content (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-neutral-900">
          <div>
            <div className="flex items-center text-xs text-neutral-400 space-x-2 mb-3">
              <span className="font-semibold text-neutral-300">{current.source}</span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-red-500" />
                {current.publishedAt}
              </span>
              <span>•</span>
              <span>{readingTime}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight tracking-tight mb-4 hover:text-red-400 transition-colors">
              <a
                href={articleUrl}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(articleUrl);
                }}
                className="hover:underline focus:outline-none focus:ring-1 focus:ring-red-500 rounded"
              >
                {current.title}
              </a>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
              {current.summary}
            </p>
          </div>

          <div>
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <div className="text-xs text-neutral-400">
                <div className="text-neutral-200 font-semibold">{current.author}</div>
                <div className="text-[11px] text-neutral-500">{current.authorRole}</div>
              </div>

              <a
                href={articleUrl}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(articleUrl);
                }}
                className="inline-flex items-center bg-red-700 hover:bg-red-800 text-white text-xs font-bold px-4 py-2 rounded-xs uppercase tracking-wider transition-colors shadow-xs group"
                aria-label={`Read featured story: ${current.title}`}
              >
                <span>Read Story</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Slider Navigation Bar */}
            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              {/* Slide Counter */}
              <div className="text-xs font-mono text-neutral-400">
                <span className="text-white font-bold text-sm">0{currentIndex + 1}</span>
                <span className="mx-1 text-neutral-600">/</span>
                <span>0{slides.length}</span>
              </div>

              {/* Dot Indicators */}
              <div className="flex items-center space-x-1.5" role="tablist" aria-label="Slide indicators">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(idx)}
                    role="tab"
                    aria-selected={currentIndex === idx}
                    aria-label={`Go to featured story ${idx + 1}: ${s.title}`}
                    className={`h-1.5 rounded-full transition-all ${
                      currentIndex === idx
                        ? 'w-6 bg-red-600'
                        : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Play / Next Controls */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={prevSlide}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
                  aria-label="Previous featured story"
                  title="Previous story"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
                  aria-label={isPlaying ? "Pause carousel autoplay" : "Play carousel autoplay"}
                  title={isPlaying ? "Pause autoplay" : "Start autoplay"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={nextSlide}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
                  aria-label="Next featured story"
                  title="Next story"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
