import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "TutorHub.LK | Sri Lanka's Tutor Discovery & Learning Platform",
  description: "TutorHub.LK connects Sri Lankan students with qualified, verified tutors across Local A/L, O/L, Edexcel, and Cambridge syllabuses. Browse subjects, compare teaching styles, and find your ideal tutor.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "TutorHub.LK",
    siteName: "TutorHub.LK",
    description: "TutorHub.LK connects Sri Lankan students with qualified, verified tutors across Local A/L, O/L, Edexcel, and Cambridge syllabuses.",
    url: "https://www.tutorhub.lk",
    type: "website",
    images: [
      {
        url: "https://www.tutorhub.lk/logo.png",
        width: 512,
        height: 512,
        alt: "TutorHub.LK",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "TutorHub.LK | Sri Lanka's Tutor Discovery & Learning Platform",
    description: "Find qualified tutors across Local A/L, O/L, Edexcel, and Cambridge syllabuses.",
    images: ["https://www.tutorhub.lk/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <Navbar/>

        <main className="flex-1">
          {children}
        </main>
        
        <Footer/>

      </body>
      
    </html>
  );
}
