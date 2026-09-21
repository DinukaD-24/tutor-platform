import Link from 'next/link';
import { Search, Home, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6 py-24 bg-background text-dark">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <div className="w-16 h-16 bg-emerald-50 text-primary rounded-2xl flex items-center justify-center mx-auto font-black text-2xl">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-dark">Page Not Found</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Sorry, we couldn&apos;t find the page or resource you were looking for on TutorHub.LK.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Link
            href="/tutors"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white font-bold text-xs rounded-xl shadow-glow-primary hover:bg-primary-dark transition-all"
          >
            <Search className="w-4 h-4" /> Browse Tutors <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 text-gray-700 hover:bg-gray-100 font-bold text-xs rounded-xl transition-all"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
