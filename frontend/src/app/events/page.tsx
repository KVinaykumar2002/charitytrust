"use client";

import { useState, useEffect } from "react";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import FloatingCardGallery from "@/components/ui/floating-card-gallery";
// Icons available if needed for future enhancements
// import { Calendar, MapPin, Clock } from "lucide-react";
import { getPublicEvents } from "@/lib/api";

interface Event {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  image?: string;
  imageBase64?: string;
  imageUrl?: string;
  date?: string;
  eventDate?: string;
  location?: string;
  time?: string;
  status?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await getPublicEvents();
      
      // Backend returns: { success: true, data: events[] }
      // Optimize data extraction
      const eventsData = Array.isArray(result?.data) 
        ? result.data 
        : Array.isArray(result) 
        ? result 
        : Array.isArray(result?.data) 
        ? result.data 
        : [];
      
      if (!eventsData.length) {
        setEvents([]);
        setLoading(false);
        return;
      }
      
      // Optimize mapping with single pass
      const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
      
      const mappedEvents = eventsData.map((e: any) => {
        const imageSrc = e.imageBase64 || e.image || e.imageUrl || placeholderImage;
        
        // Optimize time extraction - only if date exists
        let timeString = e.time || "";
        if (!timeString && e.date) {
          try {
            const dateObj = new Date(e.date);
            if (!isNaN(dateObj.getTime())) {
              timeString = dateObj.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });
            }
          } catch {
            // Silent fail
          }
        }
        
        return {
          id: e._id || e.id,
          title: e.title || e.name || "Untitled Event",
          description: e.description || "",
          image: imageSrc,
          date: e.date || e.eventDate,
          location: e.location || "",
          time: timeString,
          status: e.status || "upcoming",
        };
      });
      
      setEvents(mappedEvents);
      setError(null);
    } catch (error: any) {
      setEvents([]);
      const errorMessage = error instanceof Error ? error.message : (error?.message || "Failed to load events. Please check if the backend server is running.");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 text-white overflow-hidden">
          {/* Background Images */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
              alt="Events background"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FD7E14] rounded-full blur-3xl"></div>
          </div>
          
          {/* Floating decorative images */}
          <div className="absolute top-10 right-10 w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden opacity-30 rotate-6 hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop"
              alt="Community event"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-10 left-10 w-24 h-24 md:w-40 md:h-40 rounded-2xl overflow-hidden opacity-30 -rotate-6 hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop"
              alt="Charity event"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1
                data-text-animation="reveal-from-bottom"
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg"
              >
                Our Events
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-md">
                Join us in making a difference. Discover upcoming events, fundraisers, and community initiatives.
              </p>
            </div>
          </div>
        </section>

        {/* Floating Card Gallery Section */}
        <section className="relative">
          {loading ? (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-300">Loading events...</p>
              </div>
            </div>
          ) : error ? (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
              <div className="text-center px-6">
                <h3 className="text-2xl font-semibold text-red-400 mb-4">Error Loading Events</h3>
                <p className="text-slate-300 mb-4">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    fetchEvents();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all"
                >
                  Retry
                </button>
                <p className="text-sm text-slate-400 mt-4">
                  Make sure the backend server is running on https://charitytrust-eykm.onrender.com
                </p>
              </div>
            </div>
          ) : events.length === 0 ? (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-white mb-4">No Events Available</h3>
                <p className="text-slate-300 mb-4">
                  Check back soon for upcoming events and initiatives.
                </p>
                <button
                  onClick={fetchEvents}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all"
                >
                  Refresh
                </button>
              </div>
            </div>
          ) : (
            <FloatingCardGallery
              cards={events.map((event) => ({
                title: event.title,
                description: event.description || "",
                fullDescription: event.description 
                  ? `${event.description}${event.location ? `\n\n📍 Location: ${event.location}` : ""}${event.date ? `\n📅 Date: ${formatDate(event.date)}` : ""}${event.time ? `\n🕐 Time: ${event.time}` : ""}`
                  : "",
                image: event.image || "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2070&auto=format&fit=crop",
                avatar: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=200&auto=format&fit=crop",
                author: "CCT Foundation",
                category: event.status === "upcoming" ? "Upcoming" : event.status === "past" ? "Past" : "Event",
                tags: [
                  event.location ? `📍 ${event.location}` : null,
                  event.date ? `📅 ${formatDate(event.date)}` : null,
                  event.time ? `🕐 ${event.time}` : null,
                ].filter(Boolean) as string[],
              }))}
              backgroundColor="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
              accentColor="rgba(253, 126, 20, 0.5)"
              maxCards={9}
            />
          )}
        </section>
      </main>
      <FlickeringFooter />
    </div>
  );
}

