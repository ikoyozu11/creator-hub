"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Workflow, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useParams } from "next/navigation";
import { TagInput } from "@/components/ui/tag-input";

export default function WorkflowDetailUserPage() {
  const { user } = useAuth();
  const supabase = createClientComponentClient();
  const router = useRouter();
  const params = useParams();
  const workflowId = params?.id as string;
  const [workflow, setWorkflow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [editForm, setEditForm] = useState<any>({
    title: "",
    description: "",
    tags: [],
    screenshot_url: "",
    video_url: "",
    complexity: "",
    json_n8n: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchWorkflow = async () => {
      if (!workflowId) return;
      const { data } = await supabase
        .from("workflows")
        .select("*")
        .eq("id", workflowId)
        .single();
      setWorkflow(data);
      setLoading(false);
      if (data && user) {
        // Cek apakah user adalah owner
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("user_id", user.id)
          .single();
        setIsOwner(profile?.id === data.profile_id);
        setEditForm({
          title: data.title || "",
          description: data.description || "",
          tags: data.tags || [],
          screenshot_url: data.screenshot_url || "",
          video_url: data.video_url || "",
          complexity: data.complexity || "",
          json_n8n: data.json_n8n || "",
        });
      }
    };
    fetchWorkflow();
  }, [workflowId, user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleTags = (tags: string[]) => {
    setEditForm({ ...editForm, tags });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("workflows")
      .update({
        title: editForm.title,
        description: editForm.description,
        tags: editForm.tags,
        screenshot_url: editForm.screenshot_url,
        video_url: editForm.video_url,
        complexity: editForm.complexity,
        json_n8n: editForm.json_n8n,
      })
      .eq("id", workflowId);
    setSaving(false);
    if (error) {
      alert("Gagal menyimpan perubahan: " + error.message);
      return;
    }
    alert("Perubahan workflow berhasil disimpan!");
    // Refresh data
    const { data } = await supabase
      .from("workflows")
      .select("*")
      .eq("id", workflowId)
      .single();
    setWorkflow(data);
  };

  const handleDelete = async () => {
    if (!workflowId) return;
    if (!confirm("Yakin ingin menghapus workflow ini?")) return;
    const { error } = await supabase
      .from("workflows")
      .delete()
      .eq("id", workflowId);
    if (error) {
      alert("Gagal menghapus workflow: " + error.message);
      return;
    }
    router.push("/dashboard-profile/workflows");
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }
  if (!workflow) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm sm:text-base">
        Workflow tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-3xl">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Workflow className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {workflow.title}
            </h1>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {isOwner ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base">Judul</label>
                <Input
                  name="title"
                  value={editForm.title}
                  onChange={handleChange}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base">Deskripsi</label>
                <Textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleChange}
                  required
                  className="text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base">Tags</label>
                <TagInput
                  value={editForm.tags}
                  onChange={handleTags}
                  placeholder="Tambah tag..."
                  className="text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base">Screenshot URL</label>
                <Input
                  name="screenshot_url"
                  value={editForm.screenshot_url}
                  onChange={handleChange}
                  className="text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base">Video URL</label>
                <Input
                  name="video_url"
                  value={editForm.video_url}
                  onChange={handleChange}
                  className="text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base">Complexity</label>
                <Input
                  name="complexity"
                  value={editForm.complexity}
                  onChange={handleChange}
                  placeholder="simple/medium/complex"
                  className="text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base">
                  JSON n8n Workflow
                </label>
                <Textarea
                  name="json_n8n"
                  value={editForm.json_n8n}
                  onChange={handleChange}
                  placeholder="Paste JSON workflow dari n8n di sini"
                  rows={6}
                  className="text-sm sm:text-base"
                />
              </div>
              {/* Live preview n8n demo */}
              {editForm.json_n8n && (
                <div className="mt-4 border rounded bg-gray-50 p-2 overflow-x-auto">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<n8n-demo workflow='${editForm.json_n8n.replace(
                        /'/g,
                        "&#39;"
                      )}' frame="true"></n8n-demo>`,
                    }}
                  />
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button type="submit" disabled={saving} className="w-full sm:w-auto">
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  className="w-full sm:w-auto"
                >
                  <Trash className="w-4 h-4 mr-1" /> Hapus
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard-profile/workflows")}
                  className="w-full sm:w-auto"
                >
                  Kembali
                </Button>
              </div>
            </form>
          ) : (
            <>
              <div className="mb-4">
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full mr-2">
                  {workflow.complexity || "-"}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">
                  {workflow.status}
                </span>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4">{workflow.description}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {(workflow.tags || []).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-white border border-gray-200 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-400 mb-4">
                Created: {workflow.created_at?.slice(0, 10)}
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard-profile/workflows")}
                className="w-full sm:w-auto"
              >
                Kembali
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
