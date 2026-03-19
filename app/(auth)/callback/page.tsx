"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // onAuthStateChange fires once the token in the URL hash has been
    // exchanged for a real session — getSession() fires too early and
    // returns null before that exchange completes.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          const user = session.user;

          // Check if public.users row already exists (prevents duplicate inserts)
          const { data: existing } = await supabase
            .from("users")
            .select("id")
            .eq("id", user.id)
            .single();

          if (!existing) {
            const raw = localStorage.getItem("pendingProfileData");

            if (raw) {
              const profileData = JSON.parse(raw);

              const { error: insertError } = await supabase
                .from("users")
                .upsert({ id: user.id, ...profileData });

              if (insertError) {
                console.error("Failed to insert user profile:", insertError.message);
              } else {
                localStorage.removeItem("pendingProfileData");
              }
            } else {
              // localStorage empty (opened in different browser/tab)
              // Send back to fill the form again
              subscription.unsubscribe();
              router.replace(`/signup?email=${encodeURIComponent(user.email ?? "")}`);
              return;
            }
          }

          subscription.unsubscribe();
          router.replace("/pending");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="bg-[#0F172A] flex justify-center items-center min-h-screen">
      <p className="text-white text-sm">Verifying your email...</p>
    </div>
  );
}