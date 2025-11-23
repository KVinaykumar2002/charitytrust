"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { getToken } from "@/lib/auth-storage";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  href?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = getToken();
      const response = await fetch("https://charitytrust-eykm.onrender.com/api/admin/projects", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        const projectsData = result.data || [];
        setProjects(projectsData.map((p: any) => ({
          id: p._id || p.id,
          category: p.category || "Other",
          title: p.title || "",
          description: p.description || "",
          imageUrl: p.imageBase64 || p.image || p.imageUrl || "",
          href: p.link || "#",
          featured: p.featured || false,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        })));
      } else {
        console.error("Failed to fetch projects");
        setProjects([]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = getToken();
      const response = await fetch(`https://charitytrust-eykm.onrender.com/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        setDeleteDialogOpen(false);
        setSelectedProject(null);
      } else {
        console.error("Failed to delete project");
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">Projects</h1>
          <p className="text-[#4a4a4a]">Manage your charity projects</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-[#1a3a3a] hover:bg-[#244543] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>

      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a3a3a]">All Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-[#4a4a4a]">Loading...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8 text-[#4a4a4a]">No projects found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => {
                // Handle base64 images - use data URI placeholder if no image
                const hasImage = project.imageUrl && project.imageUrl.trim() !== '';
                const imageSrc = hasImage && project.imageUrl.startsWith('data:image')
                  ? project.imageUrl 
                  : hasImage
                  ? project.imageUrl
                  : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                
                return (
                <Card key={project.id} className="border-[#e5e5e5] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative w-full h-48 bg-[#f8f9f8]">
                    {hasImage ? (
                      <img
                        src={imageSrc}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Replace with SVG placeholder on error
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-[#4a4a4a] text-sm">No Image</p>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#1a3a3a] bg-[#b8f4d3] px-2 py-1 rounded">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="text-xs font-semibold text-[#1a3a3a] bg-[#d4f9e6] px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-2">{project.title}</h3>
                    <p className="text-sm text-[#4a4a4a] line-clamp-2 mb-4">{project.description}</p>
                    <div className="flex gap-2">
                      <Link href={`/admin/projects/${project.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full border-[#1a3a3a] text-[#1a3a3a] hover:bg-[#d4f9e6]">
                          <Edit className="mr-2 h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setSelectedProject(project);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedProject?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedProject && handleDelete(selectedProject.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

