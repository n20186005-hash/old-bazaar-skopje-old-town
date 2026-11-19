import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { explore, exploreSlugs } from '@/lib/explore';

type Params = Promise<{ locale: 'zh' | 'en' }>;
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const url = `https://www.skopjeoldbazaar.com${locale === 'en' ? '/en' : ''}/explore`;
  return { title: locale === 'zh' ? '斯科普里旧巴扎周边探索与专题指南' : 'Explore Skopje Old Bazaar | Walking, Heritage and Food',
    description: locale === 'zh' ? '了解旧巴扎步行路线、奥斯曼历史建筑、购物与美食。' : 'Plan an Old Bazaar walking route, discover Ottoman-era heritage and explore local shopping and food.',
    alternates: { canonical: url, languages: { zh: 'https://www.skopjeoldbazaar.com/explore', en: 'https://www.skopjeoldbazaar.com/en/explore' } } };
}
export default async function ExploreIndex({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === 'en' ? '/en' : '';
  return <><Header/><main className="pt-28 pb-24 px-4 sm:px-6 max-w-5xl mx-auto">
    <a href={prefix || '/'} className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>{locale === 'zh' ? '← 返回首页' : '← Back to home'}</a>
    <h1 className="text-4xl md:text-5xl font-semibold mt-6 mb-4">{locale === 'zh' ? '探索斯科普里旧巴扎' : 'Explore Skopje Old Bazaar'}</h1>
    <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>{locale === 'zh' ? '用步行路线、建筑专题与购物美食指南规划老城之行。' : 'Plan your visit with walking, heritage, shopping and food guides.'}</p>
    <div className="grid md:grid-cols-2 gap-5">{exploreSlugs.map(slug => <a key={slug} href={`${prefix}/explore/${slug}`} className="rounded-xl p-7 hover:underline" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      <h2 className="text-2xl font-semibold mb-3">{explore[locale][slug].title}</h2><p className="leading-7 mb-4" style={{ color: 'var(--text-secondary)' }}>{explore[locale][slug].subtitle}</p><span style={{ color: 'var(--accent)' }}>{locale === 'zh' ? '阅读专题 →' : 'Read guide →'}</span>
    </a>)}</div>
  </main><Footer/></>;
}
