"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Star, 
  Award, 
  Users, 
  ExternalLink, 
  Mail, 
  MessageCircle,
  Globe,
  Linkedin,
  Twitter,
  Github,
  Instagram,
  Youtube,
  ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

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
  website: string | null;
  linkedin: string | null;
  twitter: string | null;
  github: string | null;
  instagram: string | null;
  youtube: string | null;
  discord: string | null;
  threads: string | null;
}

export default function CreatorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchCreator(params.id as string);
    }
  }, [params.id]);

  const fetchCreator = async (id: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .eq("status", "approved")
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
        return;
      }

      setCreator(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getExperienceColor = (level: string | null) => {
    switch (level) {
      case "expert": return "bg-red-500";
      case "advanced": return "bg-orange-500";
      case "intermediate": return "bg-yellow-500";
      case "beginner": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getAvailabilityColor = (status: string | null) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "busy": return "bg-yellow-500";
      case "unavailable": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getAvailabilityText = (status: string | null) => {
    switch (status) {
      case "available": return "Tersedia";
      case "busy": return "Sibuk";
      case "unavailable": return "Tidak Tersedia";
      default: return "Tidak Diketahui";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Creator tidak ditemukan</h1>
          <p className="text-gray-600 mb-4">
            Creator yang Anda cari tidak ditemukan atau belum disetujui
          </p>
          <Button onClick={() => router.push("/directory")}>
            Kembali ke Directory
          </Button>
        </div>
      </div>
    );
  }

  // Dummy stats (akan diganti dengan data real nanti)
  const stats = {
    rating: 4.5 + Math.random() * 0.5,
    workflows: Math.floor(Math.random() * 20) + 5,
    followers: Math.floor(Math.random() * 1000) + 100,
    projects: Math.floor(Math.random() * 50) + 10
  };

  const socialLinks = [
    { name: "Website", url: creator.website, icon: Globe },
    { name: "LinkedIn", url: creator.linkedin, icon: Linkedin },
    { name: "Twitter", url: creator.twitter, icon: Twitter },
    { name: "GitHub", url: creator.github, icon: Github },
    { name: "Instagram", url: creator.instagram, icon: Instagram },
    { name: "YouTube", url: creator.youtube, icon: Youtube }
  ].filter(link => link.url);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <Button
        variant="outline"
        className="mb-6 flex items-center gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </Button>

      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <Avatar className="w-24 h-24">
          <AvatarImage src={creator.profile_image || undefined} />
          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold">
            {creator.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{creator.name}</h1>
            <Badge className={`${getExperienceColor(creator.experience_level)}`}>
              {creator.experience_level || "intermediate"}
            </Badge>
            <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(creator.availability)}`}></div>
            <span className="text-sm text-gray-600">
              {getAvailabilityText(creator.availability)}
            </span>
          </div>
          
          {creator.location && (
            <div className="flex items-center gap-1 text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span>{creator.location}</span>
            </div>
          )}
          
          {creator.hourly_rate && (
            <div className="text-lg font-semibold text-green-600 mb-2">
              ${creator.hourly_rate}/jam
            </div>
          )}
          
          {creator.bio && (
            <p className="text-gray-600 leading-relaxed">{creator.bio}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills */}
          {creator.skills && creator.skills.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Keahlian</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {creator.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-xl font-bold">{stats.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                    <Award className="w-5 h-5" />
                    <span className="text-xl font-bold">{stats.workflows}</span>
                  </div>
                  <p className="text-sm text-gray-600">Workflows</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                    <Users className="w-5 h-5" />
                    <span className="text-xl font-bold">{stats.followers}</span>
                  </div>
                  <p className="text-sm text-gray-600">Followers</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-purple-500 mb-1">
                    <Award className="w-5 h-5" />
                    <span className="text-xl font-bold">{stats.projects}</span>
                  </div>
                  <p className="text-sm text-gray-600">Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Media Sosial</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Button
                        key={link.name}
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a
                          href={link.url || undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Icon className="w-4 h-4" />
                          {link.name}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Hubungi Creator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" size="lg">
                <Mail className="w-4 h-4 mr-2" />
                Kirim Email
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                Kirim Pesan
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                <ExternalLink className="w-4 h-4 mr-2" />
                Lihat Portfolio
              </Button>
            </CardContent>
          </Card>

          {/* Availability Card */}
          <Card>
            <CardHeader>
              <CardTitle>Ketersediaan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(creator.availability)}`}></div>
                <span className="font-medium">{getAvailabilityText(creator.availability)}</span>
              </div>
              <p className="text-sm text-gray-600">
                {creator.availability === "available" 
                  ? "Creator ini sedang tersedia untuk project baru"
                  : creator.availability === "busy"
                  ? "Creator ini sedang sibuk dengan project lain"
                  : "Creator ini sedang tidak tersedia untuk project baru"
                }
              </p>
            </CardContent>
          </Card>

          {/* Experience Card */}
          <Card>
            <CardHeader>
              <CardTitle>Level Pengalaman</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`${getExperienceColor(creator.experience_level)}`}>
                  {creator.experience_level || "intermediate"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                {creator.experience_level === "expert" 
                  ? "Ahli dengan pengalaman bertahun-tahun"
                  : creator.experience_level === "advanced"
                  ? "Lanjutan dengan pengalaman yang solid"
                  : creator.experience_level === "intermediate"
                  ? "Menengah dengan pengalaman yang cukup"
                  : "Pemula yang sedang berkembang"
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 