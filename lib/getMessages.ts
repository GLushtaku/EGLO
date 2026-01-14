import { Locale } from '../i18n';

export async function getMessages(locale: Locale) {
  try {
    return (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    return (await import(`../messages/mk.json`)).default;
  }
} 