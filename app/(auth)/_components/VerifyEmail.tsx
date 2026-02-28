"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LuMail, LuCircleCheckBig, LuLoader } from "react-icons/lu";

function getInitialEmail(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("pendingEmail") || "";
}

export default function VerifyEmail() {
  const router = useRouter();
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [email] = useState(getInitialEmail);

  useEffect(() => {
    if (!email) {
      router.replace("/auth");
    }
  }, [email, router]);

  async function handleVerify() {
    setVerifying(true);
    
    // Simulate email verification (3 seconds wait)
    await new Promise((res) => setTimeout(res, 3000));
    
    setVerified(true);
    localStorage.setItem("emailVerified", "true");
    
    // Wait a moment then redirect to pending approval
    await new Promise((res) => setTimeout(res, 1500));
    router.push("/pending");
  }

  if (verified) {
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

          <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-6">
            <LuCircleCheckBig className="w-10 h-10 text-green-600" />
          </div>

          <h2 className="font-semibold text-2xl text-[#0F172A] mb-3">
            Email Verified!
          </h2>

          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            Your email has been successfully verified. Redirecting to approval page...
          </p>

          <div className="flex items-center gap-2 text-slate-400">
            <LuLoader className="w-4 h-4 animate-spin" />
            <span className="text-sm">Redirecting...</span>
          </div>
        </div>
      </div>
    );
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
          <LuMail className="w-9 h-9 text-[#EA580C]" />
        </div>

        <h2 className="font-semibold text-2xl text-[#0F172A] mb-3">
          Verify Your Email
        </h2>

        <p className="text-sm text-slate-500 leading-relaxed mb-2">
          We&apos;ve sent a verification link to your email address. Please check your inbox and verify your email to continue.
        </p>

        {email && (
          <div className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 mt-3 mb-5">
            <LuMail className="w-4 h-4 text-[#EA580C] shrink-0" />
            <span className="text-xs text-slate-600 truncate">{email}</span>
          </div>
        )}

        <p className="text-xs text-slate-400 leading-relaxed mb-8">
          Didn&apos;t receive the email? Check your spam folder or click the button below to simulate verification.
        </p>

        <div className="w-full border-t border-slate-100 mb-6" />

        <button
          onClick={handleVerify}
          disabled={verifying}
          className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#EA580C] text-white text-xs font-bold py-3 px-6 tracking-wider uppercase transition-transform active:scale-95 cursor-pointer border-none hover:bg-[#c2410c] disabled:opacity-60 disabled:cursor-not-allowed mb-3"
        >
          {verifying ? (
            <>
              <LuLoader className="w-4 h-4 animate-spin" />
              Verifying...
            </>
          ) : (
            <>
              <LuCircleCheckBig className="w-4 h-4" />
              Verify Email (Simulate)
            </>
          )}
        </button>

        <p className="text-xs text-slate-400">
          Wrong email?{" "}
          <a href="/auth" className="text-[#EA580C] hover:text-[#c2410c] underline transition-colors">
            Go back
          </a>
        </p>
      </div>
    </div>
  );
}
