export default function Navbar() {
    return (
        <nav className="flex justify-between items-center px-8 py-4 border-b">
            <h1 className="text-xl font-bold">TutorHub.lk</h1>

            <div className="flex gap-6">
                <a href="#">Lessons</a>
                <a href="#">Subjects</a>
                <a href="#">Tutors</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </div>

        </nav>
    );
}