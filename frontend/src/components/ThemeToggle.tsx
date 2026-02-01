"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center rounded-full bg-white/10 p-2 text-white transition-all duration-300 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
      )}
    </button>
  );
}
