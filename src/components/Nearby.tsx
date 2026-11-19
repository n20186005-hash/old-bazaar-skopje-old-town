import {useLocale} from 'next-intl';
import {nearbyGuides, nearbyLabels} from '@/data/nearby';
import {localePath} from '@/lib/site';
import type {Locale} from '@/i18n/routing';

export default function Nearby({full = false}: {full?: boolean}) {
  const locale = useLocale() as Locale;
  const labels = nearbyLabels[locale];
  return <section id="nearby" className="section-padding">
    <div className="max-w-6xl mx-auto">
      {!full && <><h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3">{labels.title}</h2><p className="max-w-3xl leading-relaxed mb-8" style={{color: 'var(--text-secondary)'}}>{labels.intro}</p></>}
      <div className="grid md:grid-cols-3 gap-5">
        {nearbyGuides.map((guide, index) => <article key={guide.slug} className="nearby-card">
          <span className="nearby-number" aria-hidden="true">0{index + 1}</span>
          <h3 className="font-display text-2xl font-semibold mb-3">{guide.copy[locale].name}</h3>
          <p className="text-sm leading-relaxed mb-6" style={{color: 'var(--text-secondary)'}}>{guide.copy[locale].summary}</p>
          <a className="nearby-link" href={localePath(locale, `/nearby/${guide.slug}`)}>{labels.read} →<span className="sr-only"> · {guide.copy[locale].name}</span></a>
        </article>)}
      </div>
      {!full && <a className="nearby-link inline-block mt-8" href={localePath(locale, '/nearby')}>{labels.all} →</a>}
    </div>
  </section>;
}
