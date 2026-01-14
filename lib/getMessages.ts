import { Locale, locales } from '../i18n';

export async function getMessages(locale: Locale) {
  // Validate locale first
  if (!locales.includes(locale)) {
    throw new Error(`Invalid locale: ${locale}`);
  }

  try {
    return (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}:`, error);
    // Only fallback to default locale if it's different
    if (locale !== 'mk') {
      return (await import(`../messages/mk.json`)).default;
    }
    throw error;
  }
} 