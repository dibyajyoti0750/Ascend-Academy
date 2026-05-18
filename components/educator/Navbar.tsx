"use client";

import { dummyEducatorData } from "@/assets/assets";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Navigation2 } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const educatorData = dummyEducatorData;
  const { user } = useUser();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="flex items-center justify-between h-18 px-4 lg:px-16">
        {/* Logo */}
        <Link
          href={"/"}
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <div className="rounded-xl bg-slate-900 p-2 text-white">
            <Navigation2 size={20} />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              Ascend Academy
            </h1>

            <p className="text-xs text-slate-500">Educator Dashboard</p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Hi, {user?.firstName || "Educator"}
            </p>

            <p className="text-xs text-slate-500">Welcome back</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
            {user ? <UserButton /> : <CircleUserRound size={22} />}
          </div>
        </div>
      </div>
    </nav>
  );
}
