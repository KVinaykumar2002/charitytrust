"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import { getToken } from "@/lib/auth-storage";
import { updateHeroImage, getAdminHeroImage } from "@/lib/api";

export default function EditHeroImagePage() {
  const router = useRouter();
  const params = useParams();
  const heroImageId = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    badge: "",
    ctaLabel: "Learn More",
    ctaHref: "/",
    order: "0",
    active: true,
  });

  useEffect(() => {
    fetchHeroImage();
  }, [heroImageId]);

  const fetchHeroImage = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please login to edit a hero image");
        router.push("/login");
        return;
      }

      // Fetch the specific hero image
      const result = await getAdminHeroImage(token, heroImageId);
      if (result.success && result.data) {
        const image = result.data;

        setFormData({
          title: image.title || "",
          description: image.description || "",
          image: image.imageBase64 || image.image || "",
          badge: image.badge || "",
          ctaLabel: image.ctaLabel || "Learn More",
          ctaHref: image.ctaHref || "/",
          order: image.order?.toString() || "0",
          active: image.active !== false,
        });
      } else {
        alert("Failed to load hero image. Redirecting...");
        router.push("/admin/hero-images");
      }
    } catch (error: any) {
      console.error("Error fetching hero image:", error);
      if (error.message?.includes("404") || error.message?.includes("not found")) {
        alert("Hero image not found. Redirecting...");
      } else {
        alert("Error loading hero image. Redirecting...");
      }
      router.push("/admin/hero-images");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.image) {
      alert("Please upload an image for the hero banner");
      return;
    }

    setLoading(true);

    try {
      const token = getToken();
      if (!token) {
        alert("Please login to update a hero image");
        router.push("/login");
        return;
      }

      // Prepare data for API - store only imageBase64
      const heroImageData = {
        title: formData.title,
        description: formData.description,
        imageBase64: formData.image,
        badge: formData.badge,
        ctaLabel: formData.ctaLabel,
        ctaHref: formData.ctaHref,
        order: parseInt(formData.order) || 0,
        active: formData.active,
      };

      await updateHeroImage(token, heroImageId, heroImageData);
      router.push("/admin/hero-images");
    } catch (error: any) {
      console.error("Error updating hero image:", error);
      alert(error.message || "An error occurred while updating the hero image");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/hero-images">
            <Button variant="ghost" size="icon" className="text-[#1a3a3a] hover:bg-[#d4f9e6]">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">Edit Hero Image</h1>
            <p className="text-[#4a4a4a]">Loading hero image data...</p>
          </div>
        </div>
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-[#1a3a3a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4a4a4a]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/hero-images">
          <Button variant="ghost" size="icon" className="text-[#1a3a3a] hover:bg-[#d4f9e6]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">Edit Hero Image</h1>
          <p className="text-[#4a4a4a]">Update hero banner information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-[#e5e5e5]">
              <CardHeader>
                <CardTitle className="text-[#1a3a3a]">Hero Image Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#1a1a1a]">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="border-[#d0d0d0] focus:border-[#244543]"
                    placeholder="e.g., Celebrating Lifesaving Achievements"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#1a1a1a]">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    className="border-[#d0d0d0] focus:border-[#244543]"
                    placeholder="Describe the hero banner content..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-[#1a1a1a]">Hero Image *</Label>
                  <ImageUpload
                    value={formData.image}
                    onChange={(base64) => setFormData({ ...formData, image: base64 })}
                  />
                  {!formData.image && (
                    <p className="text-xs text-red-600 mt-1">Image is required</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="badge" className="text-[#1a1a1a]">Badge Text</Label>
                  <Input
                    id="badge"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="border-[#d0d0d0] focus:border-[#244543]"
                    placeholder="e.g., Community Impact"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ctaLabel" className="text-[#1a1a1a]">CTA Button Label</Label>
                    <Input
                      id="ctaLabel"
                      value={formData.ctaLabel}
                      onChange={(e) => setFormData({ ...formData, ctaLabel: e.target.value })}
                      className="border-[#d0d0d0] focus:border-[#244543]"
                      placeholder="e.g., Learn More"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ctaHref" className="text-[#1a1a1a]">CTA Button Link</Label>
                    <Input
                      id="ctaHref"
                      value={formData.ctaHref}
                      onChange={(e) => setFormData({ ...formData, ctaHref: e.target.value })}
                      className="border-[#d0d0d0] focus:border-[#244543]"
                      placeholder="e.g., /about"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-[#e5e5e5]">
              <CardHeader>
                <CardTitle className="text-[#1a3a3a]">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="order" className="text-[#1a1a1a]">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    min="0"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="border-[#d0d0d0] focus:border-[#244543]"
                    placeholder="0"
                  />
                  <p className="text-xs text-[#4a4a4a]">Lower numbers appear first</p>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="active" className="text-[#1a1a1a]">Active</Label>
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#1a3a3a] hover:bg-[#244543] text-white"
              >
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Update Hero Image"}
              </Button>
              <Link href="/admin/hero-images">
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

