"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowRight, X } from "lucide-react";

const POPUP_DELAY_MS = 30000; // 30 seconds
const STORAGE_KEY = "fans-event-popup-closed-v2"; // v2 = reset for users who closed old popup

export default function FansEventPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;

    // Don't show if user already closed it this session
    if (sessionStorage.getItem(STORAGE_KEY)) {
      return;
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, [mounted]);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "true");
    }
  };

  if (!mounted || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fans-popup-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Content */}
      <div className="relative bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <Heart className="h-5 w-5 text-[#FD7E14]" />
          <h2 id="fans-popup-title" className="text-xl font-bold text-white">
            Chiranjeevi Gari Inspiration
          </h2>
        </div>

        <p className="text-white/70 text-base leading-relaxed mb-6">
          Events done from Chiranjeevi Fans inspired by Chiranjeevi garu.
          Share your fan-organized events and inspire the community!
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/events-by-fans/submit"
            onClick={handleClose}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FD7E14] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#E56B00]"
          >
            Submit Your Fan Event
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/events-by-fans"
            onClick={handleClose}
            className="text-center text-sm text-white/60 hover:text-[#FD7E14] transition-colors"
          >
            View Events by Fans
          </Link>
        </div>
      </div>
    </div>
  );
}
