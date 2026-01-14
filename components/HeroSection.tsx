"use client"

import Image from "next/image"
import { Button } from "./Button"
import { ChevronRight } from "lucide-react"
import { useTranslations } from 'next-intl'

export function HeroSection() {
  const t = useTranslations('heroSection')
  
  return (
    <section className="relative min-h-[500px] sm:h-[600px] bg-gradient-to-r from-amber-50 to-orange-50 overflow-hidden -mx-4 md:-mx-6 lg:-mx-8 rounded-4xl sm:rounded-none">
      <div className="absolute inset-0">
        <Image
          src="/assets/images/banner.png"
          alt="Modern living room with elegant lighting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
      </div>

      <div className="relative h-full flex items-center justify-center px-4 md:px-6 lg:px-8 pt-20 sm:pt-28">
        <div className="max-w-7xl mx-auto w-full text-center">
          <div className="max-w-2xl mx-auto text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 px-2">
              {t('title')}
              <span className="block text-amber-300 mt-2">{t('subtitle')}</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                             <Button 
                 size="lg" 
                 variant="primary" 
                 className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg mx-auto w-full sm:w-auto max-w-xs bg-white/20 border-white/30 hover:bg-white/30 text-white backdrop-blur-sm"
               >
                {t('exploreCollection')}
                <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
