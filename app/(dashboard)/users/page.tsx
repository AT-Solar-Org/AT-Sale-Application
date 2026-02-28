"use client";

import { useState } from "react";
import {
  LuSearch,
  LuPlus,
  LuFilter,
  LuEllipsisVertical,
  LuMail,
  LuPhone,
  LuPencil,
  LuTrash2,
  LuShield,
  LuUser,
  LuUserCog,
  LuCircleCheck,
  LuCircleX,
  LuClock,
} from "react-icons/lu";

const users = [
  {
    id: 1,
    name: "Somchai Jaidee",
    email: "somchai@atenergy.co.th",
    phone: "081-234-5678",
    role: "Admin",
    status: "active",
    joinDate: "15 Jan 2024",
    lastActive: "2 hours ago",
    avatar: null,
  },
  {
    id: 2,
    name: "Phawat Srivichai",
    email: "phawat@atenergy.co.th",
    phone: "082-345-6789",
    role: "Sale",
    status: "active",
    joinDate: "22 Mar 2024",
    lastActive: "5 mins ago",
    avatar: null,
  },
  {
    id: 3,
    name: "Wannee Suksri",
    email: "wannee@atenergy.co.th",
    phone: "083-456-7890",
    role: "Sale",
    status: "active",
    joinDate: "10 May 2024",
    lastActive: "1 day ago",
    avatar: null,
  },
  {
    id: 4,
    name: "Kittisak Rattana",
    email: "kittisak@atenergy.co.th",
    phone: "084-567-8901",
    role: "Technician",
    status: "pending",
    joinDate: "05 Jan 2026",
    lastActive: "Pending approval",
    avatar: null,
  },
  {
    id: 5,
    name: "Naree Sangthong",
    email: "naree@atenergy.co.th",
    phone: "085-678-9012",
    role: "Sale",
    status: "inactive",
    joinDate: "08 Aug 2024",
    lastActive: "2 weeks ago",
    avatar: null,
  },
];

const roleColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  Admin: { bg: "bg-purple-100", text: "text-purple-700", icon: <LuShield size={14} /> },
  Sale: { bg: "bg-blue-100", text: "text-blue-700", icon: <LuUser size={14} /> },
  Technician: { bg: "bg-amber-100", text: "text-amber-700", icon: <LuUserCog size={14} /> },
};

const statusConfig: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  active: { bg: "bg-green-100", text: "text-green-700", icon: <LuCircleCheck size={14} /> },
  pending: { bg: "bg-yellow-100", text: "text-yellow-700", icon: <LuClock size={14} /> },
  inactive: { bg: "bg-slate-100", text: "text-slate-500", icon: <LuCircleX size={14} /> },
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    const matchesStatus = statusFilter === "All" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">User Management</h1>
          <p className="text-[#64748B] text-sm mt-1">Manage team members and access permissions</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg">
          <LuPlus size={18} />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2">
            <LuFilter size={16} className="text-[#64748B]" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] bg-white"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Sale">Sale</option>
              <option value="Technician">Technician</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] bg-white"
          >
            <option value="All">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <p className="text-sm text-[#64748B]">Total Users</p>
          <p className="text-2xl font-bold text-[#1E293B] mt-1">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <p className="text-sm text-[#64748B]">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{users.filter((u) => u.status === "active").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <p className="text-sm text-[#64748B]">Pending Approval</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{users.filter((u) => u.status === "pending").length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <p className="text-sm text-[#64748B]">Inactive</p>
          <p className="text-2xl font-bold text-slate-500 mt-1">{users.filter((u) => u.status === "inactive").length}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-[#F8FAFC]">
                <th className="text-left px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">User</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Contact</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Role</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Last Active</th>
                <th className="text-right px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-100 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-linear-to-br from-[#EA580C] to-[#fb923c] rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-[#1E293B]">{user.name}</p>
                        <p className="text-xs text-[#64748B]">Joined {user.joinDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-[#1E293B]">
                        <LuMail size={14} className="text-[#64748B]" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <LuPhone size={14} />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.role].bg} ${roleColors[user.role].text}`}
                    >
                      {roleColors[user.role].icon}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium capitalize ${statusConfig[user.status].bg} ${statusConfig[user.status].text}`}
                    >
                      {statusConfig[user.status].icon}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#64748B]">{user.lastActive}</td>
                  <td className="px-6 py-4">
                    <div className="relative flex justify-end">
                      <button
                        onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <LuEllipsisVertical size={18} className="text-[#64748B]" />
                      </button>
                      {openMenu === user.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10">
                          <button className="w-full px-4 py-2 text-left text-sm text-[#1E293B] hover:bg-[#F8FAFC] flex items-center gap-2">
                            <LuPencil size={14} />
                            Edit
                          </button>
                          {user.status === "pending" && (
                            <button className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50 flex items-center gap-2">
                              <LuCircleCheck size={14} />
                              Approve
                            </button>
                          )}
                          <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                            <LuTrash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-[#64748B]">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-[#64748B] hover:bg-slate-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1.5 bg-[#0F172A] text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-[#64748B] hover:bg-slate-50 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
