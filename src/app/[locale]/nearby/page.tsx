import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NearbyPlaces from '@/components/NearbyPlaces';
import { routing } from '@/i18n/routing';
import { canonicalMetadata } from '@/lib/nearby';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const zh = locale === 'zh';
  return {
    ...canonicalMetadata('/nearby', locale),
    title: zh ? '斯科普里旧巴扎周边景点与参观指南' : 'Places near Skopje Old Bazaar | Visitor Guides',
    description: zh ? '查阅石桥、卡莱要塞、古浴场与周边博物馆的入口、参观路线和开放安排。' : 'Find the entrances, visiting arrangements and walking routes for Stone Bridge, Kale Fortress, historic baths and surrounding museums.',
  };
}

export default async function NearbyPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return (
    <>
      <Header solid />
      <main className="pt-16"><NearbyPlaces locale={locale} /></main>
      <Footer />
    </>
  );
}
