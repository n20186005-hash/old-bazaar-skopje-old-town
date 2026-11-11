import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import {notFound} from 'next/navigation';
import {isLocale, pageMetadata} from '@/lib/site';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return pageMetadata(locale, '/cookie-settings', `${messages.cookieSettings.title} | Skopje Old Bazaar`, messages.meta.description);
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
