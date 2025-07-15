"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Search,
  Download,
  Users,
  Star,
  Filter,
  ArrowRight,
  Workflow,
  Zap,
} from "lucide-react";
import Link from "next/link";
import MainFooter from "@/components/main-footer";

const categories = [
  "All",
  "E-commerce",
  "Communication",
  "Data Management",
  "Analytics",
  "Finance",
  "Marketing",
  "Operations",
  "HR",
  "Content",
];

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("workflows")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    if (!error) setWorkflows(data || []);
    setLoading(false);
  };

  const filteredWorkflows = workflows.filter((w) => {
    const matchesSearch =
      w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (w.tags || []).some((tag: string) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      categoryFilter === "All" || w.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Section with Gradient Background */}
      <div className="relative" style={{ background: '#201A2C', color: '#fff', overflow: 'hidden' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 md:py-20">
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-white/10 rounded-xl sm:rounded-2xl backdrop-blur-sm">
                <Workflow className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Semua Workflow
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed px-2">
              Temukan dan gunakan workflow automation yang telah dibuat oleh
              komunitas N8N Indonesia
            </p>
            <div className="flex justify-center items-center gap-6 sm:gap-8 mt-6 sm:mt-8 text-purple-200">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">
                  {workflows.length} Workflows
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">- Contributors</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-medium">- Downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Filters and Search Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
          {/* Search Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Cari workflow berdasarkan nama, kategori, atau tag..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors text-sm sm:text-base md:text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              <span className="text-sm sm:text-base text-gray-700 font-medium">
                Filter by category:
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`px-3 sm:px-4 py-2 sm:py-3 rounded-full font-medium transition-all duration-200 text-xs sm:text-sm md:text-base ${
                    categoryFilter === category
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:shadow-md"
                  }`}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {loading ? (
            <div className="col-span-full text-center py-8 sm:py-12 text-gray-400">
              Loading...
            </div>
          ) : filteredWorkflows.length === 0 ? (
            <div className="col-span-full text-center py-8 sm:py-12 text-gray-400">
              No workflows found.
            </div>
          ) : (
            filteredWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                className="group bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl sm:hover:shadow-2xl hover:border-purple-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 sm:hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/0 to-pink-50/0 group-hover:from-purple-50/50 group-hover:to-pink-50/30 transition-all duration-300 rounded-xl sm:rounded-2xl"></div>

                <div className="relative z-10">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 text-xs font-semibold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full">
                      {workflow.category || "-"}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                      <span className="text-xs font-medium text-gray-600">
                        4.8
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Workflow className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors">
                    {workflow.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
                    {workflow.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 bg-gray-50 rounded-lg p-2 sm:p-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">
                        {workflow.nodes || "-"} nodes
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="font-medium">
                        {workflow.downloads || "-"}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {(workflow.tags || []).slice(0, 2).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-1 text-xs bg-white border border-gray-200 text-gray-700 rounded-full hover:border-purple-300 hover:text-purple-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Author and Action */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {workflow.author?.charAt?.(0) || "C"}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600 font-medium">
                        {workflow.author || "Creator"}
                      </span>
                    </div>
                    <Link
                      href={`/workflows/${workflow.id}`}
                      className="flex items-center gap-1 text-xs sm:text-sm text-purple-600 hover:text-purple-800 font-semibold group-hover:gap-2 transition-all"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12 sm:mt-16">
          <button className="group px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl sm:rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl sm:hover:shadow-2xl transform hover:scale-105 font-semibold text-sm sm:text-base md:text-lg">
            <span className="flex items-center gap-2 sm:gap-3">
              Load More Workflows
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <p className="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4">
            Showing {filteredWorkflows.length} of {workflows.length} workflows
          </p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="mb-32 sm:mb-20">
        <MainFooter />
      </div>
    </>
  );
}
