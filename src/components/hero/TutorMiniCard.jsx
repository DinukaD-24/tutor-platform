export default function TutorMiniCard ({ tutor }) {
    return (
        <div 
            className="
                bg-white 
                border 
                border-gray-200 
                rounded-2xl 
                p-5 
                shadow-lg 
                transition-all 
                duration-300
                hover:-translate-y-1
                hover:shadow-xl">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    {tutor.name.charAt(0)}
                </div>

                <div>
                    <h3 className="font-semibold text-dark">
                        {tutor.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {tutor.tutorType}
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <p className="font-medium text-dark">
                    {tutor.subject}
                </p>
            </div>

        </div>
    );
}