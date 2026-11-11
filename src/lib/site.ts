import type {Metadata} from 'next';
import {routing, type Locale} from '@/i18n/routing';

export const SITE_URL = 'https://skopjeoldbazaar.com';
export function isLocale(value: string): value is Locale {
  return routing.locales.includes(value as Locale);
}
export function localePath(locale: string, path = '') {
  return `${locale === 'en' ? '/en' : ''}${path}` || '/';
}
export function pageMetadata(locale: string, path: string, title: string, description: string): Metadata {
  const url = SITE_URL + localePath(locale, path);
  return {
    metadataBase: new URL(SITE_URL), title, description,
    alternates: {canonical: url, languages: {zh: SITE_URL + localePath('zh', path), en: SITE_URL + localePath('en', path), 'x-default': SITE_URL + localePath('zh', path)}},
    openGraph: {title, description, url, siteName: 'Skopje Old Bazaar', locale: locale === 'zh' ? 'zh_CN' : 'en_US', type: 'website'},
  };
}
