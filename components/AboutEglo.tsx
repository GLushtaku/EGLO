"use client"

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslations } from 'next-intl';

interface AboutEgloProps {
  locale: string
}

export default function AboutEglo({ locale }: AboutEgloProps) {
  const t = useTranslations('about');

  return (
    <section className="w-full bg-white pt-0 pb-12 md:pb-16 lg:pb-20 min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4">
          <nav className="flex items-center flex-wrap gap-1 md:gap-2 text-xs md:text-sm text-gray-500">
            <Link href={`/${locale}`} className="hover:text-teal-600 transition-colors">
              {t('breadcrumb.home')}
            </Link>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-gray-900">{t('breadcrumb.about')}</span>
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-10 items-center mt-8">
        {/* Left: Text blocks */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-2 text-left px-4 text-gray-900">{t('hero.title')}</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-teal-600 text-white rounded-lg p-6 text-xl font-semibold flex-1 shadow-md">
              {t('hero.brightMinds')}
            </div>
            <div className="bg-teal-100 text-teal-900 rounded-lg p-6 flex-1 shadow-sm text-base">
              {t('hero.description')}
            </div>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-xl bg-gray-100">
            <Image
              src="/assets/images/headquarters.jpg"
              alt="EGLO headquarters or product"
              width={900}
              height={0} // Let Next.js auto-calculate height
              className="object-cover w-full"
              priority
            />
          </div>
        </div>
      </div>
      {/* Philosophy/Motto Block */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="bg-white border-l-4 border-teal-600 p-6 rounded-lg shadow-md">
          <blockquote className="text-xl italic text-gray-700 mb-2">
            {t('hero.motto')}
          </blockquote>
          <div className="text-gray-600 text-base">
            {t('hero.mottoDescription')}
          </div>
        </div>
      </div>
    </section>
  );
}
