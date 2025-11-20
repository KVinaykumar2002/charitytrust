"use client";

import { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    } else if (session) {
      setFormData({
        name: session.user?.name || "",
        email: session.user?.email || "",
        phone: "",
        address: "",
      });
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update profile API call
      console.log("Updating profile:", formData);
      // await updateProfile(formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9f8]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1a3a3a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4a4a4a]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9f8]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1a3a3a] mb-8">Profile Settings</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="border-[#e5e5e5]">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="bg-[#1a3a3a] text-white text-2xl">
                      {session.user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-[#1a1a1a] mb-1">
                    {session.user?.name || "User"}
                  </h2>
                  <p className="text-sm text-[#4a4a4a] mb-4">{session.user?.email}</p>
                  {session.user?.role === "admin" && (
                    <span className="text-xs font-semibold text-[#1a3a3a] bg-[#d4f9e6] px-3 py-1 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Edit Form */}
            <Card className="lg:col-span-2 border-[#e5e5e5]">
              <CardHeader>
                <CardTitle className="text-[#1a3a3a]">Personal Information</CardTitle>
                <CardDescription>Update your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#1a1a1a] flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-[#d0d0d0] focus:border-[#244543]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#1a1a1a] flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="border-[#d0d0d0] bg-[#f8f9f8]"
                    />
                    <p className="text-xs text-[#4a4a4a]">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#1a1a1a] flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-[#d0d0d0] focus:border-[#244543]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-[#1a1a1a] flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="border-[#d0d0d0] focus:border-[#244543]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1a3a3a] hover:bg-[#244543] text-white"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

