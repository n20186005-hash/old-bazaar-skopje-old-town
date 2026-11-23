import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { canonicalMetadata } from '@/lib/nearby';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return canonicalMetadata('/cookie-settings', locale === 'en' ? 'en' : 'zh');
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
