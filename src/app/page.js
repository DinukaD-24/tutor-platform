import HeroSection          from "@/components/home/HeroSection";
import StatisticsSection    from "@/components/home/StatisticsSection";
import FeaturedSubjects     from "@/components/home/FeaturedSubjects";
import FeaturedTutors       from "@/components/home/FeaturedTutors";
import HowItWorksSection    from "@/components/home/HowItWorksSection";
import TestimonialsSection  from "@/components/home/TestimonialsSection";
import { getSiteStats, getTopReviews } from "@/utils/getData";

// ISR: Cache on Edge CDN and revalidate at most once every 60 seconds
export const revalidate = 60;

export default async function Home() {
    const stats = await getSiteStats().catch(() => null);
    const reviews = await getTopReviews(6).catch(() => []);

    return (
        <div className="min-h-screen bg-background text-dark">
            <HeroSection />
            <StatisticsSection dynamicStats={stats} />
            <FeaturedSubjects />
            <FeaturedTutors />
            <HowItWorksSection />
            <TestimonialsSection dbReviews={reviews} />
        </div>
    );
}
