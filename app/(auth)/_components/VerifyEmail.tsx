"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { LuMailCheck } from "react-icons/lu";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") ?? "";

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
          <LuMailCheck className="w-9 h-9 text-[#EA580C]" />
        </div>

        <h2 className="font-semibold text-2xl text-[#0F172A] mb-3">
          Check your email
        </h2>

        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          We sent a verification link to:
        </p>

        {email && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 mb-5">
            <span className="text-sm font-medium text-slate-700">{email}</span>
          </div>
        )}

        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          Click the link in your email to verify your account. Once verified, your profile will be submitted for admin approval.
        </p>

        <div className="w-full border-t border-slate-100 mt-2 mb-4" />

        <button
          onClick={() => router.push("/auth")}
          className="text-xs text-[#EA580C] hover:text-[#c2410c] underline"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
}