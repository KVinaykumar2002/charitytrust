"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Star, Check, X, Clock } from "lucide-react";
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
import { getAdminTestimonials, deleteTestimonial, updateTestimonialStatus } from "@/lib/api";
import { getToken } from "@/lib/auth-storage";

interface Testimonial {
  _id: string;
  name: string;
  email?: string;
  role?: string;
  organization?: string;
  message: string;
  imageBase64?: string;
  imageUrl?: string;
  rating?: number;
  featured?: boolean;
  status: string;
  order?: number;
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
      const token = getToken();
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const result = await getAdminTestimonials(token);
      if (result.success && result.data) {
        setTestimonials(result.data);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please login to delete a testimonial");
        return;
      }

      await deleteTestimonial(token, id);
      setTestimonials(testimonials.filter((t) => t._id !== id));
      setDeleteDialogOpen(false);
      setSelectedTestimonial(null);
    } catch (error: any) {
      console.error("Error deleting testimonial:", error);
      alert(error.message || "Failed to delete testimonial");
      setDeleteDialogOpen(false);
      setSelectedTestimonial(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please login to update testimonial status");
        return;
      }

      await updateTestimonialStatus(token, id, newStatus);
      setTestimonials(testimonials.map((t) => 
        t._id === id ? { ...t, status: newStatus } : t
      ));
    } catch (error: any) {
      console.error("Error updating testimonial status:", error);
      alert(error.message || "Failed to update status");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
            <Check className="h-3 w-3" />
            Approved
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded">
            <X className="h-3 w-3" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const getDisplayImage = (testimonial: Testimonial) => {
    return testimonial.imageBase64 || testimonial.imageUrl;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Testimonials</h1>
          <p className="text-[#4a4a4a]">Manage testimonials and reviews from beneficiaries, partners, and volunteers</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button className="bg-[#FD7E14] hover:bg-[#E56B00] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Button>
        </Link>
      </div>

      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a1a1a]">All Testimonials ({testimonials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-[#4a4a4a]">Loading...</div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-8 text-[#4a4a4a]">
              <p className="mb-4">No testimonials found</p>
              <Link href="/admin/testimonials/new">
                <Button className="bg-[#FD7E14] hover:bg-[#E56B00] text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Testimonial
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial._id} className="border-[#e5e5e5] hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {getDisplayImage(testimonial) ? (
                        <Image
                          src={getDisplayImage(testimonial)!}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover w-12 h-12"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#FD7E14] flex items-center justify-center text-white font-semibold shrink-0">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-[#1a1a1a] truncate">{testimonial.name}</h3>
                        {(testimonial.role || testimonial.organization) && (
                          <p className="text-sm text-[#4a4a4a] truncate">
                            {testimonial.role && testimonial.organization 
                              ? `${testimonial.role}, ${testimonial.organization}`
                              : testimonial.role || testimonial.organization
                            }
                          </p>
                        )}
                        {testimonial.rating && (
                          <div className="flex gap-0.5 mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < testimonial.rating!
                                    ? "fill-[#FD7E14] text-[#FD7E14]"
                                    : "text-[#d0d0d0]"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-[#4a4a4a] mb-4 line-clamp-3">
                      &ldquo;{testimonial.message}&rdquo;
                    </p>
                    
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                      {getStatusBadge(testimonial.status)}
                      {testimonial.featured && (
                        <span className="text-xs font-semibold text-[#FD7E14] bg-[#FFF3E8] px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Quick status actions */}
                    {testimonial.status !== "approved" && (
                      <div className="flex gap-2 mb-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-green-300 text-green-600 hover:bg-green-50"
                          onClick={() => handleStatusChange(testimonial._id, "approved")}
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Approve
                        </Button>
                        {testimonial.status !== "rejected" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleStatusChange(testimonial._id, "rejected")}
                          >
                            <X className="mr-1 h-3 w-3" />
                            Reject
                          </Button>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Link href={`/admin/testimonials/${testimonial._id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full border-[#FD7E14] text-[#FD7E14] hover:bg-[#FFF3E8]">
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
              Are you sure you want to delete the testimonial from &ldquo;{selectedTestimonial?.name}&rdquo;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedTestimonial && handleDelete(selectedTestimonial._id)}
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
