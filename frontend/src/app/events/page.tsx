"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, ArrowRight, Users, Search, X } from "lucide-react";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import { getPublicEvents } from "@/lib/api";
import TrustLoader from "@/components/TrustLoader";

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
  dateTimestamp?: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getPublicEvents();
      const eventsData = Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result)
        ? result
        : [];

      const mappedEvents = eventsData.map((e: any) => {
        const imageSrc = e.imageBase64 || e.image || e.imageUrl;
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

        // Determine if event is upcoming or past
        const eventDate = new Date(e.date || e.eventDate);
        const now = new Date();
        const status = eventDate >= now ? "upcoming" : "past";

        return {
          id: e._id || e.id,
          title: e.title || e.name || "Untitled Event",
          description: e.description || "",
          image: imageSrc,
          date: e.date || e.eventDate,
          location: e.location || "",
          time: timeString,
          status: e.status || status,
          dateTimestamp: eventDate.getTime(),
        };
      });

      // Sort events: upcoming first (ascending by date), then past events (descending by date)
      const sortedEvents = mappedEvents.sort((a, b) => {
        const dateA = a.dateTimestamp || 0;
        const dateB = b.dateTimestamp || 0;
        const now = Date.now();

        const aIsUpcoming = dateA >= now;
        const bIsUpcoming = dateB >= now;

        // If both are upcoming or both are past
        if (aIsUpcoming === bIsUpcoming) {
          if (aIsUpcoming) {
            // Upcoming: sort ascending (earliest first)
            return dateA - dateB;
          } else {
            // Past: sort descending (most recent first)
            return dateB - dateA;
          }
        }

        // Upcoming events come before past events
        return aIsUpcoming ? -1 : 1;
      });

      setEvents(sortedEvents);
    } catch (error: any) {
      setEvents([]);
      setError(error?.message || "Failed to load events.");
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
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const formatDateFull = (dateString?: string) => {
    if (!dateString) return { day: "", month: "", year: "" };
    try {
      const date = new Date(dateString);
      return {
        day: date.getDate().toString(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        year: date.getFullYear().toString(),
      };
    } catch {
      return { day: "", month: "", year: "" };
    }
  };

  // Get unique years, months, and days from events
  const getAvailableYears = () => {
    const years = new Set<number>();
    events.forEach((event) => {
      if (event.date) {
        const date = new Date(event.date);
        if (!isNaN(date.getTime())) {
          years.add(date.getFullYear());
        }
      }
    });
    return Array.from(years).sort((a, b) => b - a); // Most recent first
  };

  const getAvailableMonths = () => {
    const months = new Set<number>();
    events.forEach((event) => {
      if (event.date) {
        const date = new Date(event.date);
        if (!isNaN(date.getTime()) && (!selectedYear || date.getFullYear() === parseInt(selectedYear))) {
          months.add(date.getMonth() + 1); // 1-12
        }
      }
    });
    return Array.from(months).sort((a, b) => a - b);
  };

  const getAvailableDays = () => {
    const days = new Set<number>();
    events.forEach((event) => {
      if (event.date) {
        const date = new Date(event.date);
        if (!isNaN(date.getTime()) && 
            (!selectedYear || date.getFullYear() === parseInt(selectedYear)) &&
            (!selectedMonth || date.getMonth() + 1 === parseInt(selectedMonth))) {
          days.add(date.getDate());
        }
      }
    });
    return Array.from(days).sort((a, b) => a - b);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const filteredEvents = events.filter((event) => {
    // Filter by status
    if (filter !== "all" && event.status !== filter) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = event.title?.toLowerCase().includes(query);
      const matchesDescription = event.description?.toLowerCase().includes(query);
      const matchesLocation = event.location?.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDescription && !matchesLocation) {
        return false;
      }
    }

    // Filter by date
    if (event.date) {
      const eventDate = new Date(event.date);
      if (!isNaN(eventDate.getTime())) {
        if (selectedYear && eventDate.getFullYear() !== parseInt(selectedYear)) {
          return false;
        }
        if (selectedMonth && eventDate.getMonth() + 1 !== parseInt(selectedMonth)) {
          return false;
        }
        if (selectedDay && eventDate.getDate() !== parseInt(selectedDay)) {
          return false;
        }
      }
    } else if (selectedYear || selectedMonth || selectedDay) {
      // If event has no date but filters are selected, exclude it
      return false;
    }

    return true;
  });

  const upcomingCount = events.filter((e) => e.status === "upcoming").length;
  const pastCount = events.filter((e) => e.status === "past").length;

  const clearDateFilters = () => {
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedDay("");
  };

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
                Community Initiatives
              </motion.span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                Our Events
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                Join us in making a difference. Discover upcoming events, fundraisers, and community initiatives.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 md:px-12 lg:px-20 mb-12">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-3 gap-4 max-w-xl mx-auto"
            >
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-3xl font-bold text-[#FD7E14]">{events.length}</p>
                <p className="text-sm text-white/50">Total Events</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-3xl font-bold text-green-400">{upcomingCount}</p>
                <p className="text-sm text-white/50">Upcoming</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-3xl font-bold text-white/70">{pastCount}</p>
                <p className="text-sm text-white/50">Completed</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="px-6 md:px-12 lg:px-20 mb-12">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative max-w-2xl mx-auto"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search events by title, description, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-[#FD7E14] focus:bg-white/10 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </motion.div>

            {/* Date Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setSelectedMonth(""); // Reset month when year changes
                  setSelectedDay(""); // Reset day when year changes
                }}
                className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:outline-none focus:border-[#FD7E14] transition-all"
              >
                <option value="">All Years</option>
                {getAvailableYears().map((year) => (
                  <option key={year} value={year} className="bg-[#1a1a1a]">
                    {year}
                  </option>
                ))}
              </select>

              {/* Month Filter */}
              <select
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  setSelectedDay(""); // Reset day when month changes
                }}
                disabled={!selectedYear}
                className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:outline-none focus:border-[#FD7E14] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">All Months</option>
                {getAvailableMonths().map((month) => (
                  <option key={month} value={month} className="bg-[#1a1a1a]">
                    {monthNames[month - 1]}
                  </option>
                ))}
              </select>

              {/* Day Filter */}
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                disabled={!selectedYear || !selectedMonth}
                className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-sm focus:outline-none focus:border-[#FD7E14] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">All Days</option>
                {getAvailableDays().map((day) => (
                  <option key={day} value={day} className="bg-[#1a1a1a]">
                    {day}
                  </option>
                ))}
              </select>

              {/* Clear Date Filters Button */}
              {(selectedYear || selectedMonth || selectedDay) && (
                <button
                  onClick={clearDateFilters}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </button>
              )}
            </motion.div>

            {/* Status Filter Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {[
                { id: "all", label: "All Events", count: events.length },
                { id: "upcoming", label: "Upcoming", count: upcomingCount },
                { id: "past", label: "Past", count: pastCount },
              ].map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  onClick={() => setFilter(item.id as any)}
                  className={`relative px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-300 ${
                    filter === item.id
                      ? "text-black bg-[#FD7E14]"
                      : "text-white/70 bg-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                  {item.count > 0 && (
                    <span
                      className={`ml-2 text-xs ${
                        filter === item.id ? "text-black/70" : "text-white/40"
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </motion.button>
              ))}
            </motion.div>

            {/* Results Count */}
            {(searchQuery || selectedYear || selectedMonth || selectedDay) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white/60 text-sm"
              >
                Showing {filteredEvents.length} of {events.length} events
              </motion.div>
            )}
          </div>
        </section>

        {/* Events Grid */}
        <section className="px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-32">
                <TrustLoader variant="both" size="lg" label="Loading events..." />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <p className="text-red-400 mb-4">{error}</p>
                  <button
                    onClick={fetchEvents}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-[#FD7E14] rounded-full hover:bg-[#FD7E14]/90 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="flex items-center justify-center py-32">
                <div className="text-center">
                  <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/50 mb-2">No events found</p>
                  <p className="text-white/30 text-sm">
                    {filter !== "all"
                      ? "Try selecting a different filter"
                      : "Check back soon for updates"}
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredEvents.map((event, index) => {
                    const dateInfo = formatDateFull(event.date);
                    const isUpcoming = event.status === "upcoming";

                    return (
                      <motion.div
                        key={event.id || index}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group relative bg-[#111] rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-all duration-500"
                      >
                        {/* Image Section */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          {event.image ? (
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#FD7E14]/20 to-[#FD7E14]/5 flex items-center justify-center">
                              <Calendar className="w-12 h-12 text-[#FD7E14]/30" />
                            </div>
                          )}

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          {/* Date Badge */}
                          {dateInfo.day && (
                            <div className="absolute top-4 left-4 bg-[#FD7E14] text-white rounded-xl px-3 py-2 text-center min-w-[60px]">
                              <p className="text-xl font-bold leading-none">{dateInfo.day}</p>
                              <p className="text-xs uppercase tracking-wide opacity-80">{dateInfo.month}</p>
                            </div>
                          )}

                          {/* Status Badge */}
                          <div
                            className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                              isUpcoming
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-white/10 text-white/60 border border-white/10"
                            }`}
                          >
                            {isUpcoming ? "Upcoming" : "Completed"}
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#FD7E14] transition-colors">
                            {event.title}
                          </h3>

                          {event.description && (
                            <p className="text-white/50 text-sm mb-4 line-clamp-2">
                              {event.description}
                            </p>
                          )}

                          {/* Event Details */}
                          <div className="space-y-2 mb-4">
                            {event.location && (
                              <div className="flex items-center gap-2 text-sm text-white/40">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="truncate">{event.location}</span>
                              </div>
                            )}
                            {event.time && (
                              <div className="flex items-center gap-2 text-sm text-white/40">
                                <Clock className="w-4 h-4 flex-shrink-0" />
                                <span>{event.time}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Button */}
                          <button className="w-full py-3 px-4 bg-white/5 hover:bg-[#FD7E14] text-white/70 hover:text-white text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                            <span>{isUpcoming ? "Learn More" : "View Details"}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        {!loading && events.length > 0 && (
          <section className="px-6 md:px-12 lg:px-20 mt-20">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative bg-gradient-to-br from-[#FD7E14]/20 to-[#FD7E14]/5 rounded-3xl p-8 md:p-12 border border-[#FD7E14]/20 overflow-hidden"
              >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FD7E14]/20 rounded-full blur-3xl" />

                <div className="relative z-10 text-center">
                  <Users className="w-12 h-12 text-[#FD7E14] mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Want to Participate?
                  </h2>
                  <p className="text-white/60 mb-6 max-w-xl mx-auto">
                    Join our community initiatives and make a real difference. Volunteer,
                    donate, or simply spread the word about our events.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/donate"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FD7E14] hover:bg-[#E56B00] text-white font-semibold rounded-full transition-colors"
                    >
                      Donate Blood
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-colors"
                    >
                      Learn About Us
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </main>

      <FlickeringFooter />
    </div>
  );
}
