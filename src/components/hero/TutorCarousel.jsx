import { tutors } from "@/data/tutors";
import TutorMiniCard from "./TutorMiniCard";

const scrollingTutors = [...tutors, ...tutors];

export default function TutorCarousel () {
    return (
        <div className="relative h-[500px] overflow-hidden">

            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-10"></div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10"></div>

            <div className="animate-scroll flex flex-col gap-4">
                {scrollingTutors.map((tutor, index) => (
                    <TutorMiniCard 
                        key={index} 
                        tutor={tutor}/>
                ))}
            </div>
        </div>
    );
}