"use client";

import { useState, useRef } from "react";
import { LuUpload, LuX } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Image from 'next/image';

// Read localStorage once outside the component — safe, no effect needed
function getInitialEmail(): string {
  if (typeof window === "undefined") return "";
  try {
    const savedData = localStorage.getItem("signupData");
    if (!savedData) return "";
    const { email } = JSON.parse(savedData);
    return email || "";
  } catch {
    return "";
  }
}

export default function SignUpMore() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);

  // Initialize email directly — no useEffect required
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: getInitialEmail(),
    phone: "",
    nationalId: "",
    bankAccount: "",
  });

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
    localStorage.setItem("accountStatus", "pending");
    localStorage.setItem("pendingEmail", form.email);
    localStorage.removeItem("signupData");
    console.log("Submitted:", { ...form, idCardFile });
    router.push("/signup/verify-email");
  }

  const inputClass = "bg-slate-100 border border-slate-300 p-3 my-2 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C] text-sm";

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
          <h1 className="font-semibold text-3xl md:text-4xl text-[#0F172A] mb-2">Complete Profile</h1>
          <p className="text-sm leading-5 tracking-wide mb-6 text-slate-500">
            Fill in your details below. Your info will be reviewed by an admin.
          </p>

          <div className="flex gap-3 w-full">
            <input type="text" name="name" placeholder="ชื่อ (Name)" value={form.name} onChange={handleChange} required className={inputClass} />
            <input type="text" name="surname" placeholder="นามสกุล (Surname)" value={form.surname} onChange={handleChange} required className={inputClass} />
          </div>

          <input type="email" name="email" placeholder={form.email || "Email"} value={form.email} onChange={handleChange} required className={inputClass} />
          <input type="tel" name="phone" placeholder="เบอร์โทรศัพท์ (Phone no.)" value={form.phone} onChange={handleChange} required maxLength={10} className={inputClass} />
          <input type="text" name="nationalId" placeholder="เลขบัตรประชาชน (National ID)" value={form.nationalId} onChange={handleChange} required maxLength={13} className={inputClass} />

          {/* ID Card Upload */}
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
                <Image src={idCardPreview} alt="ID Card Preview" className="object-cover" fill />
                <button type="button" onClick={removeFile} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors">
                  <LuX className="w-3 h-3" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-3 py-1 truncate">
                  {idCardFile?.name}
                </div>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>

          <input type="text" name="bankAccount" placeholder="เลขบัญชีธนาคาร (Bank Account No.)" value={form.bankAccount} onChange={handleChange} required maxLength={15} className={inputClass} />

          <button
            className="rounded-lg bg-[#EA580C] text-white text-xs font-bold py-3 px-11 tracking-wider uppercase transition-transform active:scale-95 mt-6 cursor-pointer border-none hover:bg-[#c2410c] w-full"
            type="submit"
          >
            Submit for Approval
          </button>

          <a href="/auth" className="block mt-5 text-center text-xs text-slate-500 no-underline hover:text-[#EA580C] transition-colors">
            Back to Sign In
          </a>
        </form>
      </div>
    </div>
  );
}