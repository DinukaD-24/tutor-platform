export default function SyllabusLoading() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 animate-pulse space-y-8">
        <div className="h-10 bg-gray-200/80 rounded-2xl w-72" />
        <div className="h-4 bg-gray-200/60 rounded-xl w-80" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-48 bg-gray-100 rounded-3xl border border-gray-100" />
          ))}
        </div>
      </div>
    </main>
  );
}
