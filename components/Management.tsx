"use client"
import React from "react"
import Image from "next/image";
import { useTranslations } from 'next-intl';

const Management: React.FC = () => {
  const t = useTranslations('about.management');

  const management = [
    {
      name: t('people.management.rene.name'),
      role: t('people.management.rene.role'),
      image: "/assets/images/RenéTiefenbacher.png",
    },
    {
      name: t('people.management.axel.name'),
      role: t('people.management.axel.role'),
      image: "/assets/images/AxelBöchzelt.png",
    },
    {
      name: t('people.management.martin.name'),
      role: t('people.management.martin.role'),
      image: "/assets/images/MartinDoppelbauer.jpg",
    },
  ];

  const extendedManagement = [
    {
      name: t('people.extended.christianGspan.name'),
      role: t('people.extended.christianGspan.role'),
      image: "/assets/images/ChristianGspan.png",
    },
    {
      name: t('people.extended.manuelReinalter.name'),
      role: t('people.extended.manuelReinalter.role'),
      image: "/assets/images/ManuelReinalter.jpg",
    },
    {
      name: t('people.extended.tanjaLiscic.name'),
      role: t('people.extended.tanjaLiscic.role'),
      image: "/assets/images/TanjaLiscic.jpg",
    },
    {
      name: t('people.extended.christianHuber.name'),
      role: t('people.extended.christianHuber.role'),
      image: "/assets/images/ChristianHuber.jpg",
    },
    {
      name: t('people.extended.christianWeger.name'),
      role: t('people.extended.christianWeger.role'),
      image: "/assets/images/ChristianWeger.jpg",
    },
  ];

  const cards = [
    {
      title: t('cards.worldwide'),
      icon: (
        <svg className="w-12 h-12 text-teal-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 0c2.5 2.5 2.5 6.5 0 9m0-9c-2.5 2.5-2.5 6.5 0 9m0 0c-2.5 2.5-6.5 2.5-9 0m9 0c2.5 2.5 6.5 2.5 9 0" /></svg>
      ),
      href: "/worldwide",
    },
    {
      title: t('cards.principles'),
      icon: (
        <svg className="w-12 h-12 text-teal-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ),
      href: "/principles",
    },
    {
      title: t('cards.workingAtEglo'),
      icon: (
        <svg className="w-12 h-12 text-teal-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9 5.87v-2a4 4 0 00-3-3.87m0 0a4 4 0 00-3 3.87v2m3-5.87V7a4 4 0 10-8 0v7m8 0a4 4 0 018 0v7" /></svg>
      ),
      href: "/working-at-eglo",
    },
  ];

  return (
    <section className="max-w-[1100px] mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <hr className="border-t border-gray-200 my-8" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2 text-center text-gray-900">{t('title')}</h2>
        <p className="text-center text-gray-600 mb-8">
          {t('subtitle')}
        </p>
        <div className="flex flex-wrap justify-center gap-12 mb-10">
          {management.map((person) => (
            <div key={person.name} className="text-center w-44">
              <Image
                src={person.image}
                alt={person.name}
                width={112}
                height={112}
                className="w-28 h-28 object-cover rounded-xl mb-3 mx-auto"
              />
              <div className="font-semibold">{person.name}</div>
              <div className="text-gray-600 text-sm whitespace-pre-line">{person.role}</div>
            </div>
          ))}
        </div>
        <h3 className="text-center text-xl font-medium mb-6">{t('extendedManagement')}</h3>
        <div className="flex flex-wrap justify-center gap-8">
          {extendedManagement.map((person) => (
            <div key={person.name} className="text-center w-36 mb-6">
              <Image
                src={person.image}
                alt={person.name}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded-lg mb-2 mx-auto"
              />
              <div className="font-medium">{person.name}</div>
              <div className="text-gray-600 text-xs">{person.role}</div>
            </div>
          ))}
        </div>
        <hr className="border-t border-gray-200 my-8" />
      </div>
      {/* Cards Section - matches the design you sent */}
      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto mt-8 px-2">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="group flex-1 min-w-[220px] max-w-xs bg-white border border-gray-200 rounded-xl flex items-center px-6 py-6 md:py-8 shadow-sm hover:shadow-md transition relative h-40 md:h-44"
          >
            <div className="flex flex-col items-center flex-1">
              {card.icon}
              <div className="mt-4 text-lg font-medium text-gray-900 text-center">{card.title}</div>
            </div>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-cyan-700 text-2xl group-hover:translate-x-1 transition-transform">→</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Management;
