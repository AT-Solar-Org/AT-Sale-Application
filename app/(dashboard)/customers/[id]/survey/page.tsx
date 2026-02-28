"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  LuArrowLeft,
  LuSave,
  LuCamera,
  LuUpload,
  LuTrash2,
  LuChevronDown,
} from "react-icons/lu";

const roofTypes = ["Metal Sheet", "Concrete", "Tile", "Flat Roof", "Other"];
const phases = ["Single Phase", "Three Phase"];
const meterTypes = ["TOU", "Flat Rate", "Peak/Off-Peak"];

export default function SurveyPage() {
  const router = useRouter();
  const params = useParams();
  const [images, setImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    roofType: "",
    roofArea: "",
    roofAngle: "",
    roofDirection: "",
    electricPhase: "",
    meterType: "",
    avgBill: "",
    peakUsage: "",
    obstructions: "",
    shading: "",
    structureCondition: "",
    accessNotes: "",
    additionalNotes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save survey data
    router.push(`/customers/${params.id}/calculation`);
  };

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <LuArrowLeft size={20} className="text-[#64748B]" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Site Survey</h1>
          <p className="text-[#64748B] text-sm">Complete the survey form for this customer</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Roof Information */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1E293B] mb-4">Roof Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Roof Type</label>
              <div className="relative">
                <select
                  name="roofType"
                  value={formData.roofType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
                >
                  <option value="">Select roof type</option>
                  {roofTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Roof Area (m²)</label>
              <input
                type="number"
                name="roofArea"
                value={formData.roofArea}
                onChange={handleChange}
                placeholder="e.g., 250"
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Roof Angle (°)</label>
              <input
                type="number"
                name="roofAngle"
                value={formData.roofAngle}
                onChange={handleChange}
                placeholder="e.g., 15"
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Roof Direction</label>
              <input
                type="text"
                name="roofDirection"
                value={formData.roofDirection}
                onChange={handleChange}
                placeholder="e.g., South-facing"
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>
        </div>

        {/* Electrical Information */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1E293B] mb-4">Electrical Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Electric Phase</label>
              <div className="relative">
                <select
                  name="electricPhase"
                  value={formData.electricPhase}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
                >
                  <option value="">Select phase</option>
                  {phases.map((phase) => (
                    <option key={phase} value={phase}>{phase}</option>
                  ))}
                </select>
                <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Meter Type</label>
              <div className="relative">
                <select
                  name="meterType"
                  value={formData.meterType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
                >
                  <option value="">Select meter type</option>
                  {meterTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <LuChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Average Monthly Bill (฿)</label>
              <input
                type="number"
                name="avgBill"
                value={formData.avgBill}
                onChange={handleChange}
                placeholder="e.g., 45000"
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Peak Usage (kW)</label>
              <input
                type="number"
                name="peakUsage"
                value={formData.peakUsage}
                onChange={handleChange}
                placeholder="e.g., 25"
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>
        </div>

        {/* Site Conditions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1E293B] mb-4">Site Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Obstructions</label>
              <input
                type="text"
                name="obstructions"
                value={formData.obstructions}
                onChange={handleChange}
                placeholder="e.g., AC units, vents, chimneys"
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Shading Issues</label>
              <input
                type="text"
                name="shading"
                value={formData.shading}
                onChange={handleChange}
                placeholder="e.g., Trees, nearby buildings"
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#1E293B] mb-2">Structure Condition</label>
              <textarea
                name="structureCondition"
                value={formData.structureCondition}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the structural condition of the roof..."
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1E293B] mb-4">Site Photos</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-square bg-slate-100 rounded-lg overflow-hidden group">
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                  <LuCamera size={24} className="text-slate-400" />
                </div>
                <button
                  type="button"
                  onClick={() => setImages(images.filter((_, i) => i !== idx))}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <LuTrash2 size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setImages([...images, "placeholder"])}
              className="aspect-square border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-[#EA580C] hover:bg-orange-50 transition-colors cursor-pointer"
            >
              <LuUpload size={24} className="text-[#64748B]" />
              <span className="text-xs text-[#64748B]">Add Photo</span>
            </button>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-[#1E293B] mb-4">Additional Notes</h2>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            rows={4}
            placeholder="Any additional observations or notes..."
            className="w-full px-4 py-3 bg-[#F8FAFC] border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#EA580C] focus:ring-2 focus:ring-orange-100 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#EA580C] hover:bg-[#c2410c] text-white rounded-lg text-sm font-bold transition-all shadow-md"
          >
            <LuSave size={16} />
            Save & Calculate
          </button>
        </div>
      </form>
    </div>
  );
}
