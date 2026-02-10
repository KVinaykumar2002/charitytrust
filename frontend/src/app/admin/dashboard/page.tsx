"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth-storage";
import { getAdminDashboard, getProgramDistribution, getRecentActivity } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  FolderKanban, 
  Calendar, 
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPrograms: 0,
    totalProjects: 0,
    totalEvents: 0,
    totalTestimonials: 0,
    activeVolunteers: 0,
    recentActivity: 0,
  });
  const [programDistributionData, setProgramDistributionData] = useState<Array<{name: string, value: number}>>([]);
  const [recentActivity, setRecentActivity] = useState<Array<{action: string, amount?: string, details?: string, time: string}>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all dashboard data from API
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const token = getToken();
        if (!token) {
          setLoading(false);
          return;
        }

        // Fetch all data in parallel
        const [dashboardData, programData, activityData] = await Promise.all([
          getAdminDashboard(token).catch(() => null),
          getProgramDistribution(token).catch(() => null),
          getRecentActivity(token).catch(() => null),
        ]);

        // Update stats
        if (dashboardData?.success && dashboardData.data.stats) {
          setStats({
            totalPrograms: dashboardData.data.stats.totalPrograms || 0,
            totalProjects: dashboardData.data.stats.totalProjects || 0,
            totalEvents: dashboardData.data.stats.totalEvents || 0,
            totalTestimonials: dashboardData.data.stats.totalTestimonials || 0,
            activeVolunteers: dashboardData.data.stats.activeVolunteers || 0,
            recentActivity: activityData?.data?.length || 0,
          });
        }

        // Update program distribution chart data - only from database
        if (programData?.success && programData.data && programData.data.length > 0) {
          setProgramDistributionData(programData.data);
        } else {
          // Empty if no data in database
          setProgramDistributionData([]);
        }

        // Update recent activity - only from database
        if (activityData?.success && activityData.data && activityData.data.length > 0) {
          setRecentActivity(activityData.data);
        } else {
          // Empty if no data in database
          setRecentActivity([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Use fallback data on error
        setStats({
          totalPrograms: 0,
          totalProjects: 0,
          totalEvents: 0,
          totalTestimonials: 0,
          activeVolunteers: 0,
          recentActivity: 0,
        });
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#FD7E14] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#4a4a4a]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Active Programs",
      value: stats.totalPrograms.toString(),
      icon: FolderKanban,
      change: "+2",
      color: "text-[#E56B00]",
      bgColor: "bg-[#FFE0C2]",
    },
    {
      title: "Upcoming Events",
      value: stats.totalEvents.toString(),
      icon: Calendar,
      change: "+3",
      color: "text-[#FD7E14]",
      bgColor: "bg-[#FFF3E8]",
    },
    {
      title: "Testimonials",
      value: stats.totalTestimonials.toString(),
      icon: MessageSquare,
      change: "+5",
      color: "text-[#E56B00]",
      bgColor: "bg-[#FFE0C2]",
    },
    {
      title: "Active Volunteers",
      value: stats.activeVolunteers.toString(),
      icon: Users,
      change: "+15",
      color: "text-[#E56B00]",
      bgColor: "bg-[#FFE0C2]",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Dashboard Overview</h1>
        <p className="text-[#4a4a4a]">Welcome back! Here's what's happening with your charity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-[#e5e5e5] hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#4a4a4a]">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#1a1a1a] mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-[#4a4a4a] flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">{stat.change}</span>
                  <span>from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Programs Distribution */}
        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <CardTitle className="text-[#1a1a1a]">Programs Distribution</CardTitle>
            <CardDescription>Donations by program category</CardDescription>
          </CardHeader>
          <CardContent>
            {programDistributionData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={programDistributionData.map((item, idx) => ({
                      ...item,
                      color: ["#FD7E14", "#E56B00", "#FFB366", "#CC6600", "#000000", "#333333"][idx % 6]
                    }))}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {programDistributionData.map((item, idx) => ({
                      ...item,
                      color: ["#FD7E14", "#E56B00", "#FFB366", "#CC6600", "#000000", "#333333"][idx % 6]
                    })).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-[#4a4a4a]">
                <p>No program distribution data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <CardTitle className="text-[#1a1a1a]">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#f8f9f8] hover:bg-[#FFF3E8] transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-[#1a1a1a]">{activity.action}</p>
                    {activity.details && (
                      <p className="text-xs text-[#4a4a4a] mt-1">{activity.details}</p>
                    )}
                    <p className="text-xs text-[#4a4a4a] mt-1 flex items-center gap-1">
                      <span>{activity.time}</span>
                    </p>
                  </div>
                  {activity.amount && (
                    <span className="text-sm font-semibold text-[#FD7E14]">{activity.amount}</span>
                  )}
                </div>
              )) : (
                <p className="text-sm text-[#4a4a4a] text-center py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#e5e5e5]">
          <CardHeader>
            <CardTitle className="text-[#1a1a1a]">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Add Program", href: "/admin/programs/new", icon: FolderKanban },
                { label: "Create Event", href: "/admin/events/new", icon: Calendar },
                { label: "Add Testimonial", href: "/admin/testimonials/new", icon: MessageSquare },
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <a
                    key={index}
                    href={action.href}
                    className="flex flex-col items-center justify-center p-6 rounded-lg border border-[#e5e5e5] hover:bg-[#FFF3E8] hover:border-[#FD7E14] transition-all group"
                  >
                    <div className="p-3 rounded-lg bg-[#FD7E14] group-hover:bg-[#E56B00] mb-3 transition-colors">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-[#1a1a1a] text-center">
                      {action.label}
                    </span>
                  </a>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

