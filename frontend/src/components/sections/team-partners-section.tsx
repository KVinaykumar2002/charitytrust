"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Users, Award, Heart, Target, ChevronDown, UsersRound, Building2 } from "lucide-react";
import { getPublicTeam } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const ICON_MAP: Record<string, typeof Award | typeof UsersRound | typeof Building2> = {
  Award,
  Target,
  Heart,
  Users,
  UsersRound,
  Building2,
};

const FALLBACK_TEAM = [
  {
    name: "Leadership Team",
    role: "Strategic Direction",
    description: "Our experienced leadership team brings decades of combined experience in healthcare, social work, and organizational management.",
    icon: "Award",
    members: [
      { name: "Dr. Chiranjeevi", position: "Founder & Chairman", imageUrl: "", bio: "" },
      { name: "Dr. Ram Charan", position: "Vice Chairman", imageUrl: "", bio: "" },
      { name: "Ms. Surekha Konidela", position: "Executive Director", imageUrl: "", bio: "" },
    ],
  },
  {
    name: "Program Directors",
    role: "Program Execution",
    description: "Dedicated professionals who oversee our various initiatives, ensuring effective implementation and maximum impact.",
    icon: "Target",
    members: [
      { name: "Dr. Venkatesh", position: "Blood Bank Director", imageUrl: "", bio: "" },
      { name: "Dr. Priya Reddy", position: "Eye Bank Director", imageUrl: "", bio: "" },
      { name: "Mr. Ravi Kumar", position: "Community Programs Director", imageUrl: "", bio: "" },
    ],
  },
  {
    name: "Medical Advisors",
    role: "Healthcare Excellence",
    description: "Renowned medical professionals who guide our healthcare programs and ensure the highest standards of medical care.",
    icon: "Heart",
    members: [
      { name: "Dr. Suresh Reddy", position: "Chief Medical Advisor", imageUrl: "", bio: "" },
      { name: "Dr. Anjali Sharma", position: "Hematology Advisor", imageUrl: "", bio: "" },
      { name: "Dr. Rajesh Patel", position: "Public Health Advisor", imageUrl: "", bio: "" },
    ],
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

type TeamCategoryItem = {
  name: string;
  role: string;
  description: string;
  icon: string;
  sectionType?: string;
  members: Array<{ name: string; position: string; imageUrl?: string; bio?: string; teamNumber?: string }>;
};

const TeamPartnersSection = () => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [organizersDropdownOpen, setOrganizersDropdownOpen] = useState(false);
  const [hospitalsDropdownOpen, setHospitalsDropdownOpen] = useState(false);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamCategories, setTeamCategories] = useState<TeamCategoryItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    setTeamLoading(true);
    getPublicTeam()
      .then((res: unknown) => {
        if (cancelled) return;
        const r = res as Record<string, unknown>;
        const raw = Array.isArray(r?.data)
          ? (r.data as unknown[])
          : Array.isArray(r?.categories)
            ? (r.categories as unknown[])
            : Array.isArray(res)
              ? (res as unknown[])
              : null;
        if (!raw || raw.length === 0) {
          setTeamCategories([]);
          return;
        }
        try {
          const mapped = (raw as Record<string, unknown>[]).map((c: Record<string, unknown>) => {
            const members = Array.isArray(c?.members) ? c.members : [];
            const sortedMembers = members
              .slice()
              .sort((a: { order?: number }, b: { order?: number }) => (a?.order ?? 0) - (b?.order ?? 0));
            const icon = ["Award", "Target", "Heart", "Users", "UsersRound", "Building2"].includes(String(c?.icon ?? "")) ? String(c.icon) : "Award";
            return {
              name: String(c?.name ?? ""),
              role: String(c?.role ?? ""),
              description: String(c?.description ?? ""),
              icon,
              sectionType: (c?.sectionType as string) || "leadership",
              members: sortedMembers,
            };
          });
          if (!cancelled) setTeamCategories(mapped);
        } catch {
          if (!cancelled) setTeamCategories([]);
        }
      })
      .catch(() => {
        if (!cancelled) setTeamCategories([]);
      })
      .finally(() => {
        if (!cancelled) setTeamLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const toggleDropdown = (index: number) => {
    setOpenDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  // When API fails or returns empty, use fallback so the section is never blank.
  // Always include Our Organizers and Government Hospitals (from API or placeholder) so they show below Volunteers.
  const baseCategories: TeamCategoryItem[] =
    teamCategories.length > 0
      ? teamCategories
      : FALLBACK_TEAM.map((f) => ({
          name: f.name,
          role: f.role,
          description: f.description,
          icon: f.icon,
          sectionType: "leadership",
          members: f.members || [],
        }));

  const organizersFromApi = baseCategories.find((c) => c.sectionType === "organizers" || c.name === "Our Organizers");
  const hospitalsFromApi = baseCategories.find((c) => c.sectionType === "government_hospitals" || c.name === "Government Hospitals");

  const displayCategories: TeamCategoryItem[] =
    baseCategories.length > 0
      ? [
          ...baseCategories.filter(
            (c) => c.name !== "Our Organizers" && c.name !== "Government Hospitals"
          ),
          organizersFromApi ?? {
            name: "Our Organizers",
            role: "",
            description: "Our organizers are the backbone of Chiranjeevi Charitable Trust. They plan and execute blood donation camps, eye donation drives, and community programs—bringing our mission to life across the region.",
            icon: "UsersRound",
            sectionType: "organizers",
            members: [],
          },
          hospitalsFromApi ?? {
            name: "Government Hospitals",
            role: "",
            description: "We work with government hospitals and related institutions to extend blood and eye donation services, support public health initiatives, and reach more beneficiaries in need.",
            icon: "Building2",
            sectionType: "government_hospitals",
            members: [],
          },
        ]
      : [];

  const organizersCategory = displayCategories.find((c) => c.sectionType === "organizers" || c.name === "Our Organizers");
  const governmentHospitalsCategory = displayCategories.find((c) => c.sectionType === "government_hospitals" || c.name === "Government Hospitals");
  const leadershipCategories = displayCategories.filter(
    (c) =>
      (c.sectionType || "leadership") === "leadership" &&
      c.name !== "Our Organizers" &&
      c.name !== "Government Hospitals"
  );

  /** Reusable member list (same as in leadership dropdown) */
  const renderMemberList = (members: TeamCategoryItem["members"]) => (
    <div className="space-y-4 text-left">
      {members?.map((teamMember, memberIndex) => (
        <div
          key={memberIndex}
          className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700"
        >
          <div className="relative flex-shrink-0 w-14 h-14 rounded-full overflow-hidden bg-primary/20 dark:bg-primary/30">
            {teamMember.imageUrl ? (
              <Image
                src={teamMember.imageUrl}
                alt={teamMember.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            ) : (
              <Image
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(teamMember.name)}&size=112&background=FD7E14&color=fff`}
                alt={teamMember.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              {teamMember.teamNumber && (
                <span className="text-xs font-medium text-primary bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded">
                  #{teamMember.teamNumber}
                </span>
              )}
              <h5 className="font-semibold text-neutral-900 dark:text-white">{teamMember.name}</h5>
            </div>
            <p className="text-sm text-primary dark:text-primary">{teamMember.position}</p>
            {teamMember.bio && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-3">{teamMember.bio}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {teamLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg dark:shadow-neutral-900/50 border border-gray-200 dark:border-neutral-800 flex flex-col animate-in fade-in duration-300"
                  >
                    <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
                    <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                    <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-6" />
                    <Skeleton className="h-11 w-full mt-auto rounded-lg" />
                  </div>
                ))}
              </>
            ) : leadershipCategories.length === 0 ? (
              <div className="col-span-full text-center py-12 px-4 rounded-2xl bg-gray-50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700">
                <p className="text-neutral-600 dark:text-neutral-400 text-lg">
                  No team categories yet. Team information will appear here once added from the admin panel.
                </p>
              </div>
            ) : (
            <div className="contents" key={`team-cards-${leadershipCategories.length}`}>
            {leadershipCategories.map((member, index) => {
              const IconComponent = ICON_MAP[member.icon] || Award;
              return (
              <div
                key={member.name ? `${member.name}-${index}` : index}
                data-stagger-item
                data-animation="slide-up"
                data-animation-delay={`${index * 0.1}s`}
                className="relative bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg dark:shadow-neutral-900/50 border border-gray-200 dark:border-neutral-800 hover-lift-up text-center group flex flex-col"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 dark:bg-primary/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  {member.name}
                </h4>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                  {member.role}
                </p>
                <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300 mb-6">
                  {member.description}
                </p>
                
                {/* Dropdown Button */}
                <button
                  onClick={() => toggleDropdown(index)}
                  className="mt-auto flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary dark:text-primary font-medium transition-colors duration-200"
                  aria-expanded={openDropdown === index}
                  aria-label={`View ${member.name} members`}
                >
                  <span>View Team Members</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openDropdown === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Content - absolute so other cards don't move */}
                {openDropdown === index && (
                  <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl p-4 max-h-[70vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-4 text-left">
                      {member.members?.map((teamMember, memberIndex) => (
                        <div
                          key={memberIndex}
                          className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-neutral-800/50 border border-gray-200 dark:border-neutral-700"
                        >
                          <div className="relative flex-shrink-0 w-14 h-14 rounded-full overflow-hidden bg-primary/20 dark:bg-primary/30">
                            {teamMember.imageUrl ? (
                              <Image
                                src={teamMember.imageUrl}
                                alt={teamMember.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            ) : (
                              <Image
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(teamMember.name)}&size=112&background=FD7E14&color=fff`}
                                alt={teamMember.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              {(teamMember as { teamNumber?: string }).teamNumber && (
                                <span className="text-xs font-medium text-primary bg-primary/10 dark:bg-primary/20 px-2 py-0.5 rounded">
                                  #{(teamMember as { teamNumber?: string }).teamNumber}
                                </span>
                              )}
                              <h5 className="font-semibold text-neutral-900 dark:text-white">
                                {teamMember.name}
                              </h5>
                            </div>
                            <p className="text-sm text-primary dark:text-primary">
                              {teamMember.position}
                            </p>
                            {teamMember.bio && (
                              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-3">
                                {teamMember.bio}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              );
            })}
            </div>
            )}
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

        {/* Our Organizers & Government Hospitals - below Volunteers, data from Admin → Our Team */}
        <div
          data-stagger-parent
          className="mb-20"
        >
          <h3
            data-stagger-item
            data-animation="fade-up"
            className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white text-center mb-12"
          >
            Our Organizers & Government Hospitals
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Our Organizers Card */}
            {organizersCategory && (
              <div
                data-stagger-item
                data-animation="slide-up"
                data-animation-delay="0.1s"
                className="relative bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg dark:shadow-neutral-900/50 border border-gray-200 dark:border-neutral-800 hover-lift-up text-center group flex flex-col"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 dark:bg-primary/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <UsersRound className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                  {organizersCategory.name}
                </h3>
                <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300 mb-6">
                  {organizersCategory.description}
                </p>
                <button
                  onClick={() => setOrganizersDropdownOpen((o) => !o)}
                  className="mt-auto flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary dark:text-primary font-medium transition-colors duration-200"
                  aria-expanded={organizersDropdownOpen}
                >
                  <span>View organizers</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${organizersDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {organizersDropdownOpen && organizersCategory.members?.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl p-4 max-h-[70vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                    {renderMemberList(organizersCategory.members)}
                  </div>
                )}
                {organizersDropdownOpen && (!organizersCategory.members || organizersCategory.members.length === 0) && (
                  <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl p-4 animate-in slide-in-from-top-2 duration-200">
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">No members added yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Government Hospitals Card */}
            {governmentHospitalsCategory && (
              <div
                data-stagger-item
                data-animation="slide-up"
                data-animation-delay="0.2s"
                className="relative bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg dark:shadow-neutral-900/50 border border-gray-200 dark:border-neutral-800 hover-lift-up text-center group flex flex-col"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 dark:bg-primary/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                  {governmentHospitalsCategory.name}
                </h3>
                <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-300 mb-6">
                  {governmentHospitalsCategory.description}
                </p>
                <button
                  onClick={() => setHospitalsDropdownOpen((o) => !o)}
                  className="mt-auto flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-primary/10 dark:bg-primary/20 hover:bg-primary/20 dark:hover:bg-primary/30 text-primary dark:text-primary font-medium transition-colors duration-200"
                  aria-expanded={hospitalsDropdownOpen}
                >
                  <span>View hospitals/partners</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${hospitalsDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {hospitalsDropdownOpen && governmentHospitalsCategory.members?.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl p-4 max-h-[70vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                    {renderMemberList(governmentHospitalsCategory.members)}
                  </div>
                )}
                {hospitalsDropdownOpen && (!governmentHospitalsCategory.members || governmentHospitalsCategory.members.length === 0) && (
                  <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl p-4 animate-in slide-in-from-top-2 duration-200">
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">No members added yet.</p>
                  </div>
                )}
              </div>
            )}
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

