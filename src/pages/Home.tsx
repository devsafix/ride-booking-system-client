import HeroBanner from "@/components/modules/home/HeroBanner";
import HowItWorks from "@/components/modules/home/HowItWorks";
import ServiceHighlights from "@/components/modules/home/ServiceHighlights";
import Testimonials from "@/components/modules/home/Testimonials";

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <HowItWorks />
      <ServiceHighlights />
      <Testimonials />
    </div>
  );
}
