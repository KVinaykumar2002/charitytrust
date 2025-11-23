"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
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

interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  link?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch("https://charitytrust-eykm.onrender.com/api/admin/programs");
      if (response.ok) {
        const result = await response.json();
        // Handle both array and object with data property
        const programsData = Array.isArray(result) ? result : (result.data || []);
        setPrograms(programsData.map((p: any) => ({
          id: p._id || p.id,
          title: p.title,
          description: p.description,
          category: p.category,
          image: p.imageBase64 || p.image || p.imageUrl || '',
          link: p.link,
          featured: p.featured || false,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
        })));
      } else {
        // Fallback to mock data if API fails
        setPrograms([
          {
            id: "1",
            title: "Mega Blood Donation Drives",
            description: "CCT has been a pioneer in organizing massive blood donation camps...",
            category: "Health",
            image: "/hero/chiranjeevi-few-days-ago-prior-blood-donation-drive-had-thanked-his-fans-initiative.jpg",
            featured: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
      // Fallback to empty array on error
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://charitytrust-eykm.onrender.com/api/admin/programs/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPrograms(programs.filter((p) => p.id !== id));
        setDeleteDialogOpen(false);
        setSelectedProgram(null);
      } else {
        console.error("Failed to delete program");
      }
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">Programs</h1>
          <p className="text-[#4a4a4a]">Manage your charity programs and initiatives</p>
        </div>
        <Link href="/admin/programs/new">
          <Button className="bg-[#1a3a3a] hover:bg-[#244543] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Program
          </Button>
        </Link>
      </div>

      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a3a3a]">All Programs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-[#4a4a4a]">Loading...</div>
          ) : programs.length === 0 ? (
            <div className="text-center py-8 text-[#4a4a4a]">No programs found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => {
                // Check if image is base64 or URL
                const imageSrc = program.image?.startsWith('data:image') 
                  ? program.image 
                  : program.image || '/placeholder-image.jpg';
                
                return (
                <Card key={program.id} className="border-[#e5e5e5] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative w-full h-48">
                    <img
                      src={imageSrc}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#1a3a3a] bg-[#b8f4d3] px-2 py-1 rounded">
                        {program.category}
                      </span>
                      {program.featured && (
                        <span className="text-xs font-semibold text-[#1a3a3a] bg-[#d4f9e6] px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-2">{program.title}</h3>
                    <p className="text-sm text-[#4a4a4a] line-clamp-2 mb-4">{program.description}</p>
                    <div className="flex gap-2">
                      <Link href={`/admin/programs/${program.id}`} className="flex-1">
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
                          setSelectedProgram(program);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )})}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Program</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedProgram?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedProgram && handleDelete(selectedProgram.id)}
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

