import React, { useState } from 'react';
import { Share2, Link2, Check, Twitter, Linkedin, MessageCircle, Printer } from 'lucide-react';

interface ShareBarProps {
  title: string;
  url: string;
}

export const ShareBar: React.FC<ShareBarProps> = ({ title, url }) => {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(fullUrl);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareTwitter = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareLinkedIn = () => {
    const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
    window.open(liUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${fullUrl}`)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-3 border-y border-neutral-200 my-6 text-xs text-neutral-600">
      <span className="font-bold uppercase tracking-wider text-neutral-500 mr-2 flex items-center">
        <Share2 className="w-3.5 h-3.5 mr-1" />
        Share
      </span>

      {/* Copy Link Button */}
      <button
        onClick={handleCopy}
        className="inline-flex items-center px-2.5 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors font-medium border border-neutral-200"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
            <span className="text-emerald-700 font-bold">Link Copied!</span>
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5 mr-1 text-neutral-500" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Twitter / X */}
      <button
        onClick={handleShareTwitter}
        className="inline-flex items-center px-2.5 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors font-medium border border-neutral-200"
        title="Share on X"
      >
        <Twitter className="w-3.5 h-3.5 mr-1 text-sky-500" />
        <span>Post</span>
      </button>

      {/* LinkedIn */}
      <button
        onClick={handleShareLinkedIn}
        className="inline-flex items-center px-2.5 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors font-medium border border-neutral-200"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-3.5 h-3.5 mr-1 text-blue-600" />
        <span>Share</span>
      </button>

      {/* WhatsApp */}
      <button
        onClick={handleShareWhatsApp}
        className="inline-flex items-center px-2.5 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors font-medium border border-neutral-200"
        title="Share via WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" />
        <span>WhatsApp</span>
      </button>

      {/* Print */}
      <button
        onClick={handlePrint}
        className="inline-flex items-center px-2.5 py-1.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors font-medium border border-neutral-200 ml-auto hidden sm:inline-flex"
        title="Print article"
      >
        <Printer className="w-3.5 h-3.5 mr-1 text-neutral-500" />
        <span>Print</span>
      </button>
    </div>
  );
};
