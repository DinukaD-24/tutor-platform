import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar/>
      <section className="flex flex-col items-center justify-center h-screen text-center px-6">
        <h1 className="text-5xl font-bold mb-4">
          TutorHub.lk
        </h1>

        <p className="text-xl mb-6 max-w-2xl">
          Connecting students and tutors in Sri Lanka through
          organized learning materials and video lessons.
        </p>

        <button className="bg-black text-white px-6 py-3 rounded-xl">
          Coming Soon
        </button>
      </section>
    </main>
  );
}