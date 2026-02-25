"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Images, Loader2 } from "lucide-react";
import Link from "next/link";
import { getAdminGallery } from "@/lib/api";
import { getToken } from "@/lib/auth-storage";

interface GalleryItem {
  _id: string;
  mainCategory: string;
  subCategory: string;
  title?: string;
  images?: string[];
  order?: number;
  active?: boolean;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      const result = await getAdminGallery(token);
      if (result.success && result.data) setItems(result.data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Gallery</h1>
          <p className="text-[#4a4a4a]">
            Main category → Sub category. Upload multiple images per sub-category. They appear on the public Gallery page.
          </p>
        </div>
        <Link href="/admin/gallery/new">
          <Button className="bg-[#FD7E14] hover:bg-[#E56B00] text-white">
            <Images className="mr-2 h-4 w-4" />
            Add gallery item
          </Button>
        </Link>
      </div>

      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a1a1a]">All gallery items ({items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#FD7E14]" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-[#4a4a4a]">
              No gallery items yet. Add one with a main category (e.g. Events), sub-category (e.g. Charity), and multiple images.
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 rounded-lg border border-[#e5e5e5] hover:bg-[#f8f9f8]"
                >
                  <div>
                    <span className="font-semibold text-[#1a1a1a]">{item.mainCategory}</span>
                    <span className="text-[#4a4a4a] mx-2">→</span>
                    <span className="font-medium text-[#1a1a1a]">{item.subCategory}</span>
                    {item.title && (
                      <span className="text-[#4a4a4a] text-sm ml-2">({item.title})</span>
                    )}
                    <span className="ml-3 text-sm text-[#4a4a4a]">
                      {(item.images?.length || 0)} image(s)
                    </span>
                  </div>
                  <Link href={`/admin/gallery/${item._id}`}>
                    <Button variant="outline" size="sm" className="border-[#FD7E14] text-[#FD7E14] hover:bg-[#FFF3E8]">
                      <Edit className="mr-2 h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
