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
        .limit(8);

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

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 hero-bg-custom">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
          <h2 className="heading-mobile-xl sm:heading-mobile-lg md:text-5xl lg:text-6xl xl:text-7xl font-thin text-white break-words">Meet the Creators</h2>
          <a href="/directory" className="btn-jelajah flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 rounded-full text-white button-text-mobile sm:button-text-mobile-lg font-medium bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-600 hover:to-violet-700 transition-all whitespace-nowrap flex-shrink-0">
            Temukan Creator
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            // Skeleton loader yang mirip dengan layout final
            [...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center animate-pulse">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gray-700 rounded-full mb-2" />
                <div className="h-4 w-24 bg-gray-700 rounded mb-1" />
                <div className="h-3 w-16 bg-gray-700 rounded" />
              </div>
            ))
          ) : creators.length > 0 ? (
            creators.map((creator) => (
              <div key={creator.id} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center mb-2">
                  {creator.profile_image ? (
                    <img src={creator.profile_image} alt={creator.name} className="w-full h-full object-cover rounded-full" />
                  ) : null}
                </div>
                <div className="font-bold text-white text-responsive-lg sm:text-xl mb-1 break-words">{creator.name}</div>
                <div className="text-gray-300 body-text-mobile sm:body-text-mobile-lg break-words">{creator.bio || 'Lead Developer, CEO'}</div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400 py-8">
              <div className="text-lg mb-2">Belum ada creator</div>
              <div className="text-sm">Creator akan muncul di sini setelah disetujui</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCreators;
