"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      const hash = window.location.hash;
      const query = new URLSearchParams(window.location.search);
      const code = query.get("code");

      let session = null;

      // PKCE code flow (most common with Resend/custom SMTP)
      if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (error || !data.session) {
          router.replace("/auth");
          return;
        }
        session = data.session;

      // Hash token flow (older Supabase default)
      } else if (hash && hash.includes("access_token")) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");

        if (!accessToken || !refreshToken) {
          router.replace("/auth");
          return;
        }

        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error || !data.session) {
          router.replace("/auth");
          return;
        }
        session = data.session;

      } else {
        // No code or hash check for existing session
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          session = data.session;
        } else {
          router.replace("/auth");
          return;
        }
      }

      const user = session.user;

      // Check if public.users row already exists
      const { data: existing } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!existing) {
        const pendingProfile = user.user_metadata?.pending_profile;

        if (pendingProfile) {
          const { error: insertError } = await supabase
            .from("users")
            .insert({ id: user.id, ...pendingProfile });

          if (insertError) {
            if (insertError.code === "23505") {
              // Row already exists update instead
              await supabase
                .from("users")
                .update(pendingProfile)
                .eq("id", user.id);
            } else {
              router.replace("/auth");
              return;
            }
          }

          // Clear pending_profile from metadata
          await supabase.auth.updateUser({ data: { pending_profile: null } });

        } else {
          // No profile data send back to complete form
          router.replace(`/signup?email=${encodeURIComponent(user.email ?? "")}`);
          return;
        }
      }

      router.replace("/pending");
    }

    handleCallback();
  }, [router]);

  return (
    <div className="bg-[#0F172A] flex justify-center items-center min-h-screen">
      <p className="text-white text-sm">Verifying your email...</p>
    </div>
  );
}