"use client";

import { useState, useCallback, useEffect } from "react";
import { Volume2, Square } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

function getPageText(): string {
  if (typeof document === "undefined") return "";
  const main =
    document.querySelector("main") ||
    document.querySelector('[role="main"]') ||
    document.body;
  return main?.innerText?.trim() || "";
}

export default function TextToSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setIsSupported(
      typeof window !== "undefined" &&
        "speechSynthesis" in window &&
        "SpeechSynthesisUtterance" in window
    );
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const startSpeaking = useCallback(() => {
    if (!isSupported) return;

    const text = getPageText();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.volume = 1;
    utterance.lang = document.documentElement.lang || "en-IN";

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [isSupported]);

  const handleClick = useCallback(() => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      startSpeaking();
    }
  }, [isSpeaking, startSpeaking, stopSpeaking]);

  if (!isSupported) return null;

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={handleClick}
            className={`flex items-center justify-center rounded-full p-2 transition-all duration-300 ${
              isSpeaking
                ? "bg-[#FD7E14]/30 text-[#FD7E14] hover:bg-[#FD7E14]/40"
                : "bg-white/10 text-white hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20"
            }`}
            aria-label={isSpeaking ? "Stop reading" : "Click to hear"}
            title={isSpeaking ? "Stop reading" : "Click to hear"}
          >
            {isSpeaking ? (
              <Square className="h-5 w-5 fill-current" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={8}
          className="bg-[#1a1a1a] border border-[#333] text-white text-xs"
        >
          {isSpeaking ? "Stop reading" : "Click to hear"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
