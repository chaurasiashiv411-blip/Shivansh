import React from 'react';
import { HelpCircle, Sparkles } from 'lucide-react';
import { AeoQA } from '../types';

interface AeoSectionProps {
  items: AeoQA[];
  title?: string;
  subtitle?: string;
}

export const AeoSection: React.FC<AeoSectionProps> = ({
  items,
  title = "Key Questions & Concise Answers (AEO Insights)",
  subtitle = "Direct, verified summaries structured for readers and search discovery."
}) => {
  if (!items || items.length === 0) return null;

  return (
    <section 
      className="my-10 p-6 sm:p-8 bg-neutral-50 border border-neutral-200 rounded-sm"
      aria-label="Frequently Asked Questions and Insights"
    >
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
        <Sparkles className="w-4 h-4" />
        <span>Answer Engine Optimization • Key Briefing</span>
      </div>
      <div className="text-xl sm:text-2xl font-serif font-black text-neutral-900 mb-1">
        {title}
      </div>
      <p className="text-xs sm:text-sm text-neutral-600 mb-6">
        {subtitle}
      </p>

      <div className="space-y-6 divide-y divide-neutral-200">
        {items.map((qa, index) => (
          <div key={index} className={index > 0 ? "pt-5" : ""}>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center">
                Q
              </span>
              <div className="flex-1">
                {/* Semantic H2 for AEO */}
                <h2 className="text-base sm:text-lg font-bold text-neutral-900 mb-2 leading-snug">
                  {qa.question}
                </h2>
                {/* Immediate concise answer paragraph */}
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed bg-white p-3.5 rounded border border-neutral-200 shadow-2xs">
                  {qa.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
