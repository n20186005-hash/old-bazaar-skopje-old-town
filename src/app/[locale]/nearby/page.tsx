import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nearby from '@/components/Nearby';
import {nearbyLabels} from '@/data/nearby';
import {isLocale, localePath, pageMetadata} from '@/lib/site';

type Props = {params: Promise<{locale: string}>};
export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, '/nearby', `${nearbyLabels[locale].title} | Skopje Old Bazaar`, nearbyLabels[locale].intro);
}
export default async function NearbyPage({params}: Props) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const labels = nearbyLabels[locale];
  return <><Header solid /><main className="pt-28">
    <div className="max-w-6xl mx-auto px-6 pt-6">
      <a className="nearby-link" href={localePath(locale)}>{labels.home} →</a>
      <h1 className="font-display text-4xl sm:text-5xl font-bold mt-8 mb-5">{labels.title}</h1>
      <p className="text-lg max-w-3xl leading-relaxed" style={{color: 'var(--text-secondary)'}}>{labels.intro}</p>
    </div>
    <Nearby full />
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <h2 className="font-display text-2xl font-semibold mb-4">{labels.route}</h2>
      <p className="max-w-3xl leading-relaxed" style={{color: 'var(--text-secondary)'}}>{labels.routeText}</p>
    </section>
  </main><Footer showDisclaimer={false} /></>;
}
