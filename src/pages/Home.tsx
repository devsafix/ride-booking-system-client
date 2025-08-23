import HeroBanner from "@/components/modules/home/HeroBanner";
import HowItWorks from "@/components/modules/home/HowItWorks";
import ServiceHighlights from "@/components/modules/home/ServiceHighlights";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <HowItWorks />
      <ServiceHighlights />
    </div>
  );
}
