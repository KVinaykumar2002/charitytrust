"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, X } from 'lucide-react';

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-transform hover:scale-110 hover:bg-white/10"
  >
    <Icon className="h-5 w-5" />
  </a>
);

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="group relative inline-block py-1 text-[15px] text-white/80 transition-colors hover:text-white"
    >
      {children}
      <span className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-white transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
    </Link>
  </li>
);

const Footer = () => {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container py-20">
                <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-5 lg:gap-x-[60px]">
                    {/* Left Column Group */}
                    <div className="space-y-12 lg:col-span-2">
                        {/* Core Values */}
                        <div className="space-y-6">
                            <Link href="/" className="inline-block">
                                <Image
                                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/92f8a582-9c65-41fe-9b58-b9fc16e25576-lambda-template-framer-website/assets/images/uefZpqehpfg3Yk6PexORXxnOA-1.png"
                                    alt="Lambda Charity Logo"
                                    width={138}
                                    height={39}
                                />
                            </Link>
                            <h6 className="text-lg font-semibold text-white">Core Values</h6>
                            <p className="text-[15px] leading-relaxed text-white/70">
                                At Lambda, we prioritize transparency, integrity, and inclusivity. These values guide our actions as we work tirelessly to bridge the gap between those in need and those willing to help.
                            </p>
                        </div>
                        {/* Newsletter */}
                        <div className="space-y-6">
                            <h6 className="text-lg font-semibold text-white">Sign up for our newsletter</h6>
                            <form className="flex flex-col gap-4 sm:flex-row">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="h-14 w-full flex-grow rounded-lg border border-white/30 bg-transparent px-4 py-2 text-white outline-none ring-offset-primary transition-colors placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
                                />
                                <button
                                    type="submit"
                                    className="h-14 flex-shrink-0 rounded-lg bg-secondary px-6 text-base font-medium text-secondary-foreground transition-colors hover:bg-mint-green-light"
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Middle Column */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            <h6 className="text-lg font-semibold text-white">Useful links</h6>
                            <nav>
                                <ul className="space-y-3">
                                    <NavLink href="/">Home</NavLink>
                                    <NavLink href="#">Our Mission</NavLink>
                                    <NavLink href="#">Why Choose Us</NavLink>
                                    <NavLink href="/projects">Projects</NavLink>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            <h6 className="text-lg font-semibold text-white">Our contacts</h6>
                             <ul className="space-y-4 text-[15px] text-white/80">
                                <li className="flex items-start gap-4">
                                    <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-white/60" />
                                    <span>information@office.com</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-white/60" />
                                    <span>+ (0777) 888 88 888</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-white/60" />
                                    <span>2307 Beverley, New York</span>
                                </li>
                            </ul>
                            <div className="flex items-center gap-3 pt-4">
                                <SocialIcon href="#" icon={Facebook} />
                                <SocialIcon href="#" icon={Instagram} />
                                <SocialIcon href="#" icon={X} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 border-t border-white/10 pt-8 text-center text-sm text-white/60">
                    <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
                        <p>© Lambda. All rights reserved.</p>
                        <p>Designed by fourtwelve.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;