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
import { toast } from "sonner";
import { AlertCircle, CheckCircle, Mail, RefreshCw } from "lucide-react";

const formSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  // Watch form values for real-time validation
  const watchedValues = form.watch();

  // Get specific error messages for different Supabase auth errors
  const getErrorMessage = (error: any) => {
    if (!error) return "An unexpected error occurred. Please try again.";
    
    const errorMessage = error.message?.toLowerCase() || "";
    
    if (errorMessage.includes("user not found")) {
      return "Email tidak terdaftar dalam sistem kami.";
    }
    
    if (errorMessage.includes("invalid email")) {
      return "Format email tidak valid. Silakan cek kembali.";
    }
    
    if (errorMessage.includes("too many requests")) {
      return "Terlalu banyak permintaan reset password. Silakan tunggu beberapa menit.";
    }
    
    if (errorMessage.includes("network")) {
      return "Koneksi internet bermasalah. Silakan cek koneksi Anda.";
    }
    
    return "Gagal mengirim email reset password. Silakan coba lagi.";
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(
        values.email,
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      );

      if (error) throw error;

      // Set success state
      setEmailSent(true);
      setSubmittedEmail(values.email);

      toast.success("Email Terkirim! 📧 Silakan cek email Anda untuk link reset password.");

      // Clear form after successful submission
      form.reset();
    } catch (error: any) {
      console.error("Reset password error:", error);
      
      const errorMessage = getErrorMessage(error);
      
      toast.error(`Gagal Mengirim Email ❌ ${errorMessage}`);

      // Show specific field errors
      if (error.message?.toLowerCase().includes("user not found")) {
        form.setError("email", {
          type: "manual",
          message: "Email tidak terdaftar."
        });
      }
      
      if (error.message?.toLowerCase().includes("invalid email")) {
        form.setError("email", {
          type: "manual",
          message: "Format email tidak valid."
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleResetForm = () => {
    setEmailSent(false);
    setSubmittedEmail("");
    form.reset();
  };

  // Check if form is valid for real-time feedback
  const isFormValid = form.formState.isValid && watchedValues.email;

  // Show success state
  if (emailSent) {
    return (
      <div className="space-y-6">
        {/* Success Notification */}
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-green-400 mb-2">
            Email Reset Password Terkirim! 📧
          </h3>
          <p className="text-green-200 text-sm mb-4">
            Kami telah mengirimkan link reset password ke:
          </p>
          <p className="text-white font-medium mb-4">
            {submittedEmail}
          </p>
          
          {/* Instructions */}
          <div className="bg-white/10 rounded-lg p-4 text-left">
            <h4 className="font-medium text-white mb-3">Langkah selanjutnya:</h4>
            <div className="space-y-2 text-sm text-gray-200">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Cek inbox email Anda</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Jika tidak ada di inbox, cek folder spam/junk</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Klik link reset password yang dikirim</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                <span>Masukkan password baru Anda</span>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <p className="text-blue-200 text-xs">
              🔒 Link reset password akan kadaluarsa dalam 24 jam. Jika tidak menerima email dalam 5 menit, coba kirim ulang.
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleResetForm}
            className="w-full text-white border-0"
            style={{ background: 'linear-gradient(85.56deg, #D900FF 2.74%, #9500FF 91.78%)' }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Kirim Ulang Email
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/auth'}
            className="w-full text-white border-0"
            style={{ background: 'linear-gradient(85.56deg, #D900FF 2.74%, #9500FF 91.78%)' }}
          >
            Kembali ke Login
          </Button>
        </div>
      </div>
    );
  }

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
        <Button
          type="submit"
          className="w-full text-white border-0"
          style={{
            background:
              "linear-gradient(85.56deg, #D900FF 2.74%, #9500FF 91.78%)",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Reset Password"}

        </Button>
      </form>
    </Form>
  );
}

