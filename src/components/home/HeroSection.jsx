import HeroHeader from "../hero/HeroHeader";
import PopularVideosCard from "../hero/PopularVideosCard";
import NewlyJoinedTutorsCard from "../hero/NewlyJoinedTutorsCard";
import PaidTutorAdsCard from "../hero/PaidTutorAdsCard";
import { getPopularVideos, getNewlyJoinedTutors, getPaidTutorAds } from "@/utils/getData";

export default async function HeroSection() {
    const [popularVideos, newTutors, paidAds] = await Promise.all([
        getPopularVideos(3).catch(() => []),
        getNewlyJoinedTutors(6).catch(() => []),
        getPaidTutorAds().catch(() => [])
    ]);

    return (
        <section className="relative overflow-hidden py-4 md:py-6 lg:h-[calc(100vh-80px)] lg:max-h-[calc(100vh-80px)] lg:min-h-[580px] flex flex-col justify-between">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-10 right-20 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl"/>
                <div className="absolute bottom-0 left-20 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl"/>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full h-full flex flex-col justify-between my-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch h-full">
                    
                    {/* Left Column (8 cols): Hero Header on top + 2 cards on bottom */}
                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between space-y-4 lg:space-y-5 h-full">
                        <HeroHeader />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch flex-1 min-h-0">
                            <PopularVideosCard videos={popularVideos} />
                            <NewlyJoinedTutorsCard tutors={newTutors} />
                        </div>
                    </div>

                    {/* Right Column (4 cols): Big Paid Tutor Ad Banner stretching top to bottom */}
                    <div className="lg:col-span-5 xl:col-span-4 flex flex-col h-full min-h-0">
                        <PaidTutorAdsCard ads={paidAds} />
                    </div>

                </div>
            </div>
        </section>
    );
}