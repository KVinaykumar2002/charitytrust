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
import { Plus, Edit, Trash2, Award, Target, Heart, Users } from "lucide-react";
import { getToken } from "@/lib/auth-storage";
import {
  getAdminTeamCategories,
  createTeamCategory,
  updateTeamCategory,
  deleteTeamCategory,
} from "@/lib/api";

export interface TeamMember {
  _id?: string;
  name: string;
  position: string;
  imageUrl?: string;
  bio?: string;
  order?: number;
}

export interface TeamCategory {
  _id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  order: number;
  members: TeamMember[];
  createdAt?: string;
  updatedAt?: string;
}

const ICON_OPTIONS = [
  { value: "Award", label: "Leadership", Icon: Award },
  { value: "Target", label: "Target", Icon: Target },
  { value: "Heart", label: "Heart", Icon: Heart },
  { value: "Users", label: "Users", Icon: Users },
];

export default function AdminTeamPage() {
  const [categories, setCategories] = useState<TeamCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TeamCategory | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    role: "",
    description: "",
    icon: "Award",
    order: 0,
  });
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [memberCategoryId, setMemberCategoryId] = useState<string | null>(null);
  const [editingMemberIndex, setEditingMemberIndex] = useState<number | null>(null);
  const [memberForm, setMemberForm] = useState({
    name: "",
    position: "",
    imageUrl: "",
    bio: "",
  });
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const [deleteMemberState, setDeleteMemberState] = useState<{
    categoryId: string;
    index: number;
  } | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const result = await getAdminTeamCategories(token);
      if (result.success && result.data && Array.isArray(result.data)) {
        // Normalize: ensure members array and sort categories/members by order so existing data displays correctly
        const normalized = result.data
          .map((c: TeamCategory) => ({
            ...c,
            members: (c.members || []).slice().sort((a: TeamMember, b: TeamMember) => (a.order ?? 0) - (b.order ?? 0)),
          }))
          .sort((a: TeamCategory, b: TeamCategory) => (a.order ?? 0) - (b.order ?? 0));
        setCategories(normalized);
      }
    } catch (err) {
      console.error("Error fetching team categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      name: "",
      role: "",
      description: "",
      icon: "Award",
      order: categories.length,
    });
    setCategoryModalOpen(true);
  };

  const openEditCategory = (cat: TeamCategory) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      role: cat.role || "",
      description: cat.description || "",
      icon: cat.icon || "Award",
      order: cat.order ?? 0,
    });
    setCategoryModalOpen(true);
  };

  const handleSaveCategory = async () => {
    const token = getToken();
    if (!token) return;
    setSaving(true);
    try {
      if (editingCategory) {
        await updateTeamCategory(token, editingCategory._id, {
          ...categoryForm,
          members: editingCategory.members,
        });
        setCategories((prev) =>
          prev.map((c) =>
            c._id === editingCategory._id
              ? { ...c, ...categoryForm, members: c.members }
              : c
          )
        );
      } else {
        const res = await createTeamCategory(token, {
          ...categoryForm,
          members: [],
        });
        if (res.success && res.data) {
          setCategories((prev) => [...prev, res.data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        }
      }
      setCategoryModalOpen(false);
    } catch (e: any) {
      alert(e.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const token = getToken();
    if (!token) return;
    try {
      await deleteTeamCategory(token, id);
      setCategories((prev) => prev.filter((c) => c._id !== id));
      setDeleteCategoryId(null);
    } catch (e: any) {
      alert(e.message || "Failed to delete category");
    }
  };

  const openAddMember = (categoryId: string) => {
    setMemberCategoryId(categoryId);
    setEditingMemberIndex(null);
    setMemberForm({ name: "", position: "", imageUrl: "", bio: "" });
    setMemberModalOpen(true);
  };

  const openEditMember = (categoryId: string, index: number) => {
    const cat = categories.find((c) => c._id === categoryId);
    const member = cat?.members?.[index];
    if (!member) return;
    setMemberCategoryId(categoryId);
    setEditingMemberIndex(index);
    setMemberForm({
      name: member.name,
      position: member.position,
      imageUrl: member.imageUrl || "",
      bio: member.bio || "",
    });
    setMemberModalOpen(true);
  };

  const handleSaveMember = async () => {
    const token = getToken();
    if (!token || !memberCategoryId) return;
    const cat = categories.find((c) => c._id === memberCategoryId);
    if (!cat) return;
    setSaving(true);
    try {
      let newMembers: TeamMember[] = [...(cat.members || [])];
      const memberPayload = {
        name: memberForm.name.trim(),
        position: memberForm.position.trim(),
        imageUrl: memberForm.imageUrl.trim() || undefined,
        bio: memberForm.bio.trim() || undefined,
      };
      if (editingMemberIndex !== null) {
        newMembers[editingMemberIndex] = { ...newMembers[editingMemberIndex], ...memberPayload };
      } else {
        newMembers.push({ ...memberPayload, order: newMembers.length });
      }
      await updateTeamCategory(token, memberCategoryId, {
        name: cat.name,
        role: cat.role,
        description: cat.description,
        icon: cat.icon,
        order: cat.order,
        members: newMembers,
      });
      setCategories((prev) =>
        prev.map((c) =>
          c._id === memberCategoryId ? { ...c, members: newMembers } : c
        )
      );
      setMemberModalOpen(false);
    } catch (e: any) {
      alert(e.message || "Failed to save member");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async (categoryId: string, index: number) => {
    const token = getToken();
    if (!token) return;
    const cat = categories.find((c) => c._id === categoryId);
    if (!cat) return;
    const newMembers = cat.members.filter((_, i) => i !== index);
    try {
      await updateTeamCategory(token, categoryId, {
        name: cat.name,
        role: cat.role,
        description: cat.description,
        icon: cat.icon,
        order: cat.order,
        members: newMembers,
      });
      setCategories((prev) =>
        prev.map((c) =>
          c._id === categoryId ? { ...c, members: newMembers } : c
        )
      );
      setDeleteMemberState(null);
    } catch (e: any) {
      alert(e.message || "Failed to delete member");
    }
  };

  const getIconComponent = (iconName: string) => {
    const opt = ICON_OPTIONS.find((o) => o.value === iconName);
    return opt ? opt.Icon : Award;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#1a1a1a] mb-2">Our Team</h1>
          <p className="text-[#4a4a4a]">
            Manage team categories and members shown on the public Our Team section
          </p>
        </div>
        <Button
          className="bg-[#FD7E14] hover:bg-[#E56B00] text-white"
          onClick={openAddCategory}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Card className="border-[#e5e5e5]">
        <CardHeader>
          <CardTitle className="text-[#1a1a1a]">
            Team Categories ({categories.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-[#4a4a4a]">Loading...</div>
          ) : categories.length === 0 ? (
            <div className="text-center py-8 text-[#4a4a4a]">
              <p className="mb-4">No team categories yet. Add one to get started.</p>
              <Button
                className="bg-[#FD7E14] hover:bg-[#E56B00] text-white"
                onClick={openAddCategory}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {categories.map((cat) => {
                const IconC = getIconComponent(cat.icon);
                return (
                  <Card key={cat._id} className="border-[#e5e5e5]">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#FFF3E8] flex items-center justify-center">
                            <IconC className="w-5 h-5 text-[#FD7E14]" />
                          </div>
                          <div>
                            <CardTitle className="text-[#1a1a1a]">{cat.name}</CardTitle>
                            {cat.role && (
                              <p className="text-sm text-[#4a4a4a]">{cat.role}</p>
                            )}
                            {cat.description && (
                              <p className="text-sm text-[#4a4a4a] mt-1 line-clamp-2">
                                {cat.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#FD7E14] text-[#FD7E14] hover:bg-[#FFF3E8]"
                            onClick={() => openEditCategory(cat)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => setDeleteCategoryId(cat._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-[#FD7E14] hover:bg-[#E56B00] text-white"
                            onClick={() => openAddMember(cat._id)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Member
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {!cat.members || cat.members.length === 0 ? (
                        <p className="text-sm text-[#4a4a4a] py-2">
                          No members in this category.
                        </p>
                      ) : (
                        <ul className="space-y-2">
                          {cat.members.map((member, idx) => (
                            <li
                              key={idx}
                              className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#f8f9f8] hover:bg-[#FFF3E8]"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {member.imageUrl ? (
                                  <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    className="w-10 h-10 rounded-full object-cover shrink-0"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-[#FD7E14] flex items-center justify-center text-white font-semibold shrink-0">
                                    {member.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <p className="font-medium text-[#1a1a1a] truncate">
                                    {member.name}
                                  </p>
                                  <p className="text-sm text-[#4a4a4a] truncate">
                                    {member.position}
                                  </p>
                                  {member.bio && (
                                    <p className="text-xs text-[#6a6a6a] truncate mt-0.5 max-w-[200px]">
                                      {member.bio}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2 shrink-0">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditMember(cat._id, idx)}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:bg-red-50"
                                  onClick={() =>
                                    setDeleteMemberState({ categoryId: cat._id, index: idx })
                                  }
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
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Category modal */}
      <Dialog open={categoryModalOpen} onOpenChange={setCategoryModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="cat-name">Name</Label>
              <Input
                id="cat-name"
                value={categoryForm.name}
                onChange={(e) =>
                  setCategoryForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Leadership Team"
              />
            </div>
            <div>
              <Label htmlFor="cat-role">Role / Subheading</Label>
              <Input
                id="cat-role"
                value={categoryForm.role}
                onChange={(e) =>
                  setCategoryForm((f) => ({ ...f, role: e.target.value }))
                }
                placeholder="e.g. Strategic Direction"
              />
            </div>
            <div>
              <Label htmlFor="cat-desc">Description</Label>
              <textarea
                id="cat-desc"
                className="w-full min-h-[80px] px-3 py-2 border border-[#e5e5e5] rounded-md text-sm"
                value={categoryForm.description}
                onChange={(e) =>
                  setCategoryForm((f) => ({ ...f, description: e.target.value }))
                }
                placeholder="Short description for this team category"
              />
            </div>
            <div>
              <Label>Icon</Label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {ICON_OPTIONS.map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setCategoryForm((f) => ({ ...f, icon: value }))
                    }
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                      categoryForm.icon === value
                        ? "border-[#FD7E14] bg-[#FFF3E8] text-[#FD7E14]"
                        : "border-[#e5e5e5] hover:bg-[#f8f9f8]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#FD7E14] hover:bg-[#E56B00]"
              onClick={handleSaveCategory}
              disabled={saving || !categoryForm.name.trim()}
            >
              {saving ? "Saving..." : editingCategory ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Member modal */}
      <Dialog open={memberModalOpen} onOpenChange={setMemberModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingMemberIndex !== null ? "Edit Member" : "Add Member"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="mem-name">Name</Label>
              <Input
                id="mem-name"
                value={memberForm.name}
                onChange={(e) =>
                  setMemberForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Dr. Chiranjeevi"
              />
            </div>
            <div>
              <Label htmlFor="mem-position">Position</Label>
              <Input
                id="mem-position"
                value={memberForm.position}
                onChange={(e) =>
                  setMemberForm((f) => ({ ...f, position: e.target.value }))
                }
                placeholder="e.g. Founder & Chairman"
              />
            </div>
            <div>
              <Label htmlFor="mem-image">Profile image URL (optional)</Label>
              <Input
                id="mem-image"
                value={memberForm.imageUrl}
                onChange={(e) =>
                  setMemberForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            <div>
              <Label htmlFor="mem-bio">Bio (optional)</Label>
              <textarea
                id="mem-bio"
                className="w-full min-h-[60px] px-3 py-2 border border-[#e5e5e5] rounded-md text-sm"
                value={memberForm.bio}
                onChange={(e) =>
                  setMemberForm((f) => ({ ...f, bio: e.target.value }))
                }
                placeholder="Short bio"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMemberModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#FD7E14] hover:bg-[#E56B00]"
              onClick={handleSaveMember}
              disabled={saving || !memberForm.name.trim() || !memberForm.position.trim()}
            >
              {saving ? "Saving..." : editingMemberIndex !== null ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete category confirmation */}
      <AlertDialog
        open={!!deleteCategoryId}
        onOpenChange={(open) => !open && setDeleteCategoryId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete category</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the category and all its members. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteCategoryId && handleDeleteCategory(deleteCategoryId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete member confirmation */}
      <AlertDialog
        open={!!deleteMemberState}
        onOpenChange={(open) => !open && setDeleteMemberState(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove member</AlertDialogTitle>
            <AlertDialogDescription>
              This member will be removed from the team category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() =>
                deleteMemberState &&
                handleDeleteMember(deleteMemberState.categoryId, deleteMemberState.index)
              }
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
