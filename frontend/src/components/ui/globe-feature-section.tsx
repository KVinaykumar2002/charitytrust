"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import createGlobe, { COBEOptions } from "cobe";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Featured_05() {
  return (
    <section className="relative w-full mx-auto overflow-hidden rounded-3xl bg-muted border border-gray-200 dark:border-gray-800 shadow-md px-6 py-16 md:px-16 md:py-24 mt-48">
      <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
        <div className="z-10 max-w-xl text-left">
          <h1 className="text-3xl font-normal text-gray-900 dark:text-white">
            Make a Difference with <span className="text-primary">Chiranjeevi Charitable Trust</span>{" "}
            <span className="text-gray-500 dark:text-gray-400">Your donation helps us provide blood & eye donation services, medical assistance, disaster relief, and community welfare programs across India. Every contribution creates a lasting impact.</span>
          </h1>
          <Link href="/#donate">
            <Button className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 shadow-lg">
              <Heart className="h-4 w-4" />
              Donate Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="relative h-[180px] w-full max-w-xl">
          <Globe className="absolute -bottom-20 -right-40 scale-150" />
        </div>
      </div>
    </section>
  );
}

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [26 / 255, 58 / 255, 58 / 255], // Primary color matching charity theme
  glowColor: [77 / 255, 182 / 255, 159 / 255], // Secondary/accent color
  markers: [
    // Major cities in India where CCT operates
    { location: [17.3850, 78.4867], size: 0.12 }, // Hyderabad, Telangana (Headquarters)
    { location: [19.0760, 72.8777], size: 0.1 }, // Mumbai, Maharashtra
    { location: [28.6139, 77.2090], size: 0.1 }, // New Delhi
    { location: [12.9716, 77.5946], size: 0.08 }, // Bangalore, Karnataka
    { location: [13.0827, 80.2707], size: 0.08 }, // Chennai, Tamil Nadu
    { location: [22.5726, 88.3639], size: 0.08 }, // Kolkata, West Bengal
    { location: [18.5204, 73.8567], size: 0.07 }, // Pune, Maharashtra
    { location: [26.9124, 75.7873], size: 0.06 }, // Jaipur, Rajasthan
    { location: [23.0225, 72.5714], size: 0.06 }, // Ahmedabad, Gujarat
    { location: [25.5941, 85.1376], size: 0.05 }, // Patna, Bihar
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  const onRender = useCallback(
    (state: Record<string, any>) => {
      if (!pointerInteracting.current) phi += 0.005;
      state.phi = phi + r;
      state.width = width * 2;
      state.height = width * 2;
    },
    [r]
  );

  const onResize = () => {
    if (canvasRef.current) {
      width = canvasRef.current.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [config, onRender]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(
            e.clientX - pointerInteractionMovement.current
          )
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}

