"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getAdminEvents, deleteEvent } from "@/lib/api";
import { getToken } from "@/lib/auth-storage";

interface Event {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  location: string;
  date?: string;
  eventDate?: string;
  status?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  createdAt: string;
  updatedAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error("No token found");
        setLoading(false);
        return;
      }

      const result = await getAdminEvents(token);
      if (result.success && result.data) {
        const eventsData = result.data.map((e: any) => ({
          _id: e._id,
          id: e._id || e.id,
          title: e.title || "",
          description: e.description || "",
          location: e.location || "",
          date: e.date || e.eventDate,
          eventDate: e.date || e.eventDate,
          status: e.status || "upcoming",
          maxAttendees: e.maxAttendees || 0,
          currentAttendees: e.currentAttendees || 0,
          createdAt: e.createdAt || new Date().toISOString(),
          updatedAt: e.updatedAt || new Date().toISOString(),
        }));
        setEvents(eventsData);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please login to delete an event");
        return;
      }

      await deleteEvent(token, id);
      // Remove the event from the list
      setEvents(events.filter((e) => (e._id || e.id) !== id));
      setDeleteDialogOpen(false);
      setSelectedEvent(null);
      
      // Optionally refresh the list to ensure consistency
      // fetchEvents();
    } catch (error: any) {
      console.error("Error deleting event:", error);
      alert(error.message || "Failed to delete event");
      setDeleteDialogOpen(false);
      setSelectedEvent(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a3a3a] mb-2">Events</h1>
          <p className="text-[#4a4a4a]">Manage your charity events</p>
        </div>
        <Link href="/admin/events/new">
          <Button className="bg-[#1a3a3a] hover:bg-[#244543] text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a3a3a]">All Events</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-[#4a4a4a]">Loading...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-8 text-[#4a4a4a]">No events found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-[#f8f9f8]">
                  <TableHead className="text-[#1a1a1a]">Title</TableHead>
                  <TableHead className="text-[#1a1a1a]">Location</TableHead>
                  <TableHead className="text-[#1a1a1a]">Date</TableHead>
                  <TableHead className="text-[#1a1a1a]">Time</TableHead>
                  <TableHead className="text-[#1a1a1a]">Status</TableHead>
                  <TableHead className="text-[#1a1a1a] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id} className="hover:bg-[#f8f9f8]">
                    <TableCell className="font-medium text-[#1a1a1a]">{event.title}</TableCell>
                    <TableCell className="text-[#4a4a4a]">{event.location}</TableCell>
                    <TableCell className="text-[#4a4a4a]">
                      {event.date || event.eventDate
                        ? format(new Date(event.date || event.eventDate || ""), "MMM dd, yyyy")
                        : "TBD"}
                    </TableCell>
                    <TableCell className="text-[#4a4a4a]">
                      {event.date || event.eventDate
                        ? format(new Date(event.date || event.eventDate || ""), "hh:mm a")
                        : "TBD"}
                    </TableCell>
                    <TableCell>
                      {event.status ? (
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            event.status === "upcoming"
                              ? "text-blue-700 bg-blue-100"
                              : event.status === "ongoing"
                              ? "text-green-700 bg-green-100"
                              : event.status === "completed"
                              ? "text-gray-700 bg-gray-100"
                              : "text-red-700 bg-red-100"
                          }`}
                        >
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-[#4a4a4a] bg-[#f8f9f8] px-2 py-1 rounded">
                          Upcoming
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/events/${event._id || event.id}`}>
                          <Button variant="ghost" size="sm" className="text-[#1a3a3a] hover:bg-[#d4f9e6]">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setSelectedEvent(event);
                            setDeleteDialogOpen(true);
                          }}
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedEvent?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedEvent && handleDelete(selectedEvent._id || selectedEvent.id || "")}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

