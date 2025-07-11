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
      <div className="ellipse-angular"></div>

      {/* Group Button & Login */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="header-nav-group ml-0">
          <Link href="/" className={`header-btn header-btn-home${pathname === '/' ? ' header-btn-active' : ''}`}>Home</Link>
          <Link href="/workflows" className={`header-btn header-btn-workflow${pathname === '/workflows' ? ' header-btn-active' : ''}`}>Workflow</Link>
          <Link href="/directory" className={`header-btn header-btn-creator${pathname === '/directory' ? ' header-btn-active' : ''}`}>Creator</Link>
          <Link href="/connect" className={`header-btn header-btn-connect${pathname === '/connect' ? ' header-btn-active' : ''}`}>Connect With Us</Link>
        </div>
        <Link href="/auth" className="btn-login flex items-center gap-2">
          Join Community
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75h2.25A2.25 2.25 0 0 1 21 6v12a2.25 2.25 0 0 1-2.25 2.25H16.5m-6-4.5 3-3m0 0-3-3m3 3H3" />
          </svg>
        </Link>
      </div>

      {/* HERO HEADING & SUBHEADING */}
      <div className="container mx-auto px-4 pt-12 md:pt-20 flex flex-col gap-6 md:gap-10">
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 w-full">
          {/* Kiri: Heading, Community, dan Deskripsi */}
          <div className="flex flex-col items-start flex-1 min-w-0">
            <h1 className="font-sans font-semibold text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-white mb-0 text-left">
              N8N Indonesia
            </h1>
            <div className="font-sans font-thin text-[2.2rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white/80 mb-2 text-left">
              Community
            </div>
            <div 
              style={{
                fontFamily: 'Inter, Arial, sans-serif',
                fontWeight: 400,
                fontStyle: 'thin',
                fontSize: '20px',
                lineHeight: '150%',
                letterSpacing: '-0.01em',
                color: '#FFFFFF',
                marginTop: '8px',
                marginBottom: '0',
                textAlign: 'left',
              }}
            >
              Temukan dan bagikan workflow automation yang powerful.
            </div>
          </div>
          {/* Kanan: Garis & Deskripsi */}
          <div className="hidden md:flex flex-row items-center flex-1 min-w-0 ml-8">
            <div className="h-0.5 w-32 bg-white/40 mr-6" />
            <div className="font-sans font-normal text-lg text-white/80 text-left"
              style={{
                fontFamily: 'Albert Sans, Arial, sans-serif',
                fontWeight: 400,
                fontStyle: 'normal',
                fontSize: '28px', // sebelumnya 35px
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
      <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <h2 
            style={{
              fontFamily: 'Albert Sans, Arial, sans-serif',
              fontWeight: 250,
              fontStyle: 'thin',
              fontSize: '48px',
              lineHeight: '120%',
              letterSpacing: '-0.02em',
              color: '#FFFBFB',
              textAlign: 'left',
              maxWidth: '840px',
              marginBottom: '32px',
            }}
          >
            Dapatkan insight, workflow siap pakai, dan dukungan dari komunitas yang aktif dan solutif. Workflow Hebat Dimulai dari Sini.
          </h2>
        </div>
        <div className="flex flex-row gap-4 md:gap-6">
          <a className="btn-jelajah flex items-center gap-3" href="/workflows">
            Jelajahi Workflow
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a className="btn-creator flex items-center gap-3" href="/directory">
            Temukan Creator
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
      <div className="mt-20 md:mt-24">
        <FeaturedWorkflows />
      </div>
    </section>
  );
};

export default HeroSection;
