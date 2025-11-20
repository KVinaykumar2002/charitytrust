"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Receipt, Calendar } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface Donation {
  id: string;
  amount: number;
  programName: string;
  date: string;
  status: string;
  transactionId?: string;
}

export default function MyDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      // Replace with actual API call
      const data: Donation[] = [
        {
          id: "1",
          amount: 5000,
          programName: "Mega Blood Donation Drive",
          date: "2024-01-15",
          status: "completed",
          transactionId: "TXN123456",
        },
        {
          id: "2",
          amount: 3000,
          programName: "Eye Donation Initiative",
          date: "2024-01-10",
          status: "completed",
          transactionId: "TXN123457",
        },
        {
          id: "3",
          amount: 2000,
          programName: "Disaster Relief Fund",
          date: "2024-01-05",
          status: "pending",
        },
      ];
      setDonations(data);
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

  const totalDonated = donations
    .filter((d) => d.status === "completed")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">My Donations</h1>
        <p className="text-[#4a4a4a]">View and manage all your donations</p>
      </div>

      {/* Summary Card */}
      <Card className="border-[#e5e5e5] bg-gradient-to-r from-[#1a3a3a] to-[#244543] text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 mb-1">Total Donated</p>
              <p className="text-4xl font-bold">₹{totalDonated.toLocaleString()}</p>
              <p className="text-sm text-white/60 mt-2">
                {donations.filter((d) => d.status === "completed").length} successful donations
              </p>
            </div>
            <Link href="/donate">
              <Button className="bg-white text-[#1a3a3a] hover:bg-white/90">
                Make a Donation
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Donations Table */}
      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a3a3a]">Donation History</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-[#4a4a4a]">Loading...</div>
          ) : donations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#4a4a4a] mb-4">No donations yet</p>
              <Link href="/donate">
                <Button className="bg-[#1a3a3a] hover:bg-[#244543] text-white">
                  Make Your First Donation
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-[#f8f9f8]">
                  <TableHead className="text-[#1a1a1a]">Program</TableHead>
                  <TableHead className="text-[#1a1a1a]">Amount</TableHead>
                  <TableHead className="text-[#1a1a1a]">Date</TableHead>
                  <TableHead className="text-[#1a1a1a]">Status</TableHead>
                  <TableHead className="text-[#1a1a1a] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id} className="hover:bg-[#f8f9f8]">
                    <TableCell className="font-medium text-[#1a1a1a]">
                      {donation.programName}
                    </TableCell>
                    <TableCell className="text-[#1a3a3a] font-semibold">
                      ₹{donation.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-[#4a4a4a]">
                      {format(new Date(donation.date), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>{getStatusBadge(donation.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {donation.status === "completed" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#1a3a3a] hover:bg-[#d4f9e6]"
                            >
                              <Receipt className="h-4 w-4 mr-1" />
                              Receipt
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#1a3a3a] hover:bg-[#d4f9e6]"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
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

