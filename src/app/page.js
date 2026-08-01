import HeroSection          from "@/components/home/HeroSection";
import StatisticsSection    from "@/components/home/StatisticsSection";
import FeaturedSubjects     from "@/components/home/FeaturedSubjects";
import FeaturedTutors       from "@/components/home/FeaturedTutors";
import HowItWorksSection    from "@/components/home/HowItWorksSection";
import TestimonialsSection  from "@/components/home/TestimonialsSection";
import { getSiteStats, getTopReviews } from "@/utils/getData";

export const dynamic = "force-dynamic";

export default async function Home() {
    const stats = await getSiteStats();
    const reviews = await getTopReviews(6);

    return (
        <main className="min-h-screen bg-background text-dark">
            <HeroSection />
            <StatisticsSection dynamicStats={stats} />
            <FeaturedSubjects />
            <FeaturedTutors />
            <HowItWorksSection />
            <TestimonialsSection dbReviews={reviews} />
        </main>
    );
}
