import HeroHeader from "../hero/HeroHeader";
import PopularVideosCard from "../hero/PopularVideosCard";
import NewlyJoinedTutorsCard from "../hero/NewlyJoinedTutorsCard";
import PaidTutorAdsCard from "../hero/PaidTutorAdsCard";
import { getPopularVideos, getNewlyJoinedTutors, getPaidTutorAds } from "@/utils/getData";

export default async function HeroSection() {
    const [popularVideos, newTutors, paidAds] = await Promise.all([
        getPopularVideos(3),
        getNewlyJoinedTutors(6),
        getPaidTutorAds()
    ]);
    
    return (
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-10 right-20 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl"/>
                <div className="absolute bottom-0 left-20 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl"/>
            </div>

            <div className="max-w-7xl mx-auto px-6 space-y-12">
                {/* Hero Header Banner */}
                <HeroHeader />

                {/* 3-Column Hero Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    <PopularVideosCard videos={popularVideos} />
                    <NewlyJoinedTutorsCard tutors={newTutors} />
                    <PaidTutorAdsCard ads={paidAds} />
                </div>
            </div>
        </section>
    );
}