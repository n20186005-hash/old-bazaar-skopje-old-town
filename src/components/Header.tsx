'use client';

import { useTranslations, useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function Header({ solid = false }: { solid?: boolean }) {
  const t = useTranslations('header');
  const heroT = useTranslations('hero');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const opaque = solid || scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const homePath = locale === 'zh' ? '/' : `/${locale}`;
  const links = [
    ...(['transportation', 'gallery', 'reviews', 'map'] as const).map((section) => ({
      href: `${homePath}#${section}`,
      label: t(section),
    })),
    { href: `${locale === 'zh' ? '' : '/en'}/nearby`, label: locale === 'zh' ? '周边游览' : 'Explore nearby' },
  ];


  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: opaque ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: opaque ? '1px solid var(--border-color)' : 'none',
        backdropFilter: opaque ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href={homePath} className="font-display text-lg font-semibold tracking-tight" style={{ color: opaque ? 'var(--text-primary)' : '#fff' }}>
          {heroT('title')}
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className="text-sm font-medium transition-colors hover:underline"
              style={{ color: opaque ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}>
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
          <button
            type="button"
            className="lg:hidden p-2 rounded-md"
            style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={locale === 'zh' ? '导航菜单' : 'Navigation menu'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="lg:hidden max-w-6xl mx-auto px-4 sm:px-6 py-3 grid gap-1 bg-[var(--card-bg)] border-y border-[var(--border-color)]">
          {links.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-md p-2 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
