"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Upload, Video } from "lucide-react";
import NavigationHeader from "@/components/sections/navigation-header";
import { Component as FlickeringFooter } from "@/components/ui/flickering-footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MultiImageUpload from "@/components/MultiImageUpload";
import { submitFanEvent } from "@/lib/api";

export default function FanEventSubmitPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    eventDate: "",
    eventBy: "",
    photos: [] as string[],
    videoBase64: "",
    videoUrl: "",
  });

  const handleVideoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("video/")) {
      alert("Please select a video file");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      alert("Video must be under 25MB (approx 30 seconds)");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, videoBase64: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.eventDate || !formData.eventBy.trim()) {
      alert("Please fill in Event Title, Event Date, and Event By (organizer name)");
      return;
    }

    setLoading(true);
    try {
      await submitFanEvent({
        title: formData.title.trim(),
        eventDate: new Date(formData.eventDate).toISOString(),
        eventBy: formData.eventBy.trim(),
        photos: formData.photos.length > 0 ? formData.photos : undefined,
        videoBase64: formData.videoBase64 || undefined,
        videoUrl: formData.videoUrl.trim() || undefined,
      });
      setSuccess(true);
      setFormData({
        title: "",
        eventDate: "",
        eventBy: "",
        photos: [],
        videoBase64: "",
        videoUrl: "",
      });
    } catch (error: any) {
      alert(error.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
        <NavigationHeader />
        <main className="flex-1 pt-32 pb-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto text-center py-20"
          >
            <div className="inline-flex p-4 rounded-full bg-green-500/20 mb-6">
              <Heart className="h-12 w-12 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Thank You!</h1>
            <p className="text-white/60 mb-8">
              Your fan event has been submitted for review. It will appear on the website once
              approved by our team.
            </p>
            <Link
              href="/events-by-fans"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FD7E14] hover:bg-[#E56B00] text-white font-semibold rounded-full transition-colors"
            >
              View Events by Fans
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </motion.div>
        </main>
        <FlickeringFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <NavigationHeader />

      <main className="flex-1 pt-32 pb-20">
        <section className="px-6 md:px-12 lg:px-20 mb-12">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/events-by-fans"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#FD7E14] mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Events by Fans
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-[0.2em] uppercase text-[#FD7E14] border border-[#FD7E14]/30 rounded-full">
                Chiranjeevi Gari Inspiration
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Submit Your Fan Event
              </h1>
              <p className="text-white/60">
                Share your event inspired by Chiranjeevi garu. Events will be reviewed and
                approved before appearing on the website.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-white mb-2 block">
                  Event Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="e.g., Blood Donation Camp by Fans"
                  className="bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[#FD7E14]"
                />
              </div>

              <div>
                <Label htmlFor="eventDate" className="text-white mb-2 block">
                  Event Date *
                </Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  required
                  className="bg-white/5 border-white/10 text-white focus:border-[#FD7E14]"
                />
              </div>

              <div>
                <Label htmlFor="eventBy" className="text-white mb-2 block">
                  Event By (Organizer Name) *
                </Label>
                <Input
                  id="eventBy"
                  value={formData.eventBy}
                  onChange={(e) => setFormData({ ...formData, eventBy: e.target.value })}
                  required
                  placeholder="e.g., Hyderabad Chiranjeevi Fans Association"
                  className="bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[#FD7E14]"
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">Event Photos (up to 5)</Label>
                <MultiImageUpload
                  value={formData.photos}
                  onChange={(photos) => setFormData({ ...formData, photos })}
                  maxImages={5}
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">
                  Event Video (max 30 seconds / 25MB)
                </Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 transition-colors">
                      <Video className="h-4 w-4 text-[#FD7E14]" />
                      <span className="text-sm text-white/80">Upload Video</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoFile}
                        className="hidden"
                      />
                    </label>
                    {formData.videoBase64 && (
                      <span className="text-xs text-green-400">Video uploaded</span>
                    )}
                  </div>
                  <p className="text-xs text-white/50">
                    Or paste a video URL (YouTube, Vimeo, etc.)
                  </p>
                  <Input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://..."
                    className="bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-[#FD7E14]"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-[#FD7E14] hover:bg-[#E56B00] text-white font-semibold rounded-xl"
              >
                {loading ? "Submitting..." : "Submit for Review"}
              </Button>
            </form>
          </div>
        </section>
      </main>

      <FlickeringFooter />
    </div>
  );
}
