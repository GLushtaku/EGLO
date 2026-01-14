"use client";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, User, ShoppingCart, LogOut, Menu } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./Input";
import LocaleSwitcher from "./LanguageSwitcher";
import { Badge } from "./Badge";
import { Navigation } from "./Navigation";
import { useState } from "react";
import { useCart } from "../app/[locale]/context/CartContext";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useAuth } from "../lib/useAuth";

interface HeaderProps {
  noPadding?: boolean;
}

export function Header({ noPadding = false }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("header");
  const { user, isAuthenticated, logout } = useAuth();

  // Add debugging
  if (process.env.NODE_ENV === "development") {
    // console.log("🔍 Auth Debug:", { user, isAuthenticated });
    console.log("🔍 Auth Debug:", user);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(
        `/${locale}/search?q=${encodeURIComponent(searchTerm.trim())}`
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="border-b border-gray-100">
      {/* Top Bar */}
      <div className="bg-gray-50 py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-2 md:gap-4">
            <a 
              href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUqCAgBEAAYFhgeMgYIABBFGDkyCAgBEAAYFhgeMg0IAhAAGIsDGIAEGKIEMg0IAxAAGIsDGIAEGKIEMgoIBBAAGIsDGO8FMgoIBRAAGIsDGO8FMgoIBhAAGIsDGO8F0gEINjE3NWoxajeoAgCwAgA&um=1&ie=UTF-8&fb=1&gl=mk&sa=X&geocode=Ke9lSzamFVQTMWF7CnsiBhyj&daddr=Ul.+Mesta+br.16,+Skopje+1000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-teal-600 transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">{t("topBar.findStore")}</span>
            </a>
            <span className="hidden sm:inline">|</span>
            <span className="hidden md:inline">
              {t("topBar.customerSupport")}
            </span>
            <span className="hidden md:inline">|</span>
            <LocaleSwitcher />
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">{t("topBar.freeShipping")}</span>
            <span className="sm:hidden">{t("topBar.freeShippingMobile")}</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`py-4 ${noPadding ? "px-0" : "px-4"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 mr-2 rounded hover:bg-gray-100"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center">
              <Image
                src="/assets/images/Logo_EGLO.png"
                alt="EGLO"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden sm:block flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={t("search.placeholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 py-3 border-gray-200 focus:border-teal-500 focus:ring-teal-500 w-full"
                />
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {isAuthenticated ? (
                // User is logged in - show email and logout
                <div className="flex items-center gap-2">
                  <span className="hidden lg:inline text-sm text-gray-700">
                    {user?.fullName ? user?.fullName : user?.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-1 md:gap-2 p-2 md:p-3 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden lg:inline">{t("actions.logout")}</span>
                  </Button>
                </div>
              ) : (
                // User is not logged in - show login button
                <Link href={`/${locale}/login`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 md:gap-2 p-2 md:p-3 hover:text-teal-600 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden lg:inline">{t("actions.login")}</span>
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 md:gap-2 p-2 md:p-3 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden lg:inline">{t("actions.cart")}</span>
                {cartItemCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="absolute -top-1 -right-1 md:static md:ml-1 bg-teal-600 text-white"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="sm:hidden mt-4 px-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={t("search.placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 border-gray-200 focus:border-teal-500 focus:ring-teal-500 w-full"
              />
            </form>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Navigation
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </header>
  );
}
