"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import CreatorCard from "@/components/creator-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Users, TrendingUp, Star } from "lucide-react";

interface Creator {
  id: string;
  name: string;
  bio: string | null;
  location: string | null;
  skills: string[] | null;
  experience_level: "beginner" | "intermediate" | "advanced" | "expert" | null;
  profile_image: string | null;
  hourly_rate: number | null;
  availability: "available" | "busy" | "unavailable" | null;
  status: "draft" | "pending" | "approved" | "rejected";
}

export default function DashboardPage() {
  // const [creators, setCreators] = useState<Creator[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filterExperience, setFilterExperience] = useState<string>("all");
  // const [filterAvailability, setFilterAvailability] = useState<string>("all");

  // useEffect(() => {
  //   fetchCreators();
  // }, []);

  // const fetchCreators = async () => {
  //   try {
  //     setLoading(true);
  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .select("*")
  //       .eq("status", "approved")
  //       .order("created_at", { ascending: false });

  //     if (error) {
  //       console.error("Error fetching creators:", error);
  //       return;
  //     }

  //     setCreators(data || []);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const filteredCreators = []; // No filtering applied, always empty for dummy data

  const stats = {
    totalCreators: 0, // No data fetched, so 0
    availableCreators: 0, // No data fetched, so 0
    expertCreators: 0, // No data fetched, so 0
    averageRating: 4.6 // Dummy data
  };

  if (true) { // Always loading for dummy data
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="heading-mobile sm:heading-mobile-lg md:text-2xl sm:text-3xl font-bold mb-2">Dashboard Creator</h1>
        <p className="body-text-mobile sm:body-text-mobile-lg md:text-base text-gray-600">Temukan dan hubungi creator automation terbaik</p>
      </div>

      {/* Meet the Creators Section (Dummy) */}
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-10 gap-4">
          <h2 className="heading-mobile-xl sm:heading-mobile-lg md:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin text-white">Meet the Creators</h2>
          <a href="/directory" className="btn-jelajah flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full text-white button-text-mobile sm:button-text-mobile-lg font-medium bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-600 hover:to-violet-700 transition-all whitespace-nowrap flex-shrink-0" style={{ height: 'auto', minHeight: '60px' }}>
            Temukan Creator
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Hanya render data dummy, jangan render data asli */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gray-500 rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-responsive-base sm:text-base md:text-lg mb-1">John Hopkins</div>
                <div className="text-gray-300 text-responsive-sm sm:text-sm md:text-base">Lead Developer,<br/>CEO</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-responsive-xs sm:text-xs md:text-sm text-gray-600">Total Creator</p>
                <p className="text-responsive-xl sm:text-xl md:text-2xl font-bold">{stats.totalCreators}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
              <div>
                <p className="text-responsive-xs sm:text-xs md:text-sm text-gray-600">Tersedia</p>
                <p className="text-responsive-xl sm:text-xl md:text-2xl font-bold">{stats.availableCreators}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-responsive-xs sm:text-xs md:text-sm text-gray-600">Expert Level</p>
                <p className="text-responsive-xl sm:text-xl md:text-2xl font-bold">{stats.expertCreators}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 fill-current" />
              </div>
              <div>
                <p className="text-responsive-xs sm:text-xs md:text-sm text-gray-600">Rating Rata-rata</p>
                <p className="text-responsive-xl sm:text-xl md:text-2xl font-bold">{stats.averageRating}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-responsive-base sm:text-base md:text-lg">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari creator..."
                value={""} // No search term state, so empty
                onChange={(e) => {}} // No search term state, so empty
                className="pl-10"
              />
            </div>

            <Select value={"all"} onValueChange={() => {}}>
              <SelectTrigger>
                <SelectValue placeholder="Level Pengalaman" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Level</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>

            <Select value={"all"} onValueChange={() => {}}>
              <SelectTrigger>
                <SelectValue placeholder="Status Ketersediaan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="available">Tersedia</SelectItem>
                <SelectItem value="busy">Sibuk</SelectItem>
                <SelectItem value="unavailable">Tidak Tersedia</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                // No search term state, so empty
                // No filter experience state, so "all"
                // No filter availability state, so "all"
              }}
              className="w-full sm:w-auto"
            >
              Reset Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-responsive-sm sm:text-sm md:text-base text-gray-600">
            Menampilkan {filteredCreators.length} dari {stats.totalCreators} creator
          </p>
          <Badge variant="secondary">
            {filteredCreators.length} hasil
          </Badge>
        </div>
      </div>

      {/* Creators Grid */}
      {filteredCreators.length === 0 ? (
        <Card>
          <CardContent className="p-6 sm:p-8 text-center">
            <Users className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-responsive-base sm:text-base md:text-lg font-semibold mb-2">Tidak ada creator ditemukan</h3>
            <p className="text-responsive-sm sm:text-sm md:text-base text-gray-600 mb-4">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                // No search term state, so empty
                // No filter experience state, so "all"
                // No filter availability state, so "all"
              }}
            >
              Reset Filter
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <CreatorCard
              key={`dummy-${creator.id}`} // Use a dummy ID
              creator={creator}
              variant="default"
              showStats={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
