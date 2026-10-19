"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import ContactTutorModal from "./ContactTutorModal";

export default function ContactTutorButton({ tutor, isAuthenticated, currentUser }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(`/tutors/${tutor.id}`)}`);
      return;
    }
    setOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="
          w-full flex items-center justify-center gap-2
          py-3 bg-white text-[#0d8a6e] font-extrabold text-sm
          rounded-full border-2 border-[#0d8a6e]/25
          hover:bg-[#f0fdf9] hover:border-[#0d8a6e]/40
          transition-all duration-200 cursor-pointer
        "
      >
        {isAuthenticated ? <Mail size={16} /> : <Lock size={15} />}
        {isAuthenticated ? "Contact Tutor via Email" : "Sign In to Contact Tutor"}
      </button>

      {open && (
        <ContactTutorModal
          tutor={tutor}
          currentUser={currentUser}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

