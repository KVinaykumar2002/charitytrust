"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth-storage";
import { getAdminBloodDonations, updateBloodDonationStatus, deleteBloodDonation, getBloodDonationStats } from "@/lib/api";
import { Droplet, Search, Filter, CheckCircle, XCircle, Clock, Trash2, Loader2, Users, AlertTriangle, Heart, Hospital } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BloodDonation {
  _id: string;
  type: "donor" | "patient";
  requestNumber: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  bloodGroup: string;
  address: {
    city: string;
    state: string;
  };
  status: string;
  urgency?: string;
  unitsRequired?: number;
  unitsFulfilled?: number;
  hospitalName?: string;
  availableForEmergency?: boolean;
  createdAt: string;
}

interface Stats {
  totalDonors: number;
  activeDonors: number;
  totalRequests: number;
  pendingRequests: number;
  fulfilledRequests: number;
  urgentRequests: number;
  bloodGroupDistribution: { _id: string; count: number }[];
}

export default function AdminBloodDonationsPage() {
  const [entries, setEntries] = useState<BloodDonation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"donor" | "patient">("donor");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
    fetchStats();
  }, [typeFilter, statusFilter, bloodGroupFilter]);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      const params: any = { type: typeFilter };
      if (statusFilter !== "all") params.status = statusFilter;
      if (bloodGroupFilter !== "all") params.bloodGroup = bloodGroupFilter;
      if (search) params.search = search;

      const result = await getAdminBloodDonations(token, params);
      if (result.success) {
        setEntries(result.data);
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const result = await getBloodDonationStats(token);
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSearch = () => {
    fetchEntries();
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    setActionLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      await updateBloodDonationStatus(token, id, status);
      fetchEntries();
      fetchStats();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      await deleteBloodDonation(token, id);
      setDeleteConfirm(null);
      fetchEntries();
      fetchStats();
    } catch (error) {
      console.error("Error deleting entry:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case "verified":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><CheckCircle className="w-3 h-3 mr-1" /> Verified</Badge>;
      case "active":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" /> Active</Badge>;
      case "fulfilled":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><CheckCircle className="w-3 h-3 mr-1" /> Fulfilled</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200"><XCircle className="w-3 h-3 mr-1" /> Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "immediate":
        return <Badge className="bg-red-500 text-white">Immediate</Badge>;
      case "within_24_hours":
        return <Badge className="bg-orange-500 text-white">24 Hours</Badge>;
      case "within_week":
        return <Badge variant="outline" className="text-blue-600 border-blue-200">Within Week</Badge>;
      case "scheduled":
        return <Badge variant="outline" className="text-gray-600 border-gray-200">Scheduled</Badge>;
      default:
        return null;
    }
  };

  const getBloodGroupBadge = (bloodGroup: string) => {
    return (
      <Badge className="bg-red-100 text-red-700 font-bold">
        {bloodGroup}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Blood Donation Management</h1>
          <p className="text-[#4a4a4a]">Manage blood donors and patient requests</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#4a4a4a]">Total Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-600" />
                <span className="text-2xl font-bold">{stats.totalDonors}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#4a4a4a]">Active Donors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                <span className="text-2xl font-bold">{stats.activeDonors}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#4a4a4a]">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Hospital className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold">{stats.totalRequests}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#4a4a4a]">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-yellow-600" />
                <span className="text-2xl font-bold">{stats.pendingRequests}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#4a4a4a]">Fulfilled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
                <span className="text-2xl font-bold">{stats.fulfilledRequests}</span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-700">Urgent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-2xl font-bold text-red-700">{stats.urgentRequests}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Blood Group Distribution */}
      {stats?.bloodGroupDistribution && stats.bloodGroupDistribution.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-[#4a4a4a]">Active Donors by Blood Group</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {stats.bloodGroupDistribution.map((item) => (
                <div key={item._id} className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
                  <span className="font-bold text-red-700">{item._id}</span>
                  <span className="text-[#4a4a4a]">{item.count} donors</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs for Donors and Patients */}
      <Tabs value={typeFilter} onValueChange={(v) => setTypeFilter(v as "donor" | "patient")}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="donor" className="flex items-center gap-2">
            <Heart className="w-4 h-4" /> Blood Donors
          </TabsTrigger>
          <TabsTrigger value="patient" className="flex items-center gap-2">
            <Hospital className="w-4 h-4" /> Blood Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="donor" className="mt-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Search by name, email, phone, or request number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="max-w-md"
              />
              <Button onClick={handleSearch} variant="outline">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={bloodGroupFilter} onValueChange={setBloodGroupFilter}>
              <SelectTrigger className="w-[140px]">
                <Droplet className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Blood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Donors Table */}
          <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-20">
                <Heart className="w-12 h-12 text-[#ccc] mx-auto mb-4" />
                <p className="text-[#4a4a4a]">No blood donors found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request #</TableHead>
                    <TableHead>Donor</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Emergency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry._id}>
                      <TableCell className="font-mono text-sm">{entry.requestNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{entry.fullName}</p>
                          <p className="text-xs text-[#4a4a4a]">{entry.gender}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getBloodGroupBadge(entry.bloodGroup)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{entry.phone}</p>
                          <p className="text-[#4a4a4a] truncate max-w-[150px]">{entry.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{entry.address?.city}, {entry.address?.state}</p>
                      </TableCell>
                      <TableCell>
                        {entry.availableForEmergency ? (
                          <Badge className="bg-green-100 text-green-700">Available</Badge>
                        ) : (
                          <Badge variant="outline" className="text-[#4a4a4a]">No</Badge>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell className="text-sm text-[#4a4a4a]">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {entry.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => handleStatusUpdate(entry._id, "active")}
                              disabled={actionLoading}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          {entry.status !== "cancelled" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleStatusUpdate(entry._id, "cancelled")}
                              disabled={actionLoading}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => setDeleteConfirm(entry._id)}
                            disabled={actionLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="patient" className="mt-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Search by name, email, phone, or request number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="max-w-md"
              />
              <Button onClick={handleSearch} variant="outline">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="fulfilled">Fulfilled</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <Select value={bloodGroupFilter} onValueChange={setBloodGroupFilter}>
              <SelectTrigger className="w-[140px]">
                <Droplet className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Blood" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A-">A-</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B-">B-</SelectItem>
                <SelectItem value="AB+">AB+</SelectItem>
                <SelectItem value="AB-">AB-</SelectItem>
                <SelectItem value="O+">O+</SelectItem>
                <SelectItem value="O-">O-</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Patient Requests Table */}
          <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-20">
                <Hospital className="w-12 h-12 text-[#ccc] mx-auto mb-4" />
                <p className="text-[#4a4a4a]">No blood requests found</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request #</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Blood Group</TableHead>
                    <TableHead>Units</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Hospital</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry) => (
                    <TableRow key={entry._id} className={entry.urgency === "immediate" ? "bg-red-50" : ""}>
                      <TableCell className="font-mono text-sm">{entry.requestNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{entry.fullName}</p>
                          <p className="text-xs text-[#4a4a4a]">{entry.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getBloodGroupBadge(entry.bloodGroup)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{entry.unitsFulfilled || 0} / {entry.unitsRequired}</p>
                          <p className="text-xs text-[#4a4a4a]">units</p>
                        </div>
                      </TableCell>
                      <TableCell>{entry.urgency && getUrgencyBadge(entry.urgency)}</TableCell>
                      <TableCell>
                        <p className="text-sm truncate max-w-[150px]">{entry.hospitalName}</p>
                      </TableCell>
                      <TableCell>{getStatusBadge(entry.status)}</TableCell>
                      <TableCell className="text-sm text-[#4a4a4a]">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {entry.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              onClick={() => handleStatusUpdate(entry._id, "verified")}
                              disabled={actionLoading}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          {entry.status !== "cancelled" && entry.status !== "fulfilled" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleStatusUpdate(entry._id, "cancelled")}
                              disabled={actionLoading}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => setDeleteConfirm(entry._id)}
                            disabled={actionLoading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blood Donation Entry</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this entry? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              disabled={actionLoading}
            >
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

