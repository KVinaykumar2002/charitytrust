"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Eye, Wind, Hospital, Users, Target, Award, Star, Gift, Globe, Building, GraduationCap, Truck, Shield } from "lucide-react";
import VideoLoader from "@/components/VideoLoader";
import { Timeline } from "@/components/ui/timeline";
import { getPublicTimeline } from "@/lib/api";

interface TimelineEntry {
  _id: string;
  year: string;
  title: string;
  description: string;
  highlights?: string[];
  icon: string;
  iconColor: string;
  images?: { base64?: string; url?: string; alt?: string }[];
  active: boolean;
  order: number;
}

const iconComponents: Record<string, React.ElementType> = {
  heart: Heart,
  eye: Eye,
  wind: Wind,
  hospital: Hospital,
  users: Users,
  target: Target,
  award: Award,
  star: Star,
  gift: Gift,
  globe: Globe,
  building: Building,
  graduation: GraduationCap,
  truck: Truck,
  shield: Shield,
};

const colorClasses: Record<string, string> = {
  red: "from-red-500 to-red-600",
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
  cyan: "from-cyan-500 to-cyan-600",
  yellow: "from-yellow-500 to-yellow-600",
  pink: "from-pink-500 to-pink-600",
  indigo: "from-indigo-500 to-indigo-600",
  teal: "from-teal-500 to-teal-600",
};

const JourneyTimelineSection = () => {
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const result = await getPublicTimeline();
        if (result.success && result.data) {
          setTimelineEntries(result.data);
        }
      } catch (err: any) {
        console.error("Error fetching timeline:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  // Transform timeline entries to the format expected by Timeline component
  const timelineData = timelineEntries.map((entry, index) => {
    const IconComponent = iconComponents[entry.icon] || Heart;
    const gradientClass = colorClasses[entry.iconColor] || colorClasses.red;
    const isLastEntry = index === timelineEntries.length - 1;

    return {
      title: entry.year,
      content: (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 bg-gradient-to-br ${gradientClass} rounded-full flex items-center justify-center shadow-lg`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <h4 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
              {entry.title}
            </h4>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            {entry.description}
          </p>
          
          {/* Highlights */}
          {entry.highlights && entry.highlights.length > 0 && (
            <div className="mb-8">
              {entry.highlights.map((highlight, idx) => (
                <div key={idx} className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
                  {highlight}
                </div>
              ))}
            </div>
          )}
          
          {/* Images */}
          {entry.images && entry.images.length > 0 && (
            <div className={`grid ${entry.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
              {entry.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img.base64 || img.url || ""}
                  alt={img.alt || entry.title}
                  width={500}
                  height={500}
                  className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                />
              ))}
            </div>
          )}

          {/* Future Vision Card for the last entry */}
          {isLastEntry && (
            <div className="mt-12 bg-gradient-to-br from-[#FD7E14] via-[#FD7E14]/90 to-[#FD7E14]/80 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl md:text-3xl font-bold mb-4">Looking Forward</h4>
                <p className="text-sm md:text-base leading-relaxed text-white/90">
                  As we look to the future, our commitment remains unwavering. We envision 
                  expanding our reach to serve even more communities, establishing sustainable 
                  programs that create lasting change, and building a network of compassion 
                  that spans across India. Together, we will continue to transform lives, 
                  restore hope, and build a brighter tomorrow for all.
                </p>
              </div>
            </div>
          )}
        </div>
      ),
    };
  });

  if (loading) {
    return (
      <section
        id="journey"
        className="relative bg-white dark:bg-neutral-950 overflow-hidden scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <div className="max-w-3xl mx-auto text-center mb-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
              Our Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FD7E14] to-transparent mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              A story of growth, impact, and unwavering commitment to serving humanity
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <VideoLoader size="lg" label="Loading journey..." />
          </div>
        </div>
      </section>
    );
  }

  // Show nothing if no timeline entries and there was an error or empty data
  if (timelineEntries.length === 0) {
    return null;
  }

  return (
    <section
      id="journey"
      className="relative bg-white dark:bg-neutral-950 overflow-hidden scroll-mt-24"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8 lg:px-10">
        <div className="max-w-3xl mx-auto text-center mb-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            Our Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FD7E14] to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
            A story of growth, impact, and unwavering commitment to serving humanity
          </p>
        </div>
      </div>

      {/* Timeline Component */}
      <Timeline data={timelineData} />
    </section>
  );
};

export default JourneyTimelineSection;
