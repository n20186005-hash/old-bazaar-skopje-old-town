import Link from 'next/link';
import type { Locale } from '@/i18n/routing';
import { localizedPath, nearbySlugs, nearbyPlaces } from '@/lib/nearby';

export default function NearbyPlaces({ locale, preview = false }: { locale: Locale; preview?: boolean }) {
  const zh = locale === 'zh';
  const slugs = preview ? nearbySlugs.slice(0, 6) : nearbySlugs;
  return (
    <section id="nearby" className="section-padding bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        {preview ? (
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-5">{zh ? '周边游览' : 'Explore nearby'}</h2>
        ) : (
          <h1 className="font-display text-4xl sm:text-6xl font-semibold mb-5">{zh ? '斯科普里旧巴扎周边游览' : 'Places to visit near Skopje Old Bazaar'}</h1>
        )}
        <p className="mb-8 text-lg text-[var(--text-secondary)]">{zh ? '从瓦尔达尔河边的石桥出发，可去旧巴扎的古浴场、驿站和山上要塞，也可沿河前往市中心博物馆。' : 'Start at Stone Bridge for the former baths, merchants’ inns and hilltop fortress, or follow the Vardar to the city’s museums.'}</p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {slugs.map((slug) => {
            const place = nearbyPlaces[slug][locale];
            return (
              <li key={slug} className="rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
                <Link href={localizedPath(locale, `/nearby/${slug}`)} className="block rounded-xl p-5 h-full hover:border-[var(--accent)] group">
                  <span className="block font-display text-xl font-semibold mb-2 group-hover:underline">{place.title}</span>
                  <span className="block text-sm text-[var(--text-secondary)]">{place.subtitle}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        {preview && (
          <Link href={localizedPath(locale, '/nearby')} className="mt-6 inline-block text-[var(--accent)] font-semibold hover:underline">
            {zh ? '查看全部周边景点' : 'See all nearby places'}
          </Link>
        )}
      </div>
    </section>
  );
}
