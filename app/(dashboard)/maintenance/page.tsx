"use client";

import { useState } from "react";
import {
  LuSearch,
  LuPlus,
  LuFilter,
  LuCalendar,
  LuMapPin,
  LuUser,
  LuWrench,
  LuClock,
  LuCircleCheck,
  LuTriangleAlert,
  LuPhone,
  LuChevronRight,
  LuChevronLeft,
  LuList,
  LuLayoutGrid,
} from "react-icons/lu";

const maintenanceJobs = [
  {
    id: 1,
    customer: "Film Studio Co., Ltd.",
    address: "123/45 Bang Khun Thian, Bangkok",
    systemSize: "20.9 kWp",
    type: "Scheduled",
    status: "scheduled",
    date: "2026-03-10",
    time: "09:00 - 12:00",
    technician: "Kittisak Rattana",
    phone: "084-567-8901",
    notes: "Annual inspection and cleaning",
  },
  {
    id: 2,
    customer: "Green Factory Co.",
    address: "88/9 Lat Krabang, Bangkok",
    systemSize: "50.0 kWp",
    type: "Emergency",
    status: "in_progress",
    date: "2026-03-01",
    time: "14:00 - 17:00",
    technician: "Kittisak Rattana",
    phone: "084-567-8901",
    notes: "Inverter showing error code F02",
  },
  {
    id: 3,
    customer: "ABC Manufacturing",
    address: "456 Samut Prakan Industrial Estate",
    systemSize: "100.0 kWp",
    type: "Scheduled",
    status: "completed",
    date: "2026-02-25",
    time: "08:00 - 16:00",
    technician: "Kittisak Rattana",
    phone: "084-567-8901",
    notes: "Complete system check-up",
  },
  {
    id: 4,
    customer: "Thai Organic Farm",
    address: "99 Pathum Thani",
    systemSize: "15.0 kWp",
    type: "Warranty",
    status: "scheduled",
    date: "2026-03-05",
    time: "10:00 - 14:00",
    technician: "Somchai Jaidee",
    phone: "081-234-5678",
    notes: "Panel replacement under warranty",
  },
  {
    id: 5,
    customer: "Home Sweet Home",
    address: "234 Nonthaburi",
    systemSize: "8.5 kWp",
    type: "Scheduled",
    status: "pending",
    date: "2026-03-15",
    time: "09:00 - 11:00",
    technician: null,
    phone: null,
    notes: "6-month checkup - needs technician assignment",
  },
  {
    id: 6,
    customer: "Solar Park Hotel",
    address: "567 Pattaya",
    systemSize: "75.0 kWp",
    type: "Scheduled",
    status: "scheduled",
    date: "2026-03-20",
    time: "08:00 - 17:00",
    technician: "Somchai Jaidee",
    phone: "081-234-5678",
    notes: "Quarterly maintenance",
  },
  {
    id: 7,
    customer: "Green Mall",
    address: "123 Bangna",
    systemSize: "200.0 kWp",
    type: "Emergency",
    status: "scheduled",
    date: "2026-03-03",
    time: "07:00 - 12:00",
    technician: "Kittisak Rattana",
    phone: "084-567-8901",
    notes: "System performance drop",
  },
];

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  scheduled: { bg: "bg-blue-100", text: "text-blue-700", label: "Scheduled" },
  in_progress: { bg: "bg-yellow-100", text: "text-yellow-700", label: "In Progress" },
  completed: { bg: "bg-green-100", text: "text-green-700", label: "Completed" },
  pending: { bg: "bg-slate-100", text: "text-slate-600", label: "Pending" },
};

const typeConfig: Record<string, { bg: string; text: string }> = {
  Scheduled: { bg: "bg-blue-50", text: "text-blue-600" },
  Emergency: { bg: "bg-red-50", text: "text-red-600" },
  Warranty: { bg: "bg-purple-50", text: "text-purple-600" },
};

export default function MaintenancePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredJobs = maintenanceJobs.filter((job) => {
    const matchesSearch =
      job.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    const matchesType = typeFilter === "All" || job.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Calendar helpers
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getJobsForDate = (dateKey: string) => {
    return filteredJobs.filter((job) => job.date === dateKey);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentDate(new Date(2026, 2, 1));
    setSelectedDate(formatDateKey(2026, 2, 1));
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Get jobs for selected date
  const selectedJobs = selectedDate ? getJobsForDate(selectedDate) : [];

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Maintenance Schedule</h1>
          <p className="text-[#64748B] text-sm mt-1">Manage service visits and maintenance jobs</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode("calendar")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "calendar"
                  ? "bg-[#EA580C] text-white"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              <LuLayoutGrid size={16} />
              Calendar
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-[#EA580C] text-white"
                  : "text-[#64748B] hover:text-[#1E293B]"
              }`}
            >
              <LuList size={16} />
              List
            </button>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg">
            <LuPlus size={18} />
            Schedule Job
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <LuCalendar size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1E293B]">
                {maintenanceJobs.filter((j) => j.status === "scheduled").length}
              </p>
              <p className="text-sm text-[#64748B]">Scheduled</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <LuWrench size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1E293B]">
                {maintenanceJobs.filter((j) => j.status === "in_progress").length}
              </p>
              <p className="text-sm text-[#64748B]">In Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <LuCircleCheck size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1E293B]">
                {maintenanceJobs.filter((j) => j.status === "completed").length}
              </p>
              <p className="text-sm text-[#64748B]">Completed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <LuTriangleAlert size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1E293B]">
                {maintenanceJobs.filter((j) => j.type === "Emergency").length}
              </p>
              <p className="text-sm text-[#64748B]">Emergency</p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {viewMode === "calendar" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-4 lg:p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <LuChevronLeft size={20} className="text-[#64748B]" />
                </button>
                <h2 className="text-xl font-bold text-[#1E293B]">
                  {monthNames[month]} {year}
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <LuChevronRight size={20} className="text-[#64748B]" />
                </button>
              </div>
              <button
                onClick={goToToday}
                className="px-4 py-2 text-sm font-medium text-[#EA580C] hover:bg-orange-50 rounded-lg transition-colors"
              >
                Today
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-bold text-[#64748B] uppercase py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="aspect-square" />;
                }
                const dateKey = formatDateKey(year, month, day);
                const dayJobs = getJobsForDate(dateKey);
                const isSelected = selectedDate === dateKey;
                const isToday = dateKey === "2026-03-01";

                return (
                  <div
                    key={dateKey}
                    onClick={() => setSelectedDate(dateKey)}
                    className={`aspect-square p-1 rounded-lg cursor-pointer transition-all border-2 ${
                      isSelected
                        ? "border-[#EA580C] bg-orange-50"
                        : isToday
                        ? "border-[#EA580C]/30 bg-orange-50/50"
                        : "border-transparent hover:bg-slate-50"
                    }`}
                  >
                    <div className="h-full flex flex-col">
                      <span
                        className={`text-sm font-medium ${
                          isSelected
                            ? "text-[#EA580C]"
                            : isToday
                            ? "text-[#EA580C]"
                            : "text-[#1E293B]"
                        }`}
                      >
                        {day}
                      </span>
                      {dayJobs.length > 0 && (
                        <div className="flex-1 flex flex-col gap-0.5 mt-1 overflow-hidden">
                          {dayJobs.slice(0, 2).map((job) => (
                            <div
                              key={job.id}
                              className={`text-[10px] px-1 py-0.5 rounded truncate ${
                                job.type === "Emergency"
                                  ? "bg-red-100 text-red-700"
                                  : job.type === "Warranty"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {job.customer.split(" ")[0]}
                            </div>
                          ))}
                          {dayJobs.length > 2 && (
                            <span className="text-[10px] text-[#64748B]">
                              +{dayJobs.length - 2} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Date Details */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 lg:p-6">
            <h3 className="text-lg font-bold text-[#1E293B] mb-4">
              {selectedDate
                ? new Date(selectedDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                : "Select a date"}
            </h3>

            {selectedDate && selectedJobs.length > 0 ? (
              <div className="space-y-4">
                {selectedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-100"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-full min-h-16 rounded-full ${
                          job.type === "Emergency"
                            ? "bg-red-500"
                            : job.type === "Warranty"
                            ? "bg-purple-500"
                            : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeConfig[job.type].bg} ${typeConfig[job.type].text}`}
                          >
                            {job.type}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[job.status].bg} ${statusConfig[job.status].text}`}
                          >
                            {statusConfig[job.status].label}
                          </span>
                        </div>
                        <h4 className="font-bold text-[#1E293B] mb-1">{job.customer}</h4>
                        <div className="space-y-1 text-sm text-[#64748B]">
                          <p className="flex items-center gap-1">
                            <LuClock size={14} />
                            {job.time}
                          </p>
                          <p className="flex items-center gap-1">
                            <LuMapPin size={14} />
                            {job.address}
                          </p>
                          {job.technician && (
                            <p className="flex items-center gap-1">
                              <LuUser size={14} />
                              {job.technician}
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-[#64748B] mt-2 line-clamp-2">{job.notes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedDate ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <LuCalendar size={24} className="text-slate-400" />
                </div>
                <p className="text-[#64748B]">No jobs scheduled</p>
                <button className="mt-3 text-sm font-medium text-[#EA580C] hover:underline">
                  + Schedule a job
                </button>
              </div>
            ) : (
              <div className="text-center py-8 text-[#64748B]">
                Click on a date to view scheduled jobs
              </div>
            )}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <>
          {/* Filters */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
                <input
                  type="text"
                  placeholder="Search by customer or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"
                />
              </div>
              <div className="flex items-center gap-2">
                <LuFilter size={16} className="text-[#64748B]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] bg-white"
                >
                  <option value="All">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] bg-white"
              >
                <option value="All">All Types</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Emergency">Emergency</option>
                <option value="Warranty">Warranty</option>
              </select>
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => {
              const [yearStr, monthStr, dayStr] = job.date.split("-");
              const dateObj = new Date(parseInt(yearStr), parseInt(monthStr) - 1, parseInt(dayStr));
              const monthLabel = monthNames[dateObj.getMonth()].slice(0, 3);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Main Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center min-w-15 text-center">
                          <p className="text-xs text-[#64748B] uppercase">{monthLabel}</p>
                          <p className="text-2xl font-bold text-[#1E293B]">{dayStr}</p>
                          <p className="text-xs text-[#64748B]">{job.time.split(" - ")[0]}</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-bold text-[#1E293B]">{job.customer}</h3>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeConfig[job.type].bg} ${typeConfig[job.type].text}`}
                            >
                              {job.type}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[job.status].bg} ${statusConfig[job.status].text}`}
                            >
                              {statusConfig[job.status].label}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                            <span className="flex items-center gap-1">
                              <LuMapPin size={14} />
                              {job.address}
                            </span>
                            <span className="flex items-center gap-1">
                              <LuClock size={14} />
                              {job.time}
                            </span>
                          </div>
                          <p className="text-sm text-[#64748B] mt-2">
                            <strong>System:</strong> {job.systemSize} • <strong>Notes:</strong> {job.notes}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Technician & Actions */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:min-w-70">
                      {job.technician ? (
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-linear-to-br from-[#EA580C] to-[#fb923c] rounded-full flex items-center justify-center text-white font-bold">
                            {job.technician.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-[#1E293B] text-sm">{job.technician}</p>
                            <p className="text-xs text-[#64748B] flex items-center gap-1">
                              <LuPhone size={12} />
                              {job.phone}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                            <LuUser size={18} className="text-slate-400" />
                          </div>
                          <div>
                            <p className="text-sm text-[#64748B]">No technician assigned</p>
                            <button className="text-xs text-[#EA580C] font-medium hover:underline">
                              Assign now
                            </button>
                          </div>
                        </div>
                      )}
                      <button className="flex items-center gap-1 text-sm font-medium text-[#EA580C] hover:text-[#c2410c]">
                        View Details
                        <LuChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LuWrench size={32} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-[#1E293B] mb-2">No maintenance jobs found</h3>
              <p className="text-[#64748B] text-sm">Try adjusting your filters or schedule a new job.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
