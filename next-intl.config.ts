// next-intl.config.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  locale: (locale ?? 'mk') as string,
  messages: (await import(`./messages/${locale ?? 'mk'}.json`)).default
}));
