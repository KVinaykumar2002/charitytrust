"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Image as ImageIcon } from "lucide-react";
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
import { getAdminHeroImages, deleteHeroImage } from "@/lib/api";
import { getToken } from "@/lib/auth-storage";

interface HeroImage {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  imageBase64?: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
  order?: number;
  active?: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function HeroImagesPage() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedHeroImage, setSelectedHeroImage] = useState<HeroImage | null>(null);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const fetchHeroImages = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const result = await getAdminHeroImages(token);
      if (result.success && result.data) {
        const imagesData = result.data.map((img: any) => ({
          _id: img._id,
          id: img._id || img.id,
          title: img.title || "",
          description: img.description || "",
          imageBase64: img.imageBase64 || "",
          badge: img.badge || "",
          ctaLabel: img.ctaLabel || "",
          ctaHref: img.ctaHref || "/",
          order: img.order || 0,
          active: img.active !== false,
          createdAt: img.createdAt || new Date().toISOString(),
          updatedAt: img.updatedAt || new Date().toISOString(),
        }));
        setHeroImages(imagesData);
      }
    } catch (error) {
      console.error("Error fetching hero images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please login to delete a hero image");
        return;
      }

      await deleteHeroImage(token, id);
      setHeroImages(heroImages.filter((img) => (img._id || img.id) !== id));
      setDeleteDialogOpen(false);
      setSelectedHeroImage(null);
    } catch (error: any) {
      console.error("Error deleting hero image:", error);
      alert(error.message || "Failed to delete hero image");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">Hero Images</h1>
          <p className="text-[#4a4a4a]">Manage hero banner images for the home page</p>
        </div>
        <Link href="/admin/hero-images/new">
          <Button className="bg-[#1a3a3a] hover:bg-[#244543] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Hero Image
          </Button>
        </Link>
      </div>

      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a3a3a]">All Hero Images</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-[#4a4a4a]">Loading...</div>
          ) : heroImages.length === 0 ? (
            <div className="text-center py-8 text-[#4a4a4a]">No hero images found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-[#f8f9f8]">
                  <TableHead className="text-[#1a1a1a]">Preview</TableHead>
                  <TableHead className="text-[#1a1a1a]">Title</TableHead>
                  <TableHead className="text-[#1a1a1a]">Badge</TableHead>
                  <TableHead className="text-[#1a1a1a]">Order</TableHead>
                  <TableHead className="text-[#1a1a1a]">Status</TableHead>
                  <TableHead className="text-[#1a1a1a] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {heroImages.map((image) => (
                  <TableRow key={image.id} className="hover:bg-[#f8f9f8]">
                    <TableCell>
                      {image.imageBase64 ? (
                        <img
                          src={image.imageBase64}
                          alt={image.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-20 h-12 bg-[#f8f9f8] rounded flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-[#d0d0d0]" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-[#1a1a1a]">{image.title}</TableCell>
                    <TableCell className="text-[#4a4a4a]">{image.badge || "-"}</TableCell>
                    <TableCell className="text-[#4a4a4a]">{image.order || 0}</TableCell>
                    <TableCell>
                      {image.active ? (
                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                          Active
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">
                          Inactive
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/hero-images/${image._id || image.id}`}>
                          <Button variant="ghost" size="sm" className="text-[#1a3a3a] hover:bg-[#d4f9e6]">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setSelectedHeroImage(image);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Hero Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedHeroImage?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedHeroImage && handleDelete(selectedHeroImage._id || selectedHeroImage.id || "")}
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

