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
import VideoLoader from "@/components/VideoLoader";
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

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => CURRENT_YEAR - 5 + i);
const MONTHS = [
  { value: "1", label: "January" }, { value: "2", label: "February" }, { value: "3", label: "March" },
  { value: "4", label: "April" }, { value: "5", label: "May" }, { value: "6", label: "June" },
  { value: "7", label: "July" }, { value: "8", label: "August" }, { value: "9", label: "September" },
  { value: "10", label: "October" }, { value: "11", label: "November" }, { value: "12", label: "December" },
];
const DAYS = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

export default function AdminFanEventsPage() {
  const [events, setEvents] = useState<FanEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventDateYear, setEventDateYear] = useState<string>("all");
  const [eventDateMonth, setEventDateMonth] = useState<string>("all");
  const [eventDateDay, setEventDateDay] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<FanEventItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [statusFilter, eventDateYear, eventDateMonth, eventDateDay]);

  const fetchEvents = async () => {
    try {
      const token = getToken();
      if (!token) return;
      setLoading(true);

      const params: { limit: number; status?: string; year?: number; month?: number; day?: number } = { limit: 50 };
      if (statusFilter !== "all") params.status = statusFilter;
      if (eventDateYear !== "all") params.year = parseInt(eventDateYear, 10);
      if (eventDateMonth !== "all") params.month = parseInt(eventDateMonth, 10);
      if (eventDateDay !== "all") params.day = parseInt(eventDateDay, 10);

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

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleApprove = async (id: string) => {
    setActionLoading(true);
    try {
      const token = getToken();
      if (!token) return;

      await approveFanEvent(token, id);
      await fetchEvents();
      setSelectedEvent(null);
      showFeedback("success", "Event approved. It will now appear on the public fan events page.");
    } catch (error: any) {
      console.error("Error approving:", error);
      showFeedback("error", error?.message || "Failed to approve event.");
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
      await fetchEvents();
      setSelectedEvent(null);
      showFeedback("success", "Event rejected.");
    } catch (error: any) {
      console.error("Error rejecting:", error);
      showFeedback("error", error?.message || "Failed to reject event.");
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
          Review and approve or reject fan-submitted events. Approved events appear on the public Events by Fans page.
        </p>
      </div>

      {feedback && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {feedback.message}
        </div>
      )}

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

      {/* Search / Filters */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-[#4a4a4a]">Search & filter</p>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="text-xs text-[#4a4a4a] block mb-1">Event status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px] border-[#e5e5e5]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-[#4a4a4a] block mb-1">Event date – Year</label>
            <Select value={eventDateYear} onValueChange={setEventDateYear}>
              <SelectTrigger className="w-[120px] border-[#e5e5e5]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Year</SelectItem>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-[#4a4a4a] block mb-1">Month</label>
            <Select value={eventDateMonth} onValueChange={setEventDateMonth}>
              <SelectTrigger className="w-[140px] border-[#e5e5e5]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Month</SelectItem>
                {MONTHS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-[#4a4a4a] block mb-1">Date (day)</label>
            <Select value={eventDateDay} onValueChange={setEventDateDay}>
              <SelectTrigger className="w-[100px] border-[#e5e5e5]">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Days</SelectItem>
                {DAYS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[#e5e5e5]"
            onClick={() => {
              setStatusFilter("all");
              setEventDateYear("all");
              setEventDateMonth("all");
              setEventDateDay("all");
            }}
          >
            Clear filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card className="border-[#e5e5e5]">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <VideoLoader size="md" label="Loading events..." />
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
                      <div className="flex items-center justify-end gap-2 flex-wrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedEvent(event)}
                          className="text-[#FD7E14] hover:bg-[#FFF3E8]"
                          title="View details"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        {event.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleApprove(event._id)}
                              disabled={actionLoading}
                              className="text-green-600 hover:bg-green-50"
                              title="Approve event"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReject(event._id)}
                              disabled={actionLoading}
                              className="text-red-600 hover:bg-red-50"
                              title="Reject event"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteConfirm(event._id)}
                          className="text-red-600 hover:bg-red-50"
                          title="Delete event"
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
              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#e5e5e5]">
                {selectedEvent.status === "pending" && (
                  <>
                    <Button
                      onClick={() => handleApprove(selectedEvent._id)}
                      disabled={actionLoading}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve event
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleReject(selectedEvent._id)}
                      disabled={actionLoading}
                      className="border-red-500 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject event
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  onClick={() => setSelectedEvent(null)}
                  className="ml-auto border-[#e5e5e5]"
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
