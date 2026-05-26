"use client";

import { useAuth } from "@clerk/nextjs";

export const useCurrentUser = () => {
  const { sessionClaims } = useAuth();

  const role = sessionClaims?.metadata?.role;

  return {
    role,
    currency: "₹",
    isEducator: role === "educator" || role === "admin",
  };
};
