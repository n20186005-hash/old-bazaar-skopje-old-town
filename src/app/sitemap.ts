import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { localizedPath, nearbySlugs, siteOrigin } from '@/lib/nearby';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/nearby', ...nearbySlugs.map((slug) => `/nearby/${slug}`), '/privacy-policy', '/terms-of-service', '/cookie-settings'];
  return paths.flatMap((path) => {
    const zh = siteOrigin + localizedPath('zh', path);
    const en = siteOrigin + localizedPath('en', path);
    return routing.locales.map((locale) => ({
      url: locale === 'zh' ? zh : en,
      alternates: { languages: { zh, en, 'x-default': zh } },
    }));
  });
}
