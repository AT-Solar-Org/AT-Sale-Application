"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuClock, LuMailCheck, LuLoader, LuCircleCheckBig } from "react-icons/lu";

function getInitialEmail(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("pendingEmail") || "";
}

export default function PendingApproval() {
  const router = useRouter();
  const [status, setStatus] = useState<"waiting" | "approved">("waiting");
  const [email] = useState(getInitialEmail);

  useEffect(() => {
    const accountStatus = localStorage.getItem("accountStatus");
    const emailVerified = localStorage.getItem("emailVerified");
    
    // Redirect if not pending or email not verified
    if (accountStatus !== "pending" || !emailVerified) {
      router.replace("/auth");
      return;
    }

    // Prototype: Simulate admin approval after 3 seconds
    const approvalTimer = setTimeout(() => {
      setStatus("approved");
      
      // After 2 seconds of "processing", redirect to dashboard
      setTimeout(() => {
        localStorage.removeItem("accountStatus");
        localStorage.removeItem("pendingEmail");
        localStorage.removeItem("emailVerified");
        localStorage.setItem("isAuthenticated", "true");
        router.push("/dashboard");
      }, 2000);
    }, 3000);

    // In a real app, you would set up WebSocket or FCM listener here
    // const socket = new WebSocket('wss://your-api.com/approval-status');
    // socket.onmessage = (event) => {
    //   if (event.data === 'approved') setStatus('approved');
    // };

    return () => {
      clearTimeout(approvalTimer);
    };
  }, [router]);

  if (status === "approved") {
    return (
      <div className="bg-[#0F172A] flex justify-center items-center flex-col font-sans min-h-screen p-6">
        <div className="bg-white rounded-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.25),0_12px_14px_rgba(0,0,0,0.22)] w-full max-w-md p-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-6">
            <LuCircleCheckBig className="w-10 h-10 text-green-600" />
          </div>

          <h2 className="font-semibold text-2xl text-[#0F172A] mb-3">
            Account Approved!
          </h2>

          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            Welcome to AT Energy! Your account has been approved.
          </p>

          {/* Processing Indicator */}
          <div className="w-full bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center gap-3">
              <LuLoader className="w-5 h-5 text-green-600 animate-spin" />
              <span className="text-sm text-slate-600">Admin approved! System is processing, please wait...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] flex justify-center items-center flex-col font-sans min-h-screen p-6">
      <div className="bg-white rounded-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.25),0_12px_14px_rgba(0,0,0,0.22)] w-full max-w-md p-10 flex flex-col items-center text-center">
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

        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          Please wait while our admin team reviews your account. This process won&apos;t take long.
        </p>

        {/* Waiting Indicator */}
        <div className="w-full bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 bg-[#EA580C] rounded-full animate-ping absolute" />
              <div className="w-3 h-3 bg-[#EA580C] rounded-full" />
            </div>
            <span className="text-sm text-slate-600">Listening for approval...</span>
          </div>
        </div>

        <div className="w-full border-t border-slate-100 mt-6 mb-4" />

        <p className="text-xs text-slate-400">
          Having issues?{" "}
          <a href="/auth" className="text-[#EA580C] hover:text-[#c2410c] underline transition-colors">
            Go back to Sign In
          </a>
        </p>
      </div>
    </div>
  );
}