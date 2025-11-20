"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { getToken } from "@/lib/auth-storage";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl: string;
  status: "upcoming" | "past" | "registered";
  registrationLink?: string;
}

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past" | "registered">("all");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      const { getUserContentEvents } = await import("@/lib/api");
      const result = await getUserContentEvents(token);
      
      if (result.success && result.data) {
        const eventsData: Event[] = result.data.map((event: any) => {
          // Map database status to UI status
          let uiStatus: "upcoming" | "past" | "registered" = "upcoming";
          if (event.status === "completed" || event.status === "cancelled") {
            uiStatus = "past";
          } else if (event.status === "upcoming" || event.status === "ongoing") {
            uiStatus = "upcoming";
          }
          
          // Use placeholder for missing images
          const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
          
          return {
            id: event._id || event.id,
            title: event.title || "",
            description: event.description || "",
            date: event.date || event.eventDate || "",
            location: event.location || "TBA",
            imageUrl: event.imageBase64 || event.image || event.imageUrl || placeholderImage,
            status: uiStatus,
            registrationLink: event.registrationLink,
          };
        });
        setEvents(eventsData);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    return event.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-700">Upcoming</Badge>;
      case "registered":
        return <Badge className="bg-green-100 text-green-700">Registered</Badge>;
      case "past":
        return <Badge className="bg-gray-100 text-gray-700">Past</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">My Events</h1>
          <p className="text-[#4a4a4a]">Events you've registered for or attended</p>
        </div>
        <Link href="/events">
          <Button className="bg-[#1a3a3a] hover:bg-[#244543] text-white">
            Browse All Events
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-[#e5e5e5]">
        {[
          { key: "all", label: "All Events" },
          { key: "upcoming", label: "Upcoming" },
          { key: "registered", label: "Registered" },
          { key: "past", label: "Past" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              filter === tab.key
                ? "border-[#1a3a3a] text-[#1a3a3a]"
                : "border-transparent text-[#4a4a4a] hover:text-[#1a3a3a]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="text-center py-12 text-[#4a4a4a]">Loading...</div>
      ) : filteredEvents.length === 0 ? (
        <Card className="border-[#e5e5e5]">
          <CardContent className="py-12 text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-[#d0d0d0]" />
            <p className="text-[#4a4a4a] mb-4">No events found</p>
            <Link href="/events">
              <Button className="bg-[#1a3a3a] hover:bg-[#244543] text-white">
                Browse Events
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="border-[#e5e5e5] overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative w-full h-48">
                {event.imageUrl && event.imageUrl.startsWith('data:') ? (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                ) : event.imageUrl ? (
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#f8f9f8] flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-[#d0d0d0]" />
                  </div>
                )}
                <div className="absolute top-4 right-4">{getStatusBadge(event.status)}</div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#1a1a1a] mb-2 text-lg">{event.title}</h3>
                <p className="text-sm text-[#4a4a4a] mb-4 line-clamp-2">{event.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#4a4a4a]">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(event.date), "MMM dd, yyyy")}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#4a4a4a]">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                </div>
                {event.registrationLink && event.status !== "past" && (
                  <Link href={event.registrationLink}>
                    <Button className="w-full bg-[#1a3a3a] hover:bg-[#244543] text-white">
                      {event.status === "registered" ? "View Details" : "Register Now"}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

