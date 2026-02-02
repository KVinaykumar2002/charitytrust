"use client";

import { useState, useEffect } from "react";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import { Calendar, MapPin, Target, CheckCircle2, Clock, PlayCircle, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { getPublicProjects } from "@/lib/api";
import TrustLoader from "@/components/TrustLoader";

interface Project {
  _id?: string;
  id?: string;
  title: string;
  description?: string;
  image?: string;
  imageBase64?: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  status?: string;
  category?: string;
}

const getStatusInfo = (status?: string) => {
  switch (status) {
    case 'completed':
      return { label: 'Completed', icon: CheckCircle2, color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30' };
    case 'in_progress':
      return { label: 'In Progress', icon: PlayCircle, color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30' };
    case 'planning':
      return { label: 'Planning', icon: Clock, color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30' };
    default:
      return { label: 'Planning', icon: Clock, color: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800' };
  }
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await getPublicProjects();
      
      // Backend returns: { success: true, data: projects[] }
      // Optimize data extraction
      const projectsData = Array.isArray(result?.data) 
        ? result.data 
        : Array.isArray(result) 
        ? result 
        : Array.isArray(result?.data) 
        ? result.data 
        : [];
      
      if (!projectsData.length) {
        setProjects([]);
        setLoading(false);
        return;
      }
      
      // Optimize mapping with single pass
      const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
      
      const mappedProjects = projectsData.map((p: any) => ({
        id: p._id || p.id,
        title: p.title || "Untitled Project",
        description: p.description || "",
        image: p.imageBase64 || p.image || p.imageUrl || placeholderImage,
        startDate: p.startDate,
        endDate: p.endDate,
        location: p.location || "",
        status: p.status || "planning",
        category: p.category || "Floods services",
      }));
      
      setProjects(mappedProjects);
      setError(null);
    } catch (error: any) {
      setProjects([]);
      const errorMessage = error instanceof Error ? error.message : (error?.message || "Failed to load projects. Please check if the backend server is running.");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Get unique years, months, and days from projects (using startDate)
  const getAvailableYears = () => {
    const years = new Set<number>();
    projects.forEach((project) => {
      if (project.startDate) {
        const date = new Date(project.startDate);
        if (!isNaN(date.getTime())) {
          years.add(date.getFullYear());
        }
      }
    });
    return Array.from(years).sort((a, b) => b - a); // Most recent first
  };

  const getAvailableMonths = () => {
    const months = new Set<number>();
    projects.forEach((project) => {
      if (project.startDate) {
        const date = new Date(project.startDate);
        if (!isNaN(date.getTime()) && (!selectedYear || date.getFullYear() === parseInt(selectedYear))) {
          months.add(date.getMonth() + 1); // 1-12
        }
      }
    });
    return Array.from(months).sort((a, b) => a - b);
  };

  const getAvailableDays = () => {
    const days = new Set<number>();
    projects.forEach((project) => {
      if (project.startDate) {
        const date = new Date(project.startDate);
        if (!isNaN(date.getTime()) && 
            (!selectedYear || date.getFullYear() === parseInt(selectedYear)) &&
            (!selectedMonth || date.getMonth() + 1 === parseInt(selectedMonth))) {
          days.add(date.getDate());
        }
      }
    });
    return Array.from(days).sort((a, b) => a - b);
  };

  // Map old category names to new ones for display
  const mapCategoryName = (category: string | undefined): string => {
    if (!category) return "Floods services";
    const categoryMap: { [key: string]: string } = {
      "Health": "Blood Donation",
      "Vision": "Eye donation Camps",
      "Other": "Floods services",
    };
    return categoryMap[category] || category;
  };

  // Get normalized category (for filtering - handles both old and new names)
  const getNormalizedCategory = (category: string | undefined): string => {
    if (!category) return "Floods services";
    const categoryMap: { [key: string]: string } = {
      "Health": "Blood Donation",
      "Vision": "Eye donation Camps",
      "Other": "Floods services",
    };
    return categoryMap[category] || category;
  };

  const getAvailableCategories = () => {
    const categories = new Set<string>();
    projects.forEach((project) => {
      if (project.category) {
        // Use normalized category name for the dropdown
        categories.add(getNormalizedCategory(project.category));
      }
    });
    return Array.from(categories).sort();
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Filter projects based on all criteria
  const filteredProjects = projects.filter((project) => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = project.title?.toLowerCase().includes(query);
      const matchesDescription = project.description?.toLowerCase().includes(query);
      const matchesLocation = project.location?.toLowerCase().includes(query);
      const normalizedCategory = getNormalizedCategory(project.category);
      const matchesCategory = normalizedCategory?.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDescription && !matchesLocation && !matchesCategory) {
        return false;
      }
    }

    // Filter by status
    if (selectedStatus !== "all" && project.status !== selectedStatus) {
      return false;
    }

    // Filter by category (handle both old and new category names)
    if (selectedCategory !== "all") {
      const normalizedProjectCategory = getNormalizedCategory(project.category);
      if (normalizedProjectCategory !== selectedCategory) {
        return false;
      }
    }

    // Filter by date (using startDate)
    if (project.startDate) {
      const projectDate = new Date(project.startDate);
      if (!isNaN(projectDate.getTime())) {
        if (selectedYear && projectDate.getFullYear() !== parseInt(selectedYear)) {
          return false;
        }
        if (selectedMonth && projectDate.getMonth() + 1 !== parseInt(selectedMonth)) {
          return false;
        }
        if (selectedDay && projectDate.getDate() !== parseInt(selectedDay)) {
          return false;
        }
      }
    } else if (selectedYear || selectedMonth || selectedDay) {
      // If project has no date but filters are selected, exclude it
      return false;
    }

    return true;
  });

  const clearDateFilters = () => {
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedDay("");
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedYear("");
    setSelectedMonth("");
    setSelectedDay("");
    setSelectedStatus("all");
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 text-white overflow-hidden">
          {/* Background Images */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2074&auto=format&fit=crop"
              alt="Projects background"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FD7E14] rounded-full blur-3xl"></div>
          </div>
          
          {/* Floating decorative images */}
          <div className="absolute top-10 right-10 w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden opacity-30 rotate-6 hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop"
              alt="Community project"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-10 left-10 w-24 h-24 md:w-40 md:h-40 rounded-2xl overflow-hidden opacity-30 -rotate-6 hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop"
              alt="Charity work"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1
                data-text-animation="reveal-from-bottom"
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-lg"
              >
                Our Projects
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-md">
                Discover the impactful projects we're working on to create positive change in communities.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-gray-50 dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative max-w-2xl mx-auto"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search projects by title, description, location, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-full text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-[#FD7E14] focus:ring-2 focus:ring-[#FD7E14]/20 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </motion.div>

              {/* Filters Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-4 py-2.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-full text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#FD7E14] transition-all shadow-sm"
                >
                  <option value="all">All Status</option>
                  <option value="planning">Planning</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-full text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#FD7E14] transition-all shadow-sm"
                >
                  <option value="all">All Categories</option>
                  {getAvailableCategories().map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {/* Year Filter */}
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setSelectedMonth("");
                    setSelectedDay("");
                  }}
                  className="px-4 py-2.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-full text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#FD7E14] transition-all shadow-sm"
                >
                  <option value="">All Years</option>
                  {getAvailableYears().map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                {/* Month Filter */}
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    setSelectedDay("");
                  }}
                  disabled={!selectedYear}
                  className="px-4 py-2.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-full text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#FD7E14] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">All Months</option>
                  {getAvailableMonths().map((month) => (
                    <option key={month} value={month}>
                      {monthNames[month - 1]}
                    </option>
                  ))}
                </select>

                {/* Day Filter */}
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  disabled={!selectedYear || !selectedMonth}
                  className="px-4 py-2.5 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-full text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#FD7E14] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">All Days</option>
                  {getAvailableDays().map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>

                {/* Clear All Filters Button */}
                {(searchQuery || selectedYear || selectedMonth || selectedDay || selectedStatus !== "all" || selectedCategory !== "all") && (
                  <button
                    onClick={clearAllFilters}
                    className="px-4 py-2.5 bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 border border-gray-300 dark:border-neutral-600 rounded-full text-gray-900 dark:text-white text-sm transition-all flex items-center gap-2 shadow-sm"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </motion.div>

              {/* Results Count */}
              {(searchQuery || selectedYear || selectedMonth || selectedDay || selectedStatus !== "all" || selectedCategory !== "all") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-600 dark:text-neutral-400 text-sm"
                >
                  Showing <span className="font-semibold text-[#FD7E14]">{filteredProjects.length}</span> of {projects.length} projects
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 md:py-32 bg-white dark:bg-neutral-950">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {loading ? (
              <div className="text-center py-20">
                <TrustLoader variant="both" size="lg" label="Loading projects..." />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Projects</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    fetchProjects();
                  }}
                  className="px-6 py-3 bg-[#FD7E14] text-white rounded-lg hover:bg-[#FD7E14]/90 transition-colors"
                >
                  Retry
                </button>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-4">
                  Make sure the backend server is running on https://charitytrust-eykm.onrender.com
                </p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">No Projects Available</h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  Check back soon for upcoming projects and initiatives.
                </p>
                <button
                  onClick={fetchProjects}
                  className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Refresh
                </button>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4">No Projects Found</h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  {searchQuery || selectedYear || selectedMonth || selectedDay || selectedStatus !== "all" || selectedCategory !== "all"
                    ? "Try adjusting your filters to see more projects."
                    : "Check back soon for upcoming projects and initiatives."}
                </p>
                {(searchQuery || selectedYear || selectedMonth || selectedDay || selectedStatus !== "all" || selectedCategory !== "all") && (
                  <button
                    onClick={clearAllFilters}
                    className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <p className="text-neutral-600 dark:text-neutral-300">
                    Showing <span className="font-semibold text-[#FD7E14]">{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project) => {
                    const statusInfo = getStatusInfo(project.status);
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <div
                        key={project.id || project._id}
                        className="bg-white dark:bg-neutral-800 rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-lg overflow-hidden hover-lift-up group opacity-100"
                      >
                        <div className="relative w-full h-64 overflow-hidden">
                          <img
                            src={project.image || ""}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                            }}
                          />
                          <div className="absolute top-4 right-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          {project.category && (
                            <span className="inline-block px-3 py-1 bg-[#FD7E14]/10 dark:bg-[#FD7E14]/20 text-[#FD7E14] text-xs font-semibold rounded-full mb-3">
                              {mapCategoryName(project.category)}
                            </span>
                          )}
                          <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 line-clamp-2">
                            {project.title}
                          </h3>
                          {project.description && (
                            <p className="text-neutral-600 dark:text-neutral-300 mb-4 line-clamp-3">
                              {project.description}
                            </p>
                          )}
                          <div className="space-y-2 mb-6">
                            {project.startDate && (
                              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <Calendar className="w-4 h-4" />
                                <span>Started: {formatDate(project.startDate)}</span>
                              </div>
                            )}
                            {project.endDate && (
                              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <Target className="w-4 h-4" />
                                <span>Ends: {formatDate(project.endDate)}</span>
                              </div>
                            )}
                            {project.location && (
                              <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                <MapPin className="w-4 h-4" />
                                <span>{project.location}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <FlickeringFooter />
    </div>
  );
}

