'use client';

import Link from 'next/link';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Lightbulb, Fan, Zap, Home, ChevronRight, X, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCategories, Category as ApiCategory } from '@/hooks/useCategories';
import { useAuth } from '@/lib/useAuth';

interface NavigationProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

interface TransformedSubcategory {
  id: string;
  nameKey: string;
  subcategories: TransformedSubcategory[];
}

interface TransformedCategory {
  id: string;
  nameKey: string;
  icon: string;
  subcategories: TransformedSubcategory[];
}

// Helper function to get icon based on category name/id
const getIconName = (name: string, id: string): string => {
  const lowerName = name.toLowerCase();
  const lowerId = id.toLowerCase();

  if (
    lowerName.includes('light') ||
    lowerName.includes('lamp') ||
    lowerId.includes('light')
  ) {
    return 'Lightbulb';
  }
  if (lowerName.includes('fan') || lowerId.includes('fan')) {
    return 'Fan';
  }
  if (
    lowerName.includes('outdoor') ||
    lowerName.includes('exterior') ||
    lowerId.includes('outdoor')
  ) {
    return 'Zap';
  }
  if (lowerName.includes('home') || lowerId.includes('home')) {
    return 'Home';
  }
  // Default to Lightbulb
  return 'Lightbulb';
};

// Transform flat API structure to nested structure
const transformCategories = (
  apiCategories: ApiCategory[]
): TransformedCategory[] => {
  if (!apiCategories || apiCategories.length === 0) return [];

  // Find root categories (no parentId)
  const rootCategories = apiCategories.filter((cat) => !cat.parentId);

  // Build nested structure recursively
  const buildNested = (category: ApiCategory): TransformedSubcategory => {
    const children = apiCategories.filter(
      (cat) => cat.parentId === category.id
    );

    return {
      id: category.id,
      nameKey: `categories.${category.id}`,
      subcategories: children.map((child) => buildNested(child)),
    };
  };

  // Transform root categories
  return rootCategories.map((category) => ({
    id: category.id,
    nameKey: `categories.${category.id}`,
    icon: getIconName(category.name, category.id),
    subcategories: apiCategories
      .filter((cat) => cat.parentId === category.id)
      .map((subcat) => buildNested(subcat)),
  }));
};

export function Navigation({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: NavigationProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(
    null
  );
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<
    string | null
  >(null);
  const [expandedMobileSubcategory, setExpandedMobileSubcategory] = useState<
    string | null
  >(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations('navigation');
  const tCategories = useTranslations('categories');
  const params = useParams();
  const locale = params.locale as string;
  const { user, isAuthenticated } = useAuth();

  // Fetch categories from API
  const { categories: apiCategories, loading, error } = useCategories();

  // Check if user is admin
  const isAdmin = useMemo(
    () =>
      isAuthenticated &&
      user?.roles?.some(
        (role) =>
          typeof role === 'string' &&
          (role.toLowerCase() === 'admin' ||
            role.toLowerCase() === 'administrator')
      ),
    [isAuthenticated, user]
  );

  // Transform API categories to nested structure
  const categoriesData = useMemo(() => {
    if (!apiCategories || apiCategories.length === 0) return { categories: [] };
    return { categories: transformCategories(apiCategories) };
  }, [apiCategories]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb':
        return <Lightbulb className="w-4 h-4" />;
      case 'Fan':
        return <Fan className="w-4 h-4" />;
      case 'Zap':
        return <Zap className="w-4 h-4" />;
      case 'Home':
        return <Home className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleMouseEnter = (categoryId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredCategory(categoryId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
      setHoveredSubcategory(null);
    }, 150);
  };

  const handleSubcategoryMouseEnter = (subcategoryId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHoveredSubcategory(subcategoryId);
  };

  const handleSubcategoryMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredSubcategory(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Helper to get display name - try translation first, fallback to API name
  const getCategoryName = (category: TransformedCategory): string => {
    // First, try to get the name from API
    const apiCat = apiCategories?.find((c) => c.id === category.id);
    if (apiCat?.name) {
      return apiCat.name;
    }

    // Fallback to translation if API name not available
    try {
      const translationKey = category.nameKey.replace('categories.', '');
      const translated = tCategories(translationKey);
      // If translation returns the key itself or contains "categories.", use the ID
      if (translated === translationKey || translated.includes('categories.')) {
        return category.id;
      }
      return translated;
    } catch {
      return category.id;
    }
  };

  const getSubcategoryName = (subcategory: TransformedSubcategory): string => {
    // First, try to get the name from API
    const apiCat = apiCategories?.find((c) => c.id === subcategory.id);
    if (apiCat?.name) {
      return apiCat.name;
    }

    // Fallback to translation if API name not available
    try {
      const translationKey = subcategory.nameKey.replace('categories.', '');
      const translated = tCategories(translationKey);
      // If translation returns the key itself or contains "categories.", use the ID
      if (translated === translationKey || translated.includes('categories.')) {
        return subcategory.id;
      }
      return translated;
    } catch {
      return subcategory.id;
    }
  };

  return (
    <nav className="border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-8 py-4">
          {loading && (
            <div className="flex items-center gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-24 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="text-sm text-red-600">
              Failed to load categories
            </div>
          )}

          {!loading &&
            !error &&
            categoriesData?.categories?.map((category) => (
              <div
                key={category.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={`/${locale}/category/${category.id}`}
                  className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors font-medium"
                >
                  {getIcon(category.icon)}
                  {getCategoryName(category)}
                </Link>

                {/* Dropdown Menu */}
                {hoveredCategory === category.id &&
                  category.subcategories.length > 0 && (
                    <div
                      className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-64"
                      onMouseEnter={() => handleMouseEnter(category.id)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-4">
                        <div className="grid grid-cols-1 gap-4">
                          {/* Left Column - Main Subcategories */}
                          <div className="space-y-2">
                            {category.subcategories.map((subcategory) => (
                              <div
                                key={subcategory.id}
                                className="relative"
                                onMouseEnter={() =>
                                  handleSubcategoryMouseEnter(subcategory.id)
                                }
                                onMouseLeave={handleSubcategoryMouseLeave}
                              >
                                <Link
                                  href={`/${locale}/subcategory/${subcategory.id}`}
                                  className="flex items-center justify-between text-gray-700 hover:text-teal-600 transition-colors cursor-pointer py-1 px-2 rounded"
                                >
                                  <span className="text-sm font-medium">
                                    {getSubcategoryName(subcategory)}
                                  </span>
                                  {subcategory.subcategories.length > 0 && (
                                    <ChevronRight className="w-4 h-4" />
                                  )}
                                </Link>

                                {/* Right Column - Sub-subcategories */}
                                {subcategory.subcategories.length > 0 &&
                                  hoveredSubcategory === subcategory.id && (
                                    <div className="absolute left-full top-0 ml-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-48 z-10">
                                      <div className="space-y-1">
                                        {subcategory.subcategories.map(
                                          (subSubcategory) => (
                                            <Link
                                              key={subSubcategory.id}
                                              href={`/${locale}/subcategory/${subSubcategory.id}`}
                                              className="block text-sm text-gray-600 hover:text-teal-600 transition-colors py-1 px-2 rounded"
                                            >
                                              {getSubcategoryName(
                                                subSubcategory
                                              )}
                                            </Link>
                                          )
                                        )}
                                        <Link
                                          href={`/${locale}/category/${category.id}`}
                                          className="block text-sm text-teal-600 hover:text-teal-700 transition-colors py-1 px-2 rounded font-medium flex items-center gap-1"
                                        >
                                          {t('all')}
                                          <ChevronRight className="w-3 h-3" />
                                        </Link>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            ))}

          {/* Inspiration Link */}
          <Link
            href={`/${locale}/inspiration`}
            className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors font-medium"
          >
            <Lightbulb className="w-4 h-4" />
            {t('inspiration')}
          </Link>

          {/* Add Product Link - Only for Admin */}
          {isAdmin && (
            <Link
              href={`/${locale}/add-product`}
              className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" />
              {t('addProduct')}
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
              <div className="absolute top-0 left-0 w-full h-full bg-white">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{t('menu')}</span>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="overflow-y-auto h-full">
                  {loading && (
                    <div className="p-4 space-y-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-12 bg-gray-200 animate-pulse rounded"
                        />
                      ))}
                    </div>
                  )}

                  {!loading && error && (
                    <div className="p-4 text-center text-red-600">
                      Failed to load categories
                    </div>
                  )}

                  {!loading &&
                    !error &&
                    categoriesData?.categories?.map((category) => (
                      <div
                        key={category.id}
                        className="border-b border-gray-100"
                      >
                        <div className="flex items-center">
                          <Link
                            href={`/${locale}/category/${category.id}`}
                            className="flex-1 flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {getIcon(category.icon)}
                            <span className="font-medium">
                              {getCategoryName(category)}
                            </span>
                          </Link>
                          {category.subcategories.length > 0 && (
                            <button
                              onClick={() =>
                                setExpandedMobileCategory(
                                  expandedMobileCategory === category.id
                                    ? null
                                    : category.id
                                )
                              }
                              className="p-4 pr-4 hover:bg-gray-50 transition-colors"
                            >
                              <ChevronRight
                                className={`w-5 h-5 transition-transform text-teal-600 ${
                                  expandedMobileCategory === category.id
                                    ? 'rotate-90'
                                    : ''
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Mobile Subcategories */}
                        {expandedMobileCategory === category.id &&
                          category.subcategories.length > 0 && (
                            <div className="bg-gray-50 animate-in slide-in-from-top-2 duration-200">
                              {category.subcategories.map((subcategory) => (
                                <div
                                  key={subcategory.id}
                                  className="border-t border-gray-100"
                                >
                                  <div className="flex items-center">
                                    <Link
                                      href={`/${locale}/subcategory/${subcategory.id}`}
                                      className="flex-1 p-4 pl-12 text-left hover:bg-gray-100 transition-colors"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      <span className="text-gray-700">
                                        {getSubcategoryName(subcategory)}
                                      </span>
                                    </Link>
                                    {subcategory.subcategories.length > 0 && (
                                      <button
                                        onClick={() =>
                                          setExpandedMobileSubcategory(
                                            expandedMobileSubcategory ===
                                              subcategory.id
                                              ? null
                                              : subcategory.id
                                          )
                                        }
                                        className="p-4 pr-4 hover:bg-gray-100 transition-colors"
                                      >
                                        <ChevronRight
                                          className={`w-4 h-4 transition-transform text-teal-600 ${
                                            expandedMobileSubcategory ===
                                            subcategory.id
                                              ? 'rotate-90'
                                              : ''
                                          }`}
                                        />
                                      </button>
                                    )}
                                  </div>

                                  {/* Mobile Sub-subcategories */}
                                  {expandedMobileSubcategory ===
                                    subcategory.id &&
                                    subcategory.subcategories.length > 0 && (
                                      <div className="bg-gray-100 animate-in slide-in-from-top-2 duration-200">
                                        {subcategory.subcategories.map(
                                          (subSubcategory) => (
                                            <Link
                                              key={subSubcategory.id}
                                              href={`/${locale}/subcategory/${subSubcategory.id}`}
                                              className="block p-3 pl-16 text-sm text-gray-600 hover:text-teal-600 transition-colors"
                                              onClick={() =>
                                                setIsMobileMenuOpen(false)
                                              }
                                            >
                                              {getSubcategoryName(
                                                subSubcategory
                                              )}
                                            </Link>
                                          )
                                        )}
                                        <Link
                                          href={`/${locale}/category/${category.id}`}
                                          className="block p-3 pl-16 text-sm text-teal-600 hover:text-teal-700 transition-colors font-medium"
                                          onClick={() =>
                                            setIsMobileMenuOpen(false)
                                          }
                                        >
                                          {t('all')}
                                        </Link>
                                      </div>
                                    )}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}

                  {/* Mobile Inspiration Link */}
                  <div className="border-b border-gray-100">
                    <Link
                      href={`/${locale}/inspiration`}
                      className="flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Lightbulb className="w-5 h-5" />
                      <span className="font-medium">{t('inspiration')}</span>
                    </Link>
                  </div>

                  {/* Mobile Add Product Link - Only for Admin */}
                  {isAdmin && (
                    <div className="border-b border-gray-100">
                      <Link
                        href={`/${locale}/add-product`}
                        className="flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Plus className="w-5 h-5" />
                        <span className="font-medium">{t('addProduct')}</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
