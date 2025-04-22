// components/AuthRedirect.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const checkProfile = async () => {
        try {
          const response = await fetch(
            `/api/profiles/check?userId=${session.user.id}`
          );
          const { hasProfile } = await response.json();

          if (
            !hasProfile &&
            !window.location.pathname.includes("/profile/setup")
          ) {
            router.push("/profile/setup");
          }
        } catch (error) {
          console.error("Profile check error:", error);
        }
      };

      checkProfile();
    }
  }, [status, session, router]);

  return null;
}
