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
import { useRouter } from "next/navigation";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const formSchema = z
  .object({
    email: z.string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
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

export function SignUpForm() {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
    
    if (errorMessage.includes("user already registered")) {
      return "Email sudah terdaftar. Silakan login atau gunakan email lain.";
    }
    
    if (errorMessage.includes("password should be at least")) {
      return "Password terlalu pendek. Minimal 6 karakter.";
    }
    
    if (errorMessage.includes("invalid email")) {
      return "Format email tidak valid. Silakan cek kembali.";
    }
    
    if (errorMessage.includes("network")) {
      return "Koneksi internet bermasalah. Silakan cek koneksi Anda.";
    }
    
    return "Gagal membuat akun. Silakan coba lagi.";
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await signUp(values.email, values.password);
      
      toast.success("Akun Berhasil Dibuat! ðŸŽ‰", {
        description: "Silakan cek email Anda untuk verifikasi akun.",
      });
      
      setShowVerifyDialog(true);
    } catch (error: any) {
      console.error("Signup error:", error);
      
      const errorMessage = getErrorMessage(error);
      
      toast.error("Gagal Membuat Akun âŒ", {
        description: errorMessage,
      });

      // Show specific field errors
      if (error.message?.toLowerCase().includes("user already registered")) {
        form.setError("email", {
          type: "manual",
          message: "Email sudah terdaftar."
        });
      }
      
      if (error.message?.toLowerCase().includes("password should be at least")) {
        form.setError("password", {
          type: "manual",
          message: "Password minimal 6 karakter."
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Check if form is valid for real-time feedback
  const isFormValid = form.formState.isValid && 
    watchedValues.email && 
    watchedValues.password && 
    watchedValues.confirmPassword &&
    watchedValues.password === watchedValues.confirmPassword;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Email</FormLabel>
                <FormControl>
<Input
                    placeholder="Enter your email"
                    {...field}
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30 focus:border-white/50"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
<FormLabel className="text-white font-medium">
                  Password
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password Anda"
                      {...field}
className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30 focus:border-white/50"

                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-300"

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
<FormMessage className="text-red-400" />

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
<FormLabel className="text-white font-medium">
                  Confirm Password
                </FormLabel>

                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Konfirmasi password Anda"
                      {...field}
className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30 focus:border-white/50"

                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-300"

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
<FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full text-white border-0"
            style={{
              background:
                "linear-gradient(85.56deg, #D900FF 2.74%, #9500FF 91.78%)",
            }}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}

          </Button>
        </form>
      </Form>

      {/* Popup Modal */}
      {showVerifyDialog && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Verifikasi Email
            </h2>
            <p className="text-sm text-gray-300 mb-4">
              Kami telah mengirimkan email verifikasi ke alamat email kamu.
              Silakan cek inbox atau folder spam untuk mengaktifkan akunmu.
            </p>
            <Button
              onClick={() => setShowVerifyDialog(false)}
              className="text-white border-0"
              style={{
                background:
                  "linear-gradient(85.56deg, #D900FF 2.74%, #9500FF 91.78%)",
              }}

            >
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

