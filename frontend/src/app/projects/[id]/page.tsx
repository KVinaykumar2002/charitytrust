"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Target,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import { getPublicProject } from "@/lib/api";
import VideoLoader from "@/components/VideoLoader";

const placeholderImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTRhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [project, setProject] = useState<{
    _id: string;
    title: string;
    description: string;
    category?: string;
    image?: string;
    imageBase64?: string;
    imageUrl?: string;
    images?: string[];
    startDate?: string;
    endDate?: string;
    location?: string;
    status?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await getPublicProject(id);
        if (!cancelled && res?.data) setProject(res.data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load project");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const primaryImage =
    project?.imageBase64 || project?.image || project?.imageUrl || placeholderImage;
  const extraImages = Array.isArray(project?.images) ? project.images : [];
  const galleryImages: string[] = [
    ...(primaryImage && primaryImage !== placeholderImage ? [primaryImage] : []),
    ...extraImages.filter((url) => url && url !== primaryImage),
  ].filter(Boolean);
  const hasMultiple = galleryImages.length > 1;

  const formatDate = (d: string | undefined) => {
    if (!d) return "";
    const date = new Date(d);
    return isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
        <NavigationHeader />
        <main className="flex-1 pt-24 flex items-center justify-center min-h-[50vh]">
          <VideoLoader size="lg" label="Loading project..." />
        </main>
        <FlickeringFooter />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
        <NavigationHeader />
        <main className="flex-1 pt-24 container mx-auto px-6 py-20 text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error || "Project not found."}</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[#FD7E14] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>
        </main>
        <FlickeringFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <NavigationHeader />
      <main className="flex-1 pt-24 pb-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-5xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-[#FD7E14] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to projects
          </Link>

          {project.category && (
            <span className="inline-block px-3 py-1 bg-[#FD7E14]/10 dark:bg-[#FD7E14]/20 text-[#FD7E14] text-sm font-semibold rounded-full mb-4">
              {project.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            {project.title}
          </h1>

          {/* Image gallery: primary + all project images */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-neutral-700 mb-8 bg-neutral-100 dark:bg-neutral-800">
            {galleryImages.length === 0 ? (
              <div className="aspect-video flex items-center justify-center text-neutral-500">
                <img src={placeholderImage} alt="" className="w-full h-full object-cover" />
              </div>
            ) : hasMultiple ? (
              <>
                <div className="relative aspect-video bg-neutral-900">
                  <img
                    src={galleryImages[galleryIndex]}
                    alt={`${project.title} – image ${galleryIndex + 1}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = placeholderImage;
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setGalleryIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setGalleryIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {galleryImages.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setGalleryIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          i === galleryIndex ? "bg-white" : "bg-white/50"
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 py-2">
                  Image {galleryIndex + 1} of {galleryImages.length}
                </p>
              </>
            ) : (
              <img
                src={galleryImages[0]}
                alt={project.title}
                className="w-full aspect-video object-contain"
                onError={(e) => {
                  e.currentTarget.src = placeholderImage;
                }}
              />
            )}
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg text-neutral-600 dark:text-neutral-300 whitespace-pre-wrap">
              {project.description}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-neutral-600 dark:text-neutral-400">
            {project.startDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#FD7E14]" />
                <span>Started: {formatDate(project.startDate)}</span>
              </div>
            )}
            {project.endDate && (
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#FD7E14]" />
                <span>Ends: {formatDate(project.endDate)}</span>
              </div>
            )}
            {project.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#FD7E14]" />
                <span>{project.location}</span>
              </div>
            )}
          </div>

          {/* Thumbnail strip when multiple images */}
          {hasMultiple && galleryImages.length <= 12 && (
            <div className="mt-10">
              <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                All images ({galleryImages.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {galleryImages.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setGalleryIndex(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      i === galleryIndex
                        ? "border-[#FD7E14] ring-2 ring-[#FD7E14]/30"
                        : "border-transparent hover:border-neutral-400"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = placeholderImage;
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <FlickeringFooter />
    </div>
  );
}
