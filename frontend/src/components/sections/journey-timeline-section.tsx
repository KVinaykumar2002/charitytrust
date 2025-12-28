"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Eye, Wind, Hospital, Users, Target, Award, Star, Gift, Globe, Building, GraduationCap, Truck, Shield, Loader2 } from "lucide-react";
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

// Fallback timeline data for when API is unavailable
const fallbackTimelineData = [
  {
    _id: "1",
    year: "1998",
    title: "The Beginning",
    description: "Chiranjeevi Charity Trust was founded with a vision to serve humanity. The journey began with a small team of dedicated volunteers committed to making a difference in people's lives.",
    highlights: [],
    icon: "heart",
    iconColor: "red",
    images: [
      { url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600&auto=format&fit=crop", alt: "CCT Foundation beginning" },
      { url: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=600&auto=format&fit=crop", alt: "Volunteers helping" },
    ],
    active: true,
    order: 0,
  },
  {
    _id: "2",
    year: "2000-2005",
    title: "Blood Bank Initiative",
    description: "Launched our first major initiative - the Blood Bank program. Over the years, we've collected and distributed over 10 lakh units of life-saving blood, saving countless lives across India.",
    highlights: [
      "✅ Established state-of-the-art blood collection centers",
      "✅ Over 10 lakh units of blood collected",
      "✅ Free blood for emergency patients",
      "✅ Mobile blood donation camps across Telugu states",
    ],
    icon: "heart",
    iconColor: "red",
    images: [
      { url: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=600&auto=format&fit=crop", alt: "Blood donation" },
      { url: "https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?q=80&w=600&auto=format&fit=crop", alt: "Blood bank facility" },
    ],
    active: true,
    order: 1,
  },
  {
    _id: "3",
    year: "2005-2010",
    title: "Eye Bank Expansion",
    description: "Established the Eye Bank program, performing over 10,000 corneal transplants and restoring vision to thousands of visually challenged individuals. This milestone marked our commitment to comprehensive healthcare.",
    highlights: [
      "✅ Over 10,000 corneal transplants performed",
      "✅ Free eye surgeries for the underprivileged",
      "✅ Eye donation awareness campaigns",
    ],
    icon: "eye",
    iconColor: "blue",
    images: [
      { url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop", alt: "Eye care program" },
      { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop", alt: "Medical care" },
    ],
    active: true,
    order: 2,
  },
  {
    _id: "4",
    year: "2010-2015",
    title: "Community Welfare Programs",
    description: "Expanded our reach with comprehensive community welfare programs, including education support, medical assistance, and disaster relief initiatives. We touched over 100,000 lives during this period.",
    highlights: [],
    icon: "users",
    iconColor: "green",
    images: [
      { url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop", alt: "Community welfare" },
      { url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600&auto=format&fit=crop", alt: "Education support" },
      { url: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=600&auto=format&fit=crop", alt: "Helping communities" },
      { url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop", alt: "Disaster relief" },
    ],
    active: true,
    order: 3,
  },
  {
    _id: "5",
    year: "2015-2020",
    title: "Hospital for Movie Workers",
    description: "Initiated the construction of a dedicated hospital in Chitrapuri, Hyderabad, to provide free primary healthcare for movie workers. This project represents our commitment to supporting those who entertain and inspire us.",
    highlights: [],
    icon: "hospital",
    iconColor: "purple",
    images: [
      { url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop", alt: "Hospital construction" },
      { url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop", alt: "Healthcare facility" },
    ],
    active: true,
    order: 4,
  },
  {
    _id: "6",
    year: "2020-2021",
    title: "COVID-19 Relief - Oxygen Banks",
    description: "During the pandemic, we established 32 oxygen banks across Telugu states, saving thousands of lives. Provided ₹7 lakhs worth of accident insurance and 50% subsidy in diagnostics, supporting 15,000+ daily wage film workers.",
    highlights: [
      "✅ 32 Oxygen Banks established across Telugu states",
      "✅ ₹7 Lakhs accident insurance coverage",
      "✅ 50% subsidy in diagnostic services",
      "✅ 15,000+ daily wage workers supported",
      "✅ Essential supplies distribution to families",
    ],
    icon: "wind",
    iconColor: "cyan",
    images: [
      { url: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=600&auto=format&fit=crop", alt: "COVID relief" },
      { url: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=600&auto=format&fit=crop", alt: "Oxygen supply" },
      { url: "https://images.unsplash.com/photo-1609220136736-443140cffec6?q=80&w=600&auto=format&fit=crop", alt: "Medical assistance" },
      { url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600&auto=format&fit=crop", alt: "Community support" },
    ],
    active: true,
    order: 5,
  },
  {
    _id: "7",
    year: "2021-Present",
    title: "Digital Transformation & Future Goals",
    description: "Embracing technology to reach more people, we've launched digital platforms for donations, volunteer registration, and program management. Our future goals include expanding to 50+ cities, establishing 100+ healthcare centers, and impacting 10 million lives by 2030.",
    highlights: [
      "🎯 Expand to 50+ cities across India",
      "🏥 Establish 100+ healthcare centers",
      "👥 Impact 10 million lives by 2030",
      "💻 Digital-first approach for donations & volunteering",
      "🌱 Sustainable community development programs",
    ],
    icon: "target",
    iconColor: "orange",
    images: [
      { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop", alt: "Digital transformation" },
      { url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop", alt: "Future goals" },
    ],
    active: true,
    order: 6,
  },
];

const JourneyTimelineSection = () => {
  const [timelineEntries, setTimelineEntries] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const result = await getPublicTimeline();
        if (result.success && result.data && result.data.length > 0) {
          setTimelineEntries(result.data);
        } else {
          // Use fallback data if no data from API
          setTimelineEntries(fallbackTimelineData);
        }
      } catch (err: any) {
        console.error("Error fetching timeline:", err);
        // Use fallback data on error
        setTimelineEntries(fallbackTimelineData);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  // Transform timeline entries to the format expected by Timeline component
  const timelineData = timelineEntries.map((entry) => {
    const IconComponent = iconComponents[entry.icon] || Heart;
    const gradientClass = colorClasses[entry.iconColor] || colorClasses.red;

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
          {entry.order === timelineEntries.length - 1 && (
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
            <Loader2 className="h-8 w-8 animate-spin text-[#FD7E14]" />
          </div>
        </div>
      </section>
    );
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
