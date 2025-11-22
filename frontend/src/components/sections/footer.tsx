"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MapPin, Facebook, Instagram, X, MessageSquare } from "lucide-react";
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

// Social Icon Component
const SocialIcon = ({
  href,
  icon: Icon,
}: {
  href: string;
  icon: React.ElementType;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variants={fadeUp}
    whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.1)" }}
    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
  >
    <Icon className="h-5 w-5" />
  </motion.a>
);

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
      className="group relative inline-block py-1 text-[15px] text-white/80 transition-colors hover:text-white"
    >
      {children}
      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
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
      className="bg-primary text-primary-foreground overflow-visible relative"
    >
      <div className="container py-20 relative">
        {/* Circular Text - Top Right */}
        <div className="absolute top-8 right-0 hidden lg:block z-20 pointer-events-none">
          <CircularText
            text="Chiranjeevi Charitable Trust(CCT) * "
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
          />
        </div>

        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-5 lg:gap-x-[60px] relative z-10">
          {/* Left Column */}
          <motion.div
            variants={fadeUp}
            className="space-y-12 lg:col-span-2"
          >
            <div className="space-y-6">
              <motion.div
                variants={fadeUp}
                className="inline-block"
                whileHover={{ scale: 1.03 }}
              >
                <Image
                  src="/navbar_logo.png"
                  alt="Chiranjeevi Charitable Trust logo"
                  width={500}
                  height={48}
                  className="h-12 w-auto"
                />
              </motion.div>

              <motion.h6
                variants={fadeUp}
                className="text-lg font-semibold text-white"
              >
                Our Mission
              </motion.h6>
              <motion.p
                variants={fadeUp}
                className="text-[15px] leading-relaxed text-white/70"
              >
                Chiranjeevi Charitable Trust is dedicated to saving sight and
                lives through compassionate eye and blood care. Every initiative
                is inspired by the belief that timely support, expert treatment,
                and community participation can transform futures.
              </motion.p>
            </div>

            {/* Newsletter */}
            <motion.div variants={staggerContainer} className="space-y-6">
              <motion.h6
                variants={fadeUp}
                className="text-lg font-semibold text-white"
              >
                Stay connected with CCT updates
              </motion.h6>
              <motion.form
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="flex flex-col gap-4 sm:flex-row"
              >
                <input
                  type="email"
                  placeholder="Email"
                  className="h-14 w-full flex-grow rounded-lg border border-white/30 bg-transparent px-4 py-2 text-white outline-none ring-offset-primary transition-colors placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                />
                <button
                  type="submit"
                  className="h-14 flex-shrink-0 rounded-lg bg-secondary px-6 text-base font-medium text-secondary-foreground transition-all hover:bg-mint-green-light hover:scale-105"
                >
                  Subscribe
                </button>
              </motion.form>
            </motion.div>
          </motion.div>

          {/* Middle Column */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <div className="space-y-6">
              <h6 className="text-lg font-semibold text-white">Explore CCT</h6>
              <nav>
                <ul className="space-y-3">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/about">About the Trust</NavLink>
                  <NavLink href="/#programs">Programs & Initiatives</NavLink>
                  <NavLink href="/#donate-blood">Donate Blood</NavLink>
                  <NavLink href="/contact-us">Contact</NavLink>
                </ul>
              </nav>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div variants={fadeUp} className="lg:col-span-2 lg:pr-[220px]">
            <div className="space-y-6">
              <h6 className="text-lg font-semibold text-white">Contact Us</h6>
              <ul className="space-y-4 text-[15px] text-white/80">
                <motion.li variants={fadeUp} className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-white/60" />
                  <span>
                    040 23554849<br />
                    040 23555005<br />
                    98497 56785
                  </span>
                </motion.li>
                <motion.li variants={fadeUp} className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-white/60" />
                  <span>
                    Chiranjeevi Eye and Blood Bank<br />
                    82/A, Road No. 1, Jawahar Colony, Jubilee Hills<br />
                    Hyderabad, Telangana, India
                  </span>
                </motion.li>
              </ul>

              {/* Buttons */}
              <motion.div
                variants={staggerContainer}
                className="flex flex-wrap items-center gap-3 pt-6"
              >
                <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }}>
                  <Link
                    href="tel:9849756785"
                    className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition-all hover:border-white hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  >
                    <Phone className="h-4 w-4" />
                    Donate Blood • Save Lives
                  </Link>
                </motion.div>
                <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }}>
                  <Link
                    href="https://wa.me/919849756785"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white transition-all hover:border-white hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message us on WhatsApp
                  </Link>
                </motion.div>
              </motion.div>

              {/* Social */}
              <motion.p
                variants={fadeUp}
                className="text-sm uppercase tracking-[0.3em] text-white/60"
              >
                Follow @ChiranjeeviCharitableTrust
              </motion.p>
              <motion.div
                variants={staggerContainer}
                className="flex items-center gap-3 pt-4"
              >
                <SocialIcon
                  href="https://www.facebook.com/chiranjeevicharitabletrust"
                  icon={Facebook}
                />
                <SocialIcon
                  href="https://www.instagram.com/chiranjeevi_charitable_trust"
                  icon={Instagram}
                />
                <SocialIcon
                  href="https://twitter.com/ChiruForCharity"
                  icon={X}
                />
              </motion.div>
            </div>
          </motion.div>
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
