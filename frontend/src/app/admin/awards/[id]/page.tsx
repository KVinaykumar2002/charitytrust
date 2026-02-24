"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import { getToken } from "@/lib/auth-storage";
import { getAdminAward, updateAward } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditAwardPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    bgColor: "#fdf5e6",
    order: 0,
    link: "",
    active: true,
  });

  useEffect(() => {
    fetchAward();
  }, [id]);

  const fetchAward = async () => {
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }
      const result = await getAdminAward(token, id);
      if (result.success && result.data) {
        const a = result.data;
        setFormData({
          name: a.name || "",
          description: a.description || "",
          image: a.image || "",
          bgColor: a.bgColor || "#fdf5e6",
          order: a.order ?? 0,
          link: a.link || "",
          active: a.active !== false,
        });
      }
    } catch (error) {
      console.error("Error fetching award:", error);
      alert("Failed to load award");
      router.push("/admin/awards");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = getToken();
      if (!token) {
        alert("Please login to update the award");
        router.push("/login");
        return;
      }
      await updateAward(token, id, {
        name: formData.name,
        description: formData.description,
        image: formData.image,
        bgColor: formData.bgColor,
        order: formData.order,
        link: formData.link.trim() || undefined,
        active: formData.active,
      });
      router.push("/admin/awards");
    } catch (error: any) {
      console.error("Error updating award:", error);
      alert(error.message || "Failed to update award");
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
        <Link href="/admin/awards">
          <Button variant="ghost" size="icon" className="text-[#FD7E14] hover:bg-[#FFF3E8]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Edit Award</h1>
          <p className="text-[#4a4a4a]">Update award details. You set the link here — when someone clicks this award on the site, they will navigate to that URL.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-[#e5e5e5]">
              <CardHeader>
                <CardTitle className="text-[#1a1a1a]">Award Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[#1a1a1a]">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="border-[#d0d0d0] focus:border-[#E56B00]"
                    placeholder="e.g., NTR National Award"
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
                    className="border-[#d0d0d0] focus:border-[#E56B00]"
                    placeholder="Short description of the award"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link" className="text-[#1a1a1a]">Where to go when award is clicked (you set this link)</Label>
                  <Input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="border-[#d0d0d0] focus:border-[#E56B00]"
                    placeholder="https://example.com/award-article-or-detail-page"
                  />
                  <p className="text-xs text-[#4a4a4a]">
                    Admin must enter the URL here. When a visitor clicks this award on the About page, they will be taken to this link (opens in a new tab). Leave empty if the award should not be clickable.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-[#1a1a1a]">Image</Label>
                  <ImageUpload
                    value={formData.image}
                    onChange={(base64) => setFormData({ ...formData, image: base64 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bgColor" className="text-[#1a1a1a]">Background colour</Label>
                  <Input
                    id="bgColor"
                    value={formData.bgColor}
                    onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                    className="border-[#d0d0d0] focus:border-[#E56B00]"
                    placeholder="#fdf5e6"
                  />
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
                  <Label htmlFor="order" className="text-[#1a1a1a]">Display order</Label>
                  <Input
                    id="order"
                    type="number"
                    min={0}
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })}
                    className="border-[#d0d0d0] focus:border-[#E56B00]"
                  />
                  <p className="text-xs text-[#4a4a4a]">Lower numbers appear first</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="active" className="text-[#1a1a1a]">Active</Label>
                    <p className="text-xs text-[#4a4a4a]">Show on the About page</p>
                  </div>
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
                disabled={saving}
                className="flex-1 bg-[#FD7E14] hover:bg-[#E56B00] text-white"
              >
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Update Award"}
              </Button>
              <Link href="/admin/awards">
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
