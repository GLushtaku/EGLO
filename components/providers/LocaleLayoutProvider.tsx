'use client';

import { NextIntlClientProvider } from 'next-intl';
import '../../i18n';
import { timeZone } from '../../i18n';

interface Props {
  locale: string;
  children: React.ReactNode;
  messages: Record<string, unknown>;
}

export default function LocaleLayoutProvider({ locale, children, messages }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}
