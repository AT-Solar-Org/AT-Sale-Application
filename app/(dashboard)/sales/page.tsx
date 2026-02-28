"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LuUsers,
  LuClipboardCheck,
  LuCalendar,
  LuTrendingUp,
  LuPlus,
  LuFileText,
  LuMapPin,
  LuClock,
  LuChevronRight,
  LuTarget,
  LuZap,
  LuPhone,
} from "react-icons/lu";

// Mock Data - Sales person's customers
const myCustomers = [
  {
    id: 1,
    name: "Phawat Srivichai (Film)",
    company: "Film Studio Co., Ltd.",
    location: "Bang Khun Thian, Bangkok",
    status: "survey_pending",
    statusLabel: "Survey Pending",
    phone: "081-234-5678",
    systemSize: "20.9 kWp",
    lastContact: "2 days ago",
  },
  {
    id: 2,
    name: "Somchai Prasert",
    company: "Green Factory Co.",
    location: "Lat Krabang, Bangkok",
    status: "quotation_sent",
    statusLabel: "Quotation Sent",
    phone: "082-345-6789",
    systemSize: "50.0 kWp",
    lastContact: "1 day ago",
  },
  {
    id: 3,
    name: "Wipaporn Kitwattana",
    company: "ABC Manufacturing",
    location: "Samut Prakan",
    status: "approved",
    statusLabel: "Approved",
    phone: "083-456-7890",
    systemSize: "100.0 kWp",
    lastContact: "3 hours ago",
  },
  {
    id: 4,
    name: "Nawin Jantawong",
    company: "Thai Organic Farm",
    location: "Pathum Thani",
    status: "new_lead",
    statusLabel: "New Lead",
    phone: "084-567-8901",
    systemSize: "TBD",
    lastContact: "Just now",
  },
];

const upcomingTasks = [
  { id: 1, task: "Survey at Film Studio Co.", date: "30 Jan 2026", time: "09:00", type: "survey" },
  { id: 2, task: "Follow up with Green Factory", date: "30 Jan 2026", time: "14:00", type: "call" },
  { id: 3, task: "Site visit - ABC Manufacturing", date: "31 Jan 2026", time: "10:00", type: "visit" },
  { id: 4, task: "Quotation review with customer", date: "01 Feb 2026", time: "15:00", type: "meeting" },
];

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  new_lead: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  survey_pending: { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" },
  quotation_sent: { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  approved: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
  installation: { bg: "bg-slate-100", text: "text-slate-700", dot: "bg-slate-500" },
};

export default function SalesLandingPage() {
  const router = useRouter();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  });

  // Stats
  const stats = {
    totalCustomers: myCustomers.length,
    pendingSurveys: myCustomers.filter((c) => c.status === "survey_pending").length,
    quotationsSent: myCustomers.filter((c) => c.status === "quotation_sent").length,
    monthlyTarget: 5,
    closedThisMonth: 2,
  };

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">{greeting}, Phawat!</h1>
          <p className="text-[#64748B] text-sm mt-1">Here&apos;s your sales overview for today</p>
        </div>
        <button
          onClick={() => router.push("/customers/new")}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg"
        >
          <LuPlus size={18} />
          Add Customer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">My Customers</p>
              <p className="text-3xl font-bold text-[#1E293B] mt-1">{stats.totalCustomers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <LuUsers size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Pending Surveys</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pendingSurveys}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <LuClipboardCheck size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Quotations Sent</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{stats.quotationsSent}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <LuFileText size={24} className="text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[#64748B]">Monthly Target</p>
              <p className="text-3xl font-bold text-[#EA580C] mt-1">
                {stats.closedThisMonth}/{stats.monthlyTarget}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <LuTarget size={24} className="text-[#EA580C]" />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#EA580C] rounded-full transition-all"
                style={{ width: `${(stats.closedThisMonth / stats.monthlyTarget) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Customers */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h2 className="text-lg font-bold text-[#1E293B]">My Customers</h2>
            <button
              onClick={() => router.push("/customers")}
              className="text-sm text-[#EA580C] font-medium hover:underline flex items-center gap-1"
            >
              View All
              <LuChevronRight size={16} />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {myCustomers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => router.push(`/customers/${customer.id}`)}
                className="p-4 hover:bg-[#F8FAFC] cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-medium text-[#1E293B]">{customer.name}</p>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[customer.status].bg} ${statusConfig[customer.status].text}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[customer.status].dot}`} />
                        {customer.statusLabel}
                      </span>
                    </div>
                    <p className="text-sm text-[#64748B]">{customer.company}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-[#64748B]">
                      <span className="flex items-center gap-1">
                        <LuMapPin size={12} />
                        {customer.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <LuZap size={12} />
                        {customer.systemSize}
                      </span>
                      <span className="flex items-center gap-1">
                        <LuClock size={12} />
                        {customer.lastContact}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `tel:${customer.phone}`;
                    }}
                    className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <LuPhone size={18} className="text-green-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h2 className="text-lg font-bold text-[#1E293B]">Upcoming Tasks</h2>
            <button className="text-sm text-[#EA580C] font-medium hover:underline flex items-center gap-1">
              View All
              <LuChevronRight size={16} />
            </button>
          </div>
          <div className="p-4 space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-lg border border-slate-100"
              >
                <div className="w-10 h-10 bg-[#EA580C]/10 rounded-lg flex items-center justify-center shrink-0">
                  <LuCalendar size={18} className="text-[#EA580C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1E293B] truncate">{task.task}</p>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    {task.date} at {task.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-slate-100">
            <p className="text-xs font-bold text-[#64748B] uppercase mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => router.push("/customers/new")}
                className="flex items-center gap-2 px-3 py-2.5 bg-[#F8FAFC] hover:bg-slate-100 rounded-lg text-sm font-medium text-[#1E293B] transition-colors"
              >
                <LuPlus size={16} className="text-[#EA580C]" />
                New Customer
              </button>
              <button
                onClick={() => router.push("/customers")}
                className="flex items-center gap-2 px-3 py-2.5 bg-[#F8FAFC] hover:bg-slate-100 rounded-lg text-sm font-medium text-[#1E293B] transition-colors"
              >
                <LuUsers size={16} className="text-[#EA580C]" />
                All Customers
              </button>
              <button className="flex items-center gap-2 px-3 py-2.5 bg-[#F8FAFC] hover:bg-slate-100 rounded-lg text-sm font-medium text-[#1E293B] transition-colors col-span-2">
                <LuTrendingUp size={16} className="text-[#EA580C]" />
                View My Performance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
