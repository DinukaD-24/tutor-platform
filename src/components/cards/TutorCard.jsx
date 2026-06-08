export default function TutorCard({tutor}) {
    return (
        <div className="border rounded-xl p-5 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-200 mb-4"></div>

            <h3 className="text-xl font-semibold">
                {tutor.name}
            </h3>
            
            <p className="text-gray-600">
                {tutor.subject}
            </p>

            <p className="text-sm text-gray-400">
                {tutor.tutorType}
            </p>

        </div>
    );
}