"use client"

import Image from "next/image"
import { Button } from "./Button"
import { Badge } from "./Badge"
import { Card, CardContent } from "./Card"
import { ChevronRight, Star } from "lucide-react"
import { useTranslations } from 'next-intl'

const products = [
  {
    name: "Modern Brass Pendant",
    price: "$299",
    originalPrice: "$399",
    rating: 4.8,
    reviews: 124,
    image: "/assets/images/modern-brass-pendant.webp",
  },
  {
    name: "Industrial Ceiling Fan",
    price: "$449",
    rating: 4.9,
    reviews: 89,
    image: "/assets/images/industrial-ceiling-fan.webp",
  },
  {
    name: "Smart LED Strip Kit",
    price: "$79",
    rating: 4.7,
    reviews: 256,
    image: "/assets/images/Smart-LED-Strip-Kit.jpg",
  },
  {
    name: "Outdoor Wall Sconce",
    price: "$159",
    rating: 4.6,
    reviews: 67,
    image: "/assets/images/Outdoor-Wall-Sconce.jpg",
  },
]

export function FeaturedProducts() {
  const t = useTranslations('featuredProducts')
  
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h2>
            <p className="text-lg text-gray-600">{t('subtitle')}</p>
          </div>
          <Button variant="outline" className="hidden md:flex bg-transparent">
            {t('viewAllProducts')}
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={index}
              className="group cursor-pointer border border-gray-200 rounded-xl p-4 bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container matching StyleGrid */}
              <div className="relative h-72 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {product.originalPrice && <Badge className="absolute top-4 right-4 bg-red-500">{t('sale')}</Badge>}
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
