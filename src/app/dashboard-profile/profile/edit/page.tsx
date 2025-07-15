"use client";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Globe, Linkedin, Twitter, Github, Instagram, Youtube, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TagInput } from "@/components/ui/tag-input";
import { PROVINCES } from "@/data/indonesia-regions";
import { FaDiscord } from "react-icons/fa";
import { useRouter } from "next/navigation";

const defaultProfileForm = {
  name: "",
  bio: "",
  website: "",
  linkedin: "",
  twitter: "",
  github: "",
  experience_level: "",
  availability: "",
  location: "",
  instagram: "",
  threads: "",
  discord: "",
  youtube: "",
};

export default function EditProfilePage() {
  const { user } = useAuth();
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState(defaultProfileForm);
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      setProfile(data);
      setLoading(false);
      if (data) {
        setForm({
          name: data.name || "",
          bio: data.bio || "",
          website: data.website || "",
          linkedin: data.linkedin || "",
          twitter: data.twitter || "",
          github: data.github || "",
          experience_level: data.experience_level || "",
          availability: data.availability || "",
          location: data.location || "",
          instagram: data.instagram || "",
          threads: data.threads || "",
          discord: data.discord || "",
          youtube: data.youtube || "",
        });
        setSkills(data.skills || []);
        setProfileImage(data.profile_image || "");
        if (data.location) {
          const [prov, city] = data.location.split(", ");
          setProvinsi(prov || "");
          setKota(city || "");
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;
    const file = e.target.files[0];
    if (!file || !file.name) return;
    // Validasi ekstensi file
    const allowedExtensions = ["jpg", "jpeg", "png"];
    const fileExt = file.name.split(".").pop()?.toLowerCase();
    if (!fileExt || !allowedExtensions.includes(fileExt)) {
      alert("Hanya file gambar dengan format JPG, JPEG, atau PNG yang diperbolehkan.");
      return;
    }
    const filePath = `user-profiles/${user.id}.${fileExt}`;
    const { error } = await supabase.storage
      .from("user-profiles")
      .upload(filePath, file, { upsert: true });
    if (!error) {
      const { data: urlData } = supabase.storage
        .from("user-profiles")
        .getPublicUrl(filePath);
      setProfileImage(urlData.publicUrl);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const safeSkills = Array.isArray(skills) ? skills : skills ? [skills] : [];
    const location = provinsi && kota ? `${provinsi}, ${kota}` : form.location;
    const updateData: Record<string, any> = {
      name: form.name,
      bio: form.bio || null,
      website: form.website || null,
      linkedin: form.linkedin || null,
      twitter: form.twitter || null,
      github: form.github || null,
      experience_level: form.experience_level || null,
      availability: form.availability || null,
      location,
      skills: safeSkills,
      profile_image: profileImage || null,
      status: "approved",
      instagram: form.instagram || null,
      threads: form.threads || null,
      discord: form.discord || null,
      youtube: form.youtube || null,
    };
    const { error } = await supabase
      .from("profiles")
      .update(updateData)
      .eq("user_id", user.id);
    if (error) {
      alert("Gagal menyimpan perubahan: " + error.message);
      return;
    }
    alert("Perubahan profil berhasil disimpan!");
    router.push("/dashboard-profile/profile");
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Not Logged In</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Silakan login untuk mengedit profil Anda.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Edit Profil</h1>
        <Button variant="outline" onClick={() => router.push("/dashboard-profile/profile")} className="w-full sm:w-auto">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali ke Profil
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <Card>
          <CardContent className="space-y-4 pt-4 sm:pt-6 p-4 sm:p-6">
            {/* Avatar dan link sosial di sini */}
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-4 sm:mb-6">
              <div className="flex flex-col items-center gap-4 w-full lg:w-1/3">
                <div className="relative flex flex-col items-center">
                  <img
                    src={profileImage || "/placeholder-user.jpg"}
                    alt="Avatar"
                    className="h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border mx-auto mb-2"
                  />
                  <button
                    type="button"
                    className="absolute bottom-2 sm:bottom-4 right-1/2 translate-x-1/2 bg-white rounded-full p-1 border shadow hover:bg-gray-100"
                    onClick={handleAvatarClick}
                    title="Ubah Foto Profil"
                  >
                    <Pencil className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {/* Media sosial: ikon + input */}
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                    <Input
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      placeholder="Website"
                      className="flex-1 text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                    <Input
                      name="linkedin"
                      value={form.linkedin}
                      onChange={handleChange}
                      placeholder="LinkedIn"
                      className="flex-1 text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                    <Input
                      name="twitter"
                      value={form.twitter}
                      onChange={handleChange}
                      placeholder="Twitter"
                      className="flex-1 text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                    <Input
                      name="github"
                      value={form.github}
                      onChange={handleChange}
                      placeholder="GitHub"
                      className="flex-1 text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                    <Input
                      name="instagram"
                      value={form.instagram}
                      onChange={handleChange}
                      placeholder="Instagram"
                      className="flex-1 text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 18.5A8.5 8.5 0 1 1 12 3.5a8.5 8.5 0 0 1 0 17Zm.25-13.25a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75Zm-2.5 2.5a.75.75 0 0 1 1.5 0v6.5a.75.75 0 0 1-1.5 0v-6.5Zm5 0a.75.75 0 0 1 1.5 0v6.5a.75.75 0 0 1-1.5 0v-6.5Zm-2.5 8.25a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-1.5 0v-.5a.75.75 0 0 1 .75-.75Z"/></svg>
                    <Input
                      name="threads"
                      value={form.threads}
                      onChange={handleChange}
                      placeholder="Threads"
                      className="flex-1 text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <FaDiscord className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                    <Input
                      name="discord"
                      value={form.discord}
                      onChange={handleChange}
                      placeholder="Discord"
                      className="flex-1 text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                    <Input
                      name="youtube"
                      value={form.youtube}
                      onChange={handleChange}
                      placeholder="YouTube"
                      className="flex-1 text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Form utama */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block font-medium mb-1 text-sm sm:text-base">Nama Lengkap</label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm sm:text-base">Bio</label>
                  <Textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Ceritakan tentang diri Anda..."
                    rows={4}
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1 text-sm sm:text-base">Level Pengalaman</label>
                    <select
                      name="experience_level"
                      value={form.experience_level}
                      onChange={handleSelect}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base"
                    >
                      <option value="">Pilih Level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium mb-1 text-sm sm:text-base">Status Ketersediaan</label>
                    <select
                      name="availability"
                      value={form.availability}
                      onChange={handleSelect}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base"
                    >
                      <option value="">Pilih Status</option>
                      <option value="available">Tersedia</option>
                      <option value="busy">Sibuk</option>
                      <option value="unavailable">Tidak Tersedia</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm sm:text-base">Skills</label>
                  <TagInput
                    value={skills}
                    onChange={setSkills}
                    placeholder="Tambahkan skill (tekan Enter)"
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1 text-sm sm:text-base">Provinsi</label>
                    <select
                      value={provinsi}
                      onChange={(e) => setProvinsi(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base"
                    >
                      <option value="">Pilih Provinsi</option>
                      {PROVINCES.map((province) => (
                        <option key={province.name} value={province.name}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium mb-1 text-sm sm:text-base">Kota/Kabupaten</label>
                    <select
                      value={kota}
                      onChange={(e) => setKota(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base"
                      disabled={!provinsi}
                    >
                      <option value="">Pilih Kota</option>
                      {provinsi &&
                        PROVINCES.find((p) => p.name === provinsi)?.cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" className="w-full sm:w-auto">Simpan Perubahan</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard-profile/profile")}
                className="w-full sm:w-auto"
              >
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
} 