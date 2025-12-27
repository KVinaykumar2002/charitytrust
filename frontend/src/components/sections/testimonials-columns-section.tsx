"use client";

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "framer-motion";

// CCT-specific testimonials from beneficiaries, donors, and volunteers
const testimonials = [
  {
    text: "Chiranjeevi Charitable Trust saved my father's life by providing blood during an emergency. Their quick response and compassionate service is truly remarkable.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
    name: "Rajesh Kumar",
    role: "Blood Recipient's Son",
  },
  {
    text: "I've been a monthly donor for 3 years. Knowing that my contribution helps maintain ambulance services and subsidize diagnostics gives me immense satisfaction.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop",
    name: "Priya Sharma",
    role: "Monthly Donor",
  },
  {
    text: "Volunteering with CCT has been life-changing. The medical camps we organize reach remote villages and provide healthcare to those who need it most.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop",
    name: "Amit Patel",
    role: "Volunteer",
  },
  {
    text: "After my corneal transplant through CCT's Eye Bank, I can see again. This trust has given me a new lease on life. I'm forever grateful.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&auto=format&fit=crop",
    name: "Lakshmi Devi",
    role: "Eye Transplant Recipient",
  },
  {
    text: "Our company partners with CCT for CSR initiatives. Their transparency, impact, and dedication to serving communities make them an ideal partner.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop",
    name: "Vikram Reddy",
    role: "Corporate Partner",
  },
  {
    text: "The 50% subsidy in diagnostics helped my family afford critical tests. CCT's support during difficult times shows their true commitment to helping people.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop",
    name: "Sunita Rao",
    role: "Beneficiary",
  },
  {
    text: "I've participated in multiple blood donation drives organized by CCT. The organization and care they show to donors is exceptional.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&auto=format&fit=crop",
    name: "Kiran Malhotra",
    role: "Blood Donor",
  },
  {
    text: "CCT's oxygen banks saved countless lives during COVID-19. Their rapid response and community service during the pandemic was truly heroic.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=400&h=400&auto=format&fit=crop",
    name: "Dr. Anjali Mehta",
    role: "Medical Professional",
  },
  {
    text: "As a volunteer coordinator, I've seen firsthand how CCT transforms lives. Their programs reach the most vulnerable and make a real difference.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop",
    name: "Meera Joshi",
    role: "Volunteer Coordinator",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsColumnsSection() {
  return (
    <section className="bg-gradient-to-b from-white via-slate-50/60 to-white py-20 md:py-32 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container z-10 mx-auto px-6 md:px-12 lg:px-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-primary/20 py-1 px-4 rounded-lg bg-primary/5 text-primary font-medium">
              Testimonials
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-foreground">
            What People Say About CCT
          </h2>
          <p className="text-center mt-5 opacity-75 text-text-secondary">
            Real stories from beneficiaries, donors, volunteers, and partners who have experienced the impact of Chiranjeevi Charitable Trust.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}


