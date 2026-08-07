"use client";
import { useEffect, useRef } from "react";

export default function LogVisit({ videoId }) {
  const logged = useRef(false);

  useEffect(() => {
    if (logged.current) return;
    logged.current = true;
    fetch("/api/student/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoId }),
    }).catch((err) => console.error("Failed to log video view:", err));
  }, [videoId]);

  return null;
}