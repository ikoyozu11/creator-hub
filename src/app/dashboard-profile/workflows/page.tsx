"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Workflow } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { TagInput } from "@/components/ui/tag-input";

export default function WorkflowsSubPage() {
  const { user } = useAuth();
  const supabase = createClientComponentClient();
  const [profile, setProfile] = useState<any>(null);
  const [myWorkflows, setMyWorkflows] = useState<any[]>([]);
  const [showAddWorkflow, setShowAddWorkflow] = useState(false);
  const [workflowForm, setWorkflowForm] = useState({
    title: "",
    description: "",
    tags: "",
    screenshot_url: "",
    video_url: "",
    complexity: "",
    json_n8n: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      setProfile(data);
    };
    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (!profile?.id) return;
    const fetchMyWorkflows = async () => {
      const { data } = await supabase
        .from("workflows")
        .select("*")
        .eq("profile_id", profile.id)
        .order("created_at", { ascending: false });
      setMyWorkflows(data || []);
    };
    fetchMyWorkflows();
  }, [profile]);

  const handleWorkflowInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setWorkflowForm({ ...workflowForm, [e.target.name]: e.target.value });
  };

  const handleAddWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;
    const tagsArr = workflowForm.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const { error } = await supabase.from("workflows").insert({
      profile_id: profile.id,
      title: workflowForm.title,
      description: workflowForm.description,
      tags: tagsArr,
      screenshot_url: workflowForm.screenshot_url,
      video_url: workflowForm.video_url,
      complexity: workflowForm.complexity,
      json_n8n: workflowForm.json_n8n,
      status: "pending",
    });
    if (error) {
      alert("Gagal menambah workflow: " + error.message);
      return;
    }
    setShowAddWorkflow(false);
    setWorkflowForm({
      title: "",
      description: "",
      tags: "",
      screenshot_url: "",
      video_url: "",
      complexity: "",
      json_n8n: "",
    });
    // Refresh list
    const { data } = await supabase
      .from("workflows")
      .select("*")
      .eq("profile_id", profile.id)
      .order("created_at", { ascending: false });
    setMyWorkflows(data || []);
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Not Logged In</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Silakan login untuk mengelola workflow Anda.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
        <h2 className="text-lg sm:text-xl font-bold">Workflow Saya</h2>
        <Button
          onClick={() => setShowAddWorkflow(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Tambah Workflow
        </Button>
      </div>
      {/* Form tambah workflow */}
      {showAddWorkflow && (
        <form
          onSubmit={handleAddWorkflow}
          className="mb-6 sm:mb-8 bg-gray-50 p-4 sm:p-6 rounded-xl border"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1 text-sm sm:text-base">Judul</label>
              <Input
                name="title"
                value={workflowForm.title}
                onChange={handleWorkflowInput}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm sm:text-base">
                Tags (pisahkan dengan koma)
              </label>
              <Input
                name="tags"
                value={workflowForm.tags}
                onChange={handleWorkflowInput}
                placeholder="misal: email, automation, api"
                className="text-sm sm:text-base"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium mb-1 text-sm sm:text-base">Deskripsi</label>
              <Textarea
                name="description"
                value={workflowForm.description}
                onChange={handleWorkflowInput}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm sm:text-base">Screenshot URL</label>
              <Input
                name="screenshot_url"
                value={workflowForm.screenshot_url}
                onChange={handleWorkflowInput}
                className="text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm sm:text-base">Video URL</label>
              <Input
                name="video_url"
                value={workflowForm.video_url}
                onChange={handleWorkflowInput}
                className="text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 text-sm sm:text-base">Complexity</label>
              <Input
                name="complexity"
                value={workflowForm.complexity}
                onChange={handleWorkflowInput}
                placeholder="simple/medium/complex"
                className="text-sm sm:text-base"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium mb-1 text-sm sm:text-base">
                JSON n8n Workflow
              </label>
              <Textarea
                name="json_n8n"
                value={workflowForm.json_n8n}
                onChange={handleWorkflowInput}
                placeholder="Paste JSON workflow dari n8n di sini"
                rows={6}
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button type="submit" className="w-full sm:w-auto">Simpan Workflow</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddWorkflow(false)}
              className="w-full sm:w-auto"
            >
              Batal
            </Button>
          </div>
        </form>
      )}
      {/* List workflow user */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {myWorkflows.map((w) => (
          <Card key={w.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4 p-4 sm:p-6">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Workflow className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 truncate">
                    {w.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full">
                      {w.complexity || "-"}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">
                      {w.status}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 p-4 sm:p-6">
              <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3">
                {w.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {(w.tags || []).map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-white border border-gray-200 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-400">
                Created: {w.created_at?.slice(0, 10)}
              </div>
              <div className="flex gap-2 mt-4">
                <Button asChild size="sm" variant="outline" className="w-full sm:w-auto">
                  <Link href={`/dashboard-profile/workflows/${w.id}`}>
                    View
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {myWorkflows.length === 0 && (
          <div className="text-gray-500 text-center col-span-full py-8 text-sm sm:text-base">
            Belum ada workflow.
          </div>
        )}
      </div>
    </div>
  );
}
