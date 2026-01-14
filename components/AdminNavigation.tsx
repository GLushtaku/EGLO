import { Button } from "./Button"
import { Settings, Users, BarChart3, Package, Home, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

export function AdminNavigation() {
  const t = useTranslations('adminNavigation')
  const params = useParams()
  const locale = params.locale as string

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <Image
                src="/assets/images/Logo_EGLO.png"
                alt="EGLO Logo"
                width={120}
                height={40}
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link href={`/${locale}/dashboard`}>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                {t('navigation.dashboard')}
              </Button>
            </Link>
            
            <Link href={`/${locale}/admin/products`}>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                {t('navigation.products')}
              </Button>
            </Link>
            
            <Link href={`/${locale}/admin/users`}>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {t('navigation.users')}
              </Button>
            </Link>
            
            <Link href={`/${locale}/admin/settings`}>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                {t('navigation.settings')}
              </Button>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">         
            
            <Link href={`/${locale}`}>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                {t('navigation.viewSite')}
              </Button>
            </Link>
            
            <Button variant="ghost" size="sm" className="flex items-center gap-2 text-red-600 hover:text-red-700">
              <LogOut className="w-4 h-4" />
              {t('navigation.logout')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}