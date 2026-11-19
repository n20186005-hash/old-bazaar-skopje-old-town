import type { MetadataRoute } from 'next';
import { exploreSlugs } from '@/lib/explore';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.skopjeoldbazaar.com';
  const entries = ['', '/explore', ...exploreSlugs.map(s => `/explore/${s}`)];
  return entries.flatMap(path => [
    { url: `${base}${path || '/'}`, changeFrequency: 'monthly' as const, priority: path ? 0.7 : 1, alternates: { languages: { zh: `${base}${path || '/'}`, en: `${base}/en${path}` } } },
    { url: `${base}/en${path}`, changeFrequency: 'monthly' as const, priority: path ? 0.7 : 1, alternates: { languages: { zh: `${base}${path || '/'}`, en: `${base}/en${path}` } } },
  ]);
}
