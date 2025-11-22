"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getPublicEvents } from '@/lib/api';

interface Event {
  _id?: string;
  id?: string;
  title: string;
  image?: string;
  imageBase64?: string;
  imageUrl?: string;
  date?: string;
  eventDate?: string;
}

const EventCard = ({ title, image }: { title: string; image: string }) => {
  // Ensure image is a valid string
  const imageSrc = image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
  
  return (
    <div className="group flex flex-col flex-shrink-0 w-[280px] mx-3">
      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
          }}
        />
      </div>
      <h6 className="mt-4 font-semibold text-text-primary text-base">
        {title}
      </h6>
    </div>
  );
};

const EventsBanner = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const result = await getPublicEvents();
      
      // Optimize data extraction
      const eventsData = Array.isArray(result?.data) 
        ? result.data 
        : Array.isArray(result) 
        ? result 
        : [];
      
      if (!eventsData.length) {
        setEvents([]);
        setLoading(false);
        return;
      }
      
      // Optimize mapping
      const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
      
      const mappedEvents = eventsData.map((e: any) => ({
        id: e._id || e.id,
        title: e.title || e.name || "Untitled Event",
        image: e.imageBase64 || e.image || e.imageUrl || placeholderImage,
        date: e.date || e.eventDate,
      }));
      
      setEvents(mappedEvents);
    } catch (error) {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-background-white py-[100px] overflow-hidden">
        <div className="container mx-auto text-center mb-16 px-6 md:px-12 lg:px-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading events...</p>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return null; // Don't show section if no events
  }

  return (
    <section className="bg-background-white py-[100px] overflow-hidden">
      <div className="container mx-auto text-center mb-16 px-6 md:px-12 lg:px-20">
        <h2 className="text-[40px] leading-[48px] font-bold tracking-[-0.01em] text-text-primary">
          This is the new generation of events
        </h2>
        <p className="mt-4 text-body-large text-text-secondary max-w-3xl mx-auto">
          These events not only provide opportunities for fundraising but also serve as platforms to raise awareness about Chari's mission.
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="flex gap-6 px-6 md:px-12 lg:px-20 pb-4">
          {events.map((event) => (
            <EventCard key={event.id || event._id} title={event.title} image={event.image || ''} />
          ))}
        </div>
      </div>

      {/* More Events Button */}
      {events.length > 0 && (
        <div className="container mx-auto text-center mt-12 px-6 md:px-12 lg:px-20">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary/90 btn-hover-bounce btn-shine-effect"
          >
            View All Events
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </section>
  );
};

export default EventsBanner;