"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const RelianceFooter = () => {
  const footerLinks = [
    {
      title: "About",
      links: [
        { name: "Our History", href: "/about" },
        { name: "Founder-Chairman", href: "/founder" },
        { name: "Our Impact", href: "/about#about-company" },
        { name: "Awards", href: "/founder#awards" },
        { name: "Gallery", href: "/gallery" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Eye Bank", href: "/services#eye-bank" },
        { name: "Blood Center", href: "/services#blood-center" },
        { name: "Events", href: "/events" },
        { name: "Donate", href: "/donate" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { name: "Team", href: "/team" },
        { name: "Contact Us", href: "/contact" },
        { name: "FAQ", href: "/faq" },
      ],
      subTitle: "",
      subLinks: [
        { name: "Contact Us", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ];

  const socialIcons = [
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/svgs/facebook-icon-2.svg",
      alt: "Facebook",
    },
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/svgs/insta-icon-3.svg",
      alt: "Instagram",
    },
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/svgs/twitter-icon_20_281_29-4.svg",
      alt: "X",
    },
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/svgs/linkedin-icon-5.svg",
      alt: "LinkedIn",
    },
    {
      src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/2a18a6f6-56a3-4153-8f6a-6bcae6d8af15-ril-com/assets/svgs/youtube-icon-6.svg",
      alt: "YouTube",
    },
  ];

  return (
    <footer className="bg-white pt-12">
      {/* Subscription Section */}
      <div className="container mx-auto px-6 mb-12 max-w-[1200px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-10 gap-8">
          <div className="w-full max-w-[450px]">
            <p className="text-[12px] font-bold text-[#333333] mb-3 uppercase tracking-[0.05em]">
              Subscribe to our news alerts
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Id"
                className="flex-1 px-4 py-[10px] bg-[#f8f8f8] border border-[#e5e5e5] text-[14px] outline-none focus:border-[#C59B5F] rounded-[1px]"
              />
              <button
                type="button"
                className="bg-[#C59B5F] text-white px-8 py-[10px] text-[14px] font-semibold rounded-[1px] hover:bg-[#b08b53] transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            {socialIcons.map((icon, index) => (
              <a
                key={index}
                href="#"
                className="w-8 h-8 flex items-center justify-center bg-[#C59B5F] rounded-full hover:bg-[#b08b53] transition-colors overflow-hidden"
                aria-label={icon.alt}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={icon.src}
                  alt=""
                  className="w-5 h-5 invert brightness-0"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Site Map Section */}
      <div className="container mx-auto px-6 pb-20 max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="text-[16px] font-bold text-[#333333] mb-4">
                {section.title}
              </h3>
              <ul className="space-y-[6px] mb-8">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-[#666666] hover:text-[#004291] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {section.subTitle && section.subLinks && (
                <>
                  <h3 className="text-[16px] font-bold text-[#333333] mb-4">
                    {section.subTitle}
                  </h3>
                  <ul className="space-y-[6px] mt-2">
                    {section.subLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-[13px] text-[#333333] font-semibold hover:text-[#004291] transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="relative border-t border-[#e5e5e5] py-8 bg-white">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
            <Image
              src="/logo.png"
              alt="Chiranjeevi Charitable Trust"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-[13px] text-[#666666] gap-4">
            <p className="order-2 md:order-1 font-sans">
              © {new Date().getFullYear()} Chiranjeevi Charitable Trust. All
              rights reserved.
            </p>
            <div className="flex gap-6 order-1 md:order-2">
              <Link
                href="/privacy"
                className="hover:text-[#004291] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact-us"
                className="hover:text-[#004291] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute right-6 bottom-8 md:bottom-2 w-10 h-10 bg-[#c59b5f] flex items-center justify-center rounded-[2px] transition-opacity hover:opacity-90"
          aria-label="Back to top"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 19V5M12 5L5 12M12 5L19 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default RelianceFooter;
