import { Skeleton } from "@/app/_components/Skeleton";

export default function CalculationLoading() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="space-y-1">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Calculation Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-lg">
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg">
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-10 w-24 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Equipment List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Skeleton className="h-11 w-28 rounded-lg" />
        <Skeleton className="h-11 w-36 rounded-lg" />
      </div>
    </div>
  );
}
