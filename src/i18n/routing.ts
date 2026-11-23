import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localeDetection: false,
  localePrefix: {
    mode: 'as-needed',
  },
  pathnames: {
    '/': '/',
    '/danube-park-novi-sad': '/danube-park-novi-sad',
    '/mont-des-arts': '/mont-des-arts',
    '/nearby': '/nearby',
    '/nearby/[slug]': '/nearby/[slug]',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
  },
});

export type Locale = (typeof routing.locales)[number];
