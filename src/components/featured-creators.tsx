"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Award, Users, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

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

function getInitials(name: string) {
  if (!name) return "?";
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
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
      <section className="py-12 sm:py-16 md:py-20 content-above-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light leading-tight text-white text-left"
                style={{
                  fontFamily: "Albert Sans, Arial, sans-serif",
                  letterSpacing: "-0.02em",
                }}>
              Meet the Creators
            </h2>
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 text-sm sm:text-base"
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              Temukan Creator
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
                  <AvatarFallback className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-br from-purple-500 to-pink-500">
                    ?
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-lg sm:text-xl mb-1 truncate">
                    Loading...
                  </div>
                  <div className="text-gray-300 text-sm sm:text-base truncate">Loading...</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 content-above-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 md:mb-16 gap-4 sm:gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-light leading-tight text-white text-left"
              style={{
                fontFamily: "Albert Sans, Arial, sans-serif",
                letterSpacing: "-0.02em",
              }}>
            Meet the Creators
          </h2>
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 text-sm sm:text-base"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            Temukan Creator
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {creators.length > 0
            ? creators.map((creator) => (
                <Link
                  key={creator.id}
                  href={`/creators/${creator.id}`}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left hover:bg-white/5 rounded-lg p-4 transition-all duration-200 group"
                >
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 group-hover:scale-105 transition-transform duration-200">
                    <AvatarImage
                      src={creator.profile_image || undefined}
                      alt={creator.name}
                    />
                    <AvatarFallback className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-br from-purple-500 to-pink-500">
                      {getInitials(creator.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-lg sm:text-xl mb-1 truncate group-hover:text-purple-300 transition-colors">
                      {creator.name}
                    </div>
                    <div className="text-gray-300 text-sm sm:text-base truncate">
                      {creator.bio || "Lead Developer, CEO"}
                    </div>
                  </div>
                </Link>
              ))
            : [...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
                  <Avatar className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
                    <AvatarFallback className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold bg-gradient-to-br from-purple-500 to-pink-500">
                      ?
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-lg sm:text-xl mb-1 truncate">
                      No Creator Available
                    </div>
                    <div className="text-gray-300 text-sm sm:text-base truncate">
                      Be the first to join!
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCreators;

