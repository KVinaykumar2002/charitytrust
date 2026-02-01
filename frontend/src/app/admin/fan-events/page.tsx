"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth-storage";
import {
  getAdminFanEvents,
  approveFanEvent,
  rejectFanEvent,
  deleteFanEvent,
} from "@/lib/api";
import {
  Heart,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Users,
  Eye,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FanEventItem {
  _id: string;
  title: string;
  eventDate: string;
  eventBy: string;
  photos?: string[];
  videoBase64?: string;
  videoUrl?: string;
  status: string;
  submittedAt: string;
}

export default function AdminFanEventsPage() {
  const [events, setEvents] = useState<FanEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<FanEventItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [statusFilter]);

  const fetchEvents = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const params: any = { limit: 50 };
      if (statusFilter !== "all") params.status = statusFilter;

      const result = await getAdminFanEvents(token, params);
      if (result.success) {
        setEvents(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching fan events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      await approveFanEvent(token, id);
      fetchEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error approving:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    setActionLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      await rejectFanEvent(token, id);
      fetchEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error rejecting:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setActionLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      await deleteFanEvent(token, id);
      fetchEvents();
      setDeleteConfirm(null);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const pendingCount = events.filter((e) => e.status === "pending").length;
  const approvedCount = events.filter((e) => e.status === "approved").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1a1a1a]">Fan Events</h1>
        <p className="text-[#4a4a4a] mt-1">
          Review and approve fan-submitted events inspired by Chiranjeevi garu
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-[#e5e5e5]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#4a4a4a]">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#1a1a1a]">{events.length}</p>
          </CardContent>
        </Card>
        <Card className="border-[#e5e5e5]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#4a4a4a]">
              Pending Review
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-[#FD7E14]">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card className="border-[#e5e5e5]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#4a4a4a]">
              Approved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px] border-[#e5e5e5]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="border-[#e5e5e5]">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin h-8 w-8 border-2 border-[#FD7E14] border-t-transparent rounded-full" />
            </div>
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#4a4a4a]">
              <Heart className="h-12 w-12 mb-4 text-[#e5e5e5]" />
              <p>No fan events found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-[#e5e5e5] hover:bg-transparent">
                  <TableHead className="text-[#4a4a4a]">Title</TableHead>
                  <TableHead className="text-[#4a4a4a]">Date</TableHead>
                  <TableHead className="text-[#4a4a4a]">Organizer</TableHead>
                  <TableHead className="text-[#4a4a4a]">Status</TableHead>
                  <TableHead className="text-[#4a4a4a]">Submitted</TableHead>
                  <TableHead className="text-right text-[#4a4a4a]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow
                    key={event._id}
                    className="border-[#e5e5e5] hover:bg-[#f8f9f8]"
                  >
                    <TableCell className="font-medium text-[#1a1a1a]">
                      {event.title}
                    </TableCell>
                    <TableCell className="text-[#4a4a4a]">
                      {formatDate(event.eventDate)}
                    </TableCell>
                    <TableCell className="text-[#4a4a4a]">{event.eventBy}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          event.status === "approved"
                            ? "default"
                            : event.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                        className={
                          event.status === "approved"
                            ? "bg-green-600"
                            : event.status === "pending"
                            ? "bg-[#FD7E14]"
                            : ""
                        }
                      >
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[#4a4a4a] text-sm">
                      {formatDate(event.submittedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedEvent(event)}
                          className="text-[#FD7E14] hover:bg-[#FFF3E8]"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {event.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApprove(event._id)}
                              disabled={actionLoading}
                              className="text-green-600 hover:bg-green-50"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReject(event._id)}
                              disabled={actionLoading}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirm(event._id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedEvent}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Fan Event Details</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-[#4a4a4a]">Title</p>
                <p className="font-medium">{selectedEvent.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[#4a4a4a]">Event Date</p>
                  <p className="font-medium">{formatDate(selectedEvent.eventDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-[#4a4a4a]">Organizer</p>
                  <p className="font-medium">{selectedEvent.eventBy}</p>
                </div>
              </div>
              {selectedEvent.photos && selectedEvent.photos.length > 0 && (
                <div>
                  <p className="text-sm text-[#4a4a4a] mb-2">Photos</p>
                  <div className="grid grid-cols-5 gap-2">
                    {selectedEvent.photos.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`Photo ${i + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
              {(selectedEvent.videoBase64 || selectedEvent.videoUrl) && (
                <div>
                  <p className="text-sm text-[#4a4a4a] mb-2">Video</p>
                  {selectedEvent.videoBase64 ? (
                    <video
                      src={selectedEvent.videoBase64}
                      controls
                      className="w-full max-h-48 rounded-lg"
                    />
                  ) : (
                    <a
                      href={selectedEvent.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FD7E14] hover:underline"
                    >
                      {selectedEvent.videoUrl}
                    </a>
                  )}
                </div>
              )}
              <div className="flex gap-2 pt-4">
                {selectedEvent.status === "pending" && (
                  <>
                    <Button
                      onClick={() => handleApprove(selectedEvent._id)}
                      disabled={actionLoading}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleReject(selectedEvent._id)}
                      disabled={actionLoading}
                      className="border-red-500 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  onClick={() => setSelectedEvent(null)}
                  className="ml-auto"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Fan Event?</DialogTitle>
          </DialogHeader>
          <p className="text-[#4a4a4a]">
            This action cannot be undone. The fan event will be permanently deleted.
          </p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              disabled={actionLoading}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
