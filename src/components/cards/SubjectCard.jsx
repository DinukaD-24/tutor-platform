export default function SubjectCard({ subject }) {
    return (
        <div className="border rounded-xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold">
                {subject.name}
            </h3>

            <p className="text-gray-500">
                {subject.syllabus}
            </p>

        </div>
    );
}