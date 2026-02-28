import { Skeleton, SkeletonTableRow } from "@/app/_components/Skeleton";

export default function UsersLoading() {
  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-11 w-28 rounded-lg" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-11 flex-1 rounded-lg" />
          <Skeleton className="h-11 w-32 rounded-lg" />
          <Skeleton className="h-11 w-32 rounded-lg" />
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonTableRow key={i} />
        ))}
      </div>
    </div>
  );
}
