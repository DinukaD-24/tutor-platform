import HeroContent from "../hero/HeroContent";
import TutorCarousel from "../hero/TutorCarousel";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-10 right-20 h-72 w-72 rounded-full bg-gray-100 blur-3xl"/>
                <div className="absolute bottom-0 left-20 h-72 w-72 rounded-full bg-gray-100 blur-3xl"/>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <HeroContent/>
                    <TutorCarousel/>
                </div>
            </div>
        </section>
    );
}