"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Lock, LogIn } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import FollowButton from "./FollowButton";
import ContactTutorButton from "./ContactTutorButton";

export default function TutorContactChannels({ tutor }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAuthenticated = Boolean(user);

  return (
    <>
      {/* Contact Channels */}
      <div className="p-5 border-b border-gray-100/90 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">
            Contact Channels
          </p>
          {!loading && !isAuthenticated && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              <Lock size={10} />
              Login Required
            </span>
          )}
        </div>

        {loading ? (
          <div className="py-4 flex items-center justify-center text-xs text-gray-400 animate-pulse">
            Checking access permissions...
          </div>
        ) : isAuthenticated ? (
          <div className="space-y-2.5">
            {tutor.email && (
              <div className="flex items-center gap-2.5 text-sm text-gray-700">
                <div className="w-7 h-7 rounded-xl bg-[#e6f7f2] border border-[#c2edd9] flex items-center justify-center shrink-0">
                  <Mail size={13} className="text-[#0b735c]" />
                </div>
                <span className="truncate text-xs font-semibold">{tutor.email}</span>
              </div>
            )}
            {tutor.phone && (
              <div className="flex items-center gap-2.5 text-sm text-gray-700">
                <div className="w-7 h-7 rounded-xl bg-[#e6f7f2] border border-[#c2edd9] flex items-center justify-center shrink-0">
                  <Phone size={13} className="text-[#0b735c]" />
                </div>
                <span className="text-xs font-semibold">{tutor.phone}</span>
              </div>
            )}
            {tutor.location && (
              <div className="flex items-center gap-2.5 text-sm text-gray-700">
                <div className="w-7 h-7 rounded-xl bg-[#e6f7f2] border border-[#c2edd9] flex items-center justify-center shrink-0">
                  <MapPin size={13} className="text-[#0b735c]" />
                </div>
                <span className="text-xs font-semibold">{tutor.location}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-[#f0fdf9] border border-[#0b735c]/20 rounded-2xl p-4 text-center space-y-2">
            <div className="w-9 h-9 rounded-full bg-white shadow-xs border border-[#0b735c]/20 flex items-center justify-center mx-auto text-[#0b735c]">
              <Lock size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-dark">Contact Details Protected</p>
              <p className="text-[11px] text-gray-600 mt-0.5 leading-relaxed font-medium">
                Sign in with Google to view this tutor&apos;s email and phone number.
              </p>
            </div>
            <Link
              href={`/login?redirect=${encodeURIComponent(`/tutors/${tutor.id}`)}`}
              className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-[#0b735c] hover:bg-[#095e4b] text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <LogIn size={13} />
              Sign In to View
            </Link>
          </div>
        )}
      </div>

      {/* CTA Buttons */}
      <div className="p-5 space-y-3 relative overflow-hidden">
        {/* Wave decoration */}
        <div className="absolute bottom-0 right-0 w-32 h-16 opacity-10 pointer-events-none">
          <svg viewBox="0 0 128 64" className="w-full h-full text-[#0b735c] fill-current">
            <path d="M0,32 C32,0 96,64 128,32 L128,64 L0,64 Z" />
          </svg>
        </div>

        <FollowButton tutorId={tutor.id} />
        <ContactTutorButton
          tutor={{ id: tutor.id, name: tutor.name, email: tutor.email }}
          isAuthenticated={isAuthenticated}
          currentUser={user}
        />
      </div>
    </>
  );
}
