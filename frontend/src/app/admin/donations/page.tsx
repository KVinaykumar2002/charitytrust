"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Donation {
  id: string;
  donorName: string;
  email?: string;
  phone?: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  programId?: string;
  projectId?: string;
  createdAt: string;
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAmount: 0,
    monthlyAmount: 0,
    totalDonors: 0,
    pendingDonations: 0,
  });

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      // Replace with actual API call
      const mockDonations: Donation[] = [
        {
          id: "1",
          donorName: "John Doe",
          email: "john@example.com",
          phone: "+1234567890",
          amount: 5000,
          currency: "INR",
          paymentMethod: "Online",
          paymentStatus: "completed",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          donorName: "Jane Smith",
          email: "jane@example.com",
          amount: 10000,
          currency: "INR",
          paymentMethod: "Bank Transfer",
          paymentStatus: "pending",
          createdAt: new Date().toISOString(),
        },
      ];
      setDonations(mockDonations);
      
      setStats({
        totalAmount: 125000,
        monthlyAmount: 45000,
        totalDonors: 150,
        pendingDonations: 5,
      });
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-700">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-700">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const statCards = [
    {
      title: "Total Donations",
      value: `₹${stats.totalAmount.toLocaleString()}`,
      icon: DollarSign,
      color: "text-[#1a3a3a]",
      bgColor: "bg-[#d4f9e6]",
    },
    {
      title: "Monthly Donations",
      value: `₹${stats.monthlyAmount.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-[#244543]",
      bgColor: "bg-[#b8f4d3]",
    },
    {
      title: "Total Donors",
      value: stats.totalDonors.toString(),
      icon: Users,
      color: "text-[#1a3a3a]",
      bgColor: "bg-[#d4f9e6]",
    },
    {
      title: "Pending",
      value: stats.pendingDonations.toString(),
      icon: Calendar,
      color: "text-[#244543]",
      bgColor: "bg-[#b8f4d3]",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">Donations</h1>
        <p className="text-[#4a4a4a]">Track and manage all donations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-[#e5e5e5]">
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

      {/* Donations Table */}
      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a3a3a]">Recent Donations</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-[#4a4a4a]">Loading...</div>
          ) : donations.length === 0 ? (
            <div className="text-center py-8 text-[#4a4a4a]">No donations found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-[#f8f9f8]">
                  <TableHead className="text-[#1a1a1a]">Donor</TableHead>
                  <TableHead className="text-[#1a1a1a]">Amount</TableHead>
                  <TableHead className="text-[#1a1a1a]">Payment Method</TableHead>
                  <TableHead className="text-[#1a1a1a]">Status</TableHead>
                  <TableHead className="text-[#1a1a1a]">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id} className="hover:bg-[#f8f9f8]">
                    <TableCell className="font-medium text-[#1a1a1a]">
                      <div>
                        <p>{donation.donorName}</p>
                        {donation.email && (
                          <p className="text-sm text-[#4a4a4a]">{donation.email}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-[#1a3a3a] font-semibold">
                      ₹{donation.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-[#4a4a4a]">{donation.paymentMethod}</TableCell>
                    <TableCell>{getStatusBadge(donation.paymentStatus)}</TableCell>
                    <TableCell className="text-[#4a4a4a]">
                      {format(new Date(donation.createdAt), "MMM dd, yyyy")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

