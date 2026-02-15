"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Plus, Edit, Trash2 } from "lucide-react";
import { getToken } from "@/lib/auth-storage";
import { getAdminFaqs, createFaq, updateFaq, deleteFaq } from "@/lib/api";

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", order: 0 });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchFaqs = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const result = await getAdminFaqs(token);
      if (result.success && Array.isArray(result.data)) {
        const sorted = [...result.data].sort(
          (a: FaqItem, b: FaqItem) => (a.order ?? 0) - (b.order ?? 0)
        );
        setFaqs(sorted);
      }
    } catch (err) {
      console.error("Error fetching FAQs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openAdd = () => {
    setEditingFaq(null);
    setForm({ question: "", answer: "", order: faqs.length });
    setModalOpen(true);
  };

  const openEdit = (faq: FaqItem) => {
    setEditingFaq(faq);
    setForm({
      question: faq.question,
      answer: faq.answer,
      order: faq.order ?? 0,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      alert("Question and answer are required.");
      return;
    }
    const token = getToken();
    if (!token) return;
    setSaving(true);
    try {
      if (editingFaq) {
        await updateFaq(token, editingFaq._id, {
          question: form.question.trim(),
          answer: form.answer.trim(),
          order: typeof form.order === 'number' && !Number.isNaN(form.order) ? form.order : 0,
        });
        await fetchFaqs();
      } else {
        await createFaq(token, {
          question: form.question.trim(),
          answer: form.answer.trim(),
          order: typeof form.order === 'number' && !Number.isNaN(form.order) ? form.order : 0,
        });
        await fetchFaqs();
      }
      setModalOpen(false);
    } catch (e: any) {
      alert(e?.message || "Failed to save FAQ");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const token = getToken();
    if (!token) return;
    try {
      await deleteFaq(token, id);
      setFaqs((prev) => prev.filter((f) => f._id !== id));
      setDeleteId(null);
    } catch (e: any) {
      alert(e?.message || "Failed to delete FAQ");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">FAQs</h1>
          <p className="text-[#4a4a4a]">
            Manage questions and answers shown on the public FAQ page
          </p>
        </div>
        <Button
          className="bg-[#FD7E14] hover:bg-[#E56B00] text-white"
          onClick={openAdd}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add a question
        </Button>
      </div>

      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a1a1a]">Questions ({faqs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-[#4a4a4a]">Loading...</div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-8 text-[#4a4a4a]">
              <p className="mb-4">No FAQs yet. Add one to get started.</p>
              <Button
                className="bg-[#FD7E14] hover:bg-[#E56B00] text-white"
                onClick={openAdd}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add a question
              </Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {faqs.map((faq, index) => (
                <li
                  key={faq._id}
                  className="flex items-start justify-between gap-4 p-4 rounded-lg bg-[#f8f9f8] hover:bg-[#FFF3E8] border border-[#e5e5e5]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#1a1a1a]">
                      {index + 1}. {faq.question}
                    </p>
                    <p className="text-sm text-[#4a4a4a] mt-1 line-clamp-2">
                      {faq.answer}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#FD7E14] text-[#FD7E14] hover:bg-[#FFF3E8]"
                      onClick={() => openEdit(faq)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50"
                      onClick={() => setDeleteId(faq._id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit FAQ modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingFaq ? "Edit FAQ" : "Add a question"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="faq-question">Question *</Label>
              <Input
                id="faq-question"
                value={form.question}
                onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
                placeholder="e.g. What is Chiranjeevi Charitable Trust?"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="faq-answer">Answer *</Label>
              <textarea
                id="faq-answer"
                className="w-full min-h-[120px] px-3 py-2 border border-[#e5e5e5] rounded-md text-sm mt-1 resize-y"
                value={form.answer}
                onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
                placeholder="Enter the full answer for this question"
              />
            </div>
            <div>
              <Label htmlFor="faq-order">Display order (optional)</Label>
              <Input
                id="faq-order"
                type="number"
                min={0}
                value={form.order}
                onChange={(e) =>
                  setForm((f) => ({ ...f, order: parseInt(e.target.value, 10) || 0 }))
                }
                className="mt-1 w-24"
              />
              <p className="text-xs text-[#4a4a4a] mt-1">
                Lower numbers appear first on the FAQ page.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#FD7E14] hover:bg-[#E56B00]"
              onClick={handleSave}
              disabled={saving || !form.question.trim() || !form.answer.trim()}
            >
              {saving ? "Saving..." : editingFaq ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this FAQ?</AlertDialogTitle>
            <AlertDialogDescription>
              This question and answer will be removed from the public FAQ page. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteId && handleDelete(deleteId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
