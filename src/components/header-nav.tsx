"use client";

import { Button } from "@/components/ui/button";
import { Workflow, Menu, X } from "lucide-react";
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

export function HeaderNav() {
  const { user, isAdmin, signOut } = useAuth();
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header-gradient sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        {/* Desktop Navigation */}
        <div className="header-nav-group ml-0 hidden lg:flex">
          <Link
            href="/"
            className={`header-btn header-btn-home${pathname === '/' ? ' header-btn-active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            href="/workflows"
            className={`header-btn header-btn-workflow${pathname === '/workflows' ? ' header-btn-active' : ''}`}
            onClick={closeMobileMenu}
          >
            Workflow
          </Link>
          <Link
            href="/directory"
            className={`header-btn header-btn-creator${pathname === '/directory' ? ' header-btn-active' : ''}`}
            onClick={closeMobileMenu}
          >
            Creator
          </Link>
          <Link
            href="/connect"
            className={`header-btn header-btn-connect${pathname === '/connect' ? ' header-btn-active' : ''}`}
            onClick={closeMobileMenu}
          >
            Connect With Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded-md transition-colors"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* User Menu / Login Button */}
        <div className="flex items-center gap-2 sm:gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarImage
                    src={profile?.profile_image || undefined}
                    alt={profile?.name || user.email}
                  />
                  <AvatarFallback style={{ fontSize: '14px', fontWeight: "bold" }} className="text-xs sm:text-sm">
                    {getInitials(profile?.name || user.email)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 sm:w-64 p-0">
                <div className="flex flex-col items-center p-3 sm:p-4 pb-2">
                  <Avatar className="h-12 w-12 sm:h-16 sm:w-16 mb-2">
                    <AvatarImage
                      src={profile?.profile_image || undefined}
                      alt={profile?.name || user.email}
                    />
                    <AvatarFallback
                      style={{ fontSize: '20px', fontWeight: "bold" }}
                      className="text-lg sm:text-2xl"
                    >
                      {getInitials(profile?.name || user.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="font-semibold text-sm sm:text-lg text-center w-full truncate">
                    {profile?.name || user.email}
                  </div>
                  <div className="text-xs text-gray-500 text-center w-full truncate">
                    {user.email}
                  </div>
                </div>
                <div className="border-t my-2" />
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/dashboard-profile/profile");
                    closeMobileMenu();
                  }}
                  className="text-sm sm:text-base"
                >
                  Dashboard Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    handleSignOut();
                    closeMobileMenu();
                  }}
                  className="text-red-600 text-sm sm:text-base"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/auth"
              className="btn-login flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base whitespace-nowrap"
            >
              Join Community
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75h2.25A2.25 2.25 0 0 1 21 6v12a2.25 2.25 0 0 1-2.25 2.25H16.5m-6-4.5 3-3m0 0-3-3m3 3H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link
              href="/"
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm sm:text-base transition-colors ${
                pathname === '/' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/workflows"
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm sm:text-base transition-colors ${
                pathname === '/workflows' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
              onClick={closeMobileMenu}
            >
              Workflow
            </Link>
            <Link
              href="/directory"
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm sm:text-base transition-colors ${
                pathname === '/directory' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
              onClick={closeMobileMenu}
            >
              Creator
            </Link>
            <Link
              href="/connect"
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm sm:text-base transition-colors ${
                pathname === '/connect' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
              onClick={closeMobileMenu}
            >
              Connect With Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}