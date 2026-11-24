import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { routing } from '@/i18n/routing';
import { canonicalMetadata, localizedPath, nearbyPlaces, nearbySlugs, placeDetails } from '@/lib/nearby';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return nearbySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !Object.hasOwn(nearbyPlaces, slug)) notFound();
  const place = placeDetails(slug, locale);
  const title = locale === 'zh' ? `${place.title}参观指南 | 斯科普里旧巴扎周边` : `${place.title} Visitor Guide | Skopje Old Bazaar`;
  const metadata = canonicalMetadata(`/nearby/${slug}`, locale);
  return {
    ...metadata,
    title,
    description: place.subtitle,
    openGraph: { title, description: place.subtitle, url: String(metadata.alternates?.canonical), type: 'website' },
  };
}

export default async function NearbyDetail({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale) || !Object.hasOwn(nearbyPlaces, slug)) notFound();
  setRequestLocale(locale);

  const place = placeDetails(slug, locale);
  const next = placeDetails(place.next, locale);
  const zh = locale === 'zh';
  const details = [
    [zh ? '当地名称' : 'Local name', place.localName],
    [zh ? '位置与入口' : 'Location and approach', place.address],
    [zh ? '景点类型' : 'Type of site', place.kind],
    [zh ? '建议停留' : 'Suggested visit', place.duration],
    [zh ? '开放时间' : 'Opening hours', place.hours],
    [zh ? '门票及费用' : 'Tickets and costs', place.fees],
  ];
  const faqs = [
    place.faq,
    [place.guide.photoQuestion, place.photo],
    [place.guide.observeQuestion, place.guide.observe],
  ];
  return (
    <>
      <Header />
      <main>
        <Hero imageSrc={place.picture?.src} imageAlt={place.picture?.[locale]} mapsLink={place.map}
          place={{title: place.title, subtitle: place.subtitle, hours: place.hours}} />
        <section className="section-padding bg-[var(--bg-primary)]">
          <div className="max-w-4xl mx-auto space-y-5">
            <Link className="text-[var(--accent)] hover:underline" href={localizedPath(locale, '/nearby')}>{zh ? '周边游览' : 'Explore nearby'}</Link>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">{zh ? '探索' + place.title : 'Explore ' + place.title}</h2>
            <p className="text-lg leading-relaxed">{place.guide.approach}</p>
            <h3 className="font-display text-2xl font-semibold">{zh ? '关于' + place.title : 'About ' + place.title}</h3>
            <p>{place.about}</p>
            <div className="rounded-xl p-6 bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
              <h3 className="font-display text-xl font-semibold mb-2">{zh ? '管理与维护' : 'Management and conservation'}</h3>
              <p>{place.management}</p>
            </div>
            <h3 className="font-display text-xl font-semibold">{zh ? '游览建议' : 'Visit advice'}</h3><p>{place.guide.advice}</p>
          </div>
        </section>
        <section className="section-padding bg-[var(--bg-secondary)]">
          <div className="max-w-4xl mx-auto space-y-12">
            <div>
              <h2 className="font-display text-3xl font-semibold mb-5">{zh ? '基础信息' : 'Basic information'}</h2>
              <dl className="divide-y divide-[var(--border-color)] rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">
                {details.slice(0,4).map(([label, value]) => <div key={label} className="grid sm:grid-cols-[10rem_1fr] px-5 py-3"><dt className="font-semibold">{label}</dt><dd>{value}</dd></div>)}
              </dl>
            </div>
            {details.slice(4).map(([label, value]) => <div key={label}><h2 className="font-display text-3xl font-semibold mb-4">{label}</h2><p>{value}</p></div>)}
            <div><h2 className="font-display text-3xl font-semibold mb-4">{zh ? '交通方式' : 'Getting there'}</h2>
              <p>{place.address}</p><p>{place.guide.approach}</p>
            </div>
            <div><h2 className="font-display text-3xl font-semibold mb-5">{zh ? '历史与现场特色' : 'History and features'}</h2>
              <h3 className="font-semibold mb-2">{zh ? '历史沿革' : 'History'}</h3><p>{place.guide.history}</p>
              <h3 className="font-semibold mt-5 mb-2">{zh ? '现场观察' : 'What to look for'}</h3><p>{place.guide.observe}</p>
            </div>
            <div><h2 className="font-display text-3xl font-semibold mb-4">{zh ? '步行路线与参观须知' : 'Walking route and visitor notes'}</h2>
              <ol className="list-decimal ps-6 space-y-2">{place.walk.map(step=><li key={step}>{step.trim()}</li>)}</ol><p className="mt-4">{place.faq[1]}</p>
            </div>
            <div><h2 className="font-display text-3xl font-semibold mb-4">{zh ? '拍摄位置' : 'Photography viewpoints'}</h2><p>{place.photo}</p><p className="mt-3">{place.guide.secondPhoto}</p></div>
            <div><h2 className="font-display text-3xl font-semibold mb-4">{zh ? '住宿区位' : 'Where to stay'}</h2><p>{place.guide.stay}</p></div>
            {place.picture && <div><h2 className="font-display text-3xl font-semibold mb-4">{zh ? '景点实景' : 'Site photograph'}</h2>
              <figure className="rounded-xl overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
                <img className="w-full max-h-[32rem] object-contain" src={place.picture.src} alt={place.picture[locale]} loading="lazy" />
                <figcaption className="px-5 py-3 text-sm">{place.picture[locale]}{place.picture.source && <> · <a className="text-[var(--accent)] hover:underline" href={place.picture.source}>{zh ? '图片来源' : 'Photo source'}</a></>}</figcaption>
              </figure></div>}
            <div><h2 className="font-display text-3xl font-semibold mb-4">{zh ? '游客评价' : 'Visitor reviews'}</h2>
              <a className="text-[var(--accent)] hover:underline" href={place.map}>{zh ? '在 Google 地图查看近期评价' : 'Read recent reviews on Google Maps'} · {place.localName}</a>
            </div>
            <div><h2 className="font-display text-3xl font-semibold mb-4">{zh ? '交通指南' : 'Map and directions'}</h2>
              <p className="mb-3">{place.localName} · {place.address}</p>
              <iframe className="w-full h-72 rounded-xl border border-[var(--border-color)]" src={place.mapEmbed} title={place.title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
              <a className="text-[var(--accent)] hover:underline" href={place.map}>{zh ? '在 Google 地图导航' : 'Open directions in Google Maps'}</a>
            </div>
            <div><h2 className="font-display text-3xl font-semibold mb-5">{zh ? '常见问题' : 'Frequently asked questions'}</h2>
              <div className="space-y-3">{faqs.map(([q, a]) => <details key={q} className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4"><summary className="font-semibold cursor-pointer">{q}</summary><p className="mt-3">{a}</p></details>)}</div>
            </div>
            <div><h2 className="font-display text-3xl font-semibold mb-4">{zh ? '资料来源' : 'Sources'}</h2>
              <ul className="list-disc ps-5 space-y-2 text-[var(--accent)]">{place.references.map(({href,label})=><li key={href}><a className="hover:underline" href={href}>{label}</a></li>)}</ul>
            </div>
            <div><h2 className="font-display text-3xl font-semibold mb-4">{zh ? '下一站' : 'Continue exploring'}</h2>
              <Link className="text-[var(--accent)] hover:underline" href={localizedPath(locale, '/nearby/' + place.next)}>{next.title}</Link>
              <span aria-hidden="true"> · </span><Link className="text-[var(--accent)] hover:underline" href={localizedPath(locale, '/nearby')}>{zh ? '全部周边景点' : 'All nearby places'}</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
