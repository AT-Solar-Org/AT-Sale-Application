"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error(error);
        router.replace("/auth");
        return;
      }

      const user = data.session.user;

      // Check if this user already has a profile
      const { data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existing) {
        // First time — read the profile data saved in SignUpMore
        const raw = localStorage.getItem("pendingProfileData");

        if (raw) {
          const profileData = JSON.parse(raw);

          const { error: insertError } = await supabase.from("users").upsert({
            id: user.id,
            ...profileData,
          });

          if (insertError) {
            console.error("Failed to insert user profile:", insertError.message);
            // Don't block — still redirect to pending so user isn't stuck
          }

          localStorage.removeItem("pendingProfileData");
        }
      }

      router.replace("/pending");
    };

    handleAuth();
  }, [router]);

  return (
    <div className="bg-[#0F172A] flex justify-center items-center min-h-screen">
      <p className="text-white text-sm">Verifying your email...</p>
    </div>
  );
}