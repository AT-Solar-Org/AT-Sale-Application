import {
  SkeletonStats,
  SkeletonChart,
  SkeletonCustomerCard,
  Skeleton,
} from "@/app/_components/Skeleton";

export default function DashboardLoading() {
  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
      </div>

      {/* Stats Cards */}
      <SkeletonStats />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <SkeletonChart className="h-80" />
        </div>

        {/* Recent Customers */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-slate-100 rounded-lg">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Grid */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-10 w-10 rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCustomerCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
