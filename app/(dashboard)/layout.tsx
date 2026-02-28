"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import MobileHeader from "./_components/MobileHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      router.replace("/auth");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col md:flex-row">
      <Sidebar />
      <MobileHeader />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
