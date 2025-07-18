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
import { workflowCategories } from "@/data/category-workflows";
import GradientCircle from "@/components/GradientCircle";

type WorkflowWithProfileName = {
  profile_id: string;
  [key: string]: any;
  profile_name?: string;
  profile_image?: string | null;
};

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const workflowsPerPage = 12;
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchWorkflows(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchWorkflows = async (page = 1) => {
    setLoading(true);

    try {
      // Gunakan API endpoint yang sudah diperbaiki
      const response = await fetch("/api/workflows");
      if (response.ok) {
        const data = await response.json();
        const workflowsData = data.workflows || [];

        // Mapping data untuk kompatibilitas
        const workflowsWithName: WorkflowWithProfileName[] = workflowsData.map(
          (w: any) => ({
            ...w,
            profile_name: w.profile_name || "-",
            profile_image: w.profile_image || null,
            profile_id: w.profile_id,
          })
        );

        setWorkflows(workflowsWithName);
      } else {
        console.error("Failed to fetch workflows");
        setWorkflows([]);
      }
    } catch (error) {
      console.error("Error fetching workflows:", error);
      setWorkflows([]);
    } finally {
      setLoading(false);
    }
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

  // Hitung total halaman dari filteredWorkflows
  const totalPages = Math.max(
    1,
    Math.ceil(filteredWorkflows.length / workflowsPerPage)
  );

  // Ambil data sesuai halaman aktif
  const paginatedWorkflows = filteredWorkflows.slice(
    (currentPage - 1) * workflowsPerPage,
    currentPage * workflowsPerPage
  );

  // Reset currentPage jika filter/search mengurangi jumlah halaman
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  // Pagination component
  const Pagination = () => (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        className="px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 shadow
            ${
              page === currentPage
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105"
                : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/20"
            }
          `}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-4 py-2 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="text-white content-above-gradient relative">
      {/* Gradient circle langsung di halaman */}
      <GradientCircle
        type="hero"
        style={{
          top: "20vh",
          left: "25vw",
          transform: "translateX(-50%)",
          zIndex: -1,
        }}
      />

      <div className="w-full px-16 relative z-10">
        {/* HERO HEADING & SUBHEADING */}
        <div className="w-full pt-8 md:pt-16 flex flex-col gap-6 md:gap-10">
          <div className="flex flex-col md:flex-row md:items-center w-full">
            {/* Kiri: Heading */}
            <div className="flex flex-col items-start flex-1 min-w-0">
              <h1 className="font-sans font-semibold text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-white mb-0 text-left">
                Explore
              </h1>
              <h2 className="font-sans font-thin text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white mb-0 text-left">
                Workflows
              </h2>
            </div>

            {/* Garis Penyambung */}
            <div className="hidden md:flex items-center flex-1 min-w-0 mx-8">
              <div className="h-0.5 flex-1 bg-white/40" />
            </div>

            {/* Kanan: Deskripsi dan Search */}
            <div className="hidden md:flex flex-col items-start flex-1 min-w-0">
              <div
                style={{
                  fontFamily: "Inter, Arial, sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "18px",
                  lineHeight: "150%",
                  letterSpacing: "-0.01em",
                  color: "#FFFFFF",
                  marginBottom: "24px",
                  textAlign: "left",
                }}
              >
                Temukan workflow automation yang powerful dan siap pakai.
                Tingkatkan produktivitas dengan solusi yang sudah teruji.
              </div>
              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Cari Workflow"
                  className="w-full pl-4 pr-12 py-3 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/10 hover:bg-white/20 transition-colors text-lg text-white placeholder-white/60"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Mobile: Deskripsi dan Search */}
          <div className="md:hidden flex flex-col items-start w-full mt-6">
            <div
              style={{
                fontFamily: "Inter, Arial, sans-serif",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "16px",
                lineHeight: "150%",
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
                marginBottom: "20px",
                textAlign: "left",
              }}
            >
              Temukan workflow automation yang powerful dan siap pakai.
              Tingkatkan produktivitas dengan solusi yang sudah teruji.
            </div>
            {/* Search Bar Mobile */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari Workflow"
                className="w-full pl-4 pr-12 py-3 border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/10 hover:bg-white/20 transition-colors text-lg text-white placeholder-white/60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-col items-center justify-center mt-12 mb-8 gap-2">
          <div className="flex flex-row items-center gap-4">
            <Filter className="w-4 h-4 text-white/60" />
            <span className="text-white/80 font-medium">
              Filter by category:
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["All", ...workflowCategories].map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  categoryFilter === category
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="text-white/60 text-sm text-center">
            {filteredWorkflows.length} workflow
            {filteredWorkflows.length !== 1 ? "s" : ""} found
          </div>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full text-center py-12 text-white/60">
              Loading...
            </div>
          ) : paginatedWorkflows.length === 0 ? (
            <div className="col-span-full text-center py-12 text-white/60">
              Tidak ada workflow ditemukan.
            </div>
          ) : (
            paginatedWorkflows.map((workflow) => (
              <Link
                key={workflow.id}
                href={`/workflows/${workflow.id}`}
                className="group relative rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 overflow-hidden block"
              >
                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex justify-end mb-4">
                    <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-gradient-to-r from-purple-600 to-black text-white rounded-full">
                      {workflow.category || "General"}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="text-lg font-bold text-purple-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
                    {workflow.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {workflow.description ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(workflow.tags || []).slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-gray-200 text-purple-700 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {(workflow.tags || []).length > 3 && (
                      <span className="px-3 py-1 text-xs bg-gray-200 text-purple-700 rounded-full font-medium">
                        +{(workflow.tags || []).length - 3}
                      </span>
                    )}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      {workflow.profile_image ? (
                        <img
                          src={workflow.profile_image}
                          alt={workflow.profile_name || "Creator"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                          {workflow.profile_name?.charAt?.(0) || "C"}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-purple-900 font-medium">
                      {workflow.profile_name || "Creator"}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && <Pagination />}
        <p className="text-white/60 text-sm mt-4 text-center">
          Showing page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
}
