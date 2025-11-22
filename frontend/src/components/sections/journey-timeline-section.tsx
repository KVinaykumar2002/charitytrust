"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Calendar, Heart, Eye, Wind, Hospital, Users, Award, Target } from "lucide-react";

const timelineEvents = [
  {
    year: "1998",
    title: "The Beginning",
    description: "Chiranjeevi Charity Trust was founded with a vision to serve humanity. The journey began with a small team of dedicated volunteers committed to making a difference in people's lives.",
    icon: <Heart className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=600&auto=format&fit=crop",
    color: "from-red-500 to-red-600",
  },
  {
    year: "2000-2005",
    title: "Blood Bank Initiative",
    description: "Launched our first major initiative - the Blood Bank program. Over the years, we've collected and distributed over 10 lakh units of life-saving blood, saving countless lives across India.",
    icon: <Heart className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600&auto=format&fit=crop",
    color: "from-red-500 to-red-600",
  },
  {
    year: "2005-2010",
    title: "Eye Bank Expansion",
    description: "Established the Eye Bank program, performing over 10,000 corneal transplants and restoring vision to thousands of visually challenged individuals. This milestone marked our commitment to comprehensive healthcare.",
    icon: <Eye className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
    color: "from-blue-500 to-blue-600",
  },
  {
    year: "2010-2015",
    title: "Community Welfare Programs",
    description: "Expanded our reach with comprehensive community welfare programs, including education support, medical assistance, and disaster relief initiatives. We touched over 100,000 lives during this period.",
    icon: <Users className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
    color: "from-green-500 to-green-600",
  },
  {
    year: "2015-2020",
    title: "Hospital for Movie Workers",
    description: "Initiated the construction of a dedicated hospital in Chitrapuri, Hyderabad, to provide free primary healthcare for movie workers. This project represents our commitment to supporting those who entertain and inspire us.",
    icon: <Hospital className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop",
    color: "from-purple-500 to-purple-600",
  },
  {
    year: "2020-2021",
    title: "COVID-19 Relief - Oxygen Banks",
    description: "During the pandemic, we established 32 oxygen banks across Telugu states, saving thousands of lives. Provided ₹7 lakhs worth of accident insurance and 50% subsidy in diagnostics, supporting 15,000+ daily wage film workers.",
    icon: <Wind className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1600959907703-125ba1374a12?q=80&w=600&auto=format&fit=crop",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    year: "2021-Present",
    title: "Digital Transformation & Future Goals",
    description: "Embracing technology to reach more people, we've launched digital platforms for donations, volunteer registration, and program management. Our future goals include expanding to 50+ cities, establishing 100+ healthcare centers, and impacting 10 million lives by 2030.",
    icon: <Target className="w-6 h-6 text-white" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
    color: "from-orange-500 to-orange-600",
  },
];

const JourneyTimelineSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const updateLineHeight = () => {
      const timelineRect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      const timelineBottom = timelineRect.bottom;

      // Calculate scroll progress
      // Line starts growing when timeline enters viewport (top reaches 80% of viewport)
      // Line completes when timeline bottom reaches 20% of viewport
      const startTrigger = windowHeight * 0.8;
      const endTrigger = windowHeight * 0.2;
      
      let progress = 0;
      
      if (timelineTop <= startTrigger) {
        // Timeline has entered the trigger zone
        if (timelineBottom <= endTrigger) {
          // Timeline has completely passed - line is fully revealed
          progress = 1;
        } else {
          // Timeline is in progress - calculate how much has scrolled
          const scrolledDistance = startTrigger - timelineTop;
          const totalDistance = startTrigger - (timelineBottom - timelineHeight);
          progress = Math.min(1, Math.max(0, scrolledDistance / totalDistance));
        }
      }
      
      // Set the line height (minimum 10% for initial visibility)
      const minHeight = 10;
      const maxHeight = 100;
      setLineHeight(minHeight + (progress * (maxHeight - minHeight)));
    };

    // Initial calculation
    updateLineHeight();

    // Update on scroll with requestAnimationFrame for smooth performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateLineHeight();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateLineHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateLineHeight);
    };
  }, []);

  return (
    <section
      id="journey"
      data-page-animation="staggered-fade"
      className="relative bg-gradient-to-b from-white to-gray-50 py-24 md:py-32 overflow-hidden scroll-mt-24"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div
          data-stagger-parent
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2
            data-stagger-item
            data-animation="fade-up"
            data-text-animation="reveal-from-bottom"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6"
          >
            Our Journey
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6"></div>
          <p
            data-stagger-item
            data-animation="fade-up"
            data-animation-delay="0.2s"
            className="text-xl text-muted-foreground leading-relaxed"
          >
            A story of growth, impact, and unwavering commitment to serving humanity
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Vertical Timeline Line */}
          <div 
            ref={lineRef}
            className="absolute left-1/2 w-1 hidden md:block z-0"
            style={{ 
              background: 'linear-gradient(to bottom, #1a3a3a 0%, #b8f4d3 50%, #1a3a3a 100%)',
              top: 0,
              transform: 'translateX(-50%)',
              borderRadius: '2px',
              height: `${lineHeight}%`,
              transition: 'height 0.3s ease-out',
            }}
          ></div>

          {/* Timeline Events */}
          <div className="space-y-12 md:space-y-16 relative">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                data-stagger-item
                data-animation="fade-up"
                data-animation-delay={`${index * 0.15}s`}
                className={`relative flex flex-col md:flex-row items-center gap-8 min-h-[200px] ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot - Centered on the line */}
                <div 
                  data-animation="scale-fade"
                  data-animation-delay={`${index * 0.15 + 0.3}s`}
                  className="absolute left-1/2 w-6 h-6 bg-primary rounded-full border-[3px] border-white shadow-lg z-30 hidden md:block"
                  style={{
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                ></div>

                {/* Content Card */}
                <div className={`md:w-[45%] ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} relative z-10`}>
                  <div 
                    data-animation="fade-up"
                    data-animation-delay={`${index * 0.15 + 0.1}s`}
                    className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-border hover-lift-up relative overflow-hidden group"
                  >
                    {/* Decorative Gradient */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${event.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-3 mb-4">
                        <div 
                          data-animation="scale-fade"
                          data-animation-delay={`${index * 0.15 + 0.2}s`}
                          className={`w-12 h-12 bg-gradient-to-br ${event.color} rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}
                        >
                          {event.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-semibold text-primary">{event.year}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-primary">{event.title}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className={`md:w-[45%] flex justify-center relative z-10 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                  <div 
                    data-animation="zoom-in"
                    data-animation-delay={`${index * 0.15 + 0.2}s`}
                    className="relative w-full max-w-sm"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-xl hover-image-zoom">
                      <Image
                        src={event.image}
                        alt={event.title}
                        width={400}
                        height={300}
                        className="w-full h-auto object-cover aspect-[4/3]"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-20`}></div>
                    </div>
                    {/* Decorative Element */}
                    <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${event.color} rounded-full opacity-20 blur-2xl`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Vision Card */}
        <div
          data-stagger-parent
          className="mt-20 max-w-4xl mx-auto"
        >
          <div
            data-stagger-item
            data-animation="scale-fade"
            className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3
                data-text-animation="reveal-from-bottom"
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Looking Forward
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/90 max-w-3xl mx-auto">
                As we look to the future, our commitment remains unwavering. We envision 
                expanding our reach to serve even more communities, establishing sustainable 
                programs that create lasting change, and building a network of compassion 
                that spans across India. Together, we will continue to transform lives, 
                restore hope, and build a brighter tomorrow for all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimelineSection;

