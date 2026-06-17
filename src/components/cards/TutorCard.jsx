export default function TutorCard({tutor}) {
    return (
        <div className="
            bg-white
            rounded-2xl
            border 
            border-gray-200
            p-6 
            shadow-sm 
            hover:shadow-lg 
            tansition
        ">
            <div className="flex items-center gap-4">
                <div className="
                    w-14h-14
                    rounded-full
                    bg-primary
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-xl
                ">
                    {tutor.name.charAt(0)}
                </div>

                <div>
                    <h3 className="font-semibold text-lg">
                        {tutor.name}
                    </h3>

                    <p className="text-gray-500">
                        {tutor.tutorType}
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <p className="font-medium">
                    {tutor.subject}
                </p>
            </div>

        </div>
    );
}