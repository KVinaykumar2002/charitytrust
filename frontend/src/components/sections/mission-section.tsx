"use client";

import Image from "next/image";
import { Heart, GraduationCap, Stethoscope, Users, Shield, HandHeart } from "lucide-react";

const missionPillars = [
  {
    icon: <Heart className="w-8 h-8 text-white" />,
    title: "Social Responsibility",
    description: "We believe in giving back to society and creating a positive impact on the lives of those in need. Every initiative is designed to address real-world challenges and provide meaningful solutions.",
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: "Community Development",
    description: "Building stronger, self-reliant communities through education, awareness, and empowerment programs that enable individuals and families to thrive independently.",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    title: "Education Support",
    description: "Providing educational opportunities, scholarships, and learning resources to ensure that every child has access to quality education and the chance to build a better future.",
  },
  {
    icon: <Stethoscope className="w-8 h-8 text-white" />,
    title: "Health Support",
    description: "Ensuring access to essential healthcare services through blood banks, eye banks, medical assistance programs, and health awareness campaigns that save lives and restore hope.",
  },
  {
    icon: <HandHeart className="w-8 h-8 text-white" />,
    title: "Empowerment",
    description: "Empowering individuals and communities by providing skills training, financial assistance, and support systems that enable them to break cycles of poverty and achieve self-sufficiency.",
  },
  {
    icon: <Shield className="w-8 h-8 text-white" />,
    title: "Humanitarian Values",
    description: "Upholding the highest standards of compassion, integrity, and service in everything we do, treating every individual with dignity, respect, and unconditional care.",
  },
];

const MissionSection = () => {
  return (
    <section
      id="mission"
      data-page-animation="scale-fade"
      className="relative bg-primary text-primary-foreground py-24 md:py-32 overflow-hidden scroll-mt-24"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Main Mission Statement */}
        <div
          data-stagger-parent
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2
            data-stagger-item
            data-animation="fade-up"
            data-text-animation="reveal-from-bottom"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Our Mission
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-8"></div>
          <p
            data-stagger-item
            data-animation="fade-up"
            data-animation-delay="0.2s"
            className="text-xl md:text-2xl leading-relaxed text-white/90 max-w-3xl mx-auto"
          >
            To serve humanity with compassion, integrity, and unwavering dedication, 
            creating transformative impact through healthcare, education, and community 
            welfare initiatives that empower individuals and strengthen communities 
            across India.
          </p>
        </div>

        {/* Mission Content Grid */}
        <div
          data-stagger-parent
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
        >
          {/* Left: Image */}
          <div
            data-stagger-item
            data-animation="fade-right"
            data-animation-duration="1s"
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover-image-zoom">
              <Image
                src="/mission_image.jpg"
                alt="CCT Mission - Serving Communities"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/30 rounded-full blur-2xl"></div>
          </div>

          {/* Right: Detailed Mission */}
          <div
            data-stagger-item
            data-animation="fade-left"
            data-animation-duration="1s"
            className="space-y-6"
          >
            <h3
              data-text-animation="reveal-from-bottom"
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              What Drives Us
            </h3>
            <p
              data-animation="fade-in"
              className="text-lg leading-relaxed text-white/90"
            >
              Our mission is rooted in the belief that every individual deserves access 
              to healthcare, education, and opportunities for growth. We are committed 
              to breaking down barriers, bridging gaps, and creating pathways to a 
              better life for those who need it most.
            </p>
            <p
              data-animation="fade-in"
              data-animation-delay="0.1s"
              className="text-lg leading-relaxed text-white/90"
            >
              Through our comprehensive programs in blood and eye donation, medical 
              assistance, disaster relief, and community welfare, we work tirelessly to 
              ensure that no one is left behind. We measure our success not just in 
              numbers, but in the lives transformed, hope restored, and communities 
              empowered to create lasting change.
            </p>
            <p
              data-animation="fade-in"
              data-animation-delay="0.2s"
              className="text-lg leading-relaxed text-white/90"
            >
              Every initiative we launch, every life we touch, and every community we 
              serve is a testament to our unwavering commitment to humanitarian values 
              and social responsibility. Together, we build a future where compassion, 
              care, and opportunity are accessible to all.
            </p>
          </div>
        </div>

        {/* Mission Pillars */}
        <div
          data-stagger-parent
          className="mt-20"
        >
          <h3
            data-stagger-item
            data-animation="fade-up"
            data-text-animation="reveal-from-bottom"
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Our Mission Pillars
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionPillars.map((pillar, index) => (
              <div
                key={index}
                data-stagger-item
                data-animation="slide-up"
                data-animation-delay={`${index * 0.1}s`}
                className="bg-ring rounded-2xl p-8 hover-lift-up group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h4 className="text-xl font-semibold mb-4 text-white">
                  {pillar.title}
                </h4>
                <p className="text-base leading-relaxed text-white/80">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;

