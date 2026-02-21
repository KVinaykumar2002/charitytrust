"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VideoLoaderProps {
  /** Path to video file (e.g. /loader.mp4) */
  src?: string;
  className?: string;
  /** Max width of the video container */
  size?: "sm" | "md" | "lg" | "xl";
  /** Optional label below the video */
  label?: string;
}

const sizeClasses = {
  sm: "max-w-[120px]",
  md: "max-w-[200px]",
  lg: "max-w-[280px]",
  xl: "max-w-[360px]",
};

export function VideoLoader({
  src = "/loader.mp4",
  className,
  size = "lg",
  label,
}: VideoLoaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <div
      role="status"
      aria-label={label || "Loading"}
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className
      )}
    >
      <div className={cn("w-full", sizeClasses[size])}>
        <video
          ref={videoRef}
          src={src}
          className="w-full h-auto object-contain"
          playsInline
          muted
          loop
          autoPlay
          aria-hidden
        />
      </div>
      {label && (
        <p className="text-sm text-muted-foreground dark:text-white/60 animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}

export default VideoLoader;
