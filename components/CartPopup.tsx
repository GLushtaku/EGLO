"use client"

import { useEffect } from "react"
import { Check } from "lucide-react"
import { useTranslations } from 'next-intl'

interface CartPopupProps {
  productName: string
  isVisible: boolean
  onClose: () => void
}

export function CartPopup({ productName, isVisible, onClose }: CartPopupProps) {
  const t = useTranslations('cart')
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 10000) // 10 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-300">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {productName} {t('addedToCart')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 