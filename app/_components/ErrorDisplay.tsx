"use client";

import { LuTriangleAlert, LuRefreshCw, LuHouse, LuChevronLeft } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ErrorDisplayProps {
  error?: Error & { digest?: string };
  reset?: () => void;
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  className?: string;
}

export function ErrorDisplay({
  error,
  reset,
  title = "Something went wrong!",
  message,
  showHomeButton = true,
  showBackButton = false,
  className,
}: ErrorDisplayProps) {
  const router = useRouter();
  const errorMessage = message || error?.message || "An unexpected error occurred. Please try again.";

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-6",
      className
    )}>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
          {/* Error Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center border-4 border-red-100">
              <LuTriangleAlert className="w-10 h-10 text-red-500" />
            </div>
          </div>

          {/* Error Content */}
          <h2 className="text-2xl font-bold text-[#1E293B] mb-3">{title}</h2>
          <p className="text-[#64748B] mb-6 leading-relaxed">{errorMessage}</p>

          {/* Error Digest (for debugging) */}
          {error?.digest && (
            <p className="text-xs text-[#94A3B8] mb-6 font-mono bg-slate-50 px-3 py-2 rounded-lg">
              Error ID: {error.digest}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {reset && (
              <button
                onClick={reset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30"
              >
                <LuRefreshCw size={18} />
                Try Again
              </button>
            )}
            
            {showBackButton && (
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-[#1E293B] rounded-xl font-bold transition-all"
              >
                <LuChevronLeft size={18} />
                Go Back
              </button>
            )}
            
            {showHomeButton && (
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-[#1E293B] rounded-xl font-bold transition-all"
              >
                <LuHouse size={18} />
                Home
              </button>
            )}
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-[#94A3B8] mt-6">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}

// Inline error for components
export function InlineError({ 
  message, 
  onRetry 
}: { 
  message: string; 
  onRetry?: () => void;
}) {
  return (
    <div className="flex items-center gap-4 p-4 bg-red-50 border border-red-200 rounded-xl">
      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
        <LuTriangleAlert className="w-5 h-5 text-red-500" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-red-700 font-medium">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-bold transition-all"
        >
          Retry
        </button>
      )}
    </div>
  );
}

// Empty state component
export function EmptyState({
  icon: Icon = LuTriangleAlert,
  title = "No data found",
  message = "There's nothing to display here yet.",
  action,
  actionLabel = "Add New",
}: {
  icon?: React.ComponentType<{ className?: string }>;
  title?: string;
  message?: string;
  action?: () => void;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-[#94A3B8]" />
      </div>
      <h3 className="text-lg font-bold text-[#1E293B] mb-2">{title}</h3>
      <p className="text-[#64748B] mb-6 max-w-sm">{message}</p>
      {action && (
        <button
          onClick={action}
          className="px-6 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-lg font-bold transition-all shadow-md"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
