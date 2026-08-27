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
          py-3 bg-white text-[#0d8a6e] font-extrabold text-sm
          rounded-full border-2 border-[#0d8a6e]/25
          hover:bg-[#f0fdf9] hover:border-[#0d8a6e]/40
          transition-all duration-200 cursor-pointer
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
