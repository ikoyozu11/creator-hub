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

console.log("Login successful!");

      console.log("=== LOGIN PROCESS END ===");

      // Small delay to let the session sync, then redirect
      setTimeout(() => {
        console.log("Redirecting to /admin after login...");
        router.push("/admin");
      }, 500);
    } catch (error: any) {
      console.error("Login error:", error);
// Error sudah dihandle di auth-context dengan sonner toast

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
              <FormLabel className="text-white font-medium">Password</FormLabel>
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
        <Button
          type="submit"
          className="w-full text-white border-0"
          style={{
            background:
              "linear-gradient(85.56deg, #D900FF 2.74%, #9500FF 91.78%)",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}

        </Button>
      </form>
    </Form>
  );
}

