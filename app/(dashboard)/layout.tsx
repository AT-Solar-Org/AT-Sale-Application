"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import MobileHeader from "./_components/MobileHeader";
import MobileDrawer from "./_components/MobileDrawer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.replace("/auth");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col lg:flex-row">
      <Sidebar />
      <MobileHeader onMenuClick={() => setIsMenuOpen(true)} />
      <MobileDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
