"use client";

import { useState } from "react";
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
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";
import { getToken } from "@/lib/auth-storage";
import { createEvent } from "@/lib/api";

export default function NewEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image: "",
    status: "upcoming",
    maxAttendees: "",
    currentAttendees: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.image) {
      alert("Please upload an image for the event");
      return;
    }

    setLoading(true);

    try {
      const token = getToken();
      if (!token) {
        alert("Please login to create an event");
        router.push("/login");
        return;
      }

      // Prepare data for API - store only imageBase64
      const eventData = {
        title: formData.title,
        description: formData.description,
        date: new Date(formData.date).toISOString(),
        location: formData.location,
        imageBase64: formData.image, // Store only imageBase64
        status: formData.status,
        maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : 0,
        currentAttendees: formData.currentAttendees ? parseInt(formData.currentAttendees) : 0,
      };

      await createEvent(token, eventData);
      router.push("/admin/events");
    } catch (error: any) {
      console.error("Error creating event:", error);
      alert(error.message || "An error occurred while creating the event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/events">
          <Button variant="ghost" size="icon" className="text-[#1a3a3a] hover:bg-[#d4f9e6]">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">New Event</h1>
          <p className="text-[#4a4a4a]">Create a new charity event</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-[#e5e5e5]">
              <CardHeader>
                <CardTitle className="text-[#1a3a3a]">Event Details</CardTitle>
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
                    placeholder="e.g., Blood Donation Drive"
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
                    placeholder="Describe the event, its purpose, and what attendees can expect..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-[#1a1a1a]">Event Date *</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="border-[#d0d0d0] focus:border-[#244543]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-[#1a1a1a]">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                      className="border-[#d0d0d0] focus:border-[#244543]"
                      placeholder="e.g., Hyderabad, Telangana"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-[#1a1a1a]">Event Image *</Label>
                  <ImageUpload
                    value={formData.image}
                    onChange={(base64) => setFormData({ ...formData, image: base64 })}
                  />
                  {!formData.image && (
                    <p className="text-xs text-red-600 mt-1">Image is required</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-[#e5e5e5]">
              <CardHeader>
                <CardTitle className="text-[#1a3a3a]">Event Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-[#1a1a1a]">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="border-[#d0d0d0] focus:border-[#244543]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxAttendees" className="text-[#1a1a1a]">Max Attendees</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    min="0"
                    value={formData.maxAttendees}
                    onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                    className="border-[#d0d0d0] focus:border-[#244543]"
                    placeholder="0 for unlimited"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentAttendees" className="text-[#1a1a1a]">Current Attendees</Label>
                  <Input
                    id="currentAttendees"
                    type="number"
                    min="0"
                    value={formData.currentAttendees}
                    onChange={(e) => setFormData({ ...formData, currentAttendees: e.target.value })}
                    className="border-[#d0d0d0] focus:border-[#244543]"
                    placeholder="0"
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
                {loading ? "Saving..." : "Save Event"}
              </Button>
              <Link href="/admin/events">
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

