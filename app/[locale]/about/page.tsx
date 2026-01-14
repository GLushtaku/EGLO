import AboutEglo from "../../../components/AboutEglo";
import Landmark from "../../../components/Landmark";
import Management from "../../../components/Management";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-white">
      <AboutEglo locale={locale} />
      <Landmark />
      <Management />
    </div>
  );
}
