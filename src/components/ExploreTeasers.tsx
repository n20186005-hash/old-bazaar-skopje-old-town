import { useLocale } from 'next-intl';
import { explore, exploreSlugs } from '@/lib/explore';

export default function ExploreTeasers() {
  const locale = useLocale() === 'en' ? 'en' : 'zh';
  const prefix = locale === 'en' ? '/en' : '';
  return <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
    <div className="max-w-6xl mx-auto">
      <p className="uppercase tracking-widest text-sm mb-2" style={{ color: 'var(--accent)' }}>EXPLORE</p>
      <h2 className="text-3xl md:text-4xl font-semibold mb-4">{locale === 'zh' ? '深入探索旧巴扎' : 'Explore the Old Bazaar'}</h2>
      <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>{locale === 'zh' ? '从步行路线、历史建筑到商店与街巷美食，找到适合自己的游览主题。' : 'Choose a walking route, discover heritage buildings or plan a relaxed shopping and food visit.'}</p>
      <div className="grid md:grid-cols-3 gap-5">{exploreSlugs.map(slug => <a key={slug} href={`${prefix}/explore/${slug}`} className="block rounded-xl p-6 transition-transform hover:-translate-y-1" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <h3 className="text-xl font-semibold mb-3">{explore[locale][slug].title}</h3>
        <p className="leading-7 mb-5" style={{ color: 'var(--text-secondary)' }}>{explore[locale][slug].subtitle}</p>
        <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{locale === 'zh' ? '查看完整指南 →' : 'Read the guide →'}</span>
      </a>)}</div>
      <a className="inline-block mt-7 hover:underline" href={`${prefix}/explore`} style={{ color: 'var(--accent)' }}>{locale === 'zh' ? '查看全部专题 →' : 'Browse all guides →'}</a>
    </div>
  </section>;
}
