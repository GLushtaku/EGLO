export const locales = ['mk', 'sq'] as const;
export const defaultLocale = 'mk';

export type Locale = (typeof locales)[number];

export const timeZone = 'Europe/Skopje'; 
