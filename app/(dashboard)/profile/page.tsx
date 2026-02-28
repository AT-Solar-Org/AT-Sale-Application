"use client";

import { useState } from "react";
import {
  LuUser,
  LuMail,
  LuPhone,
  LuPencil,
  LuCamera,
  LuSave,
  LuX,
  LuBell,
  LuLock,
  LuBuilding,
  LuMapPin,
  LuCalendar,
  LuCircleCheck,
} from "react-icons/lu";

// Mock user data
const initialUserData = {
  id: 1,
  firstName: "Admin",
  lastName: "User",
  email: "admin@at-energy.com",
  phone: "081-234-5678",
  role: "Administrator",
  department: "Management",
  location: "Bangkok, Thailand",
  joinDate: "15 Jan 2024",
  avatar: null as string | null,
  bio: "System administrator with 5 years of experience in solar energy industry.",
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [editData, setEditData] = useState(initialUserData);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newCustomerAlerts: true,
    surveyReminders: true,
    maintenanceAlerts: true,
    weeklyReports: true,
  });

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-6 right-6 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
          <LuCircleCheck size={20} />
          <span className="font-medium">Profile updated successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1E293B]">My Profile</h1>
        <p className="text-[#64748B] text-sm">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full bg-linear-to-br from-[#EA580C] to-orange-400 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    `${userData.firstName[0]}${userData.lastName[0]}`
                  )}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-[#EA580C] text-white rounded-full shadow-md hover:bg-orange-700 transition-colors opacity-0 group-hover:opacity-100">
                  <LuCamera size={16} />
                </button>
              </div>
              <h2 className="mt-4 text-xl font-bold text-[#1E293B]">
                {userData.firstName} {userData.lastName}
              </h2>
              <span className="px-3 py-1 bg-[#EA580C]/10 text-[#EA580C] rounded-full text-sm font-semibold mt-2">
                {userData.role}
              </span>
            </div>

            {/* Quick Info */}
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <div className="flex items-center gap-3 text-sm">
                <LuBuilding size={16} className="text-[#64748B]" />
                <span className="text-[#64748B]">{userData.department}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <LuMapPin size={16} className="text-[#64748B]" />
                <span className="text-[#64748B]">{userData.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <LuCalendar size={16} className="text-[#64748B]" />
                <span className="text-[#64748B]">Joined {userData.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#EA580C]/10 rounded-lg">
                  <LuUser size={20} className="text-[#EA580C]" />
                </div>
                <h2 className="text-lg font-bold text-[#1E293B]">Personal Information</h2>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium text-[#1E293B]"
                >
                  <LuPencil size={16} />
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium text-[#64748B]"
                  >
                    <LuX size={16} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-[#EA580C] hover:bg-orange-700 rounded-lg transition-colors text-sm font-medium text-white"
                  >
                    <LuSave size={16} />
                    Save
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#64748B] uppercase font-bold mb-2">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(e) =>
                      setEditData({ ...editData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"
                  />
                ) : (
                  <p className="text-[#1E293B] font-medium py-2.5">{userData.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-[#64748B] uppercase font-bold mb-2">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(e) =>
                      setEditData({ ...editData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"
                  />
                ) : (
                  <p className="text-[#1E293B] font-medium py-2.5">{userData.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-[#64748B] uppercase font-bold mb-2">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"
                  />
                ) : (
                  <div className="flex items-center gap-2 py-2.5">
                    <LuMail size={16} className="text-[#64748B]" />
                    <p className="text-[#1E293B] font-medium">{userData.email}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs text-[#64748B] uppercase font-bold mb-2">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"
                  />
                ) : (
                  <div className="flex items-center gap-2 py-2.5">
                    <LuPhone size={16} className="text-[#64748B]" />
                    <p className="text-[#1E293B] font-medium">{userData.phone}</p>
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-[#64748B] uppercase font-bold mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] resize-none"
                  />
                ) : (
                  <p className="text-[#64748B] py-2.5 leading-relaxed">{userData.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#EA580C]/10 rounded-lg">
                <LuLock size={20} className="text-[#EA580C]" />
              </div>
              <h2 className="text-lg font-bold text-[#1E293B]">Security</h2>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-slate-100">
              <div>
                <p className="text-[#1E293B] font-medium">Password</p>
                <p className="text-sm text-[#64748B]">Last changed 30 days ago</p>
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 bg-white border border-slate-200 hover:border-[#EA580C] hover:text-[#EA580C] rounded-lg transition-colors text-sm font-medium text-[#1E293B]"
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#EA580C]/10 rounded-lg">
                <LuBell size={20} className="text-[#EA580C]" />
              </div>
              <h2 className="text-lg font-bold text-[#1E293B]">Notifications</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: "emailNotifications", label: "Email Notifications", desc: "Receive notifications via email" },
                { key: "smsNotifications", label: "SMS Notifications", desc: "Receive notifications via SMS" },
                { key: "newCustomerAlerts", label: "New Customer Alerts", desc: "Get notified when new customers are added" },
                { key: "surveyReminders", label: "Survey Reminders", desc: "Reminders for pending surveys" },
                { key: "maintenanceAlerts", label: "Maintenance Alerts", desc: "Notifications for scheduled maintenance" },
                { key: "weeklyReports", label: "Weekly Reports", desc: "Receive weekly summary reports" },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-xl border border-slate-100"
                >
                  <div>
                    <p className="text-[#1E293B] font-medium">{item.label}</p>
                    <p className="text-sm text-[#64748B]">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications[item.key as keyof typeof notifications]
                        ? "bg-[#EA580C]"
                        : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                        notifications[item.key as keyof typeof notifications]
                          ? "translate-x-7"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#1E293B]">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <LuX size={20} className="text-[#64748B]" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#64748B] uppercase font-bold mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-xs text-[#64748B] uppercase font-bold mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-xs text-[#64748B] uppercase font-bold mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C]"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2.5 bg-[#F8FAFC] hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium text-[#64748B]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setShowSuccessMessage(true);
                  setTimeout(() => setShowSuccessMessage(false), 3000);
                }}
                className="flex-1 px-4 py-2.5 bg-[#EA580C] hover:bg-orange-700 rounded-lg transition-colors text-sm font-medium text-white"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
