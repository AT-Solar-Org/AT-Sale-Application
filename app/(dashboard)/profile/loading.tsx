import { Skeleton } from "@/app/_components/Skeleton";

export default function ProfileLoading() {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-8 w-36 mb-2" />
        <Skeleton className="h-4 w-56" />
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        {/* Banner */}
        <div className="h-24 bg-slate-100" />
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start gap-4 -mt-12">
            <Skeleton className="h-24 w-24 rounded-full border-4 border-white shrink-0" />
            <div className="flex-1 pt-12 md:pt-4 space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
            <Skeleton className="h-10 w-28 rounded-lg mt-4" />
          </div>
        </div>
      </div>

      {/* Sections */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-9 w-20 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, j) => (
              <div key={j} className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
