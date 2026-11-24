import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
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
  const approach = place.walk[0].trim().replace(/[.。]$/, '');
  const faqs = [
    place.faq,
    [zh ? `如何找到${place.title}？` : `How do I find ${place.title}?`, zh ? `${place.address}。${approach}。` : `${place.address}. ${approach}.`],
    [zh ? `在${place.title}从哪里取景？` : `Where can I take a photo at ${place.title}?`, place.photo],
  ];

  return (
    <>
      <Header solid />
      <main className="pt-16">
        <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
          <div className="max-w-6xl mx-auto">
            <Link className="text-sm text-[var(--accent)] hover:underline" href={localizedPath(locale, '/nearby')}>
              {zh ? '周边游览' : 'Explore nearby'}
            </Link>
            <h1 className="font-display text-4xl sm:text-6xl font-bold mt-5 mb-4">{place.title}</h1>
            <p className="text-xl text-[var(--text-secondary)] mb-6">{place.subtitle}</p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="rounded-full px-4 py-2 text-sm bg-[var(--card-bg)]">{place.hours}</span>
              <a href={place.map} className="text-[var(--accent)] hover:underline">{zh ? '打开地图及查看评价' : 'Open map and reviews'}</a>
            </div>
          </div>
        </section>
        <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl font-semibold">{zh ? `关于${place.title}` : `About ${place.title}`}</h2>
            <div className="rounded-xl p-6 sm:p-8 bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
              <h3 className="text-xl font-semibold mb-3">{zh ? '管理与维护' : 'Management and conservation'}</h3>
              <p className="leading-relaxed">{place.management}</p>
            </div>
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">{place.about}</p>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">{zh ? '历史沿革' : 'History'}</h3>
              <p className="leading-relaxed text-[var(--text-secondary)]">{place.guide.history}</p>
            </div>
          </div>
        </section>
        <section className="section-padding bg-[var(--bg-secondary)]">
          <div className="max-w-4xl mx-auto space-y-10">
            <div>
              <h2 className="text-3xl font-semibold mb-5">{zh ? '基本资料与游览安排' : 'Visitor information'}</h2>
              <dl className="divide-y divide-[var(--border-color)] rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">
                {details.map(([label, value]) => (
                  <div key={label} className="grid sm:grid-cols-[10rem_1fr] px-5 py-3">
                    <dt className="font-semibold">{label}</dt><dd className="text-[var(--text-secondary)]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4">{zh ? '到达与现场路线' : 'Getting there and what to see'}</h2>
              <p className="mb-4 leading-relaxed text-[var(--text-secondary)]">{place.guide.approach}</p>
              <ol className="list-decimal pl-5 space-y-2 text-[var(--text-secondary)]">
                {place.walk.map((step) => <li key={step}>{step.trim()}</li>)}
              </ol>
              <h3 className="text-xl font-semibold mt-6 mb-3">{zh ? '现场观察重点' : 'What to look for'}</h3>
              <p className="leading-relaxed text-[var(--text-secondary)]">{place.guide.observe}</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4">{zh ? '拍摄位置' : 'Where to take photos'}</h2>
              <p className="text-[var(--text-secondary)]">{place.photo}</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4">{zh ? '住宿区位' : 'Where to stay'}</h2>
              <p className="text-[var(--text-secondary)]">{zh
                ? '如以旧巴扎步行为主，可在北岸靠近市场的街区住宿。若需要从马其顿广场出发或当晚返回市中心，选择南岸步行街附近，并在出发前确认具体景点的入口。'
                : 'Stay on the north bank for an early bazaar walk. Choose the Macedonia Street area on the south bank if you plan to start at Macedonia Square or return to the city center at night. Save this venue’s entrance before leaving.'}</p>
            </div>
            {place.picture && (
              <div>
                <h2 className="text-3xl font-semibold mb-4">{zh ? '景点实景' : 'Site photograph'}</h2>
                <figure className="rounded-xl overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
                  <img className="w-full max-h-[32rem] object-contain" src={place.picture.src} alt={place.picture[locale]} loading="lazy" />
                  <figcaption className="px-5 py-3 text-sm text-[var(--text-secondary)]">
                    {place.picture[locale]}
                    {place.picture.source && (
                      <> · <a className="text-[var(--accent)] hover:underline" href={place.picture.source}>{zh ? '图片来源' : 'Photo source'}</a></>
                    )}
                  </figcaption>
                </figure>
              </div>
            )}
            <div>
              <h2 className="text-3xl font-semibold mb-5">{zh ? '常见问题' : 'Frequently asked questions'}</h2>
              <div className="space-y-3">
                {faqs.map(([q, a]) => (
                  <details key={q} className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
                    <summary className="font-semibold cursor-pointer">{q}</summary>
                    <p className="mt-3 text-[var(--text-secondary)]">{a}</p>
                  </details>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4">{zh ? '地图与游客评价' : 'Map and visitor reviews'}</h2>
              <iframe className="w-full h-72 rounded-xl border border-[var(--border-color)]" src={place.mapEmbed} title={place.title} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
              <p className="mt-4"><a className="text-[var(--accent)] hover:underline" href={place.map}>{zh ? '在 Google 地图导航及查看最新评价' : 'Find directions and recent reviews on Google Maps'}</a></p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4">{zh ? '资料来源' : 'Sources'}</h2>
              <ul className="list-disc pl-5 space-y-2 text-[var(--accent)]">
                {place.references.map(({ href, label }) => (
                  <li key={href}><a className="hover:underline" href={href}>{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-semibold mb-4">{zh ? '下一站' : 'Continue exploring'}</h2>
              <Link className="text-[var(--accent)] hover:underline" href={localizedPath(locale, `/nearby/${place.next}`)}>{next.title}</Link>
              <span aria-hidden="true"> · </span>
              <Link className="text-[var(--accent)] hover:underline" href={localizedPath(locale, '/nearby')}>{zh ? '全部周边景点' : 'All nearby places'}</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
