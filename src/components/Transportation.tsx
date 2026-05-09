'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function Transportation() {
  const t = useTranslations('transportation');
  const messages = useMessages() as any;
  const methods = (messages?.transportation?.methods || []) as Array<{
    type: string;
    description: string;
  }>;

  if (methods.length === 0) return null;

  return (
    <section id="transportation" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {methods.map((method, i) => (
            <div
              key={i}
              className="rounded-xl p-6 transition-shadow hover:shadow-md"
              style={{
                background: 'var(--card-bg)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--border-color)',
              }}
            >
              <h3
                className="font-display text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {method.type}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
                dangerouslySetInnerHTML={{ __html: method.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
