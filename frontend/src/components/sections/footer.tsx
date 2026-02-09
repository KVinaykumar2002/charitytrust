"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Instagram, Facebook, Twitter, Youtube, Linkedin, Droplet, Eye, Award } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import CircularText from "@/components/ui/circular-text";

// Motion Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};


// Navigation Link
const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <motion.li variants={fadeUp}>
    <Link
      href={href}
      className="group relative inline-block py-1 text-[15px] text-[#FD7E14] transition-colors hover:text-[#FFB366]"
    >
      {children}
      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-[#FD7E14] transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
    </Link>
  </motion.li>
);

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="bg-black text-white overflow-visible relative"
    >
      <div className="container py-20 relative">
        {/* Circular Text - Top Right */}
        <div className="absolute top-8 right-0 hidden lg:block z-20 pointer-events-none">
          <CircularText
            text="Chiranjeevi Charitable Trust * "
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
          />
        </div>

        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-[1.2fr_1fr] lg:gap-x-20 xl:gap-x-32 relative z-10">
          {/* Left Column - About Chiranjeevi Charitable Trust */}
          <motion.div
            variants={fadeUp}
            className="space-y-6"
          >
            {/* Logo */}
            <motion.div
              variants={fadeUp}
              className="inline-block mb-6"
              whileHover={{ scale: 1.03 }}
            >
              <Link href="/">
                <Image
                  src="/footerFinalLogo.png?v=2"
                  alt="Chiranjeevi Charitable Trust logo"
                  width={500}
                  height={150}
                  className="h-28 md:h-32 lg:h-40 w-auto"
                />
              </Link>
            </motion.div>

            {/* Mission Statement */}
            <motion.p
              variants={fadeUp}
              className="text-[15px] leading-relaxed text-white/90 mb-6"
            >
              Chiranjeevi Charitable Trust is dedicated to saving sight and
              lives through compassionate eye and blood care. Every initiative
              is inspired by the belief that timely support, expert treatment,
              and community participation can transform futures.
            </motion.p>

            {/* Certifications: AICPA SOC 2 + ISO 9002 */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 flex-wrap"
            >
              <div className="bg-white rounded-full border border-black/20 px-4 py-2.5 inline-flex flex-col items-center justify-center min-w-[60px]">
                <span className="text-black text-xs font-semibold leading-tight">AICPA</span>
                <span className="text-black text-xs font-semibold leading-tight">SOC 2</span>
              </div>
              <div
                className="bg-white rounded-lg border border-black/20 px-3 py-2.5 inline-flex items-center gap-2 min-w-[72px]"
                title="ISO 9002 Certified"
              >
                <Award className="h-5 w-5 shrink-0 text-[#FD7E14]" aria-hidden />
                <div className="flex flex-col items-center">
                  <span className="text-black text-xs font-semibold leading-tight">ISO</span>
                  <span className="text-black text-xs font-semibold leading-tight">9002</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Columns - Navigation & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
            {/* Column 1: Explore Chiranjeevi Charitable Trust */}
            <motion.div variants={fadeUp}>
              <h6 className="text-base font-semibold text-white mb-5">Explore Chiranjeevi Charitable Trust</h6>
              <nav>
                <ul className="space-y-3">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/about">About the Trust</NavLink>
                  <NavLink href="/#programs">Programs & Initiatives</NavLink>
                  <motion.li variants={fadeUp} className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 shrink-0 text-[#FD7E14]" />
                    <Link href="/#donate-blood" className="group relative inline-block py-1 text-[15px] text-[#FD7E14] transition-colors hover:text-[#FFB366]">
                      Donate Blood
                      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-[#FD7E14] transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                    </Link>
                  </motion.li>
                </ul>
              </nav>
            </motion.div>

            {/* Column 2: Get Involved */}
            <motion.div variants={fadeUp}>
              <h6 className="text-base font-semibold text-white mb-5">Get Involved</h6>
              <nav>
                <ul className="space-y-3">
                  <NavLink href="/volunteer">Volunteer</NavLink>
                  <motion.li variants={fadeUp} className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 shrink-0 text-[#FD7E14]" />
                    <Link href="/blood-donation" className="group relative inline-block py-1 text-[15px] text-[#FD7E14] transition-colors hover:text-[#FFB366]">
                      Blood Donation Camps
                      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-[#FD7E14] transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                    </Link>
                  </motion.li>
                  <motion.li variants={fadeUp} className="flex items-center gap-2">
                    <Eye className="h-4 w-4 shrink-0 text-[#FD7E14]" />
                    <Link href="/eye-donation" className="group relative inline-block py-1 text-[15px] text-[#FD7E14] transition-colors hover:text-[#FFB366]">
                      Eye Donation Pledge
                      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-[#FD7E14] transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                    </Link>
                  </motion.li>
                  <NavLink href="/partnerships">Collaborations</NavLink>
                </ul>
              </nav>
            </motion.div>

            {/* Column 3: Contact Us */}
            <motion.div variants={fadeUp}>
              <h6 className="text-base font-semibold text-white mb-5">Contact Us</h6>
              <ul className="space-y-3 text-[15px] text-[#FD7E14]">
                <motion.li variants={fadeUp} className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0 text-[#FD7E14]" />
                  <a href="tel:04023554849" className="hover:text-[#FFB366] transition-colors">
                    040 23554849
                  </a>
                </motion.li>
                <motion.li variants={fadeUp} className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0 text-[#FD7E14]" />
                  <a href="tel:04023555005" className="hover:text-[#FFB366] transition-colors">
                    040 23555005
                  </a>
                </motion.li>
                <motion.li variants={fadeUp} className="flex items-center gap-3">
                  <Phone className="h-4 w-4 flex-shrink-0 text-[#FD7E14]" />
                  <a href="tel:9849756785" className="hover:text-[#FFB366] transition-colors">
                    98497 56785
                  </a>
                </motion.li>
                <motion.li variants={fadeUp} className="flex items-center gap-3">
                  <Mail className="h-4 w-4 flex-shrink-0 text-[#FD7E14]" />
                  <a href="mailto:info@chiranjeevicharitabletrust.com" className="hover:text-[#FFB366] transition-colors break-all">
                    info@chiranjeevicharitabletrust.com
                  </a>
                </motion.li>
                <motion.li variants={fadeUp} className="flex items-center gap-3">
                  <FaWhatsapp className="h-4 w-4 flex-shrink-0 text-[#25D366]" />
                  <a href="https://wa.me/919063270884" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFB366] transition-colors">
                    Message us on WhatsApp
                  </a>
                </motion.li>
                <motion.li variants={fadeUp} className="flex items-start gap-3 pt-1">
                  <MapPin className="h-4 w-4 flex-shrink-0 text-[#FD7E14] mt-0.5" />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Chiranjeevi+Eye+and+Blood+Bank+82+A+Road+No+1+Jawahar+Colony+Jubilee+Hills+Hyderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leading-relaxed hover:text-[#FFB366] transition-colors"
                  >
                    Jubilee Hills, Hyderabad — Get directions
                  </a>
                </motion.li>
              </ul>
              {/* Social Media Icons */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-4 pt-6 mt-6 border-t border-white/10"
              >
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#FD7E14] transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#FD7E14] transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#FD7E14] transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#FD7E14] transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#FD7E14] transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeUp}
          className="mt-20 border-t border-white/10 pt-8 text-center text-sm text-white/60"
        >
          <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
            <p>© Chiranjeevi Charitable Trust. All rights reserved.</p>
            <p>Serving with love, compassion, and community.</p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
