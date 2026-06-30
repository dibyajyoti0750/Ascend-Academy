"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function ToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error === "unauthorized") {
      toast.error("You are not authorized");
      router.replace("/", { scroll: false });
    } else if (error === "signin-required") {
      toast.error("You must be signed in to view this page");
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  return null;
}
