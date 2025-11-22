"use client";

import { useState, useEffect } from "react";
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { getPublicEvents, getPublicProjects, getPublicPrograms } from "@/lib/api";
import Image from "next/image";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  date?: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Parallelize all API calls for faster loading
      const [eventsResult, projectsResult, programsResult] = await Promise.allSettled([
        getPublicEvents(),
        getPublicProjects(),
        getPublicPrograms(),
      ]);
      
      const galleryImages: GalleryImage[] = [];
      
      // Process events - ensure all events with images are included
      if (eventsResult.status === 'fulfilled') {
        const eventsData = eventsResult.value?.data || eventsResult.value || [];
        if (Array.isArray(eventsData) && eventsData.length > 0) {
          eventsData.forEach((event: any) => {
            // Check for image in multiple possible fields
            const imageSrc = event.imageBase64 || event.image || event.imageUrl;
            if (imageSrc) {
              galleryImages.push({
                id: `event-${event._id || event.id}`,
                src: imageSrc,
                alt: event.title || event.name || "Event image",
                title: event.title || event.name || "Event",
                category: "Events",
                date: event.date || event.eventDate,
              });
            }
          });
        }
      } else if (eventsResult.status === 'rejected') {
        console.warn("Failed to fetch events for gallery:", eventsResult.reason);
      }
      
      // Process projects
      if (projectsResult.status === 'fulfilled') {
        const projectsData = projectsResult.value?.data || projectsResult.value || [];
        if (Array.isArray(projectsData)) {
          projectsData.forEach((project: any) => {
            const imageSrc = project.imageBase64 || project.image || project.imageUrl;
            if (imageSrc) {
              galleryImages.push({
                id: `project-${project._id || project.id}`,
                src: imageSrc,
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
      if (programsResult.status === 'fulfilled') {
        const programsData = programsResult.value?.data || programsResult.value || [];
        if (Array.isArray(programsData)) {
          programsData.forEach((program: any) => {
            const imageSrc = program.imageBase64 || program.image || program.imageUrl;
            if (imageSrc) {
              galleryImages.push({
                id: `program-${program._id || program.id}`,
                src: imageSrc,
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
      setError(null);
    } catch (error: any) {
      console.error("Error fetching gallery images:", error);
      setImages([]);
      const errorMessage = error instanceof Error ? error.message : (error?.message || "Failed to load gallery images.");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Events", "Projects", "Programs"];
  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary to-primary/90 py-20 md:py-32 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1
                data-text-animation="reveal-from-bottom"
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                Gallery
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Explore our events, projects, and programs through our photo gallery. Browse images from our latest events, ongoing projects, and active programs.
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {loading ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading gallery...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Gallery</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    fetchGalleryImages();
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : images.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-primary mb-4">No Images Available</h3>
                <p className="text-muted-foreground">
                  Check back soon for gallery images.
                </p>
                <button
                  onClick={fetchGalleryImages}
                  className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Refresh
                </button>
              </div>
            ) : (
              <>
                {/* Category Filter */}
                <div className="mb-8 flex flex-wrap justify-center gap-4">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                        selectedCategory === category
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category} {category !== "All" && `(${images.filter(img => img.category === category).length})`}
                    </button>
                  ))}
                </div>

                {/* Gallery Grid */}
                <div className="mb-8 text-center">
                  <p className="text-muted-foreground">
                    Showing <span className="font-semibold text-primary">{filteredImages.length}</span> {filteredImages.length === 1 ? 'image' : 'images'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 hover-lift-up cursor-pointer"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="font-semibold text-sm mb-1 line-clamp-1">{image.title}</h3>
                          <p className="text-xs opacity-90 mb-1">{image.category}</p>
                          {image.date && (
                            <p className="text-xs opacity-75">
                              {new Date(image.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

