"use client";

import Image from "next/image";
import { Target, Globe, Lightbulb, TrendingUp, Heart, Sparkles } from "lucide-react";

const visionGoals = [
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: "Nationwide Reach",
    description: "Expanding our presence to serve communities across all states of India, ensuring no one is left behind.",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: "Sustainable Change",
    description: "Creating programs and initiatives that generate long-term, sustainable impact rather than temporary relief.",
  },
  {
    icon: <Heart className="w-8 h-8 text-primary" />,
    title: "Enhanced Quality of Life",
    description: "Improving healthcare access, educational opportunities, and living conditions for millions of people.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: "Equal Opportunities",
    description: "Building a society where everyone, regardless of background, has access to opportunities for growth and success.",
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Innovation & Technology",
    description: "Leveraging technology and innovative solutions to maximize our impact and reach more people efficiently.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    title: "Community Empowerment",
    description: "Empowering communities to become self-reliant and create their own pathways to prosperity and well-being.",
  },
];

const VisionSection = () => {
  return (
    <section
      id="vision"
      data-page-animation="staggered-fade"
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-24 md:py-32 overflow-hidden scroll-mt-24"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Main Vision Statement */}
        <div
          data-stagger-parent
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2
            data-stagger-item
            data-animation="fade-up"
            data-text-animation="reveal-from-bottom"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6"
          >
            Our Vision
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
          <p
            data-stagger-item
            data-animation="fade-up"
            data-animation-delay="0.2s"
            className="text-xl md:text-2xl leading-relaxed text-muted-foreground max-w-3xl mx-auto"
          >
            To create a society where every individual has access to healthcare, 
            education, and opportunities for growth—a future where compassion, 
            equality, and sustainable development are the foundation of a thriving 
            community.
          </p>
        </div>

        {/* Vision Content Grid */}
        <div
          data-stagger-parent
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        >
          {/* Left: Vision Details */}
          <div
            data-stagger-item
            data-animation="fade-right"
            data-animation-duration="1s"
            className="space-y-6"
          >
            <h3
              data-text-animation="reveal-from-bottom"
              className="text-3xl md:text-4xl font-bold text-primary mb-6"
            >
              Looking Forward
            </h3>
            <p
              data-animation="fade-in"
              className="text-lg leading-relaxed text-muted-foreground"
            >
              Our vision extends far beyond immediate relief. We envision a future 
              where sustainable change is the norm, where communities are empowered 
              to thrive independently, and where every person has the opportunity to 
              reach their full potential.
            </p>
            <p
              data-animation="fade-in"
              data-animation-delay="0.1s"
              className="text-lg leading-relaxed text-muted-foreground"
            >
              We see a society where healthcare is accessible to all, education is 
              a right not a privilege, and economic opportunities are available to 
              everyone regardless of their background. Through our long-term goals 
              and strategic initiatives, we are building towards this future, one 
              life at a time.
            </p>
            <p
              data-animation="fade-in"
              data-animation-delay="0.2s"
              className="text-lg leading-relaxed text-muted-foreground"
            >
              Our commitment to creating sustainable change means that every program 
              we launch is designed to have lasting impact. We don't just provide 
              solutions—we build systems, empower communities, and create pathways 
              that enable people to build better futures for themselves and their 
              families.
            </p>
          </div>

          {/* Right: Image */}
          <div
            data-stagger-item
            data-animation="fade-left"
            data-animation-duration="1s"
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover-image-zoom">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                alt="CCT Vision - Building the Future"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>

        {/* Vision Goals Grid */}
        <div
          data-stagger-parent
          className="mt-20"
        >
          <h3
            data-stagger-item
            data-animation="fade-up"
            data-text-animation="reveal-from-bottom"
            className="text-3xl md:text-4xl font-bold text-primary text-center mb-12"
          >
            Our Long-Term Goals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visionGoals.map((goal, index) => (
              <div
                key={index}
                data-stagger-item
                data-animation="slide-up"
                data-animation-delay={`${index * 0.1}s`}
                className="bg-white rounded-2xl p-8 shadow-lg border border-border hover-lift-up group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  {goal.icon}
                </div>
                <h4 className="text-xl font-semibold text-primary mb-4">
                  {goal.title}
                </h4>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
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
              <h3
                data-text-animation="reveal-from-bottom"
                className="text-3xl md:text-4xl font-bold mb-6"
              >
                Join Us in Building the Future
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/90 max-w-3xl mx-auto">
                Together, we can create a society where everyone has the opportunity 
                to thrive. Your support, whether through donations, volunteering, 
                or spreading awareness, helps us move closer to our vision every day. 
                Let's build a brighter tomorrow, together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;

