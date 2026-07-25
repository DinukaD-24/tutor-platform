import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | TutorHub",
  description: "Learn how TutorHub collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-dark py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="space-y-4 border-b border-gray-100 pb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <ShieldCheck size={24} />
          </div>
          <h1 className="text-4xl font-black text-dark tracking-tight">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: July 25, 2026</p>
        </div>

        {/* Body Content */}
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-dark">1. Information We Collect</h2>
            <p>
              When you use TutorHub, we collect basic account information to provide our tutoring match service. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account Credentials:</strong> Name, email address, and Google OAuth profile information when signing in.</li>
              <li><strong>Tutor Applications:</strong> Educational qualifications, subjects taught, university affiliation, and contact details submitted during tutor onboarding.</li>
              <li><strong>Usage Data:</strong> Pages visited, watched video lesson history, and followed tutor profiles to personalize your student dashboard.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-dark">2. How We Use Your Information</h2>
            <p>We use collected data solely for platform operations:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Authenticating users securely via Google Sign-In and Supabase Auth.</li>
              <li>Displaying verified tutor profiles to students searching for Sri Lankan syllabus support.</li>
              <li>Processing and reviewing tutor applications in the Admin Console.</li>
              <li>Sending essential account updates and contact inquiry responses.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-dark">3. Data Sharing & Third Parties</h2>
            <p>
              We do not sell, rent, or trade your personal data. Data is shared strictly with infrastructure providers necessary to run the platform:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Supabase:</strong> For secure database storage and authentication session management.</li>
              <li><strong>Vercel:</strong> For hosting web application servers.</li>
              <li><strong>Google OAuth:</strong> For identity verification upon login.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-dark">4. Data Security</h2>
            <p>
              We implement industry-standard encryption protocols (HTTPS/SSL) and role-based server-side authorization checks to safeguard your personal information against unauthorized access.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-dark">5. Contact Us</h2>
            <p>
              If you have any questions or requests regarding your personal data, please contact our support team at{" "}
              <a href="mailto:dinukailangakoon@gmail.com" className="text-primary font-semibold underline">
                dinukailangakoon@gmail.com
              </a>.
            </p>
          </section>
        </div>

      </div>
    </main>
  );
}
