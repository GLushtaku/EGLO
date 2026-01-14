'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

export default function PrinciplesPage() {
  const t = useTranslations('principles');
  const params = useParams();
  const locale = params.locale as string;

  const principles = [
    {
      letter: 'E',
      word: t('principles.established.word'),
      title: t('principles.established.title'),
      description: t('principles.established.description'),
      image: '/assets/images/first.jpg',
    },
    {
      letter: 'G',
      word: t('principles.global.word'),
      title: t('principles.global.title'),
      description: t('principles.global.description'),
      image: '/assets/images/second.jpg',
    },
    {
      letter: 'L',
      word: t('principles.light.word'),
      title: t('principles.light.title'),
      description: t('principles.light.description'),
      image: '/assets/images/third.jpg',
    },
    {
      letter: 'O',
      word: t('principles.organization.word'),
      title: t('principles.organization.title'),
      description: t('principles.organization.description'),
      image: '/assets/images/fourth.jpg',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-16">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href={`/${locale}`} className="hover:text-teal-600 transition-colors">{t('breadcrumb.home')}</Link>
            <span>/</span>
            <span className="text-gray-900">{t('breadcrumb.principles')}</span>
          </nav>
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-4 text-left px-4 text-gray-800">{t('title')}</h1>
      <div className="flex flex-col md:flex-row gap-4 px-4 mb-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-teal-500 text-white rounded-lg p-6 text-2xl font-semibold max-w-xs text-left">{t('pillarsTitle')}</div>
        </div>
        <div className="flex-[2]">
          <div className="bg-teal-100 text-teal-900 rounded-lg p-6 text-base font-medium shadow-sm">
            {t('summary')}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10 px-4">
        {principles.map((p, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-start gap-8 w-full">
            {/* Left column: big letter + word side by side */}
            <div className="flex flex-row items-center min-w-[120px] md:min-w-[160px] mb-2 md:mb-0">
              <span className="text-teal-500 text-6xl md:text-7xl font-bold leading-none">{p.letter}</span>
              <span className="text-teal-500 text-2xl md:text-3xl font-semibold ml-2">{p.word}</span>
            </div>
            {/* Right column: text and image */}
            <div className="flex-1 flex flex-col gap-2">
              <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="text-lg md:text-xl font-semibold text-gray-800 mb-2">{p.title}</div>
                <div className="text-gray-700 whitespace-pre-line text-base md:text-lg">{p.description}</div>
              </div>
              <div className="flex justify-start w-full mt-2">
                <div className="relative w-full max-w-md h-40 md:h-56 rounded-lg overflow-hidden shadow border border-gray-100 bg-white">
                  <Image src={p.image} alt={p.title} fill style={{objectFit:'cover'}} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
