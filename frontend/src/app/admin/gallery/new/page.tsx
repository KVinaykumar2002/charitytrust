"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import { getToken } from "@/lib/auth-storage";
import { createGalleryItem } from "@/lib/api";

export default function NewGalleryItemPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    mainCategory: "",
    subCategory: "",
    title: "",
    images: [] as string[],
    order: 0,
    active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.mainCategory.trim() || !formData.subCategory.trim()) {
      alert("Main category and Sub category are required.");
      return;
    }
    setSaving(true);
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }
      await createGalleryItem(token, {
        mainCategory: formData.mainCategory.trim(),
        subCategory: formData.subCategory.trim(),
        title: formData.title.trim() || undefined,
        images: formData.images,
        order: formData.order,
        active: formData.active,
      });
      router.push("/admin/gallery");
    } catch (error: any) {
      alert(error.message || "Failed to create gallery item");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/gallery">
          <Button variant="ghost" size="icon" className="text-[#FD7E14] hover:bg-[#FFF3E8]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Add gallery item</h1>
          <p className="text-[#4a4a4a]">Main category → Sub category. Upload multiple images for this sub-category.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-[#e5e5e5] max-w-2xl">
          <CardHeader>
            <CardTitle className="text-[#1a1a1a]">Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#1a1a1a]">Main category *</Label>
                <Input
                  value={formData.mainCategory}
                  onChange={(e) => setFormData({ ...formData, mainCategory: e.target.value })}
                  placeholder="e.g. Events, Projects, Programs"
                  required
                  className="border-[#d0d0d0]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#1a1a1a]">Sub category *</Label>
                <Input
                  value={formData.subCategory}
                  onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                  placeholder="e.g. Charity, Awareness"
                  required
                  className="border-[#d0d0d0]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Title (optional)</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Short label for this set"
                className="border-[#d0d0d0]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#1a1a1a]">Images</Label>
              <MultiImageUpload
                value={formData.images}
                onChange={(arr) => setFormData({ ...formData, images: arr.slice(0, 20) })}
              />
              <p className="text-xs text-[#4a4a4a]">These images will show when users select this main → sub on the Gallery page.</p>
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-[#1a1a1a]">Active</Label>
              <Switch
                checked={formData.active}
                onCheckedChange={(c) => setFormData({ ...formData, active: c })}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={saving} className="bg-[#FD7E14] hover:bg-[#E56B00] text-white">
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Create"}
              </Button>
              <Link href="/admin/gallery">
                <Button type="button" variant="outline" className="border-[#e5e5e5]">Cancel</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
