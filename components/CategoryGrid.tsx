"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { Button } from "./Button";
import { Card, CardContent } from "./Card";
import { useCategories } from "@/hooks/useCategories";

type ApiCategory = {
  id: string;
  name: string;
  parentId: string | null;
  childId: string | null;
  imageUrl?: string | null;
  images?: any;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\p{L}\p{N}-]+/gu, "") // keeps unicode letters/numbers
    .replace(/-+/g, "-");
}

export function CategoryGrid() {
  const t = useTranslations("categoryGrid");
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const { categories, loading, error } = useCategories() as {
    categories: ApiCategory[];
    loading: boolean;
    error: Error | null;
  };

  // If your API returns both parent and subcategories, this keeps only top-level ones
  const topCategories = (categories ?? []).filter((c) => !c.parentId);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-0 shadow-lg overflow-hidden">
                <div className="w-full h-96 bg-gray-200 animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-6 w-2/3 bg-gray-200 animate-pulse mb-3" />
                  <div className="h-4 w-full bg-gray-200 animate-pulse mb-2" />
                  <div className="h-4 w-5/6 bg-gray-200 animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-red-600">
            Failed to load categories.
          </p>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCategories.map((category) => {
              const slug = slugify(category.name);
              const href = `/${locale}/category/${slug}`; // adjust route if you use /subcategory/...
              const img = category.imageUrl || "/placeholder.svg";

              return (
                <Link key={category.id} href={href} className="block">
                  <Card className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <Image
                        src={img}
                        alt={category.name}
                        width={300}
                        height={500}
                        className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                        {category.name}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {/* If your API doesn’t have description yet, keep a friendly fallback */}
                        {t("categoryFallbackDescription")}
                      </p>

                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-teal-600 hover:text-teal-700 font-semibold"
                      >
                        {t("shopNow")}
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
