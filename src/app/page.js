import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedSubjects from "@/components/home/FeaturedSubjects";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar/>
      <HeroSection/>
      <FeaturedSubjects/>
    </main>
  );
}