import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/hero/HeroSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar/>
      <HeroSection/>
    </main>
  );
}