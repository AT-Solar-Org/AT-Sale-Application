"use client";

import { useState } from "react";
import {
  LuSearch,
  LuCircleCheck,
  LuCircleX,
  LuClock,
  LuUser,
  LuMail,
  LuPhone,
  LuBuilding,
  LuCalendar,
  LuFilter,
  LuEye,
  LuX,
} from "react-icons/lu";

interface PendingUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
}

const initialPendingUsers: PendingUser[] = [
  {
    id: 1,
    firstName: "Somchai",
    lastName: "Jaideejam",
    email: "somchai.j@example.com",
    phone: "081-234-5678",
    company: "Solar Tech Co., Ltd.",
    position: "Sales Representative",
    requestDate: "2026-02-28",
    status: "pending",
  },
  {
    id: 2,
    firstName: "Natcha",
    lastName: "Srisawat",
    email: "natcha.s@greenpower.co.th",
    phone: "089-876-5432",
    company: "Green Power Solutions",
    position: "Senior Sales",
    requestDate: "2026-02-27",
    status: "pending",
  },
  {
    id: 3,
    firstName: "Piyapong",
    lastName: "Rattana",
    email: "piyapong.r@suntech.com",
    phone: "062-345-6789",
    company: "Sun Technology",
    position: "Sales Manager",
    requestDate: "2026-02-26",
    status: "pending",
  },
  {
    id: 4,
    firstName: "Kanokwan",
    lastName: "Thongsuk",
    email: "kanokwan.t@energyplus.co.th",
    phone: "091-456-7890",
    company: "Energy Plus Co.",
    position: "Sales Executive",
    requestDate: "2026-02-25",
    status: "pending",
  },
  {
    id: 5,
    firstName: "Wichai",
    lastName: "Prasert",
    email: "wichai.p@solarworld.com",
    phone: "084-567-8901",
    company: "Solar World Thailand",
    position: "Account Executive",
    requestDate: "2026-02-24",
    status: "pending",
  },
];

export default function ApprovalsPage() {
  const [users, setUsers] = useState<PendingUser[]>(initialPendingUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<{
    type: "approve" | "reject";
    user: PendingUser;
  } | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (user: PendingUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: "approved" as const } : u))
    );
    setShowConfirmModal(null);
    setSelectedUser(null);
  };

  const handleReject = (user: PendingUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: "rejected" as const } : u))
    );
    setShowConfirmModal(null);
    setSelectedUser(null);
  };

  const pendingCount = users.filter((u) => u.status === "pending").length;
  const approvedCount = users.filter((u) => u.status === "approved").length;
  const rejectedCount = users.filter((u) => u.status === "rejected").length;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1E293B]">Account Approvals</h1>
        <p className="text-[#64748B] text-sm mt-1">
          Review and manage sales account registration requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div
          onClick={() => setStatusFilter("pending")}
          className={`bg-white rounded-xl border shadow-sm p-4 cursor-pointer transition-all ${
            statusFilter === "pending"
              ? "border-[#EA580C] ring-2 ring-[#EA580C]/20"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <LuClock size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1E293B]">{pendingCount}</p>
              <p className="text-sm text-[#64748B]">Pending</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => setStatusFilter("approved")}
          className={`bg-white rounded-xl border shadow-sm p-4 cursor-pointer transition-all ${
            statusFilter === "approved"
              ? "border-[#EA580C] ring-2 ring-[#EA580C]/20"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <LuCircleCheck size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1E293B]">{approvedCount}</p>
              <p className="text-sm text-[#64748B]">Approved</p>
            </div>
          </div>
        </div>
        <div
          onClick={() => setStatusFilter("rejected")}
          className={`bg-white rounded-xl border shadow-sm p-4 cursor-pointer transition-all ${
            statusFilter === "rejected"
              ? "border-[#EA580C] ring-2 ring-[#EA580C]/20"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <LuCircleX size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#1E293B]">{rejectedCount}</p>
              <p className="text-sm text-[#64748B]">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <LuSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"
            />
          </div>
          <div className="flex items-center gap-2">
            <LuFilter size={16} className="text-[#64748B]" />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | "pending" | "approved" | "rejected")
              }
              className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-[#64748B] uppercase">
          <div className="col-span-3">User</div>
          <div className="col-span-3">Company</div>
          <div className="col-span-2">Request Date</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Users */}
        {filteredUsers.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-colors items-center"
              >
                {/* User Info */}
                <div className="lg:col-span-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#EA580C] to-orange-400 flex items-center justify-center text-white font-bold shrink-0">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#1E293B] truncate">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-[#64748B] truncate">{user.email}</p>
                  </div>
                </div>

                {/* Company */}
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-2 text-sm text-[#1E293B]">
                    <LuBuilding size={14} className="text-[#64748B] shrink-0" />
                    <span className="truncate">{user.company}</span>
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">{user.position}</p>
                </div>

                {/* Request Date */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 text-sm text-[#64748B]">
                    <LuCalendar size={14} className="shrink-0" />
                    <span>{formatDate(user.requestDate)}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="lg:col-span-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : user.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.status === "pending" && <LuClock size={12} />}
                    {user.status === "approved" && <LuCircleCheck size={12} />}
                    {user.status === "rejected" && <LuCircleX size={12} />}
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>

                {/* Actions */}
                <div className="lg:col-span-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="p-2 text-[#64748B] hover:text-[#1E293B] hover:bg-slate-100 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <LuEye size={18} />
                  </button>
                  {user.status === "pending" && (
                    <>
                      <button
                        onClick={() => setShowConfirmModal({ type: "approve", user })}
                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                        title="Approve"
                      >
                        <LuCircleCheck size={18} />
                      </button>
                      <button
                        onClick={() => setShowConfirmModal({ type: "reject", user })}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        title="Reject"
                      >
                        <LuCircleX size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <LuUser size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-[#1E293B] mb-2">No users found</h3>
            <p className="text-[#64748B] text-sm">
              {statusFilter === "pending"
                ? "No pending approval requests at the moment."
                : "Try adjusting your search or filter."}
            </p>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1E293B]">User Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <LuX size={20} className="text-[#64748B]" />
              </button>
            </div>

            {/* User Avatar & Name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#EA580C] to-orange-400 flex items-center justify-center text-white text-xl font-bold">
                {selectedUser.firstName[0]}
                {selectedUser.lastName[0]}
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#1E293B]">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h4>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                    selectedUser.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : selectedUser.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {selectedUser.status === "pending" && <LuClock size={12} />}
                  {selectedUser.status === "approved" && <LuCircleCheck size={12} />}
                  {selectedUser.status === "rejected" && <LuCircleX size={12} />}
                  {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <LuMail size={18} className="text-[#64748B]" />
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold">Email</p>
                  <p className="text-sm text-[#1E293B]">{selectedUser.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <LuPhone size={18} className="text-[#64748B]" />
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold">Phone</p>
                  <p className="text-sm text-[#1E293B]">{selectedUser.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <LuBuilding size={18} className="text-[#64748B]" />
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold">Company & Position</p>
                  <p className="text-sm text-[#1E293B]">
                    {selectedUser.company} - {selectedUser.position}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <LuCalendar size={18} className="text-[#64748B]" />
                <div>
                  <p className="text-xs text-[#64748B] uppercase font-bold">Request Date</p>
                  <p className="text-sm text-[#1E293B]">{formatDate(selectedUser.requestDate)}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            {selectedUser.status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal({ type: "reject", user: selectedUser })}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors font-medium"
                >
                  <LuCircleX size={18} />
                  Reject
                </button>
                <button
                  onClick={() => setShowConfirmModal({ type: "approve", user: selectedUser })}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
                >
                  <LuCircleCheck size={18} />
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                showConfirmModal.type === "approve" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {showConfirmModal.type === "approve" ? (
                <LuCircleCheck size={32} className="text-green-600" />
              ) : (
                <LuCircleX size={32} className="text-red-600" />
              )}
            </div>

            <h3 className="text-lg font-bold text-[#1E293B] text-center mb-2">
              {showConfirmModal.type === "approve" ? "Approve Account?" : "Reject Account?"}
            </h3>

            <p className="text-sm text-[#64748B] text-center mb-6">
              {showConfirmModal.type === "approve"
                ? `Are you sure you want to approve ${showConfirmModal.user.firstName} ${showConfirmModal.user.lastName}'s account? They will be able to access the system.`
                : `Are you sure you want to reject ${showConfirmModal.user.firstName} ${showConfirmModal.user.lastName}'s account request?`}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(null)}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#64748B] rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  showConfirmModal.type === "approve"
                    ? handleApprove(showConfirmModal.user)
                    : handleReject(showConfirmModal.user)
                }
                className={`flex-1 px-4 py-2.5 rounded-lg transition-colors font-medium ${
                  showConfirmModal.type === "approve"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {showConfirmModal.type === "approve" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
