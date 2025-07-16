"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import CreatorCard from "@/components/creator-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Users, MapPin, Star, Award } from "lucide-react";
import { DirectoryLoading } from "@/components/directory-loading";
import MainFooter from "@/components/main-footer";

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
  created_at?: string;
}

export default function DirectoryPage() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const creatorsPerPage = 12;

  useEffect(() => {
    fetchCreators();
  }, []);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(sortedCreators.length / creatorsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const fetchCreators = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching creators:", error);
        return;
      }

      setCreators(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCreators = useMemo(() => {
    return creators.filter((creator) => {
      const matchesSearch = creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           creator.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           creator.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesSearch;
    });
  }, [creators, searchTerm]);

  const sortedCreators = useMemo(() => {
    return [...filteredCreators].sort((a, b) => {
      return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime();
    });
  }, [filteredCreators]);

  const totalPages = Math.ceil(sortedCreators.length / creatorsPerPage);
  const startIndex = (currentPage - 1) * creatorsPerPage;
  const endIndex = startIndex + creatorsPerPage;
  const displayedCreators = sortedCreators.slice(startIndex, endIndex);



  const uniqueLocations = Array.from(new Set(creators.map(c => c.location).filter(Boolean)));

  if (loading) {
    return <DirectoryLoading />;
  }

  return (
    <>
      <div className="min-h-screen" style={{ 
        background: 'linear-gradient(90deg, #201A2C 0%, #1a1420 100%)'
      }}>
        <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 max-w-7xl">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start relative">
              {/* Left Side - Title */}
              <div>
                <h1 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-2 text-white"
                  style={{
                    fontFamily: 'Albert Sans, Arial, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: '0.85',
                  }}
                >
                  Explore
                </h1>
                <h2 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white"
                  style={{
                    fontFamily: 'Albert Sans, Arial, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.02em',
                    lineHeight: '0.85',
                    WebkitTextStroke: '1px white',
                    color: 'transparent',
                  }}
                >
                  Creator
                </h2>
              </div>
              
              {/* Horizontal Divider - Hidden on mobile */}
              <div className="hidden lg:block absolute left-1/2 top-1/2 w-16 h-px bg-white/20 transform -translate-x-1/2"></div>
              
              {/* Right Side - Description & Search */}
              <div className="flex flex-col justify-center">
                <p 
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed mb-6"
                  style={{
                    fontFamily: 'Albert Sans, Arial, sans-serif',
                    fontWeight: 300,
                    letterSpacing: '-0.01em',
                  }}
                >
                  Kenalan dengan kreator N8N Indonesia yang rutin berbagi workflow, tips,<br />
                  dan ide automasi. Temukan inspirasi untuk project automasimu!
                </p>
                
                {/* Search Bar */}
                <div className="max-w-md">
                  <div className="relative">
                    <Input
                      placeholder="Cari Creator"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-4 pr-12 py-3 bg-gray-800/30 border-gray-500/50 text-white placeholder:text-gray-400 rounded-lg backdrop-blur-sm"
                      style={{
                        fontFamily: 'Albert Sans, Arial, sans-serif',
                      }}
                    />
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>







        {/* Creators Grid */}
        {sortedCreators.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <Users className="w-12 h-12 mx-auto mb-4" />
            <div className="text-lg mb-2">Tidak ada creator ditemukan</div>
            <div className="text-sm mb-4">Coba ubah kata kunci pencarian Anda</div>
            <Button 
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
              onClick={() => {
                setSearchTerm("");
              }}
            >
              Reset Search
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {displayedCreators.map((creator) => (
                <Link key={creator.id} href={`/talent/${creator.id}`} className="flex items-center p-4 hover:bg-gray-800/20 transition-all duration-200 cursor-pointer rounded-lg">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center mr-4 flex-shrink-0">
                    {creator.profile_image ? (
                      <img src={creator.profile_image} alt={creator.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                        {creator.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-lg sm:text-xl mb-1 truncate">{creator.name}</div>
                    <div className="text-gray-300 text-sm sm:text-base truncate">{creator.bio || 'Lead Developer, CEO'}</div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Pagination Controls */}
            {/* Pagination Controls */}
            {totalPages > 1 ? (
              <div className="flex flex-col items-center justify-center mt-12 mb-8 gap-6">
                <div className="text-gray-400 text-sm">
                  Halaman {currentPage} dari {totalPages} • Menampilkan {displayedCreators.length} dari {sortedCreators.length} creator
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <Button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 transition-all duration-200"
                    style={{
                      fontFamily: 'Albert Sans, Arial, sans-serif',
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Sebelumnya
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
                            currentPage === pageNum
                              ? 'bg-fuchsia-500 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                          style={{
                            fontFamily: 'Albert Sans, Arial, sans-serif',
                          }}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <Button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-medium bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 transition-all duration-200"
                    style={{
                      fontFamily: 'Albert Sans, Arial, sans-serif',
                    }}
                  >
                    Selanjutnya
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 text-sm mt-12 mb-8">
                Menampilkan semua {sortedCreators.length} creator (tidak ada pagination)
              </div>
            )}
          </>
        )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="mb-20">
        <MainFooter />
      </div>
    </>
  );
}
