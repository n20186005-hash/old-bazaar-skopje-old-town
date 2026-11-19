import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { explore, exploreSlugs, mapLink, officialSources, type ExploreSlug } from '@/lib/explore';

type Params = Promise<{ locale: string; slug: string }>;
const base = 'https://www.skopjeoldbazaar.com';
const home = (locale: string) => locale === 'zh' ? '/' : '/en';
const articleUrl = (locale: string, slug: string) => `${base}${home(locale) === '/' ? '' : '/en'}/explore/${slug}`;

export function generateStaticParams() {
  return ['zh', 'en'].flatMap(locale => exploreSlugs.map(slug => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  if ((locale !== 'zh' && locale !== 'en') || !exploreSlugs.includes(slug as ExploreSlug)) return {};
  const item = explore[locale][slug as ExploreSlug];
  const canonical = articleUrl(locale, slug);
  return {
    title: `${item.title} | Skopje Old Bazaar`, description: item.intro,
    alternates: { canonical, languages: { zh: articleUrl('zh', slug), en: articleUrl('en', slug), 'x-default': articleUrl('en', slug) } },
    openGraph: { title: item.title, description: item.intro, url: canonical, type: 'article' },
  };
}

export default async function ExplorePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if ((locale !== 'zh' && locale !== 'en') || !exploreSlugs.includes(slug as ExploreSlug)) notFound();
  setRequestLocale(locale);
  const item = explore[locale][slug as ExploreSlug];
  const zh = locale === 'zh';
  const permalink = articleUrl(locale, slug);
  const faqs = item.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }));
  const data = {
    '@context': 'https://schema.org', '@graph': [
      { '@type': 'Article', headline: item.title, description: item.intro, inLanguage: locale, mainEntityOfPage: permalink, author: { '@type': 'Organization', name: 'Skopje Old Bazaar Travel Guide' } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: zh ? '首页' : 'Home', item: `${base}${home(locale)}` },
        { '@type': 'ListItem', position: 2, name: zh ? '周边探索' : 'Explore', item: `${base}${home(locale) === '/' ? '' : '/en'}/explore` },
        { '@type': 'ListItem', position: 3, name: item.title, item: permalink },
      ] },
      { '@type': 'FAQPage', mainEntity: faqs },
    ],
  };
  return <>
    <Header />
    <main className="pt-24 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <nav className="text-sm mb-8" style={{ color: 'var(--text-muted)' }} aria-label="Breadcrumb">
        <a className="hover:underline" href={home(locale)}>{zh ? '首页' : 'Home'}</a> / <a className="hover:underline" href={`${home(locale) === '/' ? '' : '/en'}/explore`}>{zh ? '周边探索' : 'Explore'}</a> / {item.title}
      </nav>
      <div className="mb-10">
        <p className="text-sm uppercase tracking-widest mb-3" style={{ color: 'var(--accent)' }}>SKOPJE OLD BAZAAR · EXPLORE</p>
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-4">{item.title}</h1>
        <p className="text-xl mb-4" style={{ color: 'var(--text-secondary)' }}>{item.subtitle}</p>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>{item.duration} · {zh ? '斯科普里，北马其顿' : 'Skopje, North Macedonia'}</p>
        <a className="inline-flex rounded-lg px-5 py-3 text-white font-medium" style={{ background: 'var(--accent)' }} href={mapLink('Old Bazaar')} target="_blank" rel="noopener noreferrer">{zh ? '在 Google 地图查看旧巴扎 ↗' : 'Open Old Bazaar on Google Maps ↗'}</a>
      </div>
      <section className="rounded-2xl p-6 md:p-8 mb-12" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <h2 className="text-2xl font-semibold mb-4">{zh ? '探索指南' : 'Explore the district'}</h2>
        <p className="leading-8" style={{ color: 'var(--text-secondary)' }}>{item.intro}</p>
        <h3 className="text-lg font-semibold mt-6 mb-2">{zh ? '游览建议' : 'Visitor advice'}</h3>
        <ul className="list-disc pl-5 space-y-2" style={{ color: 'var(--text-secondary)' }}>{item.tips.map(t => <li key={t}>{t}</li>)}</ul>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">{zh ? '关于这条主题路线' : 'About this themed visit'}</h2>
        <p className="leading-8 mb-6" style={{ color: 'var(--text-secondary)' }}>{zh ? '旧巴扎是受保护的历史商贸街区，街道与各建筑由不同主体管理；博物馆、商铺、宗教建筑的参观规则并不相同。' : 'The Old Bazaar is a protected historic commercial district. Streets, cultural venues, shops and places of worship have different operators and visiting rules.'}</p>
        <h2 className="text-2xl font-semibold mb-4">{zh ? '基本信息' : 'Essential information'}</h2>
        <dl className="grid sm:grid-cols-2 gap-4 rounded-xl p-6" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>{zh ? '所在地' : 'Location'}</dt><dd>Old Bazaar (Stara Čaršija), Skopje, North Macedonia</dd></div>
          <div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>{zh ? '建议时长' : 'Suggested duration'}</dt><dd>{item.duration}</dd></div>
          <div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>{zh ? '开放与费用' : 'Access and fees'}</dt><dd>{zh ? '街道为开放街区；建筑内部开放时间及收费分别查询' : 'Open streets; venue hours and admission vary'}</dd></div>
          <div><dt className="text-sm" style={{ color: 'var(--text-muted)' }}>{zh ? '交通' : 'Transport'}</dt><dd>{zh ? '从马其顿广场经石桥步行进入' : 'Walk across Stone Bridge from Macedonia Square'}</dd></div>
        </dl>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">{zh ? '历史、建筑与体验重点' : 'History, architecture and experiences'}</h2>
        <div className="space-y-8">{item.sections.map(s => <article key={s.heading}>
          <h3 className="text-xl font-semibold mb-3">{s.heading}</h3>
          {s.paragraphs.map(p => <p key={p} className="leading-8 mb-3" style={{ color: 'var(--text-secondary)' }}>{p}</p>)}
        </article>)}</div>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">{zh ? '地点与步行路线' : 'Stops and walking route'}</h2>
        <p className="mb-6" style={{ color: 'var(--text-muted)' }}>{zh ? '每个地点使用独立 Google Maps 搜索定位，出发前请确认入口与开放情况。' : 'Each stop opens its own Google Maps search. Check the entrance and current access before visiting.'}</p>
        <ol className="space-y-4">{item.stops.map((stop, i) => <li key={stop.name} className="flex gap-4 rounded-xl p-5" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <span className="font-semibold text-xl" style={{ color: 'var(--accent)' }}>{String(i + 1).padStart(2, '0')}</span>
          <div><h3 className="font-semibold text-lg mb-1">{stop.name}</h3><p className="mb-2" style={{ color: 'var(--text-secondary)' }}>{stop.description}</p>
          <a href={mapLink(stop.query)} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{zh ? '查看专属地图 ↗' : 'View individual map ↗'}</a></div>
        </li>)}</ol>
      </section>
      <section className="mb-12"><h2 className="text-2xl font-semibold mb-6">{zh ? '常见问题' : 'Frequently asked questions'}</h2>
        <div className="space-y-5">{item.faq.map(f => <div key={f.q}><h3 className="font-semibold text-lg mb-2">{f.q}</h3><p className="leading-7" style={{ color: 'var(--text-secondary)' }}>{f.a}</p></div>)}</div>
      </section>
      <section className="mb-12"><h2 className="text-2xl font-semibold mb-4">{zh ? '资料来源' : 'Sources'}</h2>
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{zh ? '历史背景参考以下公开旅游与政府资料；动态开放、展览及交通信息以各机构最新公告和现场核实为准。资料核对：2026 年 11 月。' : 'Historical context checked against the sources below. Verify dynamic access, exhibitions and transport directly with venues. Sources checked: November 2026.'}</p>
        <ul className="space-y-2">{officialSources.map(s => <li key={s.url}><a href={s.url} className="hover:underline" style={{ color: 'var(--accent)' }} target="_blank" rel="noopener noreferrer">{s.label} ↗</a></li>)}</ul>
      </section>
      <section><h2 className="text-2xl font-semibold mb-5">{zh ? '继续探索旧巴扎' : 'Explore more of the Old Bazaar'}</h2>
        <div className="grid sm:grid-cols-3 gap-4">{exploreSlugs.filter(s => s !== slug).map(s => <a key={s} className="rounded-xl p-5 hover:underline" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }} href={`${home(locale) === '/' ? '' : '/en'}/explore/${s}`}><h3 className="font-semibold mb-2">{explore[locale][s].title}</h3><p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{explore[locale][s].subtitle}</p></a>)}</div>
      </section>
    </main>
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
  </>;
}
