"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

const formSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export function LoginForm() {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  // Watch form values for real-time validation
  const watchedValues = form.watch();

  // Get specific error messages for different Supabase auth errors
  const getErrorMessage = (error: any) => {
    if (!error) return "An unexpected error occurred. Please try again.";
    
    const errorMessage = error.message?.toLowerCase() || "";
    
    if (errorMessage.includes("invalid login credentials")) {
      return "Email atau password salah. Silakan cek kembali.";
    }
    
    if (errorMessage.includes("email not confirmed")) {
      return "Email belum dikonfirmasi. Silakan cek email Anda untuk verifikasi.";
    }
    
    if (errorMessage.includes("too many requests")) {
      return "Terlalu banyak percobaan login. Silakan tunggu beberapa menit.";
    }
    
    if (errorMessage.includes("user not found")) {
      return "Email tidak terdaftar. Silakan daftar terlebih dahulu.";
    }
    
    if (errorMessage.includes("network")) {
      return "Koneksi internet bermasalah. Silakan cek koneksi Anda.";
    }
    
    return "Gagal login. Silakan cek email dan password Anda.";
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      setLoginAttempts(prev => prev + 1);
      
      console.log("=== LOGIN PROCESS START ===");
      console.log("Starting login process...");

      await signIn(values.email, values.password);

      console.log("Login successful, showing toast...");
      toast({
        title: "Login Berhasil! 🎉",
        description: "Selamat datang kembali!",
      });

      // Check what cookies are set after login
      console.log("Cookies after login:", document.cookie);

      console.log("=== LOGIN PROCESS END ===");

      // Small delay to let the session sync, then redirect
      setTimeout(() => {
        console.log("Redirecting to /admin after login...");
        router.push("/admin");
      }, 500);
    } catch (error: any) {
      console.error("Login error:", error);
      
      const errorMessage = getErrorMessage(error);
      
      toast({
        variant: "destructive",
        title: "Login Gagal ❌",
        description: errorMessage,
      });

      // Clear password field on error
      form.setValue("password", "");
      
      // Show specific field errors
      if (error.message?.toLowerCase().includes("invalid login credentials")) {
        form.setError("password", {
          type: "manual",
          message: "Password salah. Silakan coba lagi."
        });
      }
      
      if (error.message?.toLowerCase().includes("user not found")) {
        form.setError("email", {
          type: "manual", 
          message: "Email tidak terdaftar."
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Check if form is valid for real-time feedback
  const isFormValid = form.formState.isValid && watchedValues.email && watchedValues.password;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="Masukkan email Anda" 
                    {...field} 
                    className={`bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30 focus:border-white/50 transition-all duration-200 ${
                      form.formState.errors.email 
                        ? "border-red-400 focus:border-red-400" 
                        : watchedValues.email && !form.formState.errors.email
                        ? "border-green-400 focus:border-green-400"
                        : ""
                    }`}
                  />
                  {watchedValues.email && !form.formState.errors.email && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                  )}
                  {form.formState.errors.email && (
                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password Anda"
                    {...field}
                    className={`bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30 focus:border-white/50 transition-all duration-200 ${
                      form.formState.errors.password 
                        ? "border-red-400 focus:border-red-400" 
                        : watchedValues.password && !form.formState.errors.password
                        ? "border-green-400 focus:border-green-400"
                        : ""
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-10 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  {watchedValues.password && !form.formState.errors.password && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                  )}
                  {form.formState.errors.password && (
                    <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-sm" />
            </FormItem>
          )}
        />
        
        {/* Login attempts warning */}
        {loginAttempts >= 3 && (
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
            <p className="text-yellow-200 text-sm">
              ⚠️ Sudah {loginAttempts} kali percobaan login. Pastikan email dan password Anda benar.
            </p>
          </div>
        )}
        
        <Button 
          type="submit" 
          className={`w-full text-white border-0 transition-all duration-200 ${
            isFormValid 
              ? "opacity-100" 
              : "opacity-70 cursor-not-allowed"
          }`}
          style={{ background: 'linear-gradient(85.56deg, #D900FF 2.74%, #9500FF 91.78%)' }}
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sedang login...
            </div>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
}
