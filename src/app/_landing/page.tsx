import HeroSection from "./_components/hero-section";
import WhyChooseUsSection from "./_components/why-choose-us-section";
import FooterSection from "./_components/footer-section";

export default function LandingPage() {
  return (
    <div className="min-h-svh ">
      <HeroSection />
      <WhyChooseUsSection />
      <FooterSection />
    </div>
  );
}
