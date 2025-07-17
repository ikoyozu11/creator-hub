'use client';

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

  return (
    <section className="relative min-h-screen hero-bg-custom text-white overflow-hidden">
      {/* Dekorasi Ellipse Angular Gradient */}
      <div className="ellipse-angular-hero"></div>

      {/* HERO HEADING & SUBHEADING */}
      <div className="container mx-auto container-mobile pt-8 sm:pt-12 md:pt-16 lg:pt-20 flex flex-col space-mobile sm:space-mobile-lg md:gap-8 lg:gap-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-8 w-full">
          {/* Kiri: Heading, Community, dan Deskripsi */}
          <div className="flex flex-col items-start flex-1 min-w-0">
            <h1 className="font-sans font-semibold heading-mobile-xl sm:heading-mobile-lg md:heading-mobile lg:text-6xl xl:text-7xl 2xl:text-8xl leading-[1.05] tracking-tight text-white mb-0 text-left break-words">
              N8N Indonesia
            </h1>
            <div className="font-sans font-thin heading-mobile sm:heading-mobile-lg md:heading-mobile lg:text-5xl xl:text-6xl 2xl:text-7xl leading-[1.05] tracking-tight text-white/80 mb-2 text-left break-words">
              Community
            </div>
            <div 
              className="text-responsive-sm sm:body-text-mobile-lg md:text-lg lg:text-xl leading-relaxed text-white mt-2 mb-0 text-left max-w-full"
              style={{
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: 400,
                fontStyle: 'thin',
                letterSpacing: '-0.01em',
              }}
            >
              Temukan dan bagikan workflow automation yang powerful.
            </div>
          </div>
          {/* Kanan: Garis & Deskripsi */}
          <div className="hidden lg:flex flex-row items-center flex-1 min-w-0 ml-8">
            <div className="h-0.5 w-16 sm:w-24 md:w-32 bg-white/40 mr-4 sm:mr-6 flex-shrink-0" />
            <div className="font-sans font-normal text-white/80 text-left break-words"
              style={{
                fontFamily: 'Albert Sans, Arial, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: 'clamp(16px, 2vw, 28px)',
                lineHeight: '107%',
                letterSpacing: '-0.01em',
                color: '#FFFFFF',
                maxWidth: '100%',
                whiteSpace: 'normal',
                textAlign: 'left',
              }}
            >
              Bergabunglah dengan komunitas N8N Indonesia dan tingkatkan produktivitas Anda.
            </div>
          </div>
        </div>
      </div>

      {/* INSIGHT & BUTTONS */}
      <div className="container mx-auto container-mobile py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 flex flex-col items-center">
        <div className="w-full max-w-4xl mx-auto">
          <h2 
            className="font-sans font-thin heading-mobile sm:heading-mobile-lg md:heading-mobile lg:text-5xl xl:text-6xl leading-[1.2] tracking-tight text-white text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 break-words"
            style={{
              fontFamily: 'Albert Sans, Arial, sans-serif',
              fontWeight: 250,
              fontStyle: 'thin',
              letterSpacing: '-0.02em',
              color: '#FFFBFB',
            }}
          >
            Dapatkan insight, workflow siap pakai, dan dukungan dari komunitas yang aktif dan solutif. Workflow Hebat Dimulai dari Sini.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row space-mobile sm:space-mobile-lg md:gap-6 w-full max-w-md sm:max-w-none justify-center">
          <a className="btn-jelajah flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 button-text-mobile sm:button-text-mobile-lg whitespace-nowrap" href="/workflows">
            Jelajahi Workflow
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a className="btn-creator flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 button-text-mobile sm:button-text-mobile-lg whitespace-nowrap" href="/directory">
            Temukan Creator
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
      <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24">
        <FeaturedWorkflows />
      </div>
    </section>
  );
};

export default HeroSection;
