"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "lib/supabase";
import Image from "next/image";
import { LuClock, LuMailCheck } from "react-icons/lu";

export default function PendingApproval() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function checkStatus() {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData?.user) {
        router.replace("/auth");
        return;
      }

      const user = userData.user;
      setEmail(user.email ?? "");

      const { data, error } = await supabase
        .from("users")
        .select("is_approved")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        console.error(error);
        return;
      }

      if (data.is_approved) {
        router.push("/dashboard");
      }
    }

    checkStatus();

    const interval = setInterval(checkStatus, 5000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="bg-[#0F172A] flex justify-center items-center flex-col font-sans min-h-screen p-6">
      <div className="bg-white rounded-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.25),0_12px_14px_rgba(0,0,0,0.22)] w-full max-w-md p-10 flex flex-col items-center text-center">
        
        <Image
          src="/images/at_solar_logo.webp"
          alt="App Logo"
          className="w-16 h-auto mb-6"
          width={64}
          height={64}
        />

        <div className="w-20 h-20 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center mb-6">
          <LuClock className="w-9 h-9 text-[#EA580C] animate-pulse" />
        </div>

        <h2 className="font-semibold text-2xl text-[#0F172A] mb-3">
          Awaiting Approval
        </h2>

        <p className="text-sm text-slate-500 leading-relaxed mb-2">
          Your account has been submitted and is currently under review by our admin.
        </p>

        {email && (
          <div className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 mt-3 mb-5">
            <LuMailCheck className="w-4 h-4 text-[#EA580C]" />
            <span className="text-xs text-slate-600 truncate">{email}</span>
          </div>
        )}

        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          Please wait while our admin reviews your account.
        </p>

        <div className="w-full bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 bg-[#EA580C] rounded-full animate-ping absolute" />
              <div className="w-3 h-3 bg-[#EA580C] rounded-full" />
            </div>
            <span className="text-sm text-slate-600">
              Checking approval status...
            </span>
          </div>
        </div>

        <div className="w-full border-t border-slate-100 mt-6 mb-4" />

        <button
          onClick={() => router.push("/auth")}
          className="text-xs text-[#EA580C] hover:text-[#c2410c] underline"
        >
          Go back to Sign In
        </button>

      </div>
    </div>
  );
}