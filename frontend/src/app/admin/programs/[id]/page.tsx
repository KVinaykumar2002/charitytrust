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

export default function EditProgramPage() {
  const router = useRouter();
  const params = useParams();
  const programId = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    link: "",
    featured: false,
  });

  useEffect(() => {
    fetchProgram();
  }, [programId]);

  const fetchProgram = async () => {
    try {
      const token = getToken();
      const response = await fetch(`https://charitytrust-eykm.onrender.com/api/admin/programs/${programId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        const program = result.data || result;
        setFormData({
          title: program.title || "",
          description: program.description || "",
          category: program.category || "",
          image: program.imageBase64 || program.image || program.imageUrl || "",
          link: program.link || "",
          featured: program.featured || false,
        });
      } else {
        console.error("Failed to fetch program");
        alert("Failed to load program. Redirecting...");
        router.push("/admin/programs");
      }
    } catch (error) {
      console.error("Error fetching program:", error);
      alert("Error loading program. Redirecting...");
      router.push("/admin/programs");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.image) {
      alert("Please upload an image for the program");
      return;
    }

    setLoading(true);

    try {
      const token = getToken();
      if (!token) {
        alert("Please login to update a program");
        router.push("/login");
        return;
      }

      const response = await fetch(`https://charitytrust-eykm.onrender.com/api/admin/programs/${programId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          imageBase64: formData.image, // Store base64 in imageBase64 field
        }),
      });

      if (response.ok) {
        router.push("/admin/programs");
      } else {
        const errorData = await response.json();
        console.error("Failed to update program:", errorData);
        alert(errorData.message || "Failed to update program");
      }
    } catch (error) {
      console.error("Error updating program:", error);
      alert("An error occurred while updating the program");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1a3a3a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4a4a4a]">Loading program...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/programs">
          <Button variant="ghost" size="icon" className="text-[#1a3a3a] hover:bg-[#d4f9e6]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">Edit Program</h1>
          <p className="text-[#4a4a4a]">Update program details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-[#e5e5e5]">
              <CardHeader>
                <CardTitle className="text-[#1a3a3a]">Program Details</CardTitle>
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[#1a1a1a]">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={6}
                    className="border-[#d0d0d0] focus:border-[#244543]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-[#1a1a1a]">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="border-[#d0d0d0] focus:border-[#244543]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-[#1a1a1a]">Program Image *</Label>
                  <ImageUpload
                    value={formData.image}
                    onChange={(base64) => setFormData({ ...formData, image: base64 })}
                  />
                  {!formData.image && (
                    <p className="text-xs text-red-600 mt-1">Image is required</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="link" className="text-[#1a1a1a]">Link</Label>
                  <Input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="border-[#d0d0d0] focus:border-[#244543]"
                  />
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured" className="text-[#1a1a1a]">Featured Program</Label>
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
                className="flex-1 bg-[#1a3a3a] hover:bg-[#244543] text-white"
              >
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Updating..." : "Update Program"}
              </Button>
              <Link href="/admin/programs">
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

