"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">Settings</h1>
        <p className="text-[#4a4a4a]">Manage your account and website settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <CardTitle className="text-[#1a3a3a]">General Settings</CardTitle>
            <CardDescription>Update your website settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="text-[#1a1a1a]">Site Name</Label>
              <Input
                id="siteName"
                defaultValue="Chiranjeevi Charity Trust"
                className="border-[#d0d0d0] focus:border-[#244543]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteEmail" className="text-[#1a1a1a]">Contact Email</Label>
              <Input
                id="siteEmail"
                type="email"
                defaultValue="contact@charitytrust.org"
                className="border-[#d0d0d0] focus:border-[#244543]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sitePhone" className="text-[#1a1a1a]">Contact Phone</Label>
              <Input
                id="sitePhone"
                type="tel"
                defaultValue="+91 1234567890"
                className="border-[#d0d0d0] focus:border-[#244543]"
              />
            </div>
            <Button className="bg-[#1a3a3a] hover:bg-[#244543] text-white">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <CardTitle className="text-[#1a3a3a]">Notification Settings</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" className="text-[#1a1a1a]">Email Notifications</Label>
                <p className="text-sm text-[#4a4a4a]">Receive email updates for new donations</p>
              </div>
              <Switch id="emailNotifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="donationAlerts" className="text-[#1a1a1a]">Donation Alerts</Label>
                <p className="text-sm text-[#4a4a4a]">Get notified when donations are received</p>
              </div>
              <Switch id="donationAlerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="eventReminders" className="text-[#1a1a1a]">Event Reminders</Label>
                <p className="text-sm text-[#4a4a4a]">Reminders for upcoming events</p>
              </div>
              <Switch id="eventReminders" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

