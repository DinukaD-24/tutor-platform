import HeroSection          from "@/components/home/HeroSection";
import StatisticsSection    from "@/components/home/StatisticsSection";
import FeaturedSubjects     from "@/components/home/FeaturedSubjects";
import FeaturedTutors       from "@/components/home/FeaturedTutors";
import HowItWorksSection    from "@/components/home/HowItWorksSection";
import TestimonialsSection  from "@/components/home/TestimonialsSection";

export const dynamic = "force-dynamic";

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-dark">
            <HeroSection />
            <StatisticsSection />
            <FeaturedSubjects />
            <FeaturedTutors />
            <HowItWorksSection />
            <TestimonialsSection />
        </main>
    );
}
