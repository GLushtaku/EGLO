"use client"

import Image from "next/image"
import { Heart, Share2 } from "lucide-react"
import { Button } from "./Button"
import { useTranslations } from 'next-intl'

const galleryItems = [
  {
    key: "scandinavianMinimalism",
    image: "/assets/images/scandinavian-lightning.jpg",
    likes: 234,
  },
  {
    key: "industrialChic",
    image: "/assets/images/industrial-lighting.avif",
    likes: 189,
  },
  {
    key: "vintageElegance",
    image: "/assets/images/vintage-dining.jpg",
    likes: 156,
  },
  {
    key: "naturalWarmth",
    image: "/assets/images/natural-bedroom.png",
    likes: 298,
  },
  {
    key: "modernLuxury",
    image: "/assets/images/modern-bathroom.png",
    likes: 167,
  },
  {
    key: "bohemianSpirit",
    image: "/assets/images/bohemian-living.png",
    likes: 203,
  },
]

export function StyleGallery() {
  const t = useTranslations('styleGallery')

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {galleryItems.map((item, index) => (
            <div key={index} className="break-inside-avoid group cursor-pointer">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 hover:shadow-2xl transition-all duration-500">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={t(`items.${item.key}.title`)}
                  width={400}
                  height={index % 3 === 1 ? 600 : index % 4 === 3 ? 500 : 400}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-teal-200 font-medium">{t(`items.${item.key}.category`)}</span>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 text-sm hover:text-teal-200 transition-colors">
                        <Heart className="w-4 h-4" />
                        {item.likes}
                      </button>
                      <button className="hover:text-teal-200 transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold">{t(`items.${item.key}.title`)}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8 bg-transparent">
            {t('viewMoreInspiration')}
          </Button>
        </div>
      </div>
    </section>
  )
}
