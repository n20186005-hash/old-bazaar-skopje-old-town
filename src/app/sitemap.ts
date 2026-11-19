import type {MetadataRoute} from 'next';
import {nearbyGuides} from '@/data/nearby';
import {routing} from '@/i18n/routing';
import {SITE_URL, localePath} from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/nearby', ...nearbyGuides.map(guide => `/nearby/${guide.slug}`), '/privacy-policy', '/terms-of-service', '/cookie-settings'];
  return paths.flatMap(path => routing.locales.map(locale => ({
    url: SITE_URL + localePath(locale, path),
    alternates: {languages: {zh: SITE_URL + localePath('zh', path), en: SITE_URL + localePath('en', path), 'x-default': SITE_URL + localePath('zh', path)}},
  })));
}
