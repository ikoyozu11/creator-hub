import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star, Award, Users, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface CreatorCardProps {
  creator: {
    id: string;
    name: string;
    bio: string | null;
    location: string | null;
    skills: string[] | null;
    experience_level: "beginner" | "intermediate" | "advanced" | "expert" | null;
    profile_image: string | null;
    hourly_rate: number | null;
    availability: "available" | "busy" | "unavailable" | null;
    // Statistik dummy untuk sementara
    rating?: number;
    workflows?: number;
    followers?: number;
  };
  variant?: "default" | "featured" | "compact";
  showStats?: boolean;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ 
  creator, 
  variant = "default",
  showStats = true 
}) => {
  // Data statistik dummy (akan diganti dengan data real nanti)
  const stats = {
    rating: creator.rating || 4.5 + Math.random() * 0.5,
    workflows: creator.workflows || Math.floor(Math.random() * 20) + 5,
    followers: creator.followers || Math.floor(Math.random() * 1000) + 100
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

  if (variant === "featured") {
    return (
      <div className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
        {/* Avatar with glow effect */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
          <Avatar className="w-28 h-28 mx-auto relative border-4 border-white/20 shadow-xl">
            <AvatarImage src={creator.profile_image || undefined} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-2xl font-bold">
              {creator.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Creator info */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {creator.name}
          </h3>
          <p className="text-purple-300 text-sm font-medium mb-4 bg-purple-500/20 px-3 py-1 rounded-full inline-block">
            {creator.skills?.[0] || "Automation Expert"}
          </p>

          {/* Stats */}
          {showStats && (
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white font-semibold text-sm">
                    {stats.rating.toFixed(1)}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-white font-semibold text-sm">
                    {stats.workflows}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">Workflows</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-white font-semibold text-sm">
                    {stats.followers}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">Followers</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={creator.profile_image || undefined} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {creator.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{creator.name}</h3>
              <p className="text-xs text-gray-500 truncate">
                {creator.skills?.[0] || "Automation Expert"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(creator.availability)}`}></div>
              <Badge variant="outline" className="text-xs">
                {creator.experience_level || "intermediate"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={creator.profile_image || undefined} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {creator.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{creator.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                {creator.location && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {creator.location}
                  </div>
                )}
                <div className={`w-2 h-2 rounded-full ${getAvailabilityColor(creator.availability)}`}></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge className={`text-xs ${getExperienceColor(creator.experience_level)}`}>
              {creator.experience_level || "intermediate"}
            </Badge>
            {creator.hourly_rate && (
              <span className="text-sm font-medium text-green-600">
                ${creator.hourly_rate}/hr
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {creator.bio && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {creator.bio}
          </p>
        )}
        
        {creator.skills && creator.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {creator.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {creator.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{creator.skills.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {showStats && (
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{stats.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-blue-500">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">{stats.workflows}</span>
            </div>
            <div className="flex items-center gap-1 text-green-500">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">{stats.followers}</span>
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <Button size="sm" className="flex-1" asChild>
            <a href={`/creators/${creator.id}`}>
              Lihat Profil
            </a>
          </Button>
          <Button size="sm" variant="outline">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatorCard; 