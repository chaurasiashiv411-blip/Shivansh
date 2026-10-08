export interface SeoOptions {
  title: string;
  description: string;
  canonicalUrl: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  author?: string;
  keywords?: string[];
  structuredData?: Record<string, any>;
}

export function updatePageSeo(options: SeoOptions) {
  // 1. Update Title
  document.title = options.title;

  // 2. Helper to set/create meta tag
  const setMeta = (nameOrProperty: string, key: 'name' | 'property', content: string) => {
    let el = document.querySelector(`meta[${key}="${nameOrProperty}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(key, nameOrProperty);
      document.head.appendChild(el);
    }
    el.content = content;
  };

  // 3. Update standard meta description & keywords
  setMeta('description', 'name', options.description);
  if (options.keywords && options.keywords.length > 0) {
    setMeta('keywords', 'name', options.keywords.join(', '));
  }

  // 4. Update OpenGraph tags
  setMeta('og:title', 'property', options.title);
  setMeta('og:description', 'property', options.description);
  setMeta('og:url', 'property', options.canonicalUrl);
  setMeta('og:type', 'property', options.type || 'website');
  setMeta('og:site_name', 'property', 'DailyPulse');
  if (options.image) {
    setMeta('og:image', 'property', options.image);
  }

  // 5. Update Twitter tags
  setMeta('twitter:card', 'name', 'summary_large_image');
  setMeta('twitter:title', 'name', options.title);
  setMeta('twitter:description', 'name', options.description);
  if (options.image) {
    setMeta('twitter:image', 'name', options.image);
    if (options.imageAlt) {
      setMeta('twitter:image:alt', 'name', options.imageAlt);
    }
  }

  // 6. Update Canonical link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.rel = 'canonical';
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.href = options.canonicalUrl;

  // 7. Update JSON-LD structured data
  const existingJsonLd = document.getElementById('dailypulse-jsonld');
  if (existingJsonLd) {
    existingJsonLd.remove();
  }

  if (options.structuredData) {
    const script = document.createElement('script');
    script.id = 'dailypulse-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(options.structuredData);
    document.head.appendChild(script);
  }
}
