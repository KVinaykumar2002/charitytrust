"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  imageUrl?: string;
  rating?: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      // Replace with actual API call
      setTestimonials([
        {
          id: "1",
          name: "John Doe",
          role: "Donor",
          content: "Amazing organization doing great work!",
          rating: 5,
          featured: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setTestimonials(testimonials.filter((t) => t.id !== id));
      setDeleteDialogOpen(false);
      setSelectedTestimonial(null);
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">Testimonials</h1>
          <p className="text-[#4a4a4a]">Manage testimonials and reviews</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button className="bg-[#1a3a3a] hover:bg-[#244543] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Button>
        </Link>
      </div>

      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a3a3a]">All Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-[#4a4a4a]">Loading...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-8 text-[#4a4a4a]">No testimonials found</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-[#e5e5e5] hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {testimonial.imageUrl ? (
                        <Image
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#1a3a3a] flex items-center justify-center text-white font-semibold">
                          {testimonial.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#1a1a1a]">{testimonial.name}</h3>
                        {testimonial.role && (
                          <p className="text-sm text-[#4a4a4a]">{testimonial.role}</p>
                        )}
                        {testimonial.rating && (
                          <div className="flex gap-1 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < testimonial.rating!
                                    ? "fill-[#1a3a3a] text-[#1a3a3a]"
                                    : "text-[#d0d0d0]"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[#4a4a4a] mb-4 line-clamp-3">{testimonial.content}</p>
                    {testimonial.featured && (
                      <span className="text-xs font-semibold text-[#1a3a3a] bg-[#d4f9e6] px-2 py-1 rounded mb-4 inline-block">
                        Featured
                      </span>
                    )}
                    <div className="flex gap-2">
                      <Link href={`/admin/testimonials/${testimonial.id}`} className="flex-1">
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
                          setSelectedTestimonial(testimonial);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the testimonial from "{selectedTestimonial?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedTestimonial && handleDelete(selectedTestimonial.id)}
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

