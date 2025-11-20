"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Save, Bell, Mail, Shield } from "lucide-react";

export default function DashboardSettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    donationReceipts: true,
    eventReminders: true,
    newsletter: false,
    smsNotifications: false,
  });

  const handleSave = () => {
    // Save settings
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">Settings</h1>
        <p className="text-[#4a4a4a]">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <CardTitle className="text-[#1a3a3a] flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" className="text-[#1a1a1a]">
                  Email Notifications
                </Label>
                <p className="text-xs text-[#4a4a4a]">Receive updates via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, emailNotifications: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="donationReceipts" className="text-[#1a1a1a]">
                  Donation Receipts
                </Label>
                <p className="text-xs text-[#4a4a4a]">Email receipts for donations</p>
              </div>
              <Switch
                id="donationReceipts"
                checked={settings.donationReceipts}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, donationReceipts: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="eventReminders" className="text-[#1a1a1a]">
                  Event Reminders
                </Label>
                <p className="text-xs text-[#4a4a4a]">Reminders for registered events</p>
              </div>
              <Switch
                id="eventReminders"
                checked={settings.eventReminders}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, eventReminders: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newsletter" className="text-[#1a1a1a]">
                  Newsletter
                </Label>
                <p className="text-xs text-[#4a4a4a]">Monthly newsletter updates</p>
              </div>
              <Switch
                id="newsletter"
                checked={settings.newsletter}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, newsletter: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications" className="text-[#1a1a1a]">
                  SMS Notifications
                </Label>
                <p className="text-xs text-[#4a4a4a]">Receive SMS updates</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, smsNotifications: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <CardTitle className="text-[#1a3a3a] flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Manage your privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-[#f8f9f8]">
              <p className="text-sm text-[#4a4a4a] mb-2">
                Your data is secure and encrypted. We never share your personal information with third parties.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full border-[#1a3a3a] text-[#1a3a3a] hover:bg-[#d4f9e6]"
            >
              Change Password
            </Button>
            <Button
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-[#1a3a3a] hover:bg-[#244543] text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}

