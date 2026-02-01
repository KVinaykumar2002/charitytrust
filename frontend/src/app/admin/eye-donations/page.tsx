"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth-storage";
import { getAdminEyeDonationPledges, updateEyeDonationPledgeStatus, issueEyeDonationCard, deleteEyeDonationPledge, getEyeDonationStats } from "@/lib/api";
import { Eye, Search, Filter, CheckCircle, XCircle, Clock, CreditCard, Trash2, Loader2, Users, Award, FileCheck, Ban } from "lucide-react";
import TrustLoader from "@/components/TrustLoader";
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

interface EyeDonationPledge {
  _id: string;
  pledgeNumber: string;
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
  cardIssued: boolean;
  createdAt: string;
}

interface Stats {
  total: number;
  pending: number;
  verified: number;
  active: number;
  cancelled: number;
  cardsIssued: number;
}

export default function AdminEyeDonationsPage() {
  const [pledges, setPledges] = useState<EyeDonationPledge[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPledge, setSelectedPledge] = useState<EyeDonationPledge | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchPledges();
    fetchStats();
  }, [statusFilter]);

  const fetchPledges = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const params: any = {};
      if (statusFilter !== "all") params.status = statusFilter;
      if (search) params.search = search;

      const result = await getAdminEyeDonationPledges(token, params);
      if (result.success) {
        setPledges(result.data);
      }
    } catch (error) {
      console.error("Error fetching pledges:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const result = await getEyeDonationStats(token);
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSearch = () => {
    fetchPledges();
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    setActionLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      await updateEyeDonationPledgeStatus(token, id, status);
      fetchPledges();
      fetchStats();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleIssueCard = async (id: string) => {
    setActionLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      await issueEyeDonationCard(token, id);
      fetchPledges();
      fetchStats();
    } catch (error) {
      console.error("Error issuing card:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      await deleteEyeDonationPledge(token, id);
      setDeleteConfirm(null);
      fetchPledges();
      fetchStats();
    } catch (error) {
      console.error("Error deleting pledge:", error);
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
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a1a1a]">Eye Donation Pledges</h1>
          <p className="text-[#4a4a4a]">Manage eye donation pledge submissions</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#4a4a4a]">Total Pledges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-teal-600" />
                <span className="text-2xl font-bold">{stats.total}</span>
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
                <span className="text-2xl font-bold">{stats.pending}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#4a4a4a]">Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold">{stats.verified}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#4a4a4a]">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-2xl font-bold">{stats.active}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#4a4a4a]">Cancelled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Ban className="w-5 h-5 text-red-600" />
                <span className="text-2xl font-bold">{stats.cancelled}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#4a4a4a]">Cards Issued</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="text-2xl font-bold">{stats.cardsIssued}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Search by name, email, phone, or pledge number..."
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
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <TrustLoader variant="eye" size="lg" label="Loading pledges..." />
          </div>
        ) : pledges.length === 0 ? (
          <div className="text-center py-20">
            <Eye className="w-12 h-12 text-[#ccc] mx-auto mb-4" />
            <p className="text-[#4a4a4a]">No eye donation pledges found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pledge #</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Card</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pledges.map((pledge) => (
                <TableRow key={pledge._id}>
                  <TableCell className="font-mono text-sm">{pledge.pledgeNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{pledge.fullName}</p>
                      <p className="text-xs text-[#4a4a4a]">{pledge.gender} • {pledge.bloodGroup || 'N/A'}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{pledge.email}</p>
                      <p className="text-[#4a4a4a]">{pledge.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{pledge.address?.city}, {pledge.address?.state}</p>
                  </TableCell>
                  <TableCell>{getStatusBadge(pledge.status)}</TableCell>
                  <TableCell>
                    {pledge.cardIssued ? (
                      <Badge className="bg-purple-100 text-purple-700"><CreditCard className="w-3 h-3 mr-1" /> Issued</Badge>
                    ) : (
                      <Badge variant="outline" className="text-[#4a4a4a]">Not Issued</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-[#4a4a4a]">
                    {new Date(pledge.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {pledge.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          onClick={() => handleStatusUpdate(pledge._id, "verified")}
                          disabled={actionLoading}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      {pledge.status === "verified" && !pledge.cardIssued && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-purple-600 border-purple-200 hover:bg-purple-50"
                          onClick={() => handleIssueCard(pledge._id)}
                          disabled={actionLoading}
                        >
                          <CreditCard className="w-4 h-4" />
                        </Button>
                      )}
                      {pledge.status !== "cancelled" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleStatusUpdate(pledge._id, "cancelled")}
                          disabled={actionLoading}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => setDeleteConfirm(pledge._id)}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Eye Donation Pledge</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this pledge? This action cannot be undone.
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

