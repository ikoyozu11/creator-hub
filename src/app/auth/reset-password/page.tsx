"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
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

const formSchema = z
  .object({
    password: z.string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
    confirmPassword: z.string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  // Watch form values for real-time validation
  const watchedValues = form.watch();

  // Get specific error messages for different Supabase auth errors
  const getErrorMessage = (error: any) => {
    if (!error) return "An unexpected error occurred. Please try again.";
    
    const errorMessage = error.message?.toLowerCase() || "";
    
    if (errorMessage.includes("password should be at least")) {
      return "Password terlalu pendek. Minimal 6 karakter.";
    }
    
    if (errorMessage.includes("invalid password")) {
      return "Password tidak memenuhi kriteria keamanan.";
    }
    
    if (errorMessage.includes("network")) {
      return "Koneksi internet bermasalah. Silakan cek koneksi Anda.";
    }
    
    return "Gagal mengubah password. Silakan coba lagi.";
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) throw error;

      // Set success state
      setPasswordChanged(true);

      toast({
        title: "Password Berhasil Diubah! 🔐",
        description: "Password Anda telah berhasil diubah. Silakan login dengan password baru.",
      });
    } catch (error: any) {
      console.error("Reset password error:", error);
      
      const errorMessage = getErrorMessage(error);
      
      toast({
        variant: "destructive",
        title: "Gagal Mengubah Password ❌",
        description: errorMessage,
      });

      // Show specific field errors
      if (error.message?.toLowerCase().includes("password should be at least")) {
        form.setError("password", {
          type: "manual",
          message: "Password minimal 6 karakter."
        });
      }
      
      if (error.message?.toLowerCase().includes("invalid password")) {
        form.setError("password", {
          type: "manual",
          message: "Password tidak memenuhi kriteria keamanan."
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Check if form is valid for real-time feedback
  const isFormValid = form.formState.isValid && 
    watchedValues.password && 
    watchedValues.confirmPassword &&
    watchedValues.password === watchedValues.confirmPassword;

  // Show success state
  if (passwordChanged) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {/* Success Notification */}
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              Password Berhasil Diubah! 🔐
            </h3>
            <p className="text-green-200 text-sm mb-4">
              Password Anda telah berhasil diubah dan tersimpan dengan aman.
            </p>
            
            {/* Instructions */}
            <div className="bg-white/10 rounded-lg p-4 text-left">
              <h4 className="font-medium text-white mb-3">Langkah selanjutnya:</h4>
              <div className="space-y-2 text-sm text-gray-200">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Password baru Anda sudah aktif</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Silakan login dengan password baru</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Jangan lupa simpan password dengan aman</span>
                </div>
              </div>
            </div>
            
            {/* Security Tips */}
            <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
              <p className="text-blue-200 text-xs">
              🔒 Tips keamanan: Jangan bagikan password Anda kepada siapapun dan gunakan password yang berbeda untuk setiap akun.
              </p>
            </div>
          </div>
          
          {/* Action Button */}
          <Button 
            onClick={() => router.push("/auth")}
            className="w-full text-white border-0"
            style={{ background: 'linear-gradient(85.56deg, #D900FF 2.74%, #9500FF 91.78%)' }}
          >
            Login dengan Password Baru
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Reset Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Masukkan password baru Anda
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Baru</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan password baru"
                        {...field}
                        className={`transition-all duration-200 ${
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
                        className="absolute right-10 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                  <FormMessage />
                  
                  {/* Password strength indicator */}
                  {watchedValues.password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${
                          watchedValues.password.length >= 6 ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                        <span className={watchedValues.password.length >= 6 ? 'text-green-400' : 'text-gray-400'}>
                          Minimal 6 karakter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${
                          /[a-z]/.test(watchedValues.password) ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                        <span className={/[a-z]/.test(watchedValues.password) ? 'text-green-400' : 'text-gray-400'}>
                          Huruf kecil
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${
                          /[A-Z]/.test(watchedValues.password) ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                        <span className={/[A-Z]/.test(watchedValues.password) ? 'text-green-400' : 'text-gray-400'}>
                          Huruf besar
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${
                          /\d/.test(watchedValues.password) ? 'bg-green-400' : 'bg-gray-400'
                        }`}></div>
                        <span className={/\d/.test(watchedValues.password) ? 'text-green-400' : 'text-gray-400'}>
                          Angka
                        </span>
                      </div>
                    </div>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Konfirmasi password baru"
                        {...field}
                        className={`transition-all duration-200 ${
                          form.formState.errors.confirmPassword 
                            ? "border-red-400 focus:border-red-400" 
                            : watchedValues.confirmPassword && !form.formState.errors.confirmPassword
                            ? "border-green-400 focus:border-green-400"
                            : ""
                        }`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-10 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      {watchedValues.confirmPassword && !form.formState.errors.confirmPassword && (
                        <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-400" />
                      )}
                      {form.formState.errors.confirmPassword && (
                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Info box */}
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-200 text-sm">
                🔐 Pastikan password baru Anda kuat dan mudah diingat. Password akan langsung aktif setelah berhasil diubah.
              </p>
            </div>
            
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
                  Mengubah password...
                </div>
              ) : (
                "Ubah Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
