"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Award, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import CreatorCard from "@/components/creator-card";

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

const FeaturedCreators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedCreators();
  }, []);

  const fetchFeaturedCreators = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching featured creators:", error);
        return;
      }

      setCreators(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Creator Terbaik
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Creator{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Unggulan
              </span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Temui para ahli automation terbaik yang telah menciptakan workflow
              inovatif untuk komunitas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 animate-pulse"
              >
                <div className="w-28 h-28 bg-gray-300 rounded-full mx-auto mb-6"></div>
                <div className="text-center">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <a href="/directory" className="inline-flex items-center gap-2">
                <Users className="w-5 h-5" />
                Lihat Semua Creator
              </a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Creator Terbaik
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Creator{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Unggulan
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Temui para ahli automation terbaik yang telah menciptakan workflow
            inovatif untuk komunitas
          </p>
        </div>

        {/* Creators Grid */}
        {creators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {creators.map((creator, index) => (
              <div key={creator.id} className="relative">
                {/* Rank badge */}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10">
                  {index + 1}
                </div>
                
                <CreatorCard
                  creator={creator}
                  variant="featured"
                  showStats={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mb-16">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Belum ada creator tersedia
              </h3>
              <p className="text-gray-300">
                Creator akan muncul di sini setelah disetujui oleh admin
              </p>
            </div>
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <a href="/dashboard-profile" className="inline-flex items-center gap-2">
              <Users className="w-5 h-5" />
              Lihat Semua Creator
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCreators;
