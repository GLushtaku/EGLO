import { InspirationHero } from "../../../components/InspirationHero"
import { RoomShowcase } from "../../../components/RoomShowcaseSection"
import { StyleGallery } from "../../../components/StyleGallery"
import { TrendingIdeas } from "../../../components/TrendingIdeasSection"

export default function InspirationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <InspirationHero />
      <RoomShowcase />
      <StyleGallery />
      <TrendingIdeas />
    </div>
  )
} 