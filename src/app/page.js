import HeroSection from "@/components/home/HeroSection";
import FeaturedSubjects from "@/components/home/FeaturedSubjects";
import FeaturedTutors from "@/components/home/FeaturedTutors";
import StatisticsSection from "@/components/home/StatisticsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-dark">
      <HeroSection/>
      <StatisticsSection/>
      <FeaturedSubjects/>
      <FeaturedTutors/>
      <HowItWorksSection/>
    </main>
  );
}