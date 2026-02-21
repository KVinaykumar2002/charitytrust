"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * On pages that use this, scrolls to the element matching the URL hash after mount
 * (e.g. /about#awards → scroll to id="awards"). Handles client-side navigation.
 */
export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash || hash.length < 2) return;
    const id = hash.slice(1);
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    // Delay so layout and async content (e.g. awards) can render
    const t = setTimeout(scroll, 300);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
