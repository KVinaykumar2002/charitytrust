"use client";

import { useState, useEffect, use } from "react";
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
import { ArrowLeft, Save, Plus, X, ImagePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getToken } from "@/lib/auth-storage";
import { getAdminTimelineEntry, updateTimelineEntry } from "@/lib/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

const iconOptions = [
  { value: "heart", label: "Heart ❤️", emoji: "❤️" },
  { value: "eye", label: "Eye 👁️", emoji: "👁️" },
  { value: "wind", label: "Wind 💨", emoji: "💨" },
  { value: "hospital", label: "Hospital 🏥", emoji: "🏥" },
  { value: "users", label: "Users 👥", emoji: "👥" },
  { value: "target", label: "Target 🎯", emoji: "🎯" },
  { value: "award", label: "Award 🏆", emoji: "🏆" },
  { value: "star", label: "Star ⭐", emoji: "⭐" },
  { value: "gift", label: "Gift 🎁", emoji: "🎁" },
  { value: "globe", label: "Globe 🌍", emoji: "🌍" },
  { value: "building", label: "Building 🏢", emoji: "🏢" },
  { value: "graduation", label: "Graduation 🎓", emoji: "🎓" },
  { value: "truck", label: "Truck 🚚", emoji: "🚚" },
  { value: "shield", label: "Shield 🛡️", emoji: "🛡️" },
];

const colorOptions = [
  { value: "red", label: "Red", class: "bg-red-500" },
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "green", label: "Green", class: "bg-green-500" },
  { value: "purple", label: "Purple", class: "bg-purple-500" },
  { value: "orange", label: "Orange", class: "bg-orange-500" },
  { value: "cyan", label: "Cyan", class: "bg-cyan-500" },
  { value: "yellow", label: "Yellow", class: "bg-yellow-500" },
  { value: "pink", label: "Pink", class: "bg-pink-500" },
  { value: "indigo", label: "Indigo", class: "bg-indigo-500" },
  { value: "teal", label: "Teal", class: "bg-teal-500" },
];

export default function EditTimelinePage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    description: "",
    highlights: [] as string[],
    icon: "heart",
    iconColor: "red",
    images: [] as { base64: string; alt: string }[],
    active: true,
    order: 0,
  });
  const [newHighlight, setNewHighlight] = useState("");

  useEffect(() => {
    fetchTimelineEntry();
  }, [id]);

  const fetchTimelineEntry = async () => {
    try {
      const token = getToken();
      if (!token) {
        router.push("/login");
        return;
      }

      const result = await getAdminTimelineEntry(token, id);
      if (result.success && result.data) {
        const entry = result.data;
        setFormData({
          year: entry.year || "",
          title: entry.title || "",
          description: entry.description || "",
          highlights: entry.highlights || [],
          icon: entry.icon || "heart",
          iconColor: entry.iconColor || "red",
          images: entry.images?.map((img: any) => ({
            base64: img.base64 || img.url || "",
            alt: img.alt || "Timeline image",
          })) || [],
          active: entry.active !== false,
          order: entry.order || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching timeline entry:", error);
      alert("Failed to load timeline entry");
      router.push("/admin/timeline");
    } finally {
      setLoading(false);
    }
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, newHighlight.trim()],
      });
      setNewHighlight("");
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData({
      ...formData,
      highlights: formData.highlights.filter((_, i) => i !== index),
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setFormData({
          ...formData,
          images: [...formData.images, { base64, alt: file.name }],
        });
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = getToken();
      if (!token) {
        alert("Please login to update the timeline entry");
        router.push("/login");
        return;
      }

      await updateTimelineEntry(token, id, formData);
      router.push("/admin/timeline");
    } catch (error: any) {
      console.error("Error updating timeline entry:", error);
      alert(error.message || "An error occurred while updating the timeline entry");
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
        <Link href="/admin/timeline">
          <Button variant="ghost" size="icon" className="text-[#FD7E14] hover:bg-[#FFF3E8]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Edit Milestone</h1>
          <p className="text-[#4a4a4a]">Update timeline milestone details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-[#e5e5e5]">
              <CardHeader>
                <CardTitle className="text-[#1a1a1a]">Milestone Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-[#1a1a1a]">Year / Period *</Label>
                    <Input
                      id="year"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      required
                      className="border-[#d0d0d0] focus:border-[#E56B00]"
                      placeholder="e.g., 1998 or 2000-2005"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-[#1a1a1a]">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="border-[#d0d0d0] focus:border-[#E56B00]"
                      placeholder="e.g., The Beginning"
                    />
                  </div>
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
                    placeholder="Describe this milestone..."
                  />
                </div>

                {/* Highlights */}
                <div className="space-y-2">
                  <Label className="text-[#1a1a1a]">Highlights (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddHighlight();
                        }
                      }}
                      className="border-[#d0d0d0] focus:border-[#E56B00]"
                      placeholder="Add a highlight, e.g., ✅ 10,000 lives saved"
                    />
                    <Button
                      type="button"
                      onClick={handleAddHighlight}
                      variant="outline"
                      className="border-[#FD7E14] text-[#FD7E14] hover:bg-[#FFF3E8]"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.highlights.map((highlight, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 bg-[#FFF3E8] text-[#FD7E14] px-3 py-1 rounded-full text-sm"
                        >
                          {highlight}
                          <button
                            type="button"
                            onClick={() => handleRemoveHighlight(index)}
                            className="hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Images */}
                <div className="space-y-2">
                  <Label className="text-[#1a1a1a]">Images (Optional)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={img.base64}
                          alt={img.alt}
                          width={200}
                          height={150}
                          className="rounded-lg object-cover w-full h-24"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    <label className="border-2 border-dashed border-[#d0d0d0] rounded-lg h-24 flex flex-col items-center justify-center cursor-pointer hover:border-[#FD7E14] transition-colors">
                      <ImagePlus className="h-6 w-6 text-[#a0a0a0]" />
                      <span className="text-xs text-[#a0a0a0] mt-1">Add Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-[#4a4a4a]">Recommended: 2-4 images per milestone</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-[#e5e5e5]">
              <CardHeader>
                <CardTitle className="text-[#1a1a1a]">Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="icon" className="text-[#1a1a1a]">Icon *</Label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData({ ...formData, icon: value })}
                  >
                    <SelectTrigger className="border-[#d0d0d0] focus:border-[#E56B00]">
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((icon) => (
                        <SelectItem key={icon.value} value={icon.value}>
                          {icon.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#1a1a1a]">Icon Color *</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, iconColor: color.value })}
                        className={`w-8 h-8 rounded-full ${color.class} ${
                          formData.iconColor === color.value
                            ? "ring-2 ring-offset-2 ring-[#FD7E14]"
                            : ""
                        } transition-all`}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="pt-4 border-t">
                  <Label className="text-[#1a1a1a] mb-2 block">Preview</Label>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br from-${formData.iconColor}-500 to-${formData.iconColor}-600 rounded-full flex items-center justify-center shadow-lg`}
                      style={{
                        background: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))`,
                        '--tw-gradient-from': colorOptions.find(c => c.value === formData.iconColor)?.class.replace('bg-', 'var(--') || 'var(--red-500)',
                      } as any}
                    >
                      <span className="text-white text-lg">
                        {iconOptions.find(i => i.value === formData.icon)?.emoji}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#FD7E14]">{formData.year || "Year"}</p>
                      <p className="font-semibold text-[#1a1a1a]">{formData.title || "Title"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#e5e5e5]">
              <CardHeader>
                <CardTitle className="text-[#1a1a1a]">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                    <Label htmlFor="active" className="text-[#1a1a1a]">Active</Label>
                    <p className="text-xs text-[#4a4a4a]">Show on public timeline</p>
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
                {saving ? "Saving..." : "Update Milestone"}
              </Button>
              <Link href="/admin/timeline">
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

