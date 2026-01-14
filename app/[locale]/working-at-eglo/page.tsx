'use client'
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function WorkingAtEglo() {
  const t = useTranslations('workingAtEglo');

  return (
    <section className="w-full bg-white pt-0 pb-12 md:pb-16 lg:pb-20">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-teal-600 transition-colors">
              {t('breadcrumb.home')}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{t('breadcrumb.workingAtEglo')}</span>
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-10 items-center mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-2 text-gray-900 w-full text-left">{t('title')}</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center items-stretch mb-4">
          <div className="bg-teal-600 text-white rounded-lg shadow-md p-6 max-w-md w-full text-center text-base md:text-lg font-medium flex items-center justify-center">
            {t('quote')}
          </div>
          <div className="bg-teal-600 text-white rounded-lg shadow-md p-6 max-w-2xl w-full text-center text-base md:text-lg font-medium flex items-center justify-center">
            {t('description')}
          </div>
        </div>
        <div className="bg-teal-50 text-teal-900 rounded-lg shadow-md p-6 max-w-2xl w-full text-center text-base md:text-lg font-medium">
          {t('noVacancies')}
        </div>
      </div>
    </section>
  );
}
