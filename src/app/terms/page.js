import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | TutorHub",
  description: "Terms and conditions governing the use of the TutorHub platform.",
};

export default function TermsPage() {
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
            <FileText size={24} />
          </div>
          <h1 className="text-4xl font-black text-dark tracking-tight">Terms of Service</h1>
          <p className="text-gray-500 text-sm">Last updated: July 25, 2026</p>
        </div>

        {/* Body Content */}
        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-dark">1. Acceptance of Terms</h2>
            <p>
              By accessing or using TutorHub (accessible at tutorhub.lk), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-dark">2. Description of Service</h2>
            <p>
              TutorHub provides an online discovery directory connecting students and parents with independent tutors across Local A/L, O/L, Edexcel, and Cambridge syllabuses in Sri Lanka.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-dark">3. User Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Accurate Data:</strong> Tutors applying for profile verification must provide truthful information regarding qualifications, degree programs, and teaching experience.</li>
              <li><strong>Prohibited Conduct:</strong> Users must not upload inappropriate, copyright-infringing, or misleading content to video or profile descriptions.</li>
              <li><strong>Account Integrity:</strong> You are responsible for maintaining the confidentiality of your authentication credentials.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-dark">4. Tutor Application Review</h2>
            <p>
              TutorHub reserves the right to review, approve, reject, or terminate any tutor profile application at its sole discretion to maintain educational quality and platform safety.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-dark">5. Contact Information</h2>
            <p>
              For inquiries regarding these Terms of Service, please reach out to{" "}
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
