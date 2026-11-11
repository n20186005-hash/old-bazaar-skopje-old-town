import {notFound} from 'next/navigation';
import {setRequestLocale} from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {nearbyGuides, nearbyLabels} from '@/data/nearby';
import {isLocale, localePath, pageMetadata, SITE_URL} from '@/lib/site';

function ExternalLinkIcon() {
  return <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline-block align-[-0.125em]">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>;
}

type Props = {params: Promise<{locale: string; slug: string}>};
export function generateStaticParams() {return nearbyGuides.map(({slug}) => ({slug}));}
export async function generateMetadata({params}: Props) {
  const {locale, slug} = await params;
  const guide = nearbyGuides.find(item => item.slug === slug);
  if (!isLocale(locale) || !guide) notFound();
  return pageMetadata(locale, `/nearby/${slug}`, `${guide.copy[locale].name} | Skopje Old Bazaar`, guide.copy[locale].summary);
}
export default async function GuidePage({params}: Props) {
  const {locale, slug} = await params;
  const guide = nearbyGuides.find(item => item.slug === slug);
  if (!isLocale(locale) || !guide) notFound();
  setRequestLocale(locale);
  const copy = guide.copy[locale], labels = nearbyLabels[locale];
  const url = SITE_URL + localePath(locale, `/nearby/${slug}`);
  const schema = {'@context': 'https://schema.org', '@graph': [
    {'@type': 'TouristAttraction', name: copy.name, description: copy.summary, url},
    {'@type': 'BreadcrumbList', itemListElement: [
      {name: labels.home, item: SITE_URL + localePath(locale)},
      {name: labels.all, item: SITE_URL + localePath(locale, '/nearby')},
      {name: copy.name, item: url},
    ].map((item, index) => ({'@type': 'ListItem', position: index + 1, ...item}))},
  ]};
  return <><Header solid /><main className="pt-24">
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replace(/</g, '\\u003c')}} />
    <section className="nearby-intro"><div className="max-w-6xl mx-auto">
      <nav aria-label={locale === 'zh' ? '面包屑导航' : 'Breadcrumb'} className="flex flex-wrap gap-x-3 gap-y-2 text-sm mb-8">
        <a className="nearby-link" href={localePath(locale)}>{labels.home}</a><span aria-hidden="true">/</span>
        <a className="nearby-link" href={localePath(locale, '/nearby')}>{labels.all}</a>
      </nav>
      <p className="text-sm font-medium mb-3" style={{color: 'var(--accent)'}}>{copy.subtitle}</p>
      <h1 className="font-display text-4xl sm:text-6xl font-bold mb-6">{copy.name}</h1>
      <p className="text-lg max-w-3xl leading-relaxed" style={{color: 'var(--text-secondary)'}}>{copy.summary}</p>
    </div></section>
    <div className="max-w-6xl mx-auto px-6 py-12 grid lg:grid-cols-[minmax(0,1fr)_300px] gap-12 items-start">
      <article className="min-w-0 space-y-12">
        {copy.sections.map(section => <section key={section.title}>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-5">{section.title}</h2>
          <div className="space-y-4 leading-relaxed" style={{color: 'var(--text-secondary)'}}>{section.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
        </section>)}
        <section><h2 className="font-display text-2xl font-semibold mb-5">{labels.faq}</h2>
          {copy.faq.map(item => <details key={item.q} className="nearby-faq"><summary className="font-medium cursor-pointer">{item.q}</summary><p className="pt-4 leading-relaxed" style={{color: 'var(--text-secondary)'}}>{item.a}</p></details>)}
        </section>
      </article>
      <aside className="nearby-aside">
        <h2 className="font-display text-xl font-semibold mb-4">{labels.location}</h2>
        <p className="text-sm leading-relaxed mb-5" style={{color: 'var(--text-secondary)'}}>{copy.location}</p>
        <a className="nearby-link text-sm" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(guide.mapQuery)}`} target="_blank" rel="noopener noreferrer">{labels.maps}{' '}<ExternalLinkIcon /></a>
        <h2 className="font-display text-xl font-semibold mt-8 mb-4">{labels.tips}</h2>
        <ul className="list-disc pl-5 space-y-3 text-sm leading-relaxed" style={{color: 'var(--text-secondary)'}}>{copy.tips.map(tip => <li key={tip}>{tip}</li>)}</ul>
      </aside>
    </div>
    <section className="max-w-6xl mx-auto px-6 pb-14"><div className="nearby-sources">
      <h2 className="font-display text-2xl font-semibold mb-4">{labels.sources}</h2>
      <p className="text-sm mb-5 leading-relaxed" style={{color: 'var(--text-secondary)'}}>{labels.note}</p>
      <ul className="space-y-3">{guide.sources.map(source => <li key={source.url}><a className="nearby-link break-words" href={source.url} target="_blank" rel="noopener noreferrer">{source[locale]}{' '}<ExternalLinkIcon /></a></li>)}</ul>
    </div></section>
    <section className="max-w-6xl mx-auto px-6 pb-20"><h2 className="font-display text-2xl font-semibold mb-5">{labels.related}</h2>
      <div className="flex flex-wrap gap-4">{nearbyGuides.filter(item => item.slug !== slug).map(item => <a className="nearby-related" key={item.slug} href={localePath(locale, `/nearby/${item.slug}`)}>{item.copy[locale].name} →</a>)}</div>
    </section>
  </main><Footer showDisclaimer={false} /></>;
}
