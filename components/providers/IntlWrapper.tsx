'use client';

import { NextIntlClientProvider } from 'next-intl';

type Props = {
  locale: string;
  messages: Record<string, string>;
  children: React.ReactNode;
};

export default function IntlWrapper({ locale, messages, children }: Props) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="UTC"
    >
      {children}
    </NextIntlClientProvider>
  );
}
