"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const reviews = [
  {
    text: "Amazing organization! Their work creates real impact in communities. CCT's dedication to serving humanity is truly inspiring.",
    user: "@john_doe",
    img: "https://i.pravatar.cc/100?img=1",
  },
  {
    text: "CCT brings hope and support to those who need it most. Beautiful initiative that transforms lives every day.",
    user: "@lisa_m",
    img: "https://i.pravatar.cc/100?img=2",
  },
  {
    text: "Highly trustworthy and transparent charity. Proud to support them! Their blood bank initiative saved my friend's life.",
    user: "@michael87",
    img: "https://i.pravatar.cc/100?img=3",
  },
  {
    text: "Their education programs are life-changing for underprivileged children. Thank you CCT for making a difference!",
    user: "@support_edu",
    img: "https://i.pravatar.cc/100?img=4",
  },
  {
    text: "CCT is doing incredible humanitarian work. Highly recommend supporting their mission!",
    user: "@kindheart",
    img: "https://i.pravatar.cc/100?img=5",
  },
  {
    text: "The eye bank program restored vision to thousands. Truly grateful for their service to society.",
    user: "@vision_hope",
    img: "https://i.pravatar.cc/100?img=6",
  },
  {
    text: "During COVID-19, CCT's oxygen banks were a lifeline. Their quick response saved countless lives.",
    user: "@covid_warrior",
    img: "https://i.pravatar.cc/100?img=7",
  },
  {
    text: "Transparent, compassionate, and effective. CCT sets the standard for charitable organizations.",
    user: "@trust_builder",
    img: "https://i.pravatar.cc/100?img=8",
  },
];

const scrollAnimation = (direction: "left" | "right" = "left") => ({
  animate: {
    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
  },
  transition: {
    duration: 40,
    ease: "linear",
    repeat: Infinity,
    repeatType: "loop" as const,
  },
});

const ReviewsSection = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            data-text-animation="reveal-from-bottom"
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
          >
            What People Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories of impact, hope, and transformation from our community
          </p>
        </div>

        {/* Row 1 (Left Direction) */}
        <div className="mb-8 overflow-hidden">
          <motion.div
            className="flex gap-6"
            {...scrollAnimation("left")}
          >
            {[...reviews, ...reviews].map((review, i) => (
              <div
                key={i}
                className="min-w-[320px] md:min-w-[380px] bg-white border border-border rounded-2xl p-6 shadow-lg hover-lift-up"
              >
                <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src={review.img}
                      alt={review.user}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm md:text-base font-semibold text-primary">
                    {review.user}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 (Right Direction) */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            {...scrollAnimation("right")}
          >
            {[...reviews.slice().reverse(), ...reviews.slice().reverse()].map((review, i) => (
              <div
                key={i}
                className="min-w-[320px] md:min-w-[380px] bg-white border border-border rounded-2xl p-6 shadow-lg hover-lift-up"
              >
                <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                    <Image
                      src={review.img}
                      alt={review.user}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm md:text-base font-semibold text-primary">
                    {review.user}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;

