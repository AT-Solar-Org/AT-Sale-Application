import { Skeleton } from "@/app/_components/Skeleton";

export default function CalculationPreviewLoading() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <div className="space-y-1">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>

      {/* Preview Document */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Document Header */}
        <div className="p-8 border-b border-slate-200 bg-slate-50">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-16 w-16 rounded-lg" />
          </div>
        </div>

        {/* Document Body */}
        <div className="p-8 space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 my-6" />

          {/* Line Items */}
          <div>
            <Skeleton className="h-5 w-32 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-28" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
