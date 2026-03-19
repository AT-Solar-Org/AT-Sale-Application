"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    let handled = false;

    async function handleCallback() {
      const hash = window.location.hash;

      if (hash && hash.includes("access_token")) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");

        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error || !data.session) {
            console.error("Failed to set session:", error?.message);
            router.replace("/auth");
            return;
          }

          if (handled) return;
          handled = true;

          const user = data.session.user;

          // Check if public.users row already exists
          const { data: existing } = await supabase
            .from("users")
            .select("id")
            .eq("id", user.id)
            .single();

          if (!existing) {
            const raw = localStorage.getItem("pendingProfileData");

            if (raw) {
              const profileData = JSON.parse(raw);

              // Try insert first
              const { error: insertError } = await supabase
                .from("users")
                .insert({ id: user.id, ...profileData });

              if (insertError) {
                if (insertError.code === "23505") {
                  // If row already exists update instead
                  const { error: updateError } = await supabase
                    .from("users")
                    .update(profileData)
                    .eq("id", user.id);

                  if (updateError) {
                    console.error("Failed to update user profile:", updateError.message);
                    router.replace("/auth");
                    return;
                  }
                } else {
                  console.error("Failed to insert user profile:", insertError.message);
                  router.replace("/auth");
                  return;
                }
              }

              localStorage.removeItem("pendingProfileData");
            } else {
              // localStorage empty — send back to fill form
              router.replace(`/signup?email=${encodeURIComponent(user.email ?? "")}`);
              return;
            }
          }

          router.replace("/pending");
        } else {
          router.replace("/auth");
        }
      } else {
        // No hash token — code-based flow fallback
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          router.replace("/pending");
        } else {
          router.replace("/auth");
        }
      }
    }

    handleCallback();
  }, [router]);

  return (
    <div className="bg-[#0F172A] flex justify-center items-center min-h-screen">
      <p className="text-white text-sm">Verifying your email...</p>
    </div>
  );
}