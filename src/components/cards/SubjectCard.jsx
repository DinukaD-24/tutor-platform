export default function SubjectCard({ subject }) {
    return (
        <div className="
            bg-white
            rounded-2xl
            border
            border-gray-200
            p-6
            shadow-sm
            hover:shadow-lg
            transition
        ">
            <h3 className="text-lg font-semibold">
                {subject.name}
            </h3>

            <p className="text-gray-500">
                {subject.syllabus}
            </p>

        </div>
    );
}