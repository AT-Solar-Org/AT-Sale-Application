"use client";

import { useState, useRef } from "react";
import { LuUpload, LuX, LuFileText } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Image from "next/image";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,application/pdf";

function isImageFile(file: File) {
  return file.type.startsWith("image/");
}

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

// Converts a File to a base64 data URL string for localStorage storage
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function SignUpMore() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: getInitialEmail(),
    phone: "",
    nationalId: "",
    bankAccount: "",
  });

  const [touched, setTouched] = useState<Partial<Record<keyof typeof form | "idCard", boolean>>>({});
  const [errors, setErrors]   = useState<Partial<Record<keyof typeof form | "idCard", string>>>({});
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ── Validation ──────────────────────────────────────────────────
  function validateField(name: string, value: string): string {
    switch (name) {
      case "email":     return value.trim() ? "" : "Email is required.";
      case "name":      return value.trim() ? "" : "Name is required.";
      case "surname":   return value.trim() ? "" : "Surname is required.";
      case "phone":
        if (!value)              return "Phone number is required.";
        if (value.length !== 10) return "Must be exactly 10 digits.";
        if (!value.startsWith("0")) return "Must start with 0.";
        return "";
      case "nationalId":
        if (!value)              return "National ID is required.";
        if (value.length !== 13) return "Must be exactly 13 digits.";
        return "";
      case "bankAccount":
        if (!value)                              return "Bank account number is required.";
        if (value.length < 10 || value.length > 15) return "Must be 10–15 digits.";
        return "";
      default: return "";
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (["phone", "nationalId", "bankAccount"].includes(name) && !/^\d*$/.test(value)) return;
    if (name === "phone"       && value.length > 10) return;
    if (name === "nationalId"  && value.length > 13) return;
    if (name === "bankAccount" && value.length > 15) return;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) || undefined }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err || undefined }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileError(`Max file size is ${MAX_FILE_SIZE_MB}MB. (Your file: ${(file.size / 1024 / 1024).toFixed(1)}MB)`);
      return;
    }
    setFileError("");
    setIdCardFile(file);
    setIdCardPreview(isImageFile(file) ? URL.createObjectURL(file) : null);
    setErrors((prev) => ({ ...prev, idCard: undefined }));
  }

  function removeFile() {
    setIdCardFile(null);
    setIdCardPreview(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched({ ...allTouched, idCard: true });

    const newErrors: typeof errors = {};
    (Object.keys(form) as (keyof typeof form)[]).forEach((key) => {
      const err = validateField(key, form[key]);
      if (err) newErrors[key] = err;
    });
    if (!idCardFile) newErrors.idCard = "Please upload a photo of your ID card.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);

    // Convert file → base64 so it survives localStorage
    const idCardBase64 = await fileToBase64(idCardFile!);

    // Build new request entry
    const newRequest = {
      id: `req_${Date.now()}`,
      email:       form.email,
      name:        form.name,
      surname:     form.surname,
      phone:       form.phone,
      nationalId:  form.nationalId,
      bankAccount: form.bankAccount,
      idCardData:  idCardBase64,       // base64 data URL
      idCardName:  idCardFile!.name,
      idCardType:  idCardFile!.type,   // e.g. "image/jpeg" or "application/pdf"
      requestDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
      }),
      status: "Pending" as const,
      note: "",
    };

    // Append to existing requests array in localStorage
    const existing = JSON.parse(localStorage.getItem("saleApprovalRequests") || "[]");
    localStorage.setItem("saleApprovalRequests", JSON.stringify([...existing, newRequest]));

    localStorage.setItem("accountStatus", "pending");
    localStorage.setItem("pendingEmail", form.email);
    localStorage.removeItem("signupData");

    setSubmitting(false);
    router.push("/signup/verify-email");
  }

  function fieldClass(field: keyof typeof errors) {
    return `bg-slate-100 border p-3 my-1 w-full rounded-lg outline-none transition-all duration-300 text-slate-800 placeholder:text-slate-500 focus:bg-slate-200 focus:ring-2 focus:ring-[#EA580C] text-sm ${
      errors[field] ? "border-red-400" : "border-slate-300"
    }`;
  }

  return (
    <div className="bg-[#0F172A] flex justify-center items-center flex-col font-sans min-h-screen p-6">
      <div className="bg-white rounded-[18px] shadow-[0_18px_36px_rgba(0,0,0,0.25),0_12px_14px_rgba(0,0,0,0.22)] relative overflow-hidden w-full max-w-lg">
        <form onSubmit={handleSubmit} className="bg-white flex items-center justify-center flex-col px-8 md:px-12 py-10 text-center">
          <Image src="/images/at_solar_logo.webp" alt="App Logo" className="w-20 md:w-24 h-auto mb-5" width={80} height={80} />
          <h1 className="font-semibold text-3xl md:text-4xl text-[#0F172A] mb-2">Complete Profile</h1>
          <p className="text-sm leading-5 tracking-wide mb-6 text-slate-500">
            Please fill in your information below <br /> so we can verify your account and activate your access.
          </p>

          {/* Email */}
          <div className="w-full">
            <input type="email" name="email" placeholder="Email" value={form.email}
              onChange={handleChange} onBlur={handleBlur} className={fieldClass("email")} />
            {errors.email && <p className="text-xs text-red-500 text-left">{errors.email}</p>}
          </div>

          {/* Name + Surname */}
          <div className="flex gap-3 w-full">
            <div className="w-full">
              <input type="text" name="name" placeholder="ชื่อ (Name)" value={form.name}
                onChange={handleChange} onBlur={handleBlur} className={fieldClass("name")} />
              {errors.name && <p className="text-xs text-red-500 text-left">{errors.name}</p>}
            </div>
            <div className="w-full">
              <input type="text" name="surname" placeholder="นามสกุล (Surname)" value={form.surname}
                onChange={handleChange} onBlur={handleBlur} className={fieldClass("surname")} />
              {errors.surname && <p className="text-xs text-red-500 text-left">{errors.surname}</p>}
            </div>
          </div>

          {/* Phone */}
          <div className="w-full">
            <input type="text" inputMode="numeric" name="phone"
              placeholder="เบอร์โทรศัพท์ (Phone) — 10 digits" value={form.phone}
              onChange={handleChange} onBlur={handleBlur} className={fieldClass("phone")} />
            {errors.phone && <p className="text-xs text-red-500 text-left">{errors.phone}</p>}
          </div>

          {/* National ID */}
          <div className="w-full">
            <input type="text" inputMode="numeric" name="nationalId"
              placeholder="เลขบัตรประชาชน (National ID) — 13 digits" value={form.nationalId}
              onChange={handleChange} onBlur={handleBlur} className={fieldClass("nationalId")} />
            {errors.nationalId && <p className="text-xs text-red-500 text-left">{errors.nationalId}</p>}
          </div>

          {/* ID Card Upload */}
          <div className="w-full my-2">
            {!idCardFile ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`w-full flex flex-col items-center justify-center gap-1 bg-slate-100 border-2 border-dashed hover:bg-slate-200 transition-all duration-300 rounded-lg p-4 text-sm text-slate-500 cursor-pointer ${
                  errors.idCard ? "border-red-400" : "border-slate-300 hover:border-[#EA580C]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <LuUpload className="w-4 h-4" />
                  อัปโหลดรูปบัตรประชาชน (Upload ID Card)
                </div>
                <span className="text-xs text-slate-400">JPG, PNG, WebP, PDF — max {MAX_FILE_SIZE_MB}MB</span>
              </button>
            ) : idCardPreview ? (
              <div className="relative w-full h-36 rounded-lg overflow-hidden border border-slate-200">
                <Image src={idCardPreview} alt="ID Card Preview" className="object-cover" fill />
                <button type="button" onClick={removeFile} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors">
                  <LuX className="w-3 h-3" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-3 py-1 truncate">
                  {idCardFile.name} — {(idCardFile.size / 1024 / 1024).toFixed(1)}MB
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full bg-slate-100 border border-slate-300 rounded-lg px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <LuFileText className="w-6 h-6 text-[#EA580C] shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="text-sm text-slate-800 font-medium truncate">{idCardFile.name}</p>
                    <p className="text-xs text-slate-400">{(idCardFile.size / 1024 / 1024).toFixed(1)}MB</p>
                  </div>
                </div>
                <button type="button" onClick={removeFile} className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors shrink-0 ml-3">
                  <LuX className="w-3 h-3" />
                </button>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept={ACCEPTED_TYPES} onChange={handleFileChange} className="hidden" />
            {(fileError || errors.idCard) && (
              <p className="text-xs text-red-500 text-left mt-1">{fileError || errors.idCard}</p>
            )}
          </div>

          {/* Bank Account */}
          <div className="w-full">
            <input type="text" inputMode="numeric" name="bankAccount"
              placeholder="เลขบัญชีธนาคาร (Bank Account No.) — 10–15 digits" value={form.bankAccount}
              onChange={handleChange} onBlur={handleBlur} className={fieldClass("bankAccount")} />
            {errors.bankAccount && <p className="text-xs text-red-500 text-left">{errors.bankAccount}</p>}
          </div>

          <button
            disabled={submitting}
            className="rounded-lg bg-[#EA580C] text-white text-xs font-bold py-3 tracking-wider uppercase transition-all active:scale-95 mt-6 cursor-pointer border-none hover:bg-[#c2410c] w-full disabled:opacity-60 disabled:cursor-not-allowed"
            type="submit"
          >
            {submitting ? "Submitting…" : "Submit for Approval"}
          </button>

          <a href="/auth" className="block mt-5 text-center text-xs text-slate-500 no-underline hover:text-[#EA580C] transition-colors">
            Back to Sign In
          </a>
        </form>
      </div>
    </div>
  );
}