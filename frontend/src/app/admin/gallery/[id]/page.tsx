"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import MultiImageUpload from "@/components/admin/MultiImageUpload";
import { getToken } from "@/lib/auth-storage";
import { getAdminGalleryItem, updateGalleryItem } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditGalleryItemPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    mainCategory: "",
    subCategory: "",
    title: "",
    images: [] as string[],
    order: 0,
    active: true,
  });

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }
      const result = await getAdminGalleryItem(token, id);
      if (result.success && result.data) {
        const g = result.data;
        setFormData({
          mainCategory: g.mainCategory || "",
          subCategory: g.subCategory || "",
          title: g.title || "",
          images: Array.isArray(g.images) ? g.images : [],
          order: g.order ?? 0,
          active: g.active !== false,
        });
      }
    } catch (error) {
      console.error("Error fetching gallery item:", error);
      alert("Failed to load gallery item");
      router.push("/admin/gallery");
    } finally {
      setLoading(false);
    }
  };

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
      await updateGalleryItem(token, id, {
        mainCategory: formData.mainCategory.trim(),
        subCategory: formData.subCategory.trim(),
        title: formData.title.trim() || undefined,
        images: formData.images,
        order: formData.order,
        active: formData.active,
      });
      router.push("/admin/gallery");
    } catch (error: any) {
      alert(error.message || "Failed to update gallery item");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#FD7E14]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/gallery">
          <Button variant="ghost" size="icon" className="text-[#FD7E14] hover:bg-[#FFF3E8]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Edit gallery item</h1>
          <p className="text-[#4a4a4a]">{formData.mainCategory} → {formData.subCategory}</p>
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
                {saving ? "Saving..." : "Update"}
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
