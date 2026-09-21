'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Unhandled error caught by App Error Boundary:", error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6 py-24 bg-background text-dark">
      <div className="max-w-md w-full text-center space-y-6 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-dark">Something went wrong!</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            An unexpected error occurred while loading this page. Our team has been notified.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white font-bold text-xs rounded-xl shadow-glow-primary hover:bg-primary-dark transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-gray-50 text-gray-700 hover:bg-gray-100 font-bold text-xs rounded-xl transition-all"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
