"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const CONTACT = {
  phones: [
    { label: "040 23554849", href: "tel:04023554849" },
    { label: "040 23555005", href: "tel:04023555005" },
    { label: "98497 56785", href: "tel:9849756785" },
  ],
  whatsapp: { label: "Message us on WhatsApp", href: "https://wa.me/919063270884", number: "+91 9063270884" },
  email: { label: "info@chiranjeevicharitabletrust.com", href: "mailto:info@chiranjeevicharitabletrust.com" },
  address: {
    text: "Chiranjeevi Eye and Blood Bank, 82/A, Road No. 1, Jawahar Colony, Jubilee Hills, Hyderabad, Telangana, India",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Chiranjeevi+Eye+and+Blood+Bank+82+A+Road+No+1+Jawahar+Colony+Jubilee+Hills+Hyderabad",
    embedQuery: "Chiranjeevi+Eye+and+Blood+Bank+82%2FA+Road+No+1+Jawahar+Colony+Jubilee+Hills+Hyderabad",
  },
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 bg-white dark:bg-[#0a0a0a] py-16 md:py-24 overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-[#666] dark:text-white/70 max-w-2xl mx-auto text-base md:text-lg">
            Reach out for blood donation, eye donation pledges, or general inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 max-w-7xl mx-auto">
          {/* Contact info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#333] bg-[#fafafa] dark:bg-[#111] p-6 space-y-6">
              {/* Phone */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FD7E14]">Phone</p>
                <ul className="space-y-2">
                  {CONTACT.phones.map((p) => (
                    <li key={p.href}>
                      <a
                        href={p.href}
                        className="flex items-center gap-3 text-[#1a1a1a] dark:text-white hover:text-[#FD7E14] transition-colors"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-[#FD7E14]" />
                        <span>{p.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FD7E14]">Email</p>
                <a
                  href={CONTACT.email.href}
                  className="flex items-center gap-3 text-[#1a1a1a] dark:text-white hover:text-[#FD7E14] transition-colors break-all"
                >
                  <Mail className="h-4 w-4 shrink-0 text-[#FD7E14]" />
                  <span>{CONTACT.email.label}</span>
                </a>
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FD7E14]">WhatsApp</p>
                <a
                  href={CONTACT.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                >
                  <FaWhatsapp className="h-5 w-5 shrink-0" />
                  <span>{CONTACT.whatsapp.label}</span>
                </a>
              </div>

              {/* Address + Get directions */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FD7E14]">Address</p>
                <p className="text-[#1a1a1a] dark:text-white/90 text-sm leading-relaxed">
                  {CONTACT.address.text}
                </p>
                <a
                  href={CONTACT.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#FD7E14] hover:text-[#E56B00] font-medium text-sm mt-2"
                >
                  <MapPin className="h-4 w-4" />
                  Get directions
                </a>
              </div>
            </div>
          </motion.div>

          {/* Google Maps - latest view */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#e5e5e5] dark:border-[#333] shadow-lg aspect-[4/3] min-h-[280px]">
              <iframe
                title="Chiranjeevi Eye and Blood Bank - Location"
                src={`https://www.google.com/maps?q=${CONTACT.address.embedQuery}&z=16&output=embed`}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
