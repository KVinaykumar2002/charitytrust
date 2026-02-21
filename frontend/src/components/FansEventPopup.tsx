"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ArrowRight, X } from "lucide-react";

export default function FansEventPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isAdminPage = pathname?.startsWith("/admin") ?? false;

  useEffect(() => {
    setMounted(true);
  }, []);

  // On every load: show popup (not on admin). Only close when user closes.
  useEffect(() => {
    if (!mounted || isAdminPage) return;
    setIsOpen(true);
  }, [mounted, isAdminPage]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!mounted || isAdminPage) return null;

  return (
    <>
      {/* Floating icon at bottom right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[99998] flex h-14 w-14 items-center justify-center rounded-full bg-[#FD7E14] text-white shadow-lg transition-all hover:scale-105 hover:bg-[#E56B00] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#FD7E14] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]"
        aria-label="Chiranjeevi Gari Inspiration - Submit your fan event"
      >
        <Heart className="h-6 w-6" fill="currentColor" />
      </button>

      {/* Popup modal - shown just above the icon, no backdrop blur */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99998]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fans-popup-title"
        >
          {/* Invisible backdrop - close on click, no blur */}
          <div
            className="absolute inset-0 animate-in fade-in-0 duration-200"
            onClick={handleClose}
            aria-hidden
          />

          {/* Content - positioned just above the floating icon, slides up + fades in */}
          <div
            className="fixed right-6 bottom-[calc(1.5rem+3.5rem+0.5rem)] z-[99999] w-[calc(100vw-3rem)] max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-2xl animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out"
            style={{ marginLeft: "auto" }}
          >
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
      )}
    </>
  );
}
