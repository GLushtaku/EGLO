"use client"
import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function Landmark() {
  const t = useTranslations('about.landmark');

  const milestones = [
    {
      year: "1969",
      title: t('milestones.1969.title'),
      description: t('milestones.1969.description'),
      image: null,
    },
    {
      year: "1976",
      title: t('milestones.1976.title'),
      description: t('milestones.1976.description'),
      image: "/assets/images/Eglo1976.jpg",
    },
    {
      year: "1986",
      title: t('milestones.1986.title'),
      description: t('milestones.1986.description'),
      image: null,
    },
    {
      year: "2016",
      title: t('milestones.2016.title'),
      description: t('milestones.2016.description'),
      image: "/assets/images/eglo-arnsberg.jpg",
    },
    {
      year: "1994",
      title: t('milestones.1994.title'),
      description: t('milestones.1994.description'),
      image: "/assets/images/Ungarn.jpg",
    },
    {
      year: "1997",
      title: t('milestones.1997.title'),
      description: t('milestones.1997.description'),
      image: "/assets/images/ueber_eglo_5-lager.jpg",
    },
    {
      year: "2001",
      title: t('milestones.2001.title'),
      description: t('milestones.2001.description'),
      image: "/assets/images/EGLOChina.jpg",
    },
    {
      year: "2006",
      title: t('milestones.2006.title'),
      description: t('milestones.2006.description'),
      image: "/assets/images/ueber_eglo_7-led.jpg",
    },
    {
      year: "2016",
      title: t('milestones.2016_smart.title'),
      description: t('milestones.2016_smart.description'),
      image: "/assets/images/ueber_eglo_8-smart-light.jpg",
    },
    {
      year: "2017",
      title: t('milestones.2017.title'),
      description: t('milestones.2017.description'),
      image: "/assets/images/Indien.jpg",
    },
    {
      year: "2019",
      title: t('milestones.2019.title'),
      description: t('milestones.2019.description'),
      image: null,
      video: "https://www.youtube.com/embed/U8fy-uoZp0Y?start=1",
    },
    {
      year: "2021",
      title: t('milestones.2021.title'),
      description: t('milestones.2021.description'),
      image: "/assets/images/Magdeburg.jpg",
    },
    {
      year: "2023",
      title: t('milestones.2023.title'),
      description: t('milestones.2023.description'),
      image: "/assets/images/EGLO-Lichtwelten.jpg",
    },
  ];

  return (
    <div className="w-full py-12 md:py-16 lg:py-20">
      <section>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-2 text-gray-900">{t('title')}</h2>
          <p className="text-lg text-gray-600 mb-8">{t('subtitle')}</p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.year + milestone.title}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start hover:shadow-lg transition-shadow duration-200"
              >
                <span className="text-2xl font-semibold text-teal-600 mb-2">{milestone.year}</span>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{milestone.title}</h3>
                <p className="text-gray-600 mb-4">{milestone.description}</p>
                {milestone.image && (
                  <div className="w-full h-40 relative rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={milestone.image}
                      alt={milestone.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="transition-transform duration-200 hover:scale-105"
                    />
                  </div>
                )}
                {milestone.video && (
                  <div className="w-full aspect-video mt-2 rounded-lg overflow-hidden bg-black">
                    <iframe
                      src={milestone.video}
                      title="EGLO 50th Anniversary Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
