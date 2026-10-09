import React, { useState } from 'react';
import { ArrowUp, Mail, ShieldCheck, Newspaper, Globe, Sparkles, X } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [policyModal, setPolicyModal] = useState<'terms' | 'privacy' | 'editorial' | null>(null);

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
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="inline-flex items-center space-x-2 mb-3 focus:outline-none focus:ring-1 focus:ring-red-500 rounded"
              aria-label="DailyPulse - Return to Homepage"
            >
              <span className="inline-flex items-center justify-center bg-red-700 text-white font-black text-xl px-2 py-0.5 rounded-sm tracking-tight">
                DAILY
              </span>
              <span className="text-2xl font-black tracking-tight text-white font-serif">
                PULSE
              </span>
            </a>
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
                <a
                  href="/latest-news/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/latest-news/');
                  }}
                  className="hover:text-white hover:underline text-left transition-colors inline-block"
                  title="Read latest news today"
                >
                  View latest news today
                </a>
              </li>
              <li>
                <a
                  href="/india-news/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/india-news/');
                  }}
                  className="hover:text-white hover:underline text-left transition-colors inline-block"
                  title="View all India news"
                >
                  View all India news
                </a>
              </li>
              <li>
                <a
                  href="/world-news/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/world-news/');
                  }}
                  className="hover:text-white hover:underline text-left transition-colors inline-block"
                  title="Read international world news"
                >
                  Read international world news
                </a>
              </li>
              <li>
                <a
                  href="/technology-news/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/technology-news/');
                  }}
                  className="hover:text-white hover:underline text-left transition-colors inline-block"
                  title="Read the latest technology news"
                >
                  Read the latest technology news
                </a>
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
                <a
                  href="/business-news/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/business-news/');
                  }}
                  className="hover:text-white hover:underline text-left transition-colors inline-block"
                  title="Catch up on business news today"
                >
                  Catch up on business news today
                </a>
              </li>
              <li>
                <a
                  href="/sports-news/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/sports-news/');
                  }}
                  className="hover:text-white hover:underline text-left transition-colors inline-block"
                  title="Explore today's sports news"
                >
                  Explore today's sports news
                </a>
              </li>
              <li>
                <a
                  href="/entertainment-news/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/entertainment-news/');
                  }}
                  className="hover:text-white hover:underline text-left transition-colors inline-block"
                  title="Browse latest entertainment news"
                >
                  Browse latest entertainment news
                </a>
              </li>
              <li>
                <a
                  href="/latest-news/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/latest-news/');
                  }}
                  className="hover:text-white hover:underline text-left transition-colors inline-block"
                  title="Explore breaking headlines"
                >
                  Explore breaking headlines
                </a>
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
            <button
              onClick={() => setPolicyModal('terms')}
              className="hover:text-neutral-300 underline underline-offset-2 transition-colors"
            >
              Terms of Use
            </button>
            <button
              onClick={() => setPolicyModal('privacy')}
              className="hover:text-neutral-300 underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setPolicyModal('editorial')}
              className="hover:text-neutral-300 underline underline-offset-2 transition-colors"
            >
              Editorial Guidelines
            </button>
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

      {/* Policy Preview Modal */}
      {policyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white text-neutral-900 rounded-sm max-w-lg w-full p-6 shadow-xl relative border border-neutral-200">
            <button
              onClick={() => setPolicyModal(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-1"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {policyModal === 'terms' && (
              <div>
                <h3 className="text-lg font-serif font-bold text-neutral-900 mb-2">Terms of Use (Demonstration)</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  DailyPulse is a demonstration news publication created for testing, architectural validation, and responsive interface evaluation. Content presented comprises sample journalism articles and illustrative scenarios.
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  By accessing this demonstration site, you agree to evaluate its layout and technical capabilities without treating sample articles as real-time financial or legal counsel.
                </p>
              </div>
            )}

            {policyModal === 'privacy' && (
              <div>
                <h3 className="text-lg font-serif font-bold text-neutral-900 mb-2">Privacy Policy (Demonstration)</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  DailyPulse values reader privacy. In this demonstration environment, no personal data, browsing telemetry, or third-party advertising cookies are stored or shared with external trackers.
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  Simulated subscription forms and interactive search queries operate strictly within client session storage.
                </p>
              </div>
            )}

            {policyModal === 'editorial' && (
              <div>
                <h3 className="text-lg font-serif font-bold text-neutral-900 mb-2">Editorial Guidelines (Demonstration)</h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  DailyPulse upholds foundational journalistic standards: factual verification, primary source attribution, and non-partisan analysis across international affairs, science, and governance.
                </p>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                  Demonstration stories maintain realistic tone while clearly signaling their testing purpose to avoid misinformation.
                </p>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-end">
              <button
                onClick={() => setPolicyModal(null)}
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-4 py-1.5 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
