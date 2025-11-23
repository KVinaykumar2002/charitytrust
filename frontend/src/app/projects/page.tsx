"use client";

import { useState, useEffect } from "react";
import NavigationHeader from "@/components/sections/navigation-header";
import Footer from "@/components/sections/footer";
import { Calendar, MapPin, Target, CheckCircle2, Clock, PlayCircle } from "lucide-react";
import { getPublicProjects } from "@/lib/api";

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
      return { label: 'Completed', icon: CheckCircle2, color: 'text-green-600 bg-green-50' };
    case 'in_progress':
      return { label: 'In Progress', icon: PlayCircle, color: 'text-blue-600 bg-blue-50' };
    case 'planning':
      return { label: 'Planning', icon: Clock, color: 'text-yellow-600 bg-yellow-50' };
    default:
      return { label: 'Planning', icon: Clock, color: 'text-gray-600 bg-gray-50' };
  }
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        category: p.category || "Other",
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

  return (
    <div className="min-h-screen flex flex-col">
      <NavigationHeader />
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary to-primary/90 py-20 md:py-32 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1
                data-text-animation="reveal-from-bottom"
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              >
                Our Projects
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Discover the impactful projects we're working on to create positive change in communities.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {loading ? (
              <div className="text-center py-20">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading projects...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Projects</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    fetchProjects();
                  }}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Retry
                </button>
                <p className="text-sm text-muted-foreground mt-4">
                  Make sure the backend server is running on https://charitytrust-eykm.onrender.com
                </p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold text-primary mb-4">No Projects Available</h3>
                <p className="text-muted-foreground">
                  Check back soon for upcoming projects and initiatives.
                </p>
                <button
                  onClick={fetchProjects}
                  className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Refresh
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <p className="text-muted-foreground">
                    Showing <span className="font-semibold text-primary">{projects.length}</span> {projects.length === 1 ? 'project' : 'projects'}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => {
                    const statusInfo = getStatusInfo(project.status);
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <div
                        key={project.id || project._id}
                        data-animation="fade-up"
                        className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden hover-lift-up group"
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
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                          <div className="absolute top-4 right-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusInfo.label}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          {project.category && (
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                              {project.category}
                            </span>
                          )}
                          <h3 className="text-2xl font-bold text-primary mb-4 line-clamp-2">
                            {project.title}
                          </h3>
                          {project.description && (
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {project.description}
                            </p>
                          )}
                          <div className="space-y-2 mb-6">
                            {project.startDate && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>Started: {formatDate(project.startDate)}</span>
                              </div>
                            )}
                            {project.endDate && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Target className="w-4 h-4" />
                                <span>Ends: {formatDate(project.endDate)}</span>
                              </div>
                            )}
                            {project.location && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
      <Footer />
    </div>
  );
}

