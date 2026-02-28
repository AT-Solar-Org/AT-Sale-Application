"use client";

import { LuLoaderCircle } from "react-icons/lu";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export function LoadingSpinner({
  size = "md",
  text = "Loading...",
  fullScreen = false,
  className,
}: LoadingSpinnerProps) {
  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative">
        <div className={cn(
          "rounded-full border-4 border-slate-200",
          sizeMap[size]
        )} />
        <LuLoaderCircle 
          className={cn(
            "absolute inset-0 animate-spin text-[#EA580C]",
            sizeMap[size]
          )} 
        />
      </div>
      {text && (
        <p className="text-[#64748B] text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50/80 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }

  return content;
}

// Beautiful branded loading page for route transitions
export function PageLoading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-white border-2 border-[#EA580C]/20 flex items-center justify-center shadow-lg">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#EA580C] to-[#c2410c] animate-pulse" />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-full border-4 border-transparent border-t-[#EA580C] animate-spin" />
        </div>
        
        {/* Loading Text */}
        <h2 className="text-xl font-bold text-[#1E293B] mb-2">AT Energy</h2>
        <p className="text-[#64748B] text-sm">{message}</p>
        
        {/* Progress Bar */}
        <div className="mt-6 w-48 h-1 bg-slate-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-[#EA580C] rounded-full animate-loading-progress" />
        </div>
      </div>
    </div>
  );
}

// Inline loading for components
export function InlineLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 py-4 px-6 bg-slate-50 rounded-lg border border-slate-200">
      <LuLoaderCircle className="h-5 w-5 animate-spin text-[#EA580C]" />
      <span className="text-sm text-[#64748B]">{text}</span>
    </div>
  );
}

// Button loading state
export function ButtonLoading({ className }: { className?: string }) {
  return (
    <LuLoaderCircle className={cn("h-4 w-4 animate-spin", className)} />
  );
}
