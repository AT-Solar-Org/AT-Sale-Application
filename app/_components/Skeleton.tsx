"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-200",
        className
      )}
      style={style}
    />
  );
}

// Pre-built skeleton components for common UI patterns
export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div className={cn("bg-white rounded-xl border border-slate-200 p-5 shadow-sm", className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-12 w-12 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonTableRow() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-slate-100">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-50" />
        <Skeleton className="h-3 w-38" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
  );
}

export function SkeletonAvatar({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-10 w-10 rounded-full", className)} />;
}

export function SkeletonButton({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-10 w-24 rounded-lg", className)} />;
}

export function SkeletonText({ className, lines = 3 }: SkeletonProps & { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full",
            className
          )}
        />
      ))}
    </div>
  );
}

export function SkeletonCustomerCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-3 w-40" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonChart({ className }: SkeletonProps) {
  const barHeights = [45, 70, 55, 85, 40, 65, 75];
  return (
    <div className={cn("bg-white rounded-xl border border-slate-200 p-5 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <div className="flex items-end gap-2 h-48">
        {barHeights.map((height, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-t-md"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function SkeletonCalendar() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-8 rounded" />
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <Skeleton key={i} className="h-12 rounded" />
        ))}
      </div>
    </div>
  );
}
