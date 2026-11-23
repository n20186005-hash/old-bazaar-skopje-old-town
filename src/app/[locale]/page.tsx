import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import NearbyPlaces from '@/components/NearbyPlaces';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import InfoSection from '@/components/InfoSection';
import Gallery from '@/components/Gallery';
import Transportation from '@/components/Transportation';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import Accommodation from '@/components/Accommodation';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <NearbyPlaces locale={locale} preview />
        <InfoSection />
        <Transportation />
        <Gallery />
        <Accommodation />
        <Reviews />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
