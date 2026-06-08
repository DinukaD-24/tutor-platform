import Navbar from "@/components/navbar/Navbar";
import { syllabuses } from "@/data/syllabuses";
import SyllabusCard from "@/components/cards/SyllabusCard";

export default function Page() {
    return (
        <main className="min-h-screen bg-white text-black">
            <Navbar/>
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <h2 className="text-3xl font-bold mb-8">
                        Browse Syllabuses
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            syllabuses.map((syllabus) => (
                                <SyllabusCard
                                    key={syllabus.id}
                                    syllabus={syllabus}
                                />
                            ))}
                    </div>
                </div>
        </main>
    );
}