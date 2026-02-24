"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAdminAwards } from "@/lib/api";
import { getToken } from "@/lib/auth-storage";
import { founderImages } from "@/lib/founder-images";

interface Award {
  _id: string;
  name: string;
  description: string;
  image?: string;
  bgColor?: string;
  order?: number;
  link?: string;
  active?: boolean;
}

export default function AdminAwardsPage() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      const result = await getAdminAwards(token);
      if (result.success && result.data) {
        setAwards(result.data);
      }
    } catch (error) {
      console.error("Error fetching awards:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Awards & Recognitions</h1>
        <p className="text-[#4a4a4a]">
          Manage awards shown on the About page. Add a link so that clicking an award opens a URL (e.g. article or detail page).
        </p>
      </div>

      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a1a1a]">All Awards ({awards.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-[#FD7E14]" />
            </div>
          ) : awards.length === 0 ? (
            <div className="text-center py-12 text-[#4a4a4a]">
              No awards found. Add awards via your backend or seed script.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards.map((award) => (
                <Card key={award._id} className="border-[#e5e5e5] hover:shadow-lg transition-shadow overflow-hidden">
                  <div
                    className="h-40 relative"
                    style={{ backgroundColor: award.bgColor || "#fdf5e6" }}
                  >
                    <Image
                      src={award.image?.trim() || founderImages.portrait}
                      alt={award.name}
                      fill
                      className="object-cover opacity-60"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">{award.name}</h3>
                    <p className="text-sm text-[#4a4a4a] line-clamp-2 mb-3">{award.description}</p>
                    {award.link?.trim() ? (
                      <p className="text-xs text-green-600 mb-3 flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        Link set – opens in new tab
                      </p>
                    ) : (
                      <p className="text-xs text-[#4a4a4a] mb-3">No link – click won’t navigate</p>
                    )}
                    <Link href={`/admin/awards/${award._id}`} className="block">
                      <Button variant="outline" size="sm" className="w-full border-[#FD7E14] text-[#FD7E14] hover:bg-[#FFF3E8]">
                        <Edit className="mr-2 h-3 w-3" />
                        Edit (add link)
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
