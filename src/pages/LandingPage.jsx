import LandingNavbar from "../components/landing/LandingNavbar";
import HeroSection from "../components/landing/HeroSection";
import SocialProofSection from "../components/landing/SocialProofSection";
import CampusLogosSection from "../components/landing/CampusLogosSection";
import FeatureSection from "../components/landing/FeatureSection";
import CTASection from "../components/landing/CTASection";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.22),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.16),transparent_20%),linear-gradient(180deg,#020617_0%,#0f172a_45%,#111827_100%)] pb-10 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-24 h-72 w-72 rounded-full bg-sky-400/12 blur-3xl" />
        <div className="absolute right-[-80px] top-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-300/8 blur-3xl" />
      </div>

      <div className="relative">
        <LandingNavbar />
        <HeroSection />
        <SocialProofSection />
        <CampusLogosSection />
        <FeatureSection />
        <CTASection />
      </div>
    </div>
  );
}
