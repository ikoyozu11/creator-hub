"use client";


import React from "react";
import { ArrowRight, Zap, Users, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "next/navigation";
import FeaturedWorkflows from "@/components/featured-workflows";


function getInitials(nameOrEmail: string) {
  if (!nameOrEmail) return "?";
  const parts = nameOrEmail.split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

const HeroSection = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchRoleAndProfile = async () => {
      if (user) {
        setIsUserAdmin(await isAdmin(user.id));
        // Ambil data profil user
        const { data } = await supabase
          .from("profiles")
          .select("name, profile_image")
          .eq("user_id", user.id)
          .single();
        setProfile(data);
      }
    };
    fetchRoleAndProfile();
  }, [user, isAdmin]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update posisi cursor secara langsung untuk responsivitas maksimal
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsHovering(true);
      setIsTransitioning(false);
    }, 50);
  };

  const handleMouseLeave = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsHovering(false);
      setIsTransitioning(false);
    }, 50);
  };

  return (
    <section className="relative min-h-screen text-white overflow-visible content-above-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* HERO HEADING & SUBHEADING */}
        <div className="w-full pt-8 sm:pt-12 md:pt-20 flex flex-col gap-4 sm:gap-6 md:gap-10">
          <div className="flex flex-col lg:flex-row lg:items-center w-full gap-6 lg:gap-8">
            {/* Kiri: Heading, Community, dan Deskripsi */}
            <div className="flex flex-col items-start flex-1 min-w-0">
              <h1 className="font-sans font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.05] tracking-tight text-white mb-0 text-left">
                N8N Indonesia
              </h1>
              <div className="font-sans font-thin text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-[1.05] tracking-tight text-white/80 mb-2 text-left">
                Community
              </div>
              <div
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white mt-2 mb-0 text-left leading-relaxed"
                style={{
                  fontFamily: "Inter, Arial, sans-serif",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                Temukan dan bagikan workflow automation yang powerful.
              </div>
            </div>
            
            {/* Tengah: Garis Penghubung - Desktop Only */}
            <div className="hidden lg:flex items-center justify-center px-8">
              <div className="h-0.5 w-32 bg-white/40" />
            </div>
            
            {/* Kanan: Deskripsi - Desktop Only */}
            <div className="hidden lg:flex flex-1 min-w-0">
              <div
                className="font-sans font-normal text-white/80 text-left leading-relaxed"
                style={{
                  fontFamily: "Albert Sans, Arial, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                  letterSpacing: "-0.01em",
                  maxWidth: "100%",
                  whiteSpace: "normal",
                }}
              >
                Bergabunglah dengan komunitas N8N Indonesia dan tingkatkan
                produktivitas Anda.
              </div>
            </div>
          </div>
        </div>
        
        {/* INSIGHT & BUTTONS */}
        <div className="w-full py-12 sm:py-16 md:py-20 lg:py-32 flex flex-col items-center">
          <div className="w-full max-w-4xl mx-auto">
            <div
              className="relative rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6 md:p-8 cursor-pointer overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Gradient overlay yang mengikuti cursor */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4) 0%, rgba(168, 85, 247, 0.3) 30%, rgba(236, 72, 153, 0.2) 60%, transparent 100%)`,
                  opacity: isHovering ? 1 : 0,
                  transition: "opacity 0.2s ease-in-out",
                }}
              />
              
              {/* Content */}
              <div className="relative z-10">
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight text-white mb-4 sm:mb-6 md:mb-8"
                  style={{
                    fontFamily: "Albert Sans, Arial, sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  <span className="text-white/80 font-light">
                    Dapatkan insight, workflow siap pakai, dan dukungan dari
                    komunitas yang aktif dan solutif.
                  </span>
                  <br />
                  <span className="font-semibold text-white">
                    Mulai sekarang!
                  </span>
                </h2>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Link
                    href="/directory"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base"
                  >
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    Temukan Creator
                  </Link>
                  
                  <Link
                    href="/workflows"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base border border-white/20"
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                    Lihat Workflow
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

