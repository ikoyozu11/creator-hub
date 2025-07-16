"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { MapPin, DollarSign, Globe, Linkedin, Twitter, Github, ArrowLeft, Play, ImageIcon, Instagram, Youtube } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/lib/supabase"
import { FaDiscord } from "react-icons/fa";
import MainFooter from "./main-footer";

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Workflow = Database["public"]["Tables"]["workflows"]["Row"]

interface TalentProfileProps {
  profileId: string
}

export function TalentProfile({ profileId }: TalentProfileProps) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProfileData()
  }, [profileId])

  const fetchProfileData = async () => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", profileId)
        .eq("status", "approved")
        .single()

      if (profileError) throw profileError

      // Fetch workflows
      const { data: workflowsData, error: workflowsError } = await supabase
        .from("workflows")
        .select("*")
        .eq("profile_id", profileId)
        .eq("status", "approved")
        .order("created_at", { ascending: false })

      if (workflowsError) throw workflowsError

      setProfile(profileData)
      setWorkflows(workflowsData || [])
    } catch (error) {
      console.error("Error fetching profile data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8" />
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Button asChild>
          <Link href="/directory"></Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Button */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="text-white hover:bg-white/10">
          <Link href="/directory">
            <ArrowLeft className="h-4 w-4 mr-2" />
          </Link>
        </Button>
      </div>

      {/* Main Profile Section */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <Avatar className="h-32 w-32 lg:h-40 lg:w-40">
              <AvatarImage src={profile.profile_image || undefined} />
              <AvatarFallback className="text-3xl lg:text-4xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {/* Inisial nama, hanya jika ada nama */}
                {profile.name && profile.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Profile Info - Left Side */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Albert Sans, Arial, sans-serif' }}>
              {profile.name}
            </h1>
          </div>

          {/* Bio dan Social Media - Kanan */}
          <div className="flex-1 min-w-0">
            {/* Bio lengkap, hanya jika ada */}
            {profile.bio && (
              <div className="text-white/80 leading-relaxed mb-6" style={{ fontFamily: 'Albert Sans, Arial, sans-serif' }}>
                {profile.bio}
              </div>
            )}

            {/* Social Links */}
            <div className="flex gap-4">
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" title="Website" className="text-gray-400 hover:text-white transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {profile.twitter && (
                <a href={profile.twitter} target="_blank" rel="noopener noreferrer" title="Twitter" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {profile.instagram && (
                <a href={profile.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {profile.threads && (
                <a href={profile.threads} target="_blank" rel="noopener noreferrer" title="Threads" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 18.5A8.5 8.5 0 1 1 12 3.5a8.5 8.5 0 0 1 0 17Zm.25-13.25a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75Zm-2.5 2.5a.75.75 0 0 1 1.5 0v6.5a.75.75 0 0 1-1.5 0v-6.5Zm5 0a.75.75 0 0 1 1.5 0v6.5a.75.75 0 0 1-1.5 0v-6.5Zm-2.5 8.25a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75Z"/>
                  </svg>
                </a>
              )}
              {profile.discord && (
                <a href={profile.discord} target="_blank" rel="noopener noreferrer" title="Discord" className="text-gray-400 hover:text-white transition-colors">
                  <FaDiscord className="w-5 h-5" />
                </a>
              )}
              {profile.youtube && (
                <a href={profile.youtube} target="_blank" rel="noopener noreferrer" title="YouTube" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Portfolio Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Albert Sans, Arial, sans-serif' }}>
            {/* Judul section, tidak ada fallback */}
            {workflows.length > 0 && "Workflow Portfolio"}
          </h2>
          {workflows.length > 0 && (
            <Badge className="bg-fuchsia-500 text-white">
              {workflows.length}
            </Badge>
          )}
        </div>

        {workflows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-200 border border-white/10">
                {/* Gambar/diagram workflow, jika ada */}
                <div className="w-full h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg mb-4 flex items-center justify-center">
                  {/* Jika ada gambar, tampilkan di sini */}
                </div>

                {/* Category Badge */}
                {workflow.tags && workflow.tags.length > 0 && (
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      {workflow.tags[0]}
                    </Badge>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2" style={{ fontFamily: 'Albert Sans, Arial, sans-serif' }}>
                  {workflow.title}
                </h3>

                {/* Description */}
                {workflow.description && (
                  <p className="text-gray-300 text-xs mb-3 line-clamp-2">
                    {workflow.description}
                  </p>
                )}

                {/* Tags */}
                {workflow.tags && workflow.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {workflow.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs bg-transparent border-gray-600 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                    {workflow.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs bg-transparent border-gray-600 text-gray-300">
                        +{workflow.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Creator Info */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                    {profile.name && profile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <span className="text-gray-300 text-xs" style={{ fontFamily: 'Albert Sans, Arial, sans-serif' }}>
                    {profile.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Main Footer */}
      <MainFooter />
    </div>
  )
}
