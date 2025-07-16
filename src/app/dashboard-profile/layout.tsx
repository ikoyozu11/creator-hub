"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="container mx-auto px-4 py-4 sm:py-8 max-w-6xl" style={{ backgroundColor: '#201A2C', minHeight: '100vh' }}>
      <Button
        variant="outline"
        className="mb-4 sm:mb-6 flex items-center gap-2 text-sm sm:text-base text-white border-white/30 hover:bg-white/10 hover:text-white"
        style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.3)' }}
        onClick={() => router.push("/")}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Button>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
        {/* Sidebar navigasi */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card className="sticky top-4 sm:top-8 bg-white/10 backdrop-blur-sm border border-white/20">
            <CardHeader className="text-center p-4 sm:p-6">
              <div className="flex flex-col gap-2 sm:gap-3">
                <Button
                  variant={
                    pathname.endsWith("/profile") ? "default" : "outline"
                  }
                  onClick={() => router.push("/dashboard-profile/profile")}
                  className="mb-2 text-sm sm:text-base text-white"
                  style={pathname.endsWith("/profile") ? { background: 'linear-gradient(85.56deg, #D900FF 2.74%, #9500FF 91.78%)' } : { background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.3)' }}
                >
                  Profil
                </Button>
                <Button
                  variant={
                    pathname.endsWith("/workflows") ? "default" : "outline"
                  }
                  onClick={() => router.push("/dashboard-profile/workflows")}
                  className="text-sm sm:text-base text-white"
                  style={pathname.endsWith("/workflows") ? { background: 'linear-gradient(85.56deg, #D900FF 2.74%, #9500FF 91.78%)' } : { background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.3)' }}
                >
                  Workflow Saya
                </Button>
              </div>
            </CardHeader>
          </Card>
        </div>
        {/* Main content slot */}
        <div className="lg:col-span-3 order-1 lg:order-2 space-y-4 sm:space-y-8">{children}</div>
      </div>
    </div>
  );
}
