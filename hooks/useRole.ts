"use client";

import { useAuth } from "@clerk/nextjs";

export const useRole = () => {
  const { sessionClaims } = useAuth();

  const role = sessionClaims?.metadata?.role;

  return {
    role,
    sessionClaims,
    currency: "₹",
    isEducator: role === "educator" || role === "admin",
  };
};
