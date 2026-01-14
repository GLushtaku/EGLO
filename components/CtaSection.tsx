"use client"

import { Button } from "./Button"
import { useTranslations } from 'next-intl'

export function CTASection() {
  const t = useTranslations('ctaSection')
  return (
    <section className="bg-teal-600 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {t('title')}
        </h2>
        <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="primary" className="px-8 py-4 text-lg">
            {t('shopNow')}
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
            {t('learnMore')}
          </Button>
        </div>
      </div>
    </section>
  )
}
