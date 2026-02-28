"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LuClock, LuMailCheck, LuRefreshCw } from "react-icons/lu";

export default function PendingApproval() {
  const router = useRouter();
  const [checking, setChecking] = useState(false);

  // Read localStorage once at init — no useEffect needed
  const status = typeof window !== "undefined" ? localStorage.getItem("accountStatus") : null;
  const email = typeof window !== "undefined" ? localStorage.getItem("pendingEmail") || "" : "";

  // Redirect if not pending — done as a render-time guard instead of an effect
  if (typeof window !== "undefined" && status !== "pending") {
    router.replace("/auth");
    return null;
  }

  async function handleCheckStatus() {
    setChecking(true);
    await new Promise((res) => setTimeout(res, 1500));

    // TODO: replace with real API call
    // const res = await fetch(`/api/check-approval?email=${email}`);
    // const { approved } = await res.json();
    const approved = false;

    if (approved) {
      localStorage.removeItem("accountStatus");
      localStorage.removeItem("pendingEmail");
      router.push("/auth");
    } else {
      setChecking(false);
    }
  }

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
          Your account has been submitted and is currently under review by our admin team.
        </p>

        {email && (
          <div className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 mt-3 mb-5">
            <LuMailCheck className="w-4 h-4 text-[#EA580C] shrink-0" />
            <span className="text-xs text-slate-600 truncate">{email}</span>
          </div>
        )}

        <p className="text-xs text-slate-400 leading-relaxed mb-8">
          You&apos;ll be notified once your account is approved. This page will remain until the admin grants you access.
        </p>

        <div className="w-full border-t border-slate-100 mb-6" />

        <button
          onClick={handleCheckStatus}
          disabled={checking}
          className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#EA580C] text-white text-xs font-bold py-3 px-6 tracking-wider uppercase transition-transform active:scale-95 cursor-pointer border-none hover:bg-[#c2410c] disabled:opacity-60 disabled:cursor-not-allowed mb-3"
        >
          <LuRefreshCw className={`w-4 h-4 ${checking ? "animate-spin" : ""}`} />
          {checking ? "Checking..." : "Check Approval Status"}
        </button>

        <p className="text-xs text-slate-400">
          Already approved?{" "}
          <a href="/auth" className="text-[#EA580C] hover:text-[#c2410c] underline transition-colors">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}