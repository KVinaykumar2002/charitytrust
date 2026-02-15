"use client";

import { useState, useEffect } from "react";
import { Droplet, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export type TrustLoaderVariant = "blood" | "eye" | "both";

interface TrustLoaderProps {
  variant?: TrustLoaderVariant;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "5xl";
  label?: string;
  className?: string;
  /** Show percentage (default true for blood/both). Use percentage prop for real progress, or simulated 0→99 when unmounted. */
  showPercentage?: boolean;
  /** Optional 0–100 progress. When not set, a simulated percentage runs for blood/both. */
  percentage?: number;
}

const sizeClasses = {
  sm: "size-16",
  md: "size-24",
  lg: "size-32",
  xl: "size-44",
  "2xl": "size-56",
  "5xl": "size-72",
};

export function TrustLoader({
  variant = "blood",
  size = "lg",
  label = "Loading...",
  className,
  showPercentage = true,
  percentage: percentageProp,
}: TrustLoaderProps) {
  const iconSize = size === "sm" ? 40 : size === "md" ? 56 : size === "lg" ? 72 : size === "xl" ? 96 : size === "2xl" ? 120 : 160;
  const [simulatedPercent, setSimulatedPercent] = useState(0);

  const isBloodVariant = variant === "blood" || variant === "both";
  const showPercent = showPercentage && isBloodVariant;
  const displayPercent = percentageProp ?? simulatedPercent;

  useEffect(() => {
    if (!showPercent || percentageProp !== undefined) return;
    const interval = 80;
    const id = setInterval(() => {
      setSimulatedPercent((p) => (p >= 99 ? 99 : p + 1));
    }, interval);
    return () => clearInterval(id);
  }, [showPercent, percentageProp]);

  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className
      )}
    >
      <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
        {variant === "blood" && (
          <div className="trust-loader-blood absolute inset-0" aria-hidden>
            <Droplet
              className="size-full text-[#c41e3a] drop-shadow-[0_0_8px_rgba(196,30,58,0.5)]"
              strokeWidth={1.5}
            />
            <div
              className="trust-loader-blood-fill absolute inset-0 overflow-hidden rounded-full"
              aria-hidden
            >
              <Droplet
                className="size-full text-[#e63946]"
                strokeWidth={0}
                fill="currentColor"
                style={{ filter: "drop-shadow(0 0 6px rgba(230,57,70,0.6))" }}
              />
            </div>
          </div>
        )}
        {variant === "eye" && (
          <div className="trust-loader-eye" aria-hidden>
            <Eye
              className={cn("size-full text-[#0d9488]")}
              strokeWidth={1.5}
              style={{ filter: "drop-shadow(0 0 6px rgba(13,148,136,0.4))" }}
            />
          </div>
        )}
        {variant === "both" && (
          <div className="flex items-center gap-1.5" aria-hidden>
            <div className="trust-loader-blood relative" style={{ width: iconSize, height: iconSize }}>
              <Droplet
                className="size-full text-[#c41e3a]"
                strokeWidth={1.5}
              />
              <div className="trust-loader-blood-fill absolute inset-0 overflow-hidden rounded-full">
                <Droplet className="size-full text-[#e63946]" strokeWidth={0} fill="currentColor" />
              </div>
            </div>
            <div className="trust-loader-eye" style={{ width: iconSize, height: iconSize }}>
              <Eye className="size-full text-[#0d9488]" strokeWidth={1.5} />
            </div>
          </div>
        )}
      </div>
      {label && (
        <p className="text-sm text-muted-foreground dark:text-white/60 animate-pulse">
          {label}
        </p>
      )}
      {showPercent && (
        <p className="text-lg font-semibold tabular-nums text-[#c41e3a] dark:text-red-400" aria-live="polite">
          {Math.round(displayPercent)}%
        </p>
      )}
    </div>
  );
}

export default TrustLoader;
