"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import { getPublicGallery } from "@/lib/api";
import VideoLoader from "@/components/VideoLoader";

interface GalleryItem {
  _id: string;
  mainCategory: string;
  subCategory: string;
  title?: string;
  images: string[];
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMain, setSelectedMain] = useState<string>("All");
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxTitle, setLightboxTitle] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getPublicGallery();
        if (!cancelled && res?.data) setItems(res.data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load gallery");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const mainCategories = ["All", ...Array.from(new Set(items.map((i) => i.mainCategory).filter(Boolean)))];
  const subsForMain =
    selectedMain === "All"
      ? []
      : Array.from(
          new Set(
            items
              .filter((i) => i.mainCategory === selectedMain)
              .map((i) => i.subCategory)
              .filter(Boolean)
          )
        ).sort();

  const displayItems: GalleryItem[] =
    selectedMain === "All"
      ? items
      : selectedSub
        ? items.filter((i) => i.mainCategory === selectedMain && i.subCategory === selectedSub)
        : items.filter((i) => i.mainCategory === selectedMain);

  // When "All" or main-only (no sub): show one card per main→sub; click opens all images in lightbox
  const showAsSubCards = selectedMain === "All" || selectedSub === null;

  const flatImages: { src: string; item: GalleryItem; indexInItem: number }[] = [];
  if (!showAsSubCards) {
    displayItems.forEach((item) => {
      (item.images || []).forEach((src, idx) => {
        if (src && src.trim()) flatImages.push({ src, item, indexInItem: idx });
      });
    });
  }

  const openLightbox = (item: GalleryItem, indexInItem: number) => {
    setLightboxImages(item.images || []);
    setLightboxTitle(item.subCategory ? `${item.mainCategory} → ${item.subCategory}` : item.mainCategory);
    setCurrentImageIndex(indexInItem);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => {
      setLightboxImages([]);
      setLightboxTitle("");
    }, 300);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const prevImage = () => {
    const len = lightboxImages.length;
    setCurrentImageIndex((prev) => (prev - 1 + len) % len);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, lightboxImages.length]);

  const placeholder =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTRhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <NavigationHeader />

      <main className="flex-1 pt-32 pb-20">
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

        {/* Main category tabs */}
        <section className="px-6 md:px-12 lg:px-20 mb-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {mainCategories.map((main, index) => {
                const count =
                  main === "All"
                    ? items.length
                    : items.filter((i) => i.mainCategory === main).length;
                return (
                  <motion.button
                    key={main}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    onClick={() => {
                      setSelectedMain(main);
                      setSelectedSub(null);
                    }}
                    className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                      selectedMain === main
                        ? "text-black bg-[#FD7E14]"
                        : "text-white/70 bg-white/5 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {main}
                    {count > 0 && (
                      <span className={`ml-2 text-xs ${selectedMain === main ? "text-black/70" : "text-white/40"}`}>
                        {count}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Sub-category tabs (when a main is selected and has subs) */}
        {subsForMain.length > 0 && (
          <section className="px-6 md:px-12 lg:px-20 mb-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setSelectedSub(null)}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${
                    selectedSub === null
                      ? "text-black bg-[#FD7E14]"
                      : "text-white/60 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  All
                </button>
                {subsForMain.map((sub) => {
                  const count = items
                    .filter((i) => i.mainCategory === selectedMain && i.subCategory === sub)
                    .reduce((acc, i) => acc + (i.images?.length || 0), 0);
                  return (
                    <button
                      key={sub}
                      onClick={() => setSelectedSub(sub)}
                      className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${
                        selectedSub === sub
                          ? "text-black bg-[#FD7E14]"
                          : "text-white/60 bg-white/5 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {sub}
                      {count > 0 && <span className="ml-1.5 opacity-80">({count})</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Gallery grid */}
        <section className="px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-32">
                <VideoLoader size="lg" label="Loading gallery..." />
              </div>
            ) : error ? (
              <div className="flex justify-center py-32">
                <div className="text-center">
                  <p className="text-red-400 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-[#FD7E14] rounded-full hover:bg-[#FD7E14]/90"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : showAsSubCards ? (
              displayItems.length === 0 ? (
                <div className="flex justify-center py-32 text-center">
                  <p className="text-white/50 mb-2">No categories yet.</p>
                  <p className="text-white/30 text-sm">Admins can add main and sub-categories with images.</p>
                </div>
              ) : (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence mode="popLayout">
                    {displayItems.map((item, index) => {
                      const thumb = (item.images && item.images[0]) || placeholder;
                      const imageCount = item.images?.length || 0;
                      return (
                        <motion.div
                          key={item._id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          onClick={() => openLightbox(item, 0)}
                          className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-white/5"
                        >
                          <img
                            src={thumb}
                            alt={item.title || `${item.mainCategory} → ${item.subCategory}`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            onError={(e) => {
                              e.currentTarget.src = placeholder;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute inset-0 p-5 flex flex-col justify-end">
                            <span className="text-[#FD7E14] text-xs font-medium tracking-wider uppercase mb-1">
                              {item.mainCategory} → {item.subCategory}
                            </span>
                            {item.title && (
                              <h3 className="text-white font-semibold text-lg line-clamp-2">{item.title}</h3>
                            )}
                            <p className="text-white/60 text-sm mt-1">{imageCount} image{imageCount !== 1 ? "s" : ""} · Click to view</p>
                          </div>
                          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              )
            ) : flatImages.length === 0 ? (
              <div className="flex justify-center py-32 text-center">
                <p className="text-white/50 mb-2">No images in this sub-category yet.</p>
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {flatImages.map(({ src, item, indexInItem }, index) => (
                    <motion.div
                      key={`${item._id}-${indexInItem}`}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => openLightbox(item, indexInItem)}
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-white/5"
                    >
                      <img
                        src={src || placeholder}
                        alt={item.title || `${item.subCategory} image`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = placeholder;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <span className="text-[#FD7E14] text-xs font-medium tracking-wider uppercase mb-1">
                          {item.mainCategory} → {item.subCategory}
                        </span>
                        {item.title && (
                          <h3 className="text-white font-semibold text-lg line-clamp-2">{item.title}</h3>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
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
        {lightboxOpen && lightboxImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
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
                src={lightboxImages[currentImageIndex]}
                alt=""
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="absolute -bottom-20 left-0 right-0 text-center">
                <span className="text-[#FD7E14] text-xs font-medium tracking-wider uppercase">{lightboxTitle}</span>
                <p className="text-white/40 text-sm mt-2">
                  {currentImageIndex + 1} / {lightboxImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FlickeringFooter />
    </div>
  );
}
