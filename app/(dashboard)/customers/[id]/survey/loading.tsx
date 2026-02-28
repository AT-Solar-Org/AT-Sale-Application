import { Skeleton } from "@/app/_components/Skeleton";

export default function SurveyLoading() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="space-y-1">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Form Sections */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
          <Skeleton className="h-6 w-40 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, j) => (
              <div key={j} className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Skeleton className="h-11 w-28 rounded-lg" />
        <Skeleton className="h-11 w-36 rounded-lg" />
      </div>
    </div>
  );
}
