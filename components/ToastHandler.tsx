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
    }
  }, [searchParams]);

  return null;
}
