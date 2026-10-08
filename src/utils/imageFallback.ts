export const FALLBACK_NEWS_IMAGE = 
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500' width='800' height='500'%3E%3Crect width='800' height='500' fill='%23f5f5f5'/%3E%3Crect x='340' y='190' width='120' height='70' rx='6' fill='%23b91c1c'/%3E%3Ctext x='400' y='232' fill='%23ffffff' font-family='system-ui, -apple-system, sans-serif' font-weight='900' font-size='15' text-anchor='middle' letter-spacing='1'%3EDAILYPULSE%3C/text%3E%3Ctext x='400' y='290' fill='%23737373' font-family='system-ui, -apple-system, sans-serif' font-size='13' text-anchor='middle'%3EVerified News Coverage%3C/text%3E%3C/svg%3E";

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  if (target.src !== FALLBACK_NEWS_IMAGE) {
    target.src = FALLBACK_NEWS_IMAGE;
  }
};
