import { BookOpen } from "lucide-react";

export default function TutorMiniCard ({ tutor }) {
    const isUni = tutor.tutorType.toLowerCase().includes("uni");
    
    return (
        <div 
            className="
                bg-white/90
                backdrop-blur-sm
                border 
                border-gray-100 
                rounded-2xl 
                p-5 
                shadow-[0_8px_30px_rgb(0,0,0,0.02)]
                hover:border-primary/20
                hover:-translate-y-1
                hover:shadow-[0_15px_30px_rgba(33,131,150,0.08)]
                transition-all 
                duration-300
                w-full
                max-w-[340px]
            "
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-primary-dark text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
                    {tutor.name.charAt(0)}
                </div>

                <div className="min-w-0">
                    <h3 className="font-bold text-dark truncate">
                        {tutor.name}
                    </h3>
                    <span className={`
                        inline-block 
                        text-[10px] 
                        font-bold 
                        px-2.5 
                        py-0.5 
                        rounded-full 
                        mt-1
                        ${isUni ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}
                    `}>
                        {tutor.tutorType}
                    </span>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-50 flex items-center gap-2 text-sm text-gray-700">
                <BookOpen size={16} className="text-primary/70" />
                <span className="font-semibold truncate">{tutor.subject}</span>
            </div>

        </div>
    );
}