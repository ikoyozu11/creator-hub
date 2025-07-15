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
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 hero-bg-custom">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin text-white break-words">Meet the Creators</h2>
            <a href="/directory" className="btn-jelajah flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 rounded-full text-white text-sm sm:text-base font-medium bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-600 hover:to-violet-700 transition-all whitespace-nowrap flex-shrink-0">
              Temukan Creator
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gray-500 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-lg sm:text-xl mb-1 break-words">John Hopkins</div>
                  <div className="text-gray-300 text-sm sm:text-base break-words">Lead Developer,<br/>CEO</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 hero-bg-custom">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-thin text-white break-words">Meet the Creators</h2>
          <a href="/directory" className="btn-jelajah flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 rounded-full text-white text-sm sm:text-base font-medium bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-600 hover:to-violet-700 transition-all whitespace-nowrap flex-shrink-0">
            Temukan Creator
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {creators.length > 0 ? creators.map((creator) => (
            <div key={creator.id} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gray-500 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                {creator.profile_image ? (
                  <img src={creator.profile_image} alt={creator.name} className="w-full h-full object-cover rounded-full" />
                ) : null}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-lg sm:text-xl mb-1 break-words">{creator.name}</div>
                <div className="text-gray-300 text-sm sm:text-base break-words">{creator.bio || 'Lead Developer, CEO'}</div>
              </div>
            </div>
          )) : (
            [...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gray-500 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-lg sm:text-xl mb-1 break-words">John Hopkins</div>
                  <div className="text-gray-300 text-sm sm:text-base break-words">Lead Developer,<br/>CEO</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCreators;
