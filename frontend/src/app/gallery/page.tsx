"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import { getPublicEvents, getPublicProjects, getPublicPrograms } from "@/lib/api";
import VideoLoader from "@/components/VideoLoader";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  date?: string;
  allImages?: string[];
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      setError(null);

      const [eventsResult, projectsResult, programsResult] = await Promise.allSettled([
        getPublicEvents(),
        getPublicProjects(),
        getPublicPrograms(),
      ]);

      const galleryImages: GalleryImage[] = [];

      // Process events
      if (eventsResult.status === "fulfilled") {
        const eventsData = eventsResult.value?.data || eventsResult.value || [];
        if (Array.isArray(eventsData)) {
          eventsData.forEach((event: any) => {
            const imageSrc = event.imageBase64 || event.image || event.imageUrl;
            const extraImages = Array.isArray(event.images) ? event.images : [];
            const allImages = [imageSrc, ...extraImages].filter(Boolean);
            if (imageSrc) {
              galleryImages.push({
                id: `event-${event._id || event.id}`,
                src: imageSrc,
                allImages,
                alt: event.title || event.name || "Event image",
                title: event.title || event.name || "Event",
                category: "Events",
                date: event.date || event.eventDate,
              });
            }
          });
        }
      }

      // Process projects
      if (projectsResult.status === "fulfilled") {
        const projectsData = projectsResult.value?.data || projectsResult.value || [];
        if (Array.isArray(projectsData)) {
          projectsData.forEach((project: any) => {
            const imageSrc = project.imageBase64 || project.image || project.imageUrl;
            const extraImages = Array.isArray(project.images) ? project.images : [];
            const allImages = [imageSrc, ...extraImages].filter(Boolean);
            if (imageSrc) {
              galleryImages.push({
                id: `project-${project._id || project.id}`,
                src: imageSrc,
                allImages,
                alt: project.title || "Project image",
                title: project.title || "Project",
                category: "Projects",
                date: project.startDate || project.createdAt,
              });
            }
          });
        }
      }

      // Process programs
      if (programsResult.status === "fulfilled") {
        const programsData = programsResult.value?.data || programsResult.value || [];
        if (Array.isArray(programsData)) {
          programsData.forEach((program: any) => {
            const imageSrc = program.imageBase64 || program.image || program.imageUrl;
            const extraImages = Array.isArray(program.images) ? program.images : [];
            const allImages = [imageSrc, ...extraImages].filter(Boolean);
            if (imageSrc) {
              galleryImages.push({
                id: `program-${program._id || program.id}`,
                src: imageSrc,
                allImages,
                alt: program.name || "Program image",
                title: program.name || "Program",
                category: "Programs",
                date: program.startDate || program.createdAt,
              });
            }
          });
        }
      }

      setImages(galleryImages);
    } catch (error: any) {
      console.error("Error fetching gallery images:", error);
      setError(error?.message || "Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Events", "Projects", "Programs"];
  const filteredImages =
    selectedCategory === "All"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedGalleryItem(image);
    setCurrentImageIndex(0);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setSelectedGalleryItem(null), 300); // clear after exit animation
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (!selectedGalleryItem?.allImages) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedGalleryItem.allImages!.length);
  };

  const prevImage = () => {
    if (!selectedGalleryItem?.allImages) return;
    const len = selectedGalleryItem.allImages.length;
    setCurrentImageIndex((prev) => (prev - 1 + len) % len);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, filteredImages.length]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <NavigationHeader />

      <main className="flex-1 pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative px-6 md:px-12 lg:px-20 mb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-[0.2em] uppercase text-[#FD7E14] border border-[#FD7E14]/30 rounded-full"
              >
                Our Moments
              </motion.span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Gallery
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                Capturing the spirit of service through moments of impact, compassion, and community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="px-6 md:px-12 lg:px-20 mb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {categories.map((category, index) => {
                const count = category === "All"
                  ? images.length
                  : images.filter((img) => img.category === category).length;
                return (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${selectedCategory === category
                      ? "text-black bg-[#FD7E14]"
                      : "text-white/70 bg-white/5 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {category}
                    {count > 0 && (
                      <span className={`ml-2 text-xs ${selectedCategory === category ? "text-black/70" : "text-white/40"
                        }`}>
                        {count}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <VideoLoader size="lg" label="Loading gallery..." />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <p className="text-red-400 mb-4">{error}</p>
                  <button
                    onClick={fetchGalleryImages}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-[#FD7E14] rounded-full hover:bg-[#FD7E14]/90 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <p className="text-white/50 mb-2">No images found</p>
                  <p className="text-white/30 text-sm">Check back soon for updates</p>
                </div>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {filteredImages.map((image, index) => (
                    <motion.div
                      key={image.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => openLightbox(image)}
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-white/5"
                    >
                      {/* Image */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Content */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <span className="text-[#FD7E14] text-xs font-medium tracking-wider uppercase mb-1">
                          {image.category}
                        </span>
                        <h3 className="text-white font-semibold text-lg line-clamp-2">
                          {image.title}
                        </h3>
                        {image.date && (
                          <p className="text-white/50 text-sm mt-1">
                            {new Date(image.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>

                      {/* Corner accent */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && selectedGalleryItem && selectedGalleryItem.allImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation buttons */}
            {selectedGalleryItem.allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Image container */}
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedGalleryItem.allImages[currentImageIndex]}
                alt={selectedGalleryItem.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />

              {/* Image info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="absolute -bottom-20 left-0 right-0 text-center"
              >
                <span className="text-[#FD7E14] text-xs font-medium tracking-wider uppercase">
                  {selectedGalleryItem.category}
                </span>
                <h3 className="text-white font-semibold text-xl mt-1">
                  {selectedGalleryItem.title}
                </h3>
                <p className="text-white/40 text-sm mt-2">
                  {currentImageIndex + 1} / {selectedGalleryItem.allImages.length}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FlickeringFooter />
    </div>
  );
}
