'use client'
import Link from "next/link";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function WarrantyPage() {
  const t = useTranslations('warranty');
  const params = useParams();
  const locale = params.locale as string;

  const warrantyCards = [
    {
      title: t('cards.nonEuCh.title'),
      icon: (
        <svg className="w-14 h-14 text-teal-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" strokeDasharray="4 2" /><path d="M24 14v10l7 7" strokeLinecap="round" /></svg>
      ),
      href: "/NonEUandCH",
    },
    {
      title: t('cards.professional.title'),
      icon: (
        <svg className="w-14 h-14 text-teal-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48"><rect x="10" y="10" width="28" height="28" rx="6" /><path d="M24 18v8l5 5" strokeLinecap="round" /></svg>
      ),
      href: "#professional",
    },
    {
      title: t('cards.euCh.title'),
      icon: (
        <svg className="w-14 h-14 text-teal-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" /><path d="M24 16v8l6 6" strokeLinecap="round" /></svg>
      ),
      href: "#eu-ch",
    },
    {
      title: t('cards.beChFans.title'),
      icon: (
        <svg className="w-14 h-14 text-teal-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48"><path d="M24 4v40M4 24h40" /><circle cx="24" cy="24" r="8" /></svg>
      ),
      href: "#be-ch-fans",
    },
  ];

  return (
    <section className="w-full bg-white pt-0 pb-12 md:pb-16 lg:pb-20">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href={`/${locale}`} className="hover:text-teal-600 transition-colors">
              {t('breadcrumb.home')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t('breadcrumb.warranty')}</span>
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-10 items-center mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-2 text-gray-900 w-full text-left">{t('title')}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full mt-4">
          {warrantyCards.map((card) => (
            <Link
              href={card.href}
              key={card.title}
              className="group flex flex-col items-center justify-center bg-white border border-gray-200 rounded-xl px-6 py-8 shadow-sm hover:shadow-md transition relative h-56 cursor-pointer text-center hover:border-teal-600"
            >
              {card.icon}
              <div className="mt-6 text-base font-medium text-gray-900 group-hover:text-teal-700 transition-colors">
                {card.title}
              </div>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-cyan-700 text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
