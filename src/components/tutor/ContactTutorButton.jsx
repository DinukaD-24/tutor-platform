"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import ContactTutorModal from "./ContactTutorModal";

export default function ContactTutorButton({ tutor }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          w-full flex items-center justify-center gap-2
          py-4 bg-primary text-white font-bold text-sm
          rounded-xl shadow-glow-primary hover:bg-primary-dark
          hover:-translate-y-0.5 transition-all duration-200 cursor-pointer
        "
      >
        <Mail size={16} />
        Contact Tutor via Email
      </button>

      {open && (
        <ContactTutorModal tutor={tutor} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
