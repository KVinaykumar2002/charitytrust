"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Star } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import { getToken } from "@/lib/auth-storage";
import { createTestimonial } from "@/lib/api";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    organization: "",
    message: "",
    rating: 5,
    imageBase64: "",
    thumbnailBase64: "",
    featured: false,
    status: "approved",
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getToken();
      if (!token) {
        alert("Please login to create a testimonial");
        router.push("/login");
        return;
      }

      const testimonialData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        organization: formData.organization,
        message: formData.message,
        rating: formData.rating,
        imageBase64: formData.imageBase64,
        thumbnailBase64: formData.thumbnailBase64,
        featured: formData.featured,
        status: formData.status,
        order: formData.order,
      };

      await createTestimonial(token, testimonialData);
      router.push("/admin/testimonials");
    } catch (error: any) {
      console.error("Error creating testimonial:", error);
      alert(error.message || "An error occurred while creating the testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/testimonials">
          <Button variant="ghost" size="icon" className="text-[#FD7E14] hover:bg-[#FFF3E8]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">New Testimonial</h1>
          <p className="text-[#4a4a4a]">Add a new testimonial or review</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-[#e5e5e5]">
              <CardHeader>
                <CardTitle className="text-[#1a1a1a]">Testimonial Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#1a1a1a]">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-[#d0d0d0] focus:border-[#E56B00]"
                      placeholder="e.g., Dr. Anil Sharma"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#1a1a1a]">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-[#d0d0d0] focus:border-[#E56B00]"
                      placeholder="e.g., anil@hospital.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-[#1a1a1a]">Role / Title</Label>
                    <Input
                      id="role"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="border-[#d0d0d0] focus:border-[#E56B00]"
                      placeholder="e.g., Chief Medical Officer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-[#1a1a1a]">Organization</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="border-[#d0d0d0] focus:border-[#E56B00]"
                      placeholder="e.g., Partner Hospital"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#1a1a1a]">Testimonial Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="border-[#d0d0d0] focus:border-[#E56B00]"
                    placeholder="Write the testimonial message here..."
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#1a1a1a]">Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= formData.rating
                              ? "fill-[#FD7E14] text-[#FD7E14]"
                              : "text-[#d0d0d0]"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-[#1a1a1a]">Profile Image</Label>
                  <ImageUpload
                    value={formData.imageBase64}
                    onChange={(base64) => setFormData({ ...formData, imageBase64: base64 })}
                  />
                  <p className="text-xs text-[#4a4a4a]">Recommended: Square image (400x400 or higher)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-[#e5e5e5]">
              <CardHeader>
                <CardTitle className="text-[#1a1a1a]">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-[#1a1a1a]">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="border-[#d0d0d0] focus:border-[#E56B00]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order" className="text-[#1a1a1a]">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    min="0"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    className="border-[#d0d0d0] focus:border-[#E56B00]"
                    placeholder="0"
                  />
                  <p className="text-xs text-[#4a4a4a]">Lower numbers appear first</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured" className="text-[#1a1a1a]">Featured</Label>
                    <p className="text-xs text-[#4a4a4a]">Show prominently on homepage</p>
                  </div>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#FD7E14] hover:bg-[#E56B00] text-white"
              >
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save Testimonial"}
              </Button>
              <Link href="/admin/testimonials">
                <Button type="button" variant="outline" className="border-[#e5e5e5]">
                  Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

