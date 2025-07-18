﻿"use client";

import { Button } from "@/components/ui/button";
import { Home, Workflow, User, Link as LinkIcon, Menu, X } from "lucide-react";

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

function getInitials(nameOrEmail: string) {
  if (!nameOrEmail) return "?";
  const parts = nameOrEmail.split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

const navItems = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Workflow",
    href: "/workflows",
    icon: Workflow,
  },
  {
    label: "Creator",
    href: "/directory",
    icon: User,
  },
  {
    label: "Connect With Us",
    href: "/connect-with-us",
    icon: LinkIcon,
  },
];

export function HeaderNav() {
  const { user, isAdmin, signOut } = useAuth();
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchRoleAndProfile = async () => {
      if (user) {
        setIsUserAdmin(await isAdmin(user.id));
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

  // Handle scroll untuk mengubah transparansi header
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldBeBlurred = scrollTop > 50 || scrollTop > 1000;
      setIsScrolled(shouldBeBlurred);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`${
        isScrolled ? "header-transparent" : "header-completely-transparent"
      } sticky top-0 z-50 transition-all duration-300`}
      style={{
        background: isScrolled ? "rgba(32, 26, 44, 0.98)" : "transparent",
        backdropFilter: isScrolled ? "blur(40px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(40px)" : "none",
        borderBottom: isScrolled
          ? "1px solid rgba(255, 255, 255, 0.15)"
          : "none",
        boxShadow: isScrolled ? "0 10px 40px rgba(0, 0, 0, 0.4)" : "none",
        isolation: "isolate",
        transform: "translateZ(0)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg sm:text-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N8N</span>
            </div>
            <span className="hidden sm:block">Indonesia</span>
          </Link>

          {/* NAVBAR MENU - Desktop Only */}
          <div className="hidden lg:flex border-2 border-white/40 rounded-full px-2 py-1 gap-2 shadow-lg">
            {navItems.map((item) => {
              let isActive = false;
              if (item.href === "/") {
                isActive = pathname === "/";
              } else if (item.href === "/workflows") {
                isActive =
                  pathname === "/workflows" || pathname.startsWith("/workflows/");
              } else if (item.href === "/directory") {
                isActive =
                  pathname === "/directory" ||
                  pathname.startsWith("/creators/");
              } else if (item.href === "/connect-with-us") {
                isActive = pathname === "/connect-with-us";
              } else {
                isActive = pathname === item.href;
              }

              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-200 text-sm sm:text-base select-none
                    ${
                      isActive
                        ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700"
                        : "bg-transparent text-white hover:bg-white/10"
                    }
                  `}
                  style={{ minWidth: 0 }}
                >
                  <span className="truncate">{item.label}</span>
                  {isActive && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-700" />}
                </Link>
              );
            })}
          </div>

          {/* AVATAR / JOIN COMMUNITY */}
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage
                      src={profile?.profile_image || undefined}
                      alt={profile?.name || user.email}
                    />
                    <AvatarFallback
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        backgroundColor: "#374151",
                        color: "#F9FAFB",
                      }}
                    >
                      {getInitials(profile?.name || user.email)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 sm:w-64 p-0 border border-white/10 shadow-2xl"
                  style={{
                    background: "rgba(32, 26, 44, 0.95)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <div className="flex flex-col items-center p-4 pb-3">
                    <Avatar className="h-14 w-14 sm:h-16 sm:w-16 mb-3">
                      <AvatarImage
                        src={profile?.profile_image || undefined}
                        alt={profile?.name || user.email}
                      />
                      <AvatarFallback
                        style={{
                          fontSize: 24,
                          fontWeight: "bold",
                          backgroundColor: "rgba(55, 65, 81, 0.6)",
                          color: "#F9FAFB",
                        }}
                      >
                        {getInitials(profile?.name || user.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-semibold text-base sm:text-lg text-center w-full truncate text-white mb-1">
                      {profile?.name || user.email}
                    </div>
                    <div className="text-xs text-white/70 text-center w-full truncate">
                      {user.email}
                    </div>
                  </div>
                  <div className="border-t border-white/10 mx-3" />
                  <div className="p-1">
                    <DropdownMenuItem
                      onClick={() => router.push("/dashboard-profile")}
                      className="text-white/90 hover:text-white hover:bg-white/5 focus:text-white focus:bg-white/5 rounded-lg mx-1 mb-1 px-3 py-2 transition-all duration-200 text-sm"
                    >
                      Dashboard Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-red-300 hover:text-red-200 hover:bg-red-500/10 focus:text-red-200 focus:bg-red-500/10 rounded-lg mx-1 px-3 py-2 transition-all duration-200 text-sm"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link 
                href="/auth" 
                className="btn-login flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
              >
                <span className="hidden sm:inline">Join Community</span>
                <span className="sm:hidden">Join</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 3.75h2.25A2.25 2.25 0 0 1 21 6v12a2.25 2.25 0 0 1-2.25 2.25H16.5m-6-4.5 3-3m0 0-3-3m3 3H3"
                  />
                </svg>
              </Link>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="mobile-menu-button lg:hidden text-white hover:bg-white/10 p-2"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-container lg:hidden bg-black/95 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => {
              let isActive = false;
              if (item.href === "/") {
                isActive = pathname === "/";
              } else if (item.href === "/workflows") {
                isActive =
                  pathname === "/workflows" || pathname.startsWith("/workflows/");
              } else if (item.href === "/directory") {
                isActive =
                  pathname === "/directory" ||
                  pathname.startsWith("/creators/");
              } else if (item.href === "/connect-with-us") {
                isActive = pathname === "/connect-with-us";
              } else {
                isActive = pathname === item.href;
              }

              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm sm:text-base transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white' 
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                  onClick={closeMobileMenu}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
