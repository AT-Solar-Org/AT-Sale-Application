"use client";

import { useState, useRef, useEffect } from "react";
import { LuUpload, LuX, LuCheck } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Image from 'next/image'

export default function SignUpMore() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    nationalId: "",
    bankAccount: "",
  });

  // Load saved signup data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("signupData");
    if (savedData) {
      try {
        const { name, email } = JSON.parse(savedData);
        setForm((prev) => ({
          ...prev,
          name: name || "",
          email: email || "",
        }));
      } catch (e) {
        console.error("Failed to parse signup data from localStorage", e);
      }
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIdCardFile(file);
    setIdCardPreview(URL.createObjectURL(file));
  }

  function removeFile() {
    setIdCardFile(null);
    setIdCardPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: send form data + idCardFile to your API
    console.log("Submitted:", { ...form, idCardFile });
    // Clear signup data from localStorage after submission
    localStorage.removeItem("signupData");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-[#0F172A] flex justify-center items-center flex-col font-sans min-h-screen p-6">
        <div className="bg-white rounded-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.25),0_12px_14px_rgba(0,0,0,0.22)] w-full max-w-md p-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
            <LuCheck className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="font-semibold text-2xl text-[#0F172A] mb-3">
            Submitted!
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Your information has been sent to the admin for review.
            You`&apos`ll be notified once your account is approved.
          </p>
          <button
            onClick={() => router.push("/auth")}
            className="rounded-lg bg-[#EA580C] text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform active:scale-95 cursor-pointer border-none hover:bg-[#c2410c]"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0F172A] flex justify-center items-center flex-col font-sans min-h-screen p-6">
      <div className="bg-white rounded-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.25),0_12px_14px_rgba(0,0,0,0.22)] relative overflow-hidden w-full max-w-lg">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex items-center justify-center flex-col px-8 md:px-12 py-10 h-full text-center"
        >
          <Image
            src="/images/at_solar_logo.webp"
            alt="App Logo"
            className="w-20 md:w-24 h-auto mb-5"
            width={80}
            height={80}
          />

          <h1 className="font-semibold text-3xl md:text-4xl text-[#0F172A] mb-2">
            Complete Profile
          </h1>
          <p className="text-sm leading-5 tracking-wide mb-6 text-slate-500">
            Fill in your details below. Your info will be reviewed by an admin.
          </p>

          {/* Name + Surname */}
          <div className="flex gap-3 w-full">
            <input
              type="text"
              name="name"
              placeholder="ชื่อ (Name)"
              value={form.name}
              onChange={handleChange}
              required
              className="bg-slate-100 border border-slate-300 p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C] text-sm"
            />
            <input
              type="text"
              name="surname"
              placeholder="นามสกุล (Surname)"
              value={form.surname}
              onChange={handleChange}
              required
              className="bg-slate-100 border border-slate-300 p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C] text-sm"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-slate-100 border border-slate-300 p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C] text-sm"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            placeholder="เบอร์โทรศัพท์ (Phone no.)"
            value={form.phone}
            onChange={handleChange}
            required
            maxLength={10}
            className="bg-slate-100 border border-slate-300 p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C] text-sm"
          />

          {/* National ID number */}
          <input
            type="text"
            name="nationalId"
            placeholder="เลขบัตรประชาชน (National ID)"
            value={form.nationalId}
            onChange={handleChange}
            required
            maxLength={13}
            className="bg-slate-100 border border-slate-300 p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C] text-sm"
          />

          {/* National ID photo upload */}
          <div className="w-full my-2">
            {!idCardPreview ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 border-2 border-dashed border-slate-300 hover:border-[#EA580C] hover:bg-slate-200 transition-all duration-300 rounded-lg p-4 text-sm text-slate-500 cursor-pointer"
              >
                <LuUpload className="w-4 h-4" />
                อัปโหลดรูปบัตรประชาชน (Upload ID Card Photo)
              </button>
            ) : (
              <div className="relative w-full h-36 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={idCardPreview}
                  alt="ID Card Preview"
                  className="w-full h-full object-cover"
                  fill
                />
                <button
                  type="button"
                  onClick={removeFile}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                >
                  <LuX className="w-3 h-3" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-3 py-1 truncate">
                  {idCardFile?.name}
                </div>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Bank account */}
          <input
            type="text"
            name="bankAccount"
            placeholder="เลขบัญชีธนาคาร (Bank Account No.)"
            value={form.bankAccount}
            onChange={handleChange}
            required
            maxLength={15}
            className="bg-slate-100 border border-slate-300 p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C] text-sm"
          />

          <button
            className="rounded-lg bg-[#EA580C] text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform active:scale-95 mt-6 cursor-pointer border-none hover:bg-[#c2410c] w-full"
            type="submit"
          >
            Submit for Approval
          </button>

          <a
            href="/auth"
            className="block mt-5 text-center text-xs text-slate-500 no-underline hover:text-[#EA580C] transition-colors"
          >
            Back to Sign In
          </a>
        </form>
      </div>
    </div>
  );
}