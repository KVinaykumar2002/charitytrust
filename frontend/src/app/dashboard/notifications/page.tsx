"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, X } from "lucide-react";
import { format } from "date-fns";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "donation" | "event" | "update" | "achievement";
  read: boolean;
  date: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Replace with actual API call
      const data: Notification[] = [
        {
          id: "1",
          title: "Donation Received",
          message: "Thank you for your donation of ₹5,000 to Mega Blood Donation Drive",
          type: "donation",
          read: false,
          date: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Event Reminder",
          message: "Community Health Camp is scheduled for tomorrow",
          type: "event",
          read: false,
          date: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "3",
          title: "Achievement Unlocked",
          message: "You've earned the Top Donor badge!",
          type: "achievement",
          read: true,
          date: new Date(Date.now() - 172800000).toISOString(),
        },
      ];
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "donation":
        return "bg-green-100 text-green-700";
      case "event":
        return "bg-blue-100 text-blue-700";
      case "achievement":
        return "bg-yellow-100 text-yellow-700";
      case "update":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">Notifications</h1>
          <p className="text-[#4a4a4a]">Stay updated with your activities</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-sm text-[#1a3a3a] hover:text-[#244543]"
          >
            Mark all as read
          </button>
        )}
      </div>

      {unreadCount > 0 && (
        <Card className="border-[#e5e5e5] bg-[#d4f9e6]">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#1a3a3a]" />
              <span className="text-[#1a3a3a] font-medium">
                You have {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-12 text-[#4a4a4a]">Loading...</div>
      ) : notifications.length === 0 ? (
        <Card className="border-[#e5e5e5]">
          <CardContent className="py-12 text-center">
            <Bell className="h-12 w-12 mx-auto mb-4 text-[#d0d0d0]" />
            <p className="text-[#4a4a4a]">No notifications</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-[#e5e5e5] transition-colors ${
                !notification.read ? "bg-[#f8f9f8] border-l-4 border-l-[#1a3a3a]" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-[#1a1a1a]">{notification.title}</h3>
                      <Badge className={getTypeColor(notification.type)}>
                        {notification.type}
                      </Badge>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-[#1a3a3a]"></div>
                      )}
                    </div>
                    <p className="text-sm text-[#4a4a4a] mb-2">{notification.message}</p>
                    <p className="text-xs text-[#4a4a4a]">
                      {format(new Date(notification.date), "MMM dd, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-2 rounded-lg hover:bg-[#d4f9e6] transition-colors"
                      title="Mark as read"
                    >
                      <Check className="h-4 w-4 text-[#1a3a3a]" />
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

