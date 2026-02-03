"use client";

import { useState, useEffect, useRef } from "react";
import { Users, Award, Heart, Target } from "lucide-react";

const leadershipTeam = [
  {
    name: "Leadership Team",
    role: "Strategic Direction",
    description: "Our experienced leadership team brings decades of combined experience in healthcare, social work, and organizational management.",
    icon: <Award className="w-8 h-8 text-primary" />,
  },
  {
    name: "Program Directors",
    role: "Program Execution",
    description: "Dedicated professionals who oversee our various initiatives, ensuring effective implementation and maximum impact.",
    icon: <Target className="w-8 h-8 text-primary" />,
  },
  {
    name: "Medical Advisors",
    role: "Healthcare Excellence",
    description: "Renowned medical professionals who guide our healthcare programs and ensure the highest standards of medical care.",
    icon: <Heart className="w-8 h-8 text-primary" />,
  },
];

const volunteerStats = [
  { number: "50,000+", label: "Active Volunteers", value: 50000, suffix: "+" },
  { number: "100+", label: "Cities Served", value: 100, suffix: "+" },
  { number: "1M+", label: "Lives Touched", value: 1000000, suffix: "+" },
  { number: "25+", label: "Years of Service", value: 25, suffix: "+" },
];

// Animated Counter Component
const AnimatedCounter = ({ targetValue, suffix, duration = 2000, delay = 0 }: { 
  targetValue: number; 
  suffix: string; 
  duration?: number;
  delay?: number;
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Start animation after delay
            setTimeout(() => {
              const startTime = Date.now();
              const startValue = 0;
              const endValue = targetValue;

              const animate = () => {
                const now = Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

                setCount(currentValue);

                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  setCount(endValue);
                }
              };

              requestAnimationFrame(animate);
            }, delay);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [targetValue, duration, delay, hasAnimated]);

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      const millions = num / 1000000;
      // If it's a whole number, don't show decimal
      return millions % 1 === 0 ? millions.toString() + "M" : millions.toFixed(1) + "M";
    } else if (num >= 1000) {
      // For numbers like 50,000, show with comma
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <div ref={counterRef} className="text-4xl md:text-5xl font-bold mb-2 text-white">
      {formatNumber(count)}{suffix}
    </div>
  );
};

const TeamPartnersSection = () => {
  return (
    <section
      id="team-partners"
      className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 py-24 md:py-32 overflow-hidden scroll-mt-24"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-3xl"></div>
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
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6"
          >
            Our Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent dark:via-primary dark:opacity-80 mx-auto mb-6"></div>
          <p
            data-stagger-item
            data-animation="fade-up"
            data-animation-delay="0.2s"
            className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed"
          >
            Dedicated individuals and collaborative organizations working together to create lasting impact
          </p>
        </div>

        {/* Leadership Team */}
        <div
          data-stagger-parent
          className="mb-20"
        >
          <h3
            data-stagger-item
            data-animation="fade-up"
            data-text-animation="reveal-from-bottom"
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white text-center mb-12"
          >
            Leadership Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadershipTeam.map((member, index) => (
              <div
                key={index}
                data-stagger-item
                data-animation="slide-up"
                data-animation-delay={`${index * 0.1}s`}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg dark:shadow-neutral-900/50 border border-gray-200 dark:border-neutral-800 hover-lift-up text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 dark:bg-primary/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  {member.icon}
                </div>
                <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  {member.name}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                  {member.role}
                </p>
                <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteers Section */}
        <div
          data-stagger-parent
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white dark:bg-foreground/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h3
                data-stagger-item
                data-animation="fade-up"
                data-text-animation="reveal-from-bottom"
                className="text-3xl md:text-4xl font-bold text-center mb-12"
              >
                Our Volunteers
              </h3>
              <p
                data-stagger-item
                data-animation="fade-up"
                data-animation-delay="0.2s"
                className="text-lg md:text-xl text-center text-white/90 max-w-3xl mx-auto mb-12"
              >
                Our volunteers are the heart and soul of Chiranjeevi Charitable Trust. Their dedication, 
                compassion, and service mindset drive our mission forward every day. 
                From organizing blood donation drives to supporting community programs, 
                our volunteers make a real difference in countless lives.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {volunteerStats.map((stat, index) => (
                  <div
                    key={index}
                    data-stagger-item
                    data-animation="scale-fade"
                    data-animation-delay={`${index * 0.1}s`}
                    className="text-center"
                  >
                    <AnimatedCounter
                      targetValue={stat.value}
                      suffix={stat.suffix}
                      duration={2000}
                      delay={index * 200}
                    />
                    <div className="text-sm md:text-base text-white/80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Our Organizers - Separate Section */}
        <div
          data-stagger-parent
          className="mb-20"
        >
          <h3
            data-stagger-item
            data-animation="fade-up"
            data-text-animation="reveal-from-bottom"
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white text-center mb-6"
          >
            Our Organizers
          </h3>
          <p
            data-stagger-item
            data-animation="fade-up"
            data-animation-delay="0.1s"
            className="text-lg text-center text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto"
          >
            Our organizers are the backbone of Chiranjeevi Charitable Trust. They plan and execute blood donation camps, eye donation drives, and community programs—bringing our mission to life across the region.
          </p>
        </div>

        {/* Government Hospitals - Separate Section */}
        <div
          data-stagger-parent
        >
          <h3
            data-stagger-item
            data-animation="fade-up"
            data-text-animation="reveal-from-bottom"
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white text-center mb-6"
          >
            Government Hospitals
          </h3>
          <p
            data-stagger-item
            data-animation="fade-up"
            data-animation-delay="0.1s"
            className="text-lg text-center text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto"
          >
            We work with government hospitals and related institutions to extend blood and eye donation services, support public health initiatives, and reach more beneficiaries in need.
          </p>
        </div>

        {/* Call to Action */}
        <div
          data-stagger-parent
          className="mt-20 max-w-4xl mx-auto"
        >
          <div
            data-stagger-item
            data-animation="scale-fade"
            className="bg-gradient-to-br from-secondary/20 to-secondary/10 dark:from-neutral-800/50 dark:to-neutral-900/50 rounded-3xl p-8 md:p-12 border-2 border-secondary/30 dark:border-neutral-700 text-center"
          >
            <h3
              data-text-animation="reveal-from-bottom"
              className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6"
            >
              Join Our Mission
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8">
              Whether you're interested in volunteering, partnering with us, or 
              supporting our programs, we'd love to have you join our community 
              of changemakers. Together, we can create a brighter future for all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-semibold text-white hover:bg-primary/90 btn-hover-bounce btn-shine-effect"
              >
                Get Involved
              </a>
              <a
                href="/#donate"
                className="inline-flex items-center justify-center rounded-full border-2 border-primary px-8 py-4 text-base font-semibold text-primary hover:bg-primary hover:text-white transition-colors btn-hover-bounce"
              >
                Donate Blood
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPartnersSection;

