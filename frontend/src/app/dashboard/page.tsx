"use client";

import { useEffect, useState } from "react";
import { getUserData, getToken } from "@/lib/auth-storage";
import { getUserDashboardStats, getUserDonations, getUserContentEvents } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Calendar,
  DollarSign,
  User,
  Award,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Donation {
  id: string;
  amount: number;
  programName: string;
  date: string;
  status: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
}

export default function UserDashboard() {
  const [user, setUser] = useState<any>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState({
    totalDonated: 0,
    donationsCount: 0,
    eventsAttended: 0,
    impactPoints: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
      fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      // Fetch all data in parallel from MongoDB
      const [dashboardData, donationsResponse, eventsResponse] = await Promise.all([
        getUserDashboardStats(token).catch(err => { console.error("Error fetching dashboard stats:", err); return null; }),
        getUserDonations(token).catch(err => { console.error("Error fetching donations:", err); return null; }),
        getUserContentEvents(token).catch(err => { console.error("Error fetching events:", err); return null; }),
      ]);

      // Update stats from MongoDB
      if (dashboardData?.success) {
        setStats({
          totalDonated: dashboardData.data.stats.totalDonated || 0,
          donationsCount: dashboardData.data.stats.donationsCount || 0,
          eventsAttended: dashboardData.data.stats.eventsAttended || 0,
          impactPoints: dashboardData.data.stats.impactPoints || 0,
        });
      }

      // Update donations from MongoDB
      if (donationsResponse?.success && donationsResponse.data) {
        const donationsData: Donation[] = donationsResponse.data.map((donation: any) => ({
          id: donation._id || donation.id,
          amount: donation.amount,
          programName: donation.programName || donation.program || "General Donation",
          date: donation.createdAt || donation.date,
          status: donation.status || "completed",
        }));
        setDonations(donationsData);
      }

      // Update events from MongoDB (reflects admin changes automatically)
      if (eventsResponse?.success && eventsResponse.data) {
        const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmOCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM0YTQhNGEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
        
        const eventsData: Event[] = eventsResponse.data.slice(0, 5).map((event: any) => ({
          id: event._id || event.id,
          title: event.title || event.name,
          date: event.date || event.eventDate || event.createdAt,
          location: event.location || event.venue || "TBA",
          imageUrl: event.imageBase64 || event.image || event.imageUrl || placeholderImage,
        }));
        setUpcomingEvents(eventsData);
      } else {
        setUpcomingEvents([]);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9f8]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1a3a3a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4a4a4a]">Loading...</p>
        </div>
      </div>
    );
  }
  const statCards = [
    {
      title: "Total Donated",
      value: `₹${stats.totalDonated.toLocaleString()}`,
      icon: DollarSign,
      color: "text-[#1a3a3a]",
      bgColor: "bg-[#d4f9e6]",
    },
    {
      title: "Donations",
      value: stats.donationsCount.toString(),
      icon: Heart,
      color: "text-[#244543]",
      bgColor: "bg-[#b8f4d3]",
    },
    {
      title: "Events Attended",
      value: stats.eventsAttended.toString(),
      icon: Calendar,
      color: "text-[#1a3a3a]",
      bgColor: "bg-[#d4f9e6]",
    },
    {
      title: "Impact Points",
      value: Math.floor(stats.impactPoints).toString(),
      icon: Award,
      color: "text-[#244543]",
      bgColor: "bg-[#b8f4d3]",
    },
  ];

  return (
    <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">
            Welcome back, {user?.name || "User"}!
          </h1>
          <p className="text-[#4a4a4a]">Here's your contribution summary</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-[#e5e5e5] hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#4a4a4a] mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-[#1a3a3a]">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Donations */}
          <Card className="border-[#e5e5e5]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#1a3a3a]">Recent Donations</CardTitle>
              <Link href="/donations">
                <Button variant="ghost" size="sm" className="text-[#1a3a3a] hover:bg-[#d4f9e6]">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {donations.length === 0 ? (
                <div className="text-center py-8 text-[#4a4a4a]">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-[#d0d0d0]" />
                  <p>No donations yet</p>
                  <Link href="/donate">
                    <Button className="mt-4 bg-[#1a3a3a] hover:bg-[#244543] text-white">
                      Make Your First Donation
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-[#f8f9f8] hover:bg-[#d4f9e6] transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-[#1a1a1a]">{donation.programName}</p>
                        <p className="text-sm text-[#4a4a4a] flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" />
                          {new Date(donation.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#1a3a3a]">₹{donation.amount.toLocaleString()}</p>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                          {donation.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="border-[#e5e5e5]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-[#1a3a3a]">Upcoming Events</CardTitle>
              <Link href="/events">
                <Button variant="ghost" size="sm" className="text-[#1a3a3a] hover:bg-[#d4f9e6]">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length === 0 ? (
                <div className="text-center py-8 text-[#4a4a4a]">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-[#d0d0d0]" />
                  <p>No upcoming events</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      className="block group"
                    >
                      <div className="flex gap-4 p-4 rounded-lg bg-[#f8f9f8] hover:bg-[#d4f9e6] transition-colors">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          {event.imageUrl && event.imageUrl.startsWith('data:') ? (
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                            />
                          ) : (
                            <Image
                              src={event.imageUrl || "/hero/Star-Hospitals.jpg"}
                              alt={event.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#1a1a1a] mb-1 truncate">
                            {event.title}
                          </h3>
                          <p className="text-sm text-[#4a4a4a] flex items-center gap-2 mb-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-[#4a4a4a] flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <CardTitle className="text-[#1a3a3a]">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/donate">
                <Button className="w-full bg-[#1a3a3a] hover:bg-[#244543] text-white">
                  <Heart className="mr-2 h-4 w-4" />
                  Make a Donation
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="outline" className="w-full border-[#1a3a3a] text-[#1a3a3a] hover:bg-[#d4f9e6]">
                  <Calendar className="mr-2 h-4 w-4" />
                  Browse Events
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="w-full border-[#1a3a3a] text-[#1a3a3a] hover:bg-[#d4f9e6]">
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}


