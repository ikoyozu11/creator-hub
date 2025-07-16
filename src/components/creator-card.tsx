import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Clock, DollarSign, Users } from "lucide-react";
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
  created_at?: string;
}

interface CreatorCardProps {
  creator: Creator;
  variant?: "default" | "compact" | "featured";
  showStats?: boolean;
}

export default function CreatorCard({ creator, variant = "default", showStats = false }: CreatorCardProps) {
  const getExperienceColor = (level: string | null) => {
    switch (level) {
      case "expert": return "bg-purple-500/20 text-purple-400";
      case "advanced": return "bg-blue-500/20 text-blue-400";
      case "intermediate": return "bg-green-500/20 text-green-400";
      case "beginner": return "bg-yellow-500/20 text-yellow-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getAvailabilityColor = (status: string | null) => {
    switch (status) {
      case "available": return "bg-green-500/20 text-green-400";
      case "busy": return "bg-yellow-500/20 text-yellow-400";
      case "unavailable": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Styling untuk variant featured
  const getCardStyle = () => {
    if (variant === "featured") {
      return "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300";
    }
    return "bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-200";
  };

  const getTextStyle = () => {
    if (variant === "featured") {
      return "text-white";
    }
    return "text-white";
  };

  const getSubTextStyle = () => {
    if (variant === "featured") {
      return "text-gray-300";
    }
    return "text-white/80";
  };

  return (
    <Card className={`h-full transition-all duration-200 ${variant !== "compact" ? "hover:shadow-xl hover:scale-[1.03]" : ""} ${getCardStyle()}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={creator.profile_image || undefined} alt={creator.name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {getInitials(creator.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 
              className={`font-semibold text-lg truncate ${getTextStyle()}`}
              style={{
                fontFamily: 'Albert Sans, Arial, sans-serif',
              }}
            >
              {creator.name}
            </h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 