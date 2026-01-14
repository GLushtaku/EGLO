'use client'

import { Button } from "./Button"
import { Plus, Settings, Users, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

export function AdminPanel() {
  const t = useTranslations('admin')
  const params = useParams()
  const locale = params.locale as string
  
  return (
    <>
      {/* White spacer for space between banner and panel */}
      <div className="bg-white h-8 -mx-4 md:-mx-6 lg:-mx-8"></div>
      
      <section className="bg-gray-50 border-t border-b border-gray-200 -mx-4 md:-mx-6 lg:-mx-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
            <p className="text-gray-600 mt-1 mb-4 sm:mb-0">{t('subtitle')}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href={`/${locale}/add-product`} className="w-full sm:w-auto">
              <Button variant="primary" className="flex items-center justify-center gap-2 w-full sm:w-auto py-3 sm:py-2">
                <Plus className="w-4 h-4" />
                {t('actions.addProduct')}
              </Button>
            </Link>
            
            <Button variant="outline" className="flex items-center justify-center gap-2 w-full sm:w-auto py-3 sm:py-2">
              <Settings className="w-4 h-4" />
              {t('actions.settings')}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('stats.totalProducts')}</p>
                <p className="text-xl font-semibold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('stats.activeUsers')}</p>
                <p className="text-xl font-semibold text-gray-900">5,678</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Settings className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('stats.categories')}</p>
                <p className="text-xl font-semibold text-gray-900">24</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
} 