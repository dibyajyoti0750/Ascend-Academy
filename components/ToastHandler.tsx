"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function ToastHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "unauthorized") {
      toast.error("You are not authorized");
    } else if (error === "signin-required") {
      toast.error("You must be signed in to view this page");
    }
  }, [searchParams]);

  return null;
}
