"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { LuEye, LuEyeClosed, LuCircleCheck } from "react-icons/lu";

interface PasswordRule {
  label: string;
  test: (v: string) => boolean;
}

const PASSWORD_RULES: PasswordRule[] = [
  { label: "At least 8 characters",                        test: (v) => v.length >= 8 },
  { label: "At least one uppercase letter",                 test: (v) => /[A-Z]/.test(v) },
  { label: "At least one lowercase letter",                 test: (v) => /[a-z]/.test(v) },
  { label: "At least one number",                           test: (v) => /[0-9]/.test(v) },
  { label: "At least one special character (!@#$%^&*...)", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  return (
    <ul className="w-full text-left mt-1 mb-2 space-y-1">
      {PASSWORD_RULES.map((rule) => {
        const passed = rule.test(password);
        return (
          <li key={rule.label} className={`text-xs flex items-center gap-1.5 ${passed ? "text-green-600" : "text-red-500"}`}>
            <span className="shrink-0">{passed ? "✓" : "✗"}</span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}

type Step = "form" | "success";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") ||
    (typeof window !== "undefined" ? localStorage.getItem("resetEmail") : "") || "";

  const [step, setStep] = useState<Step>("form");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});

  useEffect(() => {
    if (step !== "success") return;
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") localStorage.removeItem("resetEmail");
      router.push("/auth");
    }, 3000);
    return () => clearTimeout(timer);
  }, [step, router]);

  function validate(): boolean {
    const newErrors: typeof errors = {};
    const allRulesPassed = PASSWORD_RULES.every((r) => r.test(password));
    if (!allRulesPassed) newErrors.password = "Password does not meet all requirements.";
    if (password !== confirm) newErrors.confirm = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // TODO: call your API to update the password
    console.log("Reset password for:", email);
    setStep("success");
  }

  const inputBase = "bg-slate-100 border p-3 pr-12 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C]";

  if (step === "success") {
    return (
      <div className="bg-[#0F172A] flex justify-center items-center flex-col font-sans min-h-screen p-6">
        <div className="bg-white rounded-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.25),0_12px_14px_rgba(0,0,0,0.22)] w-full max-w-md p-10 flex flex-col items-center text-center">
          <Image src="/images/at_solar_logo.webp" alt="App Logo" className="w-20 h-auto mb-6" width={80} height={80} />
          <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-6">
            <LuCircleCheck className="w-9 h-9 text-green-600" />
          </div>
          <h2 className="font-semibold text-2xl text-[#0F172A] mb-3">Password Reset!</h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Your password has been updated successfully. Redirecting you to Sign In...
          </p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6 overflow-hidden">
            <div className="bg-[#EA580C] h-1.5 rounded-full" style={{ animation: "shrink 3s linear forwards" }} />
          </div>
          <style>{`@keyframes shrink { from { width: 100%; } to { width: 0%; } }`}</style>
          <a href="/auth" className="text-sm text-[#EA580C] underline hover:text-[#c2410c] transition-colors">
            Go to Sign In now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] flex justify-center items-center flex-col font-sans min-h-screen p-6">
      <div className="bg-white rounded-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.25),0_12px_14px_rgba(0,0,0,0.22)] w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col px-8 md:px-12 py-10 text-center">
          <Image src="/images/at_solar_logo.webp" alt="App Logo" className="w-20 md:w-24 h-auto mb-5" width={80} height={80} />
          <h1 className="font-semibold text-3xl md:text-4xl text-[#0F172A] mb-2">Reset Password</h1>

          {email && (
            <p className="text-xs text-slate-400 mb-5">
              Resetting password for{" "}
              <span className="font-medium text-slate-600">{email}</span>
            </p>
          )}

          {/* New Password */}
          <div className="relative w-full my-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined, confirm: undefined })); }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              required
              className={`${inputBase} ${errors.password ? "border-red-400" : "border-slate-300"}`}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1 hover:opacity-70">
              {showPassword ? <LuEyeClosed className="w-5 h-5 text-slate-600" /> : <LuEye className="w-5 h-5 text-slate-600" />}
            </button>
          </div>

          {/* Live rules — show while focused OR after a failed submit */}
          {(passwordFocused || errors.password) && password && (
            <PasswordStrength password={password} />
          )}
          {errors.password && !passwordFocused && (
            <p className="text-xs text-red-500 w-full text-left mb-1">{errors.password}</p>
          )}

          {/* Confirm Password */}
          <div className="relative w-full my-2">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setErrors((p) => ({ ...p, confirm: undefined })); }}
              required
              className={`${inputBase} ${errors.confirm ? "border-red-400" : "border-slate-300"}`}
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-1 hover:opacity-70">
              {showConfirm ? <LuEyeClosed className="w-5 h-5 text-slate-600" /> : <LuEye className="w-5 h-5 text-slate-600" />}
            </button>
          </div>
          {errors.confirm && (
            <p className="text-xs text-red-500 w-full text-left mb-1">{errors.confirm}</p>
          )}

          <button
            className="rounded-lg bg-[#EA580C] text-white text-xs font-bold py-3 w-full tracking-wider uppercase transition-transform active:scale-95 mt-4 cursor-pointer border-none hover:bg-[#c2410c]"
            type="submit"
          >
            Reset Password
          </button>

          <a href="/auth" className="block mt-5 text-center text-sm text-slate-500 no-underline hover:text-[#EA580C] transition-colors">
            Back to Sign In
          </a>
        </form>
      </div>
    </div>
  );
}