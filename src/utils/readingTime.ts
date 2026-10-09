/**
 * Calculates estimated reading time based on total word count.
 * Standard average reading speed: 200 words per minute.
 */
export function calculateReadingTime(paragraphs: string[] = []): string {
  if (!paragraphs || paragraphs.length === 0) return '3 min read';
  const totalWords = paragraphs
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(totalWords / 200));
  return `${minutes} min read`;
}
