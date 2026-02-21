"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Droplet, Eye } from "lucide-react";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import { getPublicServices } from "@/lib/api";
import VideoLoader from "@/components/VideoLoader";

const ICON_MAP = { Eye, Droplet };

export default function ServicesPage() {
  const [services, setServices] = useState<Array<{
    _id?: string;
    title: string;
    slug: string;
    description: string;
    icon?: string;
    linkText?: string;
    linkHref?: string;
    order?: number;
  }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublicServices()
      .then((res: { success?: boolean; data?: unknown[] }) => {
        if (res.success && Array.isArray(res.data)) {
          setServices(res.data as typeof services);
        }
      })
      .catch((err) => setError(err?.message || "Failed to load services"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
        <NavigationHeader />
        <main className="flex-1 pt-24 flex items-center justify-center min-h-[60vh]">
          <VideoLoader size="lg" label="Loading..." />
        </main>
        <FlickeringFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 text-center">
            Our Services
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto text-center mb-16">
            Chiranjeevi Charitable Trust delivers life-saving and sight-restoring services across India.
          </p>

          {error && (
            <p className="text-center text-red-600 dark:text-red-400 mb-8">
              {error}
            </p>
          )}

          {services.length === 0 && !error && (
            <p className="text-center text-neutral-600 dark:text-neutral-400">
              No services added yet. Services will appear here once added from the admin panel.
            </p>
          )}

          {services.map((service) => {
            const IconComponent = ICON_MAP[service.icon as keyof typeof ICON_MAP] || Eye;
            const isEye = service.icon === "Eye";
            return (
              <section
                key={service._id || service.slug}
                id={service.slug}
                className="scroll-mt-24 mb-20"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isEye ? "bg-teal-500/20" : "bg-red-500/20"
                    }`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${isEye ? "text-teal-600 dark:text-teal-400" : "text-red-600 dark:text-red-400"}`}
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                      {service.title}
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                      {service.description}
                    </p>
                    {service.linkHref && (
                      <Link
                        href={service.linkHref}
                        className={`font-semibold hover:underline ${
                          isEye ? "text-teal-600 dark:text-teal-400" : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {service.linkText || "Learn more →"}
                      </Link>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>
      <FlickeringFooter />
    </div>
  );
}
