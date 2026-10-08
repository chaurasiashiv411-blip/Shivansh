import React, { useState } from 'react';
import { ArrowUp, Mail, ShieldCheck, Newspaper, Globe, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t border-neutral-800 mt-16 pt-12 pb-8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Disclaimer Banner */}
        <div className="bg-neutral-800/80 border border-neutral-700/80 rounded-sm p-4 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between text-xs text-neutral-300 gap-3">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border border-amber-500/30">
              Notice
            </span>
            <span className="text-neutral-300">
              <strong>Demonstration News Publication:</strong> DailyPulse is a test news website featuring sample editorial content, structured SEO, and simulated reporting.
            </span>
          </div>
          <span className="text-neutral-400 text-[11px] whitespace-nowrap">
            No real breaking events are fabricated.
          </span>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-neutral-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 pr-0 lg:pr-6">
            <div className="flex items-center space-x-2 mb-3 cursor-pointer" onClick={() => onNavigate('/')}>
              <span className="inline-flex items-center justify-center bg-red-700 text-white font-black text-xl px-2 py-0.5 rounded-sm tracking-tight">
                DAILY
              </span>
              <span className="text-2xl font-black tracking-tight text-white font-serif">
                PULSE
              </span>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
              DailyPulse delivers comprehensive, verified reporting across international diplomacy, national policy, cutting-edge technology, global finance, and cultural milestones.
            </p>
            <div className="flex items-center space-x-3 text-xs text-neutral-400">
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-red-500" />
                Verified Beat Standards
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Globe className="w-4 h-4 mr-1 text-red-500" />
                Global & Regional Desks
              </span>
            </div>
          </div>

          {/* News Sections with Descriptive Anchor Texts */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-100 mb-4 pb-1 border-b border-neutral-800">
              News Sections
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/latest-news/')}
                  className="hover:text-white hover:underline text-left transition-colors"
                  title="Read latest news today"
                >
                  View latest news today
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/india-news/')}
                  className="hover:text-white hover:underline text-left transition-colors"
                  title="View all India news"
                >
                  View all India news
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/world-news/')}
                  className="hover:text-white hover:underline text-left transition-colors"
                  title="Read international world news"
                >
                  Read international world news
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/technology-news/')}
                  className="hover:text-white hover:underline text-left transition-colors"
                  title="Read the latest technology news"
                >
                  Read the latest technology news
                </button>
              </li>
            </ul>
          </div>

          {/* More Sections */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-100 mb-4 pb-1 border-b border-neutral-800">
              Markets & Culture
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/business-news/')}
                  className="hover:text-white hover:underline text-left transition-colors"
                  title="Catch up on business news today"
                >
                  Catch up on business news today
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/sports-news/')}
                  className="hover:text-white hover:underline text-left transition-colors"
                  title="Explore today's sports news"
                >
                  Explore today's sports news
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/entertainment-news/')}
                  className="hover:text-white hover:underline text-left transition-colors"
                  title="Browse latest entertainment news"
                >
                  Browse latest entertainment news
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/latest-news/')}
                  className="hover:text-white hover:underline text-left transition-colors"
                  title="Explore breaking headlines"
                >
                  Explore breaking headlines
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-neutral-100 mb-4 pb-1 border-b border-neutral-800">
              Daily Pulse Digest
            </h3>
            <p className="text-xs text-neutral-400 mb-3">
              Receive our morning briefing with top stories delivered directly to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  aria-label="Email address for news digest"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white font-bold text-xs py-1.5 px-3 rounded transition-colors"
              >
                Subscribe Free
              </button>
              {subscribed && (
                <p className="text-xs text-emerald-400 font-semibold text-center mt-1">
                  ✓ Subscribed to demo briefing!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span>© {new Date().getFullYear()} DailyPulse Demonstration News.</span>
            <span>All rights reserved.</span>
            <span className="text-neutral-600">|</span>
            <button onClick={() => onNavigate('/')} className="hover:text-neutral-300">Terms of Use</button>
            <button onClick={() => onNavigate('/')} className="hover:text-neutral-300">Privacy Policy</button>
            <button onClick={() => onNavigate('/')} className="hover:text-neutral-300">Editorial Guidelines</button>
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};
