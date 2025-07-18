"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Award, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
      <section className="py-20 content-above-gradient">
        <div className="w-full px-16">
          <div className="flex flex-row items-center justify-between mb-16">
            <h2
              style={{
                fontFamily: "Albert Sans, Arial, sans-serif",
                fontWeight: 300,
                fontStyle: "normal",
                fontSize: 80,
                lineHeight: "120%",
                letterSpacing: 0,
                color: "#FFFFFF",
                textAlign: "left",
                margin: 0,
                padding: 0,
              }}
            >
              Meet the Creators
            </h2>
            <a
              href="/directory"
              className="btn-jelajah flex items-center gap-3"
              style={{ height: 60 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              Temukan Creator
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-row items-center gap-6">
                <Avatar className="w-40 h-40">
                  <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-purple-500 to-pink-500">
                    ?
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-white text-xl mb-1">
                    Loading...
                  </div>
                  <div className="text-gray-300 text-base">Loading...</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 content-above-gradient">
      <div className="w-full px-16 relative z-10">
        <div className="flex flex-row items-center justify-between mb-16">
          <h2
            style={{
              fontFamily: "Albert Sans, Arial, sans-serif",
              fontWeight: 300,
              fontStyle: "normal",
              fontSize: 80,
              lineHeight: "120%",
              letterSpacing: 0,
              color: "#FFFFFF",
              textAlign: "left",
              margin: 0,
              padding: 0,
            }}
          >
            Meet the Creators
          </h2>
          <a
            href="/directory"
            className="btn-jelajah flex items-center gap-3"
            style={{ height: 60 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            Temukan Creator
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {creators.length > 0
            ? creators.map((creator) => (
                <div
                  key={creator.id}
                  className="flex flex-row items-center gap-6"
                >
                  <Avatar className="w-40 h-40">
                    <AvatarImage
                      src={creator.profile_image || undefined}
                      alt={creator.name}
                    />
                    <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-purple-500 to-pink-500">
                      {getInitials(creator.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-white text-xl mb-1">
                      {creator.name}
                    </div>
                    <div className="text-gray-300 text-base">
                      {creator.bio || "Lead Developer, CEO"}
                    </div>
                  </div>
                </div>
              ))
            : [...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-row items-center gap-6">
                  <Avatar className="w-40 h-40">
                    <AvatarFallback className="text-4xl font-bold bg-gradient-to-br from-purple-500 to-pink-500">
                      ?
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-white text-xl mb-1">
                      No Creators Found
                    </div>
                    <div className="text-gray-300 text-base">
                      No creators available
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
