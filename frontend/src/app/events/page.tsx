"use client";

import { useState, useEffect } from "react";
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { Calendar, MapPin, Clock } from "lucide-react";
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
                Our Events
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Join us in making a difference. Discover upcoming events, fundraisers, and community initiatives.
              </p>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {loading ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading events...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Events</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    fetchEvents();
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Retry
                </button>
                <p className="text-sm text-muted-foreground mt-4">
                  Make sure the backend server is running on https://charitytrust-eykm.onrender.com
                </p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-primary mb-4">No Events Available</h3>
                <p className="text-muted-foreground">
                  Check back soon for upcoming events and initiatives.
                </p>
                <button
                  onClick={fetchEvents}
                  className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Refresh
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <p className="text-muted-foreground">
                    Showing <span className="font-semibold text-primary">{events.length}</span> {events.length === 1 ? 'event' : 'events'}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {events.map((event) => (
                    <div
                      key={event.id || event._id}
                      data-animation="fade-up"
                      className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden hover-lift-up group"
                    >
                      <div className="relative w-full h-64 overflow-hidden">
                        <img
                          src={event.image || ""}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-primary mb-4 line-clamp-2">
                          {event.title}
                        </h3>
                        {event.description && (
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {event.description}
                          </p>
                        )}
                        <div className="space-y-2 mb-6">
                          {event.date && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                          )}
                          {event.time && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                          )}
                            {event.location && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
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

