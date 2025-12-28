"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
import { getAdminTimeline, deleteTimelineEntry } from "@/lib/api";
import { getToken } from "@/lib/auth-storage";

interface TimelineEntry {
  _id: string;
  year: string;
  title: string;
  description: string;
  highlights?: string[];
  icon: string;
  iconColor: string;
  images?: { base64?: string; url?: string; alt?: string }[];
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const iconColorClasses: Record<string, string> = {
  red: "bg-gradient-to-br from-red-500 to-red-600",
  blue: "bg-gradient-to-br from-blue-500 to-blue-600",
  green: "bg-gradient-to-br from-green-500 to-green-600",
  purple: "bg-gradient-to-br from-purple-500 to-purple-600",
  orange: "bg-gradient-to-br from-orange-500 to-orange-600",
  cyan: "bg-gradient-to-br from-cyan-500 to-cyan-600",
  yellow: "bg-gradient-to-br from-yellow-500 to-yellow-600",
  pink: "bg-gradient-to-br from-pink-500 to-pink-600",
  indigo: "bg-gradient-to-br from-indigo-500 to-indigo-600",
  teal: "bg-gradient-to-br from-teal-500 to-teal-600",
};

export default function TimelinePage() {
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<TimelineEntry | null>(null);

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const result = await getAdminTimeline(token);
      if (result.success && result.data) {
        setTimeline(result.data);
      }
    } catch (error) {
      console.error("Error fetching timeline:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please login to delete a timeline entry");
        return;
      }

      await deleteTimelineEntry(token, id);
      setTimeline(timeline.filter((t) => t._id !== id));
      setDeleteDialogOpen(false);
      setSelectedEntry(null);
    } catch (error: any) {
      console.error("Error deleting timeline entry:", error);
      alert(error.message || "Failed to delete timeline entry");
      setDeleteDialogOpen(false);
      setSelectedEntry(null);
    }
  };

  const getDisplayImage = (entry: TimelineEntry) => {
    if (entry.images && entry.images.length > 0) {
      return entry.images[0].base64 || entry.images[0].url;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Timeline</h1>
          <p className="text-[#4a4a4a]">Manage your organization&apos;s journey milestones</p>
        </div>
        <Link href="/admin/timeline/new">
          <Button className="bg-[#FD7E14] hover:bg-[#E56B00] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Milestone
          </Button>
        </Link>
      </div>

      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a1a1a]">Journey Timeline ({timeline.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-[#4a4a4a]">Loading...</div>
          ) : timeline.length === 0 ? (
            <div className="text-center py-8 text-[#4a4a4a]">
              <p className="mb-4">No timeline entries found</p>
              <Link href="/admin/timeline/new">
                <Button className="bg-[#FD7E14] hover:bg-[#E56B00] text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Milestone
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {timeline.map((entry, index) => (
                <Card key={entry._id} className="border-[#e5e5e5] hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Drag Handle & Order */}
                      <div className="flex flex-col items-center gap-2 text-[#a0a0a0]">
                        <GripVertical className="h-5 w-5 cursor-grab" />
                        <span className="text-xs font-medium">#{index + 1}</span>
                      </div>

                      {/* Icon */}
                      <div className={`w-12 h-12 ${iconColorClasses[entry.iconColor] || iconColorClasses.red} rounded-full flex items-center justify-center shadow-lg shrink-0`}>
                        <span className="text-white text-lg">
                          {entry.icon === 'heart' && '❤️'}
                          {entry.icon === 'eye' && '👁️'}
                          {entry.icon === 'wind' && '💨'}
                          {entry.icon === 'hospital' && '🏥'}
                          {entry.icon === 'users' && '👥'}
                          {entry.icon === 'target' && '🎯'}
                          {entry.icon === 'award' && '🏆'}
                          {entry.icon === 'star' && '⭐'}
                          {entry.icon === 'gift' && '🎁'}
                          {entry.icon === 'globe' && '🌍'}
                          {entry.icon === 'building' && '🏢'}
                          {entry.icon === 'graduation' && '🎓'}
                          {entry.icon === 'truck' && '🚚'}
                          {entry.icon === 'shield' && '🛡️'}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-[#FD7E14]">{entry.year}</span>
                          {!entry.active && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded">
                              <EyeOff className="h-3 w-3" />
                              Hidden
                            </span>
                          )}
                          {entry.active && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded">
                              <Eye className="h-3 w-3" />
                              Visible
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-[#1a1a1a] text-lg">{entry.title}</h3>
                        <p className="text-sm text-[#4a4a4a] line-clamp-2 mt-1">
                          {entry.description}
                        </p>
                        {entry.highlights && entry.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {entry.highlights.slice(0, 3).map((h, i) => (
                              <span key={i} className="text-xs bg-[#FFF3E8] text-[#FD7E14] px-2 py-0.5 rounded">
                                {h.length > 30 ? h.substring(0, 30) + '...' : h}
                              </span>
                            ))}
                            {entry.highlights.length > 3 && (
                              <span className="text-xs text-[#4a4a4a]">
                                +{entry.highlights.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Image Preview */}
                      {getDisplayImage(entry) && (
                        <div className="hidden md:block shrink-0">
                          <Image
                            src={getDisplayImage(entry)!}
                            alt={entry.title}
                            width={80}
                            height={60}
                            className="rounded-lg object-cover w-20 h-15"
                          />
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 shrink-0">
                        <Link href={`/admin/timeline/${entry._id}`}>
                          <Button variant="outline" size="sm" className="border-[#FD7E14] text-[#FD7E14] hover:bg-[#FFF3E8]">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setSelectedEntry(entry);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Timeline Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &ldquo;{selectedEntry?.title}&rdquo; ({selectedEntry?.year})? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedEntry && handleDelete(selectedEntry._id)}
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

